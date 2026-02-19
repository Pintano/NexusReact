export default function CoworkingCard({ space, user, onReserve, onCancel, onHover }) {
  return (
    <div
      className="cowork-card"
      onMouseEnter={() => onHover(space)}
      onMouseLeave={() => onHover(null)}
    >
      <h3>{space.name || `Espacio ${space.id}`}</h3>
      <p>Capacidad: {space.capacity} personas</p>
      <p>
        Estado:{" "}
        <strong style={{ color: space.occupied ? "red" : "green" }}>
          {space.occupied ? "Ocupado" : "Libre"}
        </strong>
      </p>

      {space.occupied ? (
        <>
          <p>Usuario: {space.user}</p>
          <p>Hasta: {space.endTime}</p>
          {space.user === user.name && (
            <button onClick={() => onCancel(space.reservationId)}>
              Cancelar reserva
            </button>
          )}
        </>
      ) : (
        <button onClick={() => onReserve(space.id)}>Reservar</button>
      )}

      <style jsx>{`
        .cowork-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1rem;
          background: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cowork-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        .cowork-card h3 {
          margin: 0 0 0.5rem 0;
          color: #333;
        }
        .cowork-card p {
          margin: 0.25rem 0;
          color: #555;
        }
        .cowork-card button {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .cowork-card button:hover {
          opacity: 0.9;
        }
        .cowork-card button:active {
          transform: scale(0.98);
        }
        .cowork-card button {
          background-color: ${space.occupied ? "#dc3545" : "#28a745"};
        }
      `}</style>
    </div>
  );
}
