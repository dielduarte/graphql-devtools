import { State } from 'xstate';

const parser = require('graphql/language/parser');

export const getOperationDetails = (request: CoreRequest) => {
  const { name, operation } = parser.parse(request.query).definitions[0];
  return {
    queryName: name.value,
    operation,
  };
};

export const filterOperations = (current: State<CoreContext, CoreEvents>) => {
  const { requests, requestsMetaDataById } = current.context;

  if (current.matches('core.listingRequests.all')) return requests;

  const operationType = current.matches('core.listingRequests.queries')
    ? 'query'
    : 'mutation';

  return requests.filter(
    (it) => requestsMetaDataById[it.requestId].operation === operationType
  );
};
