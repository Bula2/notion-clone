import React, { useRef, useEffect } from 'react';

import { NodeData } from '../utils/types';
import { nanoid } from 'nanoid';

import styles from './Title.module.css';

interface Title {
  title: string;
  changePageTitle(title: string): void;
  addNode(node: NodeData, index: number): void;
}

export const Title: React.FC<Title> = ({ title, changePageTitle, addNode }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current;
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title;
    }
  }, [title]);

  return (
    <div className={styles.container}>
      <h1
        className={styles.title}
        ref={headerRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) =>
          changePageTitle(event.currentTarget.textContent || '')
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            addNode({ id: nanoid(), type: 'text', value: 'New Node' }, 0);
          }
        }}
      >
        {title}
      </h1>
    </div>
  );
};
