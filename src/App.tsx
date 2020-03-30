import React, { useContext } from 'react';

import { CoreContext } from './core/CoreContext';
import Table from './components/Table';
import CodeEditor from './components/CodeEditor';
import Grid from './layouts/Grid';

function App() {
  const { current, send } = useContext<any>(CoreContext);
  const { requests, resquestsMetaDataById, selectedRequest } = current.context;
  console.log(selectedRequest);

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
          />
        }
        Right={
          current.matches('core.requestDetails') ? (
            <CodeEditor
              resquestMetaDataById={
                resquestsMetaDataById[selectedRequest.requestId]
              }
              selectedRequest={selectedRequest}
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
