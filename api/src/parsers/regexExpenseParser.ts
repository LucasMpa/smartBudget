import type { ExpenseParser, ParseExpenseResult } from '@/types/expense';

const CURRENCY_PATTERN = String.raw`(?:R\$\s*)?`;
const AMOUNT_PATTERN = String.raw`(\d+(?:[.,]\d{1,2})?)`;
const EXPENSE_PATTERN = new RegExp(
  String.raw`^\s*(?<description>.+?)\s+${CURRENCY_PATTERN}(?<amount>${AMOUNT_PATTERN})\s*$`,
  'i',
);

export const parseExpenseWithRegex: ExpenseParser = (input: string): ParseExpenseResult => {
  const normalizedInput = input.trim().replace(/\s+/g, ' ');

  if (!normalizedInput) {
    return {
      success: false,
      error: 'Expense text is empty.',
    };
  }

  const match = normalizedInput.match(EXPENSE_PATTERN);
  const description = match?.groups?.description?.trim();
  const rawAmount = match?.groups?.amount;

  if (!description || !rawAmount) {
    return {
      success: false,
      error: 'Could not parse expense. Expected format: "description amount".',
    };
  }

  const amount = Number(rawAmount.replace(',', '.'));

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      error: 'Expense amount must be a positive number.',
    };
  }

  return {
    success: true,
    data: {
      description,
      amount,
    },
  };
};
