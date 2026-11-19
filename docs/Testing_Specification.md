# Vault Ventures Mobile App - Complete Testing Specification

**Document:** 6 of 6
**Edition:** 0.1-DRAFT
**Status:** DRAFT; test design only; NOT RUN; not QA-approved and not development authorization.
**Authority:** Decision Register Revision 6, then Mobile 2.2-DRAFT, Backend 0.4-DRAFT, Admin 0.3-DRAFT, Database 0.3-DRAFT, API Contract 0.3-DRAFT and Deal Manager 0.2-DRAFT.

---

## 0. Document Control and Authority

No prior complete Testing Specification was found. This is the sole Document 6. Exactly five decisions are APPROVED: G-00, G-01 / DEC-046, OD-01 approach only, OD-03 and OD-07. G-07, G-10, DEC-010, DEC-042, BR-DEC-001..012, MSG-DEC-001..013, AD-DEC, API-DEC and unresolved DM-GAP items remain PENDING or NEEDS VERIFICATION.

| Label | Testing meaning |
|---|---|
| SOURCED | Testable behavior required by an active specification. |
| PROPOSED | Test design, environment or threshold awaiting approval. |
| CONDITIONAL | Run only if its feature/decision/migration is enabled. |
| PENDING | Expected result cannot select an undecided option. |
| NOT VERIFIED | Evidence is unavailable; never treated as pass. |
| NOT RUN | Designed but not executed. Every test in this document has this status. |

### 0.1 Stable ID inventory

- Functional: TS-TC-001..060.
- API: TS-API-001..113; `TS-API-nnn` maps one-to-one to `API-E-nnn`.
- Database: TS-DB-001..080; `TS-DB-nnn` maps one-to-one to `DB-E-nnn`.
- Security: TS-SEC-001..020.
- UI/accessibility: TS-UI-001..020.
- Performance/reliability: TS-PERF-001..010.
- UAT: TS-UAT-001..010.
- Gaps: TS-GAP-001..010. Risks: TS-R-001..010.

All are unique namespaces. Total designed tests: 313. Execution status: NOT RUN.

### 0.2 Explicit test-ID registry

- TS-TC: TS-TC-001, TS-TC-002, TS-TC-003, TS-TC-004, TS-TC-005, TS-TC-006, TS-TC-007, TS-TC-008, TS-TC-009, TS-TC-010, TS-TC-011, TS-TC-012, TS-TC-013, TS-TC-014, TS-TC-015, TS-TC-016, TS-TC-017, TS-TC-018, TS-TC-019, TS-TC-020, TS-TC-021, TS-TC-022, TS-TC-023, TS-TC-024, TS-TC-025, TS-TC-026, TS-TC-027, TS-TC-028, TS-TC-029, TS-TC-030, TS-TC-031, TS-TC-032, TS-TC-033, TS-TC-034, TS-TC-035, TS-TC-036, TS-TC-037, TS-TC-038, TS-TC-039, TS-TC-040, TS-TC-041, TS-TC-042, TS-TC-043, TS-TC-044, TS-TC-045, TS-TC-046, TS-TC-047, TS-TC-048, TS-TC-049, TS-TC-050, TS-TC-051, TS-TC-052, TS-TC-053, TS-TC-054, TS-TC-055, TS-TC-056, TS-TC-057, TS-TC-058, TS-TC-059, TS-TC-060.
- TS-API: TS-API-001, TS-API-002, TS-API-003, TS-API-004, TS-API-005, TS-API-006, TS-API-007, TS-API-008, TS-API-009, TS-API-010, TS-API-011, TS-API-012, TS-API-013, TS-API-014, TS-API-015, TS-API-016, TS-API-017, TS-API-018, TS-API-019, TS-API-020, TS-API-021, TS-API-022, TS-API-023, TS-API-024, TS-API-025, TS-API-026, TS-API-027, TS-API-028, TS-API-029, TS-API-030, TS-API-031, TS-API-032, TS-API-033, TS-API-034, TS-API-035, TS-API-036, TS-API-037, TS-API-038, TS-API-039, TS-API-040, TS-API-041, TS-API-042, TS-API-043, TS-API-044, TS-API-045, TS-API-046, TS-API-047, TS-API-048, TS-API-049, TS-API-050, TS-API-051, TS-API-052, TS-API-053, TS-API-054, TS-API-055, TS-API-056, TS-API-057, TS-API-058, TS-API-059, TS-API-060, TS-API-061, TS-API-062, TS-API-063, TS-API-064, TS-API-065, TS-API-066, TS-API-067, TS-API-068, TS-API-069, TS-API-070, TS-API-071, TS-API-072, TS-API-073, TS-API-074, TS-API-075, TS-API-076, TS-API-077, TS-API-078, TS-API-079, TS-API-080, TS-API-081, TS-API-082, TS-API-083, TS-API-084, TS-API-085, TS-API-086, TS-API-087, TS-API-088, TS-API-089, TS-API-090, TS-API-091, TS-API-092, TS-API-093, TS-API-094, TS-API-095, TS-API-096, TS-API-097, TS-API-098, TS-API-099, TS-API-100, TS-API-101, TS-API-102, TS-API-103, TS-API-104, TS-API-105, TS-API-106, TS-API-107, TS-API-108, TS-API-109, TS-API-110, TS-API-111, TS-API-112, TS-API-113.
- TS-DB: TS-DB-001, TS-DB-002, TS-DB-003, TS-DB-004, TS-DB-005, TS-DB-006, TS-DB-007, TS-DB-008, TS-DB-009, TS-DB-010, TS-DB-011, TS-DB-012, TS-DB-013, TS-DB-014, TS-DB-015, TS-DB-016, TS-DB-017, TS-DB-018, TS-DB-019, TS-DB-020, TS-DB-021, TS-DB-022, TS-DB-023, TS-DB-024, TS-DB-025, TS-DB-026, TS-DB-027, TS-DB-028, TS-DB-029, TS-DB-030, TS-DB-031, TS-DB-032, TS-DB-033, TS-DB-034, TS-DB-035, TS-DB-036, TS-DB-037, TS-DB-038, TS-DB-039, TS-DB-040, TS-DB-041, TS-DB-042, TS-DB-043, TS-DB-044, TS-DB-045, TS-DB-046, TS-DB-047, TS-DB-048, TS-DB-049, TS-DB-050, TS-DB-051, TS-DB-052, TS-DB-053, TS-DB-054, TS-DB-055, TS-DB-056, TS-DB-057, TS-DB-058, TS-DB-059, TS-DB-060, TS-DB-061, TS-DB-062, TS-DB-063, TS-DB-064, TS-DB-065, TS-DB-066, TS-DB-067, TS-DB-068, TS-DB-069, TS-DB-070, TS-DB-071, TS-DB-072, TS-DB-073, TS-DB-074, TS-DB-075, TS-DB-076, TS-DB-077, TS-DB-078, TS-DB-079, TS-DB-080.
- TS-SEC: TS-SEC-001, TS-SEC-002, TS-SEC-003, TS-SEC-004, TS-SEC-005, TS-SEC-006, TS-SEC-007, TS-SEC-008, TS-SEC-009, TS-SEC-010, TS-SEC-011, TS-SEC-012, TS-SEC-013, TS-SEC-014, TS-SEC-015, TS-SEC-016, TS-SEC-017, TS-SEC-018, TS-SEC-019, TS-SEC-020.
- TS-UI: TS-UI-001, TS-UI-002, TS-UI-003, TS-UI-004, TS-UI-005, TS-UI-006, TS-UI-007, TS-UI-008, TS-UI-009, TS-UI-010, TS-UI-011, TS-UI-012, TS-UI-013, TS-UI-014, TS-UI-015, TS-UI-016, TS-UI-017, TS-UI-018, TS-UI-019, TS-UI-020.
- TS-PERF: TS-PERF-001, TS-PERF-002, TS-PERF-003, TS-PERF-004, TS-PERF-005, TS-PERF-006, TS-PERF-007, TS-PERF-008, TS-PERF-009, TS-PERF-010.
- TS-UAT: TS-UAT-001, TS-UAT-002, TS-UAT-003, TS-UAT-004, TS-UAT-005, TS-UAT-006, TS-UAT-007, TS-UAT-008, TS-UAT-009, TS-UAT-010.

---

## 1. Testing Objectives and Scope

Objectives are requirements conformance, secure authorization, privacy, integrity, deterministic failure, transaction safety, accessible client behavior and release-profile independence. In scope: participant, Business, discovery, disclosure, Deal, collaboration, messaging, milestones, finance simulation, Web Admin, REST contracts, all 80 database entities, mobile/web UI and non-functional design. Out of scope: real money, production penetration testing, unapproved providers, implementation/tool selection and test execution.

Coverage is measured by requirement, API, entity, actor, authorization boundary, state, decision gate and risk. A mapped test is coverage design, not execution evidence.

---

## 2. Testing Strategy

Risk-based priorities: P0 security/authority/data integrity; P1 mandatory workflow; P2 conditional/later workflow; P3 cosmetic/proposed. Entry requires G-10 for execution, approved build/configuration, migration profile, synthetic data, environment authorization and traceable requirements. Exit thresholds are PROPOSED: all selected-scope P0/P1 tests executed, no open release-blocking defect, full selected API/entity coverage, security review and UAT sign-off. Numerical pass-rate thresholds remain PENDING.

Regression runs on authentication, permission middleware, migrations, API schema, Deal states, disclosure, messages, financial events and Admin changes. Evidence includes build, environment, data-set version, request ID, sanitized request/response, screenshots where appropriate, database assertion identifier, result, tester and timestamp. Secrets/evidence/message bodies are redacted.

---

## 3. Test Levels and Types

| Level/type | Purpose |
|---|---|
| Unit/component | Pure validation, calculations, state guards, redaction and client state reducers. |
| Integration | Service/repository/storage/notification boundaries and rollback. |
| API contract | Method/path/schema/auth/error/idempotency for API-E001..113. |
| Database | Entity constraints, FKs, transactions, indexes and migration profiles. |
| Mobile/Web UI | Navigation, state rendering, forms, accessibility and cache clearing. |
| End-to-end/UAT | Actor workflows across clients/backend/database. |
| Security/privacy | BOLA/BFLA, escalation, leakage, revocation and file protection. |
| Performance/reliability | Latency distributions, concurrency, recovery and resource use; targets PENDING. |

---

## 4. Test Environment and Data

Non-production isolated environments only. Proposed layers: unit mocks; API/database integration instance; mobile physical Android plus supported iOS/Expo targets where applicable; Admin browsers; security environment; performance environment isolated from functional runs. Exact versions, hosting and tools are PENDING.

Synthetic fixture set: Founder F1/F2; Investor I1; Professionals P1/P2; internal Admin A1/A2; Businesses B1/B2; Tier 0/1; accepted/revoked memberships; active/revoked Deal delegation; Connections; two-sided NDA combinations; Deals in all eight states; proposal versions; independent confirmations; milestones/dispute; Hiring/Team/Deal conversations; financial versions/events; simulated funding/commission; suspended account; expired session; redacted audit entries.

Each test gets a tenant-labelled fixture namespace and deterministic clock/request IDs. Reset restores a reviewed seed snapshot; cleanup never runs against production. Evidence content is synthetic and non-sensitive.

### 4.1 Reusable detailed procedure

Every ID inherits: related requirement/API/entity; actor; preconditions; synthetic data; ordered arrange/authenticate/act/assert/audit/cleanup steps; expected result; priority; level/type; release gate; status NOT RUN. Catalogue rows add scenario-specific deltas. No vague “works correctly” assertion is sufficient.

---

## 5. Participant and Authentication Tests

| IDs | Scenarios and expected results | Trace/gate |
|---|---|---|
| TS-TC-001..004 | Register valid participant; reject duplicate/invalid fields; record legal version; prove public Admin registration absent. | BE-AUTH-001..004, API-E001 |
| TS-TC-005..008 | Login/logout success, invalid credentials neutral response, expired/revoked session denial, suspended account 423. | BE-AUTH-005..009, E002/E003; session model PENDING |
| TS-TC-009..012 | Reset request neutral response, token single use/expiry, email verify, conditional phone verify. | E004..E007; phone CONDITIONAL |
| TS-TC-013..016 | Held-role list, active-role selection, no role escalation, isolated Founder/Investor/Professional profiles. | E008..E013; G-06 PENDING |
| TS-TC-017..018 | Notification list/read is recipient-only; preferences conditional. | E086..E089 |

Boundary data include min/max allowed lengths once approved, Unicode, normalization, unknown fields, replay and rate limit. Password/token values never appear in response/log evidence.

---

## 6. Verification and Disclosure Tests

| IDs | Ordered behavior | Expected result |
|---|---|---|
| TS-TC-019 | Upload synthetic evidence then submit Tier 1 request through E017/E015. | E017/E018/E019 rows linked; no storage key returned. |
| TS-TC-020 | Concurrent open submissions for same account/tier. | One commits; others conflict on open key. |
| TS-TC-021 | Admin A1/A2 decide same pending request concurrently. | One decision, one event/audit/tier update; loser 409. |
| TS-TC-022 | Reject/request information with missing reason. | 400/422; no state/event/audit mutation. |
| TS-TC-023 | Stage 3 with missing NDA party or Tier 0. | Protected metadata/content denied without existence leak. |
| TS-TC-024 | Both version-bound NDA acceptances plus Tier 1. | Stage 3 event; no skipped stage. |
| TS-TC-025 | Founder explicitly confirms Stage 4. | E036 updated and E037 appended; counterparty cannot do it. |

Rejected-request resubmission remains a conditional branch under AD-DEC-02, not an asserted result.

---

## 7. Business and Discovery Tests

| IDs | Scenarios | Expected result |
|---|---|---|
| TS-TC-026 | Founder creates/autosaves private draft and sections. | Only owner/exact later grant can access; unknown fields rejected. |
| TS-TC-027 | Publish readiness failures and DEC-031 variants. | Reasons returned; no mandatory Admin gate assumed. |
| TS-TC-028 | Protected document list/retrieval by stages. | Locked metadata minimized; retrieval audited; raw key absent. |
| TS-TC-029 | Discovery filters/search/pagination. | Published, unsuspended teasers only; stable authorized pages. |
| TS-TC-030 | Readiness calculation/explanation. | Versioned inputs/weights; incomplete flags; no authorization effect. |
| TS-TC-031 | Matching deterministic alternative. | E031 returns consistent explanation without DB-E031/E032. |
| TS-TC-032 | Persisted matching MC3 alternative. | Same contract; persisted result/factors correct; conditional only. |
| TS-TC-033 | Interest/response/Connection uniqueness. | Correct parties; no duplicate relationship; decline rules gated. |
| TS-TC-034 | AI score manipulation attempt. | Cannot advance stage, grant permission or expose documents. |

---

## 8. Business Role and Permission Tests

| IDs | Scenarios | Expected result/gate |
|---|---|---|
| TS-TC-035 | Invitation pending/accept/decline and duplicate active invitation. | No privilege before acceptance; MP1/BR-DEC-001. |
| TS-TC-036 | Membership versus global role. | Neither implies the other; cross-Business isolation. |
| TS-TC-037 | Role title without exact grant. | Protected operation denied. |
| TS-TC-038 | Exact Business/resource/action grant. | Only named operation succeeds; provenance stored. |
| TS-TC-039 | Revoke then immediate request/race. | Revoked basis denied; cache invalidated; history retained. |
| TS-TC-040 | Regrant after revocation. | New period row; old revoked row unchanged. |
| TS-TC-041 | Business A grant used against B. | Existence-hiding denial and no write. |
| TS-TC-042 | Custom Role/merge variants. | CONDITIONAL branches; no precedence invented. |
| TS-TC-043 | Task create/assign/update with exact grants. | Only authorized resource/action; unrelated task denied. |

---

## 9. Deal Manager and Deal Lifecycle Tests

DM-TC-001..039 are incorporated without renumbering by the one-to-one mapping below. The original detailed expected results remain authoritative in Deal Manager 0.2.

| DM IDs | TS mapping | Coverage |
|---|---|---|
| DM-TC-001..010 | TS-TC-044..053 | List/isolation, eight states, NDA, proposals, delegation and final-authority denial |
| DM-TC-011..020 | TS-TC-054..060 plus TS-UAT-001..003 | Party confirmation, Agreement, milestones, Hiring/Team boundaries |
| DM-TC-021..030 | TS-SEC-011..020 | Messaging authorization/revocation, immutable finance, files and audit |
| DM-TC-031..035 | TS-API-113, TS-UI-001..004 | Idempotency, suspension, forged calls, UI states, core independence |
| DM-TC-036..039 | TS-SEC-007..010 | Basis-specific revocation, counterparty rights, unrelated grants, cache/history |

API-E113 is tested by TS-API-113: F1/I1/P-counterparty core results require only E040; delegate branch requires MP1/MP2; filters/cursor/search are scope-bound; revoked-basis rows/previews/counts disappear while independently valid party rows remain.

---

## 10. Negotiation and Agreement Tests

| IDs | Steps | Expected result |
|---|---|---|
| TS-TC-044 | F1 creates proposal then counter. | New E042 versions; old rows unchanged. |
| TS-TC-045 | Authorized Finance Manager counters same Deal. | Actor/Business/delegation provenance retained. |
| TS-TC-046 | Delegate uses wrong/expired/revoked grant. | No version inserted; safe denial/audit. |
| TS-TC-047 | Finance/Business/Project/Custom/Admin uses Founder confirmation. | Refused; no E043. |
| TS-TC-048 | Founder confirms version N; counterparty confirms N. | Separate E043 rows; one simulated E044. |
| TS-TC-049 | Parties confirm different versions/concurrent retry. | No Agreement until same version; uniqueness enforced. |

---

## 11. Milestone Tests

| IDs | Steps | Expected result |
|---|---|---|
| TS-TC-050 | Founder creates ordered milestones with simulated BDT. | Sequence/amount validation; no real-money semantics. |
| TS-TC-051 | Project Manager exact operational grant updates/progress. | Operational action succeeds; other action denied. |
| TS-TC-052 | Project Manager attempts formal mark-complete. | Denied; DEC-014/BR-DEC-008 remain pending. |
| TS-TC-053 | Founder marks complete. | Event appended; next remains locked. |
| TS-TC-054 | Counterparty independently confirms. | Event appended; next unlocks or Deal completes. |
| TS-TC-055 | Concurrent duplicate confirmation/stale version. | One commit; loser 409; history ordered. |
| TS-TC-056 | Either party flags dispute. | Dispute event; no invented Admin resolution. |

---

## 12. Unified Messaging Tests

| IDs | Scenario | Expected result |
|---|---|---|
| TS-TC-057 | All filter combines only authorized Hiring/Team/Deal conversations. | `all` never stored as type. |
| TS-TC-058 | Hiring conversation. | No membership, Team, Deal, document or NDA access created. |
| TS-TC-059 | Team Chat with/without current membership and exact permission. | Authorized only when both current. |
| TS-TC-060 | Deal Chat party/delegate, wrong Deal, revocation and search. | Authorization before list/read/send/search/preview/unread/notify; no metadata leak. |

Additional coverage TS-SEC-011..015 proves Admin default denial, cross-Business/Deal isolation, message non-formal effect, access termination and pending historical visibility. Attachments/moderation/retention/delivery branches are CONDITIONAL.

---

## 13. Financial Reporting and Simulation Tests

Detailed scenarios are TS-SEC-016..020 and TS-UAT-004/005:

- Create report and immutable version; compute net server-side.
- Revision inserts a new DB-E056; old content/evidence/provenance unchanged.
- Submission and Founder attestation append distinct DB-E058 events.
- Draft/edit grant alone cannot submit; delegated submit remains PENDING.
- Owner Founder alone attests under safe contract.
- Admin appends review events only; cannot create version, edit figures, attach participant evidence, submit or attest.
- Investor discrepancy creates DB-E059 and ordered DB-E060 events.
- Simulated investment/funding/commission/premium always carry simulation semantics.
- No bank/card/gateway/escrow/custody/payout route or field exists.

TS-GAP-001: exact evidence attachment timing relative to submission is policy-sensitive; test both approved branch only, without inventing mutability.

---

## 14. Web Admin Tests

| Test family | Coverage | Gate |
|---|---|---|
| TS-UAT-006 | Internal login/logout/session; public registration absent. | R1 OD-03; session PENDING |
| TS-UAT-007 | Queue, detail, protected evidence, approve/reject/request information, reason/audit. | R1 mandatory |
| TS-UAT-008 | Concurrent review and rollback. | R1 mandatory |
| TS-UAT-009 | Directory, suspend/restore, moderation, audit, metrics, notifications. | OD-10/feature CONDITIONAL |
| TS-UAT-010 | Financial/discrepancy/reports/settings later modules. | R2/R3 CONDITIONAL |

Negative assertions: no Admin impersonation, Business-role self-grant, Deal/Agreement/milestone participant write, report submit/attest/figure edit, or private conversation list/read/search/preview.

---

## 15. API Contract Testing Catalogue

### 15.1 Shared API procedure

For each TS-API-nnn: verify method/path against API-E-nnn; valid request and exact success envelope; one invalid field/unknown field case; unauthenticated case; actor/scope isolation; response schema/types; documented errors; idempotency or `If-Match` where specified; audit correlation; conditional feature disabled behavior; no internal ID/storage key/secret leakage; status NOT RUN.

### 15.2 Endpoint-level coverage

| TS-API range | API-E range/domain | Additional critical assertion |
|---|---|---|
| 001..014 | E001..014 auth/accounts/reference | Neutral auth, role isolation, conditional session/phone |
| 015..018 | E015..018 verification/files | One-open request, file privacy |
| 019..031 | E019..031 Business/discovery/matching | Owner/stage isolation; deterministic vs MC3 |
| 032..044 | E032..044 membership/permissions/tasks | MP1 gate, default deny, revocation periods |
| 045..050 | E045..050 interest/disclosure/NDA | E038 NDA mapping; E036/E037 Stage 4 |
| 051..061 | E051..061 Deal/delegation/negotiation/Agreement | Core versus MP2; dual confirmation |
| 062..069 | E062..069 messaging | MP3; authorize before query; Admin absent |
| 070..076 | E070..076 milestones | Formal actor separation |
| 077..085 | E077..085 finance/simulation | M11/MP4; immutable event model |
| 086..092 | E086..092 notifications/reputation/reports | Recipient isolation; conditional preferences/R3 |
| 093..112 | E093..112 Web Admin | Internal auth; OD-03 mandatory versus OD-10/R2/R3 |
| 113 | E113 GET `/deals` | Core E040 list without MP; conditional E071/E076 branch; secure cursor/count/search/revocation |

This deterministic one-to-one matrix covers 113/113 endpoint IDs. It does not claim endpoints exist.

---

## 16. Database Testing Catalogue

### 16.1 Shared database procedure

Each TS-DB-nnn maps to DB-Ennn and verifies documented columns/types/nullability, PK, every FK with RESTRICT, unique/check constraints or server fallback, timestamp convention, retention class, sensitivity handling, valid insert, invalid parent, duplicate key, prohibited update/delete for CT/RET-A, indexes by plan inspection after implementation, and release/migration allocation. No SQL is supplied or executed.

### 16.2 Entity-level coverage

| TS-DB range | DB-E range/domain | Critical checks |
|---|---|---|
| 001..009 | E001..E009 identity/auth/legal/reference | Email/role/consent uniqueness; conditional helpers |
| 010..016 | E010..E016 profiles | Role-specific FK/ranges |
| 017..020 | E017..E020 files/verification | Opaque key, open_key, atomic events |
| 021..026 | E021..E026 Business/moderation | Owner, history, conditional moderation |
| 027..032 | E027..E032 readiness/matching | weights/snapshots; MC3 independence |
| 033..039 | E033..E039 interest/disclosure/NDA/access | relationship uniqueness; legal version binding |
| 040..048 | E040..E048 Deal/negotiation/milestones/messages | eight states, version/side uniqueness, append-only history |
| 049..053 | E049..E053 feedback/reputation/notifications/audit | one feedback; recipients; append-only audit |
| 054..064 | E054..E064 R2 finance/simulation/device | immutable versions/events; simulation=1 |
| 065..069 | E065..E069 R3/later | conditional independence and polymorphic validation |
| 070..075 | E070..E075 membership/permissions/tasks | active keys, period rows, MP1 |
| 076..077 | E076..E077 Deal delegation/actions | same Deal/Business, revocation provenance, MP2 |
| 078..080 | E078..E080 conversations/participants/read state | MP3 order, access periods, no Admin sender |

This maps 80/80 entity IDs. Transaction suites additionally cover verification decision, Deal transition, agreement, milestone confirmation, financial revision/event, invitation acceptance, grant/revocation, delegated proposal and conversation send.

Migration tests apply M01..M10 core, MC groups independently, MP1→MP2→MP3a..d, M11→MP4, and M12. R1 Tier 1 executes on M01..M04 with the selected authentication alternative and no MP/M11/M12.

---

## 17. Security and Privacy Testing

| ID | Threat scenario | Expected result |
|---|---|---|
| TS-SEC-001 | BOLA substitute account/Business/Deal/file ID | Protected 404; no data/audit payload leak |
| TS-SEC-002 | Function-level forged Founder/Admin action | 403/404; no mutation |
| TS-SEC-003 | Mass assignment actor/role/tier/status | Ignored/rejected; session-derived actor |
| TS-SEC-004 | Token fixation/replay/expiry/revocation | Selected model enforced; secrets absent |
| TS-SEC-005 | Password reset/email enumeration/rate abuse | Neutral response and rate control |
| TS-SEC-006 | Cross-Business search/filter/cache | No IDs/counts/matches/previews |
| TS-SEC-007 | Only delegation revoked | All delegation-derived Deal capabilities denied |
| TS-SEC-008 | Counterparty also held revoked delegation | Independent counterparty rights revalidated/retained |
| TS-SEC-009 | Unrelated Business grant | No target-Deal access |
| TS-SEC-010 | Revoked delegate previews/unread/notifications | Cleared/denied; stored history intact; visibility PENDING |
| TS-SEC-011 | Unauthorized conversation list/search | No existence metadata |
| TS-SEC-012 | Admin probes private conversation | No route/default access; security audit only |
| TS-SEC-013 | Message attempts formal action | No NDA/state/permission/confirmation effect |
| TS-SEC-014 | Disclosure/tier bypass | Protected content denied |
| TS-SEC-015 | File path/storage-key manipulation | Server-mediated denial; no raw key |
| TS-SEC-016 | Financial old-version update/delete | Denied; immutable history |
| TS-SEC-017 | Delegate submit/attest without exact authority | Denied; no event |
| TS-SEC-018 | Admin figure edit/submit/attest | Denied; review event only |
| TS-SEC-019 | Error/log/audit secret injection | Redacted output/evidence |
| TS-SEC-020 | Revocation versus in-flight commit race | Lock/recheck; no post-revocation delegated write |

Security tests are authorized-environment defensive checks only; no exploit scripts are defined.

---

## 18. Mobile and Web UI Testing

| IDs | Coverage |
|---|---|
| TS-UI-001..004 | Deal Manager dashboard/My Deals/detail/timeline, API-E113 paging/filter, core/delegate action visibility |
| TS-UI-005..008 | Disclosure/documents/delegation/negotiation states, file safety, revocation cache clearing |
| TS-UI-009..012 | Proposal/Agreement/milestone tracker/detail, independent formal buttons, stale reload |
| TS-UI-013..015 | Deal Messages/financial/activity, Admin excluded, immutable history |
| TS-UI-016 | Participant auth/profile/verification forms and validation |
| TS-UI-017 | Admin login/queue/evidence/decision concurrent feedback |
| TS-UI-018 | Keyboard/focus/screen-reader labels, scalable text, contrast/non-color status |
| TS-UI-019 | Localization, UTC/local rendering, BDT/South Asian grouping, long strings |
| TS-UI-020 | Offline/interrupted request, retry/idempotency, rotation/device sizes, safe logout/cache wipe |

Every UI test covers loading, empty, success, validation, network, forbidden/not-found, revoked and stale states applicable to that screen. Visual style is not asserted until approved.

---

## 19. Performance and Reliability Testing

| ID | Workload/measure |
|---|---|
| TS-PERF-001 | Registration/login latency/error/rate-control behavior |
| TS-PERF-002 | API-E113 Deal paging/filter/search and E040 query plan |
| TS-PERF-003 | Business discovery/search pagination |
| TS-PERF-004 | Messaging inbox/history/search with authorization filtering |
| TS-PERF-005 | Notifications/unread retrieval |
| TS-PERF-006 | Admin verification queue and concurrent decisions |
| TS-PERF-007 | Protected file retrieval throughput/resource use |
| TS-PERF-008 | Financial version/event history |
| TS-PERF-009 | Database indexes, locks, deadlocks and rollback recovery |
| TS-PERF-010 | Timeout, duplicate request, interrupted network, restart/recovery |

Measure p50/p95/p99, throughput, error rate, database time/rows, lock wait, CPU/memory/network and recovery duration. Numerical thresholds and load models are PROPOSED/PENDING; baseline first, then owner-approved targets.

---

## 20. End-to-End and UAT Scenarios

| ID | Actor journey | Acceptance |
|---|---|---|
| TS-UAT-001 | Founder→Connection→Deal→NDA→proposal→Founder confirmation | No skipped state; exact version |
| TS-UAT-002 | Investor independently confirms→simulated Agreement | No delegate substitution |
| TS-UAT-003 | Milestones→Founder mark→counterparty confirm→Completed→feedback | Next unlock only after confirm |
| TS-UAT-004 | Finance Manager delegated counter then revoked | Counter succeeds before; only derived authority ends after |
| TS-UAT-005 | Financial version→submit branch→Founder attest→Investor discrepancy | Immutable/events; pending submit policy respected |
| TS-UAT-006 | Internal Admin authentication | No public registration/participant identity |
| TS-UAT-007 | Tier 1 queue/evidence/decision | R1 independent path and audit |
| TS-UAT-008 | Concurrent Admin decisions | One outcome; rollback integrity |
| TS-UAT-009 | Conditional governance modules | Only enabled/authorized inventory |
| TS-UAT-010 | Security/privacy sign-off journey | Cross-tenant/message/Admin negative cases pass |

UAT scripts require stakeholder-approved expected wording and release scope. Status NOT RUN.

---

## 21. Complete Traceability Matrices

| Source family | Direct test coverage |
|---|---|
| Mobile AUTH/ROL/PRF/VER | TC001..025, API001..018, UI016 |
| Mobile BIZ/DSC/AI/INT/DIS/DOC | TC026..034, API019..050, DB021..039 |
| Mobile BRM | TC035..043, API032..044, DB070..077, SEC006..010 |
| Mobile DLR/NEG/AGR/MIL | TC044..056, API051..061/API070..076/API113, DB040..048 |
| Mobile UMSG/MSG/NTF | TC057..060, API062..069/API086..089, SEC011..013 |
| Mobile FIN/INV/PAY/PRM | SEC016..018, API077..085, DB054..064, UAT005 |
| Backend BE-AUTH/USR/VER | TC001..025 and matching API/DB tests |
| Backend BE-BIZ/DSC/AI/DIS | TC026..034 and matching API/DB tests |
| Backend BE-ROL/DLR/NEG/AGR/MIL/MSG | TC035..060, SEC006..015, matching API/DB tests |
| Backend BE-FIN/PAY/PRM | SEC016..020, API077..085, DB054..064 |
| Backend BE-ADM/AUD/SEC | UAT006..010, API093..112, DB003/053, SEC001..020 |
| Admin AD-AUT/AD-WF/AD-MOD-03 | UAT006..008, API093..098 |
| Admin conditional modules | UAT009/010, API099..112 |
| Deal features DM-F001..030 | TC044..060, SEC007..020, UI001..015, UAT001..005 |
| Deal screens DM-S001..015 | UI001..015 |
| Deal workflows DM-W001..012 | UAT001..005 plus TC044..060 |
| DM-TC001..039 | Section 9 explicit mapping |
| API-E001..113 | TS-API-001..113 one-to-one |
| DB-E001..080 | TS-DB-001..080 one-to-one |

Decision-gate matrix:

| Gate | Conditional tests |
|---|---|
| G-03/G-05/OD-08/11 | TC005..012, API002..007/API093/094, SEC004 |
| G-07/OD-10 | conditional API099..112, UAT009/010, release regression |
| BR-DEC-001..012 | TC035..043/045/046/051/052, API032..044/054..057/070..080/113 |
| MSG-DEC-001..013/DEC-010 | TC057..060, API062..069, SEC010..013 |
| DEC-012/013/BR-DEC-007 | SEC016..018, API077..083, UAT005 |
| G-10 | All execution; design remains NOT RUN until authorized |

No uncovered active requirement family was identified. Exact unresolved option outcomes are tracked as gaps, not asserted coverage results.

---

## 22. Defect Management and Evidence

Severity: S1 security/data loss/authority breach; S2 mandatory workflow unavailable or material integrity failure; S3 limited functional defect/workaround; S4 cosmetic/documentation. Priority P0..P3 is triage order and may differ from severity.

Lifecycle: New→Triaged→Assigned→In Progress→Fixed→Ready for Retest→Verified→Closed; Reopened if reproduction remains or regression appears. Release blockers are open S1, unaccepted selected-scope S2, mandatory Tier 1 failure, authority/privacy breach, migration/integrity failure or missing required evidence.

Defect template: ID; title; build/environment; severity/priority; requirement/test; preconditions/data; ordered reproduction; expected/actual; sanitized evidence/request ID; frequency; security/privacy label; suspected component; owner; decision gate; regression scope; status.

---

## 23. Release Gates, Risks and Open Decisions

| ID | Risk/gap | Treatment |
|---|---|---|
| TS-GAP-001 | Financial evidence attachment timing | Await policy; branch tests only |
| TS-GAP-002 | Auth/session/token model | Conditional suites per selected model |
| TS-GAP-003 | Exact R1 scope/Admin inventory | G-07/OD-10 matrix |
| TS-GAP-004 | Business-role merge/custom-role policy | Do not assert precedence |
| TS-GAP-005 | Deal creation/transitions/non-completion | G-08/DEC-044 branches |
| TS-GAP-006 | Negotiation field/limit catalogue | Schema/limit tests after decision |
| TS-GAP-007 | Milestone delegation/dispute resolution | DEC-014/BR-DEC-008 |
| TS-GAP-008 | Messaging retention/history/attachments/delivery | MSG decisions |
| TS-GAP-009 | Numerical performance/accessibility targets | Baseline then approval |
| TS-GAP-010 | Environment/device/browser/version matrix | Technical approval required |
| TS-R-001 | False pass before implementation | All tests NOT RUN |
| TS-R-002 | Conditional feature tested as core | Profile-tag every execution |
| TS-R-003 | Tenant/Deal leakage | P0 isolation suites |
| TS-R-004 | Role title treated as grant | P0 forged-action suites |
| TS-R-005 | Revocation race/cache leak | SEC007..010/020 |
| TS-R-006 | Admin overreach | API/Admin negative suite |
| TS-R-007 | Immutable history mutation | DB/API finance/negotiation suite |
| TS-R-008 | Test data privacy | Synthetic-only controls |
| TS-R-009 | Traceability drift | ID validation at document/build review |
| TS-R-010 | Unapproved target becomes gate | Mark thresholds PENDING |

Release profiles: M01..M10 core; MC groups only if selected; MP1→MP2; MP3a..d; M11→MP4; M12 later. R1 Tier 1 must pass on M01..M04 and selected auth alternative without MP/M11/M12.

---

## 24. Acceptance Criteria and Definition of Done

- [ ] Selected-scope requirements have direct positive/negative tests.
- [ ] 113/113 API and 80/80 entity tests are implemented and evidenced after G-10.
- [ ] 39/39 DM cases retain mapped evidence.
- [ ] Mandatory Tier 1 passes independently.
- [ ] Founder/counterparty, Finance Manager, Project Manager and Admin boundaries pass.
- [ ] Cross-Business/Deal/message privacy and revocation races pass.
- [ ] Financial/proposal/audit history immutability passes.
- [ ] Accessibility/localization/device matrix is approved and executed.
- [ ] No release-blocking defects remain under approved criteria.
- [ ] UAT and security reviewers sign approved release evidence.

These are proposed QA gates, not current achievements.

---

## 25. Final Document Status

This 0.1-DRAFT defines 313 tests: 60 functional, 113 API, 80 database, 20 security, 20 UI, 10 performance/reliability and 10 UAT. Every test is NOT RUN. It covers all 113 API endpoints, all 80 database entities, DM-TC-001..039, DM-F-001..030, DM-S-001..015 and DM-W-001..012 by explicit deterministic mappings. It preserves exactly five approved decisions and leaves every unresolved decision pending. No test code, test execution, SQL, migration, application change or release approval is claimed.

TESTING-SPEC-DOC6-0.1-DRAFT-END-MARKER

**END OF DOCUMENT - Testing_Specification.md**
