import React from 'react';
import styles from './ContextMenu.module.css';

export const ContextMenu = props => {
  const { menuData, top, left } = props;

  return (
    <>
      <div className={styles.contextMenuContainer} style={{ top, left }}>
        <ul className={styles.contextMenuList}>
          {menuData.map(item => (
            <li
              key={`contextmenu__${item.value}`}
              className={styles.contextMenuList__item}
              onClick={item.onClick}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
