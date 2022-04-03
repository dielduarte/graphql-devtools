import { ChangeEvent } from 'react';
import { Sender, State } from 'xstate';
import debounce from 'lodash.debounce';

import { styled } from 'stitches.config';
import { Tip } from 'core/ui/Tip';

const Container = styled('div', {
  borderBottom: '1px solid $bg3',
  padding: '$3',
  marginBottom: '$3',
});

const Input = styled('textarea', {
  background: '$bg3',
  width: '100%',
  padding: '$2 $3',
  color: '$bg4',
  border: 'none',
  borderRadius: '$2',
  resize: 'none',
  height: '24px',
  transition: 'height 0.1s linear',
  lineHeight: '17px',

  '&:focus': {
    height: '100px',
  },
});

interface SettingsProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

function Settings({ send, current }: SettingsProps) {
  const setUrls = (e: ChangeEvent<HTMLTextAreaElement>) => {
    send({
      type: 'SET_URLS',
      payload: {
        urls: e.target.value,
      },
    });
  };

  const debouncedSetUrls = debounce(setUrls, 300);

  return (
    <Container>
      <Tip content="To watch multiple urls, type it separated by comma.">
        <Input
          placeholder="Paste URL here to watch..."
          defaultValue={current.context.settings.urls.join(', ')}
          onChange={(e) => {
            e.persist();
            debouncedSetUrls(e);
          }}
        />
      </Tip>
    </Container>
  );
}

export default Settings;
