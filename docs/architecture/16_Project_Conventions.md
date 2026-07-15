# WAMbot - Project Conventions

## Purpose

This document defines the naming, organization, and development conventions used throughout the WAMbot project.

These conventions ensure that every module, API, database object, Git branch, and engineering task follows a consistent standard.

Consistency is mandatory.

---

# Naming Philosophy

Names should be:

- Clear
- Predictable
- Short
- Meaningful
- Consistent

Avoid abbreviations unless they are industry standard.

---

# Module Names

Use singular names.

Examples

Customer

Campaign

Automation

Integration

Analytics

Billing

Settings

AI

Inbox

Organization

Never use:

Customers

Campaigns

Automations

---

# API Routes

Use plural resources.

Examples

/api/customers

/api/campaigns

/api/segments

/api/messages

/api/automations

---

# Database Tables

Use snake_case.

Use plural names.

Examples

customers

customer_tags

customer_segments

campaigns

campaign_messages

organizations

users

---

# Database Columns

Use snake_case.

Examples

created_at

updated_at

customer_id

organization_id

last_purchase_at

total_spend

---

# Prisma Models

Use PascalCase.

Examples

Customer

Campaign

Organization

User

CustomerSegment

---

# TypeScript Files

Use kebab-case.

Examples

customer.service.ts

customer.controller.ts

customer.repository.ts

campaign.service.ts

---

# Environment Variables

Use uppercase snake case.

Examples

DATABASE_URL

JWT_SECRET

OPENAI_API_KEY

REDIS_URL

SHOPIFY_CLIENT_ID

SHOPIFY_CLIENT_SECRET

---

# Ticket IDs

Use prefixes.

AUTH-001

USER-001

ORG-001

CUST-001

SEG-001

SHOP-001

WC-001

AI-001

AUTO-001

CMP-001

API-001

ADMIN-001

---

# Branch Names

feature/customer-segmentation

feature/shopify-integration

bugfix/login-validation

refactor/customer-service

docs/product-vision

hotfix/webhook-validation

---

# Git Commit Convention

Use Conventional Commits.

Examples

feat: add customer import

fix: resolve webhook validation

docs: update architecture

refactor: simplify AI provider

test: add customer service tests

chore: update dependencies

---

# Folder Structure

Every backend module should follow the same layout.

Example

customer/

controller/

service/

repository/

dto/

entities/

validators/

interfaces/

tests/

---

# REST API Naming

Use nouns.

Correct

/customers

/campaigns

/segments

Incorrect

/getCustomers

/createCampaign

/deleteUser

---

# HTTP Methods

GET

Retrieve data

POST

Create

PUT

Replace

PATCH

Partial Update

DELETE

Remove

---

# Response Format

Every API should return a consistent structure.

Success

{
  "success": true,
  "message": "...",
  "data": {}
}

Error

{
  "success": false,
  "message": "...",
  "errors": []
}

---

# Date & Time

Store dates in UTC.

Convert to local timezone only in the presentation layer.

Use ISO-8601 format.

---

# Currency

Store monetary values in the smallest unit whenever practical (for example, paise instead of rupees) to avoid floating-point precision issues.

Always store the currency code (e.g. INR, USD) alongside monetary values where applicable.

---

# IDs

Use UUIDs for public-facing entities.

Avoid exposing sequential database IDs in public APIs.

---

# Soft Delete

Use soft delete for business entities whenever practical.

Maintain audit history.

---

# Pagination

All list APIs should support:

page

limit

sort

search

filters

---

# Versioning

Semantic Versioning

Major.Minor.Patch

Examples

v1.0.0

v1.2.5

v2.0.0

---

# Documentation

Every new module should include:

Purpose

Responsibilities

Dependencies

Future Improvements

---

# Golden Rule

If there are multiple ways to implement something, always choose the option that keeps the project more consistent with existing conventions.