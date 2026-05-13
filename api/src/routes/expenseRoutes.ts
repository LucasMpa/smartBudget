import { Router, type Request, type Response } from 'express';

import type {
  ExpenseParsingUseCase,
  ExpensePersistenceUseCase,
  ExpenseRequestValidator,
} from '@/types/expense';

export type ExpenseRouterDependencies = {
  expenseParsingService: ExpenseParsingUseCase;
  expensePersistenceService: ExpensePersistenceUseCase;
  requestValidator: ExpenseRequestValidator;
};

export function createExpenseRouter({
  expenseParsingService,
  expensePersistenceService,
  requestValidator,
}: ExpenseRouterDependencies): Router {
  const router = Router();

  router.post('/', async (request: Request, response: Response) => {
    let payload;

    try {
      payload = requestValidator(request.body);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid request.';

      response.status(400).json({
        success: false,
        error: message,
      });
      return;
    }

    const result = expenseParsingService(payload.text);

    if (!result.success) {
      response.status(422).json(result);
      return;
    }

    try {
      const persistedExpense = await expensePersistenceService(result.data);

      response.status(201).json({
        success: true,
        data: persistedExpense,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not save expense.';

      response.status(500).json({
        success: false,
        error: message,
      });
    }
  });

  return router;
}
