import React, { memo } from 'react';
import cn from 'classnames';

import styles from './EditorAction.module.css';
import { ReactComponent as SuccessIcon } from 'icons/success.svg';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';

interface EditorActionProps {
  success?: boolean;
};

function EditorAction({ success }: EditorActionProps) {
  const classes = cn({
    [styles.root]: true,
    [styles.success]: success,
  });

  return <div className={classes}>
    {success ? <SuccessIcon /> : <CopyIcon />}
  </div>
}

export default memo(EditorAction);
