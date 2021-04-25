import React, { memo, useEffect, useCallback } from 'react';

import '../../../styles/prism.css';
import { useMachine } from '@xstate/react';
import machine from '../machine';
import { EditorContext } from '../_types';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';
import { ReactComponent as RefetchIcon } from 'icons/refetch.svg';

import { Button } from 'core/ui/Button';
import { Divider } from 'core/ui/Divider';
import { styled } from 'stitches.config';
import { Tip } from 'core/ui/Tip';

const Editor = styled('div', {
  height: '100%',
  background: '$bg1',
});

const Header = styled('header', {
  position: 'sticky',
  top: 0,
  background: '$bg2',
  padding: '$3',
  display: 'flex',
  alignItems: 'center',
  maxHeight: '44px',

  svg: {
    cursor: 'pointer',
  },
});

const Pre = styled('pre', {
  /* margin with important due to primsjs global styles :/ */
  margin: '0 !important',
  padding: '$3',
  height: '100%',
});

const Action = styled('button', {
  border: 'none',
  padding: '$3',
  borderRadius: '$2',
  display: 'flex',
  background: 'transparent',

  variants: {
    active: {
      true: {
        background: '$primary',

        '> svg > path': {
          fill: '$white',
        },
      },
    },
  },
});

interface CodeEditorProps {
  selectedRequest: CoreRequest;
  requestMetaDataById: CoreRequestMetaData;
}

function CodeEditor({ selectedRequest, requestMetaDataById }: CodeEditorProps) {
  const [current, send] = useMachine(machine);
  const { highlights, activeContext } = current.context;
  const isMutation = requestMetaDataById.operation !== 'query';

  const handleSetActiveContext = useCallback(
    (editorContext: EditorContext) => () => {
      send({
        type: 'SET_ACTIVE_CONTEXT',
        payload: { editorContext, selectedRequest, requestMetaDataById },
      });
    },
    [send, selectedRequest, requestMetaDataById],
  );

  useEffect(() => {
    send({
      type: 'SET_SELECTED_REQUEST',
      payload: { selectedRequest, requestMetaDataById },
    });
  }, [selectedRequest, requestMetaDataById, send]);

  return (
    <Editor>
      <Header>
        <Button
          active={activeContext === EditorContext.query}
          onClick={handleSetActiveContext(EditorContext.query)}
        >
          {isMutation ? 'Mutation' : 'Query'}
        </Button>
        <Button
          active={activeContext === EditorContext.variables}
          onClick={handleSetActiveContext(EditorContext.variables)}
        >
          Variables
        </Button>
        <Button
          active={activeContext === EditorContext.Headers}
          onClick={handleSetActiveContext(EditorContext.Headers)}
        >
          Headers
        </Button>
        <Button
          active={activeContext === EditorContext.data}
          onClick={handleSetActiveContext(EditorContext.data)}
        >
          Data
        </Button>

        <Divider />

        <Tip content={isMutation ? 'Refetch mutation' : 'Refetch query'}>
          <Action
            onClick={() => send('REFETCH_OPERATION')}
            active={current.matches('operationRefetchedSuccessfully')}
          >
            <RefetchIcon />
          </Action>
        </Tip>
        <Tip content={`Copy ${activeContext}`}>
          <Action
            onClick={() => send('COPY_CONTEXT')}
            active={current.matches('contextCopiedSuccessfully')}
          >
            <CopyIcon />
          </Action>
        </Tip>
      </Header>
      <Pre>
        <code
          className={'language-graphql'}
          dangerouslySetInnerHTML={{ __html: highlights[activeContext] ?? '' }}
        />
      </Pre>
    </Editor>
  );
}

export default memo(CodeEditor);
