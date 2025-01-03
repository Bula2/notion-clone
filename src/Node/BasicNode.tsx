import React, {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';
import { NodeData, NodeType } from '../utils/types';
import { nanoid } from 'nanoid';

import styles from './Node.module.css';
import { useAppState } from '../state/AppStateContext';
import { CommandPanel } from './CommandPanel';
import classNames from 'classnames';

interface BasicNode {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
}

export const BasicNode: React.FC<BasicNode> = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}) => {
  const { changeNodeValue, changeNodeType, removeNodeByIndex, addNode } =
    useAppState();
  const nodeRef = useRef<HTMLDivElement>(null);

  const showCommandPanel = isFocused && node.value.match(/^\//);

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

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = '';
    }
  };

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
    <>
      {showCommandPanel && (
        <CommandPanel selectItem={parseCommand} nodeText={node.value} />
      )}
      <div
        ref={nodeRef}
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        contentEditable
        suppressContentEditableWarning
        className={classNames(styles.node, styles[node.type])}
      ></div>
    </>
  );
};
