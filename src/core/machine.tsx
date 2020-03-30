import { Machine } from 'xstate';
import * as actions from './actions';
import * as services from './services';

export default Machine(
  {
    id: 'graphql-devtools',
    initial: 'core',
    context: {
      requests: [],
      resquestsMetaDataById: {},
      selectedRequest: undefined
    },
    states: {
      core: {
        invoke: {
          id: 'registerChromeEvents',
          src: 'registerChromeEvents'
        },
        on: {
          ON_REQUEST: {
            target: '',
            actions: 'addRequest'
          },
          ON_REQUEST_COMPLETE: {
            target: '',
            actions: 'setRequestAsComplete'
          },
          ON_BEFORE_SEND_HEADERS: {
            target: '',
            actions: 'setRequestHeaders'
          },
          ON_REQUEST_CANCELED: {
            target: '',
            actions: 'setRequestAsCanceled'
          }
        },
        initial: 'listingRequests',
        states: {
          listingRequests: {
            on: {
              OPEN_REQUEST_DETAILS: {
                actions: ['setSelectedRequest'],
                target: 'requestDetails'
              }
            }
          },
          requestDetails: {
            on: {
              OPEN_REQUEST_DETAILS: {
                actions: ['setSelectedRequest'],
                target: ''
              }
            }
          }
        }
      }
    }
  },
  {
    actions,
    services
  }
);
