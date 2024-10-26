import { nanoid } from 'nanoid';
import React from 'react';
import { useAppState } from '../state/AppStateContext';
import { Cover } from './Cover';
import { Spacer } from './Spacer';
import { Title } from './Title';
import { useFocesedNodeIndex } from './useFocusedNodeIndex';
import { DndContext, DragOverlay, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import styles from './Page.module.css';
import { NodeContainer } from '../Node/NodeContainer';

export const Page: React.FC = () => {
  const { nodes, title, setTitle, reorderNodes, addNode } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocesedNodeIndex({
    nodes,
  });

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id && active.id !== over?.id) {
      reorderNodes(active.id as string, over.id as string);
    }
  };

  return (
    <>
      <Cover />
      <div className={styles.body}>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={index}
                node={node}
                updateFocusedIndex={setFocusedNodeIndex}
                isFocused={index === focusedNodeIndex}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
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
