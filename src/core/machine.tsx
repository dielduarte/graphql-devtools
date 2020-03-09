import { Machine } from 'xstate';
import * as actions from './actions';

export default Machine(
  {
    id: 'graphql-devtools',
    initial: 'idle',
    context: {
      requests: [],
      resquestsMetaDataById: {}
    },
    states: {
      idle: {
        on: {
          ON_REQUEST: {
            target: '.',
            actions: 'addRequest'
          },
          ON_REQUEST_COMPLETE: {
            target: '.',
            actions: 'setRequestAsComplete'
          },
          ON_BEFORE_SEND_HEADERS: {
            target: '.',
            actions: 'setRequestHeaders'
          },
          OPEN_REQUEST_DETAILS: 'requestDetails'
        }
      },
      requestDetails: {
        on: {}
      }
    }
  },
  {
    actions
  }
);
