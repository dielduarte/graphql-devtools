import React from 'react';

import coreMachine from './core/machine';
import { useMachine } from '@xstate/react';
import Table from './core/components/Table';
import Settings from './core/components/Settings';
import Filters from './core/components/Filters';
import CodeEditor from './domains/editor/components/CodeEditor';

import Header from 'layouts/Header';
import Grid, { FixedElement } from './layouts/Grid';
import Message from 'core/components/Message';
import { filterOperations } from 'core/_utils/operation';

function App() {
  const [current, send] = useMachine(coreMachine);
  const { requestsMetaDataById, selectedRequest } = current.context;
  const filteredRequests = filterOperations(current);

  return (
    <>
      <Header />
      <Grid
        Left={
          <>
            <FixedElement>
              <Settings send={send} current={current} />
              <Filters send={send} current={current} />
            </FixedElement>
            <Table
              onRequestSelected={(request) => send({ type: 'OPEN_REQUEST_DETAILS', payload: { request } })}
              requests={filteredRequests}
              requestsMetaDataById={requestsMetaDataById}
              selectedRequest={selectedRequest}
            />
          </>
        }
        Right={
          Boolean(current.context.selectedRequest) ? (
            <CodeEditor
              requestMetaDataById={requestsMetaDataById[selectedRequest!.requestId]}
              selectedRequest={selectedRequest!}
            />
          ) : (
            <Message
              title="No Request selected"
              message="please, select a request in the sidebar to open advanced details."
            />
          )
        }
      />
    </>
  );
}

export default App;
