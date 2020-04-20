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
            target: '',
          },
          SET_URLS: {
            actions: [
              'parseURLs',
              'saveURLsToLocalStorage',
              send('UPDATE_CHROME_LISTENERS', { to: 'registerChromeEventsID' }),
            ],
            target: '',
          },
          COPY_CONTEXT: '.editor.contextCopiedSuccessfully'
        },
        initial: 'listingRequests',
        states: {
          listingRequests: {
            initial: 'all',
            on: {
              SHOW_ALL: {
                actions: 'cleanSelectedRequest',
                target: '.all',
              },
              FILTER_BY_MUTATIONS: {
                actions: 'cleanSelectedRequest',
                target: '.mutations',
              },
              FILTER_BY_QUERIES: {
                actions: 'cleanSelectedRequest',
                target: '.queries',
              },
            },
            states: {
              all: {},
              mutations: {},
              queries: {},
            },
          },
          editor: {
            initial: 'idle',
            strict: true,
            states: {
              idle: {},
              contextCopiedSuccessfully: {
                after: {
                  1000: 'idle'
                }
              },
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
