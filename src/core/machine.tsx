import { Machine, send } from 'xstate';
import * as actions from './actions';
import * as services from './services';
import * as guards from './guards';
import { getInitialContext } from './_utils/context';

export default Machine<CoreContext, CoreSchema, CoreEvents>(
  {
    id: 'graphql-devtools',
    initial: 'core',
    strict: true,
    context: getInitialContext(),
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
          SET_REQUEST_RETURN_DATA: {
            actions: ['setRequestReturnData'],
            target: '',
          },
          SET_PREFERENCE: {
            actions: ['setPreference', 'savePreferences'],
            target: '',
          },
          RESET_CONTEXT: [
            {
              target: '',
              cond: 'isPreserveLogs',
            },
            {
              actions: ['resetContext'],
              target: '',
            },
          ],
          OPEN_PREFERENCES: 'core.openPreferences',
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
          openPreferences: {
            on: {
              CLOSE_PREFERENCES: 'listingRequests',
            },
          },
        },
      },
    },
  },
  {
    actions,
    services,
    guards,
  },
);
