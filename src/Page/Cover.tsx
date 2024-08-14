import React, { ChangeEventHandler, useRef } from 'react';

import styles from './Cover.module.css';

export const Cover: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target;
    console.log(target?.files?.[0]);
  };

  return (
    <div className={styles.cover}>
      <img className={styles.image} src="/public/notion2.png" alt="Cover" />
      <button className={styles.button} onClick={onChangeCoverImage}>
        Change cover
      </button>
      <input
        onChange={onCoverImageUpload}
        className={styles.input}
        ref={fileInputRef}
        type="file"
      />
    </div>
  );
};
