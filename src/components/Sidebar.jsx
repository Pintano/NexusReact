export default function Sidebar({ categories, onSelect }) {
  return (
    <aside style={{ width: "250px" }}>
      <h3>Categorías</h3>

      {categories.map((cat) => (
        <button
          key={cat.id}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "0.5rem",
          }}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </aside>
  );
}
