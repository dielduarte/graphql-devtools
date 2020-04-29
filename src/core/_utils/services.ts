export const parseHeaders = (
  headers: Array<{ name: string; value: string }>
) => {
  return headers.reduce((prev, next) => {
    return { ...prev, [next.name]: next.value };
  }, {});
};
