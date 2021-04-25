import { createCss } from '@stitches/react';

const getSize = (powValue: number) => `${Math.pow(2, powValue)}px`;

export const { styled, theme, global } = createCss({
  theme: {
    colors: {
      white: '#FFFFFF',
      primary: '#3475E0',
      secondary: '#E0E6F1',
      bg1: '#FFFFFF',
      bg2: '#F3F3F3',
      bg3: '#E0E0E0',
      bg4: '#6E6E6E',
      bg5: '#2A2A2A',
      error: '#E95646',
      warning: '#F3A73B',
      success: '#5ECA75',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '20px',
    },
    fonts: {
      roboto: 'Roboto, sans-serif',
    },
    fontWeights: {
      bold: '700',
      medium: '500',
      regular: '400',
    },
    space: {
      0: '1px',
      1: getSize(1),
      2: getSize(2),
      3: getSize(3),
      4: getSize(4),
    },
    radii: {
      1: getSize(1),
      2: getSize(2),
      3: getSize(3),
      4: getSize(4),
      half: '50%',
    },
    zIndices: {
      0: '1',
      1: '2',
    },
  },
});

export const darkThemeClass = theme({
  colors: {
    primary: '#3475E0',
    secondary: '#303A43',
    bg1: '#242424',
    bg2: '#333333',
    bg3: '#3D3D3D',
    bg4: '#A1A1A1',
  },
});
