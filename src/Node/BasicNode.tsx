import React, {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import { NodeData } from '../utils/types';
import { nanoid } from 'nanoid';

import styles from './Node.module.css';

interface BasicNode {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
  addNode(node: NodeData, index: number): void;
  removeNodeByIndex(index: number): void;
  changeNodeValue(index: number, value: string): void;
}

export const BasicNode: React.FC<BasicNode> = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
  addNode,
  removeNodeByIndex,
  changeNodeValue,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const handleInput: FormEventHandler<HTMLDivElement> | undefined = ({
    currentTarget,
  }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || '');
  };

  const handleClick = () => {
    updateFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined = (
    event
  ) => {
    const target = event.target as HTMLDivElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (target.textContent?.[0] === '/') {
        return;
      }
      addNode({ id: nanoid(), type: node.type, value: '' }, index + 1);
      updateFocusedIndex(index + 1);
    }
    if (event.key === 'Backspace') {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        updateFocusedIndex(index - 1);
      } else if (window.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        updateFocusedIndex(index - 1);
      }
    }
  };

  return (
    <div
      ref={nodeRef}
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      contentEditable
      suppressContentEditableWarning
      className={styles.node}
    ></div>
  );
};
