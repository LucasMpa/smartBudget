import { Router, type Request, type Response } from 'express';

import type { ExpenseParsingUseCase, ExpenseRequestValidator } from '@/types/expense';

export type ExpenseRouterDependencies = {
  expenseParsingService: ExpenseParsingUseCase;
  requestValidator: ExpenseRequestValidator;
};

export function createExpenseRouter({
  expenseParsingService,
  requestValidator,
}: ExpenseRouterDependencies): Router {
  const router = Router();

  router.post('/', (request: Request, response: Response) => {
    try {
      const payload = requestValidator(request.body);
      const result = expenseParsingService(payload.text);

      const statusCode = result.success ? 200 : 422;
      response.status(statusCode).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid request.';

      response.status(400).json({
        success: false,
        error: message,
      });
    }
  });

  return router;
}
