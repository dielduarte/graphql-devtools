import { globalCss } from '@stitches/react';

export default globalCss({
  body: {
    fontFamily: '$roboto',
    margin: 0,
    padding: 0,
    height: '100vh',
    overflow: 'hidden',
    background: '$bg1',
    fontSize: '$1',

    '*, *::after, *::before': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
  },
});
