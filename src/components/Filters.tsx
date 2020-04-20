import React from 'react';
import { getFilterClassNames } from './Filters.utils';
import { Sender, State } from 'xstate';

interface FiltersProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

function Filters({ send, current }: FiltersProps) {
  return (
    <>
      <button
        className={getFilterClassNames({
          active: current.matches('core.listingRequests.all'),
        })}
        onClick={() => send('SHOW_ALL')}
      >
        All
      </button>
      <button
        className={getFilterClassNames({
          isQuery: true,
          active: current.matches('core.listingRequests.queries'),
        })}
        onClick={() => send('FILTER_BY_QUERIES')}
      >
        Queries
      </button>
      <button
        className={getFilterClassNames({
          isMutation: true,
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
