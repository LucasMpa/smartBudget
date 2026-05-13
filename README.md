# SmartBudget

SmartBudget is a conversational finance assistant foundation for Telegram, n8n, Node.js, and TypeScript.

The intended architecture keeps orchestration and business rules separated:

```text
Telegram
  -> n8n
  -> Node.js + TypeScript API
  -> Supabase (future)
```

n8n should orchestrate messages and integrations. Parsing, validation, categorization, persistence, and future AI fallbacks live in TypeScript.

## Project Structure

```text
.
├── api
│   ├── src
│   │   ├── parsers
│   │   ├── routes
│   │   ├── services
│   │   ├── types
│   │   ├── utils
│   │   └── validators
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── n8n
│   ├── workflows
│   └── README.md
└── docker-compose.yml
```

## Running

```bash
docker compose up
```

Services:

- API: `http://localhost:3333`
- n8n: `http://localhost:5678`

## API

### Health Check

```bash
curl http://localhost:3333/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "smartbudget-api"
}
```

### Parse Expense

```bash
curl -X POST http://localhost:3333/parse-expense \
  -H "Content-Type: application/json" \
  -d '{"text":"ifood 38"}'
```

Expected response:

```json
{
  "success": true,
  "data": {
    "description": "ifood",
    "amount": 38
  }
}
```

Other supported payloads:

```json
{ "text": "uber 24" }
```

```json
{ "text": "ifood R$ 38" }
```

```json
{ "text": "mercado 120,50" }
```

## n8n Flow

An example workflow is available at:

```text
n8n/workflows/telegram-parse-expense-example.json
```

It shows the expected flow:

```text
Telegram Trigger
  -> HTTP Request to http://api:3333/parse-expense
  -> Respond/continue workflow
```

Inside Docker, n8n should call the API using:

```text
http://api:3333/parse-expense
```

From your host machine, use:

```text
http://localhost:3333/parse-expense
```

## Future Integrations

The API is prepared for:

- Telegram Bot payload normalization
- deterministic expense parsing
- OpenAI fallback when deterministic parsing fails
- expense categorization
- Supabase persistence
- event-oriented workflows triggered by n8n

Suggested future service boundaries:

- `ExpenseParsingService`
- `ExpenseCategorizationService`
- `ExpensePersistenceService`
- `OpenAiFallbackService`
- `TelegramMessageNormalizer`

