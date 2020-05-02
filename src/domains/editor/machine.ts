import { Machine } from 'xstate';
import * as actions from './actions';
import * as services from './services';
import {
  CodeEditorContext,
  CodeEditorSchema,
  CodeEditorEvents,
  EditorContext,
} from './_types';

export default Machine<CodeEditorContext, CodeEditorSchema, CodeEditorEvents>(
  {
    id: 'editor',
    initial: 'editor',
    context: {
      external: {
        selectedRequest: undefined,
        requestMetaDataById: undefined,
      },
      highlights: {
        query: '',
        variables: '',
        headers: '',
      },
      activeContext: EditorContext.query,
    },
    states: {
      editor: {
        initial: 'idle',
        on: {
          SET_ACTIVE_CONTEXT: {
            target: '.',
            actions: ['setActiveContext'],
          },
        },
        states: {
          idle: {
            on: {
              SET_SELECTED_REQUEST: {
                target: '.',
                actions: [
                  'setExternalContext',
                  'setHighLightValues',
                  'startPrism',
                ],
              },
              COPY_CONTEXT: 'copyingContext',
              REFETCH_OPERATION: 'refetchingOperation',
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
          refetchingOperation: {
            invoke: {
              src: 'refetchOperation',
              onDone: 'operationRefetchedSuccessfully',
            },
          },
          operationRefetchedSuccessfully: {
            after: {
              1000: 'idle',
            },
          },
        },
      },
    },
  },
  {
    actions,
    services,
  }
);
