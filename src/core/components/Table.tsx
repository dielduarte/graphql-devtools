import React, { useCallback } from 'react';
import classNames from 'classnames';

import Status from './Status';
import RequestName from './RequestName';

import styles from './Table.module.css';
import { compareRequests } from './Table.utils';

interface TableProps {
  requests: CoreRequest[];
  requestsMetaDataById: CoreRequestMetaDataById;
  selectedRequest?: CoreRequest;
  onRequestSelected: (request: CoreRequest) => void;
}

function Table({
  requests,
  requestsMetaDataById,
  selectedRequest,
  onRequestSelected,
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
          const { queryName, statusCode, operation } = requestsMetaDataById[
            request.requestId
          ];
          return (
            <tr
              key={request.requestId}
              onClick={handleOnRequestSelected(request)}
              className={classNames({
                [styles.isActive]:
                  selectedRequest && compareRequests(request, selectedRequest),
              })}
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
