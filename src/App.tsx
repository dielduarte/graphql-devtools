import React from 'react';

import coreMachine from './core/machine';
import { useMachine } from '@xstate/react';
import Table from './core/components/Table';
import Settings from './core/components/Settings';
import Filters from './core/components/Filters';
import CodeEditor from './domains/editor/components/CodeEditor';

import Header from 'layouts/Header';
import Grid from './layouts/Grid';
import Message from 'core/components/Message';
import { ReactComponent as RequestEmpty } from './icons/requestEmpty.svg';
import { ReactComponent as AllEmpty } from './icons/allEmpty.svg';
import { filterOperations } from 'core/_utils/operation';

function App() {
  const [current, send] = useMachine(coreMachine);
  const { requestsMetaDataById, selectedRequest, settings } = current.context;
  const filteredRequests = filterOperations(current);
  return (
    <div className="App">
      <Header
        title={'Requests'}
        Icon={<Settings send={send} current={current} />}
        Content={<Filters send={send} current={current} />}
      />

      {!Boolean(filteredRequests.length) ? (
        <Message
          Icon={<AllEmpty />}
          message={
            !Boolean(settings.urls.length)
              ? "We're eager to start listening to your requests and help you to be more productive"
              : 'Listening requests to: ' + settings.urls.join('</br>')
          }
        />
      ) : (
        <Grid
          Left={
            <Table
              onRequestSelected={(request) =>
                send({ type: 'OPEN_REQUEST_DETAILS', payload: { request } })
              }
              requests={filteredRequests}
              requestsMetaDataById={requestsMetaDataById}
              selectedRequest={selectedRequest}
            />
          }
          Right={
            Boolean(current.context.selectedRequest) ? (
              <CodeEditor
                requestMetaDataById={
                  requestsMetaDataById[selectedRequest!.requestId]
                }
                selectedRequest={selectedRequest!}
              />
            ) : (
              <Message
                Icon={<RequestEmpty />}
                message="please, select a request in the sidebar to open advanced details."
              />
            )
          }
        />
      )}
    </div>
  );
}

export default App;
