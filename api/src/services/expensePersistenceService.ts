import type { SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';
import type { ExpenseData, ExpensePersistenceUseCase, PersistedExpenseData } from '@/types/expense';
import { createSlug } from '@/utils/slug';

type SupabaseClientProvider = () => SupabaseClient<Database>;

export function createExpensePersistenceService(
  getSupabaseClient: SupabaseClientProvider,
): ExpensePersistenceUseCase {
  return async (expense: ExpenseData): Promise<PersistedExpenseData> => {
    const supabaseClient = getSupabaseClient();
    const categorySlug = createSlug(expense.category);

    if (!categorySlug) {
      throw new Error('Could not save expense: category must contain letters or numbers.');
    }

    const { data: category, error: categoryError } = await supabaseClient
      .from('categories')
      .upsert(
        {
          name: expense.category,
          slug: categorySlug,
        },
        {
          onConflict: 'slug',
        },
      )
      .select('id, name, slug')
      .single();

    if (categoryError) {
      throw new Error(`Could not save category: ${categoryError.message}`);
    }

    const { data, error } = await supabaseClient
      .from('expenses')
      .insert({
        title: expense.category,
        amount: expense.amount,
        category: category.id,
      })
      .select('id, amount, created_at')
      .single();

    if (error) {
      throw new Error(`Could not save expense: ${error.message}`);
    }

    return {
      id: data.id,
      amount: data.amount,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
      createdAt: data.created_at,
    };
  };
}
