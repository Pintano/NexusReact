import { useState } from "react";

export default function Sidebar({ categories = [], onSelect }) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      style={{
        width: "250px",
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* CABECERA */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          fontSize: "1.1rem",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        Categorías
        <span>{open ? "▾" : "▸"}</span>
      </button>

      {/* CONTENIDO */}
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#f7f7f7",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
