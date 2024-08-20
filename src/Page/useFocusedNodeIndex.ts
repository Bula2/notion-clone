import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NodeData } from '../utils/types';

interface UseFocesedNodeIndex {
  nodes: NodeData[];
}

export const useFocesedNodeIndex = ({
  nodes,
}: UseFocesedNodeIndex): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      }
      if (e.key === 'ArrowDown') {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length - 1));
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
