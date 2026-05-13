import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';
import { env } from '@/utils/env';

let supabaseClient: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!env.supabaseUrl) {
    throw new Error('SUPABASE_URL is required to create the Supabase client.');
  }

  if (!env.supabaseServiceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required to create the Supabase client.');
  }

  supabaseClient ??= createClient<Database>(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseClient;
}
