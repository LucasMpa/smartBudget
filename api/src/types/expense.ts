export type ExpenseData = {
  category: string;
  amount: number;
};

export type PersistedExpenseData = {
  id: string;
  amount: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
};

export type ParseExpenseRequest = {
  text: string;
};

export type ExpenseParser = (input: string) => ParseExpenseResult;

export type ExpenseRequestValidator = (body: unknown) => ParseExpenseRequest;

export type ExpenseParsingUseCase = (text: string) => ParseExpenseResult;

export type ExpensePersistenceUseCase = (expense: ExpenseData) => Promise<PersistedExpenseData>;

export type ExpenseError = {
  code: string;
  message: string;
  example?: string;
};

export type ParseExpenseResult =
  | {
      success: true;
      data: ExpenseData;
    }
  | {
      success: false;
      error: ExpenseError;
    };
