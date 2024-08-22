import { z } from 'zod';

import { UrlCondition, VisitorType } from '@/__generated__/graphql';
import { TFunction } from '@/types/t-function';
import { UrlSchema } from '@/utils/custom-validations/url-schema';

export const ConditionType = z.nativeEnum(UrlCondition);
export const Visitor = z.nativeEnum(VisitorType);

const isFilled = (url: string | null) => url != null && url.trim() !== '';

const actionSchema = (t: TFunction) =>
  z
    .object({
      destinationUrlCondition: ConditionType.nullable(),
      startingUrlCondition: ConditionType.nullable(),
      startingUrl: z.string().nullable(),
      destinationUrl: z.string().nullable()
    })
    .refine(
      (data) => {
        const startingFilled = isFilled(data.startingUrl);
        const destinationFilled = isFilled(data.destinationUrl);
        return !(startingFilled && !destinationFilled);
      },
      {
        message: t('validation.destinationUrl'),
        path: ['destinationUrl']
      }
    )
    .refine(
      (data) => {
        const startingFilled = isFilled(data.startingUrl);
        const destinationFilled = isFilled(data.destinationUrl);
        return !(destinationFilled && !startingFilled);
      },
      {
        message: t('validation.startingUrl'),
        path: ['startingUrl']
      }
    );

const pageViewSchema = (isPageUrlNullable: boolean) =>
  z.object({
    pageUrl: isPageUrlNullable ? z.string().nullable() : UrlSchema.min(1),
    visitorType: Visitor.nullable()
  });

export type ActionType = z.infer<ReturnType<typeof actionSchema>>;
export type PageViewType = z.infer<ReturnType<typeof pageViewSchema>>;

export const UpdateStageEventsSchema = (t: TFunction) =>
  z
    .object({
      name: z.string().min(1, t('validation.eventName')),
      pageViewConditions: z.array(pageViewSchema(true)).nullable(),
      actionConditions: z.array(actionSchema(t)).nullable()
    })
    .superRefine((data, ctx) => {
      // Check if any actionConditions startingUrl or destinationUrl is filled
      const isActionUrlFilled = data.actionConditions?.some(
        (action) => isFilled(action.startingUrl) || isFilled(action.destinationUrl)
      );

      // If action URL is filled, allow pageUrl to be nullable
      if (isActionUrlFilled) {
        data.pageViewConditions?.forEach((pageView, index) => {
          const pageViewValidation = pageViewSchema(true).safeParse(pageView);
          if (!pageViewValidation.success) {
            ctx.addIssue({
              /* eslint-disable i18next/no-literal-string */
              code: 'custom',
              message: t('validation.url'),
              path: ['pageViewConditions', index, 'pageUrl']
            });
          }
        });
      } else {
        // If no action URL is filled, pageUrl must be validated as required
        data.pageViewConditions?.forEach((pageView, index) => {
          const pageViewValidation = pageViewSchema(false).safeParse(pageView);
          if (!pageViewValidation.success) {
            ctx.addIssue({
              code: 'custom',
              message: t('validation.url'),
              path: ['pageViewConditions', index, 'pageUrl']
            });
          }
        });
      }
    });

export type UpdateStageEventsFormData = z.infer<ReturnType<typeof UpdateStageEventsSchema>>;
