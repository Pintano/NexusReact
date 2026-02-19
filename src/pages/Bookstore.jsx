import { useState, useCallback } from "react";
import {
  getTopBooks,
  getCategories,
  getBooksByCategory,
} from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/layout/Navbar";
import BookList from "../components/BookList";

function CategoryMenu({ categories, loading, onSelect }) {
  const [collapsed, setCollapsed] = useState(true);
  const [activeId, setActiveId] = useState(null);

  if (loading) return <p>Cargando categorías...</p>;
  if (!categories || categories.length === 0) return <p>No hay categorías</p>;

  const handleClick = (id) => {
    setActiveId(id);
    onSelect(id);
    if (window.innerWidth < 768) setCollapsed(true); // auto colapsa en móvil
  };

  return (
    <div className="category-menu">
      {/* Botón hamburguesa solo en móvil */}
      <button
        className="menu-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "☰ Categorías" : "✕ Cerrar"}
      </button>

      {/* Lista de categorías */}
      <ul className={collapsed ? "collapsed" : "expanded"}>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => handleClick(cat.id)}
              className={activeId === cat.id ? "active" : ""}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Estilos */}
      <style>
        {`
          .category-menu {
            width: 220px;
          }
          .menu-toggle {
            display: none;
            width: 100%;
            padding: 0.5rem;
            margin-bottom: 1rem;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          li button {
            display: block;
            width: 100%;
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 6px;
            background: #fff;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
          }
          li button.active {
            background: #007bff;
            color: white;
            font-weight: bold;
          }

          /* MOBILE */
          @media (max-width: 767px) {
            .category-menu {
              width: 100%;
            }
            .menu-toggle {
              display: block;
            }
            ul.collapsed {
              display: none;
            }
            ul.expanded {
              display: block;
              margin-top: 0.5rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default function Bookstore() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: topBooks, loading: loadingTop } = useFetch(getTopBooks, []);
  const { data: categories, loading: loadingCategories } = useFetch(getCategories, []);

  const fetchCategoryBooks = useCallback(() => {
    if (selectedCategory) return getBooksByCategory(selectedCategory);
    return Promise.resolve(null);
  }, [selectedCategory]);

  const { data: categoryBooks, loading: loadingBooks } = useFetch(fetchCategoryBooks);

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        <div
          className="bookstore-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Contenedor de menú + libros */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <CategoryMenu
              categories={categories}
              loading={loadingCategories}
              onSelect={setSelectedCategory}
            />

            <main style={{ flex: 1 }}>
              {!selectedCategory && (
                <>
                  <h2 style={{ marginBottom: "1rem" }}>Top 10 libros más vendidos</h2>
                  <BookList books={topBooks} loading={loadingTop} />
                </>
              )}

              {selectedCategory && (
                <>
                  <h2 style={{ marginBottom: "1rem" }}>Libros de la categoría</h2>
                  <BookList books={categoryBooks} loading={loadingBooks} />
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* MEDIA QUERY para desktop */}
      <style>
        {`
          @media (min-width: 768px) {
            .bookstore-container > div {
              flex-direction: row;
              align-items: flex-start;
            }
            .bookstore-container main {
              margin-left: 2rem;
            }
            .category-menu ul {
              display: block !important;
            }
          }
        `}
      </style>
    </div>
  );
}
