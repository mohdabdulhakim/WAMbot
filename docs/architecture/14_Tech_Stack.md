# WAMbot - Technology Stack

## Purpose

This document defines the official technology stack for WAMbot.

All development must use these technologies unless a project decision explicitly changes them.

No framework or library should be introduced without approval.

---

# Frontend

## Framework

Next.js

## Language

TypeScript

## UI Library

React

## Styling

Tailwind CSS

## Component Library

shadcn/ui

## Icons

Lucide

## Forms

React Hook Form

## Validation

Zod

## State Management

Zustand

## Tables

TanStack Table

## Charts

Recharts

## Drag & Drop

dnd-kit

---

# Backend

## Framework

NestJS

## Language

TypeScript

## API Style

REST

## API Documentation

Swagger

## Validation

class-validator

## Authentication

JWT

## Authorization

Role Based Access Control (RBAC)

---

# Database

PostgreSQL

---

# ORM

Prisma

---

# Cache

Redis

---

# Background Jobs

BullMQ

Redis Queue

---

# Real-time Communication

Socket.IO

---

# AI Providers

OpenAI

Claude

Gemini

OpenRouter

Bring Your Own API Key (BYOK)

---

# Messaging

Evolution API

Meta WhatsApp Cloud API

Future Providers:

- Twilio
- 360dialog
- Gupshup

---

# E-commerce Platforms

Shopify

WooCommerce

Future

Magento

BigCommerce

---

# Storage

Amazon S3 Compatible

MinIO (Development)

---

# Authentication Providers

Email & Password

Google OAuth

Future

GitHub

Microsoft

OTP

---

# Billing

Razorpay

Stripe

---

# Logging

Pino

---

# Monitoring

Sentry

Grafana

Prometheus

---

# Testing

Jest

Supertest

Playwright

---

# Deployment

Docker

Docker Compose

Ubuntu Linux

Nginx

PM2

---

# CI/CD

GitHub Actions

---

# Package Manager

pnpm

---

# Code Quality

ESLint

Prettier

Husky

lint-staged

---

# Security

Helmet

Rate Limiting

CORS

CSRF Protection

Input Validation

Encryption

Audit Logs

---

# Design Principles

API First

Multi-Tenant

Modular Monolith

Scalable

Secure by Default

Performance First

Cloud Ready

AI Ready

---

# Technology Rules

Never replace an approved technology without a documented architectural decision.

Prefer mature, stable, well-supported libraries.

Avoid unnecessary dependencies.

Always prioritize maintainability over trends.

Every technology must have a clear business or technical justification.