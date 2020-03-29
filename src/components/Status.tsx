import React, { memo } from 'react';
import ClassNames from 'classnames';

import styles from './Status.module.css';

function Status({ statusCode }: { statusCode: StatusCode }) {
  const className = ClassNames({
    [styles.tag]: true,
    [styles.loading]: statusCode === 'loading',
    [styles.errorOrCanceled]:
      statusCode === 'canceled' ||
      (statusCode !== 200 && statusCode !== 'loading'),
    [styles.success]: statusCode === 200
  });

  return <div className={className}>{statusCode}</div>;
}

export default memo(Status);
