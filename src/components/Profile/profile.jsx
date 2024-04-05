import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import repo from "../../img/repository.png";
import users from "../../img/users.png";
import refresh from "../../img/refresh.png";
import wand from "../../img/magic-wand.png";
import { Link } from "react-router-dom";

function Profile({ user }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const clickUserInfo = async () => {
    if (isOpen) {
      setUserDetails(null);
      setIsOpen(false);
      return;
    }

    const response = await fetch(`https://api.github.com/users/${user.login}`);
    const data = await response.json();
    setUserDetails(data);
    setIsOpen(true);
  };
  return (
    <div className={styles.content__cards}>
      <div className={styles.cards__item}>
        <div className={styles.cards}>
          <div className={styles.cards__card}>
            <div className={styles.card__images}>
              <img
                src={user.avatar_url}
                alt="product"
                className={styles.card__image}
              />
            </div>
            <div className={styles.card__content}>
              <div className={styles.main__h3}>{user.login}</div>
             
            </div>
          </div>
          <Link to={user.html_url} className={styles.main__url}>{user.html_url}</Link>
          <button className={styles.cards__button} onClick={clickUserInfo}>
            {isOpen ? "-" : "+"}
          </button>
        </div>
        {userDetails && (
          <div className={styles.user__details}>
            <div className={styles.user__details_block}>
              <img src={refresh} style={{ width: "15px" }} />
              <span>Обновление профиля:</span>
              <div className={styles.position}>
                {new Date(userDetails.updated_at).toLocaleDateString("ru-RU")}
              </div>
            </div>
            <div className={styles.user__details_block}>
              <img src={repo} style={{ width: "15px" }} />
              <span>Репозитории:</span>
              <div className={styles.position}>{userDetails.public_repos}</div>
            </div>
            <div className={styles.user__details_block}>
              <img src={users} style={{ width: "15px" }} />
              <span>Подписчики:</span>
              <div className={styles.position}>{userDetails.followers}</div>
            </div>
            <div className={styles.user__details_block}>
              <img src={users} style={{ width: "15px" }} />
              <span>Подписки:</span>
              <div className={styles.position}>{userDetails.following}</div>
            </div>

            <div className={styles.user__details_block}>
              <img src={wand} style={{ width: "15px" }} />
              <span>Дата создания:</span>
              <div className={styles.position}>
                {new Date(userDetails.created_at).toLocaleDateString("ru-RU")}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// {
//     "login": "Nyanchuk",
//     "id": 135814218,
//     "node_id": "U_kgDOCBhcSg",
//     "avatar_url": "https://avatars.githubusercontent.com/u/135814218?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/Nyanchuk",
//     "html_url": "https://github.com/Nyanchuk",
//     "followers_url": "https://api.github.com/users/Nyanchuk/followers",
//     "following_url": "https://api.github.com/users/Nyanchuk/following{/other_user}",
//     "gists_url": "https://api.github.com/users/Nyanchuk/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/Nyanchuk/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/Nyanchuk/subscriptions",
//     "organizations_url": "https://api.github.com/users/Nyanchuk/orgs",
//     "repos_url": "https://api.github.com/users/Nyanchuk/repos",
//     "events_url": "https://api.github.com/users/Nyanchuk/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/Nyanchuk/received_events",
//     "type": "User",
//     "site_admin": false,
//     "name": "Julya Nyanchuk",
//     "company": null,
//     "blog": "",
//     "location": null,
//     "email": null,
//     "hireable": null,
//     "bio": null,
//     "twitter_username": null,
//     "public_repos": 13,
//     "public_gists": 0,
//     "followers": 1,
//     "following": 1,
//     "created_at": "2023-06-07T07:58:41Z",
//     "updated_at": "2024-04-01T04:23:54Z"
//   }

export default Profile;
