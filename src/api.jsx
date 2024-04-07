// Юзеры без сортировки
export const fetchUsers = async (
  searchTerm,
  currentPage,
  itemsPerPage,
  token
) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
  token
) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}&sort=repositories&order=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
  token
) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}&sort=repositories&order=desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching users sorted descending: ", error);
    return [];
  }
};
