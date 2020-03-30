import React, { useEffect, memo, useState, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-json';
import prettier from 'prettier/standalone';
import parserGraphql from 'prettier/parser-graphql';

import useIsMounted from 'hooks/useIsMounted';
import '../styles/prism.css';
import styles from './CodeEditor.module.css';
import { ReactComponent as CopyIcon } from '../icons/copy.svg';
import { copyToClipBoard } from './CodeEditor.utils';

interface CodeEditorProps {
  selectedRequest: CoreRequest;
  resquestMetaDataById: CoreRequestMetaDataById;
}

function CodeEditor({
  selectedRequest,
  resquestMetaDataById
}: CodeEditorProps) {
  const isMounted = useIsMounted();
  const getHighlightedValues = useCallback((selectedRequest: CoreRequest) => {
    return {
      query: Prism.highlight(
        selectedRequest.query,
        Prism.languages.graphql,
        'graphql'
      ),
      variables: Prism.highlight(
        JSON.stringify(selectedRequest.variables),
        Prism.languages.json,
        'json'
      )
    };
  }, []);

  const copyQuery = useCallback(
    (query: string) => () => {
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

  return (
    <div className={styles.root}>
      <pre className={styles.editor}>
        <code
          className={'language-graphql'}
          dangerouslySetInnerHTML={{ __html: highlights.query }}
        />
      </pre>
      <div className={styles.copy} onClick={copyQuery(selectedRequest.query)}>
        <CopyIcon />
      </div>
    </div>
  );
}

export default memo(CodeEditor);
