export type NodeType =
  | 'text'
  | 'image'
  | 'list'
  | 'page'
  | 'heading1'
  | 'heading2'
  | 'heading3';

export interface NodeData {
  id: string;
  type: NodeType;
  value: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  nodes: NodeData[];
  cover: string;
}
