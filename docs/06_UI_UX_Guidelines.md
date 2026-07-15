# WAMbot UI/UX Guidelines

## Document Purpose

This document defines the user experience and interface principles for WAMbot.

WAMbot must make powerful WhatsApp automation and AI capabilities accessible to users with low technical knowledge.

The interface should hide unnecessary technical complexity while still providing advanced capabilities when required.

---

# 1. Core UX Principle

The easiest and most important action should always be the most visible.

WAMbot should use progressive disclosure:

Basic users see simple options first.

Advanced users can access additional configuration when needed.

Never force users to understand:

- APIs
- Webhooks
- AI architecture
- Embeddings
- Vector databases
- JSON
- Technical workflow concepts

unless they intentionally open advanced settings.

---

# 2. Primary User Journey

The recommended onboarding journey is:

Create Account
→ Create Workspace
→ Connect WhatsApp
→ Start Using Inbox
→ Optionally Connect OpenAI
→ Create AI Chatbot
→ Add Knowledge and Instructions
→ Test Chatbot
→ Activate on WhatsApp

WhatsApp is the primary initial setup.

AI is an optional enhancement that becomes available after connecting an AI provider.

---

# 3. Main Application Navigation

Recommended desktop sidebar:

Dashboard

Inbox
Contacts
Campaigns
Automations

AI
- AI Chatbots
- AI Agents
- Knowledge Base

Analytics
Integrations
Settings

The AI section should be visually easy to discover.

The sidebar must remain consistent throughout the application.

---

# 4. Navigation Philosophy

Primary modules should be accessible in one click.

Avoid deeply nested navigation.

Important actions should not be hidden inside Settings.

Examples:

Creating an AI Chatbot should be available directly from:

AI → AI Chatbots

Creating an automation should be available directly from:

Automations → Create Automation

Creating a campaign should be available directly from:

Campaigns → Create Campaign

---

# 5. Dashboard

The dashboard should provide a simple overview.

Primary information may include:

- WhatsApp connection status
- Open conversations
- Unread conversations
- Messages sent
- Messages received
- Active AI Chatbots
- Active Automations
- Recent Campaigns

Primary quick actions:

- Open Inbox
- Create Campaign
- Create Automation
- Create AI Chatbot

If WhatsApp is not connected, the dashboard should prioritize:

Connect WhatsApp

instead of displaying empty analytics.

---

# 6. Onboarding Experience

New users should receive a guided setup checklist.

Example:

1. Create Workspace
2. Connect WhatsApp
3. Receive or send first message
4. Connect OpenAI — Optional
5. Create AI Chatbot — Optional
6. Create first Automation — Optional

Users should be able to skip optional AI setup.

The onboarding experience should clearly show progress.

---

# 7. WhatsApp Connection Experience

Connecting WhatsApp should be one of the easiest actions in the application.

Primary button:

Connect WhatsApp

The user should be guided through the connection process step by step.

After successful connection, clearly display:

- Connected status
- Phone number
- Business name
- Connection health

Technical information should be placed under advanced settings where possible.

---

# 8. AI Feature Availability

AI features depend on an AI provider connection.

Initial provider:

OpenAI

If the user has not connected OpenAI, AI pages should remain visible in navigation.

Do not hide AI features completely.

Instead, show a clear setup state.

Example:

Create Your First AI Chatbot

Build an AI-powered chatbot for customer support, sales, FAQs, product recommendations, or another use case.

[ Connect OpenAI to Get Started ]

The user should be able to connect OpenAI directly from this screen without manually searching through Settings.

---

# 9. AI Chatbots

AI Chatbots are the primary user-facing AI feature.

Main page:

AI Chatbots

Primary action:

+ Create AI Chatbot

Chatbot list may display:

- Name
- Purpose
- Connected AI Agent
- Connected WhatsApp number
- Status
- Last updated

Possible statuses:

- Draft
- Active
- Paused

Users should be able to create and manage chatbots without understanding the underlying technical AI architecture.

---

# 10. AI Chatbot Concept

An AI Chatbot is the complete customer-facing AI experience.

Conceptually:

AI Chatbot

contains or connects:

- AI Agent
- AI Provider
- AI Model
- Instructions
- Knowledge
- Rules
- Actions
- Human Handover
- Communication Channel

The interface should present these components in an easy step-by-step experience.

---

# 11. AI Agent Templates

When creating an AI Chatbot, users may start from a template.

Initial templates may include:

- Customer Support
- Sales Assistant
- FAQ Assistant
- Product Recommendation
- Lead Qualification
- Order Support
- Custom

Templates provide recommended starting configurations.

Users can edit everything later.

Templates must not create permanent technical limitations.

---

# 12. AI Agents

AI Agents represent reusable AI intelligence and behavior.

The AI Agents page is available for users who want more control.

An AI Agent may contain:

- Name
- Role
- Instructions
- Personality
- Restrictions
- AI Provider
- Model
- Knowledge Access
- Tools
- Handover Rules

Basic users may create an AI Agent automatically while creating an AI Chatbot.

Advanced users may create and manage AI Agents independently.

---

# 13. AI Chatbot Creation Experience

Recommended creation flow:

Step 1
Choose Purpose

Step 2
Select or Create AI Agent

Step 3
Add Instructions

Step 4
Add Knowledge

Step 5
Configure Rules and Handover

Step 6
Test Chatbot

Step 7
Connect to WhatsApp

Step 8
Activate

The user should always know which step they are currently completing.

Advanced options should not overwhelm the basic setup process.

---

# 14. OpenAI Connection Experience

When OpenAI is not connected:

Show:

Connect OpenAI

Required fields:

- API Key

Optional or configurable fields:

- Connection Name
- Default Model

Actions:

- Test Connection
- Save Connection

After saving:

Never display the complete API key again.

Display only a masked representation.

Example:

sk-••••••••••••1234

Technical provider settings may remain under:

Settings → AI Providers

However, users should also be able to start the connection process directly from AI feature pages.

---

# 15. Shared Inbox Layout

Desktop layout:

Left Panel
Conversation List

Center Panel
Conversation

Right Panel
Customer Information

The inbox should prioritize speed and clarity.

Conversation list information may include:

- Customer name
- Message preview
- Time
- Unread indicator
- Assigned agent
- AI status

The conversation panel should clearly show whether the conversation is being handled by:

- AI
- Automation
- Human

Human takeover must be easy to access.

---

# 16. Contacts

The Contacts interface should use a familiar CRM-style table.

Primary actions:

- Add Contact
- Import Contacts
- Search
- Filter

Contact profile should display:

- Basic information
- Tags
- Custom fields
- Notes
- Conversation history
- Campaign history

Advanced information should be organized into tabs or sections.

---

# 17. Campaigns

Campaign creation should use a guided process.

Recommended flow:

Choose Audience
→ Choose Template
→ Configure Variables
→ Review
→ Send Now or Schedule

Before sending, show a clear summary.

Example:

Audience:
2,450 Contacts

Template:
Summer Sale

Scheduled:
15 July, 10:00 AM

Users must confirm before launching a large campaign.

---

# 18. Automations

The Automations page should display:

- Automation name
- Trigger
- Status
- Last updated
- Recent executions

Primary action:

+ Create Automation

Users may start from:

- Blank Automation
- Template

Templates may include:

- Welcome Message
- FAQ Automation
- Lead Qualification
- Customer Support
- Human Handover

---

# 19. Visual Flow Builder

The Flow Builder should provide:

Left Panel:
Available nodes

Center:
Visual canvas

Right Panel:
Selected node configuration

Common nodes should use user-friendly names.

Examples:

Instead of:
Conditional Evaluation Node

Use:
If / Else

Instead of:
LLM Execution Node

Use:
Ask AI

Instead of:
HTTP Request Node

Use:
Call API

Advanced technical information may appear under:

Advanced Settings

---

# 20. Knowledge Base

The Knowledge Base interface should make adding knowledge simple.

Primary action:

+ Add Knowledge

Options:

- Upload PDF
- Upload Text File
- Upload CSV
- Upload Excel
- Write Text
- Add FAQs

Each knowledge source should show:

- Name
- Type
- Processing status
- Connected AI Agents
- Last updated

Processing states:

- Uploading
- Processing
- Ready
- Failed

Errors should be explained in plain language.

---

# 21. AI Testing Experience

Every AI Chatbot and AI Agent should have an easy testing interface.

Recommended layout:

Configuration Area
+
Test Chat Panel

The user should be able to test changes before activating them.

Advanced debug information may optionally show:

- Knowledge used
- Rule triggered
- Tool called
- AI model
- Response time

Debug information should not clutter the normal user experience.

---

# 22. Settings Structure

Recommended Settings navigation:

- Profile
- Workspace
- Team
- WhatsApp
- AI Providers
- Integrations
- Security
- Subscription

Settings should contain configuration.

Primary product actions should remain inside their respective modules.

---

# 23. Empty States

Never show a completely empty page.

Example:

No AI Chatbots Yet

Create an AI Chatbot to automatically answer customer questions, assist with sales, or provide support.

[ + Create AI Chatbot ]

Empty states should explain:

- What the feature does
- Why it is useful
- What action the user should take next

---

# 24. Status Communication

Use clear status labels.

Examples:

Active
Draft
Paused
Connected
Disconnected
Processing
Failed
Needs Attention

Do not rely only on color.

Always include readable text.

---

# 25. Forms

Forms should:

- Use clear labels
- Provide helpful descriptions
- Show validation near the relevant field
- Preserve entered data when possible
- Separate basic and advanced options

Avoid unnecessarily long forms.

Use steps or sections when configuration is complex.

---

# 26. Confirmation and Safety

Require confirmation for important destructive or high-impact actions.

Examples:

- Delete AI Agent
- Delete Knowledge Base
- Disconnect WhatsApp
- Launch large Campaign
- Delete Automation

Avoid unnecessary confirmations for reversible low-risk actions.

---

# 27. Notifications

Use appropriate feedback.

Success:

OpenAI connected successfully.

Error:

We could not connect to OpenAI. Check your API key and try again.

Avoid technical error messages for normal users.

Detailed technical information may be available through:

View Details

---

# 28. Visual Design Direction

WAMbot should use a modern SaaS visual style.

Characteristics:

- Clean
- Professional
- Minimal
- Spacious
- Easy to scan
- Consistent

Avoid:

- Excessive gradients
- Excessive animations
- Cluttered dashboards
- Too many competing colors
- Unnecessary decorative elements

Functionality and clarity take priority.

---

# 29. Responsive Design

The application should be designed desktop-first because major features such as:

- Shared Inbox
- Flow Builder
- Analytics
- AI Agent configuration

benefit from larger screens.

However, core functions should remain usable on mobile.

Mobile priorities:

- View conversations
- Reply to messages
- View contacts
- Receive important notifications
- Perform basic conversation management

Complex Flow Builder editing may provide a limited mobile experience.

---

# 30. Accessibility

The interface should support:

- Keyboard navigation where practical
- Visible focus states
- Readable text sizes
- Sufficient contrast
- Clear labels
- Text-based status indicators

Do not communicate important information using color alone.

---

# 31. Reusable Component Strategy

The frontend should use reusable components.

Examples:

- Buttons
- Inputs
- Selects
- Modals
- Tables
- Status badges
- Empty states
- Cards
- Tabs
- Side panels
- Confirmation dialogs
- Loading states
- Error states

The same interaction should look and behave consistently across WAMbot.

---

# 32. Primary UX Principle

WAMbot should feel simple on the surface and powerful underneath.

A low-technical user should be able to:

- Connect WhatsApp
- Open the Inbox
- Create a Campaign
- Create an Automation
- Connect OpenAI
- Create an AI Chatbot

without understanding the technical architecture behind these features.

Advanced capabilities should be available when needed without making the basic experience difficult.