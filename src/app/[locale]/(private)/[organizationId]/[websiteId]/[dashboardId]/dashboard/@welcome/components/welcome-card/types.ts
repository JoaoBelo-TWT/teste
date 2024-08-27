import { ReactNode } from 'react';

export interface WelcomeCardProps {
  name: string;
}

export interface CardProps {
  label: string;
  value: string;
}
export interface WelcomeCardPropsUI {
  background?: ReactNode;
  caption: string;
  heroMessage: string;
  bottomCards: CardProps[];
  description?: string;
  ctaButton?: ReactNode;
  variant?: 'default' | 'empty';
}
