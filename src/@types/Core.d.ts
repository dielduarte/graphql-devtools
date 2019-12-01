import { MachineConfig } from 'xstate';

declare global {
  type HeadersField = { name: String; value: String };

  type PostDataField = { mimeType: string; text: string };

  type ContentField = { mimeType: string; size: number };

  type TimingsField = {
    blocked: number;
    dns: number;
    ssl: number;
    connect: number;
    send: number;
    wait: number;
    receive: number;
  };

  type RequestField = {
    bodySize: number;
    cookies: string[];
    headers: HeadersField[];
    headersSize: number;
    httpVersion: string;
    method: string;
    postData: PostDataField;
    querystring: string[];
    url: string;
  };

  type ResponseField = {
    bodySize: number;
    content: ContentField;
    headers: HeadersField[];
    headersSize: number;
    httpVersion: string;
    redirectURL: string;
    status: number;
    statusText: string;
  };

  type CoreRequest = {
    request: RequestField;
    response: ResponseField;
    serverIPAddress: string;
    startedDateTime: string;
    time: number;
    timings: TimingsField;
    connection?: string;
  };

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

// The events that the machine handles
  type SET_REQUESTS = { type: 'SET_REQUEST', request: CoreRequest }

  type CoreEvents =
      | { type: 'SET_KNOW_REQUESTS' }
      | SET_REQUESTS
      | { type: 'OPEN_REQUEST_DETAILS' };

// The context (extended state) of the machine
  interface CoreContext {
    requests: Array<CoreRequest> | null,
    preFlightRequestsMap: { [key: string]: number }
  }

  type CoreMachine = MachineConfig<CoreContext, CoreSchema, CoreEvents>;

}
