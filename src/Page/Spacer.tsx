import React from 'react';

import styles from './Cover.module.css';

interface Spacer {
  handleClick(): void;
  showHint: boolean;
}

export const Spacer: React.FC<Spacer> = ({ handleClick, showHint }) => {
  return (
    <div className={styles.spacer} onClick={handleClick}>
      {showHint && 'Click to create first paragraph.'}
    </div>
  );
};
