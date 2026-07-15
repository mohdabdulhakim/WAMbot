# PROJECT RULES
## WhatsApp AI Automation SaaS

Version: 1.0

---

# Project Goal

Build a world-class AI-powered WhatsApp Automation SaaS similar to Spur, WATI, Interakt and AiSensy, but with a more powerful AI Agent Builder and Workflow Builder.

The platform should be modular, scalable and enterprise-ready.

---

# Development Philosophy

This project must be developed as a long-term SaaS product.

Never use shortcuts that create technical debt.

Every feature should be reusable.

Every module should be independent.

---

# Golden Rules

1. Never break existing functionality.

2. Always analyze existing code before writing new code.

3. Never duplicate functionality.

4. Always reuse components.

5. Always reuse APIs.

6. Never hardcode IDs.

7. Never hardcode API Keys.

8. Never hardcode URLs.

9. Use environment variables.

10. Write production-quality code only.

---

# Architecture Rules

The system must be modular.

Modules communicate only through APIs or services.

Each module must have its own responsibility.

Example:

Authentication

Users

Workspace

Inbox

CRM

Automation

AI

Knowledge Base

Campaigns

Billing

Analytics

Admin

---

# Database Rules

Every table must include:

id

created_at

updated_at

deleted_at (if soft delete)

Never duplicate data.

Normalize where appropriate.

---

# Coding Rules

Use TypeScript strict mode.

No any type unless absolutely required.

Always validate user input.

Always sanitize output.

Always handle exceptions.

Never ignore errors.

---

# Security Rules

Never expose secrets.

Encrypt sensitive credentials.

Validate every request.

Use role-based permissions.

Verify workspace ownership before returning data.

---

# Multi-Tenant Rules

Every business record belongs to a Workspace.

Users only see data belonging to their Workspace.

Never trust workspace_id coming from the frontend.

The backend must verify access.

---

# API Rules

REST-first architecture.

Consistent response format.

Proper HTTP status codes.

Version APIs.

Document every endpoint.

---

# UI Rules

Responsive.

Fast.

Minimal.

Professional.

Component-based.

Consistent spacing.

Consistent colors.

Consistent typography.

---

# AI Rules

The AI should never directly control business logic.

Business logic belongs to the application.

AI should:

Understand language

Generate responses

Summarize

Classify

Extract information

Business actions should always be verified by the system.

---

# Documentation Rules

Whenever architecture changes:

Update documentation first.

Then implement code.

---

# Git Rules

One feature per commit.

Clear commit messages.

No unfinished code in production branch.

---

# Testing Rules

Every feature must be tested.

Regression testing before merge.

Never mark a feature complete without testing.

---

# Performance Rules

Optimize database queries.

Avoid unnecessary API calls.

Use caching where appropriate.

Background jobs for long-running tasks.

---

# Final Principle

This project should be capable of serving thousands of businesses without requiring architectural changes.

Every decision should support future scaling.