import React from 'react';
import { Sender, State } from 'xstate';

import { styled } from 'stitches.config';
import { PreferencesEnum } from 'core/_types';
import { isPreserveLogs } from 'core/guards';

const Root = styled('div', {
  padding: '$3',
  width: '100%',
  height: '100%',
  background: '$bg2',
  position: 'absolute',
  zIndex: '$1',
});

const Title = styled('h2', {
  color: '$bg4',
  fontSize: '$3',
});

const Item = styled('div', {
  display: 'flex',
  gap: '10px',
  color: '$bg4',
  fontSize: '$2',
  marginTop: '$4',
  alignItems: 'center',
});

const ConfigItem = ({ checked, label, onChange }: any) => {
  return (
    <Item>
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </Item>
  );
};

interface PreferencesProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

const Preferences = ({ send, current }: PreferencesProps) => {
  return (
    <Root>
      <Title>Preferences</Title>

      <ConfigItem
        label="Preserve log"
        checked={isPreserveLogs(current.context)}
        id={PreferencesEnum.preserveLog}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          send({
            type: 'SET_PREFERENCE',
            payload: {
              preference: PreferencesEnum.preserveLog,
              checked: e.target.checked,
            },
          })
        }
      />
    </Root>
  );
};

export default Preferences;
