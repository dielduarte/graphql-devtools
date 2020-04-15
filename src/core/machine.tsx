import { Machine, send } from 'xstate';
import * as actions from './actions';
import * as services from './services';
import { getUrls } from './_utils/context';

export default Machine<CoreContext, CoreSchema, CoreEvents>(
  {
    id: 'graphql-devtools',
    initial: 'core',
    strict: true,
    context: {
      requests: [],
      resquestsMetaDataById: {},
      selectedRequest: undefined,
      settings: {
        urls: getUrls(),
      },
    },
    states: {
      core: {
        strict: true,
        invoke: {
          id: 'registerChromeEventsID',
          src: 'registerChromeEvents',
        },
        on: {
          ON_REQUEST: {
            target: '',
            actions: 'addRequest',
          },
          ON_REQUEST_COMPLETE: {
            target: '',
            actions: 'setRequestAsComplete',
          },
          ON_BEFORE_SEND_HEADERS: {
            target: '',
            actions: 'setRequestHeaders',
          },
          ON_REQUEST_ERROR: {
            target: '',
            actions: 'setRequestStatusCode',
          },
          OPEN_REQUEST_DETAILS: {
            actions: ['setSelectedRequest'],
            target: '.editor.idle',
          },
          SET_URLS: {
            actions: [
              'parseURLs',
              'saveURLsToLocalStorage',
              send('UPDATE_CHROME_LISTENERS', { to: 'registerChromeEventsID' }),
            ],
            target: '',
          },
        },
        initial: 'listingRequests',
        states: {
          listingRequests: {},
          editor: {
            initial: 'idle',
            strict: true,
            states: {
              idle: {}
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
