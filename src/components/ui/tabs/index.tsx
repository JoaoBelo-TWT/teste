import {
  Tabs as BaseTabs,
  TabsList,
  TabsListProps,
  TabsPanel,
  TabsPanelProps,
  TabsTab,
  TabsTabProps
} from '@mantine/core';
import clsx from 'clsx';

import classes from './index.module.css';
import { TabsProps } from './types';

export function Tabs(props: Readonly<TabsProps>) {
  return (
    <BaseTabs
      {...props}
      classNames={{
        list: classes.tabs__list,
        tab: clsx(classes.tabs__tab, props.variant === 'header' && classes['tabs__tab--header']),
        tabLabel: classes['tabs__tab-label'],
        tabSection: classes['tabs__tab-section']
      }}
    />
  );
}

/**
 * This "duplication" ensures that the storybook codes
 * snippet point to the correct component name
 */
const Tab = (props: TabsTabProps) => <TabsTab {...props} />;
const Panel = (props: TabsPanelProps) => <TabsPanel {...props} />;
const List = (props: TabsListProps) => <TabsList {...props} />;

Tabs.Tab = Tab;
Tabs.Panel = Panel;
Tabs.List = List;
