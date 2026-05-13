import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';
import type { ExpenseData, ExpensePersistenceUseCase, PersistedExpenseData } from '@/types/expense';

type SupabaseClientProvider = () => SupabaseClient<Database>;

export function createExpensePersistenceService(
  getSupabaseClient: SupabaseClientProvider,
): ExpensePersistenceUseCase {
  return async (expense: ExpenseData): Promise<PersistedExpenseData> => {
    const { data, error } = await getSupabaseClient()
      .from('expenses')
      .insert({
        title: expense.description,
        amount: expense.amount,
      })
      .select('id, title, amount, created_at')
      .single();

    if (error) {
      throw new Error(`Could not save expense: ${error.message}`);
    }

    return {
      id: data.id,
      description: data.title,
      amount: data.amount,
      createdAt: data.created_at,
    };
  };
}
