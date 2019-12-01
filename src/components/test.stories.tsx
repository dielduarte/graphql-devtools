import React from 'react';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Components', module);
import Button from './Button'

stories.add(
    'TicTacToeCell',
    () => <Button>oi</Button>,
);