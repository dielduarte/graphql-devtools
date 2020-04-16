import React from 'react';

import styles from './Message.module.css';

interface MessageProps {
  Icon: React.ReactElement;
  message: string;
}

function Message({ Icon, message }: MessageProps) {
  return (
    <div className={styles.root}>
      {Icon}
      <p dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}

export default Message;
