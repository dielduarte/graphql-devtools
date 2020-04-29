import React, { memo, useEffect, useCallback, useMemo } from 'react';

import '../styles/prism.css';
import styles from './CodeEditor.module.css';
import { useMachine } from '@xstate/react';
import machine from './CodeEditor.machine';
import EditorAction from './EditorAction';
import ContextTabs from './ContextTabs';
import { EditorContext } from './CodeEditor.types';

interface CodeEditorProps {
  selectedRequest: CoreRequest;
  requestMetaDataById: CoreRequestMetaData;
}

function CodeEditor({ selectedRequest, requestMetaDataById }: CodeEditorProps) {
  const [current, send] = useMachine(machine);
  const { highlights, activeContext } = current.context;

  const handleSetActiveContext = useCallback(
    (editorContext: EditorContext) => () => {
      send({
        type: 'SET_ACTIVE_CONTEXT',
        payload: { editorContext },
      });
    },
    [send]
  );

  const operationTabMetaData = useMemo(() => {
    if (requestMetaDataById.operation === 'query') {
      return {
        title: 'Query',
        background: '#16A085',
      };
    }

    return {
      title: 'Mutation',
      background: '#E67E22',
    };
  }, [requestMetaDataById.operation]);

  useEffect(() => {
    send({
      type: 'SET_SELECTED_REQUEST',
      payload: { selectedRequest, requestMetaDataById },
    });
  }, [selectedRequest, requestMetaDataById, send]);

  return (
    <div className={styles.root}>
      <div className={styles.editor}>
        <pre className={styles.code}>
          <code
            className={'language-graphql'}
            dangerouslySetInnerHTML={{ __html: highlights[activeContext] }}
          />
        </pre>
        <EditorAction
          success={current.matches('editor.contextCopiedSuccessfully')}
          className={styles.action}
          onClick={() => {
            send('COPY_CONTEXT');
          }}
        />
      </div>

      <ContextTabs className={styles.tabs}>
        <ContextTabs.Tab
          title={operationTabMetaData.title}
          background={operationTabMetaData.background}
          hide={activeContext === EditorContext.query}
          onClick={handleSetActiveContext(EditorContext.query)}
        />

        <ContextTabs.Tab
          title="Variables"
          background="#81AADD"
          hide={activeContext === EditorContext.variables}
          onClick={handleSetActiveContext(EditorContext.variables)}
        />
        <ContextTabs.Tab
          title="Headers"
          background="#999BA4"
          hide={activeContext === EditorContext.Headers}
          onClick={handleSetActiveContext(EditorContext.Headers)}
        />
      </ContextTabs>
    </div>
  );
}

export default memo(CodeEditor);
