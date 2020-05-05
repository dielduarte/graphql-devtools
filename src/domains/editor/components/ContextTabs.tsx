import React from 'react';
import classNames from 'classnames';

import styles from './ContextTabs.module.css';

interface ContextTabsProps {
  children: React.ReactNode;
  className?: string;
}

function ContextTabs({ children, className }: ContextTabsProps) {
  const _className = classNames({
    [styles.tabs]: true,
    [className || '']: true,
  });

  return <div className={_className}>{children}</div>;
}

interface ContextTabProps {
  title: string;
  background: string;
  onClick: VoidFunction;
  hide?: boolean;
}

function ContextTab({
  title,
  background,
  onClick,
  hide = false,
}: ContextTabProps) {
  if (hide) return null;

  return (
    <button className={styles.tab} style={{ background }} onClick={onClick}>
      {title}
    </button>
  );
}

ContextTabs.Tab = ContextTab;
export default ContextTabs;
