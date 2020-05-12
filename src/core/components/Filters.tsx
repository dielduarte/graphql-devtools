import React from 'react';
import { Sender, State } from 'xstate';
import styles from './Filters.module.css';
import useGetClassNames from 'hooks/useGetClassNames';

interface FiltersProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

type FilterStylesProps = Record<'query' | 'mutation' | 'active' | 'filter', boolean>;

function Filters({ send, current }: FiltersProps) {
  const getClassNames = useGetClassNames<FilterStylesProps>(styles);

  return (
    <>
      <button
        className={getClassNames({
          filter: true,
          active: current.matches('core.listingRequests.all'),
        })}
        onClick={() => send('SHOW_ALL')}
      >
        All
      </button>
      <button
        className={getClassNames({
          filter: true,
          query: true,
          active: current.matches('core.listingRequests.queries'),
        })}
        onClick={() => send('FILTER_BY_QUERIES')}
      >
        Queries
      </button>
      <button
        className={getClassNames({
          filter: true,
          mutation: true,
          active: current.matches('core.listingRequests.mutations'),
        })}
        onClick={() => send('FILTER_BY_MUTATIONS')}
      >
        Mutations
      </button>
    </>
  );
}

export default Filters;
