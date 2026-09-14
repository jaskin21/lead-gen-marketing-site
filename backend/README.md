# Backend

Express + TypeScript API handling lead submission, validation, and a simulated CRM hand-off.

## Setup

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

Runs on `http://localhost:4000`. Confirm with:
\`\`\`bash
curl http://localhost:4000/health
\`\`\`

### Environment Variables

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `PORT`                 | Server port (default 4000)                                              |
| `ALLOWED_ORIGIN`       | CORS — must match the frontend's URL exactly                            |
| `CRM_API_KEY`          | Placeholder key read by the simulated CRM service                       |
| `SIMULATE_CRM_FAILURE` | Set to `true` to force the CRM call to fail, for testing the error path |

## Folder Structure

\`\`\`
src/
├── routes/
│ └── lead.route.ts # POST /api/lead
├── controllers/
│ └── lead.controller.ts # validates, calls CRM service, shapes response
├── services/
│ └── crm.service.ts # simulated CRM call
├── validation/
│ └── lead.schema.ts # zod schema — single source of truth
├── middleware/
│ ├── rateLimiter.ts # duplicate-submission guard (in-memory)
│ └── errorHandler.ts # catch-all error handler, last in the chain
├── app.ts # express app + middleware wiring
└── server.ts # entry point
\`\`\`

## API Documentation

### `POST /api/lead`

**Request body**
\`\`\`json
{
"name": "Jane Doe",
"email": "jane@example.com",
"company": "Acme Inc",
"phone": "+1 555-123-4567",
"message": "Interested in your digital marketing service."
}
\`\`\`

**Responses**

| Status | Meaning                                 | Body                                                                           |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| 200    | Success                                 | `{ "success": true, "leadId": "sim_..." }`                                     |
| 400    | Validation failed                       | `{ "success": false, "errors": { "email": ["Enter a valid email address"] } }` |
| 429    | Duplicate submission (same email, <10s) | `{ "success": false, "error": "..." }`                                         |
| 502    | Simulated CRM failure                   | `{ "success": false, "error": "..." }`                                         |

### `GET /health`

Returns `{ "status": "ok" }`.

## Validation

`lead.schema.ts` defines the rules for name, email, company, phone, and message. The controller uses `safeParse` (no try/catch needed for validation itself) and returns field-level errors via `.flatten().fieldErrors`, so the frontend can map each message directly onto its corresponding input.

## CRM Integration

`crm.service.ts`:

- Shapes the lead into the structure a real CRM would expect (e.g. HubSpot's `properties` object for a contact record).
- Reads `CRM_API_KEY` from `process.env` — never exposed to the frontend, never committed to source.
- Contains the real `fetch()` call to HubSpot's API as a commented-out reference, showing exactly what would be enabled with real credentials.
- Wrapped in try/catch inside the controller; any thrown error becomes a `502` with a generic, user-safe message — no internal error details are ever leaked in the response.
- `SIMULATE_CRM_FAILURE=true` forces the failure branch on demand, useful for demoing error handling without waiting for a real outage.

## Middleware

- **`rateLimiter.ts`** — tracks the last submission time per email in an in-memory `Map`; rejects a repeat within 10 seconds with `429`. Known limitation: resets on restart, doesn't share state across multiple server instances (see root README's Assumptions section).
- **`errorHandler.ts`** — registered last in `app.ts`; catches anything unhandled and returns a generic `500` instead of leaking a stack trace.
- **CORS** — locked to `ALLOWED_ORIGIN`, so only the deployed (or local) frontend can call the API.

## Local Testing Reference

\`\`\`bash

# valid submission

curl -X POST http://localhost:4000/api/lead \
 -H "Content-Type: application/json" \
 -d '{"name":"Jane Doe","email":"jane@example.com","company":"Acme Inc","phone":"+15551234567","message":"Interested in your service."}'

# invalid submission

curl -X POST http://localhost:4000/api/lead \
 -H "Content-Type: application/json" \
 -d '{"name":"J","email":"not-an-email","company":"","phone":"abc","message":"hi"}'
\`\`\`
