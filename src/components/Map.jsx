import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule, Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale"; // Vergeet niet: npm install d3-scale

const geoUrl = "europe_map2.geo.json";

const landCentroids = [
  { code: "NL", coordinates: [5.2913, 52.1326] },
  { code: "DE", coordinates: [10.4515, 51.1657] },
  { code: "FR", coordinates: [2.2137, 46.2276] },
  { code: "BE", coordinates: [4.4699, 50.5039] },
  { code: "AT", coordinates: [14.5501, 47.5162] },
  { code: "DK", coordinates: [9.5018, 56.2639] },
  { code: "ES", coordinates: [-3.7492, 40.4637] },
  { code: "IT", coordinates: [12.5674, 41.8719] },
  { code: "PL", coordinates: [19.1451, 51.9194] },
  { code: "GB", coordinates: [-0.877845, 51.991807] },
  { code: "IE", coordinates: [-8.2439, 53.4129] },
  { code: "SE", coordinates: [14.662190, 60.025538] },
  { code: "NO", coordinates: [8.4689, 60.4720] },
  { code: "FI", coordinates: [25.7482, 61.9241] },
  { code: "CH", coordinates: [8.2275, 46.8182] },
  { code: "PT", coordinates: [-8.2245, 39.3999] },
  { code: "RO", coordinates: [24.9668, 45.9432] },
  { code: "HU", coordinates: [19.5033, 47.1625] },
  { code: "CZ", coordinates: [15.4730, 49.8175] },
  { code: "BG", coordinates: [25.4858, 42.7339] },
  { code: "GR", coordinates: [21.8243, 39.0742] }
];

export default function MapComponent({ activeCategory, currentData }) { 
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is de 'md' breakpoint van Tailwind
    };

    // Check direct bij laden
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Bepaal de instellingen op basis van het scherm
  const mapWidth = isMobile ? 600 : 800;
  const mapHeight = isMobile ? 800 : 400; // Op mobiel dus een mooie 1:1 vierkant!
  const mapZoom = isMobile ? 5.5 : 3.5;    // Op mobiel zoomen we extra in op Europa
  // const mapCenter = isMobile ? [12, 50] : [10, 53]; // Middelpunt iets verschuiven voor mobiel

  // 3. Dynamische kleurenschaal gebaseerd op de actieve knop
  const getKleur = (waarde) => {
    if (waarde === undefined || waarde === null) return "#E2E8F0";

    // Voor gdp_pc en ppp_pc (per inwoner)
    if (activeCategory === "gdp_pc" || activeCategory === "ppp_pc") {
      return scaleLinear().domain([15000, 120000]).range(["#fdf4ff", "#701a75"])(waarde);
    }
    // Voor totaal gdp en totaal ppp (in miljoenen)
    if (activeCategory === "gdp" || activeCategory === "ppp") {
      return scaleLinear().domain([50000, 6000000]).range(["#fdf4ff", "#701a75"])(waarde);
    }
    // Voor de migratie knoppen
    if (activeCategory.endsWith("migration")) {
      return scaleLinear().domain([10000, 3000000]).range(["#fdf4ff", "#701a75"])(waarde);
    }
    if (activeCategory.startsWith("population")) {
      return scaleLinear().domain([10000, 100000000]).range(["#fdf4ff", "#701a75"])(waarde);
    } 
    if (activeCategory.startsWith("fertility_rate")) {
      return scaleLinear().domain([0, 5]).range(["#fdf4ff", "#701a75"])(waarde);
    }
    if (activeCategory.startsWith("foreign_born")) {
      return scaleLinear().domain([0, 20000000]).range(["#fdf4ff", "#701a75"])(waarde);
    }
    if (activeCategory.startsWith("over_65")) {
      return scaleLinear().domain([15, 30]).range(["#fdf4ff", "#701a75"])(waarde);
    }
    return "#E2E8F0";
  };
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <ComposableMap width={mapWidth} height={mapHeight}>
        <ZoomableGroup center={[10, 53]} zoom={mapZoom} disablePanning disableZooming>
          {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} /> */}
          {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // 1. Pak de schone tweeletterige code uit je GeoJSON properties
                const landCode = geo.properties.iso_a2_eh;
                
                // 2. Haal de waarde direct op uit je object (bijv. data["NL"])
                const waarde = currentData?.[landCode];
                const landKleur = getKleur(waarde);

                return (
                  <Geography 
                    key={geo.rsmKey} 
                    geography={geo} 
                    style={{
                      default: { 
                        fill: landKleur, // Hier wordt de kleur nu écht toegepast!
                        stroke: "#FFFFFF", 
                        strokeWidth: 0.2, 
                        outline: "none" 
                      },
                      hover: { 
                        fill: "#F59E0B", 
                        stroke: "#FFFFFF", 
                        outline: "none", 
                        cursor: "pointer" 
                      },
                      pressed: { 
                        fill: "#D97706", 
                        outline: "none" 
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
          {landCentroids.map((land) => {
            const code = land.code;
            const coordinates = land.coordinates;
            
            // 1. Zoek de waarde op van dit specifieke land uit de gefilterde JSON-data
            const rawWaarde = currentData?.[code];
            
            // 2. Maak het getal mooi leesbaar (bijv. 1000000 wordt 1M, of krijgt puntjes)
            let geformatteerdeWaarde = "";
            if (rawWaarde !== undefined && rawWaarde !== null) {
              if (rawWaarde >= 1000000000) {
                geformatteerdeWaarde = `${(rawWaarde / 1000000000).toFixed(1)}B`; // Miljard
              } else if (rawWaarde >= 1000000) {
                geformatteerdeWaarde = `${(rawWaarde / 1000000).toFixed(1)}M`; // Miljoen
              } else if (rawWaarde >= 1000) {
                geformatteerdeWaarde = `${(rawWaarde / 1000).toFixed(0)}K`; // Duizend
              } else {
                geformatteerdeWaarde = rawWaarde.toString();
              }
            }

            return (
              <Marker key={code} coordinates={coordinates}>
                {/* Alleen de Waarde tonen, perfect verticaal gecentreerd op het land */}
                {geformatteerdeWaarde && (
                  <text
                    textAnchor="middle"
                    y={1} // Gecentreerd op de coördinaat nu de landcode weg is
                    className="fill-slate-700 font-sans font-bold select-none pointer-events-none"
                    style={{ fontSize: "2px" }} // Ietsje groter gemaakt voor betere leesbaarheid
                  >
                    {geformatteerdeWaarde}
                  </text>
                )}
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
