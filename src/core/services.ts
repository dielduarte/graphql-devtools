import { Sender } from 'xstate';
const canceled_error = 'net::ERR_ABORTED';

export const registerChromeEvents = () => (send: Sender<CoreEvents>) => {
  if (process.env.NODE_ENV !== 'development') {
    //@ts-ignore
    chrome.webRequest.onBeforeRequest.addListener(
      function(details: any) {
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
                variables: queryDetails.variables
              }
            }
          });
        }
      },
      { urls: ['<all_urls>'] },
      ['requestBody']
    );

    //@ts-ignore
    chrome.webRequest.onCompleted.addListener(
      function(details: any) {
        send({
          type: 'ON_REQUEST_COMPLETE',
          payload: {
            requestId: details.requestId,
            statusCode: details.statusCode
          }
        });
      },
      { urls: ['<all_urls>'] }
    );

    //@ts-ignore
    chrome.webRequest.onErrorOccurred.addListener(
      function(details: any) {
        if (details.error !== canceled_error) return;

        send({
          type: 'ON_REQUEST_CANCELED',
          payload: {
            requestId: details.requestId
          }
        });
      },
      { urls: ['<all_urls>'] }
    );

    //@ts-ignore
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details: any) {
        send({
          type: 'ON_BEFORE_SEND_HEADERS',
          payload: {
            requestId: details.requestId,
            requestHeaders: details.requestHeaders
          }
        });
      },
      { urls: ['<all_urls>'] },
      ['requestHeaders']
    );
  }
};
