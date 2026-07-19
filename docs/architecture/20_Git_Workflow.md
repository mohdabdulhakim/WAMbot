# Git Workflow

## Branch Strategy

Main Branch

- Always stable
- Always deployable
- Never commit unfinished work

Feature Branches

Examples:

feature/authentication

feature/shopify-integration

feature/woocommerce-sync

feature/whatsapp-session

feature/campaign-builder

feature/customer-segmentation

feature/template-engine

feature/analytics-dashboard

feature/subscription-system

bugfix/login

hotfix/payment

---

## Development Process

1. Create feature branch.

2. Implement feature.

3. Run tests.

4. Fix issues.

5. Commit changes.

6. Push branch.

7. Merge into main.

---

## Commit Message Style

Good Examples

Add Shopify OAuth integration

Implement WhatsApp QR authentication

Fix session reconnect bug

Improve campaign scheduling

Refactor message queue

Bad Examples

update

fix

changes

work

---

## Rules

Never force push.

Never rewrite history.

Never delete branches without approval.

Never modify unrelated files.

Keep commits small.

Every commit must compile successfully.

---

## Pull Requests

Every feature should include:

Summary

Files changed

Testing completed

Known limitations

Future improvements

---

## Before Every Commit

Run tests.

Review changed files.

Remove debug code.

Update documentation if required.

Ensure no secrets are committed.

---

## Git Ignore

Never commit

.env

node_modules

dist

build

logs

coverage

temporary files

---

## Final Rule

The repository should always remain production quality.