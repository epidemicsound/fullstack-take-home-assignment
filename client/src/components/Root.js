import React, { useState } from "react";
import styles from "../App.module.css";
import logo from "../assets/logo.svg";
import { Outlet, Link } from "react-router-dom";

const Root = () => {
  const [styleComponent, setStyleComponent] = useState("tracks");

  return (
    <>
      <div className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <Link
                to="/tracks"
                className={styleComponent === "tracks" && styles.active}
                onClick={() => setStyleComponent("tracks")}
              >
                Tracks
              </Link>
            </li>
            <li>
              <Link
                to="/playlists"
                className={styleComponent === "playlists" && styles.active}
                onClick={() => setStyleComponent("playlists")}
              >
                Playlists
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
