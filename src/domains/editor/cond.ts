import { CodeEditorContext, EditorContext, SET_ACTIVE_CONTEXT } from './_types';

export const getIsNewContextCond = (editorContext: EditorContext) => (
  _: any,
  event: SET_ACTIVE_CONTEXT,
) => {
  return event.payload.editorContext === editorContext;
};

export const getIsContextCond = (editorContext: EditorContext) => (
  context: CodeEditorContext,
) => {
  return context.activeContext === editorContext;
};
