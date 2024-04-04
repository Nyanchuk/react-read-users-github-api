import styles from "./main.module.css";
import { Link } from "react-router-dom";
import logo from "../../img/githubW.png";
import { useState } from "react";
import Profile from "../../components/Profile/profile";

export const Main = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}`
      );
      const data = await response.json();
      setUsers(data.items); // Assuming the response contains an 'items' array
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
    </div>
  );
};
