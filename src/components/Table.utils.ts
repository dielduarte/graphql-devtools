export const compareRequests = (request: CoreRequest, anotherRequest: CoreRequest) => (
  request.requestId === anotherRequest.requestId
)
