import { assign } from 'xstate';
import * as immutable from 'object-path-immutable';
import { getOperationDetails } from './_utils/operation';
import { requestExist } from './_utils/actions';
import { PREFERENCES_STORAGE_KEY, URLS_STORAGE_KEY } from './constants';
import { getInitialContext } from './_utils/context';

export const addRequest = assign<CoreContext, CoreEvents>({
  requests: (context, event) => [
    (event as ON_REQUEST).payload.request,
    ...context.requests,
  ],
  requestsMetaDataById: (context, event) => {
    const { queryName, operation } = getOperationDetails(
      (event as ON_REQUEST).payload.request,
    );

    return immutable.set(
      context.requestsMetaDataById,
      (event as ON_REQUEST).payload.request.requestId,
      {
        queryName,
        operation,
        statusCode: 'loading',
        timeStamp: {
          start: new Date().getTime(),
        },
      },
    );
  },
});

export const setRequestAsComplete = assign<CoreContext, CoreEvents>({
  requestsMetaDataById: (context, event) => {
    const { requestId, statusCode } = (event as ON_REQUEST_COMPLETE).payload;

    if (!requestExist(context, requestId)) return context.requestsMetaDataById;

    return (immutable.update(
      context.requestsMetaDataById,
      requestId,
      (request) =>
        immutable
          .wrap(request)
          .set('statusCode', statusCode)
          .update('timeStamp', (timeStamp) => ({
            ...timeStamp,
            end: new Date().getTime(),
          }))
          .value(),
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  },
});

export const setRequestStatusCode = assign<CoreContext, CoreEvents>({
  requestsMetaDataById: (context, event) => {
    const { requestId, statusCode } = (event as ON_REQUEST_ERROR).payload;

    if (!requestExist(context, requestId)) return context.requestsMetaDataById;

    return (immutable.update(
      context.requestsMetaDataById,
      requestId,
      (request) =>
        immutable
          .wrap(request)
          .set('statusCode', statusCode)
          .update('timeStamp', (timeStamp) => ({
            ...timeStamp,
            end: new Date().getTime(),
          }))
          .value(),
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  },
});

export const setRequestHeaders = assign<CoreContext, CoreEvents>({
  requestsMetaDataById: (context, event) => {
    const {
      requestId,
      requestHeaders,
    } = (event as ON_BEFORE_SEND_HEADERS).payload;

    if (!requestExist(context, requestId)) return context.requestsMetaDataById;

    return (immutable.update(
      context.requestsMetaDataById,
      requestId,
      (request) => immutable.set(request, 'headers', requestHeaders),
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  },
});

export const setSelectedRequest = assign<CoreContext, CoreEvents>({
  selectedRequest: (_, event) =>
    (event as OPEN_REQUEST_DETAILS).payload.request,
});

export const parseURLs = assign<CoreContext, CoreEvents>({
  settings: (context, event) => {
    if (!(event as SET_URLS).payload.urls.length) {
      return { ...context.settings, urls: [] };
    }

    return {
      ...context.settings,
      urls: (event as SET_URLS).payload.urls
        .split(',')
        .map((it) => it.replace(/\s/g, '')), // Remove any whitespace
    };
  },
});

export const saveURLsToLocalStorage = (context: CoreContext) => {
  localStorage.setItem(URLS_STORAGE_KEY, JSON.stringify(context.settings.urls));
};

export const cleanSelectedRequest = assign<CoreContext, CoreEvents>({
  selectedRequest: undefined,
});

export const setRequestReturnData = assign<CoreContext, CoreEvents>({
  requestsMetaDataById: (context, event) => {
    const { requestId, data } = (event as SET_REQUEST_RETURN_DATA).payload;

    if (!requestExist(context, requestId)) return context.requestsMetaDataById;

    return (immutable.update(
      context.requestsMetaDataById,
      requestId,
      (request) => immutable.set(request, 'data', JSON.parse(data)),
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  },
});

export const setPreference = assign<CoreContext, SET_PREFERENCE>({
  settings: (context, { payload }) => {
    return {
      ...context.settings,
      preferences: {
        ...context.settings.preferences,
        [payload.preference]: payload.checked,
      },
    };
  },
});

export const savePreferences = (context: CoreContext) => {
  localStorage.setItem(
    PREFERENCES_STORAGE_KEY,
    JSON.stringify(context.settings.preferences),
  );
};

export const resetContext = assign<CoreContext, SET_PREFERENCE>(
  getInitialContext(),
);
