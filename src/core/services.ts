import { Sender } from 'xstate';
import { getUrls } from './_utils/context';
import * as chromeListeners from './_utils/chromeListeners';

export const registerChromeEvents = () => (
  send: Sender<CoreEvents>,
  onReceive: any
) => {
  function onBeforeRequest(details: any) {
    if (details.requestBody.raw[0]) {
      const queryDetails = JSON.parse(
        decodeURIComponent(
          String.fromCharCode.apply(
            null,
            new Uint8Array(details.requestBody.raw[0].bytes) as any
          )
        )
      );

      send({
        type: 'ON_REQUEST',
        payload: {
          request: {
            requestId: details.requestId,
            query: queryDetails.query,
            variables: queryDetails.variables,
          },
        },
      });
    }
  }

  function onCompleted(details: any) {
    send({
      type: 'ON_REQUEST_COMPLETE',
      payload: {
        requestId: details.requestId,
        statusCode: details.statusCode,
      },
    });
  }

  function onErrorOccurred(details: any) {
    const canceled_error = 'net::ERR_ABORTED';

    send({
      type: 'ON_REQUEST_ERROR',
      payload: {
        requestId: details.requestId,
        statusCode: details.error === canceled_error ? 'canceled' : 'error',
      },
    });
  }

  function onBeforeSendHeaders(details: any) {
    send({
      type: 'ON_BEFORE_SEND_HEADERS',
      payload: {
        requestId: details.requestId,
        requestHeaders: details.requestHeaders,
      },
    });
  }

  function registerAllEvents(urls: string[]) {
    Object.values(chromeListeners).map((event) =>
      event({
        urls,
        onBeforeRequest,
        onCompleted,
        onErrorOccurred,
        onBeforeSendHeaders,
      })
    );
  }

  const initialUrls = getUrls();

  if (initialUrls.length) {
    registerAllEvents(initialUrls);
  }

  onReceive((e: any) => {
    if (e.type !== 'START_CHROME_LISTENERS') return;

    registerAllEvents(getUrls());
  });
};
