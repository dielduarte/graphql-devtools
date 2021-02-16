import { assign } from 'xstate';
import Prism from 'prismjs';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';

import {
  CodeEditorContext,
  CodeEditorEvents,
  SET_SELECTED_REQUEST,
  SET_ACTIVE_CONTEXT,
} from './_types';
import { highlightQuery, highlightJson } from './_utils';

export const setExternalContext = assign<CodeEditorContext, CodeEditorEvents>({
  external: (_, event) => ({
    selectedRequest: (event as SET_SELECTED_REQUEST).payload.selectedRequest,
    requestMetaDataById: (event as SET_SELECTED_REQUEST).payload
      .requestMetaDataById,
  }),
});

export const setHighLightQuery = assign<CodeEditorContext, CodeEditorEvents>({
  highlights: ({ external: { selectedRequest } }) => ({
    query: highlightQuery(selectedRequest!.query),
  }),
});

export const setHighLightVariables = assign<
  CodeEditorContext,
  CodeEditorEvents
>({
  highlights: ({ external: { selectedRequest } }) => ({
    variables: highlightJson(selectedRequest!.variables),
  }),
});

export const setHighLightHeaders = assign<CodeEditorContext, CodeEditorEvents>({
  highlights: ({ external: { requestMetaDataById } }) => ({
    headers: highlightJson(requestMetaDataById!.headers),
  }),
});

export const setHighLightData = assign<CodeEditorContext, CodeEditorEvents>({
  highlights: ({ external: { requestMetaDataById } }) => ({
    data: highlightJson(requestMetaDataById!.data),
  }),
});

export const startPrism = () => {
  Prism.highlightAll();
};

export const setActiveContext = assign<CodeEditorContext, CodeEditorEvents>({
  activeContext: (_, event) =>
    (event as SET_ACTIVE_CONTEXT).payload.editorContext,
});
