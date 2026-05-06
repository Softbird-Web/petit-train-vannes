"use client";

import { useEffect, useRef } from "react";

const STOPS = [
  {
    lat: 47.65390326265044,
    lng: -2.759141221973509,
    name: "Place Gambetta",
    detail: "Départ unique · Au cœur de Vannes, à deux pas des remparts",
  },
];

const PIN_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
  <path d="M16 0C7.163 0 0 7.163 0 16c0 10.314 14.286 24.857 15.143 25.714a1.143 1.143 0 0 0 1.714 0C17.714 40.857 32 26.314 32 16 32 7.163 24.837 0 16 0z"
        fill="#f7a427"/>
  <circle cx="16" cy="16" r="7" fill="white"/>
</svg>`;

export default function VannesMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current) return;

      const map = L.map(containerRef.current!, {
        center: [47.6539, -2.7591],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapRef.current = map;

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
            `<strong style="font-family:'Bricolage Grotesque',sans-serif;font-size:14px;color:#1c1b29">${stop.name}</strong><br/><span style="font-family:Manrope,sans-serif;font-size:12px;color:#535862">${stop.detail}</span>`
          );
      });
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
      aria-label="Carte du point de départ du Petit Train de Vannes — Place Gambetta"
    />
  );
}
