import React, { memo } from 'react';
import cn from 'classnames';

import styles from './EditorAction.module.css';
import { ReactComponent as SuccessIcon } from 'icons/success.svg';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';

interface EditorActionProps {
  success?: boolean;
  onClick?: () => void;
};

function EditorAction({
  onClick = () => {},
  success,
}: EditorActionProps) {
  const classes = cn({
    [styles.root]: true,
    [styles.success]: success,
  });

  return <div className={classes} onClick={onClick}>
    {success ? <SuccessIcon /> : <CopyIcon />}
  </div>
}

export default memo(EditorAction);
