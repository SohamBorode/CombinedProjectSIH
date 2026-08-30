import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { apiGet } from "../../services/api";

const fallbackHotspots = [
  {
    id: 1,
    district: "Amravati",
    lat: 20.9374,
    lng: 77.7796,
    risk: "High",
    disease: "Cotton Leaf Curl",
    affected: "68%",
  },
  {
    id: 2,
    district: "Akola",
    lat: 20.7002,
    lng: 77.0082,
    risk: "Medium",
    disease: "Cotton Wilt",
    affected: "42%",
  },
  {
    id: 3,
    district: "Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    risk: "High",
    disease: "Orange Canker",
    affected: "61%",
  },
];

const getRiskColor = (risk) => {
  switch (risk) {
    case "High":
      return "#dc2626";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#eab308";
    default:
      return "#64748b";
  }
};

function Hotspots() {
  const [hotspots, setHotspots] = useState(fallbackHotspots);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/hotspots")
      .then((data) => {
        const normalized = data?.data || data || fallbackHotspots;
        const mapped = (Array.isArray(normalized) ? normalized : fallbackHotspots).map((spot) => ({
          ...spot,
          lat: spot.latitude ?? spot.lat,
          lng: spot.longitude ?? spot.lng,
          disease: spot.diseaseName || spot.disease,
          affected: spot.affectedPercent ? `${spot.affectedPercent}%` : spot.affected,
        }));
        setHotspots(mapped);
      })
      .catch(() => setHotspots(fallbackHotspots))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="page">Loading hotspots...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Disease Hotspots</h1>
          <p>Monitor crop disease activity across farming regions in Maharashtra.</p>
        </div>
      </div>

      <div className="content-card hotspot-card">
        <div className="map-wrapper">
          <MapContainer center={[19.7515, 75.7139]} zoom={7} scrollWheelZoom={true} className="real-map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hotspots.map((spot) => (
              <CircleMarker
                key={spot.id}
                center={[spot.lat, spot.lng]}
                radius={13}
                pathOptions={{
                  color: getRiskColor(spot.risk),
                  fillColor: getRiskColor(spot.risk),
                  fillOpacity: 0.75,
                  weight: 3,
                }}
              >
                <Popup>
                  <div className="hotspot-popup">
                    <h3>{spot.district}</h3>

                    <div className="popup-risk">
                      <span
                        className="risk-dot"
                        style={{ backgroundColor: getRiskColor(spot.risk) }}
                      />

                      <strong>{spot.risk} Risk</strong>
                    </div>

                    <p>
                      <strong>Disease:</strong> {spot.disease}
                    </p>

                    <p>
                      <strong>Affected:</strong> {spot.affected}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="map-title">
            <span className="map-title-icon">📍</span>

            <div>
              <strong>Maharashtra Crop Health Map</strong>
              <small>Live disease monitoring</small>
            </div>
          </div>

          <div className="map-stats">
            <div>
              <strong>{hotspots.length}</strong>
              <span>Hotspots</span>
            </div>

            <div>
              <strong>{hotspots.filter((x) => x.risk === "High").length}</strong>
              <span>High Risk</span>
            </div>
          </div>
        </div>

        <div className="map-legend">
          <div className="legend-title">Risk Level</div>

          <div className="legend-item">
            <span className="legend-dot high"></span>
            High Risk
          </div>

          <div className="legend-item">
            <span className="legend-dot medium"></span>
            Medium Risk
          </div>

          <div className="legend-item">
            <span className="legend-dot low"></span>
            Low Risk
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotspots;