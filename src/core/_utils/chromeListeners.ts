type CallbackFn = (details: any) => void;

interface ChromeListenerParams {
  urls: string[];
  onBeforeRequest: CallbackFn;
  onCompleted: CallbackFn;
  onErrorOccurred: CallbackFn;
  onBeforeSendHeaders: CallbackFn;
}

function removeListenerIfNeeded(
  listenerName: string,
  cb: (details: any) => void
) {
  if (chrome.webRequest[listenerName].hasListeners()) {
    chrome.webRequest[listenerName].removeListener(cb);
  }
}

const createListener = (listenerName: string, options?: string[]) => (
  params: ChromeListenerParams
) => {
  removeListenerIfNeeded(listenerName, params[listenerName]);

  chrome.webRequest[listenerName].addListener(
    params[listenerName],
    { urls: params.urls },
    options
  );
};

export const registerOnBeforeRequest = createListener('onBeforeRequest', [
  'requestBody',
]);
export const registerOnCompleted = createListener('onCompleted');
export const registerOnErrorOccurred = createListener('onErrorOccurred');
export const registerOnBeforeSendHeaders = createListener(
  'onBeforeSendHeaders',
  ['requestHeaders']
);
