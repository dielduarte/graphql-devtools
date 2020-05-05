import { Machine } from 'xstate';
import * as actions from './CodeEditor.actions';
import * as services from './CodeEditor.services';
import {
  CodeEditorContext,
  CodeEditorSchema,
  CodeEditorEvents,
  EditorContext,
} from './CodeEditor.types';

export default Machine<CodeEditorContext, CodeEditorSchema, CodeEditorEvents>(
  {
    id: 'editor',
    initial: 'idle',
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
      idle: {
        on: {
          SET_ACTIVE_CONTEXT: {
            target: '.',
            actions: ['setActiveContext'],
          },
          SET_SELECTED_REQUEST: {
            target: '.',
            actions: ['setExternalContext', 'setHighLightValues', 'startPrism'],
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
  {
    actions,
    services,
  }
);
