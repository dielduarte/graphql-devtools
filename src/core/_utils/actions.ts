export const requestExist = (context: any, requestId: string) =>
  Boolean(context.requests.find((it: any) => it.requestId === requestId));
