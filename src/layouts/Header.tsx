import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
  Icon: React.ReactElement;
  Content: React.ReactElement;
}

function Header({ title, Icon, Content }: HeaderProps) {
  return (
    <header className={styles.header}>
      {Icon}
      <h1 className={styles.title}>{title}</h1>
      {Content}
    </header>
  );
}

export default Header;
