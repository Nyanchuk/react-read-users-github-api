import styles from "./main.module.css";
import logo from "../../img/githubW.png";
import { useState } from "react";
import Profile from "../../components/Profile/profile";
import { useDispatch, useSelector } from "react-redux";
import {
  setMaxRepositories,
  setMinRepositories,
} from "../../store/action/creators";
import {
  fetchUsers,
  fetchUsersSortedAscending,
  fetchUsersSortedDescending,
} from "../../api";

export const Main = () => {
  const dispatch = useDispatch();
  const maxRepositories = useSelector(
    (state) => state.product.max_repositories
  );
  const minRepositories = useSelector(
    (state) => state.product.min_repositories
  );
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const itemsPerPage = 20;
  const token = "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";

  // Обработчик клика для отключения сортировки
  const handleSortOff = async () => {
    await setUsers([]);
    await dispatch(setMaxRepositories(false));
    await dispatch(setMinRepositories(false));
    await handleSearch();
  };
  // Обработчик клика для сортировки по возрастанию репозиториев
  const handleSortAscending = async () => {
    await setUsers([]);
    await dispatch(setMaxRepositories(true));
    await dispatch(setMinRepositories(false));
    let users = await fetchUsersSortedAscending(
      searchTerm,
      currentPage,
      itemsPerPage,
      token
    );
    setUsers(users);
  };
  // Обработчик клика для сортировки по убыванию репозиториев
  const handleSortDescending = async () => {
    await setUsers([]);
    await dispatch(setMaxRepositories(false));
    await dispatch(setMinRepositories(true));
    let users = await fetchUsersSortedDescending(
      searchTerm,
      currentPage,
      itemsPerPage,
      token
    );
    setUsers(users);
  };
  // Обычный поиск
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }
    try {
      let users = await fetchUsers(
        searchTerm,
        currentPage,
        itemsPerPage,
        token
      );

      console.log(users);
      setUsers(users);

      if (users.length < itemsPerPage) {
        setHasMoreResults(false);
      } else {
        setHasMoreResults(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const nextPage = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${
          currentPage + 1
        }`
      );
      const data = await response.json();

      if (data.items.length > 0) {
        setCurrentPage((prevPage) => prevPage + 1);
        setUsers(data.items);
        setHasPrevPage(true);
        if (data.items.length < itemsPerPage) {
          setHasMoreResults(false);
        }
      } else {
        console.log("Больше результатов нет");
        setHasMoreResults(false);
      }
    } catch (error) {
      console.error("Ошибка при получении данных: ", error);
    }
  };
  const prevPage = async () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setHasMoreResults(true);
    setHasPrevPage(currentPage > 2);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${
          currentPage - 1
        }`
      );
      const data = await response.json();
      setUsers(data.items);
      setHasPrevPage(currentPage > 2);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div>
      <div className={styles.head}>
        <div className={styles.logo__item}>
          <img src={logo} className={styles.logo} alt="Логотип" />
          Search for a user on GitHub
        </div>
        <div>
          <input
            className={styles.header__input}
            placeholder="Введите логин пользователя"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button className={styles.header__button} onClick={handleSearch}>
            Поиск
          </button>
        </div>
      </div>
      {users.length > 0 && (
        <div className={styles.filters}>
          <div className={styles.filters__block}>Сортировка по:</div>
          <div className={styles.filters__content}>
            <button
              className={maxRepositories ? styles.activeButton : styles.filter}
              onClick={handleSortAscending}
            >
              По возрастанию репозиториев
            </button>
            <button
              className={minRepositories ? styles.activeButton : styles.filter}
              onClick={handleSortDescending}
            >
              По убыванию репозиториев
            </button>
            <button
              className={
                !maxRepositories && !minRepositories
                  ? styles.activeButton
                  : styles.filter
              }
              onClick={handleSortOff}
            >
              Без сортировки
            </button>
          </div>
        </div>
      )}
      <div className={styles.profiles}>
        {users.map((user) => (
          <Profile key={user.id} user={user} editLink={`/product/${user.id}`} />
        ))}
      </div>
      {users.length > 0 && (
        <div className={styles.pagination}>
          <button
            className={`${styles.button} ${
              !hasPrevPage ? styles.disabled : ""
            }`}
            onClick={prevPage}
          >
            Prev
          </button>
          <span>{currentPage}</span>
          <button
            className={`${styles.button} ${
              !hasMoreResults ? styles.disabled : ""
            }`}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
