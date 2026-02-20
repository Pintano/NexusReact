import { useState, useCallback, useEffect } from "react";
import {
  getTopBooks,
  getCategories,
  getBooksByCategory,
} from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/layout/Navbar";
import BookList from "../components/BookList";

function CategoryMenu({ categories, loading, onSelect, selected }) {
  const [collapsed, setCollapsed] = useState(true);
  const [activeId, setActiveId] = useState(selected ?? null);

  // sync when `selected` prop changes (always call hook before returns)
  useEffect(() => {
    setActiveId(selected ?? null);
  }, [selected]);

  if (loading) return <p>Cargando categorías...</p>;
  if (!categories || categories.length === 0) return <p>No hay categorías</p>;

  const handleClick = (id) => {
    setActiveId(id);
    onSelect(id);
    if (window.innerWidth < 768) setCollapsed(true); // auto colapsa en móvil
  };


  return (
    <div className="category-menu" role="navigation" aria-label="Categorías">
      {/* Botón hamburguesa solo en móvil */}
      <button
        className="menu-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
        aria-controls="category-list"
      >
        {collapsed ? "☰ Categorías" : "✕ Cerrar"}
      </button>

      {/* Lista de categorías */}
      <ul id="category-list" className={collapsed ? "collapsed" : "expanded"} role="list">
        <li>
          <button
            onClick={() => handleClick(null)}
            className={activeId === null ? "active" : ""}
            aria-pressed={activeId === null}
          >
            Todas
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => handleClick(cat.id)}
              className={activeId === cat.id ? "active" : ""}
              aria-pressed={activeId === cat.id}
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
            width: 100%;
            box-sizing: border-box;
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
            text-align: left;
          }
          .menu-toggle:focus-visible,
          .category-menu li button:focus-visible {
            outline: 3px solid rgba(0,123,255,0.25);
            outline-offset: 2px;
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
          li button[aria-pressed="true"] {
            box-shadow: inset 0 0 0 2px rgba(0,123,255,0.08);
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
              selected={selectedCategory}
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
              flex: 1 1 auto;
              min-width: 0;
            }
            .category-menu {
              flex: 0 0 220px;
              max-width: 220px;
                position: sticky;
                top: 96px;
                align-self: flex-start;
                height: calc(100vh - 120px);
                overflow: hidden;
            }
              .category-menu ul {
                display: block !important;
                max-height: calc(100vh - 160px);
                overflow-y: auto;
                padding-right: 8px;
              }
              /* slightly increase menu button spacing on desktop */
              .category-menu li button {
                padding: 0.6rem 0.9rem;
              }
          }
        `}
      </style>
    </div>
  );
}
