# n8n

n8n is the orchestration layer for SmartBudget.

Responsibilities:

- receive Telegram messages
- call the SmartBudget API
- route successful and failed parsing responses
- later trigger categorization and persistence flows

Business rules should stay in the TypeScript API.

## Local API URL

From inside the Docker network:

```text
http://api:3333
```

Parse endpoint:

```text
POST http://api:3333/parse-expense
```

Payload:

```json
{
  "text": "ifood 38"
}
```

