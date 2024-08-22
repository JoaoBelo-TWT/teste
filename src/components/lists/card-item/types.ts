import type { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export type CardItemProps = {
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  children: React.ReactNode;
  isDraggable: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  itemIndex?: number;
};
