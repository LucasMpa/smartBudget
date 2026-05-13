import { createApp } from '@/app';
import { getSupabaseClient } from '@/clients/supabaseClient';
import { createExpensePersistenceService } from '@/services/expensePersistenceService';
import { parseExpenseWithRegex } from '@/parsers/regexExpenseParser';
import { createExpenseParsingService } from '@/services/expenseParsingService';
import { env } from '@/utils/env';
import { validateParseExpenseRequest } from '@/validators/expenseValidator';

const expenseParsingService = createExpenseParsingService(parseExpenseWithRegex);
const expensePersistenceService = createExpensePersistenceService(getSupabaseClient);

const app = createApp({
  expenseRouter: {
    expenseParsingService,
    expensePersistenceService,
    requestValidator: validateParseExpenseRequest,
  },
});

app.listen(env.port, () => {
  console.log(`SmartBudget API running on port ${env.port}`);
});
