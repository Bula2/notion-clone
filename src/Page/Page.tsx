import React, { useState } from 'react';
import { NodeData } from '../utils/types';

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  return <div>Page</div>;
};
