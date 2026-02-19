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

  const handleReserve = useCallback(
    async (spaceId) => {
      await createReservation({
        spaceId,
        user: user.name,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      });
      window.location.reload();
    },
    [user.name]
  );

  const handleCancel = useCallback(
    async (reservationId) => {
      await deleteReservation(reservationId);
      window.location.reload();
    },
    []
  );

  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando espacios...</p>;
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        Error al cargar espacios
      </p>
    );

  return (
    <div className="coworking-container">
      <Navbar />
      <div className="coworking-content">
        <header className="coworking-header">
          <h1>Espacios de Co-working</h1>
          <p>Reserva espacios de estudio y trabajo colaborativo</p>
        </header>

        <div className="coworking-grid">
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
          <div className="space-detail-wrapper">
            <SpaceDetail spaceId={selectedSpaceId} />
          </div>
        )}
      </div>

      <style jsx>{`
        .coworking-container {
          min-height: 100vh;
          background: #f4f6f8;
        }
        .coworking-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .coworking-header {
          text-align: center;
        }
        .coworking-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .coworking-header p {
          color: #555;
        }
        .coworking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .space-detail-wrapper {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Media queries para pantallas pequeñas */
        @media (max-width: 768px) {
          .coworking-header h1 {
            font-size: 1.75rem;
          }
          .coworking-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
        @media (max-width: 480px) {
          .coworking-header h1 {
            font-size: 1.5rem;
          }
          .coworking-content {
            padding: 1rem 0.5rem;
          }
          .coworking-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
