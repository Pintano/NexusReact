const BASE_URL = "https://mock.apidog.com/m1/1131845-1123817-default";

export async function request(method, endpoint, body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
}

export const getTopBooks = () => request("GET", "/books/top");
export const getCategories = () => request("GET", "/categories");
export const getBooksByCategory = (id) =>
  request("GET", `/categories/${id}/books`);
export const getBooksWithFilters = (query = "") =>
  request("GET", `/books${query}`);
export const getBookDetails = (id) => request("GET", `/books/${id}`);
export const getUserPurchases = (userId) =>
  request("GET", `/users/${userId}/purchase`);
export const purchaseBooks = (data) =>
  request("POST", "/purchases", data);

export const getSpaces = () => request("GET", "/coworking/spaces");
export const getSpaceDetail = (id) =>
  request("GET", `/coworking/spaces/${id}`);
export const createReservation = (data) =>
  request("POST", "/coworking/reservations", data);
export const deleteReservation = (id) =>
  request("DELETE", `/coworking/reservations/${id}`);
export const updateReservation = (spaceId, data) =>
  request("PUT", `/coworking/reservations/${spaceId}`, data);
export const getUserReservations = (userId) =>
  request("GET", `/coworking/${userId}/reservations`);
