import React, { useEffect, useState } from 'react';
import { NodeType } from '../utils/types';
import { useOverflowsScreenBottom } from './useOverflowsScreenBottom';
import classNames from 'classnames';

import styles from './CommandPanel.module.css';

interface CommandPanel {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
}

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  { value: 'text', name: 'Text' },
  { value: 'list', name: 'List' },
  { value: 'page', name: 'Page' },
  { value: 'image', name: 'Image' },
  { value: 'heading1', name: 'Heading 1' },
  { value: 'heading2', name: 'Heading 2' },
  { value: 'heading3', name: 'Heading 3' },
];

export const CommandPanel: React.FC<CommandPanel> = ({
  nodeText,
  selectItem,
}) => {
  const [selectItemIndex, setSelectedItemIndex] = useState(0);
  const { overflows, ref } = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        selectItem(supportedNodeTypes[selectItemIndex].value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectItemIndex, selectItem]);

  useEffect(() => {
    const normalizedValue = nodeText.toLocaleLowerCase().replace(/\//, '');

    setSelectedItemIndex(
      supportedNodeTypes.findIndex((item) => item.value.match(normalizedValue))
    );
  }, [nodeText]);

  return (
    <div
      ref={ref}
      className={classNames(styles.panel, {
        [styles.reverse]: overflows,
      })}
    >
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectItemIndex === index;
          return (
            <li
              key={type.value}
              className={classNames({
                [styles.selected]: selected,
              })}
              onClick={() => selectItem(type.value)}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
