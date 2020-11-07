import React from 'react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

type TipProps = {
  content: string | React.ReactElement;
  children: React.ReactElement;
};

export const Tip = ({ content, children }: TipProps) => {
  return (
    <Tippy content={content} placement="right">
      {children}
    </Tippy>
  );
};
