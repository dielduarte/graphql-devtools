const parser = require('graphql/language/parser');

export const findQueryName = (request: CoreRequest) =>
  parser.parse(request.query).definitions[0].name.value;
