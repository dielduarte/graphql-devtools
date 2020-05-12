import React, { memo } from 'react';
import classNames from 'classnames';

import styles from './Status.module.css';
import useGetClassNames from 'hooks/useGetClassNames';

type StatusStylesProps = Record<'tag' | 'loading' | 'errorOrCanceled' | 'success', boolean>;

function Status({ statusCode }: { statusCode: StatusCode }) {
  const getClassNames = useGetClassNames<StatusStylesProps>(styles);
  const className = getClassNames({
    tag: true,
    loading: statusCode === 'loading',
    errorOrCanceled: statusCode === 'canceled' || (statusCode !== 200 && statusCode !== 'loading'),
    success: statusCode === 200,
  });

  return <div className={className}>{statusCode}</div>;
}

export default memo(Status);
