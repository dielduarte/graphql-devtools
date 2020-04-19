import React from 'react';
import { getFilterClassNames } from './Filters.utils';

function Filters() {
  return (
    <>
      <button className={getFilterClassNames()}>All</button>
      <button className={getFilterClassNames({ isQuery: true })}>
        Queries
      </button>
      <button className={getFilterClassNames({ isMutation: true })}>
        Mutations
      </button>
    </>
  );
}

export default Filters;
