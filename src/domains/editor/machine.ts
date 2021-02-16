import { Machine } from 'xstate';
import * as actions from './actions';
import { getIsNewContextCond, getIsContextCond } from './cond';
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
        data: '',
      },
      activeContext: EditorContext.query,
    },
    states: {
      idle: {
        on: {
          SET_ACTIVE_CONTEXT: [
            {
              target: '.',
              actions: ['setActiveContext', 'setHighLightQuery'],
              cond: getIsNewContextCond(EditorContext.query),
            },
            {
              target: '.',
              actions: ['setActiveContext', 'setHighLightVariables'],
              cond: getIsNewContextCond(EditorContext.variables),
            },
            {
              target: '.',
              actions: ['setActiveContext', 'setHighLightHeaders'],
              cond: getIsNewContextCond(EditorContext.Headers),
            },
            {
              target: '.',
              actions: ['setActiveContext', 'setHighLightData'],
              cond: getIsNewContextCond(EditorContext.data),
            },
          ],
          SET_SELECTED_REQUEST: [
            {
              target: '.',
              actions: [
                'setExternalContext',
                'setHighLightQuery',
                'startPrism',
              ],
              cond: getIsContextCond(EditorContext.query),
            },
            {
              target: '.',
              actions: [
                'setExternalContext',
                'setHighLightVariables',
                'startPrism',
              ],
              cond: getIsContextCond(EditorContext.variables),
            },
            {
              target: '.',
              actions: [
                'setExternalContext',
                'setHighLightHeaders',
                'startPrism',
              ],
              cond: getIsContextCond(EditorContext.Headers),
            },
            {
              target: '.',
              actions: ['setExternalContext', 'setHighLightData', 'startPrism'],
              cond: getIsContextCond(EditorContext.data),
            },
          ],
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
  },
);
