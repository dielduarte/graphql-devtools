import { MachineConfig } from 'xstate';

export enum EditorContext {
  query = 'query',
  variables = 'variables',
  Headers = 'headers',
}

export interface COPY_CONTEXT {
  type: 'COPY_CONTEXT';
}

export interface SET_SELECTED_REQUEST {
  type: 'SET_SELECTED_REQUEST';
  payload: {
    selectedRequest: CoreRequest;
    requestMetaDataById: CoreRequestMetaData;
  };
}

export interface SET_ACTIVE_CONTEXT {
  type: 'SET_ACTIVE_CONTEXT';
  payload: {
    editorContext: EditorContext;
  };
}

export interface REFETCH_OPERATION {
  type: 'REFETCH_OPERATION';
}

export type CodeEditorEvents =
  | SET_SELECTED_REQUEST
  | COPY_CONTEXT
  | SET_ACTIVE_CONTEXT
  | REFETCH_OPERATION;

export interface CodeEditorSchema {
  states: {
    editor: {
      states: {
        idle: {};
        copyingContext: {};
        contextCopiedSuccessfully: {};
        refetchingOperation: {};
        operationRefetchedSuccessfully: {};
      };
    };
  };
}

export interface CodeEditorContext {
  external: {
    selectedRequest?: CoreRequest;
    requestMetaDataById?: CoreRequestMetaData;
  };
  highlights: {
    query: string;
    variables: string;
    headers: string;
  };
  activeContext: EditorContext;
}

export type CodeEditorMachine = MachineConfig<
  CodeEditorContext,
  CodeEditorSchema,
  CodeEditorEvents
>;
