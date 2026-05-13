export type ExpenseData = {
  description: string;
  amount: number;
};

export type PersistedExpenseData = ExpenseData & {
  id: string;
  createdAt: string;
};

export type ParseExpenseRequest = {
  text: string;
};

export type ExpenseParser = (input: string) => ParseExpenseResult;

export type ExpenseRequestValidator = (body: unknown) => ParseExpenseRequest;

export type ExpenseParsingUseCase = (text: string) => ParseExpenseResult;

export type ExpensePersistenceUseCase = (expense: ExpenseData) => Promise<PersistedExpenseData>;

export type ParseExpenseResult =
  | {
      success: true;
      data: ExpenseData;
    }
  | {
      success: false;
      error: string;
    };
