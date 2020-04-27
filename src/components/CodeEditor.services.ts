import { copyToClipBoard, formatQuery } from './CodeEditor.utils';

export const copyContext = (context: any) => {
  return new Promise((resolve, reject) => {
    const {
      external: { selectedRequest },
    } = context;
    try {
      copyToClipBoard(formatQuery(selectedRequest.query));
      resolve();
    } catch {
      reject();
    }
  });
};
