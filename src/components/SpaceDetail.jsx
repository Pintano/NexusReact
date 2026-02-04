import { getSpaceDetail } from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import { useCallback } from "react";

export default function SpaceDetail({ spaceId }) {
  const fetchDetail = useCallback(() => getSpaceDetail(spaceId), [spaceId]);

  const { data: space, loading, error } = useFetch(fetchDetail);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando detalle...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error cargando el espacio</p>;
  }

  if (!space) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>{space.name}</h2>

      <p style={{ color: "#555" }}>{space.description}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        <DetailItem label="Planta" value={space.floor} />
        <DetailItem label="Capacidad" value={`${space.capacity} personas`} />
        <DetailItem
          label="Estado"
          value={space.occupied ? "Ocupado" : "Disponible"}
          color={space.occupied ? "red" : "green"}
        />
      </div>

      <div>
        <h3>Características</h3>
        {space.features?.length > 0 ? (
          <ul>
            {space.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        ) : (
          <p>No hay características disponibles</p>
        )}
      </div>

      {space.reservedBy && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <p><strong>Reservado por:</strong> {space.reservedBy}</p>
          <p><strong>Desde:</strong> {new Date(space.startTime).toLocaleString()}</p>
          <p><strong>Hasta:</strong> {new Date(space.endTime).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value, color = "#333" }) {
  return (
    <div
      style={{
        background: "#f4f6f8",
        padding: "0.8rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.85rem", color: "#777" }}>{label}</p>
      <p style={{ fontWeight: "bold", color }}>{value}</p>
    </div>
  );
}
