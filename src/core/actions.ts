import { assign } from 'xstate';
import * as immutable from 'object-path-immutable';
import { findQueryName } from './_utils/query';

export const addRequest = assign<CoreContext, CoreEvents>({
  requests: (context, event) => [...context.requests, event.payload.request],
  resquestsMetaDataById: (context, event) => {
    const queryName = findQueryName(event.payload.request);

    return immutable.set(context.resquestsMetaDataById, event.payload.request.requestId, {
      queryName,
      statusCode: 'loading',
      timeStamp: {
        start: new Date().getTime()
      }
    });
  }
});

export const setRequestAsComplete = assign<CoreContext, CoreEvents>({
  resquestsMetaDataById: (context, event) => {
    const { requestId, statusCode } = event.payload;

    return (immutable.update(context.resquestsMetaDataById, requestId, request =>
      immutable
        .wrap(request)
        .set('statusCode', statusCode)
        .update('timeStamp', timeStamp => ({ ...timeStamp, end: new Date().getTime() }))
        .value()
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  }
});

export const setRequestHeaders = assign<CoreContext, CoreEvents>({
  resquestsMetaDataById: (context, event) => {
    const { requestId, requestHeaders } = event.payload;

    return (immutable.update(context.resquestsMetaDataById, requestId, request =>
      immutable.set(request, 'headers', requestHeaders)
    ) as unknown) as { [key: string]: CoreRequestMetaData };
  }
});
