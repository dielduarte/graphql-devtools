import { copyToClipBoard, formatQuery, formatJson } from './CodeEditor.utils';
import { EditorContext, CodeEditorContext } from './CodeEditor.types';

export const copyContext = (context: CodeEditorContext) => {
  return new Promise((resolve, reject) => {
    const {
      external: { selectedRequest, requestMetaDataById },
      activeContext,
    } = context;

    try {
      if (activeContext !== EditorContext.Headers) {
        copyToClipBoard(
          activeContext === EditorContext.query
            ? formatQuery(selectedRequest!.query)
            : formatJson(selectedRequest!.variables || {})
        );
      } else {
        copyToClipBoard(formatJson(requestMetaDataById!.headers));
      }

      resolve();
    } catch {
      reject();
    }
  });
};
