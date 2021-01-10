import { Sender } from 'xstate';
import { getUrls } from './_utils/context';
import * as chromeListeners from './_utils/chromeListeners';
import { parseHeaders } from './_utils/services';
import { REQUEST_ID_HEADER } from './constants';
export const registerChromeEvents = () => (
  send: Sender<CoreEvents>,
  onReceive: any,
) => {
  function onBeforeRequest(details: any) {
    if (details.requestBody.raw[0]) {
      const queryDetails = JSON.parse(
        decodeURIComponent(
          String.fromCharCode.apply(
            null,
            new Uint8Array(details.requestBody.raw[0].bytes) as any,
          ),
        ),
      );

      send({
        type: 'ON_REQUEST',
        payload: {
          request: {
            requestId: details.requestId,
            url: details.url,
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
        requestHeaders: parseHeaders(details.requestHeaders),
      },
    });

    details.requestHeaders.push({
      name: REQUEST_ID_HEADER,
      value: details.requestId,
    });

    return { requestHeaders: details.requestHeaders };
  }

  function registerAllEvents(urls: string[]) {
    Object.values(chromeListeners).map((event) =>
      event({
        urls,
        onBeforeRequest,
        onCompleted,
        onErrorOccurred,
        onBeforeSendHeaders,
      }),
    );
  }

  function registerOnRequestFinished() {
    chrome.devtools.network.onRequestFinished.addListener((request: any) => {
      const urls = JSON.parse(localStorage.getItem('urls_') ?? '');

      request.getContent((data: string) => {
        if (request.request && request.request.url) {
          const { url: requestUrl, headers } = request.request;
          const shouldSendMessage = urls.some((url: string) =>
            requestUrl.includes(url),
          );

          if (shouldSendMessage) {
            const requestId = headers.filter(
              (header: any) => header.name === REQUEST_ID_HEADER,
            )[0].value;

            send({
              type: 'SET_REQUEST_RETURN_DATA',
              payload: {
                requestId,
                data,
              },
            });
          }
        }
      });
    });
  }

  function registerOnNavigationCommitted() {
    chrome.webNavigation.onCommitted.addListener((details: any) => {
      chrome.tabs.getSelected(null, function (tab: any) {
        const url = new URL(details.url).host;
        const currentHost = new URL(tab.url).host;

        if (details.transitionType === 'reload' && currentHost.includes(url)) {
          send('RESET_CONTEXT');
        }
      });
    });
  }

  const initialUrls = getUrls();

  if (initialUrls.length) {
    registerAllEvents(initialUrls);
  }

  registerOnRequestFinished();
  registerOnNavigationCommitted();

  onReceive((e: any) => {
    if (e.type !== 'UPDATE_CHROME_LISTENERS') return;

    registerAllEvents(getUrls());
  });
};
