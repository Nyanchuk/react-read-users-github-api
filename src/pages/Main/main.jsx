import styles from "./main.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/githubW.png";
import { useState } from "react";
import Profile from "../../components/Profile/profile";

export const Main = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const nextPage = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=${itemsPerPage}&page=${currentPage + 1}`
      );
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
          <button className={styles.header__button} onClick={handleSearch}>Поиск</button>
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
      <div>
    <button onClick={prevPage}>Previous</button>
    <span>{currentPage}</span>
    <button onClick={nextPage}>Next</button>
  </div>
    </div>
  );
};
