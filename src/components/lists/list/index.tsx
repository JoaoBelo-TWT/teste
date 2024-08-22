'use client';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { OnDragEndResponder } from '@hello-pangea/dnd';

import { CardItem } from '../card-item';

import classes from './index.module.css';
import { ListProps } from './types';

export function List({
  isDraggable = false,
  droppableId,
  items,
  move,
  onDragEndAction,
  showItemIndex
}: Readonly<ListProps>) {
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (move) {
      move(source.index, destination.index);
    }

    if (onDragEndAction) {
      onDragEndAction();
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} isDropDisabled={!isDraggable}>
        {(provided) => (
          <div className={classes.list__container} {...provided.droppableProps} ref={provided.innerRef}>
            {items?.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!isDraggable}>
                {(dProvided) => (
                  <div key={item.id} ref={dProvided.innerRef} {...dProvided.draggableProps}>
                    <CardItem
                      dragHandleProps={dProvided.dragHandleProps}
                      isDraggable={isDraggable}
                      ref={dProvided.innerRef}
                      isFirst={index === 0}
                      isLast={index === items.length - 1}
                      itemIndex={showItemIndex ? index + 1 : undefined}
                    >
                      {item.children}
                    </CardItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
