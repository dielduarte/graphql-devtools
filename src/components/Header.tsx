import React from 'react';
import { ReactComponent as RequestIcon } from '../icons/request.svg';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.iconBox}>
        <RequestIcon />
      </div>
      <h2>Requests</h2>
    </header>
  );
}

export default Header;
