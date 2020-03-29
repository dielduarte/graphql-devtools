import { assign } from 'xstate';
import * as immutable from 'object-path-immutable';
import { getQueryDetails } from './_utils/query';
import { requestExist } from './_utils/actions';

export const addRequest = assign<CoreContext, CoreEvents>({
  requests: (context, event) => [...context.requests, event.payload.request],
  resquestsMetaDataById: (context, event) => {
    const { queryName, operation } = getQueryDetails(event.payload.request);

    return immutable.set(
      context.resquestsMetaDataById,
      event.payload.request.requestId,
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
    const { requestId, statusCode } = event.payload;

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
    const { requestId } = event.payload;

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
    const { requestId, requestHeaders } = event.payload;

    if (!requestExist(context, requestId)) return context.resquestsMetaDataById;

    return (immutable.update(
      context.resquestsMetaDataById,
      requestId,
      request => immutable.set(request, 'headers', requestHeaders)
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  }
});
