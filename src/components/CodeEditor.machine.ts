import { Machine } from 'xstate';
import * as actions from './CodeEditor.actions';
import * as services from './CodeEditor.services';

export default Machine(
  {
    id: 'editor',
    initial: 'idle',
    context: {
      external: {
        selectedRequest: undefined,
        requestMetaDataById: {},
      },
      highlights: {
        query: '',
        variables: '',
        headers: '',
      },
      activeContext: 'query', //query, variables, headers
    },
    states: {
      idle: {
        on: {
          SET_SELECTED_REQUEST: {
            target: '.',
            actions: ['setExternalContext', 'setHighLightValues', 'startPrism'],
          },
          COPY_CONTEXT: 'copyingContext',
        },
      },
      copyingContext: {
        invoke: {
          src: 'copyContext',
          onDone: 'contextCopiedSuccessfully',
        },
      },
      contextCopiedSuccessfully: {
        after: {
          1000: 'idle',
        },
      },
    },
  },
  {
    actions,
    services,
  }
);
