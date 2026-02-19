import { useState, useCallback } from "react";
import { getSpaces, createReservation, deleteReservation } from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";

import Navbar from "../components/layout/Navbar";
import CoworkingCard from "../components/CoworkingCard";
import SpaceDetail from "../components/SpaceDetail";

export default function Coworking() {
  const { user } = useAuth();
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const { data: spaces, loading, error } = useFetch(getSpaces, []);

  const handleReserve = useCallback(async (spaceId) => {
    await createReservation({
      spaceId,
      user: user.name,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    });
    window.location.reload();
  }, [user.name]);

  const handleCancel = useCallback(async (reservationId) => {
    await deleteReservation(reservationId);
    window.location.reload();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando espacios...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>Error al cargar espacios</p>;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <Navbar />
      <div
        style={{
          padding: "3rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Espacios de Co-working</h1>
          <p style={{ color: "#555" }}>Reserva espacios de estudio y trabajo colaborativo</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {spaces.map((space) => (
            <CoworkingCard
              key={space.id}
              space={space}
              user={user}
              onReserve={handleReserve}
              onCancel={handleCancel}
              onHover={() => setSelectedSpaceId(space.id)}
            />
          ))}
        </div>

        {selectedSpaceId && (
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <SpaceDetail spaceId={selectedSpaceId} />
          </div>
        )}
      </div>
    </div>
  );
}
