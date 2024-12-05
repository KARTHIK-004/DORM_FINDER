import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function SetViewOnChange({ center }) {
  const map = useMap();
  useEffect(() => {
    if (isValidLatLng(center)) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function isValidLatLng(latlng) {
  return (
    Array.isArray(latlng) &&
    latlng.length === 2 &&
    !isNaN(latlng[0]) &&
    !isNaN(latlng[1]) &&
    latlng[0] >= -90 &&
    latlng[0] <= 90 &&
    latlng[1] >= -180 &&
    latlng[1] <= 180
  );
}

const Map = ({ center, popupContent }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {isValidLatLng(center) && (
          <Marker position={center}>
            <Popup>{popupContent}</Popup>
          </Marker>
        )}
        <SetViewOnChange center={center} />
      </MapContainer>
    </div>
  );
};

export default Map;
