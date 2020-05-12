import React, { useCallback, useRef, useState } from 'react';
import { Sender, State } from 'xstate';
import classNames from 'classnames';

import { ReactComponent as RequestIcon } from '../../icons/settings.svg';
import styles from './Settings.module.css';
import useOnOutsideClick from '../../hooks/useOnOutsideClick';

interface SettingsProps {
  send: Sender<CoreEvents>;
  current: State<CoreContext, CoreEvents>;
}

enum ModalStatus {
  open,
  close,
}

function Settings({ send, current }: SettingsProps) {
  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.close);
  const rootRef = useRef(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const active = modalStatus === ModalStatus.open;
  const iconBoxClassName = classNames({
    [styles.iconBox]: true,
    active: active,
  });

  const setUrls = () => {
    send({
      type: 'SET_URLS',
      payload: {
        urls: textAreaRef.current ? textAreaRef.current.value : '',
      },
    });
  };

  const toggleSettingMenu = () => {
    setModalStatus(active ? ModalStatus.close : ModalStatus.open);
    setUrls();
  };

  useOnOutsideClick(rootRef, () => {
    if (!active) return;
    setUrls();
    setModalStatus(ModalStatus.close);
  });

  return (
    <div ref={rootRef} className={styles.settings}>
      <div className={iconBoxClassName} onClick={toggleSettingMenu}>
        {!active && !current.context.settings.urls.length && <div className={styles.alert} />}
        <RequestIcon />
      </div>
      {active && (
        <div className={styles.inputContainer}>
          <h3>separated by comma add URLs to start watching</h3>
          <textarea
            defaultValue={current.context.settings.urls.join(', ')}
            ref={textAreaRef}
            className={styles.textArea}
            placeholder="https://myapi.rocks/graphql, https://otherapi.com/graphql"
          />
        </div>
      )}
    </div>
  );
}

export default Settings;
