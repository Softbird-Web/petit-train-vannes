"use client";

import { useEffect, useRef } from "react";

const STOPS = [
  {
    lat: 47.5914481,
    lng: -3.0825134,
    name: "Ménec car park",
    detail: "Main departure · In front of the Maison des Mégalithes",
  },
  {
    lat: 47.5702020,
    lng: -3.0790797,
    name: "Port-En-Drô",
    detail: "Carnac Plage departure",
  },
  {
    lat: 47.5872394,
    lng: -3.0266080,
    name: "La Trinité-sur-Mer",
    detail: "Harbour departure",
  },
];

// SVG pin matching the brand colour (#cc3795) from the original site
const PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
  <path d="M16 0C7.163 0 0 7.163 0 16c0 10.314 14.286 24.857 15.143 25.714a1.143 1.143 0 0 0 1.714 0C17.714 40.857 32 26.314 32 16 32 7.163 24.837 0 16 0z"
        fill="#54206d"/>
  <circle cx="16" cy="16" r="7" fill="white"/>
</svg>`;

export default function CarnacMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    // Leaflet must be imported client-side only
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current!, {
        center: [47.5880, -3.0420],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapRef.current = map;

      // CartoDB Positron — minimal, light, no API key required
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      const icon = L.divIcon({
        html: PIN_SVG,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -44],
        className: "",
      });

      STOPS.forEach((stop) => {
        L.marker([stop.lat, stop.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<strong style="font-family:'Bricolage Grotesque',sans-serif;font-size:14px;color:#181d27">${stop.name}</strong><br/><span style="font-family:Manrope,sans-serif;font-size:12px;color:#535862">${stop.detail}</span>`
          );
      });

      // Fit map to show all three markers with padding
      const bounds = L.latLngBounds(STOPS.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [48, 48] });
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      aria-label="Map showing the three Petit Train departure points in Carnac"
    />
  );
}
