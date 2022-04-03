import { styled } from 'stitches.config';

const Grid = styled('div', {
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
});

const Column = styled('div', {
  height: '100%',
  overflow: 'auto',
});

const LeftColumn = styled(Column, {
  minWidth: '300px',
  width: '300px',
  background: '$bg2',
});

const RightColumn = styled(Column, {
  flex: 1,
  minWidth: '300px',
});

export const FixedElement = styled('div', {
  position: 'sticky',
  top: 0,
  background: '$bg2',
  zIndex: '$0',
});

interface GridProps {
  Left: React.ReactElement;
  Right: React.ReactElement;
}

function GridComponent({ Left, Right }: GridProps) {
  return (
    <Grid>
      <LeftColumn>{Left}</LeftColumn>
      <RightColumn>{Right}</RightColumn>
    </Grid>
  );
}

export default GridComponent;
