import React, { useCallback } from 'react';

import Status from './Status';
import RequestName from './RequestName';

import styles from './Table.module.css';

interface TableProps {
  requests: CoreRequest[];
  resquestsMetaDataById: CoreRequestMetaDataById;
  onRequestSelected: (request: CoreRequest) => void;
}

function Table({
  requests,
  resquestsMetaDataById,
  onRequestSelected
}: TableProps) {
  const handleOnRequestSelected = useCallback(
    (request: CoreRequest) => () => {
      onRequestSelected(request);
    },
    [onRequestSelected]
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <h3>Name</h3>
          </th>
          <th>
            <h3>Status</h3>
          </th>
        </tr>
      </thead>

      <tbody>
        {requests.map((request: CoreRequest) => {
          const { queryName, statusCode, operation } = resquestsMetaDataById[
            request.requestId
          ];
          return (
            <tr
              key={request.requestId}
              onClick={handleOnRequestSelected(request)}
            >
              <td>
                <RequestName queryName={queryName} operation={operation} />
              </td>
              <td>
                <Status statusCode={statusCode} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
