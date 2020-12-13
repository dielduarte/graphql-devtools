import { assign } from 'xstate';
import Prism from 'prismjs';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';

import { CodeEditorContext, CodeEditorEvents, SET_SELECTED_REQUEST, SET_ACTIVE_CONTEXT } from './_types';
import { formatQuery, formatJson } from './_utils';

export const setExternalContext = assign<CodeEditorContext, CodeEditorEvents>({
  external: (_, event) => ({
    selectedRequest: (event as SET_SELECTED_REQUEST).payload.selectedRequest,
    requestMetaDataById: (event as SET_SELECTED_REQUEST).payload.requestMetaDataById,
  }),
});

export const setHighLightValues = assign<CodeEditorContext, CodeEditorEvents>({
  highlights: ({ external: { selectedRequest, requestMetaDataById } }) => ({
    query: Prism.highlight(formatQuery(selectedRequest!.query), Prism.languages.graphql, 'graphql'),
    variables: Prism.highlight(formatJson(selectedRequest!.variables || {}), Prism.languages.json, 'json'),
    headers: Prism.highlight(formatJson(requestMetaDataById!.headers || {}), Prism.languages.json, 'json'),
    data: Prism.highlight(formatJson(requestMetaDataById!.data || {}), Prism.languages.json, 'json'),
  }),
});

export const startPrism = () => {
  Prism.highlightAll();
};

export const setActiveContext = assign<CodeEditorContext, CodeEditorEvents>({
  activeContext: (_, event) => (event as SET_ACTIVE_CONTEXT).payload.editorContext,
});
