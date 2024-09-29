import React from 'react';
import { NodeData } from '../utils/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NodeTypeSwitcher } from './NodeTypeSwitcher';
import styles from './NodeContainer.module.css';

interface NodeContainer {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
}

export const NodeContainer: React.FC<NodeContainer> = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: node.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    </div>
  );
};
