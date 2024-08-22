'use client';

import { Accordion as MantineAccordion, Text } from '@mantine/core';

import classes from './index.module.css';
import { AccordionProps } from './types';

export function Accordion({ accordionItems, ...props }: Readonly<AccordionProps>) {
  const items = accordionItems.map((item) => (
    <MantineAccordion.Item key={item.id} value={item.id}>
      <MantineAccordion.Control icon={item.icon} disabled={item.disabled}>
        <Text fw={500} c="dark9">
          {item.title}
        </Text>
      </MantineAccordion.Control>
      <MantineAccordion.Panel>{item.content}</MantineAccordion.Panel>
    </MantineAccordion.Item>
  ));

  return (
    <MantineAccordion
      radius="md"
      classNames={{
        chevron: classes.accordion__chevron,
        item: classes.accordion__item,
        content: classes.accordion__content,
        control: classes.accordion__control
      }}
      variant="contained"
      {...props}
    >
      {items}
    </MantineAccordion>
  );
}
