# WAMbot API Architecture

## Document Purpose

This document defines the API principles and communication architecture for WAMbot.

The API connects:

- WAMbot Frontend
- WAMbot Backend
- WhatsApp / Meta
- AI Providers
- External Integrations
- Webhooks

The API must remain secure, versioned, consistent, and provider-independent.

---

# 1. API Strategy

Initial API style:

REST

Base path:

/api/v1/

Example:

/api/v1/auth
/api/v1/workspaces
/api/v1/contacts
/api/v1/conversations
/api/v1/ai-chatbots
/api/v1/ai-agents
/api/v1/knowledge-bases
/api/v1/automations
/api/v1/campaigns

The frontend must communicate with protected business functionality through the backend API.

---

# 2. API Versioning

All public application APIs should be versioned.

Initial version:

/api/v1/

Future breaking changes may use:

/api/v2/

Do not create a new API version for minor backward-compatible changes.

---

# 3. API Categories

WAMbot APIs are divided into:

1. Public Application APIs
2. Authenticated Workspace APIs
3. Internal Service APIs
4. Incoming Webhooks
5. Outgoing Webhooks
6. External Provider APIs

Each category must have appropriate security controls.

---

# 4. Authentication APIs

Responsibilities:

- Register
- Login
- Logout
- Verify email
- Forgot password
- Reset password
- Retrieve current user

Example routes:

POST /api/v1/auth/register

POST /api/v1/auth/login

POST /api/v1/auth/logout

GET /api/v1/auth/me

POST /api/v1/auth/forgot-password

POST /api/v1/auth/reset-password

Authentication implementation details will be finalized during the authentication module development phase.

---

# 5. Workspace Context

Most authenticated business APIs operate within a workspace.

Example pattern:

/api/v1/workspaces/:workspaceId/contacts

/api/v1/workspaces/:workspaceId/conversations

/api/v1/workspaces/:workspaceId/ai-agents

The workspace ID in the URL identifies the requested workspace.

It does not authorize access.

The backend must independently verify that the authenticated user has permission to access the workspace.

---

# 6. Authorization

Every protected endpoint must verify:

1. User authentication
2. Workspace membership
3. Required permission
4. Resource ownership where applicable

Example:

A user requests:

DELETE /api/v1/workspaces/123/ai-agents/456

The backend must verify:

- User is authenticated
- User belongs to workspace 123
- User has permission to delete AI Agents
- AI Agent 456 belongs to workspace 123

Never authorize access using only a resource ID.

---

# 7. Standard API Response Format

Successful responses should use a consistent structure.

Example:

{
  "success": true,
  "data": {}
}

Responses with additional information may include:

{
  "success": true,
  "data": {},
  "meta": {}
}

Error example:

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the highlighted fields.",
    "details": {}
  }
}

Do not expose internal stack traces to normal users.

---

# 8. HTTP Methods

Use standard HTTP semantics.

GET

Retrieve resources.

POST

Create resources or perform non-idempotent actions.

PUT

Replace a complete resource where appropriate.

PATCH

Update part of a resource.

DELETE

Delete or soft-delete a resource.

Do not use POST for every operation without justification.

---

# 9. HTTP Status Codes

Common status codes:

200
Successful request

201
Resource created

204
Successful request with no response body

400
Invalid request

401
Authentication required

403
Permission denied

404
Resource not found

409
Conflict

422
Validation failure

429
Rate limit exceeded

500
Unexpected server error

Use status codes consistently.

---

# 10. Input Validation

Every external input must be validated.

Validate:

- Request body
- URL parameters
- Query parameters
- Uploaded files
- Webhook payloads
- External API responses where required

Validation should occur before business logic executes.

Never trust frontend validation alone.

---

# 11. Pagination

List endpoints must support pagination when datasets can grow.

Example:

GET /api/v1/workspaces/:workspaceId/contacts?page=1&limit=25

Response metadata may include:

{
  "page": 1,
  "limit": 25,
  "total": 500,
  "totalPages": 20
}

Maximum page sizes should be enforced.

Cursor-based pagination may be introduced later for high-volume resources such as messages.

---

# 12. Filtering and Sorting

List APIs may support controlled filtering.

Example:

GET /contacts?status=active

GET /conversations?status=open

GET /campaigns?status=scheduled

Sorting example:

?sort=created_at&order=desc

Only approved fields should be accepted for filtering and sorting.

Never directly insert user-provided field names into database queries.

---

# 13. Search

Search endpoints should be resource-specific.

Examples:

Search contacts by:

- Name
- Phone
- Email

Search conversations by:

- Contact
- Message content where supported

Search implementation should be optimized as data volume grows.

---

# 14. AI Chatbot APIs

AI Chatbots are the primary user-facing AI feature.

Possible resource structure:

GET /api/v1/workspaces/:workspaceId/ai-chatbots

POST /api/v1/workspaces/:workspaceId/ai-chatbots

GET /api/v1/workspaces/:workspaceId/ai-chatbots/:chatbotId

PATCH /api/v1/workspaces/:workspaceId/ai-chatbots/:chatbotId

DELETE /api/v1/workspaces/:workspaceId/ai-chatbots/:chatbotId

Possible actions:

POST /ai-chatbots/:chatbotId/test

POST /ai-chatbots/:chatbotId/activate

POST /ai-chatbots/:chatbotId/pause

Exact endpoints will be finalized during module implementation.

---

# 15. AI Provider APIs

Responsibilities:

- Create provider connection
- Test connection
- Update configuration
- Disable connection
- Delete connection
- Retrieve available models where supported

Example:

POST /api/v1/workspaces/:workspaceId/ai-providers/openai/test

The frontend sends an API key securely to the backend.

The backend tests the provider connection.

The backend stores the encrypted credential after explicit user confirmation.

Saved complete API keys must never be returned to the frontend.

---

# 16. AI Agent APIs

Responsibilities:

- Create Agent
- Update Agent
- Delete Agent
- Test Agent
- Assign Knowledge
- Assign Tools
- Configure Handover

AI Agent APIs must remain provider-independent.

Provider-specific details should remain inside the AI Provider layer.

---

# 17. Knowledge Base APIs

Responsibilities:

- Create Knowledge Base
- Upload Source
- Add Manual Knowledge
- Add FAQ
- View Processing Status
- Delete Source
- Connect Knowledge Base to AI Agent

File upload requests should use appropriate multipart upload handling.

Large document processing should not block the original HTTP request.

Recommended flow:

Upload Request
→ Validate File
→ Store File
→ Create Processing Job
→ Return Processing Status
→ Process in Background

---

# 18. Conversation APIs

Responsibilities:

- List conversations
- View conversation
- View messages
- Send message
- Assign conversation
- Change status
- Activate human takeover
- Activate or restore AI handling

Message sending must occur through the backend.

The frontend must never directly call Meta APIs.

---

# 19. Contact APIs

Responsibilities:

- Create contact
- View contact
- Update contact
- Delete contact
- Search contacts
- Manage tags
- Manage notes
- Manage custom fields
- Import contacts

Bulk operations must have controlled limits.

Large imports should use background processing.

---

# 20. Campaign APIs

Responsibilities:

- Create Campaign
- Update Draft
- Select Audience
- Select Template
- Validate Campaign
- Schedule Campaign
- Launch Campaign
- Pause where supported
- Cancel where supported
- View Results

Campaign launch should be an explicit action.

Example:

POST /api/v1/workspaces/:workspaceId/campaigns/:campaignId/launch

The backend must validate campaign readiness before launching.

---

# 21. Automation APIs

Responsibilities:

- Create Automation
- Save Draft
- Retrieve Definition
- Validate Definition
- Test Automation
- Publish Version
- Pause Automation
- View Execution History

The frontend Flow Builder edits structured workflow definitions.

The backend validates the workflow before publication.

Published automation versions should remain immutable.

---

# 22. WhatsApp Webhook Architecture

Meta sends events to a public WAMbot webhook endpoint.

Example conceptual route:

/api/v1/webhooks/meta/whatsapp

The webhook layer must:

1. Verify the request where supported
2. Validate the payload
3. Identify the connected WhatsApp account
4. Prevent duplicate event processing
5. Store or queue required work
6. Respond quickly

Heavy processing should not delay webhook acknowledgement.

---

# 23. Webhook Idempotency

External providers may deliver the same event more than once.

WAMbot must safely handle duplicate events.

Use provider event identifiers or message identifiers where available.

Processing the same webhook twice must not create duplicate messages or duplicate business actions.

---

# 24. Webhook Verification

Webhook verification tokens and provider secrets must use environment variables or encrypted credential storage.

Never hardcode webhook secrets.

Incoming webhook requests must be treated as untrusted external input.

---

# 25. Outgoing Webhooks

Workspaces may configure outgoing webhooks.

Example events:

- contact.created
- message.received
- conversation.opened
- conversation.resolved
- campaign.completed

Outgoing webhook delivery should support:

- Signing
- Retry attempts
- Delivery logs
- Failure status

Webhook secrets must be securely stored.

---

# 26. External API Actions

Automations may call approved external APIs.

Configuration may include:

- Method
- URL
- Headers
- Authentication reference
- Request body
- Response mapping
- Timeout

Security controls must prevent unsafe use.

Sensitive authentication values should use secure credential references rather than plain text inside workflow definitions.

---

# 27. OpenAI Communication

The frontend must never call OpenAI directly.

Required flow:

Frontend
→ WAMbot Backend
→ AI Service
→ AI Provider Interface
→ OpenAI Adapter
→ OpenAI API

The OpenAI API key belongs to the workspace's encrypted provider credential.

The AI Agent and Automation modules must not directly contain OpenAI-specific API logic.

---

# 28. Meta API Communication

The frontend must never directly use sensitive Meta access tokens.

Required flow:

Frontend
→ WAMbot Backend
→ WhatsApp Service
→ Meta API

Meta credentials must remain server-side.

---

# 29. Rate Limiting

Rate limits should be applied to sensitive or abuse-prone endpoints.

Examples:

- Login
- Password reset
- AI testing
- Message sending
- File uploads
- Campaign launch
- Public webhooks where appropriate

Rate limits may vary by endpoint.

---

# 30. File Upload Security

File uploads must validate:

- Allowed file type
- MIME type
- File size
- Filename handling

Uploaded files must not be trusted based only on file extension.

Executable uploads must not be publicly executable.

---

# 31. CORS

CORS must allow only approved application origins.

Testing environment:

https://app.gamesoftyping.com

Future production origins will use environment configuration.

Do not use unrestricted CORS in production without a justified requirement.

---

# 32. CSRF and Browser Security

The authentication implementation must consider:

- CSRF protection
- Secure cookies
- SameSite configuration
- HTTPS
- Session protection

The final strategy depends on the selected authentication mechanism.

Security must be designed before authentication implementation.

---

# 33. API Logging

API logs may include:

- Request identifier
- Route
- Method
- Response status
- Processing time
- Error code

Logs must not contain:

- Passwords
- API keys
- Access tokens
- Encryption keys
- Sensitive authorization headers

---

# 34. Request IDs

Each important API request should receive a unique request identifier.

This helps trace:

Frontend Error
→ API Request
→ Application Log
→ External Provider Call

Request IDs are especially useful for debugging webhooks and external integrations.

---

# 35. Timeouts

External API calls must have explicit timeouts.

WAMbot must not wait indefinitely for:

- OpenAI
- Meta
- External APIs
- Webhooks

Timeout failures should be handled predictably.

---

# 36. Retry Strategy

Retries may be appropriate for temporary failures.

Examples:

- Temporary Meta API failure
- Outgoing webhook failure
- Background processing failure

Do not blindly retry:

- Invalid credentials
- Validation failures
- Permanent permission errors

Retry policies should include attempt limits.

---

# 37. API Idempotency

High-impact operations should support duplicate-request protection where appropriate.

Examples:

- Campaign launch
- Message send
- Payment actions
- External business actions

Repeated requests should not unintentionally perform the same critical action multiple times.

---

# 38. API Documentation

Implemented APIs must be documented.

Documentation should include:

- Method
- Route
- Authentication
- Required permission
- Request fields
- Response fields
- Error responses

Documentation must be updated when API behavior changes.

---

# 39. Internal Service Boundaries

Routes should not contain core business logic.

Preferred flow:

Route
→ Controller
→ Service
→ Data Access Layer

External provider communication:

Service
→ Provider Interface
→ Provider Adapter

This structure keeps business logic reusable and testable.

---

# 40. API Evolution Principle

Do not create every possible endpoint before it is needed.

For each module:

1. Review the Product Requirements
2. Review the Database Design
3. Define the module API
4. Review security requirements
5. Implement endpoints
6. Test behavior
7. Update documentation

The API should evolve with the product while maintaining consistent architectural rules.

---

# 41. Final API Principle

The WAMbot API is the controlled boundary between the user interface, business logic, data, and external providers.

The frontend should remain replaceable.

External AI providers should remain replaceable.

Communication channels should remain replaceable.

The API and internal service architecture should protect WAMbot's core business logic from unnecessary dependency on any single frontend, AI provider, or communication platform.