# WAMbot - Architecture Principles

## Purpose

This document defines the software architecture principles for WAMbot.

Every module, service, API, database table, and UI component must follow these principles.

The goal is to build an enterprise-grade SaaS platform that is scalable, maintainable, secure, and easy to extend.

---

# Core Principles

WAMbot should always be:

- Modular
- Scalable
- Secure
- Maintainable
- Testable
- API First
- Multi-Tenant
- AI Ready

Every implementation should support future expansion without major rewrites.

---

# Architecture Style

WAMbot follows a Modular Monolith architecture.

Each module should be independent while sharing common infrastructure.

Future microservices should be possible without changing business logic.

---

# Project Layers

Presentation Layer

↓

API Layer

↓

Business Logic Layer

↓

Service Layer

↓

Repository Layer

↓

Database

Each layer has a single responsibility.

---

# Single Responsibility Principle

Every module should have one responsibility only.

Examples:

Authentication Module

Customer Module

Campaign Module

Automation Module

AI Module

Shopify Module

WooCommerce Module

Analytics Module

---

# Dependency Rules

Modules should communicate through services.

Never access another module's database directly.

Avoid circular dependencies.

Shared functionality should be placed inside shared modules.

---

# API First

Every feature should expose clean REST APIs.

Frontend should consume APIs exactly like third-party applications.

Business logic should never exist inside controllers.

---

# Multi-Tenant Design

Every customer belongs to an Organization (Workspace).

All data must be isolated per organization.

Every database query should respect tenant boundaries.

No organization should ever access another organization's data.

---

# Security First

Never trust user input.

Always validate incoming data.

Use authentication and authorization for every protected endpoint.

Never expose internal errors.

Store secrets only in environment variables.

---

# Database Principles

Normalize data where appropriate.

Avoid unnecessary duplication.

Use foreign keys.

Use indexes on frequently searched fields.

Keep database migrations reversible.

Never delete production data without soft delete support unless explicitly required.

---

# Customer Data Strategy

Customers are the primary business entity.

Orders are imported only to enrich customer intelligence.

Do not build an order management system.

Focus on:

- Customer Profiles
- Customer Statistics
- Customer Timeline
- Customer Segments
- Customer Intelligence

---

# Event-Driven Design

The platform should react to events.

Examples:

Customer Created

Customer Updated

Abandoned Cart

Purchase Completed

Campaign Sent

Message Replied

AI Conversation Started

These events should trigger automations instead of tightly coupled logic.

---

# AI Architecture

AI providers must be abstracted.

Supported providers should be interchangeable.

Never tightly couple business logic to one AI provider.

Support user-provided API keys.

---

# Integration Principles

External integrations should use connectors.

Examples:

Shopify Connector

WooCommerce Connector

WhatsApp Connector

AI Connector

Future integrations should plug into the same architecture.

---

# Reusability

Never duplicate code.

Create reusable:

Components

Services

Utilities

Validators

Guards

DTOs

Hooks

Helpers

---

# Performance

Heavy tasks must run in background queues.

Cache frequently accessed data.

Optimize database queries.

Avoid unnecessary API calls.

Support horizontal scaling.

---

# Logging

Every important action should be logged.

Examples:

Login

Campaign

Broadcast

AI Request

Webhook

Errors

Never log passwords, API keys, or tokens.

---

# Error Handling

Return consistent error responses.

Never expose stack traces.

Log errors internally.

Provide meaningful user-friendly messages.

---

# Documentation

Every major module should include:

Purpose

Responsibilities

Dependencies

API

Database

Future Improvements

---

# Development Philosophy

Prefer clarity over cleverness.

Prefer maintainability over shortcuts.

Prefer reusable code over quick fixes.

Write code that another developer can understand after six months.

---

# Long-Term Goal

The architecture should support thousands of organizations, millions of customers, and future communication channels without major redesign.

Every architectural decision should answer one question:

"Will this still be a good design when WAMbot grows 100x?"