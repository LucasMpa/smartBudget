import { createApp } from '@/app';
import { parseExpenseWithRegex } from '@/parsers/regexExpenseParser';
import { createExpenseParsingService } from '@/services/expenseParsingService';
import { env } from '@/utils/env';
import { validateParseExpenseRequest } from '@/validators/expenseValidator';

const expenseParsingService = createExpenseParsingService(parseExpenseWithRegex);

const app = createApp({
  expenseRouter: {
    expenseParsingService,
    requestValidator: validateParseExpenseRequest,
  },
});

app.listen(env.port, () => {
  console.log(`SmartBudget API running on port ${env.port}`);
});
