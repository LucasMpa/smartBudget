import type { ExpenseRequestValidator, ParseExpenseRequest } from '@/types/expense';

export const validateParseExpenseRequest: ExpenseRequestValidator = (
  body: unknown,
): ParseExpenseRequest => {
  if (!body || typeof body !== 'object') {
    throw new Error('Request body must be a JSON object.');
  }

  const payload = body as Record<string, unknown>;

  if (typeof payload.text !== 'string') {
    throw new Error('Field "text" is required and must be a string.');
  }

  return {
    text: payload.text,
  };
};
