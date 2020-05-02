import React from 'react';
import classNames from 'classnames';

import styles from './EditorActions.module.css';
import { ReactComponent as SuccessIcon } from 'icons/success.svg';

interface EditorActionProps {
  className?: string;
  children?: React.ReactNode;
}

interface ActionProps {
  onClick: VoidFunction;
  Icon: React.ReactNode;
  success?: boolean;
  loading?: boolean;
}

function EditorActions({ children, className = '' }: EditorActionProps) {
  const classes = classNames({
    [styles.root]: true,
    [className]: true,
  });

  return <div className={classes}>{children}</div>;
}

function Action({
  onClick,
  success = false,
  loading = false,
  Icon,
}: ActionProps) {
  const classes = classNames({
    [styles.action]: true,
    [styles.success]: success,
    [styles.loading]: loading,
  });

  return (
    <div className={classes} onClick={onClick}>
      {success ? <SuccessIcon /> : Icon}
    </div>
  );
}

EditorActions.Action = Action;

export default EditorActions;
