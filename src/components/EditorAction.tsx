import React, { memo } from 'react';
import classNames from 'classnames';

import styles from './EditorAction.module.css';
import { ReactComponent as SuccessIcon } from 'icons/success.svg';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';

interface EditorActionProps {
  success?: boolean;
  onClick?: () => void;
  className?: string;
}

function EditorAction({
  onClick = () => {},
  success,
  className = '',
}: EditorActionProps) {
  const classes = classNames({
    [styles.action]: true,
    [styles.success]: success,
    [className]: true,
  });

  return (
    <div className={classes} onClick={onClick}>
      {success ? <SuccessIcon /> : <CopyIcon />}
    </div>
  );
}

export default memo(EditorAction);
