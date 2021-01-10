import React from 'react';

import { Placement } from 'tippy.js';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

type TipProps = {
  content: string | React.ReactElement;
  children: React.ReactElement;
  placement?: Placement;
};

export const Tip = ({ content, children, placement = 'right' }: TipProps) => {
  return (
    <Tippy content={content} placement={placement}>
      {children}
    </Tippy>
  );
};
