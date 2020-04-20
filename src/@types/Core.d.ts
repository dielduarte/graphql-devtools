import { MachineConfig } from 'xstate';

declare global {
  type StatusCode = number | 'loading' | 'canceled' | 'error';
  type Operation = 'query' | 'mutation';
  type CoreRequestMetaDataById = { [key: string]: CoreRequestMetaData };

  interface CoreRequest {
    requestId: string;
    query: string;
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
    | SHOW_ALL;

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
          editor: {
            states: {
              idle: {};
              contextCopiedSuccessfully: {};
            };
          };
        };
      };
    };
  }

  interface CoreContext {
    requests: Array<CoreRequest>;
    resquestsMetaDataById: CoreRequestMetaDataById;
    selectedRequest?: CoreRequest;
    settings: {
      urls: string[];
    };
  }

  type CoreMachine = MachineConfig<CoreContext, CoreSchema, CoreEvents>;
}
