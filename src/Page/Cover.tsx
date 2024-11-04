import React, { ChangeEventHandler, useRef } from 'react';

import styles from './Cover.module.css';
import { FileImage } from '../components/FileImage';
import { uploadImage } from '../utils/uploadImage';

type CoverProps = {
  filePath?: string;
  changePageCover: (filePath: string) => void;
};

export const Cover: React.FC<CoverProps> = ({ filePath, changePageCover }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeCoverImage = () => {
    fileInputRef.current?.click();
  };

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const target = event.target;
    const result = await uploadImage(target?.files?.[0]);

    if (result?.filePath) {
      changePageCover(result.filePath);
    }
  };

  return (
    <div className={styles.cover}>
      {filePath ? (
        <FileImage className={styles.image} filePath={filePath} />
      ) : (
        <img className={styles.image} src="/public/notion2.png" alt="Cover" />
      )}
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
