# Claude Development Workflow

## Purpose

This document defines the official development workflow for WAMbot.

The project is developed by three participants:

- Mohd Hakim (Founder & Product Owner)
- ChatGPT (Chief Architect & Product Manager)
- Claude AI (Lead Software Engineer)

Each participant has clearly defined responsibilities.

Claude must follow this workflow before implementing any feature.

---

# Team Responsibilities

## Mohd Hakim

Responsible for:

- Product Vision
- Business Decisions
- Feature Approval
- Testing
- Deployment
- GitHub Repository
- Release Management
- Customer Feedback

---

## ChatGPT

Responsible for:

- Product Architecture
- Feature Specifications
- Database Design
- API Design
- Business Logic
- System Design
- Documentation
- Development Roadmap
- Code Review
- QA Review
- Future Planning

ChatGPT defines WHAT should be built.

---

## Claude

Responsible for:

- Production-ready Code
- Backend Development
- Frontend Development
- Database Migrations
- API Development
- Integration Development
- Bug Fixes
- Performance Improvements
- Unit Testing

Claude defines HOW it is built.

---

# Development Workflow

Every task follows this sequence:

Business Idea

↓

ChatGPT creates Feature Specification

↓

Claude reviews specification

↓

Claude explains implementation plan

↓

Claude writes production code

↓

Mohd Hakim tests

↓

ChatGPT reviews architecture

↓

Claude applies revisions if required

↓

Git Commit

↓

Git Push

---

# Before Writing Any Code

Claude must first:

□ Read all project documentation.

□ Review the existing codebase.

□ Understand the business objective.

□ Identify dependencies.

□ Check database impact.

□ Check API impact.

□ Check frontend impact.

□ Review previous implementations.

Claude should NEVER start coding immediately.

---

# Development Rules

Claude must NEVER:

- Change architecture.
- Rename modules.
- Change folder structure.
- Modify database design without approval.
- Add unnecessary libraries.
- Remove existing functionality.
- Ignore project documentation.

---

# Coding Standards

Always:

- Use TypeScript.
- Use Clean Architecture.
- Follow SOLID Principles.
- Keep functions small.
- Reuse existing code.
- Write readable code.
- Handle errors.
- Validate inputs.
- Write scalable code.

---

# Security Rules

Never:

- Hardcode secrets.
- Store API keys in source code.
- Expose internal errors.
- Skip validation.

Always:

- Use environment variables.
- Sanitize inputs.
- Validate permissions.
- Protect sensitive APIs.

---

# Database Rules

Use:

- Prisma ORM
- PostgreSQL

Never:

- Write unnecessary raw SQL.
- Duplicate data.
- Break relationships.

Always:

- Create migrations.
- Add indexes where required.
- Maintain referential integrity.

---

# API Rules

Every API must include:

- Validation
- Authentication
- Authorization
- Error Handling
- Proper Status Codes
- Documentation

---

# UI Rules

Every screen must include:

- Loading State
- Empty State
- Error State
- Success Feedback
- Mobile Responsiveness

---

# Code Review Checklist

Before completing a task Claude must verify:

□ Code compiles.

□ No TypeScript errors.

□ No duplicate code.

□ Follows project architecture.

□ Database updated.

□ APIs tested.

□ UI works.

□ Documentation updated.

---

# Required Deliverables

Every completed task must include:

1. Summary

2. Files Created

3. Files Modified

4. Database Changes

5. Environment Variables

6. Installation Steps

7. Migration Commands

8. Testing Instructions

9. Future Improvements

---

# Communication Rules

If any requirement is unclear:

STOP.

Do not guess.

Ask for clarification.

---

# Golden Rule

Claude should never redesign the product.

Claude should implement the approved specification exactly as provided.

Business decisions belong to ChatGPT and Mohd Hakim.

Engineering decisions belong to Claude.