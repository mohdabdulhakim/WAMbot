# WAMbot System Blueprint

## Document Purpose

This document defines the high-level system structure of WAMbot.

WAMbot is initially a WhatsApp automation and AI agent platform. The architecture must remain modular so additional communication channels, AI providers, integrations, and automation capabilities can be added later.

---

# 1. Platform Structure

WAMbot consists of the following major layers:

1. Marketing Website
2. SaaS Application
3. Backend Services
4. Database and Storage
5. External Providers and Integrations

---

# 2. Marketing Website

Current URL:

wa.gamesoftyping.com

Technology:

WordPress

Purpose:

- Homepage
- Features
- Pricing
- Product information
- Blog
- Documentation
- Signup entry point
- Login entry point
- Legal pages

The WordPress website must remain separate from the core SaaS application.

WordPress must not process:

- WhatsApp messages
- AI requests
- Automation workflows
- Background jobs
- Real-time conversations

---

# 3. SaaS Application

Current Testing URL:

app.gamesoftyping.com

The SaaS application is the main WAMbot product.

Primary application areas:

- Dashboard
- Inbox
- Contacts
- Campaigns
- Automations
- AI Agents
- Knowledge Base
- Integrations
- Analytics
- Team
- Billing
- Settings

---

# 4. Workspace Engine

The Workspace Engine provides multi-tenant business isolation.

Structure:

User
→ Workspace
→ Workspace Resources

Workspace resources include:

- Team Members
- Communication Channels
- Contacts
- Conversations
- Messages
- Campaigns
- Automations
- AI Providers
- AI Agents
- Knowledge Bases
- Integrations

Every business-owned record must belong to a workspace.

A user may belong to multiple workspaces.

---

# 5. Authentication and Access Engine

Responsibilities:

- User registration
- Login
- Logout
- Password reset
- Email verification
- Session management
- Workspace membership
- Roles
- Permissions

Initial roles:

- Owner
- Admin
- Manager
- Agent
- Viewer

Permissions must be capability-based rather than relying only on role names.

---

# 6. Communication Channel Engine

The Communication Channel Engine connects WAMbot to external messaging platforms.

Initial supported channel:

- WhatsApp

Future channels may include:

- Instagram
- Facebook Messenger
- Telegram
- Website Chat
- Email
- SMS
- Voice

The core application must not be tightly coupled to WhatsApp.

Each communication channel should use a standardized internal interface.

---

# 7. WhatsApp Engine

The WhatsApp Engine is the first implementation of the Communication Channel Engine.

Responsibilities:

- Connect WhatsApp Business accounts
- Manage phone numbers
- Receive webhook events
- Receive messages
- Send messages
- Send approved templates
- Process message status updates
- Handle media
- Synchronize templates

The WhatsApp Engine communicates with Meta's official WhatsApp Business Platform APIs.

---

# 8. Conversation Engine

Responsibilities:

- Create conversations
- Store messages
- Maintain conversation status
- Assign conversations
- Manage unread state
- Manage AI and human control
- Maintain conversation history

Conversation operating modes may include:

- Automation Active
- AI Agent Active
- Human Agent Active

Human takeover must be able to stop automated AI responses when required.

---

# 9. Contact and CRM Engine

Responsibilities:

- Contact profiles
- Phone numbers
- Email addresses
- Tags
- Custom fields
- Notes
- Contact source
- Conversation history
- Campaign history
- Automation history

Contacts may be created through:

- Incoming messages
- Manual creation
- CSV import
- API
- Integrations

---

# 10. AI Provider Engine

WAMbot uses a Bring Your Own Key model.

Users provide their own AI provider API credentials.

Initial provider:

- OpenAI

Future providers may include:

- Anthropic
- Google
- OpenRouter
- Azure OpenAI
- Mistral
- Other compatible providers

The AI Provider Engine must provide a standardized interface between WAMbot and external AI providers.

Core application modules must never call a provider directly.

Required architecture:

Application Module
→ AI Engine
→ AI Provider Engine
→ Selected Provider

Provider credentials must be encrypted before storage.

API keys must never be exposed to the frontend after they are saved.

---

# 11. AI Agent Engine

Users can create multiple AI agents.

Examples:

- Sales Agent
- Customer Support Agent
- Product Advisor
- Order Support Agent

Each AI Agent may contain:

- Name
- Description
- Role
- Instructions
- Personality
- Restrictions
- Selected AI Provider
- Selected Model
- Knowledge Sources
- Business Rules
- Available Tools
- Human Handover Rules

AI agents must be configurable without coding.

---

# 12. Knowledge Engine

The Knowledge Engine provides business-specific information to AI Agents.

Supported knowledge sources may include:

- PDF
- DOCX
- TXT
- CSV
- Excel
- Website content
- Manual text
- FAQs

Processing flow:

Upload
→ Validate
→ Store Original File
→ Extract Content
→ Clean Content
→ Split into Chunks
→ Create Embeddings
→ Store Searchable Knowledge
→ Connect to AI Agent

Knowledge sources must be reusable across multiple AI agents where permitted.

---

# 13. Rule Engine

The Rule Engine handles deterministic business instructions.

Example:

IF
Customer intent equals Refund

THEN
Ask for Order ID

Rules should be used when predictable behavior is required.

AI should not replace deterministic business logic.

---

# 14. Automation Engine

The Automation Engine executes workflows.

Core workflow components:

Triggers
Conditions
Actions
Delays
Branches
AI Actions
Integration Actions

Example:

Incoming Message
→ Detect Intent
→ Check Condition
→ Search Knowledge
→ Generate AI Response
→ Send Message

Automations must support:

- Draft state
- Published state
- Versioning
- Execution logs
- Error logs
- Testing

---

# 15. Visual Flow Builder

The Visual Flow Builder is the user interface for creating automations.

Users should be able to:

- Add nodes
- Connect nodes
- Configure nodes
- Test flows
- Publish flows
- View execution history

The visual editor is only the configuration interface.

Actual workflow execution must happen in the backend Automation Engine.

---

# 16. Action and Tool Engine

The Action Engine allows AI Agents and Automations to perform approved actions.

Examples:

- Search order
- Check order status
- Update contact
- Add tag
- Create ticket
- Call external API
- Send webhook
- Transfer to human

AI must only be able to use tools explicitly assigned to the AI Agent.

Critical actions may require additional validation or approval.

---

# 17. Campaign Engine

Responsibilities:

- Create broadcasts
- Select audiences
- Use approved message templates
- Personalize variables
- Schedule campaigns
- Queue messages
- Track delivery
- Track reads
- Track replies
- Track failures

Large campaigns must use background processing.

---

# 18. Audience and Segmentation Engine

Users can create audiences using contact data.

Example:

Tag = VIP
AND
Last Purchase < 30 Days

Segments may be:

- Static
- Dynamic

Dynamic segments should update based on current contact data.

---

# 19. Integration Engine

The Integration Engine connects WAMbot with external systems.

Initial integration types:

- REST API
- Webhooks

Future integrations may include:

- WooCommerce
- Shopify
- Google Sheets
- CRM platforms
- Helpdesk platforms

Integrations should be modular.

---

# 20. Analytics Engine

Responsibilities:

- Message analytics
- Conversation analytics
- Campaign analytics
- AI Agent analytics
- Automation analytics
- Team performance
- Usage analytics

Analytics events should be captured in a structured and consistent format.

---

# 21. Billing and Entitlement Engine

WAMbot will use subscription plans.

Plans may control:

- Team members
- WhatsApp numbers
- Contacts
- Automations
- AI Agents
- Knowledge storage
- Campaign features
- API access
- Advanced features

AI provider usage costs are paid directly by the customer to their selected AI provider under the BYOK model.

Feature restrictions must use a centralized entitlement system.

---

# 22. Background Job Engine

Long-running operations must not block normal web requests.

Background processing should handle:

- Campaign sending
- Document processing
- Embedding generation
- Webhook processing
- Scheduled automation
- Retry operations
- Analytics processing

---

# 23. Audit and Logging Engine

The system should maintain logs for important activities.

Examples:

- Login activity
- Team changes
- Provider configuration changes
- Automation publishing
- AI Agent changes
- Campaign launches
- Critical actions
- System errors

Sensitive values such as API keys must never appear in logs.

---

# 24. Platform Administration Engine

WAMbot platform administrators require a separate administration area.

Responsibilities:

- Manage users
- Manage workspaces
- Manage plans
- Manage subscriptions
- View platform usage
- View system errors
- View failed background jobs
- Suspend abusive accounts
- Monitor system health

Platform administrators and workspace users are separate permission scopes.

---

# 25. Core Data Flow

Primary WhatsApp AI conversation flow:

Customer
→ WhatsApp
→ WhatsApp Webhook
→ Communication Channel Engine
→ Conversation Engine
→ Automation Engine
→ Rule Engine
→ AI Agent Engine
→ Knowledge Engine
→ AI Provider Engine
→ OpenAI
→ AI Agent Engine
→ Conversation Engine
→ WhatsApp Engine
→ Customer

Not every message must pass through every engine.

The system determines the required processing path based on configuration.

---

# 26. Core Architectural Principle

WAMbot must be designed so that individual components can evolve independently.

WhatsApp is the first communication channel.

OpenAI is the first AI provider.

Neither should become a permanent architectural dependency.

The long-term architecture should support:

Multiple Channels
+
Multiple AI Providers
+
Multiple AI Agents
+
Multiple Knowledge Sources
+
Multiple Integrations
+
Multiple Workflows

within a secure multi-tenant SaaS platform.