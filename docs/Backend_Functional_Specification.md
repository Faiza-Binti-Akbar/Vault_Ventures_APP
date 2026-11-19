# Vault Ventures Mobile - Backend Functional Specification

**Edition:** 0.4-DRAFT (supersedes Edition 0.3-DRAFT; reconciled against Decision Register Revision 6 and the corrected Mobile Functional Master Specification internal Edition 2.2)
**Status:** DRAFT. Not approved. Not development-ready. Authorises no development.
**Document type:** Functional specification of the BACKEND. It states WHAT the backend must do, for WHOM, with WHICH data, rules, validations, security and audit behaviour. It contains no implementation code, no SQL schema, no endpoint paths and no database column definitions.
**Currency:** BDT only. Monetary values are exact decimals. Display formatting (South Asian digit grouping) is a client concern.
**Language note:** This file is ASCII-only by design.
**Authorisation note:** Decision Register Revision 6 approves the APPROACH of a Backend Functional Specification covering all domains (OD-01 Option A) but records that creation remains separately unauthorised. This draft exists because the owner requested reconciliation; it authorises no development, API contract, schema or implementation. Exactly five decisions are approved: G-00, G-01 / DEC-046, OD-01 (approach only), OD-03 and OD-07. All other unresolved decisions, including all BR-DEC and MSG-DEC cards, remain PENDING.

### Edition 0.2 -> 0.4 reconciliation summary

- Reconciled sources and decision governance to Decision Register Revision 6 and the corrected Mobile Functional Master Specification.
- Integrated Business-scoped invitation, membership, standard/restricted roles, granular permissions, Deal delegation, Team Workspace, revocation and audit requirements, with BR-DEC-001..012 left PENDING.
- Extended Deal messaging into a unified authorized Messages system covering Hiring, Deals and Team contexts, with MSG-DEC-001..013 and DEC-010 left PENDING.
- Corrected BE-DLR-004, BE-NEG-004 and BE-AGR-001 so an expressly authorized Finance Manager may negotiate and draft versioned proposals but never finalize the Founder side.
- Preserved the four disclosure stages, eight Deal states, simulation-only finance, AI authority limits, separate Web Admin R1 Tier 1 review and all historical legacy evidence.

---

## 0. Evidence labels and rules of this document

| Label | Meaning |
|---|---|
| **FACT** | Stated by a source document (Spec v2.1, MPS v1.1, ILS, P0-P9, UI/UX PRD, Roadmap) or by the Phase 1 static audit of the OLD Laravel platform. Static evidence only; never runtime-verified. |
| **APPROVED** | Explicitly decided by the project owner and logged in Decision Register Revision 6. Currently ONLY: G-00, G-01 / DEC-046, OD-03, OD-07, and OD-01 (approach only). |
| **PROPOSED** | Engineering proposal made by this document. Not a business rule. Not approved. |
| **PENDING** | Unresolved decision or missing information (includes NEEDS VERIFICATION). No option is chosen. Nothing marked PENDING may be built as if decided. |
| **UNKNOWN** | Information absent from every available source. It is listed in Section 13 and must not be guessed. |

Rules:
- R-01. Business rules come only from the sources. Where a source is silent or ambiguous the item is PENDING or UNKNOWN, never invented.
- R-02. No endpoint path, request/response field name, table name or column name is defined here. Those belong to an API contract and data design that must be created after the PENDING gates in Section 12 are closed.
- R-03. Requirement IDs use the prefix BE-. Each row cites its Mobile Specification / MPS / Decision Register ancestor. BR-DEC-001..012 and MSG-DEC-001..013 are Revision 6 PENDING decision cards, not approvals.
- R-04. The Phase 1 audit described a LARAVEL system. For the new backend every capability is NEW work. Audit statuses (IMP/PAR/UNV/MIS) are functional references only, not evidence that anything exists in the new backend (Revision 6 assumption AS-1, owner acknowledgement still needed).
- R-05. Must-Have and Should-Have requirements are all preserved. Future Scope is excluded from implementation and listed in Section 11.3.
- R-06. Decision Register Revision 6 is the authority for approval status. If this document differs, Revision 6 governs.
- R-07. Release tags (R1/R2/R3) are PROPOSED. They come from the corrected mobile specification section 4.4 and remain provisional (DEC-034 and DEC-054 PENDING, Revision 6 assumption AS-8). The only approved release constraint is OD-03: minimum Admin functionality must exist in Release 1.

## 0.1 Source register

| Source | Received for this task | Use |
|---|---|---|
| Mobile Functional Master Specification physical filename v2_1, internal Edition 2.2-DRAFT | Yes | Latest corrected functional source; active architecture and BRM/UMSG requirements govern |
| Master Project Specification (MPS v1.1) | Yes (final_prompt.zip) | Business rules, Must-Have / Should-Have / Future lists |
| Investment Logic Specification (ILS) | Yes (final_prompt.zip) | Investment rules |
| Phase P0-P9 prompts | Yes (final_prompt.zip) | Phase intent and conflicts; Decision Register Revision 6 relies on the mobile specification's reports of these, not a re-read. |
| UI/UX Design PRD | Yes (final_prompt.zip) | Functional UX rules only. Visual content is irrelevant to the backend. |
| Mobile Development Plan and Implementation Roadmap | Yes | Phases, gates, conflict C-1 (resolved by G-00) |
| Phase 1 Audit Report | Yes (as text in the conversation) | Functional reference for the OLD Laravel system |
| **Decision Register Revision 6 (`DECISIONS 2_REV6.md`)** | **Yes** | Authoritative approval status and BR/MSG decision cards (R-06) |
| Old Laravel code | No | Read-only reference only; not integrated, not reused (G-01) |

## 0.2 Reconciliation against Decision Register Revision 6

| Earlier item | Earlier label | Revision 6 status | Edition 0.4 treatment |
|---|---|---|---|
| BA-01 Node.js + Express.js | APPROVED* | G-00 Option B approved 2026-11-15 | APPROVED (G-00) |
| BA-02 MySQL | APPROVED* | G-00 | APPROVED (G-00) |
| BA-03 REST | APPROVED* | G-00 | APPROVED (G-00) |
| BA-04 JWT | APPROVED* (details PENDING) | G-00 approves JWT-based family only; token model PENDING (G-03); conflict with P0/P1 prohibition OPEN (OD-08 / CF-1) | APPROVED family; model PENDING |
| BA-05 RN + Expo + TypeScript | APPROVED* | G-00 approves RN + Expo + TS; Expo workflow, SDK, push, native modules NEEDS VERIFICATION (G-02 / DEC-022) | APPROVED framework; details PENDING |
| BA-06 Separate Web Admin Dashboard | APPROVED* | OD-03 Option A approved (not G-00) | APPROVED (OD-03) |
| BA-07 Laravel reference only | APPROVED* | G-00 exclusion plus G-01 Option A approved | APPROVED (G-00, G-01) |
| BC-01 backend baseline conflict | PENDING | Resolved in direction by G-00; v2.1 and Roadmap text still cite Laravel (CF-2) and need a change request | RESOLVED in direction; text change request PENDING |
| BC-02 DECISIONS not received | UNKNOWN | Received | CLOSED |
| BC-05 DEC-004 effectively answered | APPROVED* | OD-03 does NOT approve DEC-004; DEC-004 stays PENDING | PENDING (Edition 0.1 wording withdrawn) |
| BC-06 DEC-046 / DEP-001 | PENDING | DEC-046 Option A approved; DEP-001 reframed, new baseline commit not yet pinned | APPROVED (DEC-046); baseline PENDING |
| BE-DEC-01 decision | PENDING | Revision 6 received | CLOSED (see 12.1) |
| BE-DEC-09 hosting | UNKNOWN | OD-06 Phase 0 test backend and hosting PENDING | PENDING |
| R1 release scope | Admin "release PENDING" | OD-03 requires minimum Admin functionality in R1 | Corrected in 11.2 and 11.4 |
| Numbering | BE-DEC-10 missing; BE-INT used twice | - | BE-DEC-10 filled; client rows renamed BE-CLI |

---

## 1. Purpose, scope and exclusions

### 1.1 Purpose
Define the complete functional behaviour of the Vault Ventures backend that serves (a) the React Native + Expo + TypeScript mobile app (Founder, Investor and Skilled Professional users) and (b) a separate Web Admin Dashboard, preserving the business rules, workflows, permissions and security constraints described in the sources.

### 1.2 In scope (Must-Have and Should-Have)
Registration and authentication; roles and multi-role accounts; profiles; tiered verification; business management and documents; discovery; readiness scoring; matching and AI suggestions; interest, connection and applications; staged disclosure and NDA; Deal Room (negotiation, agreement, messaging); milestones; investment-type simulation; financial transparency reporting and discrepancy flagging; reputation and feedback; premium simulation; simulated payments and commission; notifications; dashboards and portfolio; Web Admin capabilities (minimum set in R1 per OD-03, remainder per release decision G-07); reference data lists; RBAC, stage-based access, validation, security, audit logging.

### 1.3 Excluded
See Section 11.3 (Future Scope and deferred items). Excluding them from implementation does not delete them from the record.

### 1.4 Out of scope of this document
Mobile and Web Admin UI/UX, visual design, Web Admin frontend technology (OD-12), endpoint design, database schema, hosting, CI/CD, code, the backend roadmap (OD-02). These need separate approved documents.

---

## 2. Architecture baseline and conflict register

### 2.1 Architecture (reconciled with Decision Register Revision 6)
| ID | Item | Label |
|---|---|---|
| BA-01 | Backend: Node.js with Express.js | APPROVED (G-00, 2026-11-15) |
| BA-02 | Database: MySQL (new, fresh database; see BA-09) | APPROVED (G-00) |
| BA-03 | API style: REST | APPROVED (G-00) |
| BA-04 | Authentication: JWT-based family. Transport, lifetimes, refresh, revocation and storage are NOT approved. | APPROVED family (G-00); model PENDING (G-03 / DEC-003, BE-DEC-02); conflict with P0/P1 OPEN (OD-08, BE-DEC-03) |
| BA-05 | Mobile client: React Native + Expo + TypeScript. Expo workflow, SDK, push and native modules are NOT approved. | APPROVED framework (G-00); details NEEDS VERIFICATION (G-02 / DEC-022) |
| BA-06 | Admin: separate Web Admin Dashboard served by the same backend through REST. Admin accounts are never publicly self-registered. Admin-specific authorization and security requirements must be documented. Frontend technology undecided. | APPROVED (OD-03); frontend PENDING (OD-12) |
| BA-07 | Old Laravel platform: remains available separately as a read-only reference for previous business-rule interpretations and known defects. No integration, no code, no framework dependency reused. Original project requirements stay authoritative over legacy behaviour. | APPROVED (G-00, G-01 / DEC-046 Option A) |
| BA-08 | MySQL-oriented persistence was observed in the Laravel audit | FACT (audit, legacy only) |
| BA-09 | No legacy data migration. The new MySQL database starts fresh. Legacy data is stated by the owner to be test/demo data only. | APPROVED (OD-07 Option A) |
| BA-10 | The new backend has its own repository and its own baseline. The baseline commit is not yet pinned and the repository does not yet exist. | APPROVED principle (G-01); commit PENDING |
| BA-11 | Versions of Node.js, Express and MySQL; hosting; email, SMS, push and file-storage providers; any endpoint, payload or schema; the start of development | NOT approved. PENDING / UNKNOWN (Revision 6 section 3.6, AS-5) |
| BA-12 | Backend Functional Specification: all-domains approach (Must-Have and Should-Have; excludes MPS Future Scope; no endpoints, schemas or code; unresolved items marked PENDING or GATED) | APPROVED approach only (OD-01); creation authorisation still not recorded (BC-16) |
| BA-13 | Business Role Assignment and Unified Messaging are requested product capabilities, but their 25 detailed decision cards remain PENDING. | Revision 6; BR-DEC-001..012; MSG-DEC-001..013 |

### 2.2 Conflicts and missing approvals (flagged, NOT silently resolved)
| ID | Conflict / gap | Sources | Effect | Status |
|---|---|---|---|---|
| BC-01 | Earlier mobile/roadmap text cited Laravel. G-00/G-01 selected an independent Node.js/Express/MySQL backend; the corrected mobile specification now reflects it. | Mobile internal Edition 2.2; Revision 6 | No active Laravel dependency remains. Audit evidence is historical only. | RESOLVED |
| BC-02 | Earlier Decision Register revision was not received in Edition 0.1. | - | Revision 6 is received and reconciled in Edition 0.3. | CLOSED |
| BC-03 | v2.1 DEC-003 options (cookie session / token guard) were expressed in Laravel Sanctum terms; G-00 fixes the JWT family. Lifetime, refresh, rotation, revocation, storage, multi-device (DEC-053) and email/reset completion (DEC-052) remain open. | v2.1 DEC-003, ARC-006, Revision 6 | Option set superseded in family; design open. | PENDING (G-03, G-04, G-05) |
| BC-04 | JWT (G-00) versus the P0/P1 prohibition reported in v2.1 CONF-02. Extended by OD-03: the Web Admin Dashboard is a browser client, so browser-based Admin authentication is directly affected. Not overridden here. Edition 0.1 wording that "the prohibition does not apply" is withdrawn. | v2.1 CONF-02, Revision 6 (CF-1, OD-08) | Owner resolution needed. | OPEN (OD-08, BE-DEC-03) |
| BC-05 | Earlier v2.1 placed Admin on mobile/R3. OD-03 establishes a separate Web Admin with minimum R1 functionality; the corrected Mobile Specification reflects this. Exact minimum inventory remains OD-10 PENDING. | Mobile internal Edition 2.2; Revision 6 | Tier 1 review is required in R1; no Admin mobile client. | DIRECTION RESOLVED; INVENTORY PENDING |
| BC-06 | v2.1 DEC-046 and DEP-001 assumed an uncommitted Laravel payment branch and a pinned Laravel commit. G-01 Option A: nothing from the legacy platform, including that branch, is reused. | v2.1, Revision 6 | PAY rows rebuilt from MPS rules; commission rules remain PENDING (DEC-007). New baseline not pinned. | DEC-046 APPROVED; baseline PENDING |
| BC-07 | The Laravel audit found a Gemini-based AI adapter (legacy). MPS describes rule-based scoring and treats NLP as future scope. v2.1 DEC-042 asks whether LLM insights are in scope. Nothing legacy is reused (G-01). | MPS, audit, v2.1 | The new backend must not assume an LLM provider. | PENDING (DEC-042, BE-DEC-11) |
| BC-08 | Investment Type placement and terms are excluded from P3/P6 but required by MPS sec 15/25.1 (v2.1 CONF-05, DEC-006). | v2.1 | Modelled at business level only. | PENDING (G-09 / DEC-006) |
| BC-09 | Retained v2.1 source conflicts: CONF-04 (ticket-size ranges), CONF-06 (negotiation term fields), CONF-11 (messaging), CONF-12 (discrepancy vocabulary 3 vs 4), CONF-13 (milestone completion one-step vs two-step), CONF-23 (NDA expiry), CONF-28 (non-completion state), CONF-22 (Admin impersonation). | v2.1 sec 20 | Each stays open; see the relevant module. | PENDING |
| BC-10 | v2.1 statuses mark most rule-level capabilities UNV or PAR (v2.1 states 170 UNV of 374 rows; the Roadmap parsed 373). They describe the legacy platform only. | v2.1 sec 1.6, Revision 6 (AS-1, CF-7) | This specification relies on sources, not on proof of past behaviour. | FACT |
| BC-11 | v2.1 and the Roadmap say no phase may start before a named stakeholder authorises it (Gate G-10, DEC-055). | Roadmap sec 0.1, Revision 6 | This document does not authorise development. Roadmap Phase 0 entry: G-00 and G-01 met, G-10 PENDING. | PENDING (G-10) |
| BC-12 | v2.1 requires an API contract inventory (DEP-015) taken from the Laravel code. A new backend has no inventory; DEP-006 extractions cannot be made. | v2.1 DEP-015, DEP-006, Roadmap RP-1 | The API contract must be authored after approval, not guessed; no endpoint is invented here. | PENDING (BE-DEC-15) |
| BC-13 | R1 Admin gap: v2.1 allocates user-side verification submission to R1 but Admin review to R3 (ROL-005, VER-002, ADM-004, Appendix K.1 item 17, AC-023). OD-03 resolves this in principle by requiring minimum Admin functionality in R1. The inventory is not derived. | v2.1, Revision 6 (CF-9) | R1 cannot be completed end to end without a minimum Web Admin. | PARTLY RESOLVED (inventory = OD-10, BE-DEC-17) |
| BC-14 | OD-07 requires reference data (industry, skill, business stage, risk level) to be defined anew for the new system. v2.1 does not define these lists. | Revision 6 (CF-10) | Skill, industry, stage and risk selections cannot be validated until defined. | OPEN (BE-DEC-10) |
| BC-15 | Source texts referred to by v2.1 but not supplied: NDA template text (DIS-005), Terms-of-Service and simulation-disclaimer text (SCP-011), Phase 5 readiness and matching requirements (SG-02, DEC-015). | Revision 6 (CF-11) | Content of these cannot be specified. | OPEN |
| BC-16 | Revision 6 records OD-01 as approach-only and states creation of the Backend Functional Specification is not separately authorised. | Revision 6 | This remains a requested DRAFT, not an approved baseline or development authorization. | PENDING (BE-DEC-20) |
| BC-19 | Business invitation, Custom Role, multi-role merging, permission catalogue, Deal/report/workspace delegation, revocation history/audit and release allocation require detailed decisions. | BR-DEC-001..012 | Requirements are gated; no unresolved option is selected. | PENDING |
| BC-20 | Unified inbox/category, pre-hire initiation, Team/Deal participation, unread/search/notification, history/retention, delivery, moderation and release details require decisions. | MSG-DEC-001..013; DEC-010 | Security invariants apply; technology/policy options remain unselected. | PENDING |
| BC-17 | No backend roadmap/plan exists (OD-02) and no non-production backend exists for the Roadmap Phase 0 proofs of concept (OD-06, CF-6). | Revision 6 (CF-4, CF-6) | Physical-device JWT proof of concept (BE-AUTH-017) cannot run yet. | OPEN |
| BC-18 | Authorship independence: v2.1, the Roadmap and the Review share one author; the Review asks for a human countersign. | Revision 6 (CF-7) | Countersign outstanding. | NOTED |

---

## 3. Roles and RBAC

### 3.1 Roles
| ID | Role | Notes | Label |
|---|---|---|---|
| BE-ROL-001 | Founder | Owns Businesses. Participant. Served by the mobile app. | FACT (MPS sec 5) |
| BE-ROL-002 | Investor | Sub-type Large or Small/Micro (profile attribute). Participant. Served by the mobile app. | FACT (MPS sec 5.2) |
| BE-ROL-003 | Skilled Professional | Participant. Served by the mobile app. | FACT (MPS sec 5.3) |
| BE-ROL-004 | Admin | Platform governance. Served by the separate Web Admin Dashboard, not by the mobile app. Never publicly self-registered. Provisioning method PENDING (OD-09, BE-DEC-16). Cannot hold a participant role (v2.1 matrix, dagger-flagged, source not located). | Separate web client and no self-registration: APPROVED (OD-03). "Cannot hold participant role": PROPOSED. |
| BE-ROL-005 | Multi-role accounts | One account may hold several participant roles with isolated workspaces. | FACT (v2.1 ROL-003); single vs multi-role conflict CONF-03; DEC-005 PENDING |
| BE-ROL-006 | Finance Manager | Business-scoped Professional role. May act only under current Founder grants; Deal negotiation requires explicit Deal-specific delegation. Never a global Founder or Admin. | NEW; BR-DEC-002/005/006 PENDING |
| BE-ROL-007 | Business Manager | Business-scoped Professional role with only granted Business/resource/action permissions. | NEW; BR-DEC-002/005 PENDING |
| BE-ROL-008 | Project Manager | Business-scoped Professional role for explicitly granted workspace, task and milestone resource/actions only. The title grants no automatic Business edit authority or formal Founder-side milestone completion certification. Exact delegable milestone actions remain PENDING. | NEW; BR-DEC-002/005/008 PENDING |
| BE-ROL-009 | Restricted Custom Role | Founder-defined label/permission set constrained by a server permission ceiling. Availability, catalogue and rules remain PENDING. | NEW; BR-DEC-003 PENDING |
| BE-ROL-010 | Business membership | Separate from global account roles; activation requires explicit invitation acceptance. One Professional may hold independent memberships/permissions in several Businesses. | NEW; BR-DEC-001/005 |
| BE-ROL-011 | Effective permission | Derived from current Business membership, grants, resource, action, Deal delegation and applicable disclosure/NDA/tier gates; default deny. Multi-role merge precedence remains PENDING. | NEW; BR-DEC-004/005 |
| BE-ROL-012 | Founder authority boundary | Founder controls Business membership/delegation and alone gives final Founder-side agreement confirmation. Investor confirmation remains independent. | NEW; BR-DEC-002/006 |

### 3.2 Backend capability matrix (Y = permitted, - = not permitted, C = conditional, see note)
| Capability | Founder | Investor | Professional | Admin (Web Admin) |
|---|---|---|---|---|
| Register / log in / manage own account | Y | Y | Y | Y (provisioned, not self-registered; method PENDING) |
| Hold more than one participant role | Y | Y | Y | - |
| Create and edit own profile | Y | Y | Y | - |
| Submit verification request | Y | Y | Y | - |
| Review verification requests | - | - | - | Y |
| Create / edit / publish own Business | Y | - | - | - |
| View published Business (Stage 1) | Y | Y | Y | Y |
| View Stage 2+ content | owner | C | C | C (limited, see ROL-006) |
| Express interest in a Business | - | Y | Y | - |
| Reciprocate or decline interest | Y | - | - | - |
| Accept NDA | Y | C (Tier>=1) | C (Tier>=1) | - |
| Participate in a Deal Room | C | C | C; includes Finance Manager only with explicit Business/Deal delegation | no default confidential access; explicit oversight only |
| Propose / counter / confirm terms | Founder: propose/counter/final Founder confirmation | Investor: propose/counter/independent final confirmation | Finance Manager: draft/counter only within grant; never final | - |
| Formally define and mark milestones complete under the preserved workflow | Y | - | - | - |
| Confirm milestone | - | C | C | - |
| Submit financial reports | Y | - | - | - |
| Flag discrepancy | - | C (funded deal) | - | - |
| Resolve discrepancy | - | - | - | Y |
| Submit feedback | C | C | C | - |
| View audit logs | - | - | - | Y |
| Suspend / restore users, moderate Businesses | - | - | - | Y |

Notes: C means the server must additionally check ownership or participation, disclosure stage, verification tier, Deal state and NDA status. Sensitive Admin actions require a reason and are audit logged. Admin never edits Business content, revenue, expenses or agreed terms and never executes or settles an investment (v2.1 ROL-007, ADM-018). Admin-only operations are not callable with participant credentials (BE-CLI-001). The release in which each Admin capability becomes available is stated in Section 5.19 and 11.4.

### 3.3 Business-role capability matrix (all grants conditional; detailed policies PENDING)
| Capability | Founder | Finance Manager | Business Manager | Project Manager | Custom Role |
|---|---|---|---|---|---|
| Invite/remove Business members and grant roles | Y | - | - | - | - |
| View Business resources | owner | C | C | C | C within ceiling |
| View/prepare/edit/submit financial reports | owner | C per action | C per action | - unless granted | C within ceiling |
| Draft/counter Deal proposals | Y | C Deal-specific | - unless explicitly granted | - | C within ceiling |
| Final Founder-side confirmation | Y only | - | - | - | - |
| Draft/update/assign/manage authorized tasks or milestones | Y | C per resource/action grant | C per resource/action grant | C per resource/action grant | C within ceiling |
| Formally mark milestone complete for Founder side | Y only under preserved workflow | - unless expressly resolved later | - unless expressly resolved later | - unless expressly resolved later | - unless expressly resolved later |
| Business Team Chat | Y | C | C | C | C |

No Business Role grants a global role, automatic access to another Business, unrestricted Business editing, publishing, deletion, ownership transfer or formal Founder-side milestone certification. Role title alone grants no resource action. Whether any ownership-sensitive operation or formal Founder-side milestone completion action can be delegated remains PENDING under the applicable BR-DEC cards and milestone decisions.

---

## 4. Cross-cutting backend requirements

| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-GEN-001 | The server is the sole authority for role, verification tier, disclosure stage, Deal state, milestone state, eligibility and scores. Clients never submit a target stage/state/tier; they request an action and the server decides. | PROPOSED (from FACT ARC-003, RP-6) | ARC-003, API-004 |
| BE-GEN-002 | Every protected operation authorises the authenticated principal, active role, resource ownership or participation, disclosure stage, verification tier and NDA status before returning or changing data. Denial returns no restricted data and does not reveal the existence of hidden resources. | PROPOSED | ROL-001, SEC-002 |
| BE-GEN-003 | All input is validated server-side regardless of client validation. Errors are field-level. Monetary amounts are non-negative exact decimals; ranges require minimum <= maximum. | PROPOSED | AUTH-007, PRO-005 |
| BE-GEN-004 | The error model distinguishes: not authenticated / session expired, forbidden, validation failure, not found, conflict (state), throttled, and server error, each with a stable machine-readable code. No stack traces, secrets or internal identifiers in responses. Authentication expiry must be distinguishable from transient server failure. | PROPOSED (audit defect: expiry and errors were conflated; legacy defects may inform design per G-01) | DEP-011, API-003, AUD web session finding |
| BE-GEN-005 | Every list, history, message, audit and admin collection is server-paginated with a bounded maximum page size. No unbounded collection is ever returned. | PROPOSED (audit defects) | DEP-010, MOB-075, AUD-D04, AUD-D07 |
| BE-GEN-006 | State-changing operations are atomic. Duplicate submissions (double tap, retry) must not apply twice. Concurrent confirmations (milestone, NDA acceptance, agreement) resolve deterministically. Business-level uniqueness is enforced (one interest per pair, one feedback per reviewer per Deal, one open verification request per user and level). | PROPOSED | MIL-003, REP-004, MOB-020 |
| BE-GEN-007 | Sensitive events are recorded in an append-only audit log (Section 5.21). The application never edits or deletes audit entries. | FACT (MPS sec 25.1 item 20) / PROPOSED mechanism | NFR-008 |
| BE-GEN-008 | Rate limits apply to login, registration, password reset, email and phone verification, uploads and AI generation (per user and global). Throttled responses are distinguishable. | PROPOSED | AUTH-013 |
| BE-GEN-009 | Secrets and provider keys live only in server-side configuration or a secret store. Never in clients, repositories, logs or responses. | PROPOSED | SEC-004, AI-024 |
| BE-GEN-010 | Timestamps are stored and returned unambiguously (UTC, ISO 8601). Money uses exact decimal arithmetic, never binary floating point. Rounding rule PENDING. | PROPOSED; rounding PENDING (DEC-007, PAY-005) | PAY-005 |
| BE-GEN-011 | The API is versioned. The backend can signal a minimum supported client version so the mobile app can force an update. Clients must tolerate unknown enum values. | PROPOSED | DEP-008, MOB-070, API-004 |
| BE-GEN-012 | Operational telemetry: latency, error rate, authorization denials, background-job failures, AI usage. No tokens, passwords, ID images or financial figures in logs. | PROPOSED | SEC-005 |
| BE-GEN-013 | Every payment, commission, investment, funding and milestone-funding result carries an explicit "simulated" indicator. No real payment processor, escrow, custody, card or bank credential exists. | FACT (MPS sec 20 / simulation scope) | PAY-004, SCP |
| BE-GEN-014 | Backend-generated text (emails, notifications, NDA, agreement, system messages) never claims guaranteed returns, regulatory KYC/AML, legal enforceability, fraud-proof reporting, or investment advice. | FACT (v2.1 prohibited-claim rules) | sec 13.5, AI-015 |
| BE-GEN-015 | Account deletion and data removal, retention periods and backups are undefined. | PENDING | PRV-003, DEC-026 |
| BE-GEN-016 | Non-production environments use synthetic data. Load tests exclude or mock any AI provider. | FACT / PROPOSED | LOAD-001..009 |
| BE-GEN-017 | Business rules in this document are configuration-free unless stated: weights, thresholds, limits and rates not given by the sources are not hard-coded by this document (see Section 13). | PROPOSED | AI-004, DEC-015 |
| BE-GEN-018 | Nothing from the legacy Laravel platform (code, framework dependencies, implementation, data, uncommitted payment branch) is reused or integrated. Legacy defects (AUD-D01..D13) may inform design as defects not to repeat. | APPROVED (G-01, OD-07) | G-01, OD-07 |
| BE-GEN-019 | Every Business-scoped protected operation evaluates current membership, effective grants, Business, resource, action and Deal scope in addition to global role and disclosure/NDA/tier rules. Role titles alone confer no access. | NEW; policy details PENDING | BR-DEC-004/005 |
| BE-GEN-020 | Revoking membership, a permission or Deal delegation blocks all subsequent unauthorized reads, writes, previews, searches, unread calculations and notifications without removing unrelated Business memberships. | NEW; enforcement required, history policy PENDING | BR-DEC-009/010; MSG-DEC-006/010 |
| BE-GEN-021 | Free-text messages never perform NDA acceptance, permission grant, Deal transition or final agreement confirmation. These require their structured authorized operations. | NEW | MSG-DEC-005/006; BR-DEC-006 |
| BE-GEN-022 | Business and Deal identifiers are tenant-isolation boundaries. Authorization is re-evaluated server-side rather than trusted from client context or cached membership claims. | NEW | BR-DEC-005/009; MSG-DEC-007 |

---

## 5. Functional requirements by module

### 5.1 Authentication and sessions (BE-AUTH)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-AUTH-001 | Registration with role choice among Founder, Investor, Professional. Admin accounts cannot be created through public registration. | FACT; Admin no-self-registration APPROVED (OD-03) | AUTH-001, ROL-002 |
| BE-AUTH-002 | Registration requires acceptance of the Terms of Service and the simulation disclaimer. Acceptance (document version, timestamp) is recorded. Text of these documents was not supplied. | FACT; text UNKNOWN (CF-11) | PRV-001, SCP-011 |
| BE-AUTH-003 | Email must be unique. A new account is Tier 0 with an unverified email. | FACT | AUTH-004 |
| BE-AUTH-004 | Password policy (length, composition) is not stated in any source. Passwords are stored only as salted hashes from an adaptive algorithm. | Policy values PENDING (BE-DEC-04); hashing PROPOSED | AUTH-007 |
| BE-AUTH-005 | Email verification uses a signed, single-purpose, expiring token. Resend is supported. An unverified email is never treated as verified. | FACT (signed verification observed in legacy) / PROPOSED mechanism | AUTH-004, AUTH-016 |
| BE-AUTH-006 | How a mobile user completes email verification and password reset (return link vs system browser vs code) is undecided. | PENDING (G-04 / DEC-052) | AUTH-016, AUTH-017 |
| BE-AUTH-007 | Phone verification foundation exists as a requirement. Real SMS provider vs simulated provider is undecided. | PENDING (DEC-016, OD-04, BE-DEC-07) | AUTH-005 |
| BE-AUTH-008 | Login by email and password issues a JWT-based session. The JWT family is approved; token model (access lifetime, refresh, rotation, revocation, storage) is undecided. | JWT family APPROVED (G-00); model PENDING (G-03 / DEC-003, BE-DEC-02) | DEC-003, DEC-053 |
| BE-AUTH-009 | Because a JWT is self-contained, logout and password change must invalidate sessions server-side by some revocation mechanism. Mechanism PENDING. | PROPOSED requirement; design PENDING (BE-DEC-02) | AUTH-009 |
| BE-AUTH-010 | Session lifetime, idle behaviour, re-authentication for sensitive actions (NDA acceptance, financial report submission, access to verification images), remote revocation and multi-device behaviour are not defined by any source. Also relevant to Web Admin sessions. | PENDING (G-05 / DEC-053, OD-11) | AUTH-018, AUTH-019 |
| BE-AUTH-011 | Password reset: request response never reveals whether the email exists. Reset token is single-purpose and expiring. Whether a reset ends other sessions is PENDING. | FACT / PENDING | AUTH-006, AUTH-008 |
| BE-AUTH-012 | Changing the password requires the current password. | PROPOSED | AUTH-007 |
| BE-AUTH-013 | A suspended account cannot authenticate or use protected operations. The reason is distinguishable and existing sessions are revoked. | PROPOSED | AUTH-010 |
| BE-AUTH-014 | Authorization decisions re-evaluate role, tier, stage and suspension on the server. Token claims are never the sole authority for state that can change. | PROPOSED | ARC-003 |
| BE-AUTH-015 | Admin authentication is separate from participant authentication. Admin accounts are not publicly self-registered (APPROVED, OD-03). Admin provisioning (OD-09), Admin web authentication and session transport (OD-11), "elevated auth" meaning (DEC-038) and the interaction with the P0/P1 prohibition (OD-08) are undefined. Principles ARC-006-C3 (admin isolation) still apply and now apply to the Web Admin. | Isolation principle FACT; design PENDING (DEC-038, BE-DEC-03, BE-DEC-16, BE-DEC-18) | ADM-016, ARC-006-C3 |
| BE-AUTH-016 | Authentication events (register, login success/failure, logout, reset, verification, suspension) are audit logged. | PROPOSED | AUTH-011 |
| BE-AUTH-017 | A native client must not be required to use browser-origin cookie conventions. JWT details must be proven by a proof of concept from a physical Android device before API freeze. The proof needs a non-production backend that does not yet exist (OD-06). | PROPOSED; prerequisite PENDING (OD-06, BE-DEC-09) | ARC-024, TST-006 |

### 5.2 Roles, multi-role and profiles (BE-USR)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-USR-001 | An account holds one or more participant roles. Enrol and remove role operations exist. Role data is isolated; no data bleed between roles. | FACT (multi-role) ; DEC-005 PENDING | ROL-003, SEC-007 |
| BE-USR-002 | Each request carries an active role. The server validates it against the enrolled roles. Where the active role is persisted (server vs client) is undecided. | PENDING (G-06 / DEC-047) | ROL-003-D, MOB-003 |
| BE-USR-003 | A user cannot gain a role by editing a profile field. | FACT (v2.1 rule) | ROL-003 |
| BE-USR-004 | Consequences of removing a role that owns Businesses, interests or Deals are not defined. | PENDING (BE-DEC-12) | UNKNOWN |
| BE-USR-005 | Founder profile: bio and structured prior-experience entries (role, duration, industry). The Business is a separate entity. | FACT | PRO-001 |
| BE-USR-006 | Investor profile: type (Large or Small/Micro); available, minimum and maximum investment (BDT); industry focus; risk level; business-stage preference; location preference; involvement level; investment-type interest. Ticket-size ranges conflict between MPS sections. Investment-type interest has no confirmed field. Selectable values come from reference lists (BE-REF-001). | FACT; CONF-04 and DEC-006 PENDING | PRO-002, PRO-003 |
| BE-USR-007 | Professional profile: skills with proficiency from a shared Skill reference list (BE-REF-001); structured experience; availability (hours per week, start date); compensation preference (salary, equity or hybrid, BDT range; equity percent is not a monetary value). | FACT | PRO-004 |
| BE-USR-008 | Profile completeness is computed by the server. The formula is not defined. | PENDING | PRO-006 |
| BE-USR-009 | Other users see only permitted profile parts. Sections gated by tier or stage are absent from responses, not merely hidden. | FACT / PROPOSED | PRO-007, DIS-009 |
| BE-USR-010 | Reverse Investment Discovery: an Investor may publish preferences so Founders can approach. Should-Have. | FACT (Should-Have) | PRO-009 |
| BE-USR-011 | A Founder may invite or hire a Professional into one identified Business with proposed Business Role context. The invitation is auditable and confers no protected access while pending. | NEW; lifecycle details PENDING | BR-DEC-001/002; BRM-001/002 |
| BE-USR-012 | Business membership activates only after the invited Professional explicitly accepts. Decline, expiry, withdrawal and re-invitation policies remain PENDING and are not invented. | NEW | BR-DEC-001 |
| BE-USR-013 | One Professional may hold memberships in several Businesses with different roles and permissions. Removing Business A membership does not affect Business B. | NEW | BR-DEC-004/005/009 |
| BE-USR-014 | Founder grants, changes and revokes Business Roles/permissions. Whether role administration or any ownership-sensitive Business operation may itself be delegated remains PENDING. Custom Roles cannot exceed the permission ceiling or grant global/Admin/Founder-final authority; no role title grants unrestricted Business editing. | NEW; details PENDING | BR-DEC-002/003/005 |

### 5.3 Verification (BE-VER)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-VER-001 | Tier 0 unverified; Tier 1 identity verified by manual Admin review; Tier 2 track-record verified, manual in the MPS MVP. | FACT | VER-001 |
| BE-VER-002 | A verification request contains ID and selfie or document evidence plus optional notes. Status values: pending, approved, rejected, more-information-requested. The Admin reason is returned to the applicant. | FACT (statuses from v2.1) | VER-002 |
| BE-VER-003 | Evidence is visible only to its owner and reviewing Admin. No public or shareable URL. | FACT | VER-003 |
| BE-VER-004 | Verification is never described as legal KYC/AML. | FACT | VER-005 |
| BE-VER-005 | Identity verification status and Financial Verification Status are separate and are never merged into one trust value. | FACT | VER-007 |
| BE-VER-006 | Tier 2 trigger and criteria are undefined. | PENDING (DEC-028) | VER-004 |
| BE-VER-007 | Tier gates: Stage 3 / NDA require Tier >= 1 (the exact source for this gate is unconfirmed; DEC-016 asks whether Tier 0 may participate). Interest at Tier 0 is permitted. | FACT (v2.1 ROL-005, CON-004); DEC-016 PENDING | ROL-005 |
| BE-VER-008 | Tier changes and decisions are audit logged with actor and reason. | FACT | SEC-003 |
| BE-VER-009 | Tier 1 review is performed by Admin through the Web Admin Dashboard. Because user-side submission is R1, the Admin review capability (BE-ADM-003) is required in R1. | APPROVED (OD-03 names Tier 1 verification review) | ROL-005, VER-002, ADM-004, AC-023 |

### 5.4 Business management (BE-BIZ)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-BIZ-001 | A Founder creates a Business as Draft and may autosave partial data. Drafts are visible only to the owner. | FACT / PROPOSED | BIZ-002 |
| BE-BIZ-002 | Business data groups: Basics, Business Model, Market and Competition, Team/Founder Capability, Funding Requirement, Traction/Customer Validation. The exact field list is not reconciled between sources and cannot be extracted from legacy code. | FACT groups; field list UNKNOWN (DEP-006 reframed as a design decision) | BIZ-001 |
| BE-BIZ-003 | Required skills are chosen from the shared Skill reference list (BE-REF-001). | FACT; list content PENDING | BIZ-005 |
| BE-BIZ-004 | Lifecycle: Draft -> submitted -> approved or rejected -> Published. Whether Admin approval is mandatory before publishing is not stated. If it is mandatory, a Web Admin approval action becomes an R1 dependency (candidate for OD-10). | FACT (steps observed in legacy); mandatory-gate PENDING | BIZ-006 |
| BE-BIZ-005 | Publishing runs publish-readiness validation and returns the reasons when refused. | PROPOSED | BIZ-006 |
| BE-BIZ-006 | Business ownership is enforced server-side: only the owning Founder holds ownership authority, and no Founder or Business member may edit, publish, delete or perform ownership-sensitive operations on another Founder's Business. Within the owned Business, a current member may edit only the specific Business resource/action expressly delegated by the owning Founder under BE-BIZ-014; a Business Role title grants no general edit authority. Publish, delete, ownership transfer and other ownership-sensitive delegation remain PENDING unless explicitly resolved. Every operation rechecks Business scope and current authorization; revocation blocks subsequent unauthorized actions. | FACT protection extended by NEW scoped delegation; ownership-sensitive delegation PENDING | BIZ-010; BR-DEC-005/008/009 |
| BE-BIZ-007 | A Founder may own several Businesses (default). | ASSUMPTION | BIZ-007 |
| BE-BIZ-008 | Unpublish or withdraw behaviour is undefined. | PENDING (DEC-031) | BIZ-012 |
| BE-BIZ-009 | Which investment types a Business enables, and where Investment Type is recorded, is undecided. | PENDING (G-09 / DEC-006) | BIZ-004 |
| BE-BIZ-010 | Multi-investor funding rules are undefined. | PENDING (DEC-039) | BIZ-012 |
| BE-BIZ-011 | Business photos are supported. | FACT | BIZ-001 |
| BE-BIZ-012 | A Business submission recomputes the Readiness Score (Section 5.8). | FACT | BIZ-003 |
| BE-BIZ-013 | Each active Business member has an effective permission view scoped to that Business; no membership or grant is inferred from a global Professional role. | NEW | BR-DEC-005 |
| BE-BIZ-014 | For resources within the Founder's own Business, the Founder may grant separate view, create, edit, assign, update, complete, approve and communicate actions scoped by Business, resource and action; default is deny. Such a grant does not confer full-Business edit, publish, delete, ownership-transfer or other ownership-sensitive authority. The exact permission catalogue and whether any ownership-sensitive operation is delegable remain PENDING. | NEW; permission catalogue and ownership-sensitive delegation PENDING | BR-DEC-005/008 |
| BE-BIZ-015 | The Business Team Workspace returns only authorized Business documents, operations, assigned tasks, milestones and Team conversations. | NEW | BR-DEC-008 |
| BE-BIZ-016 | Task and milestone assignments identify the Business, Deal where applicable, assignee, resource and separately permitted actions such as draft, update, assign or manage. A member cannot act on an unassigned or unauthorized resource solely because of role title. Assignment does not itself authorize formal Founder-side milestone completion certification or counterparty confirmation; exact delegable milestone actions remain PENDING. Every action is server-authorized in the correct Business/Deal scope, audited as applicable, and refused after revocation. | NEW; action boundaries PENDING | BR-DEC-005/008/009/011; DEC-014 |
| BE-BIZ-017 | Membership/permission changes take effect for subsequent protected requests and are audit logged. Historical visibility after removal remains PENDING. | NEW | BR-DEC-009/010/011 |
| BE-BIZ-018 | Business-role feature release allocation remains PENDING under G-07 and BR-DEC-012. These requirements do not assert R1 inclusion. | NEW | BR-DEC-012 |

### 5.5 Business documents and uploads (BE-DOC)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-DOC-001 | Business documents are PDFs. Verification evidence accepts PDF, JPEG, PNG. Server validates extension, content type and size. | FACT | API-008, SEC-010 |
| BE-DOC-002 | Allowed size limits and counts are not stated by any source. | UNKNOWN (BE-DEC-05) | DEP-006 reframed |
| BE-DOC-003 | Each document carries a stage tag: Public, Stage 2, Stage 3 (NDA), Stage 4. Only the owning Founder sets it. | FACT | DIS-008 |
| BE-DOC-004 | Documents are never publicly addressable. Access is only through an authorised request that checks disclosure stage. File storage approach is undecided. | FACT / PROPOSED; storage PENDING (OD-05, BE-DEC-08) | MOB-064 |
| BE-DOC-005 | Every Stage 2+ view or download is audit logged (viewer, time, document). The owner sees who viewed it and when. | FACT (legacy log models) / PROPOSED display | DIS-011, SEC-003 |
| BE-DOC-006 | Content scanning for malware and content-type sniffing checks for uploads. | PROPOSED | SEC-010 |
| BE-DOC-007 | Link fields on profiles and Businesses accept only http and https schemes. | PROPOSED | SEC-011 |
| BE-DOC-008 | A failed upload never leaves a silent partial record. | PROPOSED | MOB-062 |

### 5.6 Discovery and search (BE-DSC)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-DSC-001 | Discovery is role-scoped. Investors and Professionals discover published Businesses. Founders discover Investor and Professional profiles. | FACT | DSC-001 |
| BE-DSC-002 | Only published Businesses are returned. Drafts and non-public fields are never returned. | FACT | DSC-011 |
| BE-DSC-003 | Keyword search is deterministic, case-insensitive substring over structured fields. No fuzzy or semantic search. An empty query returns the full paginated, filtered set. | FACT (v2.1 rule) | DSC-002 |
| BE-DSC-004 | Filters exist only for facets backed by real data. The facet list is not reconciled. Investment-type filter and verification-tier filter are undefined. | PENDING (DEC-019 related; DSC-004, DSC-012) | DSC-003 |
| BE-DSC-005 | Default sort is most recently published or updated. | FACT | DSC-005 |
| BE-DSC-006 | Results are server-paginated with a bounded page size. | PROPOSED | DSC-008 |
| BE-DSC-007 | Match explanations come only from persisted or deterministic server data. Demo or locally synthesised explainability is never produced. | FACT (audit defect AUD-D03) | DSC-006, AI-013 |
| BE-DSC-008 | Search Results and AI Suggestions are distinct. A Premium boost may influence suggestion ranking but never hides legitimate results from search. | FACT | DSC-010, PRM-006 |
| BE-DSC-009 | Saved searches and alerts (Should-Have). | FACT (Should-Have; R3 proposed) | DSC-015 |

### 5.7 Interest, connection and applications (BE-INT)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-INT-001 | An Investor or Professional may express interest in a published Business. One-sided interest is a visible pending record. | FACT | CON-001 |
| BE-INT-002 | When both sides have expressed interest and no decline exists, a Connection is created referencing the Match Score. | FACT | CON-001 |
| BE-INT-003 | A Founder may decline. Decline is one mechanism across disclosure and connection. Whether interest may be re-expressed after decline is undefined. | FACT / PENDING (DEC-017) | CON-005, DIS-004 |
| BE-INT-004 | Professional applications have statuses Applied, Under Review, Interview/Negotiation, Offer, Joined, Declined. The unified status model is an assumption. | ASSUMPTION | CON-003 |
| BE-INT-005 | Tier 0 users may express interest. Higher-trust actions need Tier >= 1. | FACT (v2.1) | CON-004 |
| BE-INT-006 | Connection lists are filterable by pending, active, completed. | FACT | CON-002 |
| BE-INT-007 | Interest and application records are visible only to the participants (and read-only Admin). | PROPOSED | BE-GEN-002 |

### 5.8 Readiness score, matching and AI (BE-AI)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-AI-001 | The Investor Readiness Score is 0-100, deterministic and rule-based, over eight factors: Market Potential, Business Model Clarity, Competition, Scalability, Founder Capability, Funding Requirement Realism, Risk, Customer Validation. | FACT | AI-001 |
| BE-AI-002 | Weights and thresholds are fixed, documented and sum to 100 percent. The actual values are not in the supplied sources (Phase 5 requirements absent). | UNKNOWN / PENDING (DEC-015, CF-11) | AI-004 |
| BE-AI-003 | The response includes overall score, all factor scores, weak areas and rule-based improvement suggestions. Missing inputs are flagged incomplete. | FACT | AI-002, AI-005 |
| BE-AI-004 | Readiness inputs and assessments are versioned. A change in relevant inputs creates a new version. History is paginated. | FACT (versioning observed in legacy) | AI-006 |
| BE-AI-005 | Founder-to-Investor Match Score is 0-100% with documented factor weights: Industry 25, Investment Range 25, Business Stage 15, Risk Level 15, Location 10, Involvement 10. | FACT (MPS) | AI-010, AI-011 |
| BE-AI-006 | Founder-to-Professional Match Score uses suggested weights: Skill Overlap 35, Industry Experience 20, Experience Level 15, Availability 15, Location 10, Compensation 5. These are suggested, not confirmed. | FACT (suggested) / PENDING confirmation | AI-012 |
| BE-AI-007 | Weights are configurable, visible and auditable. Every match result exposes per-factor score and applied weight. | FACT | AI-013 |
| BE-AI-008 | AI Suggestions rank by Match Score, with an optional Premium boost that never hides legitimate results. | FACT | AI-014 |
| BE-AI-009 | Scores never influence disclosure, NDA, document access, verification tier, reputation or financial status. | FACT | AI-016, DIS-014 |
| BE-AI-010 | Scores are never presented as predictions, guarantees or investment advice. Cold-start limitations are disclosed. | FACT | AI-015 |
| BE-AI-011 | The backend never calculates or invents payouts or returns. | FACT | AI-017, INV-010 |
| BE-AI-012 | LLM-generated insights (business analysis, matching, deal, readiness, admin) are only in scope if DEC-042 approves. If approved: provider key server-side only; output validated against a schema; immutable versioned results; per-user and global quotas and budget limits; bounded retries with backoff; graceful degraded state; usage telemetry; no confidential or NDA-stage content sent to the provider unless approved. Insight text never alters scores or access. | PENDING (DEC-042, AI-028, BE-DEC-11) | AI-020..029 |
| BE-AI-013 | Admin read access to Readiness and Match scores. | Source unlocated (dagger) | PRO matrix |

### 5.9 Staged disclosure (BE-DIS)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-DIS-001 | A disclosure relationship exists per (Business, viewer). Stage 1 Teaser needs no record. | FACT | DIS-001, ROL-004 |
| BE-DIS-002 | Stage 2 Extended: granted when interest exists and the Founder has not declined. Automatic grant with revocable Decline is the stated default. | FACT / PENDING (DEC-017) | DIS-002 |
| BE-DIS-003 | Stage 3 NDA: requires both parties' NDA acceptance and viewer Tier >= 1. | FACT / DEC-016 PENDING | DIS-005, ROL-005 |
| BE-DIS-004 | Stage 4 Full Proposal: requires completed NDA plus an explicit Founder confirmation. Never automatic. | FACT | DIS-003 |
| BE-DIS-005 | No stage may be skipped. | FACT | DIS-003 |
| BE-DIS-006 | Restricted fields and documents are omitted from payloads at serialisation, not only flagged. Locked entries may list name and stage tag only. | FACT | DIS-008, DIS-009 |
| BE-DIS-007 | NDA uses a versioned platform template. Each party's acceptance records user, role, template version and timestamp. The template text was not supplied. | FACT; text UNKNOWN (CF-11) | DIS-005 |
| BE-DIS-008 | NDA request, accept and decline operations exist. NDA withdrawal and expiry are not defined and are not to be implemented or implied. | FACT / PENDING (DEC-017) | DIS-006, CONF-23 |
| BE-DIS-009 | The NDA is a confidentiality gate only, never an investment agreement and never claimed legally enforceable. | FACT | DIS-007 |
| BE-DIS-010 | Deal state NDA Signed is derived from the disclosure/NDA state, never set manually. | FACT | DLR-002 |
| BE-DIS-011 | All stage transitions and sensitive document access are audit logged. | FACT | SEC-003 |
| BE-DIS-012 | The current stage for the viewer is returned by the server on every relevant resource. | PROPOSED | DIS-010 |

### 5.10 Deal Room, negotiation and agreement (BE-DLR)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-DLR-001 | Deal lifecycle has eight states: Matched, Interest Confirmed, Deal Room Opened, NDA Signed, Negotiation, Agreement, Milestone Funding Active, Completed. | FACT (v2.1 DLR-001) | DLR-001 |
| BE-DLR-002 | A Deal is created on Connection (P7 default). Whether Matched is persisted, and how states behave when the NDA is already complete at Connection, is undecided. No legacy behaviour exists to check; this is a design decision. | PENDING (G-08 / DEC-043) | DLR-002 |
| BE-DLR-003 | Transitions are server-validated, history-recorded and audit-logged. No state is skipped. The client never sends a target state. | FACT | DLR-001, DLR-011 |
| BE-DLR-004 | Deal data is readable only by the Founder, counterparty and a Finance Manager with a current Founder-issued delegation for that exact Business and Deal. The delegate receives only permitted resources/actions and remains subject to disclosure, two-sided NDA, tier and Business-isolation rules. Admin has no default confidential Deal access; any necessary oversight exception must be explicitly authorized and audited. | NEW | DLR-007; BR-DEC-006/009; MSG-DEC-005/007 |
| BE-DLR-005 | Deal documents are a view over the stage-gated document set. No separate access path. | FACT / UNVERIFIED | DLR-005 |
| BE-DLR-006 | Cancelled, rejected or abandoned Deals: no state is defined. | PENDING (DEC-044, CONF-28) | DLR-013 |
| BE-DLR-007 | Funding semantics for Professional deals are undefined. | PENDING (DEC-045) | DLR-014 |
| BE-DLR-008 | A Deal has a participant summary and an activity log. Scheduling inside the Deal Room is Should-Have. | FACT | DLR-010 |
| BE-NEG-001 | Negotiation entries are versioned: proposer, terms, timestamp, status (proposed, countered, accepted). History is never overwritten. | FACT | NEG-001 |
| BE-NEG-002 | Terms payload by counterparty type: Micro (amount, profit/loss-sharing percent, reporting period); Large/Standard (amount, valuation basis, ownership percent); Founder-Professional (compensation, equity percent, start date, role scope). Final field list is undecided. | FACT intent; PENDING (CONF-06, DEC-006) | NEG-002..004 |
| BE-NEG-003 | Loss handling is explicit before acceptance. Type and terms cannot silently change mid-Deal; a change requires renegotiation. | FACT | NEG-004 |
| BE-NEG-004 | The Founder and Investor may propose/counter terms. A Finance Manager may submit versioned draft or counter-proposals only within a current Deal-specific Founder delegation. The Finance Manager and Admin cannot finalize or confirm for either participant. | NEW | NEG-005; BR-DEC-006/007/011 |
| BE-NEG-005 | Every Negotiation and Agreement view includes the Risk/Disclosure Notice text. | FACT | NEG-006, INV-008 |
| BE-AGR-001 | A read-only simulated Agreement is created only after the Founder personally gives final Founder-side confirmation and the Investor independently confirms the same final version. Finance Managers and Admin cannot supply either confirmation. Both timestamps and the exact confirmed version are retained; the Agreement is never represented as legally binding. | NEW | AGR-001; BRM-009; BR-DEC-006 |
| BE-AGR-002 | A downloadable Agreement document is undecided. | PENDING (DEC-035) | AGR-002 |
| BE-DLR-009 | Deal delegation identifies delegating Founder, represented Business, Deal, delegate, permitted actions, current status and audit history. Exact limit models remain PENDING. | NEW | BR-DEC-006/011 |
| BE-DLR-010 | Deal delegation revocation blocks subsequent delegated reads, messages and proposals without changing the underlying Founder/Investor participation. | NEW | BR-DEC-009 |
| BE-DLR-011 | Deal participants and clients can identify a delegated Finance Manager's Business representation and authorized role without exposing unrelated permissions. | NEW | MSG-DEC-005 |
| BE-DLR-012 | A delegate cannot add participants, grant Deal access, accept another party's NDA, change disclosure stage or escalate personal permissions. | NEW | BR-DEC-005/006 |
| BE-DLR-013 | Deal delegation release allocation remains PENDING under G-07 and BR-DEC-012. | NEW | BR-DEC-012 |
| BE-NEG-006 | Every delegated proposal is a new immutable version linked to its proposer and delegation context; no prior proposal is overwritten. | NEW | BR-DEC-006/011 |
| BE-NEG-007 | The server refuses proposals outside delegated actions/limits or after membership/delegation revocation. | NEW | BR-DEC-005/006/009 |
| BE-NEG-008 | Chat text, acknowledgements and proposal submission never constitute final agreement confirmation. | NEW | MSG-DEC-005/006 |
| BE-NEG-009 | Exact negotiation limit semantics remain PENDING; the backend shall not infer monetary or term ceilings not approved by the Founder under a defined policy. | NEW; PENDING | BR-DEC-006 |
| BE-AGR-003 | Founder and Investor confirmation operations are separate, authenticated, explicit, version-bound and audit logged. | NEW | BR-DEC-006/011 |
| BE-AGR-004 | A proposal change after either final confirmation invalidates completion until both parties confirm the same new version under the approved workflow. | NEW | Existing versioned agreement rule; BR-DEC-011 |
| BE-AGR-005 | No AI, Admin, Business Role or message may create or infer either final confirmation. | NEW | DEC-042; BR-DEC-006; MSG-DEC-006 |

### 5.11 Milestones (BE-MIL)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-MIL-001 | Milestones remain under the owning Founder's authority: description, BDT amount and sequence are formally defined by the Founder. A Project Manager or other Business member may draft, update, assign or manage only the exact milestone resource/actions expressly granted for the correct Business and Deal; role title or assignment alone is insufficient. Whether formal milestone-definition authority or other ownership-sensitive milestone actions can be delegated, and counterparty approval of the milestone structure, remain PENDING. | FACT / NEW scoped collaboration; PENDING (DEC-014, BR-DEC-008) | MIL-001; BR-DEC-005/008 |
| BE-MIL-002 | Statuses: Pending, In Progress, Completed, Disputed. | FACT (v2.1) | MIL-002 |
| BE-MIL-003 | Completion remains two-step: the Founder formally marks complete with notes or evidence, then the counterparty independently confirms. A Project Manager or other Business Role may prepare or manage authorized milestone data but does not gain the Founder-side formal completion action merely from role, assignment or general milestone access. Whether that formal Founder-side action can ever be expressly delegated remains PENDING under BR-DEC-008 and DEC-014. Both formal actions are separately authorized for the correct Business/Deal, timestamped and audit logged; revocation blocks subsequent delegated operations. The MPS wording "marked completed" conflicts (CONF-13). | FACT (v2.1 / UXP / P7) with NEW delegation boundary; CONF-13 and delegation open | MIL-003; BR-DEC-005/008/009/011; DEC-014 |
| BE-MIL-004 | The next milestone unlocks only after confirmation. | FACT | MIL-003 |
| BE-MIL-005 | Either party may flag a milestone Disputed. There is no Admin dispute-resolution workflow in the MVP; Admin has oversight only. DEC-014 option C remains PENDING and is not approved by OD-03. | FACT; DEC-014 PENDING | MIL-004 |
| BE-MIL-006 | Confirming the last milestone moves the Deal to Completed and triggers the feedback opportunity. | FACT | MIL-006 |
| BE-MIL-007 | "Release" of funds is a status change only. No real money moves. Amounts are labelled simulated. | FACT | MIL-007 |
| BE-MIL-008 | Milestone funding timing is not conflated with the return model. | FACT | MIL-008 |
| BE-MIL-009 | Progress updates carry author, content and optional attachment. | FACT | MIL-005 |

### 5.12 Investment types (BE-INV)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-INV-001 | Two investment types exist: Micro (profit/loss sharing, normally no ownership) and Large/Standard (agreed ownership, subject to the final legal structure). | FACT (MPS sec 15, ILS) | INV-001, INV-003 |
| BE-INV-002 | The type and its terms are recorded per Deal. There is no platform-wide percentage. | FACT | INV-002, INV-007 |
| BE-INV-003 | The platform does not invent payouts. Profit is not guaranteed. Loss sharing applies only if explicitly agreed. | FACT | INV-010, NEG-003 |
| BE-INV-004 | The two modes are never interchangeable in data or presentation. | FACT | INV-005 |
| BE-INV-005 | Whether per-Deal profit/loss and distributions are recorded is undefined. | PENDING (G-09 / DEC-006) | INV-006 |
| BE-INV-006 | Platform-wide minimum and maximum contribution per type are undefined (ILS examples are examples, not rules). | PENDING (DEC-011) | CONF-04 |
| BE-INV-007 | Investor eligibility, securities treatment and taxation are outside the MPS MVP and need legal review. | FACT | INV-011 |
| BE-INV-008 | Investor-side Portfolio view (Should-Have): total simulated committed, active and completed Deals, average Match Score, per-Deal financial verification status and discrepancy indication. Calculations are partly undefined. | FACT (Should-Have) / PENDING (DEC-040) | PTF-001..003 |

### 5.13 Financial transparency (BE-FIN)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-FIN-001 | Financial reports may be submitted only while the Deal is in Milestone Funding Active. | FACT | FIN-007 |
| BE-FIN-002 | Report fields: reporting period, revenue, expenses, optional cash position, notes, evidence files (multiple). | FACT | FIN-001 |
| BE-FIN-003 | Net profit or loss = revenue minus expenses, computed by the server and read-only. No client-supplied profit figure. | FACT | FIN-002 |
| BE-FIN-004 | Initial status is Self-Reported (no evidence) or Evidence Submitted, never higher. "Verified" is expressed as "Reviewed by Admin". | FACT | FIN-004, FIN-005 |
| BE-FIN-005 | Submitted reports are read-only. An edit creates a new versioned entry with a note. History remains visible. | FACT | FIN-006 |
| BE-FIN-006 | Evidence follows the same stage/NDA gating, storage protection and audit logging as Stage 3/4 documents. | FACT | FIN-009 |
| BE-FIN-007 | Reporting cadence, late and missing report handling are undefined. | PENDING (DEC-012) | FIN-012 |
| BE-FIN-008 | An Investor on a funded Deal may flag a discrepancy with a short structured reason and an optional neutral note. The flag sets the discrepancy to Needs Review and the report to Under Review. | FACT | FIN-008 |
| BE-FIN-009 | Discrepancy vocabulary (3 vs 4 values) and full Admin outcomes are undecided. Admin may resolve, mark disputed, or leave under review. | PENDING (CONF-12, DEC-013) | ADM-010 |
| BE-FIN-010 | Admin never edits figures or recomputes net. | FACT | ROL-007, ADM-009 |
| BE-FIN-011 | The platform never claims fraud-proof reporting. | FACT | BE-GEN-014 |
| BE-FIN-012 | Report visibility: Founder, Investor on the funded Deal, specifically authorized Business members, and only necessary Web Admin reviewers. Confidential; Admin never edits figures. | NEW | PRV-002; BR-DEC-007 |
| BE-FIN-013 | Financial permissions distinguish view, prepare draft, edit draft and submit/publish per Business/report. A Finance Manager role title alone grants none. | NEW; exact authority PENDING | BR-DEC-005/007 |
| BE-FIN-014 | Draft financial proposals/reports created by a delegate record actor, Business, permission context and version. | NEW | BR-DEC-007/011 |
| BE-FIN-015 | The server refuses financial reads/edits/submissions outside current Business membership and grants, including after revocation. | NEW | BR-DEC-005/009 |
| BE-FIN-016 | Exact report submission/attestation authority and release allocation remain PENDING. No delegated final Deal approval is implied by report authority. | NEW; PENDING | BR-DEC-007/012 |

### 5.14 Reputation and feedback (BE-REP)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-REP-001 | Reputation is per role, explainable and multi-sided, built from verified on-platform activity: verified milestone completions, Deal completions, tier changes (read-only inputs), feedback. | FACT | REP-001 |
| BE-REP-002 | Output is a qualitative tier, a trend, contributing factors and a chronological history that states the cause of each event. | FACT | REP-003 |
| BE-REP-003 | Feedback is allowed only on Completed Deals, once per reviewer per Deal, no self-review, no edit. | FACT | REP-004 |
| BE-REP-004 | Cancelled, rejected or abandoned Deals neither help nor penalise. This presupposes a state not yet defined (see BE-DLR-006). | FACT / PENDING | CONF-28 |
| BE-REP-005 | Reputation never guarantees returns and never replaces Financial Verification Status. | FACT | REP-007 |
| BE-REP-006 | The reputation formula and weights are undefined. | PENDING (DEC-028) | REP-006 |
| BE-REP-007 | Professional completion signal for reputation is unconfirmed. | PENDING (DEC-027) | REP-005 |
| BE-REP-008 | Admin adjustment and reputation analytics are Should-Have; adjustments are audit logged with a reason. | FACT (Should-Have) | REP-008, REP-009 |

### 5.15 Premium, payments and commission (BE-PRM, BE-PAY) - all simulated
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-PRM-001 | Free versus Premium feature sets per role are simulated entitlements. No real payment processing. | FACT (MPS sec 18) | PRM-001..005 |
| BE-PRM-002 | Pricing, plan names and durations are undefined. Whether subscriptions are real scope is undecided. | PENDING (DEC-008) | PRM-007 |
| BE-PRM-003 | If premium is kept, entitlements are enforced on the server, not only in clients. | PROPOSED | PRM |
| BE-PAY-001 | The platform simulates a commission of 3-5 percent. The exact rate, payer, trigger, rounding and display are undefined. | FACT range; PENDING (DEC-007, PAY-005) | PAY-001, PAY-005 |
| BE-PAY-002 | Commission applies identically regardless of investment type and may apply per funding tranche. | FACT | PAY-002, PAY-003 |
| BE-PAY-003 | Payment and commission figures are computed only on the server, using exact decimals, and returned as simulated records. Clients never compute them. | PROPOSED | PAY-006 |
| BE-PAY-004 | Simulated records are idempotent (a repeated action does not create a second record) and support reconciliation. The legacy payment branch is not a dependency. | PROPOSED; legacy branch not reused (G-01) | PAY-007 |
| BE-PAY-005 | No payment credentials, card or bank data are collected or stored. | FACT | PAY-004 |
| BE-PAY-006 | Platform revenue (simulated) is visible to Admin. | FACT | ADM-008 |

### 5.16 Messaging (BE-MSG)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-MSG-001 | Deal Room messages are visible only to the Founder, Investor/counterparty and an expressly authorized Finance Manager for that Business and Deal. Access obeys current Deal, Business, disclosure, two-sided NDA, tier and membership/delegation rules. Admin has no default private-message access. | NEW | MSG-001/004; MSG-DEC-005/007 |
| BE-MSG-002 | Message history is server-paginated and every page is authorization-filtered at read time. | NEW | MSG-004; MSG-DEC-006 |
| BE-MSG-003 | Messages are not scanned for off-platform contact details under the preserved MVP rule. This does not waive server authorization, abuse controls later approved, or metadata audit requirements. | FACT | MSG-003; MSG-DEC-012 |
| BE-MSG-004 | Delivery model, attachments, read receipts, presence, moderation, deletion, retention and provider choices remain PENDING. | PENDING | DEC-010; MSG-DEC-011/012 |
| BE-MSG-005 | One unified inbox exposes authorized All, Hiring, Deals and Team categories. Exact categorization/overlap rules remain PENDING. | NEW | MSG-DEC-001/002 |
| BE-MSG-006 | Conversation discovery/listing returns authorized conversation identity, type, Business/Deal context, participants/represented role, safe preview and unread count only. | NEW | MSG-DEC-001/006/008 |
| BE-MSG-007 | Hiring Chat may connect a Founder and Professional before membership. It grants no Business membership, Team Chat, Deal, report, document or NDA-protected access. Initiation/anti-abuse details remain PENDING. | NEW | MSG-DEC-003; BR-DEC-001 |
| BE-MSG-008 | Team Chat is bound to one Business and requires accepted active membership plus current messaging permission. | NEW | MSG-DEC-004; BR-DEC-005/009 |
| BE-MSG-009 | Deal Chat may include an authorized Finance Manager only under a current explicit Founder delegation for the exact Deal and Business; representation is visible. | NEW | MSG-DEC-005; BR-DEC-006 |
| BE-MSG-010 | Every discover, list, read, send, search, preview, unread, notify, join and leave action is authorized server-side against current context. | NEW | MSG-DEC-006/007/008/009 |
| BE-MSG-011 | Search and snippets return only currently readable conversations/content and cannot cross Business, Deal, disclosure or NDA boundaries. | NEW | MSG-DEC-007/008 |
| BE-MSG-012 | Safe previews and unread counts reveal no message content or relationship metadata after authorization is lost. | NEW | MSG-DEC-008/010 |
| BE-MSG-013 | Notifications for messages are generic by default and contain no confidential/NDA/financial text. Provider and user-preview policy remain PENDING. | NEW | MSG-DEC-009 |
| BE-MSG-014 | Membership, messaging-permission or Deal-delegation revocation blocks all subsequent message access and clears/invalidates authorization-sensitive derived data. | NEW | MSG-DEC-006/010; BR-DEC-009 |
| BE-MSG-015 | Historical visibility after revocation remains PENDING. Until approved, no interactive access is promised after authorization ends. | NEW; PENDING | MSG-DEC-010; BR-DEC-010 |
| BE-MSG-016 | Message retention, deletion and attachment handling remain PENDING; no destructive deletion or attachment capability is implied. | NEW; PENDING | MSG-DEC-011 |
| BE-MSG-017 | Polling versus WebSockets, receipts, presence and moderation/reporting remain PENDING; no technology is selected. | NEW; PENDING | DEC-010; MSG-DEC-012 |
| BE-MSG-018 | A message never accepts an NDA, advances disclosure/Deal state, grants permission or confirms an Agreement. | NEW | MSG-DEC-005/006 |
| BE-MSG-019 | Messaging authorization decisions and security-relevant membership changes are auditable without storing unnecessary confidential message content. | NEW | BR-DEC-011; MSG-DEC-006 |
| BE-MSG-020 | Messaging release allocation remains PENDING under G-07 and MSG-DEC-013. Security requirements apply to any category that is released. | NEW | MSG-DEC-013 |

### 5.17 Notifications (BE-NTF)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-NTF-001 | Notification events are recorded per user with read/unread state and are listable (paginated). | FACT | NTF-001 |
| BE-NTF-002 | The event catalogue is not in any source. Candidate events derived from workflows: verification decision, interest and connection, NDA request/acceptance, stage change, Deal state change, negotiation entry, agreement, milestone events, financial report events, discrepancy events, feedback request. | PROPOSED; catalogue PENDING (DEC-009) | NTF-002 |
| BE-NTF-003 | User preferences control delivery. Opt-out semantics, quiet hours and per-channel control are undefined. | PENDING (DEC-009) | NTF-004 |
| BE-NTF-004 | Push delivery to the mobile app requires device-token registration and lifecycle. Provider choice is undecided. Push payload text is generic and carries no confidential business or financial detail. | PENDING (DEC-022, OD-04, BE-DEC-06); generic text PROPOSED | NTF-003, ARC-025 |
| BE-NTF-005 | Notification deep links carry no authority; opening one re-runs server authorisation. | PROPOSED | MOB-081 |
| BE-NTF-006 | A notification inbox for Admin on the Web Admin Dashboard was not previously implemented. Whether it is part of the R1 minimum depends on the OD-10 inventory. | PENDING (DEP-013, OD-10, BE-DEC-17) | NTF-001-A |
| BE-NTF-007 | Message notification generation re-authorizes recipient/context at dispatch and omits unauthorized preview content. | NEW | MSG-DEC-006/009 |
| BE-NTF-008 | Revocation prevents subsequent confidential notification delivery; queued work rechecks authorization before sending. | NEW | BR-DEC-009; MSG-DEC-010 |
| BE-NTF-009 | Unread counters are computed only from currently authorized conversations and do not reveal hidden conversation existence. | NEW | MSG-DEC-008 |

### 5.18 Dashboards (BE-DSH)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-DSH-001 | Dashboards return data only for the active role. | FACT | DSH-001, SEC-007 |
| BE-DSH-002 | Metrics: Founder - Readiness Score, Active Connections, Deal Rooms Open; Investor - Active Deal Rooms; Professional - Active Applications, Deal Rooms, average Match Score. | FACT | DSH-002 |
| BE-DSH-003 | Metrics without a defined calculation or backing data (Profile Views, Portfolio Value, Saved Opportunities) are not produced until defined. | PENDING (DEC-040) | DSH-003 |
| BE-DSH-004 | Aggregations are computed efficiently (consolidated queries, short-lived caching permitted). | PROPOSED (audit finding on many separate aggregate queries) | AUD admin snapshot |

### 5.19 Web Admin capabilities (BE-ADM)
The Web Admin Dashboard is a separate client approved by OD-03 and consumes the same backend through REST. Admin never bypasses RBAC, stage-based access or NDA gating for participant content beyond what is stated. OD-03 requires minimum Admin functionality in Release 1 (including Tier 1 verification review and other essential approval actions). The exact minimum inventory is NOT derived (OD-10, BE-DEC-17). The column "R1 minimum" below uses three values: REQUIRED (named by the approved OD-03 text or by an R1 workflow that cannot complete without it), CANDIDATE (PROPOSED input for the OD-10 derivation, not approved), LATER (v2.1 R2/R3 allocation, subject to G-07). Whole-Admin release timing is PENDING (G-07).

| ID | Requirement | R1 minimum | Label | Trace |
|---|---|---|---|---|
| BE-ADM-001 | Dashboard summary: pending verifications, open reports, new users, active Deals. | CANDIDATE (queue counts for R1 queues) | FACT; release PENDING | ADM-002 |
| BE-ADM-002 | User directory: paginated, search and filter, view, suspend and restore with audited reason. | CANDIDATE (R1 includes suspended-account handling, AUTH-010) | FACT; release PENDING | ADM-003 |
| BE-ADM-003 | Verification queue: approve, reject, request more information, with a reason shown to the applicant. | REQUIRED (OD-03 names Tier 1 verification review; AC-023) | FACT; R1 APPROVED as a requirement of OD-03 | ADM-004, ROL-005, VER-002, AC-023 |
| BE-ADM-004 | Business moderation: flag, suspend listing, review. Admin never edits Business content. If Admin approval is mandatory before publishing (BE-BIZ-004), an approve/reject action is required. | CANDIDATE | FACT; mandatory-gate PENDING | ADM-005 |
| BE-ADM-005 | Application, Deal and Investment oversight: read-only plus Escalate. | LATER | FACT; release PENDING | ADM-006, ADM-007, ADM-008 |
| BE-ADM-006 | Financial report review and discrepancy handling (Section 5.13). Financial transparency is R2 in v2.1. | LATER (follows FIN release) | FACT; release PENDING | ADM-009, ADM-010 |
| BE-ADM-007 | Reports and disputes handling (Should-Have). | LATER | FACT (Should-Have) | ADM-011 |
| BE-ADM-008 | Reputation and Premium oversight. | LATER | FACT | ADM-012 |
| BE-ADM-009 | Audit log: read-only, immutable, searchable, paginated. | CANDIDATE (audit logging is R1 for documents) | FACT; release PENDING | ADM-013 |
| BE-ADM-010 | Analytics: aggregate descriptive analytics only. No forecasting model exists or is required. | LATER | FACT | ADM-014 |
| BE-ADM-011 | Settings. Matching-rule administration, notification-template administration and staff-tier RBAC were absent from the old system and are not in the MVP. Whether multiple admin grades are required is undecided. | LATER | PENDING (audit finding, ADM-015) | ADM-015, ADM-016 |
| BE-ADM-012 | Sensitive Admin actions require a reason and are audit logged. Admin cannot edit revenue/expenses, recompute net, alter agreed terms, fabricate evidence or execute/settle an investment. Applies to every Admin capability released, including the R1 minimum. | REQUIRED (applies to any R1 Admin action) | FACT | ROL-007, ADM-018 |
| BE-ADM-013 | Admin impersonation-for-support is not built unless decided. | NOT BUILT | PENDING (DEC-020; deferred in v2.1 CONF-22) | CONF-22 |
| BE-ADM-014 | "Elevated authentication" for Admin and the Web Admin session transport are undefined. | REQUIRED to exist before any Admin function (design PENDING) | PENDING (DEC-038, OD-08, OD-11, BE-DEC-03, BE-DEC-18) | ADM-016 |
| BE-ADM-015 | Admin access to confidential content is limited to what Section 3.2 and the sources state. | REQUIRED | FACT / PENDING (ROL-006) | ROL-006 |
| BE-ADM-016 | Admin account provisioning method (how accounts are created internally) is not defined. Public self-registration is prohibited. | REQUIRED to exist before any Admin function (method PENDING) | No self-registration APPROVED (OD-03); method PENDING (OD-09, BE-DEC-16) | ROL-006 |
| BE-ADM-017 | Admin-specific authorization and security requirements must be documented as a separate deliverable. Web Admin frontend technology and specification are undecided. | REQUIRED (documentation duty) | Duty APPROVED (OD-03); content and frontend PENDING (BE-DEC-19) | ARC-006-C3, SEC-014 |

### 5.20 Security and privacy (BE-SEC)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-SEC-001 | HTTPS only. Production headers, TLS, CORS and proxy trust are configured and verified before release. | FACT / UNVERIFIED | SEC-001, SEC-013 |
| BE-SEC-002 | Uploaded files cannot be executed or content-sniffed by the web server. | PROPOSED | SEC-010 |
| BE-SEC-003 | No raw string-built queries from user input. No dynamic code execution from user input. No unsafe deserialisation. | PROPOSED (audit positive findings are old-system facts) | audit sec 8 |
| BE-SEC-004 | Authentication, recovery, verification and uploads are rate limited. | PROPOSED | AUTH-013 |
| BE-SEC-005 | Role-scoped caches never leak data between roles or users. | PROPOSED | SEC-007 |
| BE-SEC-006 | Consent is recorded at registration. Third-party AI processing, if approved, is disclosed. | FACT / PENDING | PRV-001, PRV-005 |
| BE-SEC-007 | No sensitive data (tokens, passwords, ID images, financial figures) in logs or analytics. | PROPOSED | SEC-005 |
| BE-SEC-008 | Permissions matrix is verified by automated tests per role and per resource (cross-user access attempts included). Because the legacy H-01 check cannot transfer, this becomes a test of the new backend once built. | PROPOSED | TST-001, H-01 |
| BE-SEC-009 | Every Business, Deal, financial and messaging operation checks current membership, granular permission and resource context on the server; a role title alone is insufficient. | NEW | BR-DEC-005/006; MSG-DEC-006 |
| BE-SEC-010 | Business-scoped and Deal-scoped data is isolated across tenants, including lists, search, previews, unread counts, notifications and cached/derived data. | NEW | BR-DEC-008; MSG-DEC-007/008/009 |
| BE-SEC-011 | Membership, permission and delegation revocation invalidates authorization-sensitive caches and blocks subsequent requests and queued disclosures. | NEW | BR-DEC-009; MSG-DEC-010 |
| BE-SEC-012 | Search results, notification payloads and conversation previews are authorized before content is selected and reveal no inaccessible relationship or confidential content. | NEW | MSG-DEC-007/008/009 |
| BE-SEC-013 | Admin has no default access to confidential Deal content or private messages. Any necessary review access must be expressly defined, least-privilege and audited. | NEW | ROL-006; DLR-007; MSG-DEC-007 |
| BE-SEC-014 | Messaging and delegated actions cannot perform formal Founder confirmation, Investor confirmation, NDA acceptance, permission grants or state transitions. | NEW | BR-DEC-006; MSG-DEC-005/006 |

### 5.21 Audit logging (BE-AUD)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-AUD-001 | Each audit entry records actor, active role, action, target, timestamp, result, reason where applicable, and a before/after summary where applicable. | PROPOSED | SEC-003 |
| BE-AUD-002 | Mandatory audit events (MPS sec 25.1 item 20 and v2.1): document view/download at Stage 2+, verification decisions, Deal state changes, formal milestone completion and counterparty confirmation, financial report changes, discrepancy resolutions, Admin actions, role enrolment/removal, suspension, authentication events. | FACT list plus PROPOSED extensions | NFR-008; MIL-003 |
| BE-AUD-003 | Entries are append-only. Retention and archival are undefined. | PENDING (BE-DEC-14) | UNKNOWN |
| BE-AUD-004 | Business invitations, acceptance, membership changes, role assignments, granular grants/revocations and security-relevant task or milestone assignments generate audit events with actor, target Business/resource, permitted action and result. | NEW | BR-DEC-001/004/008/011 |
| BE-AUD-005 | Deal delegation and each versioned draft/counter-proposal record the acting user, represented Business/role, Deal, permission context, version and timestamp. | NEW | BR-DEC-006/011 |
| BE-AUD-006 | Conversation authorization failures and security-relevant membership/delegation changes are auditable without copying unnecessary confidential message content into audit logs. | NEW | MSG-DEC-006; BR-DEC-011 |
| BE-AUD-007 | Retention and historical visibility for membership and messaging records remain PENDING; audit requirements do not decide those policies. | NEW; PENDING | BR-DEC-010; MSG-DEC-010/011 |

### 5.22 Reference data and legacy data (BE-REF)
| ID | Requirement | Label | Trace |
|---|---|---|---|
| BE-REF-001 | Reference lists for industry, skill, business stage and risk level must be defined for the new system. They are not copied automatically from the old database. Their content, owner and maintenance process are undefined. Profiles, Business forms, discovery filters and match factors depend on them. | Requirement APPROVED (OD-07); content PENDING (BE-DEC-10, CF-10) | OD-07, BIZ-005, PRO-004 |
| BE-REF-002 | No existing legacy data (users, businesses, deals, other records) is migrated. The new MySQL database starts fresh. | APPROVED (OD-07 Option A) | OD-07 |
| BE-REF-003 | Whether other lists (location, investment-type interest, involvement level) are reference lists is not stated in the sources. | UNKNOWN | PRO-002 |

---

## 6. State models (functional)

### 6.1 Deal state
| From | To | Condition | Label |
|---|---|---|---|
| Matched | Interest Confirmed | Mutual interest and no decline | FACT / DEC-043 PENDING |
| Interest Confirmed | Deal Room Opened | Deal Room created for the Connection | FACT |
| Deal Room Opened | NDA Signed | Both parties accepted the NDA (derived) | FACT |
| NDA Signed | Negotiation | Negotiation opened | FACT |
| Negotiation | Agreement | Founder personally confirms the final Founder-side version and Investor independently confirms the same version | FACT |
| Agreement | Milestone Funding Active | Milestones defined and funding started (trigger detail UNKNOWN) | FACT / UNKNOWN |
| Milestone Funding Active | Completed | Last milestone confirmed | FACT |
| any | Cancelled / abandoned | No state defined | PENDING (DEC-044) |

### 6.2 Milestone state
Pending -> In Progress -> Completed (Founder marks, counterparty confirms). Any party may set Disputed. Resolution workflow for Disputed is not defined. FACT / PENDING.

### 6.3 Verification request
pending -> approved | rejected | more-information-requested -> (resubmission returns to pending). Decisions are made by Admin through the Web Admin Dashboard (R1 minimum, OD-03). FACT (v2.1 statuses).

### 6.4 Disclosure stage
Stage 1 (no record) -> Stage 2 (interest, not declined) -> Stage 3 (both NDA, Tier >= 1) -> Stage 4 (NDA complete and Founder confirmation). Decline blocks progress. No skipping. FACT.

### 6.5 Financial report
Self-Reported | Evidence Submitted -> Under Review (after discrepancy flag) -> Reviewed by Admin. Edit creates a new version. FACT.

### 6.6 Discrepancy
Needs Review -> Resolved | Disputed | Under Review. Vocabulary conflict: 3 vs 4 values. PENDING (CONF-12, DEC-013).

### 6.7 Business
Draft -> submitted -> approved | rejected -> Published. Admin suspension of a listing exists. Whether Admin approval is mandatory, and unpublish, are undefined. FACT / PENDING (BE-BIZ-004, DEC-031).

### 6.8 Negotiation entry
proposed -> countered | accepted. FACT.

### 6.9 Business invitation and membership
Invitation: pending -> accepted | declined | expired | revoked. Acceptance creates an active Business membership; invitation alone grants no Business access. Membership: active -> revoked. Reactivation mechanics and historical visibility remain PENDING. NEW / PENDING (BR-DEC-001/009/010).

### 6.10 Conversation access
Conversation access is derived from current category context, membership, permission and Deal delegation rather than a permanent message-level entitlement. Revocation blocks subsequent interactive access; historical visibility and retention remain PENDING. NEW / PENDING (MSG-DEC-006/010/011).

---

## 7. Data requirements (business level; NOT a schema)

Each entity lists business attributes and integrity rules. Column names, types and keys are deliberately not defined.

| Entity | Business attributes (from sources) | Integrity rules |
|---|---|---|
| Account | email, credential hash, status (active/suspended), email-verified flag, phone-verified flag, tier, consent records | email unique; Admin accounts provisioned internally (method PENDING) |
| Role enrolment | account, role, active flag | role set per account; Admin not combinable (dagger) |
| Business invitation | inviting Founder, invitee, Business, intended role, status, expiry, timestamps | pending invitation grants no access; acceptance required |
| Business membership | account, Business, Business role, status, accepted/revoked timestamps | an account may hold memberships in multiple Businesses; authorization is Business-specific |
| Business role definition / assignment | Business, role name, assignee, status | Founder, Finance Manager, Business Manager, Project Manager and restricted Custom Role semantics; title alone grants no action |
| Permission grant | Business, assignee, resource/action scope, grantor, validity/revocation | default deny; only current explicit grants count |
| Deal delegation | Business, Deal, member, permitted actions, grantor, validity/revocation | Deal-specific; cannot grant final agreement confirmation |
| Task / milestone assignment | Business or Deal, task/milestone, assignee, status | assignee must hold current applicable membership/authorization |
| Founder profile | bio, experience entries | one per account-role |
| Investor profile | type, available/min/max BDT, industry focus, risk, stage preference, location, involvement, investment-type interest (PENDING) | min <= max |
| Professional profile | skills with proficiency, experience, availability, compensation preference | BDT range valid |
| Reference list entry | list (industry, skill, business stage, risk level), value | content, owner and maintenance PENDING; defined anew, not copied from legacy |
| Verification request | account, evidence references, status, reviewer, reason | evidence private |
| Business | founder, descriptive groups, funding requirement (BDT), status, enabled investment types (PENDING) | owner-only edit |
| Business document | business, file reference, stage tag, uploader | stage tag by owner only |
| Document access log | document, viewer, time, action | append-only |
| Readiness input / assessment | business, inputs, version, overall score, factor scores | versioned, immutable per version |
| Match result | pair, overall, factor scores, applied weights, version | explainable |
| Interest | actor, business, status | one per pair |
| Connection | Founder, counterparty, match reference | created on mutual interest |
| Application (Professional) | applicant, business, status | status set per model |
| Disclosure relationship | business, viewer, stage, decline flag | no skipped stage |
| NDA acceptance | template version, user, role, timestamp | per party |
| Deal | Founder Business, Founder, Investor/counterparty, state, type reference | participant access plus current explicit Deal-specific delegation; Business isolation |
| Deal state history | deal, from, to, actor, timestamp | append-only |
| Negotiation entry | deal, proposer, represented party/Business, permission context, terms payload, version, status, timestamp | never overwritten; delegate may draft/counter only when expressly authorized |
| Agreement | deal, terms, Founder confirmation actor/timestamp, Investor confirmation actor/timestamp, simulation label | only Founder confirms Founder side; Investor independently confirms; read-only |
| Milestone | deal, description, BDT amount, sequence, status, notes, confirmations | ordered |
| Progress update | milestone or deal, author, content, attachment | |
| Investment terms | deal, type, amount, type-specific terms | per Deal (placement PENDING) |
| Financial report | deal, period, revenue, expenses, cash (optional), notes, derived net, status, version | read-only after submit |
| Report evidence | report, file reference | gated like Stage 3/4 documents |
| Discrepancy | report, flagging investor, reason, note, status | one flow per report |
| Feedback | deal, reviewer, subject, content | one per reviewer per Deal |
| Reputation event | subject, role, cause, effect, timestamp | explainable |
| Premium entitlement (simulated) | account, plan, validity | simulated |
| Payment / commission record (simulated) | deal, milestone/tranche, amount, rate, status | idempotent, labelled simulated |
| Conversation | category/context (Hiring, Business/Team or Deal), Business/Deal reference where applicable, participants, status | access derived from current context and authorization; category overlap rules PENDING |
| Conversation participation / access | conversation, account, represented Business/role, authorization basis, validity | Hiring does not imply membership; Team requires active membership; Deal delegate requires exact delegation |
| Message | conversation, sender, represented Business/role, content, timestamp | send/read authorization checked at action time; message cannot perform formal workflow actions |
| Conversation unread state | conversation, account, last-read/unread state | computed only for currently authorized conversations |
| Notification | recipient, event, read flag, timestamps | |
| Notification preference | account, per-event/channel settings (PENDING) | |
| Device registration | account, device token, platform | |
| Admin account | credential hash, status, provisioning record (method PENDING) | never self-registered |
| Audit log entry | actor, role, action, target, time, result, reason | append-only |
| AI insight (only if approved) | subject, version, content, fingerprint | immutable |

---

## 8. Client integration requirements

| ID | Requirement | Label |
|---|---|---|
| BE-CLI-001 | Two clients consume the same backend through REST: the mobile app (React Native, Expo, TypeScript; Founder, Investor, Professional only) and the Web Admin Dashboard. Admin-only operations are not callable by participants. | APPROVED (G-00, OD-03) |
| BE-CLI-002 | An API contract (operations, request/response shapes, auth requirements, error format, pagination) must be authored from the approved design before any client work. No endpoint is invented here. It cannot be extracted from legacy code (DEP-015, DEP-006 reframed). | PENDING (BC-12, BE-DEC-15) |
| BE-CLI-003 | The contract is machine-readable (for example OpenAPI) so that both clients can derive types. Choice of format PENDING. | PROPOSED |
| BE-CLI-004 | The backend signals minimum client version, tolerates unknown fields and enum values from clients, and returns server-driven stage, state and eligibility so clients never enforce access. | PROPOSED |
| BE-CLI-005 | File upload supports multipart with progress/cancel on mobile; no partial records. | PROPOSED |
| BE-CLI-006 | Deep links in emails (verification, reset) must resolve to a path the mobile app can complete (DEC-052). | PENDING |
| BE-CLI-007 | Web Admin Dashboard frontend technology and specification are undecided; the backend does not depend on them. | PENDING (OD-12, BE-DEC-19) |
| BE-CLI-008 | Clients receive current Business/Deal permission context sufficient to render available actions, but server authorization remains authoritative and is repeated on every operation. | NEW |
| BE-CLI-009 | Unified inbox responses distinguish conversation category/context and represented role; message UI cannot substitute for the separate formal NDA, state-transition or agreement-confirmation actions. | NEW |

---

## 9. Non-functional requirements

| ID | Requirement | Label |
|---|---|---|
| BE-NFR-001 | Capacity and latency targets are undefined; no concurrent-user capacity is claimed. Targets require a reference environment and measurement plan. | PENDING (DEC-025, DEC-050) |
| BE-NFR-002 | Every list endpoint is bounded; query counts for key screens are measured. | PROPOSED |
| BE-NFR-003 | Availability, backup and recovery objectives are undefined. | UNKNOWN |
| BE-NFR-004 | Logging and monitoring per BE-GEN-012. | PROPOSED |
| BE-NFR-005 | Test environments are isolated; production data is never used. | PROPOSED |
| BE-NFR-006 | Versions of Node.js, Express and MySQL, hosting and deployment are not decided. | PENDING (AS-5, OD-06, BE-DEC-09) |

---

## 10. Test and verification requirements

| ID | Requirement | Label |
|---|---|---|
| BE-TST-001 | Authorization matrix tests per role and resource, including cross-user access attempts. | PROPOSED (v2.1 TST-001) |
| BE-TST-002 | State machine tests: every allowed transition, every forbidden transition, no skipped state. | PROPOSED |
| BE-TST-003 | Concurrency tests: simultaneous interest creation, NDA acceptance, milestone confirmation, report submission, feedback submission, payment/commission record creation. | PROPOSED |
| BE-TST-004 | Pagination tests at large row counts; bounded maximum page size. | PROPOSED |
| BE-TST-005 | Disclosure tests: restricted fields absent from payloads at each stage; locked entries leak nothing. | PROPOSED |
| BE-TST-006 | Authentication tests including a proof of concept from a physical Android device (requires a non-production backend, OD-06); expiry vs server-error distinction; revocation. | PROPOSED; prerequisite PENDING |
| BE-TST-007 | Copy audit for prohibited claims in backend-generated text. | PROPOSED |
| BE-TST-008 | Rate-limit and upload-validation tests. | PROPOSED |
| BE-TST-009 | Money tests: exact decimal arithmetic and rounding once decided. | PROPOSED |
| BE-TST-010 | Admin isolation tests: Admin-only operations refuse participant credentials; participant operations do not expose Admin data; Admin actions without a reason are refused where a reason is required. | PROPOSED |
| BE-TST-011 | Invitation tests prove pending, declined, expired and revoked invitations grant no Business access and only accepted active membership is eligible for permissions. | NEW |
| BE-TST-012 | Multi-Business isolation tests prove a membership or permission in Business A grants no discovery, data, messaging, preview, unread or notification access in Business B. | NEW |
| BE-TST-013 | Granular-permission tests cover default deny, allowed Business/resource/action pairs, cross-Business denial, role-title-without-grant denial, ownership-sensitive operation denial and immediate post-revocation denial. Project Manager cases distinguish permitted task/milestone drafting or management from the non-automatic formal Founder-side completion action. | NEW |
| BE-TST-014 | Deal-delegation tests prove an expressly authorized Finance Manager can submit versioned drafts/counters only for the delegated Deal, while final Founder confirmation and Investor confirmation remain non-delegable. | NEW |
| BE-TST-015 | Revocation tests cover subsequent reads, writes, message operations, search, previews, unread counts, notification dispatch and authorization-sensitive cache invalidation. | NEW |
| BE-TST-016 | Unified-messaging tests authorize discover/list/read/send/search/preview/unread/notify/join/leave for Hiring, Team and Deal contexts and enforce Business, Deal, disclosure and NDA isolation. | NEW |
| BE-TST-017 | Tests prove Admin has no default private-message/confidential-Deal access and that messages cannot accept an NDA, grant permission, advance state or confirm an Agreement. | NEW |

---

## 11. Acceptance criteria and traceability

### 11.1 Acceptance criteria (Given / When / Then)
| ID | Criterion | Requirements |
|---|---|---|
| BE-AC-001 | Given a visitor who has not accepted the terms and simulation disclaimer, when they register, then registration is refused and nothing is created. | BE-AUTH-001, 002 |
| BE-AC-002 | Given a registered user with an unverified email, when they use protected features that require verification, then the server does not treat them as verified and the state is reported; a signed expiring token completes verification. | BE-AUTH-003, 005 |
| BE-AC-003 | Given an expired session, when a request is made, then the response is distinguishable from a transient server error. | BE-GEN-004, BE-AUTH-008 |
| BE-AC-004 | Given a password reset request for an unknown email, then the response is identical to that for a known email. | BE-AUTH-011 |
| BE-AC-005 | Given a suspended account, when it attempts any protected operation, then it is refused with a distinguishable reason. | BE-AUTH-013 |
| BE-AC-006 | Given a user holding two roles, when they request data under role A, then no role B data appears; given an active role not enrolled for the user, then the request is refused. | BE-USR-001, 002 |
| BE-AC-007 | Given a Founder, when they attempt to edit or publish another Founder's Business, then the server refuses. | BE-BIZ-006 |
| BE-AC-008 | Given a Draft Business, when any other user lists or opens it, then it is not returned. | BE-BIZ-001, BE-DSC-002 |
| BE-AC-009 | Given a document tagged Stage 3, when a Stage 2 viewer requests the Business, then the document is listed as a locked entry only and cannot be downloaded; the access is not logged as a download. | BE-DOC-003, BE-DIS-006 |
| BE-AC-010 | Given an authorised Stage 3 download, then an access log entry records viewer, time and document and the owner can see it. | BE-DOC-005 |
| BE-AC-011 | Given an upload of a disallowed type, then it is rejected with a clear error and no partial record exists. | BE-DOC-001, 008 |
| BE-AC-012 | Given filters and keyword search, then only published matching items return, in a bounded page, newest first by default. | BE-DSC-002, 003, 005, 006 |
| BE-AC-013 | Given a Business with missing readiness inputs, then the assessment flags incomplete inputs and does not present a bare number. | BE-AI-003 |
| BE-AC-014 | Given a match result, then overall score, per-factor score and applied weight are returned from server data; no demo data is ever returned. | BE-AI-007, BE-DSC-007 |
| BE-AC-015 | Given one-sided interest, then a pending record exists and no Connection; given mutual interest and no decline, then a Connection exists referencing the Match Score. | BE-INT-001, 002 |
| BE-AC-016 | Given a viewer who has not reached the required tier, when they try to accept the NDA, then the server refuses and states the upgrade path. | BE-DIS-003, BE-VER-007 |
| BE-AC-017 | Given Stage 2, when an advance to Stage 4 is attempted, then the server refuses (no skipped stage). | BE-DIS-005 |
| BE-AC-018 | Given both parties accepted the NDA, then the Deal state becomes NDA Signed without any manual action, and the acceptance records user, role, template version and timestamp. | BE-DIS-007, 010 |
| BE-AC-019 | Given a Deal, when a client requests a state change by naming a target state, then the server ignores the target and applies only valid transitions. | BE-DLR-003, BE-GEN-001 |
| BE-AC-020 | Given a person who is neither a Deal participant nor a currently authorized Deal-specific delegate, when they request Deal data, then nothing is returned and existence is not revealed. | BE-DLR-004 |
| BE-AC-021 | Given a counter-offer by a participant or expressly authorized Finance Manager, then a new versioned entry exists and earlier entries are unchanged; given Admin or an unauthorized/revoked delegate, submission is refused. | BE-NEG-001, 004, 006, 007 |
| BE-AC-022 | Given the Founder personally confirms the final Founder-side version and the Investor independently confirms the identical version, then a read-only Agreement exists with both timestamps and a simulation label; no delegate can supply either confirmation. | BE-AGR-001, 003 |
| BE-AC-023 | Given a milestone formally marked complete by the Founder, then the next milestone remains locked until the counterparty independently confirms; both actions are separately authorized, timestamped and logged. Given a Project Manager or other Business Role with only draft/update/assign/manage permission, the formal Founder-side completion action and counterparty confirmation are refused. | BE-MIL-003, 004, BE-BIZ-016 |
| BE-AC-024 | Given a double submission of a milestone confirmation, then it applies once. | BE-GEN-006 |
| BE-AC-025 | Given the last milestone is confirmed, then the Deal becomes Completed and feedback becomes possible. | BE-MIL-006, BE-REP-003 |
| BE-AC-026 | Given a financial report with revenue and expenses, then net is computed by the server and any client-supplied net is ignored; initial status is not higher than Evidence Submitted. | BE-FIN-003, 004 |
| BE-AC-027 | Given an edit to a submitted report, then a new version exists and the previous version remains readable. | BE-FIN-005 |
| BE-AC-028 | Given a flagged discrepancy, then discrepancy status is Needs Review and the report is Under Review; Admin cannot alter revenue, expenses or net. | BE-FIN-008, 010 |
| BE-AC-029 | Given a Completed Deal, then each eligible party may submit one feedback; a second submission and a self-review are refused. | BE-REP-003 |
| BE-AC-030 | Given any payment or commission result, then it is labelled simulated and no payment credential is accepted. | BE-GEN-013, BE-PAY-005 |
| BE-AC-031 | Given a list, history, message or audit endpoint, then the response is paginated with a bounded maximum page size. | BE-GEN-005 |
| BE-AC-032 | Given a sensitive Admin action, then a reason is required and an audit entry exists that cannot be edited. | BE-ADM-012, BE-AUD-001 |
| BE-AC-033 | Given a push notification payload, then it contains no confidential business or financial detail. | BE-NTF-004 |
| BE-AC-034 | Given backend-generated text, then it contains none of the prohibited claims. | BE-GEN-014 |
| BE-AC-035 | Given a pending Tier 1 verification request in Release 1, when an authenticated Admin approves, rejects or requests more information through the Web Admin Dashboard with a reason, then the applicant sees the status and reason and an audit entry exists. (Trace: v2.1 AC-023 completion.) | BE-VER-002, 009, BE-ADM-003, 012 |
| BE-AC-036 | Given participant credentials, when an Admin-only operation is attempted, then it is refused; given Admin credentials, when a participant-only action is attempted on behalf of a party, then it is refused. | BE-CLI-001, BE-ADM-012, BE-TST-010 |
| BE-AC-037 | Given a fresh deployment, then no legacy user, business, deal or other record exists, and selectable reference values come only from lists defined for the new system. | BE-REF-001, 002 |
| BE-AC-038 | Given an attempt to create an Admin account through public registration, then it is refused. | BE-AUTH-001, BE-ADM-016 |
| BE-AC-039 | Given a pending, declined, expired or revoked Business invitation, when the invitee requests Business or Team resources, then access is refused; after acceptance, only explicitly granted actions are available. | BE-USR-011, 012, BE-BIZ-013, 014 |
| BE-AC-040 | Given one user with memberships in two Businesses, when acting in Business A, then Business B data, conversations, previews, unread counts and notifications are absent. | BE-USR-013, BE-GEN-022, BE-SEC-010 |
| BE-AC-041 | Given a Business role title without the required resource/action grant, when the member attempts Business editing or a task/milestone action, then the server refuses it. A scoped edit grant permits only its named resource/action and does not permit publish, delete, ownership transfer or formal Founder-side milestone completion. | BE-ROL-011, BE-BIZ-006, 014, 016, BE-MIL-003, BE-SEC-009 |
| BE-AC-042 | Given a Finance Manager explicitly delegated proposal permission for one Deal, when they submit a draft or counter-proposal, then a new immutable version records their identity and represented Business; the same action on another Deal is refused. | BE-DLR-009, BE-NEG-006, 007, BE-AUD-005 |
| BE-AC-043 | Given any Finance Manager, Business Manager, Project Manager, Custom Role or Admin, when they attempt final Founder-side agreement confirmation, then it is refused; only the Founder may confirm that side and the Investor independently confirms theirs. | BE-ROL-012, BE-NEG-008, BE-AGR-001, 003 |
| BE-AC-044 | Given a revoked membership, permission or Deal delegation, when any subsequent protected or messaging action occurs, then it is refused and no confidential preview, search result, unread count or queued notification is disclosed. | BE-MSG-014, BE-NTF-008, BE-SEC-011 |
| BE-AC-045 | Given Hiring Chat before membership, then participants can access only that authorized Hiring conversation and receive no Team, Business, Deal, document or NDA-protected access. | BE-MSG-007, BE-SEC-009 |
| BE-AC-046 | Given Team or Deal Chat, then every discover, list, read, send, search, preview, unread, notify, join and leave action is re-authorized against current Business/Deal context. | BE-MSG-008, 009, 010, 011 |
| BE-AC-047 | Given a message or message notification, then it cannot accept an NDA, grant permission, advance disclosure/Deal state or confirm an Agreement, and confidential text is absent from notification payloads. | BE-MSG-013, 018, BE-SEC-014 |
| BE-AC-048 | Given Admin credentials without a separately defined necessary review authority, when private messages or confidential Deal content are requested, then access is refused and existence/content is not disclosed. | BE-DLR-004, BE-SEC-013, BE-TST-017 |

### 11.2 Traceability: MPS sec 25.1 Must-Have items (21) to backend modules
| # | MPS Must-Have item | Backend modules | Release (PROPOSED, follows v2.1 Option A pending DEC-034; corrected for OD-03) |
|---|---|---|---|
| 1 | Authentication and role-based profiles | BE-AUTH, BE-USR, BE-ROL, BE-BIZ-013..018, BE-REF | Existing R1 functions; Business-role feature allocation PENDING (BR-DEC-012, G-07) |
| 2 | Founder business submission | BE-BIZ, BE-DOC | R1 (Admin approval action if BE-BIZ-004 gate is mandatory: Web Admin R1 candidate) |
| 3 | Investor opportunity/preference profiles | BE-USR-006 | R1 |
| 4 | Skilled professional profiles | BE-USR-007 | R1 |
| 5 | Search and advanced filtering | BE-DSC | R1 |
| 6 | AI business analysis / Readiness Score (rule-based) | BE-AI-001..004 | R1 |
| 7 | AI matching engine | BE-AI-005..007, 009..011 | R1 |
| 8 | AI Suggestions | BE-AI-008, BE-DSC-008 | R1 |
| 9 | Staged information disclosure | BE-DIS | R1 |
| 10 | NDA workflow | BE-DIS-003, 007..009 | R1 |
| 11 | Deal Room | BE-DLR, BE-NEG, BE-AGR, BE-MSG, BE-MIL | Existing Deal Room functions R1; expanded Business-role and unified-messaging allocation PENDING (BR-DEC-012, MSG-DEC-013, G-07) |
| 12 | Investment type selection | BE-INV, BE-NEG-002 | R2 (PENDING DEC-006) |
| 13 | Financial transparency and reporting | BE-FIN | R2 |
| 14 | Investor discrepancy flagging with basic Admin review | BE-FIN-008..010, BE-ADM-006 | R2 (Admin review via Web Admin follows the FIN release) |
| 15 | Milestone-based investment simulation | BE-MIL, BE-PAY | R1 (milestones); R2 (payments) |
| 16 | Reputation system (basic) | BE-REP | R1 |
| 17 | Tiered verification | BE-VER, BE-ADM-003 | R1 including the Web Admin verification review (REQUIRED by OD-03; v2.1 had placed Admin review in R3) |
| 18 | Premium subscription simulation | BE-PRM | R2 |
| 19 | Admin dashboard | BE-ADM | Minimum Web Admin functionality R1 (APPROVED, OD-03; inventory PENDING, OD-10); full Admin release PENDING (G-07). v2.1 placement of Admin on mobile in R3 is superseded in direction (change request, BC-05). |
| 20 | Basic audit logging | BE-AUD, BE-DOC-005, BE-FIN-005, BE-ADM-009 | R1 (documents, verification decisions, authentication, Admin actions); R2 (financial); Admin audit-log view is an OD-10 candidate |
| 21 | Notifications (basic) | BE-NTF | R1 in-app; R2 push |

Release allocation is a PROPOSAL carried from the corrected mobile specification and corrected only where OD-03 requires it. G-07, DEC-034 and DEC-054 remain PENDING. Business Roles and Unified Messaging do not acquire a release merely by appearing in this functional specification. MPS equivalence depends on the mobile app and the Web Admin Dashboard together (Decision Register Revision 6 section 7.1).

### 11.2.1 Revision 6 card traceability
All card statuses below remain PENDING; this table records coverage, not approval or release allocation.

| Decision cards | Backend coverage |
|---|---|
| BR-DEC-001..004 | BE-USR-011..014, BE-BIZ-015, BE-AUD-004 |
| BR-DEC-005..008 | BE-ROL-006..012, BE-BIZ-013..016, BE-DLR-009..013, BE-NEG-006..009, BE-FIN-013..016, BE-SEC-009..010 |
| BR-DEC-009..012 | BE-BIZ-017..018, BE-MSG-014..015/019..020, BE-SEC-011, BE-AUD-004..007 |
| MSG-DEC-001..004 | BE-MSG-005..008 |
| MSG-DEC-005..009 | BE-MSG-009..013, BE-NTF-007..009, BE-SEC-009..012 |
| MSG-DEC-010..013 | BE-MSG-014..017/020, BE-AUD-007 |

### 11.3 Should-Have items and Future Scope exclusions
| Item | Status in this document | Module |
|---|---|---|
| Reverse Investment Discovery | Included (Should-Have, R3 proposed) | BE-USR-010 |
| Portfolio dashboard | Included (Should-Have, R2 proposed) | BE-INV-008, BE-DSH |
| Saved searches / alerts | Included (Should-Have, R3 proposed) | BE-DSC-009 |
| Basic dispute reporting to Admin | Included (Should-Have, R3 proposed; Web Admin side) | BE-ADM-007 |
| Deal Room meeting scheduling | Included (Should-Have, R3 proposed) | BE-DLR-008 |
| Profile / reputation analytics views | Included (Should-Have, R3 proposed) | BE-REP-008 |
| ML ranking, NLP pitch-deck analysis, learned weights, vector stores, fairness tooling | EXCLUDED (Future Scope) | none |
| Real payments, escrow, custody, real payment processor | EXCLUDED (Future Scope) | none |
| Predictive analytics / forecasting | EXCLUDED (does not exist; not required) | none |
| Admin impersonation-for-support | NOT BUILT; DEC-020 PENDING (deferred in v2.1 CONF-22) | BE-ADM-013 |
| Staff-tier RBAC, matching-rule administration, notification-template administration | NOT IN MVP; need-based, PENDING | BE-ADM-011 |
| Legal KYC/AML, securities and tax treatment | EXCLUDED (needs legal review) | BE-INV-007 |

The Future Scope list is taken from v2.1 Appendix K.3. Verify it against MPS sec 27 before baseline.

### 11.4 Release 1 scope reconciliation (PROPOSED; G-07 PENDING)
1. Existing proposed R1 modules remain BE-AUTH, BE-USR, BE-VER, BE-BIZ, BE-DOC, BE-DSC, BE-INT, BE-AI (rule-based), BE-DIS, BE-DLR/NEG/AGR/MSG/MIL, BE-REP, BE-NTF (in-app), BE-DSH (R1 metrics), BE-SEC, BE-AUD and BE-REF. This statement does not allocate the newly reconciled Business Roles or Unified Messaging capabilities; their allocation remains PENDING under BR-DEC-012, MSG-DEC-013 and G-07.
2. Minimum Web Admin in R1 (OD-03, APPROVED): REQUIRED items are the Verification queue (BE-ADM-003), reason-and-audit rule for Admin actions (BE-ADM-012), Admin authentication and provisioning to exist (BE-ADM-014, BE-ADM-016), Admin confidential-content limits (BE-ADM-015) and the documentation duty (BE-ADM-017). CANDIDATES for OD-10: BE-ADM-001, 002, 004, 009 and, if raised by an R1 gate, an Admin notification inbox (BE-NTF-006). All other BE-ADM rows are LATER.
3. The minimum inventory is not derived and is not approved. The list in item 2 is an input to OD-10, not a decision.
4. Contradictions resolved in prior and current editions: Edition 0.1 listed Admin release as "PENDING" and BE-ADM-003 with no R1 marker, despite R1 verification submission; Edition 0.2 stated the R1 verification-review requirement of OD-03 and kept the exact inventory PENDING. Editions 0.3 and 0.4 preserve that boundary while integrating Revision 6 Business Roles and Unified Messaging without assigning them a release.
5. R2: BE-INV, BE-FIN (with BE-ADM-006), BE-PRM, BE-PAY, push (BE-NTF-004). R3: Should-Have items in 11.3 and BE-ADM LATER rows. All subject to G-07.

---

## 12. Decisions and approval gates

### 12.1 Backend decisions raised by this document
Numbering is continuous BE-DEC-01 to BE-DEC-21. Cross-references to DECISIONS Revision 6 labels are given so that no decision is tracked twice under conflicting names.

| ID | Decision | Options (none chosen) | Status | Revision 6 reference |
|---|---|---|---|---|
| BE-DEC-01 | Receipt and reconciliation of DECISIONS Revision 6 | received / reconciled | CLOSED in this edition; no substantive decision is approved by receipt | Section 0.2 |
| BE-DEC-02 | JWT session model: access lifetime, refresh, rotation, revocation, client storage, logout semantics | to be proposed with evidence from a physical-device proof of concept | PENDING | G-03 / DEC-003, G-05 / DEC-053 |
| BE-DEC-03 | Resolution of the JWT versus original-specification conflict (P0/P1 prohibition, v2.1 CONF-02), including browser-based Web Admin authentication. No statement that the prohibition does not apply is made. | owner resolution | PENDING | OD-08 / CF-1 |
| BE-DEC-04 | Password policy values | to be proposed | PENDING | - |
| BE-DEC-05 | Upload limits (size, count, types per context) | to be proposed | PENDING | - |
| BE-DEC-06 | Push provider and device-token model | to be proposed | PENDING | OD-04, DEC-022 |
| BE-DEC-07 | Email and SMS delivery providers; real vs simulated phone verification | real / simulated | PENDING | OD-04, DEC-016 |
| BE-DEC-08 | File storage approach and access method | to be proposed | PENDING | OD-05 |
| BE-DEC-09 | Hosting, environments and deployment, including the Phase 0 non-production test backend; versions of Node.js, Express and MySQL | outside this document | PENDING | OD-06, AS-5 |
| BE-DEC-10 | Reference data lists (industry, skill, business stage, risk level): content, who defines them, how they are maintained. Approach of defining them anew is approved; content is not. | to be proposed | PENDING | OD-07 (approved), CF-10 |
| BE-DEC-11 | LLM insight provider and scope | none / one provider | PENDING | DEC-042 |
| BE-DEC-12 | Behaviour when a role with owned data is removed | to be proposed | PENDING | - |
| BE-DEC-13 | Account deletion and data removal policy | to be proposed | PENDING | DEC-026 |
| BE-DEC-14 | Audit and data retention periods | to be proposed | PENDING | - |
| BE-DEC-15 | API contract format and ownership; who authors it after approval | to be proposed | PENDING | DEP-015, OD-01 |
| BE-DEC-16 | Admin account provisioning | to be proposed | PENDING | OD-09 |
| BE-DEC-17 | Minimum Release 1 Admin feature inventory, derived from the requirements and documented | derivation | PENDING | OD-10 |
| BE-DEC-18 | Web Admin authentication and session design (linked to BE-DEC-03, DEC-038, G-05) | to be proposed | PENDING | OD-11 |
| BE-DEC-19 | Web Admin Dashboard frontend technology and specification | to be proposed | PENDING | OD-12 |
| BE-DEC-20 | Owner authorisation record for creating the Backend Functional Specification (OD-01 creation) | record / withhold | PENDING (not recorded in Revision 6) | OD-01 |
| BE-DEC-21 | Backend roadmap and plan | to be proposed | PENDING | OD-02 |

### 12.2 Inherited decisions
Exactly five decisions are APPROVED in Revision 6 and used here: G-00 (backend target), G-01 / DEC-046 Option A, OD-03, OD-07, and OD-01 (approach only).

Closed, superseded or reserved in the corrected mobile specification (Decision Register Revision 6): DEC-001 closed (the audit is historical reference); DEC-029 superseded (no mandated visual design system); DEC-002, 021, 023, 024, 032, 033, 036, 037 reserved (not decisions).

Still PENDING in Revision 6 and affecting the backend: G-02 / DEC-022 (NEEDS VERIFICATION), G-03 / DEC-003, G-04 / DEC-052, G-05 / DEC-053, G-06 / DEC-047, G-07 / DEC-034 and DEC-054, G-08 / DEC-043, G-09 / DEC-006, G-10 / DEC-055, DEC-004 (Admin on mobile; not approved by OD-03), DEC-005, DEC-007, DEC-008, DEC-009, DEC-010, DEC-011, DEC-012, DEC-013, DEC-014, DEC-015, DEC-016, DEC-017, DEC-018, DEC-019, DEC-020, DEC-025, DEC-026, DEC-027, DEC-028, DEC-030, DEC-031, DEC-035, DEC-038, DEC-039, DEC-040, DEC-041 (not formally closed by G-01), DEC-042, DEC-044, DEC-045, DEC-048, DEC-049, DEC-050, DEC-051, BR-DEC-001..012 and MSG-DEC-001..013. None is approved by this document.

### 12.3 Approval gates before any backend development
1. Use DECISIONS Revision 6 as the authoritative register; resolve or accept remaining BC items and the PENDING Business Roles and Unified Messaging cards without treating reconciliation as approval.
2. Record the owner's authorisation for creating and baselining this specification (BE-DEC-20); backend roadmap and plan (BE-DEC-21, OD-02).
3. Resolve BE-DEC-03 (OD-08) first, then BE-DEC-18 (OD-11) with BE-DEC-16 (OD-09) and DEC-038 / G-05 as linked items.
4. Derive and approve the minimum R1 Admin inventory (BE-DEC-17, OD-10) from the requirements.
5. Provide a non-production test backend (BE-DEC-09 / OD-06), then approve G-10 (DEC-055 owners and development authorisation).
6. Approve release scope and name (G-07: DEC-034, DEC-054) for the new backend and Web Admin.
7. Approve BE-DEC-02 (G-03 / DEC-003, G-05) with physical-device evidence; then G-04, G-06; G-02 after the phone proof of concept.
8. Define reference data (BE-DEC-10) and supply the missing source texts (NDA, Terms of Service, simulation disclaimer, Phase 5) (BC-15).
9. Author the API contract and data design from this specification (BC-12, BE-DEC-15).
10. A named stakeholder records authorisation to start (Roadmap Gate G-10).
11. Resolve the applicable BR-DEC-001..012 and MSG-DEC-001..013 policy choices and allocate their release scope through G-07 before implementation of those pending capabilities.

---

## 13. Unresolved questions and UNKNOWN items

1. Exact Business invitation expiry/decline mechanics, Custom Role limits, permission-grant inventory and revocation/historical-visibility rules (BR-DEC-001..012).
2. Readiness Score factor weights and thresholds (DEC-015); Phase 5 source absent.
3. Exact Business and profile field lists; facet list for discovery; content of the reference lists (BE-DEC-10).
4. Password policy, upload limits, session lifetimes.
5. Commission rate, payer, trigger, rounding (3-5 percent range only).
6. Premium pricing and plan structure.
7. Notification event catalogue and preferences.
8. Non-completion Deal state and its reputation effect.
9. Professional-deal funding semantics.
10. Reporting cadence and late-report handling.
11. Minimum R1 Admin inventory, Admin provisioning, Web Admin authentication and session transport, "elevated authentication", admin grades.
12. Hosting, versions, availability, backup and recovery objectives; non-production test backend.
13. Whether a backend LLM insight layer is in scope.
14. Legal position on investor eligibility, securities and taxation.
15. Text of the NDA template, Terms of Service and simulation disclaimer.
16. Resolution of the JWT versus P0/P1 prohibition conflict (OD-08).
17. Authorisation record for this specification and the backend roadmap (BE-DEC-20, BE-DEC-21).
18. Unified inbox categorization, conversation initiation/participants, delivery technology, attachments, receipts, presence, moderation, retention/deletion, historical visibility and release allocation (MSG-DEC-001..013).

---

## 14. Glossary
- **Stage 1-4:** disclosure stages (Teaser, Extended, NDA, Full Proposal).
- **Tier 0-2:** verification tiers.
- **Simulated:** no real money, escrow, custody or legal effect.
- **Micro / Large-Standard:** the two investment types.
- **Active role:** the participant role the user is currently acting under.
- **Web Admin Dashboard:** the separate browser-based Admin client approved in OD-03.
- **R1 / R2 / R3:** provisional release tags from v2.1 (DEC-034 and DEC-054 PENDING).
- **Business membership:** an accepted, active relationship between an account and one Business; it does not itself grant every action.
- **Deal delegation:** an explicit, revocable authorization for a Business member on one Deal and specified actions; it never includes final agreement confirmation.
- **Unified inbox:** an authorization-filtered view of Hiring, Deals and Team conversations; exact categorization remains PENDING.
- **G-xx / OD-xx / CF-xx / AS-xx:** working labels used by DECISIONS Revision 6.
- **Normative:** the requirement that governs when several statements overlap.

---

## 15. Document history

| Edition | Change record |
|---|---|
| 0.1-DRAFT | Initial backend functional specification; historical entry preserved. |
| 0.2-DRAFT | Reconciled Node.js direction, Web Admin R1 verification review and corrected active Laravel dependencies; historical entry preserved. |
| 0.3-DRAFT | Reconciled Decision Register Revision 6 and corrected mobile specification: integrated Business membership/roles, granular permissions, Deal-specific Finance Manager delegation, Founder-only final Founder-side confirmation, Unified Messaging authorization, revocation, isolation, audit/test/acceptance coverage and pending release boundaries. No pending decision was approved. |
| 0.4-DRAFT | Targeted consistency correction: distinguished Founder ownership-sensitive authority from resource/action-scoped Business editing and separated delegated task/milestone management from formal Founder-side completion and independent counterparty confirmation. Exact ownership-sensitive and milestone delegation remains PENDING; no decision status changed. |

This document is a DRAFT. It has not been approved and is not development-ready. Exactly five decisions are APPROVED in DECISIONS Revision 6: G-00, G-01 / DEC-046, OD-03, OD-07 and the approach of OD-01. G-07, G-10, DEC-010, DEC-042, BR-DEC-001..012, MSG-DEC-001..013 and every other undecided item remain PENDING, NEEDS VERIFICATION or UNKNOWN. Creation of this specification is not recorded as authorised in Revision 6.

**END OF DOCUMENT - Backend_Functional_Specification.md**
