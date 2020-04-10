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

export function registerOnBeforeRequest({
  urls,
  onBeforeRequest,
}: ChromeListenerParams) {
  removeListenerIfNeeded('onBeforeRequest', onBeforeRequest);

  chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls }, [
    'requestBody',
  ]);
}

export function registerOnCompleted({
  urls,
  onCompleted,
}: ChromeListenerParams) {
  removeListenerIfNeeded('onCompleted', onCompleted);

  chrome.webRequest.onCompleted.addListener(onCompleted, { urls });
}

export function registerOnErrorOccurred({
  urls,
  onErrorOccurred,
}: ChromeListenerParams) {
  removeListenerIfNeeded('onErrorOccurred', onErrorOccurred);

  chrome.webRequest.onErrorOccurred.addListener(onErrorOccurred, { urls });
}

export function registerOnBeforeSendHeaders({
  urls,
  onBeforeSendHeaders,
}: ChromeListenerParams) {
  removeListenerIfNeeded('onBeforeSendHeaders', onBeforeSendHeaders);

  chrome.webRequest.onBeforeSendHeaders.addListener(
    onBeforeSendHeaders,
    { urls },
    ['requestHeaders']
  );
}
