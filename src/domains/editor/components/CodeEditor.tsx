import React, { memo, useEffect, useCallback } from 'react';

import '../../../styles/prism.css';
import styles from './CodeEditor.module.css';
import { useMachine } from '@xstate/react';
import machine from '../machine';
import EditorActions from './EditorActions';
import ContextTabs from './ContextTabs';
import { EditorContext } from '../_types';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';
import { ReactComponent as RefetchIcon } from 'icons/refetch.svg';
import { TAB_COLORS } from '../constants';

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
        <EditorActions className={styles.action}>
          <EditorActions.Action
            Icon={<RefetchIcon />}
            onClick={() => send('REFETCH_OPERATION')}
            success={current.matches('editor.operationRefetchedSuccessfully')}
            loading={current.matches('editor.refetchingOperation')}
          />
          <EditorActions.Action
            Icon={<CopyIcon />}
            onClick={() => send('COPY_CONTEXT')}
            success={current.matches('editor.contextCopiedSuccessfully')}
          />
        </EditorActions>
      </div>

      <ContextTabs className={styles.tabs}>
        <ContextTabs.Tab
          title={'Query'}
          background={TAB_COLORS.query}
          hide={
            activeContext === EditorContext.query ||
            requestMetaDataById.operation !== 'query'
          }
          onClick={handleSetActiveContext(EditorContext.query)}
        />

        <ContextTabs.Tab
          title={'Mutation'}
          background={TAB_COLORS.mutation}
          hide={
            activeContext === EditorContext.query ||
            requestMetaDataById.operation !== 'mutation'
          }
          onClick={handleSetActiveContext(EditorContext.query)}
        />

        <ContextTabs.Tab
          title="Variables"
          background={TAB_COLORS.variables}
          hide={activeContext === EditorContext.variables}
          onClick={handleSetActiveContext(EditorContext.variables)}
        />
        <ContextTabs.Tab
          title="Headers"
          background={TAB_COLORS.headers}
          hide={activeContext === EditorContext.Headers}
          onClick={handleSetActiveContext(EditorContext.Headers)}
        />
      </ContextTabs>
    </div>
  );
}

export default memo(CodeEditor);
