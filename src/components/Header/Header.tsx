import React from "react";
import image from "../../assets/default-image.jpg";
import { useUserProfileContent } from "./ShowUserProfileContent-hook";
import styles from "../../styles/Header.module.css";

const Header: React.FC = () => {
  const { isProfileShown, toggle } = useUserProfileContent();
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logoContent}>
          <h1 className={styles.logo}>Trelloid</h1>
          <div className={styles.languageContent}>
            <select className={styles.languageSelect}>
              <option value="en">🇺🇸</option>
              <option value="hy">🇦🇲</option>
              <option value="ru">🇷🇺</option>
            </select>
          </div>
        </div>
        <div className={styles.userContent} onClick={() => toggle()}>
          <div className={styles.userInfo}>
            <img src={image} alt="user image" />
            <p>First name</p>
          </div>
          {isProfileShown && (
            <div className={styles.showedProfile}>
              <p>change password</p>
              <p>logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
