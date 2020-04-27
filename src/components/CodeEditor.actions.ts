import { assign } from 'xstate';
import Prism from 'prismjs';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';

import { formatQuery } from './CodeEditor.utils';

export const setExternalContext = assign({
  external: (_, event) => ({
    selectedRequest: (event as any).payload.selectedRequest,
    requestMetaDataById: (event as any).payload.requestMetaDataById,
  }),
});

export const setHighLightValues = assign({
  highlights: ({ external: { selectedRequest, requestMetaDataById } }) => ({
    query: Prism.highlight(
      formatQuery(selectedRequest.query),
      Prism.languages.graphql,
      'graphql'
    ),
    variables: Prism.highlight(
      JSON.stringify(selectedRequest.variables || {}),
      Prism.languages.json,
      'json'
    ),
    headers: Prism.highlight(
      JSON.stringify(requestMetaDataById.headers || {}),
      Prism.languages.json,
      'json'
    ),
  }),
});

export const startPrism = () => {
  Prism.highlightAll();
};
