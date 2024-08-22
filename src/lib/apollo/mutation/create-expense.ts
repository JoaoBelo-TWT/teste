import { gql } from '@/__generated__';

export const createExpenseMutation = gql(`
  mutation CreateExpense ($createExpenseInput: CreateExpenseInput!) {
    createExpense (createExpenseInput: $createExpenseInput) {
      amount
      category
      createdAt
      dashboardId
      id
      name
      recurringRepeat
      updatedAt
    }
  }
`);
