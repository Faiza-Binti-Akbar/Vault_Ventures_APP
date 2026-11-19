# Database migrations

This directory is reserved for reviewed, versioned MySQL migrations. Phase 1 Step 1.7 creates no schema, tables, seed data, or executable migration files, and selects no migration tool.

## Naming and ordering

- After the schema and migration tooling are explicitly approved, name files with an immutable UTC timestamp followed by a short lower-snake-case description, for example `20261119143000_create_example_table.sql`.
- Apply migrations in ascending filename order. Never rename or reorder a migration after it has been shared or applied.
- Keep each migration focused on one coherent database change. Do not mix seed data or unrelated domains into a schema migration.
- Record any future tool-specific metadata only after the migration tool is approved.

## Rollback policy

- Production migrations are forward-only. Correct an applied migration with a new reviewed migration; never edit or delete migration history.
- A rollback must be designed and reviewed separately before a deployment when safe reversal is possible.
- Never run automatic database creation, dropping, destructive rollback, or migration execution from application startup.
- Backups, restoration, MySQL version, hosting, and migration tooling remain subject to explicit project decisions.

## Shared ownership

- Alvi coordinates the shared database foundation, cross-module integration, migration ordering, and release coordination.
- Faiza owns migrations for the complete Web Admin and Deal Manager modules, including their backend and database work.
- Alvi owns migrations for all other modules.
- Any migration that affects shared tables, contracts, or more than one owner's module requires review and coordination by both Alvi and Faiza before execution.
- Migration authors must identify affected modules and coordinate dependent application changes. Ownership does not permit either developer to silently resolve a pending product or schema decision.

## Local MySQL connectivity check on Windows PowerShell

The connectivity check reads local environment values, opens the reusable pool, runs only `SELECT 1`, and closes the pool. It never creates or changes a database.

From the project root:

```powershell
Set-Location 'G:\Vault_Ventures_APP\services\api'
Copy-Item '.env.example' '.env'
notepad '.env'
npm install
npm run db:check
```

Replace every `DB_*` placeholder in `.env` with credentials for an already-created local database and least-privilege application user. Do not commit `.env`. The database and user must be created manually by an authorised operator; this project does not create them automatically.

If PowerShell blocks `npm.ps1` under the local execution policy, use the Windows command shim without changing policy:

```powershell
npm.cmd install
npm.cmd run db:check
```

The expected success message is `MySQL connectivity check passed: SELECT 1 returned 1.` A failure exits with a non-zero status and does not imply that a database should be created automatically.
