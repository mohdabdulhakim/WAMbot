# WAMbot - Coding Standards

## Purpose

This document defines the coding standards for the WAMbot project.

Every developer, AI assistant, and contributor must follow these standards.

Consistency is more important than personal preference.

---

# General Principles

Write code for humans first.

Code should be:

- Simple
- Readable
- Maintainable
- Reusable
- Testable
- Scalable

Avoid clever code.

Prefer explicit code over implicit behavior.

---

# Language

Use TypeScript everywhere.

Avoid using `any`.

Always prefer strict typing.

---

# Naming Conventions

## Files

Use kebab-case.

Examples:

customer.service.ts

campaign.controller.ts

shopify.connector.ts

---

## Classes

PascalCase

Examples

CustomerService

CampaignController

ShopifyConnector

---

## Variables

camelCase

Examples

customerId

campaignName

totalRevenue

---

## Constants

UPPER_SNAKE_CASE

Examples

DEFAULT_TIMEOUT

MAX_RETRY_COUNT

---

## Enums

PascalCase

Examples

CampaignStatus

UserRole

MessageType

---

# Functions

Keep functions short.

Ideal length:

20–30 lines

One function should solve one problem.

Avoid nested logic.

---

# Comments

Write comments only when necessary.

Code should explain itself.

Do not comment obvious code.

---

# Error Handling

Never ignore exceptions.

Always:

- Catch expected errors
- Log important failures
- Return meaningful messages

Never expose stack traces to users.

---

# Logging

Use structured logging.

Log:

Authentication

Campaigns

AI Requests

Shopify Sync

WooCommerce Sync

Errors

Never log:

Passwords

Tokens

API Keys

Sensitive customer data

---

# Validation

Validate every request.

Never trust frontend validation.

Always validate:

Input

Query Parameters

Headers

Body

Webhooks

---

# API Standards

Use REST conventions.

Examples

GET /customers

POST /customers

PUT /customers/:id

DELETE /customers/:id

Use proper HTTP status codes.

---

# Database

Never duplicate data.

Always use Prisma.

Prefer transactions where required.

Use indexes on searchable fields.

---

# Folder Structure

Every module should follow the same structure.

Example

customer/

controller/

service/

repository/

dto/

entities/

validators/

types/

tests/

---

# Dependency Injection

Always use dependency injection.

Avoid creating service instances manually.

---

# Reusable Code

Never copy code.

Extract shared functionality into reusable utilities.

---

# Security

Never hardcode:

Passwords

Secrets

Tokens

URLs

Everything configurable should come from environment variables.

---

# Performance

Avoid unnecessary database queries.

Use pagination.

Use caching where appropriate.

Queue long-running jobs.

---

# Testing

Every major module should include:

Unit Tests

Integration Tests

Critical business logic tests

---

# Documentation

Every exported class and public method should have meaningful documentation when required.

Every module should contain a README if its purpose is not obvious.

---

# Git Commits

Use semantic commit messages.

Examples:

feat: add customer segmentation

fix: resolve webhook validation

refactor: simplify AI provider service

docs: update API specification

test: add campaign service tests

chore: upgrade dependencies

---

# Definition of Done

A feature is complete only when:

- Business logic works
- Validation is implemented
- Errors are handled
- Documentation is updated
- Tests pass
- Code is reviewed
- Git committed
- Git pushed

---

# Golden Rule

Write code that another developer can understand after one year without asking questions.