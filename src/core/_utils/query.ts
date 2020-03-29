const parser = require('graphql/language/parser');

export const getQueryDetails = (request: CoreRequest) => {
  const { name, operation } = parser.parse(request.query).definitions[0];
  return {
    queryName: name.value,
    operation
  };
};
