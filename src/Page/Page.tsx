import React, { useState } from 'react';
import { NodeData } from '../utils/types';
import { useFocesedNodeIndex } from './useFocusedNodeIndex';
import { Cover } from './Cover';
import { Spacer } from './Spacer';
import { BasicNode } from '../Node/BasicNode';
import { Title } from './Title';
import { nanoid } from 'nanoid';

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState<string>('Default Title');
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocesedNodeIndex({
    nodes,
  });

  const addNode = (node: NodeData, index: number): void => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number): void => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string): void => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
    console.log(1)
  };

  return (
    <>
      <Cover />
      <div>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        {nodes.map((node, index) => (
          <BasicNode
            key={index}
            node={node}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={index === focusedNodeIndex}
            index={index}
            addNode={addNode}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handleClick={() =>
            addNode({ type: 'text', value: '', id: nanoid() }, nodes.length)
          }
        />
      </div>
    </>
  );
};
