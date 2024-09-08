import { nanoid } from 'nanoid';
import React from 'react';
import { NodeTypeSwitcher } from '../Node/NodeTypeSwitcher';
import { useAppState } from '../state/AppStateContext';
import { Cover } from './Cover';
import { Spacer } from './Spacer';
import { Title } from './Title';
import { useFocesedNodeIndex } from './useFocusedNodeIndex';

import styles from './Page.module.css';

export const Page: React.FC = () => {
  const { nodes, title, setTitle, addNode } = useAppState();
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocesedNodeIndex({
    nodes,
  });

  return (
    <>
      <Cover />
      <div className={styles.body}>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={index}
            node={node}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={index === focusedNodeIndex}
            index={index}
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
