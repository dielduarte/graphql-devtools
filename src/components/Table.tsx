import React, { useContext } from 'react';

import { CoreContext } from '../core/CoreContext';
import Status from './Status';
import RequestName from './RequestName';

import styles from './Table.module.css';

function Table() {
  const { current } = useContext<any>(CoreContext);
  const { requests, resquestsMetaDataById } = current.context;

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
          <th>
            <h3>Timeline</h3>
          </th>
        </tr>
      </thead>

      <tbody>
        {requests.map(({ requestId }: CoreRequest) => {
          const { queryName, statusCode, operation } = resquestsMetaDataById[
            requestId
          ];
          return (
            <tr key={requestId}>
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
