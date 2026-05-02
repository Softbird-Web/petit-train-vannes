# Figma Asset Export — Full Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically discover and download every image/icon asset from the Figma file (all pages) and place them correctly named in `public/figma-assets/`.

**Architecture:** Use `get_metadata` to traverse all page nodes and identify image/icon asset nodes. Build a node-ID → expected-filename manifest. Write a Node.js script that calls the Figma REST API export endpoint to download all assets in one shot. No manual Figma clicking required.

**Tech Stack:** Figma MCP (`get_metadata`), Figma REST API (`/v1/images/{fileKey}`), Node.js (`fetch` built-in, `fs`), existing project (Next.js/TypeScript).

---

## Prerequisites (user action — do before starting)

- [ ] Get a Figma Personal Access Token: Figma → Account Settings → Personal access tokens → Generate new token (read-only scope is enough)
- [ ] Keep it ready — the script will ask for it (or it can be passed as an env var `FIGMA_TOKEN`)

---

## Task 1: Scan all pages and build asset manifest

**Goal:** Call `get_metadata` on every page in the Figma file to discover all IMAGE and icon nodes across the entire website.

**Files:**
- Create: `scripts/figma-asset-manifest.json` (output — the manifest)

Pages and node IDs to scan (homepage sections already built + 7 inner pages):

| Page | Root Node ID |
|------|-------------|
| Homepage | 8:783, 49:2977, 1:13279, 1:13740, 49:2694, 1:13387, 1:13645, 1:13767, 1:13453, 1:13507, 49:2226, 33:832 |
| Informations | 1:13939 |
| Prices and Tickets | 1:17365 |
| Routes | 1:23354 |
| FAQs | 1:20537 |
| Book | 1:24145 |
| Privatization | 1:17070 |
| Careers | 1:23842 |

- [ ] **Step 1: Call get_metadata for each page node**

Call `mcp__figma-desktop__get_metadata` for each root node ID listed above. Look for nodes where:
- `type="IMAGE"` — photo/raster assets
- `type="VECTOR"` or `type="INSTANCE"` where the layer name contains "icon", "logo", "flag", "illustration", "train", "map", "social"

Record: `nodeId`, `name`, `type` for each hit.

- [ ] **Step 2: Write the manifest**

After scanning all pages, write `scripts/figma-asset-manifest.json` with this structure:

```json
[
  {
    "nodeId": "123:456",
    "figmaName": "icon / train / white",
    "expectedFilename": "icon-train-white.svg",
    "format": "svg"
  },
  {
    "nodeId": "789:012",
    "figmaName": "hero-image",
    "expectedFilename": "hero-image.jpg",
    "format": "jpg"
  }
]
```

Naming rules:
- `type="VECTOR"` or icon-like → `format: "svg"`
- `type="IMAGE"` with photo content → `format: "jpg"` (scale 2x)
- `type="IMAGE"` with transparency/illustration → `format: "png"` (scale 2x)

Cross-reference with the known expected filenames from `docs/next-session.md` lines 56–83. Assets already present in `public/figma-assets/` (logo.svg, hero-image.jpg, stars.svg, etc.) can be skipped — do not include them in the manifest.

---

## Task 2: Write the download script

**Goal:** A single Node.js script that reads the manifest, calls Figma REST API, and saves all files to `public/figma-assets/`.

**Files:**
- Create: `scripts/download-figma-assets.mjs`

- [ ] **Step 1: Write the script**

```js
// scripts/download-figma-assets.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FILE_KEY = 'wTd0GeN1Y2HWGw3nkii3t8';
const TOKEN = process.env.FIGMA_TOKEN;
const OUT_DIR = path.join(ROOT, 'public', 'figma-assets');

if (!TOKEN) {
  console.error('ERROR: Set FIGMA_TOKEN env var first.\n  FIGMA_TOKEN=your_token node scripts/download-figma-assets.mjs');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'figma-asset-manifest.json'), 'utf8'));

// Group by format for batched API calls
const byFormat = {};
for (const asset of manifest) {
  byFormat[asset.format] ??= [];
  byFormat[asset.format].push(asset);
}

async function exportBatch(assets, format) {
  const ids = assets.map(a => a.nodeId).join(',');
  const scale = format === 'svg' ? '' : '&scale=2';
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=${format}${scale}`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) throw new Error(`Figma API error ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.err) throw new Error(`Figma export error: ${json.err}`);
  return json.images; // { nodeId: url }
}

async function downloadFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed for ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let downloaded = 0;
  let failed = 0;

  for (const [format, assets] of Object.entries(byFormat)) {
    console.log(`\nExporting ${assets.length} ${format} assets...`);
    const imageUrls = await exportBatch(assets, format);

    for (const asset of assets) {
      const imgUrl = imageUrls[asset.nodeId];
      if (!imgUrl) {
        console.warn(`  SKIP (no URL): ${asset.expectedFilename}`);
        failed++;
        continue;
      }
      const dest = path.join(OUT_DIR, asset.expectedFilename);
      await downloadFile(imgUrl, dest);
      console.log(`  ✓ ${asset.expectedFilename}`);
      downloaded++;
    }
  }

  console.log(`\nDone: ${downloaded} downloaded, ${failed} skipped.`);
}

run().catch(err => { console.error(err); process.exit(1); });
```

---

## Task 3: Run the script

- [ ] **Step 1: Verify manifest exists and looks correct**

```bash
cat scripts/figma-asset-manifest.json | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')); console.log(d.length+' assets'); d.forEach(a=>console.log(a.format.padEnd(4), a.expectedFilename))"
```

Expected: list of all asset filenames with their formats.

- [ ] **Step 2: Run with token**

```bash
FIGMA_TOKEN=your_token_here node scripts/download-figma-assets.mjs
```

Expected output:
```
Exporting N svg assets...
  ✓ icon-train-white.svg
  ✓ icon-ticket.svg
  ...

Exporting N jpg assets...
  ✓ souvenir-1.jpg
  ...

Done: XX downloaded, 0 skipped.
```

- [ ] **Step 3: Verify all files are present**

```bash
ls public/figma-assets/
```

Cross-check every `expectedFilename` in the manifest appears in the output.

---

## Task 4: Verify no broken image references

- [ ] **Step 1: Check for any remaining missing asset references in code**

```bash
grep -r "figma-assets/" components/ app/ --include="*.tsx" | grep -v "//figma-assets" | sed 's/.*\/figma-assets\///' | sed 's/["\x27 ].*//' | sort -u
```

Compare this list against `ls public/figma-assets/`. Any filename in code but not on disk = still missing.

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 3: Delete the script files (optional cleanup)**

These scripts are one-time use. Delete if desired:
```bash
rm scripts/download-figma-assets.mjs scripts/figma-asset-manifest.json
```

Or keep them — they're in `.gitignore` candidates since the token is passed via env.

---

## Notes

- Figma REST API rate limit: 300 requests/min. With batched calls (all SVGs in one request, all JPGs in one request), we'll use 2–4 API calls total — nowhere near the limit.
- If a node is a **component** (not an instance), the export URL may differ. If any asset shows `SKIP (no URL)`, manually export it from Figma and drop it in `public/figma-assets/`.
- The script is idempotent — safe to re-run. It overwrites existing files.
