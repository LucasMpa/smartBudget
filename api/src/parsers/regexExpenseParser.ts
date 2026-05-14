import type { ExpenseParser, ParseExpenseResult } from '@/types/expense';

const CURRENCY_PATTERN = String.raw`(?:R\$\s*)?`;
const AMOUNT_PATTERN = String.raw`(\d+(?:[.,]\d{1,2})?)`;
const EXPENSE_PATTERN = new RegExp(
  String.raw`^\s*(?<category>.+?)\s+${CURRENCY_PATTERN}(?<amount>${AMOUNT_PATTERN})\s*$`,
  'i',
);

export const parseExpenseWithRegex: ExpenseParser = (input: string): ParseExpenseResult => {
  const normalizedInput = input.trim().replace(/\s+/g, ' ');

  if (!normalizedInput) {
    return {
      success: false,
      error: {
        code: 'EMPTY_EXPENSE_TEXT',
        message: 'Expense text is empty.',
        example: 'ifood 90',
      },
    };
  }

  const match = normalizedInput.match(EXPENSE_PATTERN);
  const category = match?.groups?.category?.trim();
  const rawAmount = match?.groups?.amount;

  if (!category || !rawAmount) {
    return {
      success: false,
      error: {
        code: 'INVALID_EXPENSE_TEXT',
        message: 'Could not identify category and amount.',
        example: 'ifood 90',
      },
    };
  }

  const amount = Number(rawAmount.replace(',', '.'));

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      error: {
        code: 'INVALID_EXPENSE_AMOUNT',
        message: 'Expense amount must be a positive number.',
        example: 'mercado 120,50',
      },
    };
  }

  return {
    success: true,
    data: {
      category,
      amount,
    },
  };
};
