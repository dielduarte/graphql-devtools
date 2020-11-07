import React, { useCallback } from 'react';
import classNames from 'classnames';

import Status from './Status';

import { compareRequests } from './Table.utils';
import { styled } from 'stitches.config';

const Table = styled('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
  color: '$bg4',

  'th:first-child, tr td:first-child': {
    width: '335px',
    paddingLeft: '8px',
    textAlign: 'left',
  },

  'th:nth-child(2), td:nth-child(2)': {
    width: '110px',
    textAlign: 'right',
    paddingRight: '8px',
  },

  th: {
    padding: '$3 0 $3 0',
    fontWeight: '$regular',
  },

  '> tbody > tr > td': {
    padding: '$3',
  },

  '> tbody > tr:hover': {
    background: '$secondary',
    cursor: 'pointer',
    color: '$bg4',
  },

  '> tbody > tr.isActive': {
    background: '$primary',
    color: '$white',

    ':hover': {
      background: '$primary',
      color: '$white',
    },

    '.status': {
      color: '$white',
      fill: '$white',
    },
  },
});

const Operation = styled('div', {
  width: '4px',
  height: '4px',
  borderRadius: '$half',
  display: 'inline-block',
  marginRight: '$2',
  position: 'relative',
  top: '-2px',

  variants: {
    operation: {
      query: {
        background: '$success',
      },
      mutation: {
        background: '$warning',
      },
    },
  },
});

interface TableProps {
  requests: CoreRequest[];
  requestsMetaDataById: CoreRequestMetaDataById;
  selectedRequest?: CoreRequest;
  onRequestSelected: (request: CoreRequest) => void;
}

function TableComponent({ requests, requestsMetaDataById, selectedRequest, onRequestSelected }: TableProps) {
  const handleOnRequestSelected = useCallback(
    (request: CoreRequest) => () => {
      onRequestSelected(request);
    },
    [onRequestSelected],
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {requests.map((request: CoreRequest) => {
          const { queryName, statusCode, operation } = requestsMetaDataById[request.requestId];
          return (
            <tr
              key={request.requestId}
              onClick={handleOnRequestSelected(request)}
              className={classNames({
                isActive: selectedRequest && compareRequests(request, selectedRequest),
              })}
            >
              <td>
                <Operation operation={operation} />
                {queryName}
              </td>
              <td>
                <Status statusCode={statusCode} className="status" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableComponent;
