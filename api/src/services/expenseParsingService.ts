import type { ExpenseParser, ExpenseParsingUseCase, ParseExpenseResult } from '@/types/expense';

export function createExpenseParsingService(expenseParser: ExpenseParser): ExpenseParsingUseCase {
  return (text: string): ParseExpenseResult => expenseParser(text);
}
