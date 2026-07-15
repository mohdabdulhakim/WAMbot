# WAMbot Development Roadmap

## Document Purpose

This document defines the official development order for WAMbot.

Development must follow controlled phases.

Do not start a later phase until the required functionality of the current phase has been implemented, tested, and documented.

The goal is to prevent:

- Random feature development
- Conflicting architecture
- Unfinished modules
- Unnecessary rewrites
- AI-generated code inconsistencies

---

# Development Method

Each development phase follows this process:

1. Review relevant project documentation
2. Define exact requirements for the phase
3. Review existing code
4. Design the implementation
5. Implement in small tasks
6. Test each task
7. Fix errors
8. Perform regression testing
9. Update documentation
10. Commit stable code

Claude must not implement an entire large phase in one uncontrolled prompt.

---

# Phase 0 — Project Foundation

## Goal

Create the technical foundation of the WAMbot application.

## Tasks

- Initialize Git repository
- Create project structure
- Initialize Node.js project
- Configure TypeScript
- Configure Express
- Configure React
- Configure Vite
- Configure development scripts
- Configure environment variables
- Create `.env.example`
- Configure `.gitignore`
- Create application logging
- Create centralized error handling
- Create API response standards
- Create basic health-check endpoint
- Configure frontend-to-backend communication

## Completion Criteria

- Application starts successfully
- Frontend loads successfully
- Backend API responds successfully
- Environment configuration works
- No secrets exist in source code
- Basic project structure follows documentation

---

# Phase 1 — Database Foundation

## Goal

Create the database infrastructure required by the application.

## Tasks

- Confirm MySQL or MariaDB version
- Select database access and migration tooling
- Configure database connection
- Create migration system
- Create initial core tables
- Create database indexes
- Create development seed strategy
- Test database connectivity
- Test migrations

## Initial Tables

- users
- workspaces
- workspace_memberships
- roles
- permissions
- role_permissions
- workspace_invitations

## Completion Criteria

- Database connection works
- Migrations can run safely
- Migrations are version controlled
- Core tables exist
- Relationships are tested

---

# Phase 2 — Authentication

## Goal

Allow users to securely access WAMbot.

## Features

- User registration
- Login
- Logout
- Current user session
- Password hashing
- Forgot password
- Reset password
- Email verification

## Security Review

Before implementation, finalize:

- Session strategy
- Cookie strategy
- CSRF protection
- Password requirements
- Login rate limiting

## Completion Criteria

A user can:

- Register
- Verify account
- Login
- Remain securely authenticated
- Logout
- Reset password

---

# Phase 3 — Workspace and Permissions

## Goal

Implement the multi-tenant foundation.

## Features

- Create workspace
- View workspace
- Edit workspace
- Workspace switcher
- Invite team member
- Accept invitation
- Remove team member
- Assign role
- Permission checks

## Initial Roles

- Owner
- Admin
- Manager
- Agent
- Viewer

## Completion Criteria

- Users can belong to multiple workspaces
- Workspace data is isolated
- Unauthorized workspace access is blocked
- Permission checks work correctly

This phase must be fully tested before business modules are developed.

---

# Phase 4 — Core Application UI

## Goal

Build the reusable WAMbot application shell.

## Features

- Login layout
- Application layout
- Sidebar
- Top navigation
- Workspace switcher
- User menu
- Page headers
- Buttons
- Forms
- Modals
- Tables
- Status badges
- Empty states
- Loading states
- Error states
- Confirmation dialogs

## Sidebar

- Dashboard
- Inbox
- Contacts
- Campaigns
- Automations

AI:
- AI Chatbots
- AI Agents
- Knowledge Base

- Analytics
- Integrations
- Settings

## Completion Criteria

- Navigation works
- Layout is responsive
- Reusable UI components exist
- UI follows `06_UI_UX_Guidelines.md`

---

# Phase 5 — WhatsApp Connection

## Goal

Allow a workspace to connect WhatsApp.

## Features

- WhatsApp connection setup
- Meta credential handling
- WhatsApp account storage
- Phone number connection
- Webhook verification
- Webhook receiving
- Connection status
- Connection health information

## Security

- Encrypt sensitive credentials
- Verify incoming webhooks
- Never expose Meta secrets to frontend

## Completion Criteria

A workspace can:

- Connect WhatsApp
- Receive a verified webhook
- See the connected WhatsApp number
- View connection status

---

# Phase 6 — Contacts and CRM Foundation

## Goal

Create the customer data layer.

## Features

- Contact creation
- Contact editing
- Contact search
- Contact deletion
- Phone normalization
- Tags
- Notes
- Custom fields
- CSV import

## Completion Criteria

Users can manage workspace contacts without accessing another workspace's data.

---

# Phase 7 — Shared Inbox

## Goal

Allow teams to manage WhatsApp conversations.

## Features

- Receive incoming messages
- Create conversations
- Store messages
- Conversation list
- Chat interface
- Send replies
- Message statuses
- Unread state
- Conversation assignment
- Conversation status
- Customer information panel
- Internal notes
- Human handling mode

## Initial Update Strategy

Use a hosting-compatible approach.

Initial implementation may use efficient polling.

Do not require WebSockets until production infrastructure supports them reliably.

## Completion Criteria

A real WhatsApp user can:

- Send a message
- Appear in WAMbot Inbox
- Receive a manual reply from a WAMbot user

This is a major MVP milestone.

---

# Phase 8 — AI Provider Connection

## Goal

Allow customers to connect their own OpenAI account.

## Features

- AI Providers page
- Add OpenAI API key
- Test connection
- Encrypt API key
- Save provider connection
- Mask saved credential
- Select default model
- Enable or disable connection

## Completion Criteria

A workspace can securely connect OpenAI using its own API key.

No complete saved API key is exposed to the frontend.

---

# Phase 9 — AI Agent Engine

## Goal

Allow users to create reusable AI Agents.

## Features

- Create AI Agent
- Agent name
- Role
- Instructions
- Personality
- Restrictions
- Provider selection
- Model selection
- Handover rules
- Enable or disable Agent
- Test Agent

## Completion Criteria

A user can create an AI Agent and test a response using the connected OpenAI account.

---

# Phase 10 — Knowledge Base

## Goal

Allow AI Agents to use business-specific information.

## Initial Knowledge Types

- Manual text
- FAQ
- TXT
- PDF
- CSV
- Excel

## Processing

Upload
→ Validate
→ Store
→ Extract
→ Clean
→ Chunk
→ Index
→ Make Searchable

The exact retrieval and embedding implementation must be reviewed before coding this phase.

Do not assume the current MySQL database is the permanent vector-search solution.

## Completion Criteria

An AI Agent can answer a test question using connected business knowledge.

---

# Phase 11 — AI Chatbots

## Goal

Create the simple user-facing AI experience.

AI Chatbots are the primary AI feature for low-technical users.

## Features

- AI Chatbots page
- Create AI Chatbot
- Select purpose
- Select or create AI Agent
- Connect knowledge
- Configure instructions
- Configure handover
- Test Chatbot
- Connect to WhatsApp
- Activate
- Pause

## Initial Templates

- Customer Support
- Sales Assistant
- FAQ Assistant
- Product Recommendation
- Lead Qualification
- Order Support
- Custom

## Completion Criteria

A user can:

- Create an AI Chatbot
- Test it
- Connect it to WhatsApp
- Activate it
- Receive an AI-generated response through WhatsApp
- Take over the conversation manually

This is the primary AI MVP milestone.

---

# Phase 12 — Rules Engine

## Goal

Add predictable business logic.

## Features

- Create rule
- IF conditions
- AND/OR logic
- THEN actions
- Priority
- Enable or disable rule

## Example

IF:

Customer intent = Refund

THEN:

Ask for Order ID

## Completion Criteria

Deterministic rules can control configured conversation behavior without depending entirely on AI.

---

# Phase 13 — Automation Engine

## Goal

Create backend workflow execution.

## Features

- Automation definitions
- Triggers
- Conditions
- Actions
- Delays
- Branches
- AI actions
- Execution tracking
- Error handling
- Draft and published states
- Versioning

## Completion Criteria

A basic automation can execute reliably from trigger to completion.

---

# Phase 14 — Visual Flow Builder

## Goal

Allow non-technical users to visually create automations.

## Layout

Left:
Available Nodes

Center:
Flow Canvas

Right:
Node Configuration

## Initial Nodes

- Incoming Message
- If / Else
- Send Message
- Ask AI
- Add Tag
- Assign Conversation
- Wait
- Human Handover

## Completion Criteria

A user can visually build, test, publish, and run a basic automation.

---

# Phase 15 — WhatsApp Templates

## Goal

Synchronize and use approved WhatsApp templates.

## Features

- Sync templates
- View templates
- View language
- View category
- View approval status
- Use template in campaigns

## Completion Criteria

Approved templates from the connected WhatsApp account are available inside WAMbot.

---

# Phase 16 — Audiences

## Goal

Allow users to select campaign recipients.

## MVP Features

- Static audiences
- Tag filters
- Custom field filters

## Completion Criteria

Users can create and reuse an audience for a campaign.

---

# Phase 17 — Campaigns

## Goal

Allow users to send WhatsApp broadcast campaigns.

## Features

- Create campaign
- Select WhatsApp number
- Select audience
- Select template
- Configure variables
- Review
- Send now
- Schedule
- Recipient processing
- Delivery tracking
- Read tracking
- Failure tracking

## Completion Criteria

A user can safely send a template campaign and view recipient-level delivery results.

---

# Phase 18 — Basic Analytics

## Goal

Provide useful product performance visibility.

## Initial Metrics

- Messages sent
- Messages received
- Open conversations
- Active AI Chatbots
- Campaign performance
- AI usage
- Automation executions

## Completion Criteria

Dashboard metrics are based on real application data.

---

# Phase 19 — Plans and Entitlements

## Goal

Control access based on subscription plan.

## Features

- Plans
- Entitlements
- Feature limits
- Workspace subscription status
- Centralized access checks

## Important

Payment processing is not required before the entitlement system exists.

Business modules must not hardcode plan names.

## Completion Criteria

Features and limits can be controlled centrally by plan configuration.

---

# Phase 20 — Platform Administration

## Goal

Allow WAMbot administrators to operate the SaaS platform.

## Features

- Admin authentication and authorization
- User management
- Workspace management
- Plan management
- Account suspension
- System error visibility
- Background job visibility

Platform administration permissions must remain separate from workspace permissions.

---

# Phase 21 — Security Review

## Goal

Review the complete MVP before production use.

## Review Areas

- Authentication
- Authorization
- Workspace isolation
- API validation
- Credential encryption
- File uploads
- Webhooks
- Rate limiting
- Logging
- Error exposure
- CORS
- CSRF
- Dependency security
- Secret management

Critical security issues must be resolved before production launch.

---

# Phase 22 — Performance and Reliability Testing

## Test Areas

- API performance
- Database queries
- Message processing
- Webhook processing
- Background jobs
- Campaign sending
- AI provider failures
- Retry behavior
- Large contact datasets

Optimize based on measured problems rather than assumptions.

---

# Phase 23 — Production Preparation

## Tasks

- Select production domain
- Select production hosting infrastructure
- Configure production environment
- Configure SSL
- Configure database backups
- Configure file backups
- Configure logging
- Configure monitoring
- Configure production email
- Run database migrations
- Perform final regression testing

The testing environment must not be treated as the final production environment without review.

---

# Phase 24 — Production Launch

## Launch Checklist

- Production domain active
- HTTPS working
- Database backups working
- Secrets configured securely
- Error logging working
- WhatsApp webhooks verified
- OpenAI BYOK flow tested
- AI Chatbot tested
- Manual Inbox tested
- Campaign safety tested
- Workspace isolation tested
- Admin access tested

Launch only after the checklist passes.

---

# MVP Milestones

## Milestone 1 — Platform Foundation

Completed after:

- Authentication
- Workspace
- Permissions
- Core UI

## Milestone 2 — WhatsApp Communication

Completed after:

- WhatsApp connection
- Contacts
- Shared Inbox
- Manual messaging

## Milestone 3 — AI Chatbot

Completed after:

- OpenAI connection
- AI Agents
- Knowledge Base
- AI Chatbots
- WhatsApp AI responses
- Human takeover

## Milestone 4 — Automation

Completed after:

- Rules
- Automation Engine
- Visual Flow Builder

## Milestone 5 — Marketing

Completed after:

- WhatsApp Templates
- Audiences
- Campaigns
- Basic Analytics

## Milestone 6 — SaaS Readiness

Completed after:

- Plans and Entitlements
- Platform Administration
- Security Review
- Reliability Testing
- Production Preparation

---

# Development Control Rule

Only one development phase should be the primary active phase at a time.

If a later phase requires a change to an earlier module:

1. Review the impact
2. Update relevant documentation
3. Implement the required change
4. Test affected functionality
5. Continue the active phase

Do not allow temporary shortcuts to become permanent architecture.

---

# Final Roadmap Principle

Build WAMbot vertically and incrementally.

The first major goal is not to build every feature.

The first major goal is to create a reliable path:

User
→ Workspace
→ Connect WhatsApp
→ Receive Message
→ Reply Manually
→ Connect OpenAI
→ Create AI Chatbot
→ Receive AI Response
→ Human Takeover

Once this path works reliably, automation, campaigns, analytics, billing, and advanced features can be added on top of a stable foundation.