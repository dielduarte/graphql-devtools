import { MachineConfig } from 'xstate';

declare global {
  type StatusCode = number | 'loading';

  interface CoreRequest {
    requestId: string;
    query: string;
    variables: AnyObject;
  }

  interface CoreRequestMetaData {
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
    payload: {};
  }

  type CoreEvents =
    | ON_REQUEST
    | ON_REQUEST_COMPLETE
    | ON_REQUEST_ERROR
    | ON_BEFORE_SEND_HEADERS
    | OPEN_REQUEST_DETAILS;

  interface CoreSchema {
    states: {
      idle: {
        states: {
          requestDetails: {};
        };
      };
      requestDetails: {
        states: {
          idle: {};
        };
      };
    };
  }

  interface CoreContext {
    requests: Array<CoreRequest>;
    resquestsMetaDataById: { [key: string]: CoreRequestMetaData };
  }

  type CoreMachine = MachineConfig<CoreContext, CoreSchema, CoreEvents>;
}
