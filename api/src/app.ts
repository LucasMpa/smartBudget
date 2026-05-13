import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';

import { createExpenseRouter, type ExpenseRouterDependencies } from '@/routes/expenseRoutes';
import { healthRouter } from '@/routes/healthRoutes';

export type AppDependencies = {
  expenseRouter: ExpenseRouterDependencies;
};

export function createApp(dependencies: AppDependencies): Express {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/parse-expense', createExpenseRouter(dependencies.expenseRouter));

  return app;
}
