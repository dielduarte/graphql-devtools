import { assign } from 'xstate';
import { pipe, cond, equals, T, prop, compose, not, propOr } from 'ramda'

const isNormalRequest = propOr(false, 'connection')

const removeQueryAndMutationKeyWords = (request: CoreRequest) => {
    const text = JSON.parse(request.request.postData.text)
    return text.query.replace('query', '').replace('mutation', '')
}

const findFirstParenthesesIndex = (query: string) => {
    return {
        index: query.indexOf('('),
        query
    }
}

const getQueryName = ({ index, query }: {index: number, query: string}) => {
    return query.substring(0, index).trim()
}

const findQueryName = pipe(
    removeQueryAndMutationKeyWords,
    findFirstParenthesesIndex,
    getQueryName
)

const eventIsNotSetRequest = compose(
    not,
    equals('SET_REQUEST'),
    prop('type'),
    prop('event')
)

const returnSameValue = (key: 'preFlightRequestsMap' | 'requests') =>
    ({ context, event }: { context: CoreContext, event: CoreEvents }) => context[key]

const requestIsPreflight = compose(
    not,
    isNormalRequest,
    prop('request'),
    prop('event')
)

const addQueryNameToPreFlightRequestsMap = ({ context, event }: { context: CoreContext, event: SET_REQUESTS }) => {
    const requestName = findQueryName(event.request)
    return {
        ...context.preFlightRequestsMap,
        [requestName]: context.requests!.length
    }
}

const removeQueryNameFromPreFlightRequestMap = ({ context, event }: { context: CoreContext, event: SET_REQUESTS }) => {
    const requestName = findQueryName(event.request)
    const preFlightRequestsCopy = Object.assign(context.preFlightRequestsMap, {})
    delete preFlightRequestsCopy[requestName]

    return preFlightRequestsCopy
}

const addRequest = ({ context, event }: { context: CoreContext, event: SET_REQUESTS }) => {
    return [...context.requests!, event.request]
}

const updateRequest = ({ context, event }: { context: CoreContext, event: SET_REQUESTS }) => {
    const requestName = findQueryName(event.request)
    const requestIndex = context.preFlightRequestsMap[requestName]

    return [
        ...context.requests!.splice(0, requestIndex),
        event.request,
        ...context.requests!.splice(requestIndex + 1)
    ]
}

const updatePreFlightRequestsMap = cond([
  [eventIsNotSetRequest, returnSameValue('preFlightRequestsMap')]
, [requestIsPreflight, addQueryNameToPreFlightRequestsMap]
, [T, removeQueryNameFromPreFlightRequestMap]
])

const updateRequests = cond([
  [eventIsNotSetRequest, returnSameValue('requests')]
, [requestIsPreflight, addRequest]
, [T, updateRequest]
])

export const parseRequest =  assign<CoreContext, CoreEvents>({
  requests: (context, event) => updateRequests({ context, event }),
  preFlightRequestsMap:  (context, event) => updatePreFlightRequestsMap({ context, event })
});