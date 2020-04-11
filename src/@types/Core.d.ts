import { MachineConfig, Interpreter, State } from 'xstate';

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

  type CoreEvents =
    | ON_REQUEST
    | ON_REQUEST_COMPLETE
    | ON_BEFORE_SEND_HEADERS
    | OPEN_REQUEST_DETAILS
    | ON_REQUEST_ERROR
    | START_CHROME_LISTENERS
    | SET_URLS;

  interface CoreSchema {
    states: {
      core: {
        states: {
          listingRequests: {};
          requestDetails: {};
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
