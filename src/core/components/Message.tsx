import React from 'react';
import { styled } from 'stitches.config';

const Container = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  color: '$bg4',
});

const Title = styled('h3', {
  fontSize: '$3',
  fontWeight: '$bold',
});

const Description = styled('p', {
  fontWeight: '$regular',
});

interface MessageProps {
  message: string;
  title: string;
}

function Message({ message, title }: MessageProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{message}</Description>
    </Container>
  );
}

export default Message;
