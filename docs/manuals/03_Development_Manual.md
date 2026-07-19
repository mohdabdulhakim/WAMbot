# WAMbot Development Manual

**Project:** WAMbot

**Version:** 1.0

**Status:** Active Development

**Owner:** Mohammad Hakim

**Architecture Lead:** ChatGPT

**Implementation Lead:** Claude

---

# Purpose

This manual defines the official development workflow for WAMbot.

Every implementation must follow the standards, conventions, and engineering practices described in this document.

The goal is to ensure that every feature is scalable, maintainable, secure, and production-ready.

---

# Development Philosophy

The project follows a professional software engineering workflow.

Every feature must be:

- Planned before implementation
- Architecturally reviewed
- Modular
- Well documented
- Tested
- Version controlled
- Future-proof

Quick fixes and temporary solutions are not acceptable unless explicitly approved.

---

# AI Responsibilities

## ChatGPT

Responsible for:

- Product Strategy
- System Architecture
- Feature Planning
- Database Design
- API Design
- Technical Documentation
- Development Roadmap
- Code Review
- Long-term Decisions

---

## Claude

Responsible for:

- Feature Implementation
- Writing Production Code
- Bug Fixes
- Refactoring
- Unit Tests
- API Development
- UI Development
- Following Architecture
- Following Coding Standards

Claude should never redesign the architecture without approval.

---

# Development Workflow

Every feature follows this process:

1. Requirement Analysis
2. Architecture Review
3. Technical Planning
4. Ticket Creation
5. Feature Development
6. Testing
7. Code Review
8. Git Commit
9. Documentation Update

---

# Coding Standards

Every implementation should:

- Follow TypeScript best practices
- Avoid duplicated code
- Use reusable components
- Follow SOLID principles
- Maintain clean folder structures
- Use meaningful naming
- Handle errors gracefully
- Include comments only where necessary

---

# Git Workflow

Every feature should have:

- Meaningful commit messages
- Small incremental commits
- No direct breaking changes
- Clean Git history

---

# Documentation Rules

Every completed feature must update:

- Architecture (if required)
- Specifications
- API documentation
- Development backlog
- Release notes

Documentation is considered part of the feature.

---

# Quality Standards

Production-ready code should:

- Compile successfully
- Pass testing
- Follow architecture
- Handle exceptions
- Be readable
- Be maintainable
- Avoid unnecessary complexity

---

# Project Structure

Developers must follow the official project structure.

No new folders should be introduced without architectural approval.

---

# Included Documents

This manual references:

- 08_Development_Roadmap.md
- 09_AI_Development_Workflow.md
- 11_Claude_Development_Workflow.md
- 12_Project_Context.md
- 13_Architecture_Principles.md
- 16_Project_Conventions.md
- 17_Development_Backlog.md
- 19_AI_Project_Rules.md
- 20_Git_Workflow.md

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | July 2026 | Initial Development Manual |