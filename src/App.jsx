import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Bookstore from "./pages/Bookstore";
import BookDetail from "./pages/BookDetail";
import Coworking from "./pages/Coworking";
import MyBooks from "./pages/MyBooks";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/bookstore" element={<Bookstore />} />
            <Route path="/bookstore/:id" element={<BookDetail />} />
            <Route path="/coworking" element={<Coworking />} />
            <Route path="/my-books" element={<MyBooks />} />
          </Route>

          {/* Fallback: cualquier ruta desconocida */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
