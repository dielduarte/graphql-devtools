import React from 'react';
import styles from './Grid.module.css';

interface GridProps {
  Left: React.ReactElement;
  Right: React.ReactElement;
}

function Grid({ Left, Right }: GridProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.left}>{Left}</div>
      <div className={styles.right}>{Right}</div>
    </div>
  );
}

export default Grid;
