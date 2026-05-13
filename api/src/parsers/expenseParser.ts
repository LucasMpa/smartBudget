import { parseExpenseWithRegex } from '@/parsers/regexExpenseParser';
import type { ParseExpenseResult } from '@/types/expense';

export function parseExpenseText(input: string): ParseExpenseResult {
  return parseExpenseWithRegex(input);
}
