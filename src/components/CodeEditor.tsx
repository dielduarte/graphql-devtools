import React, { useEffect, memo, useState, useCallback, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';
import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';

import useIsMounted from 'hooks/useIsMounted';
import '../styles/prism.css';
import styles from './CodeEditor.module.css';
import { copyToClipBoard } from './CodeEditor.utils';
import { useMachine } from '@xstate/react';
import machine from 'core/machine';
import EditorAction from './EditorAction/EditorAction';

interface CodeEditorProps {
  selectedRequest: CoreRequest;
  resquestMetaDataById: CoreRequestMetaData;
}

function CodeEditor({
  selectedRequest,
  resquestMetaDataById
}: CodeEditorProps) {
  const [curr, send] = useMachine(machine);
  const isMounted = useIsMounted();
  const [isHovering, setHovering] = useState(false);
  const getHighlightedValues = useCallback((selectedRequest: CoreRequest) => {
    return {
      query: Prism.highlight(
        selectedRequest.query,
        Prism.languages.graphql,
        'graphql'
      ),
      variables: Prism.highlight(
        JSON.stringify(selectedRequest.variables || {}),
        Prism.languages.json,
        'json'
      )
    };
  }, []);

  const copyQuery = useCallback(
    (query: string) => {
      const formatedQuery = prettier.format(query, {
        parser: 'graphql',
        plugins: [parserGraphql]
      });

      copyToClipBoard(formatedQuery);
    },
    []
  );

  const [highlights, setHighlights] = useState(
    getHighlightedValues(selectedRequest)
  );

  useEffect(() => {
    if (isMounted) {
      setHighlights(getHighlightedValues(selectedRequest));
    }

    Prism.highlightAll();
  }, [isMounted, setHighlights, selectedRequest, getHighlightedValues]);

  const handleActionClick = useCallback(() => {
    copyQuery(selectedRequest.query);
    send('COPY_CONTEXT');
  }, [selectedRequest, copyQuery, send]);

  const chooseAction = useCallback(() => {
    return curr.matches('core.editor.contextCopiedSuccessfully')
      ? <EditorAction success onClick={handleActionClick} />
      : <EditorAction onClick={handleActionClick} />
  }, [isHovering, curr]);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setHovering(true) }
      onMouseLeave={() => setHovering(false)}
    >
      <pre className={styles.editor}>
        <code
          className={'language-graphql'}
          dangerouslySetInnerHTML={{ __html: highlights.query }}
        />
      </pre>
      {isHovering && chooseAction()}
    </div>
  );
}

export default memo(CodeEditor);
