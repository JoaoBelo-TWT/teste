'use client';

import { useState } from 'react';

import { Accordion } from '@/components/ui/accordion';
import { AccordionProps } from '@/components/ui/accordion/types';
import { useEffectOnceWhen } from '@/hooks/use-effect-once';
import { SPACING } from '@/resources/constants';

export default function DashboardClientAccordion(props: AccordionProps) {
  const [defaultValue, setDefaultValue] = useState<string | null | undefined>(props.defaultValue);
  const [checkedParams, setCheckedParams] = useState<boolean>(false);

  // Check if there is a dashboardId query param to open the accordion on that dashboard on page load
  useEffectOnceWhen(() => {
    // Extract the query parameter from the URL and update the defaultValue
    const params = new URLSearchParams(window.location.search);
    const dashboardId = params.get('dashboardId');

    if (dashboardId) {
      setDefaultValue(dashboardId);
    }
    setCheckedParams(true);
  }, !checkedParams);

  if (!checkedParams) {
    return null;
  }

  return <Accordion defaultValue={defaultValue} mt={SPACING.md} accordionItems={props.accordionItems} />;
}
