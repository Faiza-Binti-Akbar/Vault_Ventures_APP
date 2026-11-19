# Vault Ventures Mobile App — Project Instructions

These instructions apply to the entire repository. More specific `AGENTS.md` files may add instructions for their own subtree; preserve and follow them when working there. In particular, `apps/mobile/AGENTS.md` contains additional mobile-specific guidance and must not be overwritten or deleted.

## Ownership and coordination

- The project name is exactly **Vault Ventures Mobile App**.
- Alvi owns every module except Admin and Deal Manager, end to end.
- Faiza owns the complete Web Admin and Deal Manager modules, including frontend, backend, database, and testing.
- Alvi coordinates the shared foundation and integration across modules.

## Source of truth

- Read the relevant specifications in `docs/` before any implementation.
- The Decision Register, currently `docs/DECISIONS 2_REV6.md`, has priority if specifications conflict.
- Respect every decision status. Never silently treat a `PENDING` or `NEEDS VERIFICATION` item as approved, resolved, or authorised; stop and request an explicit owner decision when an assigned step depends on one.
- Do not invent missing requirements, permissions, business rules, endpoints, schemas, or implementation details.

## Approved architecture

- Mobile: Expo + React Native + TypeScript.
- Backend: Node.js + Express.
- Database: MySQL.
- Admin: a separate Admin Web application, not part of the mobile application.
- Do not use these high-level choices to infer approval of versions, libraries, workflows, authentication details, hosting, or other matters that remain undecided in the Decision Register.

## Working rules

- Work on exactly one explicitly assigned Phase/Step at a time. Do not expand the scope or begin a later step without explicit instruction.
- Make focused, minimal changes that are necessary for the assigned step.
- Protect existing code, documentation, and Git history. Preserve unrelated work and do not overwrite user changes.
- Do not commit, push, merge, delete branches, rewrite history, or make destructive changes without explicit permission.
- Never store credentials, tokens, private keys, connection strings, or other secrets in Git. Use approved environment/configuration mechanisms and safe placeholders instead.
- At handoff, report every modified file and the actual tests or checks run, including failures or tests not run. Never claim a test passed unless it was executed successfully.
- Communicate progress, blockers, questions, and final results in Bangla.
