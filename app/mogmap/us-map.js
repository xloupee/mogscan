"use client";

import { useMemo, useState } from "react";
import { geoAlbersUsa, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import usTopology from "us-atlas/states-10m.json";

const STATE_NAMES = {
  "01": "Alabama",
  "02": "Alaska",
  "04": "Arizona",
  "05": "Arkansas",
  "06": "California",
  "08": "Colorado",
  "09": "Connecticut",
  "10": "Delaware",
  "11": "District of Columbia",
  "12": "Florida",
  "13": "Georgia",
  "15": "Hawaii",
  "16": "Idaho",
  "17": "Illinois",
  "18": "Indiana",
  "19": "Iowa",
  "20": "Kansas",
  "21": "Kentucky",
  "22": "Louisiana",
  "23": "Maine",
  "24": "Maryland",
  "25": "Massachusetts",
  "26": "Michigan",
  "27": "Minnesota",
  "28": "Mississippi",
  "29": "Missouri",
  "30": "Montana",
  "31": "Nebraska",
  "32": "Nevada",
  "33": "New Hampshire",
  "34": "New Jersey",
  "35": "New Mexico",
  "36": "New York",
  "37": "North Carolina",
  "38": "North Dakota",
  "39": "Ohio",
  "40": "Oklahoma",
  "41": "Oregon",
  "42": "Pennsylvania",
  "44": "Rhode Island",
  "45": "South Carolina",
  "46": "South Dakota",
  "47": "Tennessee",
  "48": "Texas",
  "49": "Utah",
  "50": "Vermont",
  "51": "Virginia",
  "53": "Washington",
  "54": "West Virginia",
  "55": "Wisconsin",
  "56": "Wyoming",
};

export default function UsMap() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const { states, pathGenerator } = useMemo(() => {
    const statesGeoJson = feature(usTopology, usTopology.objects.states);
    const projection = geoAlbersUsa().fitSize([975, 610], statesGeoJson);
    return {
      states: statesGeoJson.features,
      pathGenerator: geoPath(projection),
    };
  }, []);

  const selectedName = selected ? STATE_NAMES[selected] ?? `State ${selected}` : "None";
  const hoveredName = hovered ? STATE_NAMES[hovered] ?? `State ${hovered}` : "None";

  return (
    <section className="mogmap-grid">
      <div className="map-card">
        <svg className="us-map" viewBox="0 0 975 610" role="img" aria-label="Interactive map of the United States">
          {states.map((geo) => {
            const id = String(geo.id).padStart(2, "0");
            const name = STATE_NAMES[id] ?? `State ${id}`;
            const path = pathGenerator(geo);
            const isSelected = selected === id;
            const isHovered = hovered === id;

            return (
              <path
                key={id}
                d={path || ""}
                tabIndex={0}
                className={`state-shape ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
                aria-label={name}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(id)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(id);
                  }
                }}
              />
            );
          })}
        </svg>
      </div>

      <aside className="map-info-card">
        <h2>MogMap</h2>
        <p>Hover and click a state to inspect it.</p>
        <div className="map-info-line">
          <span>Hovered:</span>
          <strong>{hoveredName}</strong>
        </div>
        <div className="map-info-line">
          <span>Selected:</span>
          <strong>{selectedName}</strong>
        </div>
      </aside>
    </section>
  );
}
