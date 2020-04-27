import React, { memo, useEffect } from 'react';

import '../styles/prism.css';
import styles from './CodeEditor.module.css';
import { useMachine } from '@xstate/react';
import machine from './CodeEditor.machine';
import EditorAction from './EditorAction';

interface CodeEditorProps {
  selectedRequest: CoreRequest;
  requestMetaDataById: CoreRequestMetaData;
}

function CodeEditor({ selectedRequest, requestMetaDataById }: CodeEditorProps) {
  const [current, send] = useMachine(machine);
  const { highlights } = current.context;

  useEffect(() => {
    send({
      type: 'SET_SELECTED_REQUEST',
      payload: { selectedRequest, requestMetaDataById },
    });
  }, [selectedRequest, requestMetaDataById, send]);

  return (
    <div className={styles.root}>
      <pre className={styles.editor}>
        <code
          className={'language-graphql'}
          dangerouslySetInnerHTML={{ __html: highlights.query }}
        />
      </pre>
      <EditorAction
        success={current.matches('contextCopiedSuccessfully')}
        className={styles.action}
        onClick={() => {
          send('COPY_CONTEXT');
        }}
      />
    </div>
  );
}

export default memo(CodeEditor);
