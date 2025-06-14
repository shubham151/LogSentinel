import React from "react";

interface MapViewProps {
  data: any[];
}

export const MapView: React.FC<MapViewProps> = ({ data }) => (
  <div>
    <h2>Geospatial View</h2>
    {/* TODO: integrate a map library (Leaflet, Mapbox, etc.) */}
    <p>Map placeholder – {data.length} records.</p>
  </div>
);
