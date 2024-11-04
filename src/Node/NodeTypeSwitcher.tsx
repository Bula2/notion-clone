import React from 'react';
import { NodeData, NodeType } from '../utils/types';
import { BasicNode } from './BasicNode';
import { PageNode } from './PageNode';
import { ImageNode } from './ImageNode';

interface NodeTypeSwitcher {
  node: NodeData;
  updateFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
}

const TEXT_NODE_TYPES: NodeType[] = [
  'text',
  'list',
  'heading1',
  'heading2',
  'heading3',
];

export const NodeTypeSwitcher: React.FC<NodeTypeSwitcher> = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    );
  }

  if (node.type === 'page') {
    return <PageNode node={node} index={index} isFocused={isFocused} />;
  }

  if (node.type === 'image') {
    return <ImageNode node={node} index={index} isFocused={isFocused} />;
  }
  return null;
};
