import { UseFieldArrayMove } from 'react-hook-form';

export type Item = {
  key?: string;
  id: string;
  children: React.ReactNode;
};

export type ListProps = {
  isDraggable?: boolean;
  droppableId: string;
  items: Item[];
  move?: UseFieldArrayMove;
  onDragEndAction?: () => void;
  showItemIndex?: boolean;
};
