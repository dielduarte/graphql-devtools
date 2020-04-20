import React from 'react';

import coreMachine from './core/machine';
import { useMachine } from '@xstate/react';
import Table from './components/Table';
import CodeEditor from './components/CodeEditor';
import Settings from './components/Settings';
import Filters from './components/Filters';
import Header from 'layouts/Header';
import Grid from './layouts/Grid';
import Message from 'components/Message';
import { ReactComponent as RequestEmpty } from './icons/requestEmpty.svg';
import { ReactComponent as AllEmpty } from './icons/allEmpty.svg';
import { filterOperations } from 'core/_utils/operation';

function App() {
  const [current, send] = useMachine(coreMachine);
  const { resquestsMetaDataById, selectedRequest, settings } = current.context;
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
              resquestsMetaDataById={resquestsMetaDataById}
              selectedRequest={selectedRequest}
            />
          }
          Right={
            Boolean(current.context.selectedRequest) ? (
              <CodeEditor
                resquestMetaDataById={
                  resquestsMetaDataById[selectedRequest!.requestId]
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
