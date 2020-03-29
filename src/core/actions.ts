import { assign } from 'xstate';
import * as immutable from 'object-path-immutable';
import { getQueryDetails } from './_utils/query';
import { requestExist } from './_utils/actions';

export const addRequest = assign<CoreContext, CoreEvents>({
  requests: (context, event) => [
    (event as ON_REQUEST).payload.request,
    ...context.requests
  ],
  resquestsMetaDataById: (context, event) => {
    const { queryName, operation } = getQueryDetails(
      (event as ON_REQUEST).payload.request
    );

    return immutable.set(
      context.resquestsMetaDataById,
      (event as ON_REQUEST).payload.request.requestId,
      {
        queryName,
        operation,
        statusCode: 'loading',
        timeStamp: {
          start: new Date().getTime()
        }
      }
    );
  }
});

export const setRequestAsComplete = assign<CoreContext, CoreEvents>({
  resquestsMetaDataById: (context, event) => {
    const { requestId, statusCode } = (event as ON_REQUEST_COMPLETE).payload;

    if (!requestExist(context, requestId)) return context.resquestsMetaDataById;

    return (immutable.update(
      context.resquestsMetaDataById,
      requestId,
      request =>
        immutable
          .wrap(request)
          .set('statusCode', statusCode)
          .update('timeStamp', timeStamp => ({
            ...timeStamp,
            end: new Date().getTime()
          }))
          .value()
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  }
});

export const setRequestAsCanceled = assign<CoreContext, CoreEvents>({
  resquestsMetaDataById: (context, event) => {
    const { requestId } = (event as ON_REQUEST_CANCELED).payload;

    if (!requestExist(context, requestId)) return context.resquestsMetaDataById;

    return (immutable.update(
      context.resquestsMetaDataById,
      requestId,
      request =>
        immutable
          .wrap(request)
          .set('statusCode', 'canceled')
          .update('timeStamp', timeStamp => ({
            ...timeStamp,
            end: new Date().getTime()
          }))
          .value()
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  }
});

export const setRequestHeaders = assign<CoreContext, CoreEvents>({
  resquestsMetaDataById: (context, event) => {
    const {
      requestId,
      requestHeaders
    } = (event as ON_BEFORE_SEND_HEADERS).payload;

    if (!requestExist(context, requestId)) return context.resquestsMetaDataById;

    return (immutable.update(
      context.resquestsMetaDataById,
      requestId,
      request => immutable.set(request, 'headers', requestHeaders)
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  }
});
