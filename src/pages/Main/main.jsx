import styles from "./main.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/githubW.png";
import { useState } from "react";
import Profile from "../../components/Profile/profile";

export const Main = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const itemsPerPage = 15;

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage}`
      );
      const data = await response.json();
      setUsers(data.items);

      if (data.items.length < itemsPerPage) {
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
      <div className={styles.filters}>
        <div className={styles.filters__block}>Фильтр</div>
      </div>
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
