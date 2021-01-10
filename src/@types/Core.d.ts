import { PreferencesEnum } from 'core/_types';
import { MachineConfig } from 'xstate';

declare global {
  type StatusCode = number | 'loading' | 'canceled' | 'error';
  type Operation = 'query' | 'mutation';
  type CoreRequestMetaDataById = { [key: string]: CoreRequestMetaData };

  interface CoreRequest {
    requestId: string;
    query: string;
    url: string;
    variables?: AnyObject;
  }

  interface CoreRequestMetaData {
    queryName: string;
    operation: Operation;
    statusCode: StatusCode;
    timeStamp: {
      start: number;
      end?: number;
    };
    headers: AnyObject;
    data?: Record<string, any>;
  }

  // The events that the machine handles
  interface ON_REQUEST {
    type: 'ON_REQUEST';
    payload: {
      request: CoreRequest;
    };
  }

  interface ON_REQUEST_COMPLETE {
    type: 'ON_REQUEST_COMPLETE';
    payload: {
      requestId: string;
      statusCode: StatusCode;
    };
  }

  interface ON_REQUEST_ERROR {
    type: 'ON_REQUEST_ERROR';
    payload: {
      requestId: string;
      statusCode: StatusCode;
    };
  }

  interface ON_BEFORE_SEND_HEADERS {
    type: 'ON_BEFORE_SEND_HEADERS';
    payload: {
      requestId: string;
      requestHeaders: AnyObject;
    };
  }

  interface OPEN_REQUEST_DETAILS {
    type: 'OPEN_REQUEST_DETAILS';
    payload: { request: CoreRequest };
  }

  interface SET_URLS {
    type: 'SET_URLS';
    payload: { urls: string };
  }

  interface FILTER_BY_QUERIES {
    type: 'FILTER_BY_QUERIES';
  }

  interface FILTER_BY_MUTATION {
    type: 'FILTER_BY_MUTATION';
  }

  interface SHOW_ALL {
    type: 'SHOW_ALL';
  }

  interface SET_REQUEST_RETURN_DATA {
    type: 'SET_REQUEST_RETURN_DATA';
    payload: {
      requestId: string;
      data: string;
    };
  }

  interface SET_PREFERENCE {
    type: 'SET_PREFERENCE';
    payload: { preference: PreferencesEnum; checked: boolean };
  }

  interface RESET_CONTEXT {
    type: 'RESET_CONTEXT';
  }

  interface OPEN_PREFERENCES {
    type: 'OPEN_PREFERENCES';
  }

  interface CLOSE_PREFERENCES {
    type: 'CLOSE_PREFERENCES';
  }

  type CoreEvents =
    | ON_REQUEST
    | ON_REQUEST_COMPLETE
    | ON_BEFORE_SEND_HEADERS
    | OPEN_REQUEST_DETAILS
    | ON_REQUEST_ERROR
    | START_CHROME_LISTENERS
    | SET_URLS
    | FILTER_BY_QUERIES
    | FILTER_BY_MUTATION
    | SHOW_ALL
    | SET_REQUEST_RETURN_DATA
    | SET_PREFERENCE
    | RESET_CONTEXT
    | OPEN_PREFERENCES
    | CLOSE_PREFERENCES;

  interface CoreSchema {
    states: {
      core: {
        states: {
          listingRequests: {
            states: {
              all: {};
              mutations: {};
              queries: {};
            };
          };
          openPreferences: {};
        };
      };
    };
  }

  interface CoreContext {
    requests: Array<CoreRequest>;
    requestsMetaDataById: CoreRequestMetaDataById;
    selectedRequest?: CoreRequest;
    settings: {
      urls: string[];
      preferences: Record<PreferencesEnum, boolean>;
    };
  }

  type CoreMachine = MachineConfig<CoreContext, CoreSchema, CoreEvents>;
}
