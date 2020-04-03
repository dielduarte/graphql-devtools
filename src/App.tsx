import React from 'react';

import coreMachine from './core/machine';
import { useMachine } from '@xstate/react';
import Table from './components/Table';
import CodeEditor from './components/CodeEditor';
import Grid from './layouts/Grid';

function App() {
  const [current, send] = useMachine(coreMachine);
  const { requests, resquestsMetaDataById, selectedRequest } = current.context;

  return (
    <div className="App">
      <Grid
        Left={
          <Table
            onRequestSelected={request =>
              send({ type: 'OPEN_REQUEST_DETAILS', payload: { request } })
            }
            requests={requests}
            resquestsMetaDataById={resquestsMetaDataById}
            selectedRequest={selectedRequest}
          />
        }
        Right={
          current.matches('core.requestDetails') ? (
            <CodeEditor
              resquestMetaDataById={
                resquestsMetaDataById[selectedRequest!.requestId]
              }
              selectedRequest={selectedRequest!}
            />
          ) : (
            <>Please select a request</>
          )
        }
      />
    </div>
  );
}

export default App;
