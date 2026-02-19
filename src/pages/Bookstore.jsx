import { useState, useCallback } from "react";
import {
  getTopBooks,
  getCategories,
  getBooksByCategory,
} from "../api/fetch";
import { useFetch } from "../hooks/useFetch";
import Navbar from "../components/layout/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import BookList from "../components/BookList";

export default function Bookstore() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: topBooks, loading: loadingTop } =
    useFetch(getTopBooks, []);

  const { data: categories, loading: loadingCategories } =
    useFetch(getCategories, []);

  const fetchCategoryBooks = useCallback(() => {
    if (selectedCategory) return getBooksByCategory(selectedCategory);
    return Promise.resolve(null);
  }, [selectedCategory]);

  const { data: categoryBooks, loading: loadingBooks } =
    useFetch(fetchCategoryBooks);

  return (
    <div>
      <Navbar />
        <div className="flex-row page-container">

        <CategoryMenu
          categories={categories}
          loading={loadingCategories}
          onSelect={setSelectedCategory}
        />

        <main style={{ flex: 1 }}>
          {!selectedCategory && (
            <>
              <h2>Top 10 libros más vendidos</h2>
              <BookList books={topBooks} loading={loadingTop} />
            </>
          )}

          {selectedCategory && (
            <>
              <h2>Libros de la categoría</h2>
              <BookList books={categoryBooks} loading={loadingBooks} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
