# Vault Ventures Mobile App - API Contract Specification

**Document:** 5 of 6 (REST API Contract)
**Edition:** 0.3-DRAFT
**Status:** DRAFT. Not approved. Not development-ready. This document authorises no implementation, migration, SQL, deployment or testing.
**Architecture direction:** React Native + Expo + TypeScript mobile client; separate Web Admin frontend; shared Node.js + Express.js REST backend; fresh MySQL database (APPROVED direction under G-00, G-01, OD-03 and OD-07).
**Contract detail status:** Endpoint paths, methods, fields, envelopes and HTTP mappings are PROPOSED unless explicitly described as SOURCED. JWT/session details, deployment, route versioning and transport choices remain PENDING. G-10 remains PENDING.

---

## 0. Document control and authority

### 0.1 Authority order

1. `DECISIONS 2_REV6.md`, Revision 6: approval authority.
2. Mobile Functional Master Specification, internal Edition 2.2-DRAFT.
3. Backend Functional Specification, Edition 0.4-DRAFT.
4. Admin Dashboard Specification, Edition 0.3-DRAFT.
5. Database Design, Edition 0.3-DRAFT.

Roadmaps and legacy Laravel evidence are historical/provisional only. Exactly five decisions are APPROVED: G-00, G-01 / DEC-046, OD-01 (approach only), OD-03 and OD-07. All other unresolved items, including G-07, G-10, DEC-010, DEC-042, BR-DEC-001..012 and MSG-DEC-001..013, remain PENDING or NEEDS VERIFICATION.

### 0.2 Evidence labels

| Label | Meaning |
|---|---|
| APPROVED | Direction explicitly approved in Revision 6; not implementation approval. |
| SOURCED | Functional behavior required by an active specification. |
| PROPOSED | Contract shape selected here for review; not approved. |
| CONDITIONAL | Exists only if its decision/feature is approved and migration group is deployed. |
| PENDING | Owner or technical choice unresolved. |
| UNKNOWN | Required information is absent and must not be guessed. |

### 0.3 Discovery and history

No prior API Contract, OpenAPI/Swagger document, endpoint catalogue or generator was found. This is the single newly created `API_Contract.md`.

| Edition | Change |
|---|---|
| 0.1-DRAFT | Initial Document 5 contract derived from the five authorities; no decision or release allocation approved. |
| 0.2-DRAFT | Corrected entity mappings and core/conditional dependencies; added endpoint-specific contracts for all 112 endpoints; clarified deterministic versus persisted matching and the complete M01..M04 Tier 1 path. No pending decision approved. |
| 0.3-DRAFT | Added API-E-113 authorized Deal listing for sourced dashboard Deal Rooms in progress, with core-party access independent of MP1/MP2 and conditional exact-delegation access. No Admin route or pending policy was approved. |

---

## 1. API architecture

Clients call only the Node.js + Express.js backend. Neither client connects to MySQL or object storage directly. Mobile participant and Web Admin authentication domains are separate. All authorization, effective permissions, disclosure/NDA/tier gates, state transitions, calculations and data minimisation occur server-side.

The PROPOSED base path is `/api/v1`; hostname, versioning strategy and environments remain PENDING. Participant routes use `/api/v1/...`; internal Admin routes use `/api/v1/admin/...`. Public identifiers are opaque UUID-like strings. Database numeric primary keys, storage keys and authorization internals are never exposed.

---

## 2. Common conventions

### 2.1 Envelopes and types

Success: `{"data":{},"meta":{"requestId":"req_demo"}}`. List responses add `page:{"cursor":null,"nextCursor":null,"limit":20}`. Error: `{"error":{"code":"FORBIDDEN","message":"Request cannot be completed","fields":[]},"meta":{"requestId":"req_demo"}}`.

- UTC timestamps use RFC 3339 strings; dates use `YYYY-MM-DD`.
- Money is a decimal string plus `currency:"BDT"`; percentages are decimal strings. No floating-point contract values.
- Boolean and enum values are JSON-native. Unknown enum values are rejected, not coerced.
- `If-Match` carries a PROPOSED opaque resource version for mutable resources. A stale value returns 409.
- `Idempotency-Key` is required for non-idempotent create/transition operations identified by profile `W`; replay with the same semantic request returns the original result, while a changed payload returns 409.
- Cursor pagination is PROPOSED. Allowed filters/sorts are endpoint-specific; unknown fields return 400. Search semantics remain bounded and authorization-filtered.
- File responses expose public file ID, safe name, media type, byte size and authorization state only. Authorized retrieval is a short-lived server-mediated response; raw storage keys and public bucket URLs are forbidden.
- `X-Request-ID` is accepted or generated and propagated to redacted audit records. Rate-limit response is 429 with safe retry metadata; exact limits are PENDING.
- Deprecation requires a new contract version, overlap window and notice; duration is PENDING.

### 2.2 Error taxonomy

| HTTP | Code | Use |
|---|---|---|
| 400 | VALIDATION_FAILED | Invalid fields, filters or state-independent format. |
| 401 | UNAUTHENTICATED / TOKEN_EXPIRED | No valid current session. |
| 403 | FORBIDDEN | Known resource but action denied where disclosure is safe. |
| 404 | NOT_FOUND | Missing resource or existence-hiding response for protected resources. |
| 409 | CONFLICT / STALE_VERSION / IDEMPOTENCY_CONFLICT | State, uniqueness or concurrency conflict. |
| 413/415/422 | FILE_TOO_LARGE / UNSUPPORTED_MEDIA / BUSINESS_RULE_FAILED | Upload or semantic validation failure. |
| 423 | ACCOUNT_SUSPENDED | Authenticated account is suspended; no protected data returned. |
| 429 | RATE_LIMITED | Rate policy exceeded. |
| 501 | FEATURE_NOT_ENABLED | Conditional feature not deployed; returned only where feature existence is non-sensitive. |

For Business, Deal, conversation, evidence and NDA-protected probing, 404 is used consistently so existence, titles, participants, previews, counts and relationships are not disclosed.

### 2.3 Authorization algorithm

Every protected request validates session/account status, active global role context, accepted current Business membership where applicable, exact resource/action grant, Business identity, Deal delegation where applicable, disclosure stage, two-sided NDA and verification tier, then rechecks revocation immediately before commit. Role titles alone authorize nothing. Caller-supplied actor IDs are ignored; actor identity comes only from the authenticated context.

---

## 3. Authentication and sessions

Participant registration is public; Admin registration is prohibited. JWT-based authentication family is approved direction, but access/refresh format, rotation, browser storage, logout semantics, email delivery and optional phone verification remain PENDING. Passwords, hashes, reset tokens and session secrets are write-only or never returned.

Endpoint catalogue entries API-E-001..014 cover this domain. Consent records bind the accepted legal-document version and timestamp. Suspended accounts cannot use protected endpoints. Active-role context selects a held global participant role; it never creates one.

---

## 4. Participant accounts and profiles

Founder, Investor and Skilled Professional profiles are separate resource views. A participant may hold multiple global roles subject to pending multi-role decisions. Verification tier and request status are returned without evidence content. Cross-user profile responses are minimized by discovery/disclosure rules.

---

## 5. Verification and evidence

Tier 1 submission and separate Web Admin review are mandatory R1 capability under OD-03. Only one open request per account/tier is accepted. Evidence metadata and content require purpose-bound authorization and audited retrieval. Admin decision is atomic and reasoned; concurrent decisions yield one success and one conflict. Whether a rejected applicant may create a new request remains PENDING under AD-DEC-02.

---

## 6. Businesses and discovery

Founders create private drafts and edit owned resources. Explicitly delegated members may edit only exact Business/resource/action grants; publish, delete, ownership transfer and other ownership-sensitive delegation remain PENDING. DEC-031 does not establish mandatory Admin publication approval. Discovery returns published teasers only; protected sections/files are stage-filtered. Scores never grant access.

---

## 7. Business membership and permissions

This domain is CONDITIONAL/PENDING allocation under BR-DEC-001..012, BR-DEC-012 and G-07. Invitation acceptance creates membership; role assignment and explicit permission grant are distinct resources. Revocation ends subsequent authority and preserves history. Permission merge, Custom Role catalogue/ceilings, invitation lifecycle details and historical visibility remain PENDING.

---

## 8. Interest and connections

Authorized participants may express interest in published Businesses. Mutual workflow creates a connection under sourced rules. Disclosure advancement remains server-controlled; Stage 3 requires two-sided accepted NDA plus Tier 1, and Stage 4 requires explicit Founder confirmation. No endpoint accepts a caller-selected disclosure stage.

---

## 9. Deal lifecycle and negotiation

The eight Deal states remain Matched, Interest Confirmed, Deal Room Opened, NDA Signed, Negotiation, Agreement, Milestone Funding Active and Completed. Clients request domain actions, never a target state. A Finance Manager may create versioned draft/counter proposals only with a current Founder-issued delegation for that exact Business/Deal/action. Only the Founder performs Founder-side final confirmation; the Investor/counterparty confirms independently. Agreement is read-only and simulated. No generic permission, Admin route, message or caller-supplied identity can confirm either side.

---

## 10. Unified Messaging

Unified Messaging is CONDITIONAL/PENDING allocation under DEC-010 and MSG-DEC-001..013. `all` is a list filter, not a stored conversation type; types are `hiring`, `team`, and `deal`. Hiring grants no membership. Team requires active membership plus messaging permission. Deal requires participant/delegation and all disclosure/NDA/tier gates. Every list, detail, search, preview, unread, notification, read and send operation reauthorizes before selection. Admin has no default route to private conversations. Attachments, moderation, deletion, retention, receipts, presence and real-time delivery remain PENDING.

---

## 11. Milestones and tasks

Project Managers may draft/update/assign/manage only explicitly granted task or milestone actions. Formal Founder mark-complete remains separate from independent counterparty confirmation; whether the Founder-side action can ever be delegated remains PENDING under BR-DEC-008 and DEC-014. Next milestone unlocks only after confirmation. All values are simulated BDT.

---

## 12. Financial reporting and simulation

Each edit inserts an immutable financial report version; lifecycle changes append ordered events. Draft/edit, submit and Founder-attest are separate actions. BR-DEC-007 leaves delegated submission authority PENDING; Founder attestation is owner-Founder-only in the current safe contract. Admin may append review outcomes but cannot create/submit/attest participant reports, change figures or attach participant evidence. Investment, funding, commission and premium records are simulation-only; no banking, cards, gateway, escrow, custody, payout or billing API exists.

---

## 13. Notifications, reputation and audit

Notifications are reauthorized and safely minimized at read time. Preferences are CONDITIONAL. Feedback is one per reviewer per Deal under sourced rules. Audit events are append-only and have no participant write endpoint; Admin search returns redacted metadata only. Reports/disputes, escalations, settings and analytics are later/conditional.

---

## 14. Web Admin API

Admin authentication is internal and separately provisioned; provisioning method remains PENDING. R1 necessarily supports Tier 1 queue, evidence review and atomic approve/reject/request-more-information with reason and audit. OD-10 governs the exact wider R1 inventory. Admin cannot register publicly, impersonate, join a Business, grant itself Business permissions, edit participant content/figures, submit/attest reports, confirm agreements or access private conversations by default.

---

## 15. Complete endpoint catalogue

### 15.1 Catalogue interpretation

Each row specifies method/path, client, authenticated actor and scope, purpose, contract profile, release/status, trace and database mapping. Profiles supply required request/response/status/idempotency/audit behavior:

- `R`: no body; filtered public-ID response; 200; 401/403-or-404/409 as applicable; no state audit, security access may be logged.
- `L`: query filters/cursor/limit; minimized list/page response; 200; authorization before selection.
- `C`: validated JSON body; created public-ID resource; 201; `Idempotency-Key`; create audit.
- `W`: validated action body plus `If-Match` where mutable; resource/event response; 200/201/204; idempotency and transactional audit.
- `F`: multipart metadata plus file; safe file metadata response; 201; size/type checks; upload/access audit; never returns storage key.
- `D`: decision/action body with mandatory reason where specified; event/current-state response; atomic row lock; audit required.

All profiles also return 400, 401, 423, 429 and safe 5xx where applicable. Protected-resource authorization failure uses existence-hiding 404. `S` means SOURCED behavior with PROPOSED contract; `CND` means CONDITIONAL/PENDING feature.

| ID | Method and proposed route | Client | Auth actor and scope | Purpose | Profile | Rel/status | Requirements | DB entities |
|---|---|---|---|---|---|---|---|---|
| API-E-001 | POST `/auth/register` | Mobile | Public participant only | Register participant and consent | C | R1 S | BE-AUTH-001..004, BE-USR-001 | E001,E007,E008 |
| API-E-002 | POST `/auth/login` | Mobile | Public credentials | Participant login | W | R1 S; session model PENDING | BE-AUTH-005..008 | E001 core; E005 only with MC1/session option |
| API-E-003 | POST `/auth/logout` | Mobile | Participant session | Revoke current session | W | R1 S; PENDING model | BE-AUTH-009 | E001 core revocation alternative; E005 only with MC1/session option |
| API-E-004 | POST `/auth/password-reset-requests` | Mobile | Public email | Request neutral reset flow | C | R1 S | BE-AUTH-010/011 | E004 |
| API-E-005 | POST `/auth/password-resets` | Mobile | Valid one-time token | Complete reset | W | R1 S | BE-AUTH-011 | E001,E004 |
| API-E-006 | POST `/auth/email-verifications` | Mobile | Valid one-time token | Verify email | W | R1 S | BE-AUTH-003 | E001,E004 |
| API-E-007 | POST `/auth/phone-verifications` | Mobile | Participant | Verify phone | W | R1 CND | BE-AUTH-012 | E006 |
| API-E-008 | GET `/me` | Mobile | Participant | Current account/status/tier | R | R1 S | BE-USR-001..004 | E001,E002 |
| API-E-009 | GET `/me/roles` | Mobile | Participant | Held global roles | L | R1 S | BE-ROL-001..005 | E002 |
| API-E-010 | PUT `/me/active-role` | Mobile | Participant holding role | Select client context only | W | R1 CND, G-06 | BE-USR-003/004 | E002 |
| API-E-011 | GET `/me/consents` | Mobile | Participant | Consent evidence | L | R1 S | BE-AUTH-013 | E007,E008 |
| API-E-012 | GET `/me/profile` | Mobile | Participant active role | Read own role profile | R | R1 S | BE-USR-005..009 | E010..E016 |
| API-E-013 | PATCH `/me/profile` | Mobile | Participant active role | Update own profile | W | R1 S | BE-USR-005..009 | E010..E016 |
| API-E-014 | GET `/reference-data/{listCode}` | Both | Public or authenticated by list | Read approved reference values | L | R1 S | BE-REF-001..003 | E009 |
| API-E-015 | POST `/verification-requests` | Mobile | Participant | Submit Tier 1 request/evidence refs | C | R1 REQUIRED | BE-VER-001..009 | E018,E019,E017 |
| API-E-016 | GET `/verification-requests/current` | Mobile | Owning participant | Read own safe status/reason | R | R1 REQUIRED | BE-VER-007..009 | E018,E020 |
| API-E-017 | POST `/protected-files` | Mobile | Authorized participant/context | Upload protected file | F | R1 S | BE-DOC-001..008 | E017 |
| API-E-018 | GET `/protected-files/{fileId}` | Both | Currently authorized viewer | Retrieve protected content | R | R1 S | BE-DOC-004..008 | E017,E039 |
| API-E-019 | POST `/businesses` | Mobile | Founder | Create private Business draft | C | R1 S | BE-BIZ-001/006 | E021,E022 |
| API-E-020 | GET `/businesses/{businessId}` | Mobile | Owner/granted member or stage-authorized viewer | Read minimized Business | R | R1 S | BE-BIZ-001..006, BE-DIS | E021..E025,E036 |
| API-E-021 | PATCH `/businesses/{businessId}` | Mobile | Owner; exact edit grant only when extension deployed | Edit authorized Business resource | W | R1 Founder core; delegated mode PA | BE-BIZ-006/014 | E021,E022 core; E071/E074 only after MP1 |
| API-E-022 | PUT `/businesses/{businessId}/sections/{sectionCode}` | Mobile | Owner; exact section grant only when extension deployed | Upsert draft section | W | R1 Founder core; delegated mode PA | BE-BIZ-002/006/014 | E022 core; E071/E074 only after MP1 |
| API-E-023 | POST `/businesses/{businessId}/documents` | Mobile | Owner or exact document grant | Attach protected document metadata | W | R1 S | BE-DOC-003..005 | E024,E017 |
| API-E-024 | GET `/businesses/{businessId}/documents` | Mobile | Stage/current authorization | List safe file metadata | L | R1 S | BE-DOC-004/005, BE-DIS-006 | E024,E036,E039 |
| API-E-025 | POST `/businesses/{businessId}/submit` | Mobile | Owning Founder | Validate and submit | D | R1 S | BE-BIZ-004/005/012 | E021,E025,E027 |
| API-E-026 | POST `/businesses/{businessId}/publish` | Mobile | Owning Founder; gate policy pending | Publish when permitted | D | R1 CND, DEC-031 | BE-BIZ-004/005 | E021,E025,E026? |
| API-E-027 | GET `/businesses/{businessId}/history` | Mobile | Owner/granted governance view | Business status history | L | R1 S | BE-BIZ-004 | E025 |
| API-E-028 | GET `/discovery/businesses` | Mobile | Participant | Published teaser search/filter | L | R1 S | BE-DSC-001..008 | E021,E009 |
| API-E-029 | GET `/discovery/businesses/{businessId}` | Mobile | Participant; stage-filtered | Teaser/protected view | R | R1 S | BE-DSC, BE-DIS | E021..E024,E036 |
| API-E-030 | GET `/businesses/{businessId}/readiness` | Mobile | Owner/authorized | Score and explanation | R | R1 S | BE-AI-001..006 | E027..E030 |
| API-E-031 | GET `/matches` | Mobile | Participant role | Authorized match results/explanations | L | Functional API R1; storage alternative PROPOSED | BE-AI-007..013 | Deterministic calculation from E010..E016/E021..E030, or persisted E031/E032 only with MC3 |
| API-E-032 | POST `/businesses/{businessId}/invitations` | Mobile | Owning Founder | Invite Professional | C | PA CND | BE-USR-011/012, BE-BIZ-013 | E070 |
| API-E-033 | GET `/business-invitations` | Mobile | Invitee/Founder in scope | List invitations | L | PA CND | BE-USR-011/012 | E070 |
| API-E-034 | POST `/business-invitations/{invitationId}/response` | Mobile | Named invitee | Accept/decline invitation | D | PA CND | BE-USR-012/013 | E070,E071 |
| API-E-035 | GET `/businesses/{businessId}/members` | Mobile | Founder or roster permission | Team roster | L | PA CND | BE-BIZ-013/015 | E071,E073 |
| API-E-036 | GET `/businesses/{businessId}/role-definitions` | Mobile | Current member | Allowed role catalogue | L | PA CND | BE-ROL-006..009 | E072 |
| API-E-037 | POST `/businesses/{businessId}/role-assignments` | Mobile | Founder under pending policy | Assign scoped role | C | PA CND | BE-USR-014, BE-BIZ-014 | E073 |
| API-E-038 | POST `/businesses/{businessId}/role-assignments/{assignmentId}/revoke` | Mobile | Founder under pending policy | Revoke assignment | D | PA CND | BE-BIZ-017 | E073 |
| API-E-039 | POST `/businesses/{businessId}/permission-grants` | Mobile | Owning Founder | Grant explicit resource/action | C | PA CND | BE-ROL-011, BE-BIZ-014 | E074 |
| API-E-040 | POST `/businesses/{businessId}/permission-grants/{grantId}/revoke` | Mobile | Owning Founder | Revoke grant | D | PA CND | BE-BIZ-017, BE-SEC-011 | E074 |
| API-E-041 | GET `/businesses/{businessId}/effective-permissions` | Mobile | Current member, self only | Current effective permission view | R | PA CND | BE-ROL-011, BE-BIZ-013 | E071..E074 |
| API-E-042 | GET `/businesses/{businessId}/workspace` | Mobile | Current member + grants | Minimized workspace | R | PA CND | BE-BIZ-015 | E071,E074,E075 |
| API-E-043 | POST `/businesses/{businessId}/tasks` | Mobile | Exact create-task grant | Create task | C | PA CND | BE-BIZ-016 | E075 |
| API-E-044 | PATCH `/businesses/{businessId}/tasks/{taskId}` | Mobile | Exact task action grant | Update/assign/manage task | W | PA CND | BE-BIZ-016/017 | E075,E074 |
| API-E-045 | POST `/businesses/{businessId}/interests` | Mobile | Investor/Professional | Express interest | C | R1 S | BE-INT-001..003 | E033 |
| API-E-046 | GET `/interests` | Mobile | Participant party | List own interests | L | R1 S | BE-INT-005/006 | E033 |
| API-E-047 | POST `/interests/{interestId}/respond` | Mobile | Owning Founder/party | Respond and create connection if mutual | D | R1 S | BE-INT-002/003 | E033,E035 |
| API-E-048 | GET `/connections` | Mobile | Participant party | List connections | L | R1 S | BE-INT-002/006 | E035 |
| API-E-049 | POST `/connections/{connectionId}/nda-responses` | Mobile | Named party | Version-bound NDA response | C | R1 S | BE-DIS-003/004 | E038 nda_responses; E036 relationship; E007 legal version |
| API-E-050 | POST `/connections/{connectionId}/stage4-confirmation` | Mobile | Owning Founder | Explicit Stage 4 confirmation | D | R1 S | BE-DIS-005 | E036 disclosure relationship; E037 stage event |
| API-E-051 | POST `/connections/{connectionId}/deals` | Mobile | Authorized Founder/system rule | Create Deal under pending trigger | C | R1 CND G-08 | BE-DLR-001/002 | E040,E035 |
| API-E-052 | GET `/deals/{dealId}` | Mobile | Core Deal party; current delegate only with extension | Authorized Deal summary | R | R1 party core; delegation PA | BE-DLR-004/008 | E040 core; E071/E076 only after MP1/MP2 |
| API-E-053 | GET `/deals/{dealId}/history` | Mobile | Deal party/current delegate action | State history | L | R1 S | BE-DLR-003 | E041 |
| API-E-054 | POST `/deals/{dealId}/delegations` | Mobile | Deal Founder | Create Finance Manager delegation | C | PA CND | BE-DLR-009..013 | E076,E077 |
| API-E-055 | POST `/deals/{dealId}/delegations/{delegationId}/revoke` | Mobile | Deal Founder | Revoke delegation | D | PA CND | BE-DLR-010 | E076 |
| API-E-056 | GET `/deals/{dealId}/delegations` | Mobile | Founder/delegate self as permitted | List safe delegation metadata | L | PA CND | BE-DLR-009/011 | E076,E077 |
| API-E-057 | POST `/deals/{dealId}/proposals` | Mobile | Founder/Investor core; Finance Manager only with extension | Create immutable proposal/counter | C | R1 party core; delegate PA | BE-NEG-001..009 | E042 core; E071/E076/E077 only after MP1/MP2 |
| API-E-058 | GET `/deals/{dealId}/proposals` | Mobile | Deal party/current authorized delegate | Versioned proposals | L | R1 S | BE-NEG-001/006 | E042 |
| API-E-059 | POST `/deals/{dealId}/proposals/{proposalId}/founder-confirmation` | Mobile | Authenticated Deal Founder only | Final Founder-side confirmation | D | R1 S | BE-AGR-001/003..005 | E043 |
| API-E-060 | POST `/deals/{dealId}/proposals/{proposalId}/counterparty-confirmation` | Mobile | Authenticated Deal counterparty only | Independent confirmation | D | R1 S | BE-AGR-001/003..005 | E043 |
| API-E-061 | GET `/deals/{dealId}/agreement` | Mobile | Deal parties/authorized read | Read simulated Agreement | R | R1 S | BE-AGR-001 | E044 |
| API-E-062 | POST `/conversations` | Mobile | Authorized initiator per type | Create hiring/team/deal conversation | C | PA CND | BE-MSG-005..010 | E078,E079 |
| API-E-063 | GET `/conversations` | Mobile | Participant; current authorization | All/hiring/team/deal filtered inbox | L | PA CND | BE-MSG-005/006/010 | E078..E080,E045 |
| API-E-064 | GET `/conversations/{conversationId}` | Mobile | Current participant authorization | Safe conversation detail | R | PA CND | BE-MSG-006..012 | E078,E079 |
| API-E-065 | GET `/conversations/{conversationId}/messages` | Mobile | Current participant authorization | Paginated messages | L | PA CND | BE-MSG-002/010/011 | E045,E079 |
| API-E-066 | POST `/conversations/{conversationId}/messages` | Mobile | Current send authorization | Send text message; no formal action | C | PA CND | BE-MSG-010/018 | E045,E079 |
| API-E-067 | PUT `/conversations/{conversationId}/read-state` | Mobile | Current participant | Advance own read position | W | PA CND | BE-MSG-010/012 | E080,E045 |
| API-E-068 | GET `/conversation-search` | Mobile | Participant; authorization before selection | Authorized message/conversation search | L | PA CND | BE-MSG-011/012 | E078,E045 |
| API-E-069 | POST `/conversations/{conversationId}/participants/{participantId}/end-access` | Mobile | Authorized context owner/policy | End participant access | D | PA CND | BE-MSG-014/015 | E079 |
| API-E-070 | POST `/deals/{dealId}/milestones` | Mobile | Founder core; delegated drafting only if approved/deployed | Create/draft milestone | C | R1 Founder core; delegation PA | BE-MIL-001/002 | E046 core; E071/E074/E075 only after MP1/MP2 |
| API-E-071 | PATCH `/deals/{dealId}/milestones/{milestoneId}` | Mobile | Founder core; exact operational grant only with extension | Update/assign milestone | W | R1 Founder core; delegation PA | BE-MIL-001/003/009 | E046 core; E071/E074/E075 only after MP1/MP2 |
| API-E-072 | GET `/deals/{dealId}/milestones` | Mobile | Deal party/authorized delegate | Milestones/history | L | R1 S | BE-MIL-001..009 | E046,E047,E048 |
| API-E-073 | POST `/deals/{dealId}/milestones/{milestoneId}/progress` | Mobile | Exact progress grant/party | Add progress/evidence | C | R1 S | BE-MIL-009 | E048,E017 |
| API-E-074 | POST `/deals/{dealId}/milestones/{milestoneId}/founder-mark-complete` | Mobile | Deal Founder only under current safe policy | Formal Founder mark-complete | D | R1 S; delegation PENDING | BE-MIL-003 | E047 |
| API-E-075 | POST `/deals/{dealId}/milestones/{milestoneId}/counterparty-confirm` | Mobile | Deal counterparty only | Independent confirmation/unlock | D | R1 S | BE-MIL-003/004/006 | E047,E041 |
| API-E-076 | POST `/deals/{dealId}/milestones/{milestoneId}/disputes` | Mobile | Either Deal party | Flag dispute | D | R1 S | BE-MIL-005 | E047 |
| API-E-077 | POST `/deals/{dealId}/financial-reports` | Mobile | Founder core; exact create-draft grant only with extension | Create report shell/draft version | C | R2 Founder core; delegation CND | BE-FIN-001..003/012..016 | E055/E056 M11 core; E071/E074 provenance only after MP1/MP4 |
| API-E-078 | POST `/financial-reports/{reportId}/versions` | Mobile | Founder core; exact edit-draft grant only with extension | Insert immutable version | C | R2 Founder core; delegation CND | BE-FIN-003/005/013..015 | E056/E057/E058 M11 core; E071/E074 only after MP1/MP4 |
| API-E-079 | GET `/financial-reports/{reportId}` | Mobile | Deal party/exact read grant/necessary Admin via admin route | Read safe report/version history | R | R2 S | BE-FIN-005/006/012 | E055..E058 |
| API-E-080 | POST `/financial-reports/{reportId}/versions/{versionId}/submit` | Mobile | Founder or separately approved submit grant | Append submission event | D | R2 CND BR-DEC-007 | BE-FIN-004/013..016 | E058 |
| API-E-081 | POST `/financial-reports/{reportId}/versions/{versionId}/founder-attestation` | Mobile | Owner Founder only | Append Founder attestation | D | R2 S boundary | BE-FIN-016 | E058 |
| API-E-082 | POST `/financial-reports/{reportId}/versions/{versionId}/evidence` | Mobile | Authorized draft actor before submission | Attach protected evidence | W/F | R2 CND policy | BE-FIN-006/014 | E057,E017 |
| API-E-083 | POST `/financial-reports/{reportId}/discrepancies` | Mobile | Investor on funded Deal | Flag discrepancy | C | R2 S | BE-FIN-008/009 | E059,E060 |
| API-E-084 | GET `/deals/{dealId}/simulated-finance` | Mobile | Authorized Deal party | Read simulated terms/funding/commission | R | R2 CND | BE-INV, BE-PAY | E054,E061,E062 |
| API-E-085 | GET `/me/premium-entitlements` | Mobile | Participant self | Read simulated entitlement | R | R2 CND | BE-PRM-001..003 | E063 |
| API-E-086 | GET `/notifications` | Both | Recipient self | Authorized safe notifications | L | R1 in-app; other channels CND | BE-NTF-001/005..009 | E051 |
| API-E-087 | PUT `/notifications/{notificationId}/read` | Both | Recipient self | Mark notification read | W | R1 S | BE-NTF-005 | E051 |
| API-E-088 | GET `/notification-preferences` | Mobile | Participant self | Read preferences | R | R1 CND | BE-NTF-003 | E052 |
| API-E-089 | PUT `/notification-preferences` | Mobile | Participant self | Replace allowed preferences | W | R1 CND | BE-NTF-003 | E052 |
| API-E-090 | POST `/deals/{dealId}/feedback` | Mobile | Eligible Deal party | Create one feedback entry | C | R1 S | BE-REP-001..008 | E049,E050 |
| API-E-091 | GET `/participants/{participantId}/reputation` | Mobile | Authorized viewer | Minimized reputation summary | R | R1 S | BE-REP-001..008 | E050 |
| API-E-092 | POST `/reports-disputes` | Mobile | Participant | Create basic report/dispute | C | R3 CND | BE-ADM-007 | E067 |
| API-E-093 | POST `/admin/auth/login` | Admin | Internal Admin credentials | Admin login | W | R1 REQUIRED; model PENDING | BE-ADM-014/016 | E003 core; E005 only with MC1/session option |
| API-E-094 | POST `/admin/auth/logout` | Admin | Admin session | Revoke Admin session | W | R1 REQUIRED; model PENDING | BE-ADM-014 | E003 core revocation alternative; E005 only with MC1/session option |
| API-E-095 | GET `/admin/verification-requests` | Admin | Admin verification duty | Tier 1 queue | L | R1 REQUIRED OD-03 | BE-ADM-003, AD-WF | E018 |
| API-E-096 | GET `/admin/verification-requests/{requestId}` | Admin | Assigned/authorized reviewer | Request and safe evidence metadata | R | R1 REQUIRED | BE-ADM-003/015 | E018,E019,E017 |
| API-E-097 | GET `/admin/verification-requests/{requestId}/evidence/{fileId}` | Admin | Authorized reviewer | Audited evidence retrieval | R | R1 REQUIRED | BE-VER-003, BE-ADM-015 | E017,E019,E053 |
| API-E-098 | POST `/admin/verification-requests/{requestId}/decision` | Admin | Authorized reviewer | Approve/reject/request information | D | R1 REQUIRED | BE-ADM-003/012 | E018,E020,E001,E053 |
| API-E-099 | GET `/admin/users` | Admin | Admin; inventory per OD-10 | Redacted user directory | L | R1 CND OD-10 | BE-ADM-001 | E001,E002 |
| API-E-100 | POST `/admin/users/{accountId}/suspension` | Admin | Authorized Admin with reason | Suspend participant | D | CND OD-10 | BE-ADM-002/012 | E001,E053 |
| API-E-101 | POST `/admin/users/{accountId}/restoration` | Admin | Authorized Admin with reason | Restore participant | D | CND OD-10 | BE-ADM-002/012 | E001,E053 |
| API-E-102 | POST `/admin/businesses/{businessId}/moderation-actions` | Admin | Authorized Admin; policy enabled | Flag/suspend/restore listing only | D | R1 candidate CND | BE-ADM-004, BE-BIZ-004 | E026,E021,E053 |
| API-E-103 | GET `/admin/financial-reports` | Admin | Necessary financial reviewer | Review queue; no figure writes | L | R2 CND | BE-ADM-006, BE-FIN-010 | E055..E060 |
| API-E-104 | POST `/admin/financial-reports/{reportId}/review-events` | Admin | Necessary reviewer with reason | Append review event only | D | R2 CND | BE-FIN-010, AD-FIN | E058,E053 |
| API-E-105 | POST `/admin/discrepancies/{discrepancyId}/events` | Admin | Necessary reviewer with reason | Append discrepancy outcome | D | R2 CND | BE-FIN-009 | E060,E053 |
| API-E-106 | GET `/admin/audit-logs` | Admin | Authorized audit reader | Redacted audit search | L | CND OD-10 | BE-ADM-009, BE-AUD | E053 |
| API-E-107 | GET `/admin/metrics` | Admin | Authorized Admin | Approved metric set only | R | CND OD-10/G-07 | BE-ADM-010 | Derived |
| API-E-108 | GET `/admin/notifications` | Admin | Admin recipient | Safe Admin inbox | L | CND OD-10 | BE-NTF-006 | E051 |
| API-E-109 | GET `/admin/reports-disputes` | Admin | Authorized reviewer | Redacted reports queue | L | R3 CND | BE-ADM-007 | E067 |
| API-E-110 | POST `/admin/reports-disputes/{reportId}/events` | Admin | Authorized reviewer with reason | Resolve/escalate under approved policy | D | R3 CND | BE-ADM-005/007 | E067,E068,E053 |
| API-E-111 | GET `/admin/platform-settings` | Admin | Authorized Admin | Read approved settings | R | R3 CND | BE-ADM-011 | E069 |
| API-E-112 | PUT `/admin/platform-settings/{settingKey}` | Admin | Authorized Admin and approved key | Update approved setting | D | R3 CND | BE-ADM-011/012 | E069,E053 |
| API-E-113 | GET `/deals` | Mobile | Founder/Investor/Professional counterparty core; exact current delegate only with MP1/MP2 | Authorized paginated My Deals summaries/search | L | R1 party core; delegated mode PA | BE-DSH-001/002, BE-DLR-004/008 | E040 core; E071/E076 only after MP1/MP2 |

No Admin conversation-list, conversation-detail, message-read or message-search endpoint exists.

### 15.2 Endpoint-specific schema annex

This annex is normative within this PROPOSED contract. `P`, `Q`, `B`, and `O` mean path parameters, query parameters, request body, and success output. `!` means required; `?` means optional. All IDs are opaque strings; timestamps are RFC 3339; money is `{amount:decimal-string,currency:"BDT"}`. Every object is wrapped in the Section 2 envelope. Unless overridden, read/list succeeds with 200, create with 201, update/decision with 200, and logout/read-marker actions may use 204. Common errors are 400/401/423/429; protected scope adds existence-hiding 404; uniqueness, stale version, or replay adds 409. `I` means `Idempotency-Key`; `V` means `If-Match`; `A` means security/state audit. Conditional fields are rejected unless their named feature/migration is enabled.

Reusable bodies: `Credentials={email!:string,password!:string}`; `Cursor={cursor?:string,limit?:int[1..100],sort?:allowed-enum}`; `FileRef={fileId!:id}`; `Decision={decision!:allowed-enum,reason!:nonblank-string,expectedVersion?:string}`; `Grant={membershipId!:id,resourceType!:enum,resourceId?:id,action!:enum,validUntil?:timestamp}`. Reusable outputs: `Account={accountId,status,verificationTier,roles[]}`; `Page<T>={data:T[],page:{cursor,nextCursor,limit}}`; `File={fileId,name,mediaType,sizeBytes,status}`; `Event={eventId,type,occurredAt,actorSummary}`. Passwords/tokens are write-only. Enumerations and field catalogues that sources leave unresolved remain PENDING and are not expanded here.

| Endpoints | P and Q | Body | Output | Controls and policy gates |
|---|---|---|---|---|
| E001 | P none; Q none | email!, password!, roles![], consents![documentCode,version] | Account; 201 | Public participant; I/A; role/consent validation |
| E002 | none | Credentials | Account plus opaque session result; 200 | Neutral auth errors; session fields PENDING; A |
| E003 | none | none | no content; 204 | Current participant session; idempotent; A; session model PENDING |
| E004 | none | email! | accepted:true; 202 | Neutral existence response; I/rate limit |
| E005 | none | token!, newPassword! | changedAt; 200 | One-time token; I/A; password policy PENDING |
| E006 | none | token! | verifiedAt; 200 | One-time token; I/A |
| E007 | none | phone!, code! | verifiedAt; 200 | Authenticated; CONDITIONAL phone feature |
| E008 | none | none | Account; 200 | Participant self |
| E009 | Q Cursor | none | Page<{roleCode,status}> | Participant self |
| E010 | none | roleCode! | activeRole; 200 | Held role only; V/A; G-06 PENDING |
| E011 | Q Cursor | none | Page<{documentCode,version,acceptedAt}> | Participant self |
| E012 | none | none | roleCode, profileFields object | Participant active role; fields sourced/PENDING by profile |
| E013 | none | profileFields! object | roleCode, profileFields,version; 200 | Participant self; V/A; unknown fields rejected |
| E014 | P listCode!; Q Cursor | none | Page<{code,label,isActive}> | Only approved list; retired entries filtered |
| E015 | none | requestedTier!=1, applicantNotes?, evidenceFileIds![] | requestId,status,submittedAt; 201 | Participant self; I/A; one-open-key; reapply PENDING |
| E016 | none | none | requestId,status,reason?,submittedAt,decidedAt? | Owner only; no evidence contents |
| E017 | none | multipart file!,purpose!,contextType!,contextId? | File; 201 | Authorized context; I/A; type/size PENDING |
| E018 | P fileId! | none | authorized binary plus safe headers; 200 | Current purpose authorization; A; no storage key |
| E019 | none | title!,industryCode?,stageCode?,fundingRequirement? | businessId,status=draft,version; 201 | Founder; I/A; exact required fields PENDING |
| E020 | P businessId! | none | authorized Business fields,sections[],stage | Owner/grant/stage filter before selection |
| E021 | P businessId! | mutable Business fields object | businessId,status,version; 200 | Founder core; V/A; delegated actor only MP1 |
| E022 | P businessId!,sectionCode! | content! object,minStage? | sectionCode,version; 200 | Founder core; V/A; fields/min-stage catalogue PENDING |
| E023 | P businessId! | fileId!,kind!,stageTag! | documentId,File metadata,stageTag; 201 | Owner/exact grant; I/A |
| E024 | P businessId!; Q Cursor | none | Page<File metadata plus stageTag> | Current stage; locked content omitted |
| E025 | P businessId! | expectedVersion? | businessId,status,readinessSummary; 200 | Founder; I/V/A; readiness validation errors 422 |
| E026 | P businessId! | expectedVersion? | businessId,status; 200 | Founder; DEC-031 gate unresolved; I/V/A |
| E027 | P businessId!; Q Cursor | none | Page<Event> | Owner/authorized governance view |
| E028 | Q cursor,limit,industry?,stage?,location?,amount?,query?,sort? | none | Page<BusinessTeaser> | Published only; filter/search semantics PENDING |
| E029 | P businessId! | none | BusinessTeaser plus authorizedFields | Stage filtering; 404 hides inaccessible listing |
| E030 | P businessId! | none | score, factors[{code,score,incomplete,explanation}] | Authorized; weights/version included when available |
| E031 | Q Cursor plus counterpartType?,businessId? | none | Page<{counterpartId,score,factors[],calculationVersion}> | Required API; deterministic core or persisted MC3; same output |
| E032 | P businessId! | inviteeAccountId!,proposedRoleCode?,grantProposal? | invitationId,status,version; 201 | Founder; I/A; invitation semantics PENDING/MP1 |
| E033 | Q Cursor,status?,businessId? | none | Page<InvitationSummary> | Invitee or Founder in same Business; MP1 |
| E034 | P invitationId! | response!:accept/decline,invitationVersion! | invitationId,status,membershipId?; 200 | Named invitee; I/V/A; MP1 |
| E035 | P businessId!; Q Cursor,status? | none | Page<{membershipId,participantSummary,roles[],status}> | Founder/roster grant; MP1 |
| E036 | P businessId!; Q Cursor | none | Page<{roleDefinitionId,code,label,ceiling?}> | Current member; Custom Role fields conditional; MP1 |
| E037 | P businessId! | membershipId!,roleDefinitionId! | assignmentId,status,grantedAt; 201 | Founder/policy; I/A; MP1 |
| E038 | P businessId!,assignmentId! | reason!,expectedVersion? | assignmentId,status,revokedAt; 200 | Founder/policy; I/V/A; never reactivate |
| E039 | P businessId! | Grant | grantId,status,grantedAt; 201 | Founder; I/A; permission catalogue PENDING/MP1 |
| E040 | P businessId!,grantId! | reason!,expectedVersion? | grantId,status,revokedAt; 200 | Founder; I/V/A; cache invalidation/MP1 |
| E041 | P businessId! | none | membershipId,permissions[{resourceType,resourceId?,actions[]}] | Self only; merge policy PENDING/MP1 |
| E042 | P businessId! | none | authorized documents,tasks,milestones,conversations summaries | Current membership/grants; MP1/MP3 as applicable |
| E043 | P businessId! | title!,description?,assigneeMembershipId?,dueAt? | taskId,status,version; 201 | Exact create grant; I/A; MP1 |
| E044 | P businessId!,taskId! | allowed task fields | taskId,status,version; 200 | Exact action grant; V/A; MP1 |
| E045 | P businessId! | intent? | interestId,status; 201 | Investor/Professional; I/A; reinvite rule PENDING |
| E046 | Q Cursor,status? | none | Page<InterestSummary> | Participant party only |
| E047 | P interestId! | response!:accept/decline,expectedVersion? | interestId,status,connectionId? | Authorized party; I/V/A |
| E048 | Q Cursor,status? | none | Page<ConnectionSummary> | Connection party only |
| E049 | P connectionId! | decision!:accepted/declined,legalDocumentVersionId! | ndaResponseId,relationshipId,decision,respondedAt; 201 | Named party; I/A; DB-E038 with E036/E007; one response/party |
| E050 | P connectionId! | confirmation!:confirm,expectedStage!:3 | relationshipId,stage:4,event:Event; 200 | Owning Founder; I/V/A; writes E036 plus E037, never E038 |
| E051 | P connectionId! | none or triggerCode? | dealId,state,version; 201 | Authorized trigger; I/A; G-08 PENDING |
| E052 | P dealId! | none | DealSummary,state,participants,authorizedResources | Core party via E040; delegate fields only MP1/MP2 |
| E053 | P dealId!; Q Cursor | none | Page<StateEvent> | Core party; delegate only with exact read action |
| E054 | P dealId! | delegateMembershipId!,actions![],validUntil? | delegationId,status; 201 | Deal Founder; I/A; MP1/MP2; limits PENDING |
| E055 | P dealId!,delegationId! | reason!,expectedVersion? | delegationId,status,revokedAt; 200 | Deal Founder; I/V/A; MP2 |
| E056 | P dealId!; Q Cursor,status? | none | Page<DelegationSummary> | Founder or delegate self; unrelated grants omitted; MP2 |
| E057 | P dealId! | kind!:proposal/counter,terms! object,supersedesProposalId? | proposalId,version,proposerSummary,status; 201 | Founder/Investor core; delegate MP2; I/A; term schema PENDING |
| E058 | P dealId!; Q Cursor | none | Page<ProposalVersion> | Deal party; delegated read only MP2 |
| E059 | P dealId!,proposalId! | proposalVersion!,confirmation!:confirm,expectedVersion? | confirmationId,side:founder,agreementId? | Authenticated Deal Founder only; I/V/A |
| E060 | P dealId!,proposalId! | proposalVersion!,confirmation!:confirm,expectedVersion? | confirmationId,side:counterparty,agreementId? | Authenticated counterparty only; I/V/A |
| E061 | P dealId! | none | agreementId,proposalVersion,confirmedAt,isSimulation:true,terms | Authorized parties; immutable/read-only |
| E062 | none | type!:hiring/team/deal,businessId?,dealId?,participantAccountId?,participantMembershipIds?[] | conversationId,type,createdAt; 201 | Type-specific authorization; I/A; MP3; participant rules PENDING |
| E063 | Q Cursor,filter!:all/hiring/team/deal,query? | none | Page<SafeConversationSummary> | Authorization before query; MP3 |
| E064 | P conversationId! | none | conversationId,type,authorizedContext,participants[],safePreview?,unreadCount | Current participant; 404 on loss; MP3 |
| E065 | P conversationId!; Q Cursor | none | Page<{messageId,senderSummary,body,createdAt}> | Current read auth before selection; MP3 |
| E066 | P conversationId! | body!:nonblank-string | messageId,createdAt; 201 | Current send auth; I/A metadata; MP3; no formal action |
| E067 | P conversationId! | lastReadMessageId! | conversationId,lastReadMessageId,readAt; 200 | Participant self; monotonic/V; MP3 |
| E068 | Q query!,Cursor,type? | none | Page<AuthorizedSearchHit> | Authorization before search/snippet; MP3; search semantics PENDING |
| E069 | P conversationId!,participantId! | reason!,expectedVersion? | participantId,accessEndedAt | Authorized policy actor; I/V/A; MP3; history policy PENDING |
| E070 | P dealId! | sequenceNo!,description!,amount! money | milestoneId,status,version; 201 | Founder core E046; delegate only MP1/MP2; I/A |
| E071 | P dealId!,milestoneId! | allowed fields:description?,amount?,assignedMembershipId? | milestoneId,status,version | Founder core; assignment/delegate fields require MP1/MP2; V/A |
| E072 | P dealId!; Q Cursor | none | Page<MilestoneSummary plus events/progress> | Deal party; delegated read conditional |
| E073 | P dealId!,milestoneId! | content!,evidenceFileIds?[] | progressId,createdAt; 201 | Party/exact grant; I/A |
| E074 | P dealId!,milestoneId! | notes?,evidenceFileIds?[],expectedVersion? | Event,status; 200 | Founder only safe policy; I/V/A; delegation PENDING |
| E075 | P dealId!,milestoneId! | confirmation!:confirm,expectedVersion? | Event,status,nextMilestoneUnlocked | Counterparty only; I/V/A |
| E076 | P dealId!,milestoneId! | reasonCode!,note? | Event,status:disputed | Either Deal party; I/V/A; Admin resolution absent |
| E077 | P dealId! | businessId!,periodStart!,periodEnd!,initialVersion! financial-version body | reportId,versionId,versionNo | Founder M11 core; delegated actor fields MP4; I/A |
| E078 | P reportId! | revenue!,expenses!,cashPosition?,notes?,editNote!,evidenceFileIds?[] | versionId,versionNo,netAmount | Immutable insert; Founder M11 core, delegate MP4; I/A |
| E079 | P reportId! | none | report metadata,versions[],derivedLifecycle | Authorized Deal/read grant; Admin uses E103; no mutation |
| E080 | P reportId!,versionId! | event!:submit,expectedVersionNo! | Event,derivedLifecycle | Founder or separately approved submit grant; I/V/A; BR-DEC-007/MP4 |
| E081 | P reportId!,versionId! | event!:founder_attest,statementVersion! | Event,derivedLifecycle | Owner Founder only; I/A; never generic grant |
| E082 | P reportId!,versionId! | fileId! | versionId,file:File; 201 | Authorized draft actor before submit; I/A; policy gate; immutable link |
| E083 | P reportId! | flaggedVersionId!,reasonCode!,note? | discrepancyId,status:needs_review; 201 | Investor on funded Deal; I/A |
| E084 | P dealId! | none | investmentTerms?,fundingRecords[],commissionRecords[],isSimulation:true | Authorized party; R2 conditional |
| E085 | none | none | entitlements[{planCode,validFrom,validTo,isSimulated:true}] | Participant self; R2 conditional |
| E086 | Q Cursor,read? | none | Page<SafeNotification> | Recipient self; reauthorize targets before selection |
| E087 | P notificationId! | none | readAt; 200 | Recipient self; idempotent/V |
| E088 | none | none | preferences[{eventCode,channel,isEnabled}] | Self; E052/MC5 conditional |
| E089 | none | preferences![eventCode,channel,isEnabled][] | same preferences; 200 | Self; V/A; allowed catalogue PENDING/MC5 |
| E090 | P dealId! | subjectParticipantId!,content! | feedbackId,createdAt; 201 | Eligible Deal party; I/A; one reviewer/Deal |
| E091 | P participantId! | none | participantId,summary,history? minimized | Authorized visibility; no private source details |
| E092 | none | category!,targetType!,targetId!,reason!,severity? | reportId,status; 201 | Participant; I/A; R3/policy conditional |
| E093 | none | Credentials | adminId,opaque session result; 200 | Internal provisioned Admin; A; session model PENDING/MC1 optional |
| E094 | none | none | no content; 204 | Current Admin session; idempotent/A |
| E095 | Q Cursor,status?,submittedFrom?,submittedTo? | none | Page<VerificationQueueItem> | Authorized reviewer; R1/OD-03 |
| E096 | P requestId! | none | request fields,safe applicant summary,evidence metadata,events | Authorized reviewer; no raw storage key |
| E097 | P requestId!,fileId! | none | authorized binary plus safe headers | Reviewer purpose; access audit; R1 |
| E098 | P requestId! | Decision | requestId,status,decidedAt,tier | Reviewer; I/V/A; atomic one-winner transaction |
| E099 | Q Cursor,role?,status?,tier?,query? | none | Page<RedactedUserSummary> | Admin; OD-10 gate; no credentials/evidence |
| E100 | P accountId! | reason!,expectedVersion? | accountId,status:suspended | Admin; I/V/A; OD-10; revoke sessions under chosen model |
| E101 | P accountId! | reason!,expectedVersion? | accountId,status:active | Admin; I/V/A; OD-10; restoration policy PENDING |
| E102 | P businessId! | action!:flag/suspend_listing/restore_listing,reason! | moderationActionId,businessStatus | Admin; I/V/A; MC2/DEC-031; no content edit |
| E103 | Q Cursor,status?,dealId?,businessId? | none | Page<FinancialReviewSummary> | Necessary reviewer; R2; no participant write capability |
| E104 | P reportId! | eventType!:under_review/reviewed_by_admin,reason!,versionId! | Event,derivedLifecycle | Admin review event only; I/A; no figure/evidence writes |
| E105 | P discrepancyId! | outcome!:allowed-enum,reason! | Event,status | Admin reviewer; I/V/A; vocabulary PENDING |
| E106 | Q Cursor,actor?,action?,target?,from?,to? | none | Page<RedactedAuditEntry> | Authorized audit reader; OD-10; no secret payload |
| E107 | Q metricSet?,from?,to? | none | metrics object,generatedAt | Approved definitions only; OD-10/G-07; otherwise 501 |
| E108 | Q Cursor,read? | none | Page<SafeAdminNotification> | Admin recipient; OD-10 conditional |
| E109 | Q Cursor,status?,severity? | none | Page<RedactedReportSummary> | Authorized reviewer; R3 |
| E110 | P reportId! | eventType!:allowed-enum,reason! | Event,status | Reviewer; I/V/A; R3 policy/AD-DEC pending |
| E111 | none | none | settings[{key,value,version}] | Authorized Admin; approved keys only; R3 |
| E112 | P settingKey! | value!,reason!,expectedVersion? | key,value,version | Authorized Admin; I/V/A; approved key only; R3 |
| E113 | P none; Q cursor?,limit?:int[1..100],state?:one of eight states,businessId?:id,roleContext?:founder/investor/professional,query?:string,sort?:updated_desc/updated_asc | none | Page<{dealId,state,businessSummary,counterpartySummary,lastActivityAt,authorizedActionSummary}>; 200 | Authenticated current Deal party from E040 without MP joins; conditional delegate requires current E071/E076 same-Business/Deal authorization after MP1/MP2. Reauthorize before count/search/selection and page emission; revoked-basis rows excluded unless another independent basis succeeds. Cursor is opaque, scope-bound and tamper-rejected; search semantics PROPOSED; 404/empty page must not disclose unauthorized IDs, parties, counts or matches. |

---

## 16. Request and response examples

All values are synthetic. Each block is independently valid JSON.

### 16.1 Registration and login

```json
{"email":"founder@example.test","password":"Example-Only-Password","roles":["founder"],"consents":[{"documentCode":"terms","version":"2026-draft-1"}]}
```

```json
{"data":{"accountId":"acc_7d91","status":"active","verificationTier":0,"roles":["founder"]},"meta":{"requestId":"req_001"}}
```

### 16.2 Verification submission and Admin decision

```json
{"requestedTier":1,"applicantNotes":"Synthetic submission","evidenceFileIds":["file_demo_01"]}
```

```json
{"decision":"approved","reason":"Synthetic evidence met the documented Tier 1 review criteria","expectedVersion":"vr_3"}
```

### 16.3 Business, invitation and permission lifecycle

```json
{"title":"Demo Workshop","industryCode":"manufacturing","stageCode":"early","fundingRequirement":{"amount":"500000.00","currency":"BDT"}}
```

```json
{"response":"accepted","invitationVersion":1}
```

```json
{"membershipId":"mem_demo_1","resourceType":"business_section","resourceId":"section_market","action":"edit","validUntil":null}
```

```json
{"reason":"Assignment ended","expectedVersion":"grant_2"}
```

### 16.4 Delegation, proposal and formal confirmation

```json
{"delegateMembershipId":"mem_fin_1","actions":["proposal.create","proposal.counter"],"validUntil":"2027-01-31T18:00:00Z"}
```

```json
{"kind":"counter","supersedesProposalId":"proposal_4","terms":{"amount":{"amount":"750000.00","currency":"BDT"},"profitLossSharePercent":"12.50","reportingPeriod":"quarterly"}}
```

```json
{"proposalVersion":5,"confirmation":"confirm","expectedVersion":"proposal_5"}
```

The authenticated route determines whether this is Founder-side or counterparty confirmation; no actor field is accepted.

### 16.5 Hiring, Team and Deal messaging

```json
{"type":"hiring","participantAccountId":"acc_prof_1","businessId":"biz_demo_1"}
```

```json
{"type":"team","businessId":"biz_demo_1","participantMembershipIds":["mem_demo_1"]}
```

```json
{"type":"deal","businessId":"biz_demo_1","dealId":"deal_demo_1","participantMembershipIds":["mem_fin_1"]}
```

```json
{"body":"Synthetic message; this does not confirm any proposal or milestone."}
```

### 16.6 Milestone completion

```json
{"notes":"Founder marks the synthetic milestone complete","evidenceFileIds":["file_demo_02"],"expectedVersion":"milestone_4"}
```

```json
{"confirmation":"confirm","expectedVersion":"milestone_5"}
```

### 16.7 Financial version, submission, attestation and discrepancy

```json
{"revenue":{"amount":"220000.00","currency":"BDT"},"expenses":{"amount":"145000.00","currency":"BDT"},"cashPosition":{"amount":"90000.00","currency":"BDT"},"notes":"Synthetic figures","editNote":"Initial draft"}
```

```json
{"event":"submit","expectedVersion":1}
```

```json
{"event":"founder_attest","statementVersion":"draft-attestation-1"}
```

```json
{"flaggedVersionId":"finver_demo_1","reasonCode":"evidence_mismatch","note":"Neutral synthetic note"}
```

### 16.8 Safe notifications

```json
{"data":[{"notificationId":"ntf_demo_1","eventCode":"verification.updated","summary":"Your verification request was updated","readAt":null}],"page":{"cursor":null,"nextCursor":null,"limit":20},"meta":{"requestId":"req_099"}}
```

---

## 17. Authorization matrix

`G` means exact current grant/delegation and scope are additionally required; `O` means owner/party action; `-` means prohibited; `P` means pending policy.

| Capability | Founder | Investor | Skilled Professional | Finance Manager | Business Manager | Project Manager | Custom Role | Admin |
|---|---|---|---|---|---|---|---|---|
| Participant registration/profile | O | O | O | As participant | As participant | As participant | As participant | - |
| Create/own Business | O | - | - | - | - | - | - | - |
| Delegated Business resource edit | O | - | G | G | G | G | G/P | - |
| Publish/delete/transfer ownership | O/P | - | - | - | - | - | - | - |
| Invite/grant/revoke Business authority | O | - | - | - | - | - | - | - |
| Draft/counter Deal proposal | O | O | - | G | - | - | - | - |
| Founder-side final confirmation | O | - | - | - | - | - | - | - |
| Counterparty final confirmation | - | O | O if Deal counterparty | - | - | - | - | - |
| Team Chat | O/G | - | G | G | G | G | G/P | - |
| Deal Chat | O | O/party | Party/G | G | - | - | - | - |
| Operational task/milestone work | O | Party-specific | G | G | G | G | G/P | - |
| Formal Founder mark-complete | O | - | - | - | - | - | - | - |
| Counterparty milestone confirm | - | O/party | O if counterparty | - | - | - | - | - |
| Financial draft/edit | O | - | G | G | G if granted | - unless granted | G/P | - |
| Financial submit | O | - | P/G | P/G | P/G | - | P | - |
| Founder attestation | O | - | - | - | - | - | - | - |
| Tier 1 review/audit governance | - | - | - | - | - | - | - | O |
| Private conversation content | Own authorized | Own authorized | Own authorized | Own authorized | Own authorized | Own authorized | Own authorized | - |

---

## 18. Errors, security and concurrency

| Scenario | Required contract behavior |
|---|---|
| Unauthenticated/expired token | 401, no protected metadata; refresh behavior PENDING. |
| Suspended participant | 423 after authentication, sessions revoked under selected model. |
| Cross-Business, wrong Deal or conversation probing | Consistent 404; no ID/title/participant/preview/count/search/notification leak. |
| Revoked grant/delegation | Recheck before selection and commit; 404 or 403 where safe; no write. |
| Duplicate invitation/open verification | Database uniqueness; one commit, other 409 without relationship leakage. |
| Concurrent Admin decisions | Row lock/version check; exactly one decision/event/audit, loser 409. |
| Concurrent proposal confirmations | Version-bound unique confirmation; no agreement until both sides confirm same version. |
| Stale milestone/report update | `If-Match`/version conflict 409; no partial event. |
| Unauthorized message list/search/read | Authorization before query; empty success is not used when it would confirm a protected relationship. |
| Admin private-message probe | No route; protected generic 404 if routed through shared handler; security audit metadata only. |
| Invalid NDA/disclosure/tier | 404 for protected content; no document metadata beyond current stage. |
| Sensitive file request | Server-mediated authorization, access audit, no storage key or reusable public URL. |
| Idempotency replay | Same key/body returns original result; same key/different body returns 409. |
| Feature not deployed | 501 only for non-sensitive known capability; otherwise 404. |

Security headers, TLS termination, CORS, token storage, rate values, file limits and deployment controls are PENDING implementation decisions. Logs and analytics exclude passwords, tokens, evidence, raw financial figures and message content.

---

## 19. Release allocation and dependencies

| Deployment profile | Available API groups | Database migration boundary |
|---|---|---|
| R1 mandatory | Identity core, consent, Tier 1 submission and Admin review, core profiles/business/discovery/deal/milestone/notifications as finally allocated | M01..M10 mandatory for the full R1 core; exact product scope still G-07/OD-10 |
| R1 conditional | Auth helpers, moderation, persisted matches, applications, preferences | MC1..MC5 only when corresponding decision is approved |
| Business roles/delegation | API-E-032..044, 054..056 and delegated extensions | MP1 then MP2; PENDING BR-DEC-012/G-07 |
| Unified Messaging | API-E-062..069 | MP1, MP2, then MP3a..MP3d; PENDING MSG-DEC-013/G-07 |
| R2 finance | API-E-077..085, 103..105 | M11; MP4 only for delegated provenance after MP1 |
| R3/later Admin | API-E-092, 109..112 and later analytics | M12 and approved policies |

The complete minimum Tier 1 path uses M01 legal/reference parents; M02 participant accounts/account roles, Admin identities and consent; M03 append-only audit; and M04 protected files, verification requests, request-file links and verification events. Authentication is required, but MC1 is included only if the approved session/token alternative uses its helper tables; the core path must support the selected M02-compatible alternative and cannot silently require MC1. The path does not depend on profiles M05, Business roles, messaging, R2 or R3. No endpoint may be enabled before every table required by its selected contract alternative exists.

API-E-113 core-party listing reads DB-E040 from the M09 Deal core and does not require MP1/MP2. Its delegated-access branch must remain disabled unless MP1 membership and MP2 delegation tables/extensions are deployed; the query plan must not inner-join those conditional tables for core Founder, Investor or Professional-counterparty results.

---

## 20. Traceability matrix

| Endpoint ranges | Backend | Mobile | Admin | Database | Pending gates |
|---|---|---|---|---|---|
| E001..014 | BE-AUTH, BE-USR, BE-ROL, BE-REF | AUTH, ROL, profile requirements | - | E001..E016 | G-03..06, OD-08/11 |
| E015..018, E095..098 | BE-VER, BE-DOC, BE-ADM | VER, DOC | AD-MOD-03, AD-WF, AD-AC-011..023 | E017..E020,E053 | OD-05/09/10, AD-DEC-02/05 |
| E019..031 | BE-BIZ, BE-DOC, BE-DSC, BE-AI, BE-DIS | BIZ, DSC, AI, DIS | AD-BIZ conditional | E021..E030/E036/E039 core; E031/E032 only for MC3 persisted matching | DEC-015/019/031 |
| E032..044 | BE-ROL-006..012, BE-USR-011..014, BE-BIZ-013..018 | BRM-001..020 | AD-PRM-R06 | E070..E075 | BR-DEC-001..005/008..012 |
| E045..050 | BE-INT, BE-DIS | INT, NDA, DIS | - | E033..E039 | DEC-016/017 |
| E051..061 | BE-DLR, BE-NEG, BE-AGR | DLR, NEG, AGR | AD-BIZ-008..010 | E040..E044,E076,E077 | G-08, BR-DEC-006/009/011/012 |
| E113 | BE-DSH-001/002, BE-DLR-004/008 | DSH-001/002, Deal Rooms in progress | No Admin route | E040 core; E071/E076 conditional | G-07 core allocation; BR-DEC-006/012 delegated mode |
| E062..069 | BE-MSG-005..020, BE-SEC-009..014 | UMSG | AD-BIZ-011/AD-AC-032 negative only | E045,E078..E080 | DEC-010, MSG-DEC-001..013 |
| E070..076 | BE-MIL, BE-BIZ-016 | MIL, BRM | AD-BIZ oversight only | E046..E048,E074/E075 | DEC-014, BR-DEC-008/012 |
| E077..085, E103..105 | BE-FIN, BE-INV, BE-PAY, BE-PRM | FIN, INV | AD-FIN | E054..E063 | DEC-007/008/011..013, BR-DEC-007/012 |
| E086..092 | BE-NTF, BE-REP, BE-ADM | NTF, REP | AD notifications/reports | E049..E052,E067 | DEC-009/014/018 |
| E093..112 | BE-ADM, BE-AUD | - | AD-AUT/MOD/WF/AUD | E003,E018..E020,E026,E053,E055..E060,E067..E069 | OD-09/10, G-07, AD-DEC cards |

---

## 21. API acceptance and contract testing

Tests below are specifications only; none has run.

| ID | Acceptance criterion |
|---|---|
| API-AC-001 | Every catalogue row validates authentication and account status before protected data selection. |
| API-AC-002 | Public IDs are returned; database numeric keys and storage keys never appear. |
| API-AC-003 | Admin registration and participant impersonation routes do not exist. |
| API-AC-004 | On a clean schema with M01..M04, the selected authentication alternative supports participant and Admin identity/session prerequisites; protected evidence, request, request-file link, event and audit writes complete Tier 1 submission/review without M05..M12 or MP groups. MC1 is required only if that approved auth alternative selects its helper tables. |
| API-AC-005 | Concurrent open verification submissions yield one request; concurrent decisions yield one event and audit. |
| API-AC-006 | A Business A membership/grant cannot list, read, search or change Business B resources. |
| API-AC-007 | A role title without an exact active grant cannot perform a protected Business action. |
| API-AC-008 | Revocation blocks the next request and preserves prior actor/grant provenance. |
| API-AC-009 | A Finance Manager without current same-Deal proposal action cannot create a proposal. |
| API-AC-010 | Finance Manager, Business Manager, Project Manager, Custom Role and Admin cannot call Founder-confirmation. |
| API-AC-011 | Founder and counterparty confirmations are independently authenticated and bind the same immutable version. |
| API-AC-012 | Hiring Chat creates no Business membership or protected-resource access. |
| API-AC-013 | Team Chat requires current membership and messaging permission. |
| API-AC-014 | Deal Chat requires current Deal authorization and disclosure/NDA/tier gates. |
| API-AC-015 | Unauthorized messaging list/detail/search/preview/unread/notification calls reveal no conversation metadata. |
| API-AC-016 | Admin has no private-conversation catalogue route or default shared-handler access. |
| API-AC-017 | Project Manager operational grants cannot perform formal Founder milestone completion. |
| API-AC-018 | Counterparty milestone confirmation is separate and next milestone unlocks only afterward. |
| API-AC-019 | Financial edits create new immutable versions; old figures/evidence/provenance remain unchanged. |
| API-AC-020 | Submission and Founder attestation append separate events; draft/edit permission alone cannot attest. |
| API-AC-021 | Admin cannot change financial figures, create participant versions, submit or attest. |
| API-AC-022 | Every simulated finance response is labelled simulated and no real-payment fields/routes exist. |
| API-AC-023 | File access is stage/current-authorization checked, audited and contains no raw storage key. |
| API-AC-024 | Notification and search results are authorized before selection and safely redacted. |
| API-AC-025 | Audit API responses omit secrets, evidence content, message bodies and raw financial figures. |
| API-AC-026 | Every JSON example parses and uses fields defined by its endpoint/profile. |
| API-AC-027 | Endpoint IDs and method/path pairs are unique. |
| API-AC-028 | Every endpoint's mapped DB entity exists in Database Design 0.3 or is explicitly marked Derived/deterministic; API-E-049 writes E038 with E036/E007 references and API-E-050 updates E036 plus appends E037. |
| API-AC-029 | Conditional endpoints return no functional result when their migration group is absent; core Founder/Investor paths operate without joining E070..E080, and API-E-031 uses deterministic calculation when MC3 persistence is absent. |
| API-AC-030 | Unknown request fields and unsupported filters fail validation without changing state. |
| API-AC-031 | Idempotency replay and stale resource versions behave as Section 18 specifies. |
| API-AC-032 | Exactly five approved decisions are represented; no pending card is treated as approval. |
| API-AC-033 | Given API-E-113, a Founder, Investor or Professional counterparty receives only Deals naming that account in its authenticated role context without any MP table; a conditional delegate receives only same-Business/Deal rows authorized by current E071/E076 after MP1/MP2. Revoking that delegation removes only delegation-derived rows and invalidates cached pages; independent Deal-party access is separately re-evaluated and retained. Unauthorized IDs, parties, counts, matches, cursors and summaries are never disclosed. |

---

## 22. Risks and unresolved decisions

### 22.1 Risks

| ID | Risk | Mitigation |
|---|---|---|
| API-R-001 | Proposed routes treated as approved implementation | Preserve labels and require owner/API review. |
| API-R-002 | Token/session choice changes auth contract | Keep tokens opaque and resolve G-03/G-05/OD-08/11 before build. |
| API-R-003 | Cross-Business or conversation metadata leak | Authorization-before-query and negative tests. |
| API-R-004 | Generic grants accidentally confer Founder authority | Separate dedicated Founder/counterparty routes and deny generic action mapping. |
| API-R-005 | Conditional endpoint deployed without tables | Deployment-profile manifest and migration compatibility test. |
| API-R-006 | Financial update mutates history | Immutable version/event contract and database constraints. |
| API-R-007 | Admin scope expands beyond OD-03 | OD-10 gate and deny-by-default Admin inventory. |
| API-R-008 | File response leaks storage infrastructure | Server-mediated retrieval and schema scanning. |

### 22.2 API decision register

| ID | Decision | Status/source |
|---|---|---|
| API-DEC-001 | Base URL, path versioning and deprecation window | PENDING technical decision |
| API-DEC-002 | JWT/session/refresh/revocation and client storage model | PENDING G-03/G-05/OD-08/11 |
| API-DEC-003 | Cursor encoding, default/max page size and stable sort policy | PENDING technical decision |
| API-DEC-004 | Idempotency retention and key format | PENDING technical decision |
| API-DEC-005 | Rate limits and abuse response policy | PENDING technical/security decision |
| API-DEC-006 | File types, size limits and retrieval mechanism | PENDING OD-05 |
| API-DEC-007 | Business publication/Admin gate | PENDING DEC-031 |
| API-DEC-008 | Business-role catalogue, merge rules and grant ceiling | PENDING BR-DEC-002..005 |
| API-DEC-009 | Invitation/revocation/history semantics | PENDING BR-DEC-001/009/010 |
| API-DEC-010 | Deal/report/milestone delegated action catalogues | PENDING BR-DEC-006..008/011 |
| API-DEC-011 | Unified Messaging participants, delivery, retention and moderation | PENDING DEC-010, MSG-DEC-001..012 |
| API-DEC-012 | Business Roles and Messaging release allocation | PENDING BR-DEC-012, MSG-DEC-013, G-07 |
| API-DEC-013 | Financial submission/attestation delegation | PENDING BR-DEC-007 |
| API-DEC-014 | Wider R1 Admin inventory and Admin frontend/session details | PENDING OD-10/11 |
| API-DEC-015 | Error localization and public message catalogue | PENDING technical/product decision |

---

## 23. Definition of done

- [ ] Owner accepts the proposed route and envelope conventions.
- [ ] All API-DEC items required for the selected release are resolved or explicitly deferred.
- [ ] Endpoint schemas are converted into a reviewed machine-readable contract without changing behavior.
- [ ] Authorization matrix is independently security-reviewed.
- [ ] Every API-AC test is implemented and evidenced after G-10 authorization.
- [ ] Migration-profile compatibility is verified in a non-production environment.
- [ ] Privacy, retention, file and Admin-access policies are approved.
- [ ] No endpoint is described as implemented or tested without evidence.

---

## 24. Final document status

This is API Contract Edition 0.3-DRAFT. It proposes 113 endpoints and does not approve them or authorize development. Exactly five Revision 6 decisions remain approved: G-00, G-01 / DEC-046, OD-01 approach only, OD-03 and OD-07. G-07, G-10, DEC-010, DEC-042, BR-DEC-001..012, MSG-DEC-001..013 and all other unresolved decisions remain PENDING or NEEDS VERIFICATION. Minimum R1 Web Admin Tier 1 verification is preserved; exact wider R1 inventory remains PENDING under OD-10. No API, database, migration, test, server, Admin interface or mobile integration is claimed to exist.

API-CONTRACT-DOC5-0.3-DRAFT-END-MARKER

**END OF DOCUMENT - API_Contract.md**
