import { memo } from 'react';
import { styled } from 'stitches.config';
import { ReactComponent as ErrorIcon } from '../../icons/error.svg';

const StatusText = styled('span', {
  fontWeight: '$medium',
  color: '$bg4',

  variants: {
    status: {
      loading: {
        color: '$bg4',
      },
      errorOrCanceled: {
        color: '$error',
      },
      success: {
        color: '$success',
      },
    },
  },
});

const WithErrorContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  svg: {
    marginRight: '$2',
  },
});

type StatusType = { statusCode: StatusCode; className?: string };

function Status({ statusCode, className }: StatusType) {
  const currentStatus = {
    loading: statusCode === 'loading',
    errorOrCanceled: statusCode === 'canceled' || (statusCode !== 200 && statusCode !== 'loading'),
    success: statusCode === 200,
  };

  const status = Object.entries(currentStatus).find(([_, isActive]) => isActive)?.[0] ?? 'loading';

  const contentByStatus = {
    loading: '...',
    errorOrCanceled: (
      <WithErrorContainer>
        <ErrorIcon />
        {statusCode}
      </WithErrorContainer>
    ),
    success: statusCode,
  };

  return (
    <StatusText status={status as any} className={className}>
      {contentByStatus[status]}
    </StatusText>
  );
}

export default memo(Status);
