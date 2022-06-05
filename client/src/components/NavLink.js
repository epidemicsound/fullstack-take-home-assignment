import {Link, useMatch, useResolvedPath} from "react-router-dom";
import styles from "../App.module.css";
import React from "react";

function NavLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li>
      <Link className={ match ? styles.active : null } to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default NavLink;
