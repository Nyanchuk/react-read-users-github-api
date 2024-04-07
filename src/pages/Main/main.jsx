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
import { Modal } from "../../components/Modal/modal";
import { Link } from "react-router-dom";
import MySkeleton from "../../components/Skeleton/skeleton";

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
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const token = "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";

  // Обработчик клика для отключения сортировки
  const handleSortOff = async () => {
    setError("");
    if (searchTerm.trim() === "") {
      setShowModal(true);
      setError("Для отключения сортировки введите логин");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      setShowModal(true);
      setError("Для сортировки страницы введите логин латинскими буквами");
      return;
    }
    await setUsers([]);
    await dispatch(setMaxRepositories(false));
    await dispatch(setMinRepositories(false));
    await handleSearch();
  };
  // Обработчик клика для сортировки по возрастанию репозиториев
  const handleSortAscending = async () => {
    setError("");
    if (searchTerm.trim() === "") {
      setShowModal(true);
      setError("Для сортировки страницы введите логин");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      setShowModal(true);
      setError("Для сортировки страницы введите логин латинскими буквами");
      return;
    }
    setIsLoading(true);
    setIsSearchStarted(true);
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
    setIsLoading(false);
    setIsSearchStarted(false);
  };
  // Обработчик клика для сортировки по убыванию репозиториев
  const handleSortDescending = async () => {
    setError("");
    if (searchTerm.trim() === "") {
      setShowModal(true);
      setError("Для сортировки страницы введите логин");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      setShowModal(true);
      setError("Для сортировки страницы введите логин латинскими буквами");
      return;
    }
    setIsLoading(true);
    setIsSearchStarted(true);
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
    setIsLoading(false);
    setIsSearchStarted(false);
  };
  const handleSearch = async () => {
    setError("");
    if (searchTerm.trim() === "") {
      setShowModal(true);
      setError("Введите текст для поиска");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      setShowModal(true);
      setError("Поиск поддерживается только для латинских букв");
      return;
    }
    setIsLoading(true);
    setIsSearchStarted(true);
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
      setError("Ошибка загрузки данных");
    } finally {
      setIsLoading(false);
      setIsSearchStarted(false);
    }
  };
  const nextPage = async () => {
    setError("");
    if (searchTerm.trim() === "") {
      setShowModal(true);
      setError("Для загрузки следующей страницы введите логин");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      setShowModal(true);
      setError("Для загрузки следующей страницы введите логин латинскими буквами");
      return;
    }
    setIsLoading(true);
    setIsSearchStarted(true);
    try {
      let users;
      if (maxRepositories) {
        users = await fetchUsersSortedAscending(
          searchTerm,
          currentPage + 1,
          itemsPerPage,
          token
        );
      } else if (minRepositories) {
        users = await fetchUsersSortedDescending(
          searchTerm,
          currentPage + 1,
          itemsPerPage,
          token
        );
      } else {
        users = await fetchUsers(
          searchTerm,
          currentPage + 1,
          itemsPerPage,
          token
        );
      }

      if (users.length > 0) {
        setCurrentPage((prevPage) => prevPage + 1);
        setUsers(users);
        setIsLoading(false);
        setIsSearchStarted(false);
        setHasPrevPage(true);
        if (users.length < itemsPerPage) {
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
    setError("");
    if (searchTerm.trim() === "") {
      setShowModal(true);
      setError("Для загрузки предыдущей страницы введите логин");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(searchTerm)) {
      setShowModal(true);
      setError("Для загрузки предыдущей страницы введите логин латинскими буквами");
      return;
    }
    
    if (currentPage === 1) {
      return;
    }

    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setHasMoreResults(true);
    setHasPrevPage(currentPage > 2);
    setIsLoading(true);
    setIsSearchStarted(true);
    try {
      let users;
      if (maxRepositories) {
        users = await fetchUsersSortedAscending(
          searchTerm,
          currentPage - 1,
          itemsPerPage,
          token
        );
      } else if (minRepositories) {
        users = await fetchUsersSortedDescending(
          searchTerm,
          currentPage - 1,
          itemsPerPage,
          token
        );
      } else {
        users = await fetchUsers(
          searchTerm,
          currentPage - 1,
          itemsPerPage,
          token
        );
      }

      setUsers(users);
      setHasPrevPage(currentPage > 2);
      setIsLoading(false);
      setIsSearchStarted(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setError("");
  };
  return (
    <div>
      <div className={styles.head}>
        <div className={styles.logo__item}>
          <Link to="/">
          <img src={logo} className={styles.logo} alt="Логотип" />
          </Link>
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
        <div className={styles.filters}>
          <div className={styles.filters__block}>
            Сортировка по количеству репозиториев:
          </div>
          <div className={styles.filters__content}>
            <button
              className={maxRepositories ? styles.activeButton : styles.filter}
              onClick={handleSortAscending}
            >
              По возрастанию
            </button>
            <button
              className={minRepositories ? styles.activeButton : styles.filter}
              onClick={handleSortDescending}
            >
              По убыванию
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
      <div className={styles.profiles}>
      {!isSearchStarted && users.length === 0 &&(
        <div className={styles.users__none}>Введите корректный логин пользователя GitHub</div>
      )}
      {isSearchStarted && isLoading ? (
        <MySkeleton />
      ) : (
        <div className={styles.profiles}>
          {users.map((user) => (
            <Profile key={user.id} user={user} editLink={`/product/${user.id}`} />
          ))}
        </div>
      )}
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
      {showModal && <Modal closeModal={closeModal}  errorText={error} />}
    </div>
  );
};
