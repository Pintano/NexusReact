import { useState } from "react";

export default function CategoryMenu({ categories, loading, onSelect }) {
  const [activeId, setActiveId] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  if (loading) return <p>Cargando categorías...</p>;
  if (!categories || categories.length === 0) return <p>No hay categorías disponibles</p>;

  const handleClick = (id) => {
    setActiveId(id);
    onSelect(id);
  };

  return (
    <aside className="category-menu" style={{
        width: collapsed ? "50px" : "220px",
        transition: "width 0.3s",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        overflow: "hidden",
        marginRight: "2rem",
      }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: "100%",
          marginBottom: "1rem",
          padding: "0.5rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s, transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        {collapsed ? "▶" : "Categorías"}
      </button>

      {/* Lista de categorías */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {!collapsed &&
          categories.map((cat) => (
            <li key={cat.id} style={{ marginBottom: "0.5rem" }}>
              <button
                onClick={() => handleClick(cat.id)}
                style={{
                  width: "100%",
                  backgroundColor: activeId === cat.id ? "#007bff" : "#fff",
                  color: activeId === cat.id ? "#fff" : "#333",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "0.5rem 0.75rem",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: activeId === cat.id ? "bold" : "normal",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeId !== cat.id) e.currentTarget.style.backgroundColor = "#e0e0e0";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  if (activeId !== cat.id) e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {cat.name}
              </button>
            </li>
          ))}
      </ul>
    </aside>
  );
}
