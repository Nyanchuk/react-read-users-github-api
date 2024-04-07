// Юзеры без сортировки
export const fetchUsers = async (
  searchTerm,
  currentPage,
  itemsPerPage,
) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}`,
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};
// Сортировка юзеров по возрастанию репозиториев
export const fetchUsersSortedAscending = async (
  searchTerm,
  currentPage,
  itemsPerPage,
) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}&sort=repositories&order=asc`,
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching users sorted ascending: ", error);
    return [];
  }
};
// Сортировка юзеров по убыванию репозиториев
export const fetchUsersSortedDescending = async (
  searchTerm,
  currentPage,
  itemsPerPage,
) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}&sort=repositories&order=desc`,
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching users sorted descending: ", error);
    return [];
  }
};
