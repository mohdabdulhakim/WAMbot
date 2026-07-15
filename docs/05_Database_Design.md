# WAMbot Database Design

## Document Purpose

This document defines the logical database architecture for WAMbot.

It is a blueprint only.

Actual database tables and migrations must not be created until this design has been reviewed during implementation.

---

# 1. Database Strategy

Initial database:

MySQL or MariaDB

Architecture:

Relational, multi-tenant database

Primary tenant:

Workspace

Most business-owned records must belong to a workspace.

The database must support:

- Data isolation
- Referential integrity
- Indexing
- Migrations
- Auditability
- Future scaling

---

# 2. General Database Rules

Primary keys should use a consistent ID strategy.

Recommended application-facing IDs:

UUID or ULID

Internal implementation may use optimized database identifiers where justified.

Every standard entity table should normally contain:

- id
- created_at
- updated_at

Soft-deletable records should also contain:

- deleted_at

Not every event, log, or junction table requires soft deletion.

Never store:

- Plain-text passwords
- Unencrypted AI API keys
- Encryption keys
- Sensitive secrets in logs

Use foreign keys where appropriate.

Frequently queried fields must be indexed.

---

# 3. Multi-Tenant Data Isolation

Workspace is the primary tenant boundary.

Example:

User
→ Workspace Membership
→ Workspace
→ Workspace Resources

Workspace-owned tables should normally contain:

workspace_id

Examples:

- contacts
- conversations
- ai_agents
- knowledge_bases
- automations
- campaigns

Every backend query for workspace-owned data must enforce workspace access.

A record ID alone must never be considered sufficient authorization.

---

# 4. Users

Table:

users

Purpose:

Stores WAMbot user accounts.

Core fields:

- id
- name
- email
- password_hash
- email_verified_at
- status
- last_login_at
- created_at
- updated_at
- deleted_at

Rules:

Email should be unique.

Passwords must only be stored as secure hashes.

---

# 5. Workspaces

Table:

workspaces

Purpose:

Represents a business or tenant.

Core fields:

- id
- name
- slug
- status
- timezone
- locale
- created_at
- updated_at
- deleted_at

A workspace owns most business data.

---

# 6. Workspace Memberships

Table:

workspace_memberships

Purpose:

Connects users to workspaces.

Core fields:

- id
- workspace_id
- user_id
- role_id
- status
- invited_by
- joined_at
- created_at
- updated_at

A user may belong to multiple workspaces.

A workspace may contain multiple users.

The combination of workspace_id and user_id should normally be unique.

---

# 7. Roles

Table:

roles

Core fields:

- id
- workspace_id
- name
- is_system_role
- created_at
- updated_at

Initial system roles:

- Owner
- Admin
- Manager
- Agent
- Viewer

Future custom roles may belong to a workspace.

---

# 8. Permissions

Tables:

permissions

role_permissions

Purpose:

Supports capability-based access control.

Example permissions:

- contacts.view
- contacts.edit
- conversations.assign
- campaigns.create
- automations.publish
- ai_agents.manage
- billing.manage

Roles group permissions.

Authorization should check capabilities rather than relying only on role names.

---

# 9. Workspace Invitations

Table:

workspace_invitations

Core fields:

- id
- workspace_id
- email
- role_id
- token_hash
- invited_by
- expires_at
- accepted_at
- status
- created_at
- updated_at

Invitation tokens must not be stored in plain text when avoidable.

---

# 10. Communication Channels

Table:

communication_channels

Purpose:

Represents communication connections.

Core fields:

- id
- workspace_id
- channel_type
- name
- status
- configuration
- created_at
- updated_at
- deleted_at

Initial channel_type:

whatsapp

Future values may include:

- instagram
- messenger
- telegram
- website_chat
- email

Sensitive credentials must not be stored as plain text inside configuration.

---

# 11. WhatsApp Accounts

Table:

whatsapp_accounts

Purpose:

Stores WhatsApp-specific connection information.

Core fields:

- id
- workspace_id
- communication_channel_id
- meta_business_account_id
- whatsapp_business_account_id
- status
- created_at
- updated_at
- deleted_at

---

# 12. WhatsApp Phone Numbers

Table:

whatsapp_phone_numbers

Core fields:

- id
- workspace_id
- whatsapp_account_id
- phone_number_id
- display_phone_number
- verified_name
- status
- quality_rating
- created_at
- updated_at
- deleted_at

One WhatsApp account may contain multiple phone numbers.

---

# 13. Provider Credentials

Table:

provider_credentials

Purpose:

Securely stores encrypted credentials for external providers.

Examples:

- OpenAI API keys
- Meta access tokens
- Future integration credentials

Core fields:

- id
- workspace_id
- provider_type
- name
- encrypted_credentials
- encryption_version
- status
- last_verified_at
- created_at
- updated_at
- deleted_at

Complete credentials must never be returned to the frontend after saving.

---

# 14. Contacts

Table:

contacts

Core fields:

- id
- workspace_id
- first_name
- last_name
- email
- phone
- status
- source
- created_at
- updated_at
- deleted_at

Important:

Phone numbers should be normalized before storage and comparison.

Contacts belong to a workspace.

---

# 15. Contact Custom Fields

Tables:

custom_field_definitions

contact_custom_field_values

Purpose:

Allows workspaces to create custom CRM fields.

Example fields:

- Order ID
- Customer Type
- City
- Preferred Product

Custom field definitions belong to a workspace.

Values belong to contacts.

---

# 16. Tags

Tables:

tags

contact_tags

Core tag fields:

- id
- workspace_id
- name
- created_at
- updated_at

The contact_tags table creates a many-to-many relationship between contacts and tags.

---

# 17. Contact Notes

Table:

contact_notes

Core fields:

- id
- workspace_id
- contact_id
- created_by_user_id
- content
- created_at
- updated_at
- deleted_at

---

# 18. Conversations

Table:

conversations

Core fields:

- id
- workspace_id
- communication_channel_id
- contact_id
- assigned_user_id
- status
- handling_mode
- active_ai_agent_id
- last_message_at
- closed_at
- created_at
- updated_at
- deleted_at

Possible handling modes:

- automation
- ai
- human

Possible statuses:

- open
- pending
- resolved
- closed

---

# 19. Messages

Table:

messages

Core fields:

- id
- workspace_id
- conversation_id
- contact_id
- direction
- message_type
- external_message_id
- text_content
- status
- sent_at
- delivered_at
- read_at
- failed_at
- created_at
- updated_at

Direction:

- inbound
- outbound

Message types may include:

- text
- image
- video
- audio
- document
- template
- interactive

Large media files should not be stored directly inside the database.

---

# 20. Message Media

Table:

message_media

Core fields:

- id
- workspace_id
- message_id
- media_type
- storage_provider
- storage_key
- original_filename
- mime_type
- file_size
- created_at
- updated_at

The database stores file metadata and references.

Actual files belong in the configured storage system.

---

# 21. Conversation Assignments

Table:

conversation_assignment_history

Purpose:

Tracks assignment changes.

Core fields:

- id
- workspace_id
- conversation_id
- assigned_from_user_id
- assigned_to_user_id
- assigned_by_user_id
- created_at

---

# 22. AI Provider Connections

Table:

ai_provider_connections

Purpose:

Represents user-configured AI provider connections.

Initial provider:

OpenAI

Core fields:

- id
- workspace_id
- provider_type
- name
- provider_credential_id
- default_model
- status
- created_at
- updated_at
- deleted_at

This table stores configuration.

Sensitive API keys belong in provider_credentials.

---

# 23. AI Agents

Table:

ai_agents

Core fields:

- id
- workspace_id
- name
- description
- role
- instructions
- personality
- restrictions
- ai_provider_connection_id
- model
- configuration
- status
- created_by_user_id
- created_at
- updated_at
- deleted_at

Provider-specific optional settings may be stored in validated configuration data.

Core agent behavior must remain provider-independent.

---

# 24. AI Agent Tools

Tables:

tools

ai_agent_tools

Purpose:

Controls which approved actions an AI Agent may use.

Example tools:

- Search order
- Update contact
- Add tag
- Send webhook
- Transfer to human

An AI Agent may only access explicitly assigned tools.

---

# 25. Knowledge Bases

Table:

knowledge_bases

Core fields:

- id
- workspace_id
- name
- description
- status
- created_at
- updated_at
- deleted_at

A workspace may have multiple knowledge bases.

---

# 26. Knowledge Sources

Table:

knowledge_sources

Core fields:

- id
- workspace_id
- knowledge_base_id
- source_type
- name
- storage_key
- processing_status
- error_message
- processed_at
- created_at
- updated_at
- deleted_at

Source types may include:

- manual_text
- faq
- pdf
- txt
- csv
- xlsx
- website

---

# 27. Knowledge Documents

Table:

knowledge_documents

Purpose:

Stores normalized extracted content from knowledge sources.

Core fields:

- id
- workspace_id
- knowledge_source_id
- title
- content
- metadata
- created_at
- updated_at
- deleted_at

---

# 28. Knowledge Chunks

Table:

knowledge_chunks

Purpose:

Stores smaller searchable sections of knowledge.

Core fields:

- id
- workspace_id
- knowledge_document_id
- chunk_index
- content
- token_count
- metadata
- created_at
- updated_at

Embedding storage implementation must remain adaptable.

The initial implementation must be selected based on the capabilities available during the Knowledge Engine development phase.

Do not assume MySQL alone is the permanent vector search solution.

---

# 29. AI Agent Knowledge Access

Table:

ai_agent_knowledge_bases

Purpose:

Connects AI Agents to Knowledge Bases.

Core fields:

- id
- workspace_id
- ai_agent_id
- knowledge_base_id
- created_at

One AI Agent may use multiple Knowledge Bases.

One Knowledge Base may be used by multiple AI Agents.

---

# 30. Rules

Table:

rules

Core fields:

- id
- workspace_id
- name
- description
- priority
- conditions
- actions
- status
- created_at
- updated_at
- deleted_at

Conditions and actions may initially use validated structured JSON.

The schema of this structured data must be versioned.

---

# 31. Automations

Table:

automations

Core fields:

- id
- workspace_id
- name
- description
- status
- active_version_id
- created_by_user_id
- created_at
- updated_at
- deleted_at

Possible statuses:

- draft
- published
- paused
- archived

---

# 32. Automation Versions

Table:

automation_versions

Purpose:

Preserves published workflow versions.

Core fields:

- id
- workspace_id
- automation_id
- version_number
- definition
- created_by_user_id
- published_at
- created_at

The workflow definition may use validated versioned JSON.

Published versions should not be silently modified.

---

# 33. Automation Executions

Table:

automation_executions

Core fields:

- id
- workspace_id
- automation_id
- automation_version_id
- trigger_type
- status
- started_at
- completed_at
- failed_at
- error_summary
- created_at

---

# 34. Automation Execution Steps

Table:

automation_execution_steps

Purpose:

Tracks individual workflow node execution.

Core fields:

- id
- workspace_id
- automation_execution_id
- node_id
- node_type
- status
- started_at
- completed_at
- error_summary
- created_at

Sensitive data must not be unnecessarily stored in execution logs.

---

# 35. Background Jobs

Table:

background_jobs

Core fields:

- id
- workspace_id
- job_type
- payload
- status
- priority
- attempts
- max_attempts
- available_at
- locked_at
- completed_at
- failed_at
- error_summary
- created_at
- updated_at

This provides the initial database-backed job system.

The interface must allow migration to a dedicated queue system later.

---

# 36. WhatsApp Templates

Table:

whatsapp_templates

Core fields:

- id
- workspace_id
- whatsapp_account_id
- external_template_id
- name
- language
- category
- status
- components
- last_synced_at
- created_at
- updated_at
- deleted_at

---

# 37. Audiences

Table:

audiences

Core fields:

- id
- workspace_id
- name
- audience_type
- filter_definition
- status
- created_at
- updated_at
- deleted_at

Audience types:

- static
- dynamic

---

# 38. Audience Contacts

Table:

audience_contacts

Purpose:

Stores membership for static audiences or cached membership where required.

Core fields:

- id
- workspace_id
- audience_id
- contact_id
- created_at

---

# 39. Campaigns

Table:

campaigns

Core fields:

- id
- workspace_id
- name
- whatsapp_phone_number_id
- whatsapp_template_id
- audience_id
- status
- scheduled_at
- started_at
- completed_at
- created_by_user_id
- created_at
- updated_at
- deleted_at

Possible statuses:

- draft
- scheduled
- processing
- completed
- paused
- cancelled
- failed

---

# 40. Campaign Recipients

Table:

campaign_recipients

Purpose:

Tracks delivery per recipient.

Core fields:

- id
- workspace_id
- campaign_id
- contact_id
- message_id
- status
- sent_at
- delivered_at
- read_at
- replied_at
- failed_at
- error_code
- created_at
- updated_at

Campaign analytics should be derived from recipient-level delivery records where practical.

---

# 41. Webhooks

Tables:

webhook_endpoints

webhook_deliveries

Purpose:

Supports outgoing webhooks and delivery tracking.

Webhook endpoint fields may include:

- id
- workspace_id
- name
- url
- secret_reference
- subscribed_events
- status
- created_at
- updated_at
- deleted_at

Webhook delivery records track:

- event
- status
- attempts
- response code
- timestamps

Secrets must be stored securely.

---

# 42. Integrations

Table:

integrations

Core fields:

- id
- workspace_id
- integration_type
- name
- provider_credential_id
- configuration
- status
- created_at
- updated_at
- deleted_at

Future examples:

- Shopify
- WooCommerce
- Google Sheets
- CRM systems

---

# 43. Plans

Table:

plans

Core fields:

- id
- name
- code
- status
- created_at
- updated_at

---

# 44. Plan Entitlements

Table:

plan_entitlements

Purpose:

Defines plan capabilities and limits.

Examples:

- team_members
- whatsapp_numbers
- ai_agents
- automations
- contacts
- api_access

Core fields:

- id
- plan_id
- entitlement_key
- value
- created_at
- updated_at

Feature access must use centralized entitlement checks.

---

# 45. Subscriptions

Table:

subscriptions

Core fields:

- id
- workspace_id
- plan_id
- status
- starts_at
- trial_ends_at
- current_period_start
- current_period_end
- cancelled_at
- created_at
- updated_at

Payment-provider-specific fields should only be added when the payment system is selected.

---

# 46. Usage Records

Table:

usage_records

Purpose:

Tracks measurable platform usage.

Examples:

- messages
- contacts
- AI Agents
- storage
- automation executions

Core fields:

- id
- workspace_id
- usage_type
- quantity
- period_start
- period_end
- created_at
- updated_at

AI provider billing remains with the customer's AI provider under the BYOK model.

---

# 47. Audit Logs

Table:

audit_logs

Core fields:

- id
- workspace_id
- user_id
- action
- resource_type
- resource_id
- metadata
- ip_address
- created_at

Audit logs should normally be append-only.

Sensitive secrets must never be included.

---

# 48. System Events and Error Logs

Application operational logs may be stored in:

- Structured log files
- External logging systems
- Selected database records where appropriate

Do not store every application log permanently in the primary transactional database.

---

# 49. Analytics Strategy

Do not create separate analytics tables for every metric prematurely.

Initial analytics should use:

- Transactional records
- Structured events
- Periodic aggregation where necessary

Examples:

Messages
→ Message Analytics

Campaign Recipients
→ Campaign Analytics

Automation Executions
→ Automation Analytics

As data volume grows, WAMbot may introduce dedicated analytics storage.

---

# 50. Important Relationships

Core relationship map:

User
→ Workspace Membership
→ Workspace

Workspace
→ Communication Channels
→ WhatsApp Accounts
→ WhatsApp Phone Numbers

Workspace
→ Contacts
→ Conversations
→ Messages

Workspace
→ AI Provider Connections
→ AI Agents
→ Knowledge Bases

AI Agent
↔ Knowledge Bases

Workspace
→ Automations
→ Automation Versions
→ Automation Executions

Workspace
→ Audiences
→ Campaigns
→ Campaign Recipients

Workspace
→ Subscription
→ Plan
→ Entitlements

---

# 51. Indexing Strategy

Indexes should be created based on actual query patterns.

Likely important indexes include:

- workspace_id
- email
- normalized phone
- external_message_id
- conversation_id
- contact_id
- status
- scheduled_at
- created_at
- last_message_at

Composite indexes should be considered for common workspace-scoped queries.

Example:

workspace_id + status

workspace_id + phone

workspace_id + created_at

Indexes must not be added blindly.

---

# 52. JSON Usage Rules

JSON may be used for flexible structured configuration such as:

- Workflow definitions
- Provider-specific configuration
- Template components
- Metadata
- Filter definitions

JSON must not become a replacement for proper relational database design.

Frequently queried business data should use dedicated columns or relational tables.

Structured JSON schemas should be validated and versioned.

---

# 53. Deletion Strategy

Use soft deletion for business records where recovery or audit history is useful.

Examples:

- Contacts
- AI Agents
- Automations
- Campaigns

Some records should normally remain append-only or immutable.

Examples:

- Audit logs
- Published automation versions
- Historical execution records

Permanent deletion workflows may later be required for privacy and legal compliance.

---

# 54. Database Migration Rules

All schema changes must use migrations.

Never manually modify the production database without a documented migration.

Migration files must be:

- Version controlled
- Repeatable
- Reviewed
- Tested before production deployment

---

# 55. Final Database Principle

The database is the foundation of WAMbot's multi-tenant architecture.

Every database decision must prioritize:

- Workspace isolation
- Data integrity
- Security
- Query performance
- Auditability
- Future migration

The initial schema should support the MVP without attempting to predict every future feature.

New tables and fields should be added when real product requirements justify them.