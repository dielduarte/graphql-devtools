import { styled } from 'stitches.config';

export const Button = styled('button', {
  padding: '$2 $3',
  color: '$bg4',
  border: 'none',
  borderRadius: '$2',
  marginRight: '$3',
  background: 'transparent',

  '&:hover': {
    background: '$secondary',
    color: '$bg4',
    cursor: 'pointer',
  },

  variants: {
    active: {
      true: {
        color: '$white',
        background: '$primary',

        '&:hover': {
          color: '$white',
          background: '$primary',
        },
      },
    },
  },
});
