export default function CoworkingCard({ space, user, onReserve, onCancel, onHover }) {
  return (
    <div className="cowork-card"

      onMouseEnter={() => onHover(space)}
      onMouseLeave={() => onHover(null)}
      style={{
        width: "250px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>{space.name || `Espacio ${space.id}`}</h3>
      <p style={{ margin: "0.25rem 0", color: "#555" }}>Capacidad: {space.capacity} personas</p>
      <p style={{ margin: "0.25rem 0", color: "#555" }}>
        Estado:{" "}
        <strong style={{ color: space.occupied ? "red" : "green" }}>
          {space.occupied ? "Ocupado" : "Libre"}
        </strong>
      </p>

      {space.occupied ? (
        <>
          <p style={{ margin: "0.25rem 0", color: "#555" }}>Usuario: {space.user}</p>
          <p style={{ margin: "0.25rem 0", color: "#555" }}>Hasta: {space.endTime}</p>
          {space.user === user.name && (
            <button
              onClick={() => onCancel(space.reservationId)}
              style={{
                marginTop: "0.5rem",
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a71d2a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
            >
              Cancelar reserva
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => onReserve(space.id)}
          style={{
            marginTop: "0.5rem",
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e7e34")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
        >
          Reservar  
        </button>
      )}
    </div>
  );
}
