import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  Icon: React.ReactElement;
}

function Header({ title, Icon }: HeaderProps) {
  return (
    <header className={styles.header}>
      {Icon}
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

export default Header;
