# WAMbot System Architecture

## Document Purpose

This document defines the technical architecture and technology decisions for WAMbot.

The initial architecture is designed to:

- Run on the current cPanel Linux hosting environment
- Support rapid MVP development
- Remain modular
- Allow future migration to cloud or VPS infrastructure
- Avoid unnecessary infrastructure complexity during the testing phase

---

# 1. Current Environments

## Marketing Website

URL:

wa.gamesoftyping.com

Technology:

WordPress

Purpose:

- Marketing pages
- Features
- Pricing
- Blog
- Documentation
- Legal pages
- Signup and login entry points

---

## SaaS Application

URL:

app.gamesoftyping.com

Current Runtime:

Node.js 22.22.3

Current Hosting:

Linux cPanel Hosting

Current Application Mode:

Development

Production mode will be enabled when the application is ready for production deployment.

---

# 2. Architecture Strategy

WAMbot will initially use a Modular Monolith architecture.

This means:

- One main backend application
- One primary database
- Multiple independent internal modules
- Clear boundaries between modules

Example:

WAMbot Application

├── Authentication Module
├── Workspace Module
├── User Module
├── Contact Module
├── Conversation Module
├── WhatsApp Module
├── AI Provider Module
├── AI Agent Module
├── Knowledge Module
├── Automation Module
├── Campaign Module
├── Analytics Module
├── Billing Module
└── Admin Module

A modular monolith is preferred for the MVP because it is easier to:

- Develop
- Test
- Deploy
- Debug
- Maintain

The architecture must allow individual modules to be separated into independent services later if scale requires it.

Microservices must not be introduced prematurely.

---

# 3. Frontend Technology

Primary frontend framework:

React

Language:

TypeScript

Build Tool:

Vite

Frontend responsibilities:

- User interface
- Dashboard
- Shared inbox
- CRM
- AI Agent Builder
- Knowledge Base
- Automation Flow Builder
- Campaign management
- Analytics
- Settings

The frontend must never directly communicate with:

- OpenAI
- Meta WhatsApp APIs
- Database
- External services requiring secret credentials

All protected communication must go through the WAMbot backend API.

---

# 4. Backend Technology

Runtime:

Node.js 22

Language:

TypeScript

Initial Backend Framework:

Express.js

Architecture:

Modular service-based structure

Backend responsibilities:

- Authentication
- Authorization
- API endpoints
- Business logic
- Database access
- WhatsApp webhooks
- AI provider communication
- Automation execution
- Campaign processing
- Background jobs
- External integrations

The backend must be organized by business modules rather than placing all logic inside routes or controllers.

---

# 5. Application Entry Point

The cPanel Node.js application uses:

app.js

as the server startup file.

The production application may be written in TypeScript and compiled before deployment.

The startup file is responsible for loading the compiled application.

Example deployment structure:

wambot-app/

├── app.js
├── package.json
├── dist/
├── public/
└── environment configuration

The exact structure may evolve during implementation.

---

# 6. Database

Initial Database:

MySQL or hosting-compatible MariaDB

Database access must use an application data layer.

The application must not scatter raw database queries throughout the codebase.

Database design requirements:

- Multi-tenant
- Workspace isolation
- Indexed
- Migration-controlled
- Relational integrity
- Soft deletion where appropriate
- Audit-friendly

The database implementation should remain sufficiently abstracted to allow future migration if required.

---

# 7. Multi-Tenant Architecture

WAMbot is a multi-tenant SaaS application.

Primary tenant:

Workspace

Business-owned records must include workspace ownership.

Example:

User
→ Workspace Membership
→ Workspace
→ Contacts
→ Conversations
→ AI Agents
→ Automations
→ Campaigns

The backend must determine and validate workspace access.

The frontend must never be trusted to authorize workspace access.

Every workspace-scoped request must be validated by the backend.

---

# 8. API Architecture

Initial API style:

REST

Base pattern:

/api/v1/

Example:

/api/v1/auth
/api/v1/workspaces
/api/v1/contacts
/api/v1/conversations
/api/v1/ai-agents
/api/v1/knowledge
/api/v1/automations
/api/v1/campaigns

API versioning must be supported from the beginning.

The API must use:

- Input validation
- Authentication
- Authorization
- Consistent response formats
- Proper HTTP status codes
- Centralized error handling

---

# 9. Authentication Architecture

Authentication will be handled by the WAMbot backend.

The architecture must support:

- Registration
- Login
- Logout
- Email verification
- Password reset
- Secure password hashing
- Session or token management
- Workspace membership
- Roles
- Permissions

Authentication implementation must prioritize secure browser-based usage.

Sensitive authentication credentials must never be stored in frontend source code.

---

# 10. WhatsApp Integration Architecture

Initial WhatsApp integration:

Meta WhatsApp Business Platform / Cloud API

Communication flow:

WhatsApp User
→ Meta
→ WAMbot Webhook
→ WAMbot Backend
→ Conversation Processing
→ Automation or AI Processing
→ WAMbot Backend
→ Meta API
→ WhatsApp User

WhatsApp-specific code must remain inside the WhatsApp integration module.

Other modules should use standardized internal interfaces.

This allows future communication channels to be added without rewriting the core application.

---

# 11. AI Provider Architecture

WAMbot uses Bring Your Own Key.

Initial provider:

OpenAI

Architecture:

WAMbot Module
→ AI Service
→ AI Provider Interface
→ OpenAI Provider Adapter
→ OpenAI API

Future providers will implement the same internal provider interface.

Examples:

OpenAI Provider Adapter
Anthropic Provider Adapter
Gemini Provider Adapter
OpenRouter Provider Adapter

Application modules must never directly depend on OpenAI-specific implementation.

---

# 12. AI Credential Security

Customer AI API keys are sensitive secrets.

Requirements:

- Encrypt API keys before database storage
- Never return complete saved API keys to the frontend
- Never write API keys to logs
- Never include API keys in URLs
- Never expose API keys in client-side JavaScript
- Decrypt credentials only when required by the backend

Encryption keys must be stored in server environment variables.

---

# 13. Knowledge Architecture

Knowledge processing flow:

User Upload
→ File Validation
→ Secure Storage
→ Text Extraction
→ Content Cleaning
→ Chunking
→ Embedding Generation
→ Searchable Knowledge Storage
→ AI Agent Retrieval

Original files and processed knowledge must be treated as separate resources.

The Knowledge Engine must remain independent from a specific AI provider where practical.

---

# 14. Automation Architecture

Automation definitions are stored as structured data.

Example concepts:

- Trigger
- Condition
- Action
- Delay
- Branch
- AI Action

The visual Flow Builder edits the automation definition.

The backend Automation Engine executes the automation.

The frontend must never be responsible for reliable workflow execution.

---

# 15. Background Processing

The current hosting environment does not provide confirmed Redis infrastructure.

Therefore, Redis must not be a mandatory dependency for the initial MVP.

Initial background processing may use:

- Database-backed job records
- Cron Jobs
- Controlled worker processes where supported

Background tasks include:

- Campaign processing
- Scheduled messages
- Document processing
- Retry operations
- Automation scheduling
- Analytics aggregation

The background job interface must be abstracted so Redis-based queues can be introduced later without redesigning business modules.

Future infrastructure may use:

- Redis
- Dedicated queue workers
- Managed job queues

---

# 16. Real-Time Communication

Real-time features must be implemented progressively.

Initial MVP may use:

- API polling
- Efficient refresh mechanisms

Future infrastructure may use:

- WebSockets
- Server-Sent Events
- Dedicated real-time services

The application must not depend on persistent WebSocket support until the production hosting environment has been verified to support it reliably.

---

# 17. File Storage

Initial development storage may use server filesystem storage.

Files may include:

- Knowledge documents
- Media
- Temporary uploads

The application must use a storage abstraction layer.

Future storage may use:

- Amazon S3
- Cloudflare R2
- Other S3-compatible object storage

Business logic must not depend directly on local filesystem paths.

---

# 18. Environment Configuration

Environment-specific values must use environment variables.

Examples:

APP_URL
API_URL
DATABASE_HOST
DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
ENCRYPTION_KEY
SESSION_SECRET
META_APP_SECRET

Secrets must never be committed to Git.

A safe example environment file may be maintained as:

.env.example

The real environment file must be excluded from version control.

---

# 19. WordPress and SaaS Separation

WordPress and the WAMbot SaaS application are separate systems.

WordPress:

wa.gamesoftyping.com

WAMbot Application:

app.gamesoftyping.com

WordPress must not contain WAMbot core business logic.

WordPress may link users to:

- Signup
- Login
- Application dashboard

Future production example:

wambot-domain.com
→ Marketing Website

app.wambot-domain.com
→ SaaS Application

Changing domains must not require rewriting application business logic.

---

# 20. Development and Deployment Environments

The architecture should support separate environments.

Development:

Local development computer

Testing/Staging:

app.gamesoftyping.com

Production:

Future WAMbot production domain

Environment-specific values must not be hardcoded.

---

# 21. Source Code Management

Git must be used for version control.

The codebase should eventually be stored in a private remote repository.

Rules:

- Do not commit secrets
- Use meaningful commits
- Keep production code stable
- Track database migrations
- Document major architecture changes

---

# 22. Logging

The application requires structured logging.

Logs may include:

- Application errors
- API failures
- Webhook processing
- Background job failures
- Integration errors
- Security events

Logs must never contain:

- Passwords
- Complete API keys
- Access tokens
- Encryption keys
- Sensitive customer content unless explicitly required and securely handled

---

# 23. Scalability Strategy

WAMbot will scale progressively.

Stage 1:

cPanel Node.js Hosting
+
MySQL/MariaDB
+
Database-backed background processing

Stage 2:

VPS or Cloud Application Server
+
Managed Database
+
Object Storage
+
Redis

Stage 3:

Multiple Application Instances
+
Dedicated Workers
+
Load Balancing
+
Managed Queues
+
Dedicated Real-Time Infrastructure

The MVP must not require Stage 3 infrastructure.

However, the code architecture must avoid unnecessary barriers to future migration.

---

# 24. Initial Technology Stack

Frontend:

- React
- TypeScript
- Vite

Backend:

- Node.js 22
- TypeScript
- Express.js

Database:

- MySQL or MariaDB

API:

- REST
- Versioned API

Marketing Website:

- WordPress

Initial Hosting:

- Linux cPanel Hosting

AI:

- Provider abstraction layer
- OpenAI as first provider
- Customer-provided API key

WhatsApp:

- Official Meta WhatsApp Business Platform APIs

Background Processing:

- Database-backed jobs
- Cron Jobs where required

File Storage:

- Storage abstraction
- Local server storage initially
- Cloud object storage later

---

# 25. Final Architecture Principle

The initial WAMbot architecture should be simple enough to build and operate today while remaining structured enough to evolve tomorrow.

Do not introduce infrastructure complexity without a real requirement.

Do not sacrifice modularity for short-term speed.

Build the MVP as a modular application with clear boundaries between:

- User Interface
- API
- Business Logic
- Data Access
- External Providers
- Background Processing

Infrastructure may change.

Business modules should remain reusable.