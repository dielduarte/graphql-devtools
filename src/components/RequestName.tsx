import React, { memo } from 'react';
import classNames from 'classnames';

import styles from './RequestName.module.css';

function RequestName({
  queryName,
  operation,
}: {
  queryName: string;
  operation: Operation;
}) {
  const className = classNames({
    [styles.name]: true,
    [styles.query]: operation === 'query',
    [styles.mutation]: operation === 'mutation',
  });

  return <h4 className={className}>{queryName}</h4>;
}

export default memo(RequestName);
