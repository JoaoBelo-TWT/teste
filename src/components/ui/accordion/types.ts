import { AccordionProps as MantineAccordionProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface AccordionItemProps {
  id: string;
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
  content?: ReactNode;
}

export interface AccordionProps extends MantineAccordionProps {
  accordionItems: AccordionItemProps[];
}
