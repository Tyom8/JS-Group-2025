import React from "react";
import { useTranslation } from "react-i18next";
import image from "../../assets/default-image.jpg";
import styles from "../../styles/Header.module.css";
import { useLanguage } from "./Language-hook";
import { useUserProfileContent } from "./ShowUserProfileContent-hook";

const Header: React.FC = () => {
  // all needed fields and functions from useUserProfileContent hook
  const { isProfileShown, toggle } = useUserProfileContent();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logoContent}>
          <h1 className={styles.logo}>Trelloid</h1>
          <div className={styles.languageContent}>
            <select
              className={styles.languageSelect}
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
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
              <p>{t("header.changePassword")}</p>
              <p>{t("header.logout")}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
