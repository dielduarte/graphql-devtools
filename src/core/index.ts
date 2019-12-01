import { Sender } from 'xstate';

function registerChromeEvents(send: Sender<CoreEvents>) {
  if (process.env.NODE_ENV !== 'development') {
    //@ts-ignore
    chrome.devtools.network.onRequestFinished.addListener(function(
      request: any
    ) {
      if (
        request.request.method === 'POST' &&
        request.request.postData.mimeType === 'application/json'
      ) {
        const text = JSON.parse(request.request.postData.text);
        if (text.hasOwnProperty('query')) {
          request.hasOwnProperty('connection')
            ? console.log(request, ' <<< normal')
            : console.log(request, ' <<<  pre flight');
        }
      }
    });
  } else {
    (async () => {
      const request = await import('./__fixtures__/requests')

      let count = 0;

      setInterval(() => {
        if(count >= 4) return

        if(count % 2 === 0) {
          send({ type: 'SET_REQUEST', request: request.default.preflightRequest as any })
        } else {
          send({ type: 'SET_REQUEST', request: request.default.request as any })
        }
        count++
      }, 2000)

    })()
  }
}

export default registerChromeEvents;
