import React, { memo } from 'react';

import styles from './RequestName.module.css';
import useGetClassNames from 'hooks/useGetClassNames';

type RequestNameStylesProps = Record<'name' | 'query' | 'mutation', boolean>;

function RequestName({ queryName, operation }: { queryName: string; operation: Operation }) {
  const getClassNames = useGetClassNames<RequestNameStylesProps>(styles);
  const className = getClassNames({
    name: true,
    query: operation === 'query',
    mutation: operation === 'mutation',
  });

  return <h4 className={className}>{queryName}</h4>;
}

export default memo(RequestName);
