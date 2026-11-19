# Vault Ventures Mobile App - Decisions Register

**Revision 6. Generated 2026-11-18. DRAFT.** Five items are **APPROVED**: **G-00**, **G-01**, **OD-01**, **OD-03** and **OD-07**. G-00 was approved on 2026-11-15 (message sent 22:24, Asia/Dhaka). G-01, OD-01, OD-03 and OD-07 were approved at conversation level on 2026-11-15 (message sent 23:05, Asia/Dhaka), and recorded here on the owner's instruction of 23:17. Every other item is PENDING or NEEDS VERIFICATION. Revision 6 adds two owner-requested proposed feature systems and 25 PENDING decision cards; it does not approve their unresolved policy or implementation details. This document contains no application code, no endpoint definitions and no database schema, and authorises no development. **OD-01 approves the approach only; creating the Backend Functional Specification is not authorised.**

**Sources:** Mobile Functional Master Specification v2.1-DRAFT (v2.1), Development Plan and Implementation Roadmap 1.0-DRAFT (Roadmap), Final Independent Review Report of v2 (Review). Statements about the original phase prompts (P0 to P9) are as reported by v2.1; they were not re-read from the original files. The Roadmap text supplied ended at Section 5.4; Sections 6-14 were not available.

**Revision 6 change authority and precedence:** The owner's Revision 6 instruction is the source for the proposed Business Role Assignment & Permission System and Unified Messaging & Communication System. It establishes intended product boundaries but does not decide the detailed alternatives represented by BR-DEC-001 through BR-DEC-012 or MSG-DEC-001 through MSG-DEC-013. Existing approved decisions retain precedence; existing PENDING and NEEDS VERIFICATION items retain their statuses. Where a proposed feature depends on an undecided matter, the relevant new card remains PENDING.

**Non-negotiable compatibility boundaries for the proposals:** four disclosure stages; two-sided, versioned NDA acceptance; Tier 1 verification for Stage 3; explicit Founder confirmation for Stage 4; no disclosure-stage skipping; server-side data minimisation and authorization; the established eight Deal states; Founder-only final Founder-side agreement confirmation; independent Investor confirmation; simulated investment, funding, commission and premium only; no real-money transfer or payment gateway; no AI approval, finalisation or permission escalation; no default Admin access to private NDA content or messages. A chat message is never a final agreement confirmation.

## 1. Three kinds of statement (kept apart on purpose)

| Kind | Meaning | Where |
|---|---|---|
| CONFIRMED | Explicitly decided by the owner | Section 3 only |
| RECOMMENDATION | My proposal; not a decision, not approved | Marked 'Recommendation (PROPOSAL, not approved)' in every card |
| ASSUMPTION | Something I inferred or relied on; not confirmed | Section 4 |

## 2. Status legend

| Status | Meaning |
|---|---|
| APPROVED | The owner explicitly chose an option; logged in section 16. Currently G-00, G-01, OD-01, OD-03 and OD-07. |
| PENDING | Not decided; can be decided on judgement now. |
| NEEDS VERIFICATION | Not decided; evidence that can still be gathered (a phone proof of concept) should come first. Only G-02 is in this state. |

## 3. Confirmed decisions (the complete list)

### 3.1 G-00 - Backend integration target (approved 2026-11-15, message sent 22:24, Asia/Dhaka)

| Field | Value |
|---|---|
| Decision | G-00 Option B - new backend |
| Approver / date | Project owner (explicit instruction in chat) / 2026-11-15 (message sent 22:24, Asia/Dhaka) |
| Backend | Node.js + Express.js |
| Database | MySQL |
| API style | REST |
| Authentication family | JWT-based |
| Mobile client | React Native + Expo + TypeScript |
| Explicit exclusion | Laravel is not used as the mobile backend |

**Not confirmed by G-00:** Expo workflow/SDK/push/native modules (G-02); JWT token model, lifetimes, refresh, revocation, storage (G-03); Express or MySQL versions; hosting; email, SMS, push or file-storage providers; any endpoint, payload or schema; the start of any development; resolution of the JWT conflict (OD-08).

### 3.2 G-01 / DEC-046 - Option A: Legacy Laravel platform as read-only reference (approved 2026-11-15, message sent 23:05, Asia/Dhaka)

| Field | Value |
|---|---|
| Decision | G-01 / DEC-046 Option A |
| Approver / date | Project owner (explicit statement in chat) / 2026-11-15 (message sent 23:05, Asia/Dhaka) |
| Legacy platform | Remains available separately as a read-only reference. May be consulted for previous business-rule interpretations and known defects. |
| Independence | The new Node.js + Express.js backend is independent. No Laravel code, framework dependencies or implementation is reused. The legacy platform is not integrated with the new backend. |
| Authority | Original project requirements remain authoritative over legacy implementation behaviour. |
| Repository and baseline | The new backend has its own repository and its own baseline. |

**Consequences recorded (follow from the approval):** nothing from the legacy platform, including its uncommitted payment branch, is reused; the legacy audit's defects (AUD-D01..D13) may inform the new backend's design as defects not to repeat. The new baseline commit cannot be pinned until the new repository exists; that pinning is not yet done.

**Not confirmed by G-01:** repository hosting; the new baseline commit; formal closure of DEC-041; any payment or commission rule (DEC-007).

### 3.3 OD-07 - Option A: No legacy data migration (approved 2026-11-15, message sent 23:05, Asia/Dhaka)

| Field | Value |
|---|---|
| Decision | OD-07 Option A |
| Approver / date | Project owner (explicit statement in chat) / 2026-11-15 (message sent 23:05, Asia/Dhaka) |
| Legacy data | The legacy platform contains test/demo data only (owner statement). |
| Migration | No existing data is migrated. The new MySQL database starts fresh. Legacy users, businesses, deals and other records do not transfer. |
| Legacy project | The old Laravel project remains separate as a reference. |
| Reference data | Any necessary reference data, such as industry or skill categories, must be defined for the new system and not copied automatically from the old database. |

**Not confirmed by OD-07:** the content of the reference lists (industry, skill, business stage, risk level); who defines them; how they are maintained.

### 3.4 OD-03 - Option A: Separate Web Admin Dashboard (approved 2026-11-15, message sent 23:05, Asia/Dhaka)

| Field | Value |
|---|---|
| Decision | OD-03 Option A, including the R1 Admin clarification |
| Approver / date | Project owner (explicit statement in chat) / 2026-11-15 (message sent 23:05, Asia/Dhaka) |
| Admin client | A separate Web Admin Dashboard is developed as part of the new system. |
| Mobile app scope | The React Native + Expo mobile app serves Founder, Investor and Skilled Professional users. |
| Backend | Both clients use the same Node.js + Express.js backend through REST APIs. |
| Documentation duty | Admin-specific authorization and security requirements must be documented. |
| Account rule | Admin accounts must not be publicly self-registered. |
| Frontend technology | Undecided. |
| R1 Admin clarification | **Minimum Admin functionality must be available in Release 1.** R1 must include the Admin functionality necessary to support its approved workflows, including Tier 1 verification review and other essential approval actions. The exact minimum Admin feature inventory must be derived from the requirements and explicitly documented. Full Admin functionality may be scheduled for later releases, subject to G-07. |

**Not confirmed by OD-03:** the minimum R1 Admin feature inventory (to be derived); how Admin accounts are provisioned; Admin web authentication and session design (linked to OD-08, DEC-038, G-05); the Admin Dashboard frontend technology and its specification. OD-03 does not approve any unrelated pending Admin decision, including DEC-004, DEC-014 option C, DEC-020, DEC-026, DEC-031 and DEC-038.

### 3.5 OD-01 - Option A: Backend Functional Specification, all domains (approach approved 2026-11-15, message sent 23:05, Asia/Dhaka)

| Field | Value |
|---|---|
| Decision | OD-01 Option A - all domains. **Approves the approach only.** |
| Approver / date | Project owner (explicit statement in chat) / 2026-11-15 (message sent 23:05, Asia/Dhaka) |
| Coverage | All MPS Must-Have requirements; all MPS Should-Have requirements; business rules and functional responsibilities; roles and permissions; workflows and state transitions; security and authorization requirements; audit logging and data protection obligations; Admin-related backend responsibilities; business-level data requirements. |
| Boundaries | Exclude MPS Future Scope (§27). Distinguish Must-Have from Should-Have. Use the provisional R1/R2/R3 tags from v2.1 and do not treat the proposed allocation as approved G-07. Mark unresolved requirements PENDING or GATED. Preserve traceability to the original requirements and decision IDs. Do not invent missing business rules. |
| Explicit exclusions | REST API endpoint definitions; database schemas or SQL; application code; backend implementation; mobile implementation; Admin Dashboard implementation. |
| Authorisation status | **The Backend Functional Specification must not be generated until the owner separately authorises its creation.** That authorisation has not been given. |

### 3.6 Not confirmed by any approval above

Expo workflow/SDK/push/native modules (G-02); JWT token model, lifetimes, refresh, revocation, storage (G-03); the resolution of OD-08 (JWT vs original specification, including browser-based Admin authentication); Express or MySQL versions; hosting; email, SMS, push or file-storage providers; release scope and naming (G-07); any endpoint, payload or schema; the start of any development.

## 4. Assumptions (not confirmed)

| ID | Assumption | Basis | Needs |
|---|---|---|---|
| AS-1 | v2.1 platform statuses (IMP/PAR/UNV/MIS) describe the legacy platform and do not apply to the new backend. | My analysis of v2.1 section 1.4 and G-00 | Owner acknowledgement |
| AS-2 | Mobile-client requirements in v2.1 remain valid except where they cite Laravel, Sanctum or legacy audit evidence, or place Admin on mobile. | My analysis; not row-by-row verified | A change request that rewords Laravel and Admin-on-mobile references |
| AS-3 | ~~The legacy platform, its audit and the payment branch are reference only.~~ **Resolved by G-01 (approved).** | G-01 | None |
| AS-4 | Native OS secure storage differs from the 'browser storage' that P0/P1 reportedly prohibit. | My inference | OD-08 |
| AS-5 | Version choices (Node.js, Express, MySQL), hosting and deployment are undecided. | Absent from owner messages | Backend specification (OD-01) and OD-06 |
| AS-6 | Nothing has been tested on a phone; no Expo capability is proven. | Fact within this conversation | H-23 proof of concept |
| AS-7 | No backend functional specification or backend roadmap exists in the supplied documents. OD-01 is approved as an approach but the document has not been authorised or drafted. | Checked within the supplied documents only | Separate owner authorisation of OD-01 creation; OD-02 |
| AS-8 | The R1/R2/R3 tags are provisional (G-07 pending) and were defined by v2.1 for the mobile app; their use for backend and Admin requirements is provisional. | v2.1 section 4.4; OD-01 approval | G-07 |

## 5. Conflicts and gaps needing resolution

| ID | Item | Status |
|---|---|---|
| CF-1 | JWT (approved in G-00) versus the P0/P1 prohibition reported in v2.1 CONF-02. **Extended by OD-03:** the Web Admin Dashboard is a browser client, so browser-based Admin authentication is directly affected. Not overridden; see OD-08. | OPEN - owner resolution needed |
| CF-2 | v2.1 and the Roadmap state that the app consumes the Laravel API (SCP-003, ARC-002, ASM-002, Roadmap C-1). Contradicts G-00. Not edited here. | OPEN - change request needed |
| CF-3 | Missing backend functional specification (OD-01). **Approach approved; document not yet authorised or drafted.** | OPEN - awaiting owner authorisation and source documents |
| CF-4 | Missing backend roadmap (OD-02). | OPEN |
| CF-5 | Missing Admin interface. **Direction resolved by OD-03** (separate Web Admin Dashboard). Still open: provisioning (OD-09), minimum R1 inventory (OD-10), web authentication (OD-11), frontend technology and specification (OD-12). | PARTLY RESOLVED |
| CF-6 | Roadmap Phase 0 needs a non-production backend that does not exist (OD-06). | OPEN |
| CF-7 | Inherited: DEC-004/DEC-042 are P0 in the Review but P1 in v2.1 (this register follows v2.1); G-10 development authorisation has no v2.1 DEC ID; DEC-050 is P2 but an R1 gate if PERF targets are used; v2.1 says 374 rows while the Roadmap parsed 373; the Roadmap cites a 'Part 7 coverage script' that is not supplied; v2.1, the Roadmap and the Review share one author (the Review asks for human countersign). | NOTED |
| CF-8 | v2.1 places Admin on mobile in Release 3 (section 4.4, Appendix K.1 item 19, section 18, section 21.2) and states MPS equivalence needs the Admin dashboard on mobile. OD-03 makes Admin a separate web client with a minimum in R1. The Roadmap M19 and Phase 11 describe Admin as a mobile client module. Not edited here. | OPEN - change request needed |
| CF-9 | R1 Admin gap: v2.1 allocates user-side verification submission to R1 but Admin review to R3 (ROL-005, VER-002, ADM-004, Appendix K.1 item 17, AC-023). OD-03 resolves this in principle by requiring a minimum Admin function in R1. The minimum inventory is not yet derived. | PARTLY RESOLVED (inventory = OD-10) |
| CF-10 | OD-07 requires reference data (industry, skill, business stage, risk level) to be defined for the new system. v2.1 does not define these lists. | OPEN |
| CF-11 | Source texts that v2.1 refers to but that were not supplied: NDA template text (DIS-005), Terms-of-Service and simulation-disclaimer text (SCP-011), Phase 5 readiness and matching requirements (SG-02, DEC-015). | OPEN |

## 6. Gate references (Roadmap G-00 to G-10)

The Roadmap defines eleven gates. G-07 covers two decisions (DEC-034 and DEC-054), shown as 'G-07 (1 of 2)' and 'G-07 (2 of 2)'. The labels G-07a and G-07b used in earlier revisions are retired.

| Gate | DEC ID(s) | Subject | Status |
|---|---|---|---|
| G-00 | no v2.1 DEC ID | Backend integration target | APPROVED |
| G-01 | DEC-046 | Role of the legacy platform and the new backend baseline | APPROVED (Option A) |
| G-02 | DEC-022 | React Native / Expo stack details and criteria | NEEDS VERIFICATION |
| G-03 | DEC-003 | JWT token model and mobile session design (REFRAMED after G-00) | PENDING |
| G-04 | DEC-052 | Email-verification and password-reset completion on mobile (REFRAMED) | PENDING |
| G-05 | DEC-053 | Session lifetime, re-authentication and multi-device policy | PENDING |
| G-06 | DEC-047 | Active-role persistence mechanism | PENDING |
| G-07 | DEC-034, DEC-054 | Mobile release scope (G-07, part 1); Name of Mobile Release 1 relative to MPS 25.1 (G-07, part 2) | PENDING |
| G-08 | DEC-043 | Deal-state sequencing (Matched; NDA complete before Connection) | PENDING |
| G-09 | DEC-006 | Investment Type placement and terms | PENDING |
| G-10 | DEC-055 | Dependency owners, sequencing and development authorisation (EXPANDED) | PENDING |

## 7. Effect of G-00, G-01, OD-03 and OD-07 on dependent items

### 7.1 Decisions

| Item | Effect | Status |
|---|---|---|
| G-01 / DEC-046 | Approved (Option A). The new backend has its own repository and baseline; the legacy platform is read-only reference. | APPROVED |
| G-02 / DEC-022 | Expo as the framework is approved in G-00. These details are not. | NEEDS VERIFICATION |
| G-03 / DEC-003 | v2.1 options (cookie session, Sanctum token guard) are superseded in family by G-00. The original-specification conflict is NOT resolved here: see OD-08. Admin web authentication is a further dependency (OD-11). | PENDING |
| G-04 / DEC-052 | v2.1's reason for B no longer holds. | PENDING |
| G-05 / DEC-053 | No legacy configuration to inspect. Now also relevant to Web Admin sessions (OD-11). | PENDING |
| G-06 / DEC-047 | Recommendation changed from v2.1. | PENDING |
| G-07 (1 of 2) / DEC-034 | v2.1 justified A by legacy maturity; that reason is void but the smaller-scope argument is stronger. OD-03 now also requires a minimum Admin function in R1, which affects release scope. | PENDING |
| G-07 (2 of 2) / DEC-054 | No Laravel dependency. MPS equivalence now depends on mobile plus Web Admin together (CF-8). | PENDING |
| G-08 / DEC-043 | No legacy behaviour to check; design decision. | PENDING |
| G-09 / DEC-006 | No legacy capability to check; design decision. | PENDING |
| G-10 / DEC-055 | The Roadmap has no backend modules or phases. Separate authorisation to create OD-01 is also pending. | PENDING |
| DEC-004 | v2.1 assumed a pre-existing web Admin. OD-03 now provides a separate Web Admin Dashboard and its direction aligns with option A, but **DEC-004 itself is not decided**. | PENDING |
| DEC-042 | Gemini adapter belonged to the legacy platform. | PENDING |
| DEC-005 | New backend must implement multi-role itself. | PENDING |
| DEC-010 | Now a free design choice. | PENDING |
| DEC-014 | No Laravel dependency. Option C (Admin dispute queue) now has a Web Admin in principle; still undecided. | PENDING |
| DEC-016 | Real SMS now means a new Node integration. | PENDING |
| DEC-017 | Previously 'follow the backend'; no backend to follow. | PENDING |
| DEC-025 | PERF-005 backend latency now concerns the Node backend. | PENDING |
| DEC-041 | Moot after G-00 and G-01. Not formally closed; closure is an owner decision. | PENDING |
| DEC-044 | Pure design decision now. | PENDING |
| DEC-050 | No Laravel dependency. | PENDING |
| DEC-007 | Legacy payment code is no longer a dependency (G-01); any payments are new build. | PENDING |
| DEC-008 | Old 'as today' option no longer exists; recommendation changed from A. | PENDING |
| DEC-009 | 'Adopt the implemented set' is impossible. | PENDING |
| DEC-012 | No Laravel dependency. | PENDING |
| DEC-013 | No Laravel dependency. | PENDING |
| DEC-045 | No Laravel dependency. | PENDING |
| DEC-048 | No Laravel dependency. | PENDING |
| DEC-026 | Deletion is new backend work. Option A (routed to Admin) now has a Web Admin in principle; still undecided. | PENDING |
| DEC-039 | No Laravel dependency. | PENDING |
| DEC-011 | No Laravel dependency. | PENDING |
| DEC-015 | No Laravel dependency. | PENDING |
| DEC-018 | No Laravel dependency. | PENDING |
| DEC-019 | No Laravel dependency. | PENDING |
| DEC-020 | No Laravel dependency; applies to the Web Admin. | PENDING |
| DEC-027 | No Laravel dependency. | PENDING |
| DEC-028 | No Laravel dependency. | PENDING |
| DEC-030 | No Laravel dependency. | PENDING |
| DEC-031 | No Laravel dependency. A Web Admin now exists in principle; moderation rule still undecided. | PENDING |
| DEC-035 | No Laravel dependency. | PENDING |
| DEC-038 | No Laravel dependency; now concerns the Web Admin (OD-11). | PENDING |
| DEC-040 | No Laravel dependency. | PENDING |
| DEC-049 | No Laravel dependency. | PENDING |
| DEC-051 | No Laravel dependency. | PENDING |

### 7.2 Requirements and assumptions in v2.1

| Item | Effect | Action |
|---|---|---|
| SCP-003, ARC-002 | Contradict G-00 (cite the Laravel API) | Change request |
| ASM-002 | Superseded | Replace with the G-00 backend |
| ASM-001, DEC-001 | Audit becomes historical reference (G-01: read-only reference) | No longer blocks anything |
| ARC-006, section 5.3 | Cookie/Sanctum options superseded in family by JWT | G-03; OD-08 |
| ARC-006-C1, C3, C4, C5, C7, C8 | Principles still apply; C3 (admin isolation) now applies to the Web Admin | Carry into the new auth design |
| ARC-006-C2 | Wording tied to legacy signed routes | Reinterpret (G-04) |
| ARC-006-C6 | Applies to legacy web SPA routes; the Web Admin is now a browser client | Revisit under OD-08 / OD-11 |
| ARC-005, ARC-011, API-006 | Nothing to extract from a repository | Define in the new REST design (OD-01 / later contract) |
| ARC-020, section 5.1, NFR-E03, SG-08 | Describe the legacy platform | Informational only |
| ARC-021 | Still valid | None |
| AUD-D01..D13 | Legacy defects | May be used as design requirements for the new backend (G-01) |
| AI-020..029 | Gemini adapter was legacy | Governed by DEC-042 |
| PAY-001..009 and the PAY-007 gate | Legacy payment branch is no longer a dependency | Governed by DEC-007, G-07 |
| SCP-002-A, REL-003, ADM-001..018, SCR-030..034, FEAT-031, NTF-001-A, ADM-017 | Describe Admin on mobile (R3, PUA). OD-03 makes Admin a separate web client with a minimum in R1. ADM-017 (small-screen Admin) is no longer applicable to the mobile app. | Change request (CF-8) |
| Section 4.4, Appendix K.1 item 19, section 21.2 R3 gates | Admin placement and equivalence statements | Change request (CF-8) |
| ROL-006, ROL-007, ADM-016, ARC-006-C3 | Admin security principles still apply | Carry into the Admin security documentation required by OD-03 |

### 7.3 Dependencies DEP-001 to DEP-018

| DEP | Effect |
|---|---|
| DEP-001 | Reframed by G-01: baseline of the new repository; not yet pinned because the repository does not exist |
| DEP-002 | Legacy document clean-up moot; a v2.1 baseline is still needed |
| DEP-003 | Becomes new-backend JWT build (G-03, OD-08) |
| DEP-004 | Moot; features would be new build |
| DEP-005 | Unchanged; new build (OD-04) |
| DEP-006 | Cannot be extracted; becomes design decisions (OD-01 / later contract) |
| DEP-007 | Depends on G-04 |
| DEP-008 | New backend must provide the signal |
| DEP-009 | New build (DEC-026) |
| DEP-010 | Design requirement of the new backend |
| DEP-011 | Design requirement of the new backend |
| DEP-012 | Design requirement of the new backend |
| DEP-013 | Admin notification inbox: relevant to the Web Admin Dashboard; scope depends on OD-10 |
| DEP-014 | New build if AI is in scope (DEC-042) |
| DEP-015 | Contract must be authored for the new backend; no endpoints invented here; not authorised |
| DEP-016 | Moot for the backend; client rule AI-013 stands |
| DEP-017 | G-06 |
| DEP-018 | Void; needs a new verification plan for the new backend |

### 7.4 Roadmap items and evidence items

| Item | Effect |
|---|---|
| Roadmap C-1, RP-2 | Resolved by G-00 |
| Roadmap Phase 0 entry (G-00, G-01, G-10) | G-00 and G-01 met; G-10 PENDING |
| Phase 0 proofs of concept | Need a test backend (OD-06) |
| Phases 1-4 (DEP-003, 010, 011, 012, 015) | Become backend build work with no plan (OD-02) |
| T-M01-12, T-M02-06, T-M21-01 | Moot or redefined for the new backend and JWT |
| Modules M00-M21 | All are client modules; no backend or Web Admin modules exist |
| Roadmap M19 and Phase 11 | Describe Admin on mobile; conflict with OD-03 (CF-8); needs a Web Admin track |
| H-02, H-03, H-04, H-08..H-22 (legacy runtime checks) | Not applicable; each becomes a design or test item for the new backend |
| H-01, H-05, H-06 | Redefined as tests of the new backend once built |
| H-07, H-23 | Client-side; unchanged |

## 8. Open decisions that are NOT in v2.1

OD-01 to OD-08 were raised by G-00. OD-09 to OD-12 were raised by the OD-03 approval. They have no v2.1 DEC IDs. All OD IDs are my working labels only. OD-01, OD-03 and OD-07 are APPROVED; the rest are PENDING.

| OD | Subject | Tier | Status |
|---|---|---|---|
| OD-01 | Backend functional specification (approach approved; creation not authorised) | 1 | APPROVED (Option A) |
| OD-02 | Backend roadmap and plan | 1 | PENDING |
| OD-03 | Separate Web Admin Dashboard, with minimum Admin functionality in R1 | 2 | APPROVED (Option A) |
| OD-04 | External providers: email, SMS, push | 3 | PENDING |
| OD-05 | File storage and protection | 3 | PENDING |
| OD-06 | Phase 0 test backend and hosting | 1 | PENDING |
| OD-07 | Legacy data: no migration | 3 | APPROVED (Option A) |
| OD-08 | JWT vs original specification conflict (CF-1), including browser-based Admin authentication | 1 | PENDING |
| OD-09 | Admin account provisioning | 2 | PENDING |
| OD-10 | Minimum R1 Admin feature inventory | 2 | PENDING |
| OD-11 | Admin web authentication and session | 2 | PENDING |
| OD-12 | Admin Dashboard frontend technology and specification | 3 | PENDING |

## 9. Approval tiers

**Tier 1 - Decide first: needed before Phase 0 or before any backend work is planned** (7 items)

- G-00 / no v2.1 DEC ID - Backend integration target [APPROVED]
- G-01 / DEC-046 - Role of the legacy platform and the new backend baseline [APPROVED]
- G-10 / DEC-055 - Dependency owners, sequencing and development authorisation (EXPANDED) [PENDING]
- OD-01 - Backend functional specification [APPROVED approach; creation not authorised, not a v2.1 DEC]
- OD-02 - Backend roadmap and plan [PENDING, not a v2.1 DEC]
- OD-06 - Phase 0 test backend and hosting [PENDING, not a v2.1 DEC]
- OD-08 - JWT vs original specification conflict (CF-1) [PENDING, not a v2.1 DEC]

**Tier 2 - Core gates: needed before Release 1 build planning** (13 items)

- G-02 / DEC-022 - React Native / Expo stack details and criteria [NEEDS VERIFICATION]
- G-03 / DEC-003 - JWT token model and mobile session design (REFRAMED after G-00) [PENDING]
- G-04 / DEC-052 - Email-verification and password-reset completion on mobile (REFRAMED) [PENDING]
- G-05 / DEC-053 - Session lifetime, re-authentication and multi-device policy [PENDING]
- G-06 / DEC-047 - Active-role persistence mechanism [PENDING]
- G-07 (1 of 2) / DEC-034 - Mobile release scope (G-07, part 1) [PENDING]
- G-07 (2 of 2) / DEC-054 - Name of Mobile Release 1 relative to MPS 25.1 (G-07, part 2) [PENDING]
- G-08 / DEC-043 - Deal-state sequencing (Matched; NDA complete before Connection) [PENDING]
- G-09 / DEC-006 - Investment Type placement and terms [PENDING]
- OD-03 - Separate Web Admin Dashboard with minimum R1 Admin functionality [APPROVED, not a v2.1 DEC]
- OD-09 - Admin account provisioning [PENDING, not a v2.1 DEC]
- OD-10 - Minimum R1 Admin feature inventory [PENDING, not a v2.1 DEC]
- OD-11 - Admin web authentication and session [PENDING, not a v2.1 DEC]

**Tier 3 - Needed before the specific feature is built** (15 items)

- DEC-004 - Admin on mobile [PENDING]
- DEC-042 - Gemini AI insight layer in scope? [PENDING]
- DEC-005 - Mobile scope of multi-role handling [PENDING]
- DEC-010 - Deal Room chat model [PENDING]
- DEC-014 - Milestone structure approval and dispute handling [PENDING]
- DEC-016 - Phone verification real vs simulated; founder tier requirement [PENDING]
- DEC-017 - Re-interest after decline; NDA withdrawal/expiry; auto-grant reading [PENDING]
- DEC-025 - Performance, crash-rate and load thresholds [PENDING]
- DEC-041 - Legacy DB engine / PHP version confirmation [PENDING; moot, closure not yet decided]
- DEC-044 - Deal non-completion outcome [PENDING]
- DEC-050 - Device/OS support matrix and store distribution [PENDING]
- OD-04 - External providers: email, SMS, push [PENDING, not a v2.1 DEC]
- OD-05 - File storage and protection [PENDING, not a v2.1 DEC]
- OD-07 - Legacy data: no migration [APPROVED, not a v2.1 DEC]
- OD-12 - Admin Dashboard frontend technology and specification [PENDING, not a v2.1 DEC]

**Tier 4 - Later releases or low urgency; not needed to start** (23 items)

- DEC-007 - Commission rate, payer, trigger, rounding, display [PENDING]
- DEC-008 - Premium scope, pricing, enforcement [PENDING]
- DEC-009 - Notification event taxonomy and preferences [PENDING]
- DEC-012 - Financial-report cadence and late handling [PENDING]
- DEC-013 - Discrepancy status vocabulary [PENDING]
- DEC-045 - Milestone/funding semantics for Professional deals [PENDING]
- DEC-048 - App-store policy posture [PENDING]
- DEC-026 - Account deletion and data removal [PENDING]
- DEC-039 - Multi-investor funding rules [PENDING]
- DEC-011 - Platform-wide min/max per investment type [PENDING]
- DEC-015 - Readiness weights, thresholds, bands (Phase 5 spec absent) [PENDING]
- DEC-018 - Which Should-Have items enter a release [PENDING]
- DEC-019 - Global search scope [PENDING]
- DEC-020 - Admin impersonation-for-support [PENDING]
- DEC-027 - Professional feedback eligibility [PENDING]
- DEC-028 - Tier 2 trigger and reputation weights [PENDING]
- DEC-030 - Single generic Deal entity [PENDING]
- DEC-031 - Pre-publish moderation and unpublish [PENDING]
- DEC-035 - Agreement document form [PENDING]
- DEC-038 - Admin 'elevated auth' meaning [PENDING]
- DEC-040 - Dashboard metrics definitions [PENDING]
- DEC-049 - UI language(s) [PENDING]
- DEC-051 - Telemetry and crash reporting scope [PENDING]

## 10. Status dashboard

| Status | v2.1 decision cards |
|---|---|
| APPROVED | 2 (G-00, G-01) |
| PENDING | 43 |
| NEEDS VERIFICATION | 1 |
| Total v2.1 decision cards | 46 |

| Status | Additional open decisions (OD, not v2.1) |
|---|---|
| APPROVED | 3 (OD-01, OD-03, OD-07) |
| PENDING | 9 (OD-02, OD-04, OD-05, OD-06, OD-08, OD-09, OD-10, OD-11, OD-12) |
| Total | 12 |

## 11. Proposed order for one-by-one approval

Items already approved (G-00, G-01, OD-01, OD-03, OD-07) are removed from the order. This order is a proposal only.

1. OD-08 (JWT conflict, including browser-based Admin authentication), after checking the P0/P1 wording.
2. OD-11 (Admin web authentication and session) together with OD-09 (Admin provisioning), and with DEC-038 and G-05 as linked items.
3. Owner authorisation to create the Backend Functional Specification (OD-01), once source documents are supplied; then derivation of the minimum R1 Admin inventory (OD-10) from the requirements.
4. OD-06 (test backend), then G-10 (owners and Phase 0 authorisation), then OD-02 (backend roadmap).
5. G-07 parts 1 and 2 (release scope and name).
6. G-03 and G-05 together (JWT model, session policy), then G-04 and G-06.
7. G-02 (Expo details), preferably after the phone proof of concept.
8. G-08 and G-09, then OD-12, Tier 3, then Tier 4 as releases approach.

## 12. Gate decisions (G-00 to G-10)

### G-00 / no v2.1 DEC ID - Backend integration target

| Field | Value |
|---|---|
| Status | **APPROVED** |
| Approval tier | 1 |
| Priority | P0 gate (Roadmap C-1) |
| Affects | ARC-002, SCP-003, ARC-021, ASM-002, DEC-001, every API-facing task |
| Evidence needed | None needed; explicit owner decision. |

> **Effect of G-00:** Approved scope is exactly the list in section 3.1.

**Question:** Which backend will the mobile app integrate with?

**Options**

- **A - Existing audited platform (audit-observed as Laravel)** - Backend assumed by v2.1.
  - Advantages: Business logic already server-side.
  - Risks: NOT CHOSEN.
- **B - New backend  <== CHOSEN BY THE OWNER** - Node.js + Express.js, MySQL, REST API, JWT-based authentication. Mobile client: React Native + Expo + TypeScript. Laravel is not used as the mobile backend.
  - Advantages: Free architecture; native-friendly token auth; no dependence on the unverified legacy platform.
  - Risks: The whole server side must be built and has no specification or plan yet (see OD-01, OD-02). v2.1 statuses (IMP/PAR/UNV) describe the legacy platform and do not carry over.
- **C - Transitional (existing backend first)** - Frozen contract, swappable backend.
  - Advantages: Limits lock-in.
  - Risks: NOT CHOSEN.

**Dependencies:** Unblocks the other gates, each reviewed in section 7.

**CONFIRMED:** Option B. Approver: Project owner (explicit instruction in chat). Date: 2026-11-15 (message sent 22:24, Asia/Dhaka).

### G-01 / DEC-046 - Role of the legacy platform and the new backend baseline

| Field | Value |
|---|---|
| Status | **APPROVED** |
| Approval tier | 1 |
| Priority | P0 |
| Affects | PAY-001..009, ADM-008, MIL-007, NFR-E03, DEP-001, TST-002, DEC-041 |
| Evidence needed | None. H-02 (legacy payment branch tests) is not applicable. |

> **Effect of G-00:** v2.1 wording concerned a Git branch of the legacy backend. That no longer applies.

**Question:** With a new backend, how is the baseline defined, and what role (if any) do the legacy Laravel repository, its audit and its uncommitted payment branch play?

**Options**

- **A - Legacy platform is read-only reference for business rules and known defects  <== CHOSEN BY THE OWNER** - The legacy Laravel platform stays available separately and read-only. It may be consulted for previous business-rule interpretations and known defects. The new backend is independent, has its own repository and baseline, and reuses no Laravel code, framework dependencies or implementation. The legacy platform is not integrated with the new backend. Original project requirements remain authoritative over legacy implementation behaviour.
  - Advantages: Clean separation; no inherited defects; v2.1/MPS stay the requirement sources.
  - Risks: Rules must be re-implemented from the specification. The legacy audit was static and 45% of its statuses were UNV, so legacy interpretations are weak evidence.
- **B - Ignore the legacy platform entirely** - Use MPS, v2.1 and phase documents only.
  - Advantages: Simplest.
  - Risks: NOT CHOSEN.
- **C - Other** - For example partial reuse or data migration.
  - Advantages: Flexible.
  - Risks: NOT CHOSEN.

**Dependencies:** Depends on G-00 (approved). Affects G-10. OD-07 is approved (no migration).

**Open after approval:** the new repository does not yet exist, so the new baseline commit is not pinned. DEC-041 is moot but not formally closed.

**CONFIRMED:** Option A. Approver: Project owner (explicit statement in chat). Date: 2026-11-15 (message sent 23:05, Asia/Dhaka).

### G-02 / DEC-022 - React Native / Expo stack details and criteria

| Field | Value |
|---|---|
| Status | **NEEDS VERIFICATION** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | ARC-001, ARC-022..027, NTF-003, MOB-011/012/060..064/070/080/081 |
| Evidence needed | H-23: proof of concept on your physical Android phone without Android Studio. NOT DONE: nothing has been tested on any phone. |

> **Effect of G-00:** Expo as the framework is approved in G-00. These details are not.

**Question:** Within the approved direction (React Native + Expo + TypeScript): which Expo workflow, SDK version, state/navigation libraries, push approach, OTA updates, native modules, build-and-run loop?

**Options**

- **A - Expo with development builds as needed** - Managed-style; development build only if a capability needs it.
  - Advantages: Matches your environment (physical phone, no Android Studio).
  - Risks: A capability may not work in Expo Go (general knowledge, unverified).
- **B - Expo prebuild / config plugins** - Bare-capable Expo.
  - Advantages: More native flexibility.
  - Risks: More native configuration; may need Android tooling.
- **C - Bare React Native** - No Expo managed layer.
  - Advantages: Maximum control.
  - Risks: Highest setup cost; conflicts with no-Android-Studio intention.

**Dependencies:** Depends on G-03 (secure token storage). Linked to DEP-005, DEP-007, DEP-008, DEC-048, DEC-050.

**Recommendation (PROPOSAL, not approved):** Option A as a proposal only; decide after the H-23 phone proof of concept.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-03 / DEC-003 - JWT token model and mobile session design (REFRAMED after G-00)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | ARC-006, ARC-006-C1..C8, ARC-024, AUTH-*, API-002/013, MOB-011, DEP-003, TST-006 |
| Evidence needed | Original H-05 (Sanctum behaviour) not applicable. A JWT proof of concept needs a test backend (OD-06). |

> **Effect of G-00:** v2.1 options (cookie session, Sanctum token guard) are superseded in family by G-00. The original-specification conflict is NOT resolved here: see OD-08. Admin web authentication is handled separately (OD-11).

**Question:** JWT is the approved family. Which model: lifetimes, refresh, rotation, revocation, claims, signing-key management, device storage?

**Options**

- **A - Short-lived access token plus rotating refresh token tracked server-side** - Access token in OS secure storage; refresh token rotated and stored hashed so it can be revoked.
  - Advantages: Real server-side logout (AUTH-009), remote revocation, sign-out-everywhere (G-05).
  - Risks: More work. General knowledge, unverified: stateless JWTs cannot be revoked without some server-side state.
- **B - Single longer-lived access token** - Simplest JWT use.
  - Advantages: Least work.
  - Risks: Stolen token valid until expiry; weak fit for ARC-006-C4.
- **C - Other** - Must satisfy ARC-006-C1..C8.
  - Advantages: Open.
  - Risks: Not assessed.

**Dependencies:** Depends on G-00, G-02, G-05 and on resolving OD-08 (JWT conflict).

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-04 / DEC-052 - Email-verification and password-reset completion on mobile (REFRAMED)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | AUTH-004/006/016/017, DEP-007(a), AC-020/021 |
| Evidence needed | H-21 (legacy signed web routes) not applicable. |

> **Effect of G-00:** v2.1's reason for B no longer holds.

**Question:** How does a mobile user complete verification and reset, given the new backend must send the email?

**Options**

- **A - Return to the app from a link** - App/universal link.
  - Advantages: Smooth flow.
  - Risks: Needs link association and a verified-link proof of concept.
- **B - System browser, then sign in** - Link opens a web page.
  - Advantages: No app-link setup.
  - Risks: A web page must be built and hosted.
- **C - In-app one-time code** - Email carries a code typed in the app.
  - Advantages: No links or web page.
  - Risks: Needs expiry, attempt limits, throttling; ARC-006-C2 'signed link' wording needs reinterpretation.

**Dependencies:** Depends on G-00, G-03, OD-04 (email provider).

**Recommendation (PROPOSAL, not approved):** Option C. This differs from v2.1 (which proposed B because legacy web routes existed). Your judgement needed.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-05 / DEC-053 - Session lifetime, re-authentication and multi-device policy

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | AUTH-012-D, AUTH-018/019/020, AC-033, ARC-006-C* |
| Evidence needed | H-22 (legacy configuration) not applicable; design decision. |

> **Effect of G-00:** No legacy configuration to inspect. Web Admin sessions are a further dependency (OD-11).

**Question:** Session lifetime, idle behaviour, re-authentication for sensitive actions, multi-device, sign-out-everywhere, biometric unlock?

**Options**

- **A - Server-defined lifetime only** - Client honours 401/419.
  - Advantages: Simplest.
  - Risks: Exposure depends on the lifetime you set.
- **B - A plus client idle lock** - Lock after inactivity.
  - Advantages: Reduces lost-phone exposure.
  - Risks: Needs an unlock mechanism; friction.
- **C - B plus re-auth for sensitive actions and remote revocation** - Re-auth for NDA, financial reports, ID images.
  - Advantages: Strongest protection.
  - Risks: Needs server-side refresh-token tracking; more flows.

**Dependencies:** Depends on G-00, G-03.

**Recommendation (PROPOSAL, not approved):** Option C for sensitive actions; biometric unlock optional.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-06 / DEC-047 - Active-role persistence mechanism

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | ROL-003-D, MOB-003, DEP-017, AC-001; legacy defect AUD-D01 |
| Evidence needed | None required. |

> **Effect of G-00:** Recommendation changed from v2.1.

**Question:** Where is the active role stored so it survives restart?

**Options**

- **A - Server-side** - New backend stores it.
  - Advantages: Consistent across devices; cheap in a new backend.
  - Risks: Part of the new role model.
- **B - Bounded client storage validated against server roles** - Local, validated on restore.
  - Advantages: Least server dependency.
  - Risks: Per-device; stale if enrolment changes.
- **C - Both** - Server value plus local cache.
  - Advantages: Best consistency.
  - Risks: Two sources of truth.

**Dependencies:** Depends on G-00, DEC-005.

**Recommendation (PROPOSAL, not approved):** Option C. v2.1 proposed B only because of legacy backend limits.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-07 (1 of 2) / DEC-034 - Mobile release scope (G-07, part 1)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | SCP-001, section 4.4, Appendix F/K, section 21 |
| Evidence needed | None required (H-01, H-02, H-09, H-10 were legacy checks). |

> **Effect of G-00:** v2.1 justified A by legacy maturity; that reason is void but the smaller-scope argument is stronger. **Effect of OD-03:** R1 must also include minimum Admin functionality, delivered through the Web Admin Dashboard; the proposed release allocation in v2.1 does not yet reflect this.

**Question:** Which requirements ship in which release? Must R1 equal the MPS MVP (all 21 section-25.1 Must-Haves)?

**Options**

- **A - R1 excludes the investment/financial layer; R2 adds it** - Admin beyond the R1 minimum later.
  - Advantages: Smallest first release; matters more because the backend is all new.
  - Risks: R1 is not the MPS MVP.
- **B - All participant-facing Must-Haves in R1** - Fuller Admin follows.
  - Advantages: Closest to MPS MVP.
  - Risks: Largest scope.
- **C - Role-by-role** - Investor, Founder, Professional.
  - Advantages: Early value for one role.
  - Risks: Shared work re-sequenced.

**Dependencies:** Depends on G-00, OD-01, OD-03 (both approved) and OD-02. Decide with G-07 part 2.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-07 (2 of 2) / DEC-054 - Name of Mobile Release 1 relative to MPS 25.1 (G-07, part 2)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | Section 4.4, SCP-001, Appendix K.1 |
| Evidence needed | None. |

> **Effect of G-00:** No Laravel dependency. **Effect of OD-03:** MPS equivalence (v2.1 item 19, Admin dashboard) would now depend on the mobile app and the Web Admin Dashboard together (CF-8).

**Question:** May R1 omit MPS Must-Haves, and what is it called?

**Options**

- **A - Partial 'Mobile Release 1', explicitly not the MPS MVP** - State omitted items.
  - Advantages: Honest.
  - Risks: Needs acceptance of a partial release.
- **B - R1 covers all participant-facing Must-Haves** - Equals DEC-034 Option B.
  - Advantages: No naming conflict.
  - Risks: Large scope.
- **C - Other** - You specify.
  - Advantages: Flexible.
  - Risks: Not assessed.

**Dependencies:** Decide with G-07 part 1.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-08 / DEC-043 - Deal-state sequencing (Matched; NDA complete before Connection)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | DLR-002/011/012, WF-006, WF-013, AC-006, TST-003 |
| Evidence needed | H-08 (legacy runtime) not applicable; design decision. |

> **Effect of G-00:** Changed from NEEDS VERIFICATION to PENDING.

**Question:** (1) Is Matched conceptual or persisted? (2) If the NDA is complete before the Connection exists, how do states 3-4 behave?

**Options**

- **(1)-i Matched conceptual; first persisted state Interest Confirmed** - P7 default.
  - Advantages: No Deal for unconnected pairs.
  - Risks: None specific.
- **(1)-ii Persist a Deal at Matched** - Earlier record.
  - Advantages: Early tracking.
  - Risks: Many records never connect.
- **(2)-A Intermediate transitions recorded in order in one transaction; Deal opens at NDA Signed** - History preserved.
  - Advantages: Respects DLR-001.
  - Risks: Careful transaction design.
- **(2)-B Deal at Deal Room Opened; NDA Signed applied by separate evaluation** - Two-step.
  - Advantages: Simpler creation.
  - Risks: Brief inconsistent window.

**Dependencies:** Depends on G-00. Related: DEC-044, DEC-045.

**Recommendation (PROPOSAL, not approved):** (1) conceptual and (2) Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-09 / DEC-006 - Investment Type placement and terms

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 2 |
| Priority | P0 |
| Affects | PRO-003, BIZ-004, DSC-004, NEG-002..004, INV-001..010, DLR-003, FEAT-021/022 |
| Evidence needed | H-09/DEP-004 (legacy capability) not applicable; design decision. |

> **Effect of G-00:** Changed from NEEDS VERIFICATION to PENDING.

**Question:** Where is Investment Type (Micro vs Large/Standard) selected and its terms recorded? Are profit/loss and distributions recorded?

**Options**

- **A - Business-level enabled types plus deal-level selection** - As UXP implies; MPS says investor chooses, founder enables.
  - Advantages: Matches MPS.
  - Risks: Needs a Business-level field.
- **B - Deal-level only** - Chosen in the Deal Room.
  - Advantages: Smaller data change.
  - Risks: Discovery cannot filter by type.
- **C - Other** - You specify.
  - Advantages: Flexible.
  - Risks: Not assessed.

**Dependencies:** Depends on G-00, DEC-011. Distributions undefined; none recorded until decided.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### G-10 / DEC-055 - Dependency owners, sequencing and development authorisation (EXPANDED)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 1 |
| Priority | P1 R1 gate in v2.1; gate in Roadmap |
| Affects | DEP-001..018, section 17.3, Roadmap Phase 0 entry |
| Evidence needed | None. The development-authorisation element comes from the Roadmap, not a v2.1 DEC ID. |

> **Effect of G-00:** The Roadmap has no backend modules or phases. **Effect of OD-03:** it also has no Web Admin track. Authorisation to create the Backend Functional Specification (OD-01) is a separate owner instruction and is not given by this gate.

**Question:** Who owns each dependency (now including the new backend and the Web Admin Dashboard), do you approve the sequence, and what may start?

**Options**

- **A - Name owners; authorise nothing yet** - All P0 gates first.
  - Advantages: No premature work.
  - Risks: Slower.
- **B - Name owners; authorise Phase 0 only** - Environment and proofs of concept; no product code.
  - Advantages: Produces phone evidence for G-02.
  - Risks: Needs a test backend (OD-06).
- **C - Authorise full development** - Everything.
  - Advantages: Fastest.
  - Risks: Contradicts v2.1 while P0 gates are open.

**Dependencies:** Depends on G-00 and G-01 (both approved), OD-01 (approved approach), OD-02, OD-06.

**Recommendation (PROPOSAL, not approved):** Option A until G-03 and OD-02 are decided; then B.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

## 13. Other v2.1 decisions

### 13.1 Release 1 entry decisions

### DEC-004 - Admin on mobile

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 (gates R3 only in v2.1) |
| Affects | SCP-002-A, ADM-001..018, SCR-030..034, FEAT-031 |
| Evidence needed | None required. |

> **Effect of G-00:** v2.1 assumed a pre-existing web Admin; that assumption is gone. **Effect of OD-03 (approved):** a separate Web Admin Dashboard is part of the new system and the mobile app serves Founder, Investor and Professional only. This is consistent with option A but **does not decide DEC-004**; the owner must still record it.

**Question:** Which Admin functions, if any, are on the mobile app? (OD-03 has settled that an Admin interface exists as a separate web dashboard.)

**Options**

- **A - None on mobile** - Admin on the Web Admin Dashboard.
  - Advantages: Smallest mobile risk; sensitive images and evidence stay off phones; consistent with OD-03.
  - Risks: Admin depends entirely on the Web Admin Dashboard.
- **B - Triage subset** - E.g. verification queue, discrepancy review.
  - Advantages: Provides a mobile Admin path.
  - Risks: Sensitive images/evidence on phones; contradicts the OD-03 statement that mobile serves participants only.
- **C - Full parity** - All ADM rows.
  - Advantages: Complete.
  - Risks: Largest scope and risk; contradicts OD-03.

**Dependencies:** OD-03 (approved), DEC-038, DEC-020, DEP-013.

**Recommendation (PROPOSAL, not approved):** Option A, as it is the only option consistent with approved OD-03.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-042 - Gemini AI insight layer in scope?

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 (insight screens only) |
| Affects | AI-020..029, SCR-015, DEP-014, PRV-005 |
| Evidence needed | None required (H-04, H-17 legacy). |

> **Effect of G-00:** Gemini adapter belonged to the legacy platform.

**Question:** Is an LLM insight layer in scope, given the MPS says scoring is rule-based and lists NLP as Future Scope?

**Options**

- **A - Accept with guardrails, quotas, privacy review** - Needs an MPS amendment note.
  - Advantages: Richer insights.
  - Risks: Must be built new in Node.
- **B - Exclude from Release 1** - Deterministic scores only.
  - Advantages: No extra build.
  - Risks: No insight screens in R1.
- **C - Restrict to some roles/surfaces** - E.g. Founder analysis.
  - Advantages: Partial value.
  - Risks: Partial build and risk.

**Dependencies:** DEP-014, AI-028. AI-024/025 apply under every option.

**Recommendation (PROPOSAL, not approved):** Option B.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-005 - Mobile scope of multi-role handling

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | ROL-003, AUTH-001, MOB-002 |
| Evidence needed | None. |

> **Effect of G-00:** New backend must implement multi-role itself.

**Question:** How much multi-role functionality is on mobile?

**Options**

- **A - Role switching only**
  - Advantages: Smallest.
  - Risks: Cannot add a role.
- **B - Switching plus add-role** - Matches AUTH-001.
  - Advantages: Covers main need.
  - Risks: Moderate.
- **C - Full enrollment and removal**
  - Advantages: Complete.
  - Risks: Most scope.

**Dependencies:** G-06.

**Recommendation (PROPOSAL, not approved):** Option B.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-010 - Deal Room chat model

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | MSG-001, MSG-002, FEAT-028 |
| Evidence needed | None (H-14 legacy). |

> **Effect of G-00:** Now a free design choice.

**Question:** Delivery model, attachments, read receipts, moderation. No scanning or contact blocking (MSG-003).

**Options**

- **A - Polling, text only**
  - Advantages: Least server work.
  - Risks: Less immediate.
- **B - Real-time**
  - Advantages: Better experience.
  - Risks: More complexity.
- **C - Attachments and/or read receipts**
  - Advantages: More capable.
  - Risks: Needs storage and upload hardening.

**Dependencies:** G-00, DEP-010.

**Recommendation (PROPOSAL, not approved):** Option A for R1.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-014 - Milestone structure approval and dispute handling

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | MIL-004, MIL-009 |
| Evidence needed | None. |

> **Effect of G-00:** No Laravel dependency. **Effect of OD-03:** option C now has a Web Admin in principle; the scope of Admin dispute handling is undecided.

**Question:** Does the counterparty approve the milestone structure? What happens to a Disputed milestone?

**Options**

- **A - Implicit via Agreement; dispute is a status only (P7 default)**
  - Advantages: Simple; sourced.
  - Risks: No separate approval.
- **B - Explicit counterparty approval**
  - Advantages: Clearer.
  - Risks: Extra state.
- **C - Admin dispute queue**
  - Advantages: Resolution path.
  - Risks: Needs Admin dispute functionality in the Web Admin Dashboard (scope undecided).

**Dependencies:** DEC-045, DEC-004, OD-10.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-016 - Phone verification real vs simulated; founder tier requirement

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | AUTH-005, ROL-005 |
| Evidence needed | None. |

> **Effect of G-00:** Real SMS now means a new Node integration.

**Question:** Simulated or real SMS? Does a Founder need Tier >= 1 beyond publish rules?

**Options**

- **A - Simulated; no extra founder tier** - P1 allows a simulation.
  - Advantages: No provider cost.
  - Risks: Not real assurance.
- **B - Real SMS provider**
  - Advantages: Real assurance.
  - Risks: Provider, cost, privacy (OD-04).
- **C - Founder needs Tier >= 1**
  - Advantages: Higher trust.
  - Risks: Not sourced as a rule.

**Dependencies:** G-00, OD-04.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-017 - Re-interest after decline; NDA withdrawal/expiry; auto-grant reading

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | DIS-002, DIS-004, DIS-006, CONF-23 |
| Evidence needed | None (H-11 legacy). |

> **Effect of G-00:** Previously 'follow the backend'; no backend to follow. Note: the outcome of an NDA decline is also undefined without legacy behaviour (v2.1 WF-005 says 'as implemented'); the owner may wish to cover it here.

**Question:** May a viewer re-express interest after Decline? Should NDA withdrawal/expiry exist? Is the 1->2 auto-grant the right reading?

**Options**

- **Re-interest: allowed / blocked / after Founder reset**
  - Advantages: Allowed simplest; blocked protects founders.
  - Risks: Changes state machine.
- **NDA withdrawal/expiry: none / add** - None defined today.
  - Advantages: None avoids CONF-23.
  - Risks: Adding needs undefined rules.
- **Auto-grant: confirm P6 / change**
  - Advantages: Matches P6.
  - Risks: Unconfirmed.

**Dependencies:** G-00.

**Recommendation (PROPOSAL, not approved):** Withdrawal/expiry: none. Others are your business choice.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-025 - Performance, crash-rate and load thresholds

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate (if PERF targets used) |
| Affects | PERF-001..005, MOB-094, LOAD-009 |
| Evidence needed | Needs DEC-050. |

> **Effect of G-00:** PERF-005 backend latency now concerns the Node backend.

**Question:** Approve, modify or drop proposed targets (cold start <= 3 s, first content <= 2 s, crash-free >= 99%)?

**Options**

- **A - Approve, conditional on DEC-050/051**
  - Advantages: Measurable.
  - Risks: Untestable until device decided.
- **B - Modify values**
  - Advantages: Your numbers.
  - Risks: Engineering proposals only.
- **C - No targets for R1**
  - Advantages: No commitment.
  - Risks: No performance evidence.

**Dependencies:** DEC-050, DEC-051.

**Recommendation (PROPOSAL, not approved):** Option A, conditional.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-041 - Legacy DB engine / PHP version confirmation

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | ARC-020, CONF-25 |
| Evidence needed | Not applicable. |

> **Effect of G-00 and G-01:** Moot. The legacy platform is read-only reference only.

**Question:** Originally: confirm the legacy engine and PHP version. With G-00 and G-01 the database is MySQL on Node and the legacy platform is not a dependency.

**Options**

- **A - Close as not applicable** - Superseded by G-00 and G-01.
  - Advantages: Removes a moot item.
  - Risks: Needs your confirmation; MySQL version and hosting still undecided (OD-06).
- **B - Keep open for the MySQL version**
  - Advantages: One place for DB version.
  - Risks: Changes the DEC meaning.

**Dependencies:** G-00, G-01.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-044 - Deal non-completion outcome

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P1 R1 gate |
| Affects | DLR-013, REP-004, CONF-28 |
| Evidence needed | None (H-08 legacy). |

> **Effect of G-00:** Pure design decision now.

**Question:** The MPS has no cancel state, yet reputation rules mention cancelled deals. What expresses non-completion?

**Options**

- **(i) No new state** - Decline, Disputed milestone, Admin escalation.
  - Advantages: No MPS amendment.
  - Risks: No explicit cancelled outcome.
- **(ii) Add terminal Cancelled/Withdrawn** - Needs MPS 14.1 amendment.
  - Advantages: Clear outcome.
  - Risks: Changes a core rule.
- **(iii) Other**
  - Advantages: Flexible.
  - Risks: Not assessed.

**Dependencies:** G-08, DEC-014.

**Recommendation (PROPOSAL, not approved):** Option (i) until the MPS is amended.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-050 - Device/OS support matrix and store distribution

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 3 |
| Priority | P2 in v2.1; R1 gate if PERF targets used |
| Affects | MOB-096, PERF-001 |
| Evidence needed | None. |

**Question:** Which devices and Android versions are supported? iOS test devices are not stated anywhere.

**Options**

- **A - Your phone is the sole reference device; no wider claim**
  - Advantages: Honest.
  - Risks: No wider support claim.
- **B - Small Android matrix**
  - Advantages: Broader confidence.
  - Risks: Needs devices.
- **C - Add iOS**
  - Advantages: ARC-001 targets both.
  - Risks: No iOS hardware mentioned.

**Dependencies:** DEC-025, DEC-048, DEC-051.

**Recommendation (PROPOSAL, not approved):** Option A for now.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### 13.2 Later-release P1 decisions

### DEC-007 - Commission rate, payer, trigger, rounding, display

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | PAY-001..005, WF-012 |
| Evidence needed | None. |

> **Effect of G-00 and G-01:** Legacy payment code is no longer a dependency; any payments are new build.

**Question:** Within the MPS 3-5% range: which rate, payer, trigger, rounding, display?

**Options**

- **A - One platform-wide rate, display-only (simulated)**
  - Advantages: Simplest.
  - Risks: Less flexible.
- **B - Per-deal rate in 3-5%**
  - Advantages: Flexible.
  - Risks: More states.
- **C - Admin-configurable**
  - Advantages: Operational flexibility.
  - Risks: Needs admin controls.

**Dependencies:** G-07.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-008 - Premium scope, pricing, enforcement

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | PRM-001..008 |
| Evidence needed | None. |

> **Effect of G-00:** Old 'as today' option no longer exists; recommendation changed from A.

**Question:** UI-only simulation, server-enforced simulated entitlements, or real subscriptions?

**Options**

- **A - UI-only simulation**
  - Advantages: Least work.
  - Risks: Not authoritative; conflicts with server-authority.
- **B - Server-enforced simulated entitlements**
  - Advantages: Consistent with ARC-003.
  - Risks: New build.
- **C - Real subscriptions** - Outside MPS MVP.
  - Advantages: Real revenue.
  - Risks: Legal review; store billing rules.

**Dependencies:** DEC-048.

**Recommendation (PROPOSAL, not approved):** Option B; exclude C.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-009 - Notification event taxonomy and preferences

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | NTF-002, NTF-004 |
| Evidence needed | None. |

> **Effect of G-00:** 'Adopt the implemented set' is impossible.

**Question:** Which events notify, and what preference granularity?

**Options**

- **A - Minimal set from NTF-002 candidates**
  - Advantages: No invention beyond spec.
  - Risks: You must pick events.
- **B - Extended set**
  - Advantages: More complete.
  - Risks: More build.

**Dependencies:** G-00, DEP-005, OD-04.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-012 - Financial-report cadence and late handling

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | FIN-001, FIN-012 |
| Evidence needed | None. |

**Question:** Cadence, and what happens when reports are late or missing?

**Options**

- **A - Period agreed in deal terms; no late handling**
  - Advantages: No invented consequences.
  - Risks: No reminders.
- **B - Fixed platform cadence**
  - Advantages: Predictable.
  - Risks: May not fit deals.
- **C - A plus reminders**
  - Advantages: Helpful.
  - Risks: Needs notifications.

**Dependencies:** G-09, DEC-009.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-013 - Discrepancy status vocabulary

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | FIN-008, ADM-010, CONF-12 |
| Evidence needed | None. |

**Question:** Three statuses (MPS/ILS) or four (UXP)?

**Options**

- **A - Three values** - Higher-precedence sources.
  - Advantages: Follows MPS.
  - Risks: Differs from UXP.
- **B - Four values** - Includes Needs Review.
  - Advantages: More descriptive.
  - Risks: Lower precedence.

**Dependencies:** DEC-004.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-045 - Milestone/funding semantics for Professional deals

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | DLR-014, MIL-001, DLR-008 |
| Evidence needed | None. |

**Question:** How do milestones, funding and reports apply to Professional engagements?

**Options**

- **(i) Same as investor deals** - P7 default.
  - Advantages: One model.
  - Risks: May not fit.
- **(ii) Milestones without funding/commission**
  - Advantages: Cleaner.
  - Risks: Two behaviours.
- **(iii) Omit Milestone Funding Active and Financial Reports**
  - Advantages: Least ambiguity.
  - Risks: Different lifecycle.

**Dependencies:** DEC-030, G-08.

**Recommendation (PROPOSAL, not approved):** Option (i).

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-048 - App-store policy posture

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | MOB-097, PRM-008, TST-013 |
| Evidence needed | Store policy review. |

**Question:** Listing category, simulation disclosures, in-app purchase handling, deletion compliance.

**Options**

- **A - Internal/closed testing only for now**
  - Advantages: Defers compliance.
  - Risks: No public release.
- **B - Prepare a public listing**
  - Advantages: Public availability.
  - Risks: Compliance work.

**Dependencies:** DEC-026, DEC-008.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-026 - Account deletion and data removal

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | AUTH-014, PRV-003, DEP-009 |
| Evidence needed | Needs legal/privacy input. |

> **Effect of G-00:** Deletion is new backend work. **Effect of OD-03:** option A now has a Web Admin in principle; still undecided.

**Question:** What happens on a deletion request, given audit and financial records?

**Options**

- **A - Routed to Admin**
  - Advantages: Simple.
  - Risks: Needs Admin functionality in the Web Admin Dashboard (scope undecided).
- **B - Anonymisation**
  - Advantages: Keeps audit integrity.
  - Risks: Data-model design.
- **C - Full deletion**
  - Advantages: Strongest.
  - Risks: Conflicts with records.

**Dependencies:** DEC-048, DEP-009.

**Recommendation (PROPOSAL, not approved):** Option B, subject to legal review.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-039 - Multi-investor funding rules

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P1 (R2) |
| Affects | BIZ-012 |
| Evidence needed | None. |

**Question:** Targets, caps, oversubscription, closing: undefined in every source.

**Options**

- **A - Out of scope early (Gated)**
  - Advantages: No invented rules.
  - Risks: Feature absent.
- **B - Define rules now**
  - Advantages: Feature available.
  - Risks: Design needed.

**Dependencies:** G-09.

**Recommendation (PROPOSAL, not approved):** Option A.

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### 13.3 P2 decisions

### DEC-011 - Platform-wide min/max per investment type

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | INV-004, CONF-04 |
| Evidence needed | None required. |

**Question:** Decide: Platform-wide min/max per investment type.

**Options**

- **Option 1 - Define limits** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Leave deal-level** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Leave deal-level (ILS minimum is only an example). (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-015 - Readiness weights, thresholds, bands (Phase 5 spec absent)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | AI-004 |
| Evidence needed | None required. |

**Question:** Decide: Readiness weights, thresholds, bands (Phase 5 spec absent).

**Options**

- **Option 1 - You supply the Phase 5 specification** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Define new weights for the Node backend** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Needs your input; 'extract from code' is no longer possible. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-018 - Which Should-Have items enter a release

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | SCP-004 |
| Evidence needed | None required. |

> **Note:** OD-01 (approved) covers MPS Should-Have requirements in the Backend Functional Specification. That is documentation scope only; it does not decide which Should-Have items enter a release.

**Question:** Decide: Which Should-Have items enter a release.

**Options**

- **Option 1 - Select per MPS 25.2** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Defer all** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Defer all until R1 is stable. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-019 - Global search scope

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | DSC-013 |
| Evidence needed | None required. |

**Question:** Decide: Global search scope.

**Options**

- **Option 1 - None** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Cross-entity, RBAC/stage aware** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** None for now. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-020 - Admin impersonation-for-support

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | ADM-003, CONF-22 |
| Evidence needed | None required. |

> **Note:** Now concerns the Web Admin Dashboard (OD-03). Not decided by OD-03.

**Question:** Decide: Admin impersonation-for-support.

**Options**

- **Option 1 - Keep deferred** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Implement with audit** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Keep deferred (P9 defers it). (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-027 - Professional feedback eligibility

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | REP-006, WF-004 |
| Evidence needed | None required. |

**Question:** Decide: Professional feedback eligibility.

**Options**

- **Option 1 - Follow P8 assumption** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Define engagement-completion signal** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Follow P8 assumption. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-028 - Tier 2 trigger and reputation weights

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | VER-004, REP-006 |
| Evidence needed | None required. |

**Question:** Decide: Tier 2 trigger and reputation weights.

**Options**

- **Option 1 - Manual Admin assignment only** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Add eligibility rule** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Manual only; formula must be defined for the new backend. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-030 - Single generic Deal entity

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | DLR-008, ASM-005 |
| Evidence needed | None required. |

**Question:** Decide: Single generic Deal entity.

**Options**

- **Option 1 - Confirm single entity** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Split by counterparty type** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Confirm single entity (P7 default). (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-031 - Pre-publish moderation and unpublish

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | BIZ-006 |
| Evidence needed | None required. |

> **Note:** A Web Admin Dashboard now exists in principle (OD-03). Whether business approval is an essential R1 Admin action is part of OD-10; DEC-031 itself is not decided.

**Question:** Decide: Pre-publish moderation and unpublish.

**Options**

- **Option 1 - None (P3 default)** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Admin approval mandatory / add unpublish** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** OD-03 (approved), OD-10.

**Recommendation (PROPOSAL, not approved):** Your business choice; 'follow the backend' is impossible. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-035 - Agreement document form

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | AGR-002 |
| Evidence needed | None required. |

**Question:** Decide: Agreement document form.

**Options**

- **Option 1 - In-app read-only record** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Generated file (not a legal instrument)** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** In-app read-only record. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-038 - Admin 'elevated auth' meaning

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | AUTH-015, SEC-014 |
| Evidence needed | None required. |

> **Note:** Now concerns the Web Admin Dashboard and is linked to OD-11 and OD-08.

**Question:** Decide: Admin 'elevated auth' meaning.

**Options**

- **Option 1 - MFA** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Shorter sessions / device policy** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** OD-11, OD-08, G-05.

**Recommendation (PROPOSAL, not approved):** Decide together with OD-11 and OD-08. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-040 - Dashboard metrics definitions

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | DSH-003, PTF-003, DIS-012 |
| Evidence needed | None required. |

**Question:** Decide: Dashboard metrics definitions.

**Options**

- **Option 1 - Define calculations** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Drop undefined metrics** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Drop undefined metrics from the first release. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-049 - UI language(s)

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | MOB-090 |
| Evidence needed | None required. |

**Question:** Decide: UI language(s).

**Options**

- **Option 1 - English only** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Bangla, or both** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Your choice; no source defines it. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

### DEC-051 - Telemetry and crash reporting scope

| Field | Value |
|---|---|
| Status | **PENDING** |
| Approval tier | 4 |
| Priority | P2 |
| Affects | MOB-095, PERF-003 |
| Evidence needed | None required. |

**Question:** Decide: Telemetry and crash reporting scope.

**Options**

- **Option 1 - None** - As in v2.1 section 19.3.
  - Advantages: Simple and sourced.
  - Risks: Excludes the alternative.
- **Option 2 - Crash-only or analytics excluding sensitive data** - As in v2.1 section 19.3.
  - Advantages: Fuller capability.
  - Risks: More scope.

**Dependencies:** See affected IDs.

**Recommendation (PROPOSAL, not approved):** Crash-only, excluding credentials, ID images, financial and confidential content. (proposal, not approved)

**Owner decision:** NOT YET DECIDED. Chosen option: ______ Approver: ______ Date: ______

## 14. Open decisions raised by G-00 and OD-03 (not v2.1 DEC IDs)

### OD-01 - Backend functional specification

**Status:** **APPROVED** (Option A, all domains; approach only). **Tier:** 1.

**Why it matters:** G-00 chose a new backend, but v2.1 specifies the mobile client only. No document in the supplied files defines the backend's business logic, data model, authorisation, audit logging, scoring, disclosure/NDA/deal state machines, uploads, notifications or Admin functions.

**Options**

- **A - Create a backend functional specification derived from MPS and v2.1 business rules  <== CHOSEN BY THE OWNER** - Functional only; all domains.
  - Advantages: Single source of truth for the server; removes inference.
  - Risks: Large document; must be reviewed independently (same-author caveat); mostly GATED where decisions are pending.
- **B - Treat v2.1 as sufficient and derive the backend while building** - NOT CHOSEN.
- **C - Other** - NOT CHOSEN.

**Approved scope:** All MPS Must-Have requirements; all MPS Should-Have requirements; business rules and functional responsibilities; roles and permissions; workflows and state transitions; security and authorization requirements; audit logging and data protection obligations; Admin-related backend responsibilities; business-level data requirements.

**Scope boundaries:** Exclude MPS Future Scope (section 27). Distinguish Must-Have from Should-Have. Use the provisional R1/R2/R3 tags from v2.1 and do not treat them as approved G-07. Mark unresolved requirements PENDING or GATED with decision IDs. Preserve traceability to the original requirements and decision IDs. Do not invent missing business rules.

**Explicit exclusions:** REST API endpoint definitions; database schemas or SQL; application code; backend implementation; mobile implementation; Admin Dashboard implementation.

**Authorisation status:** The specification must not be generated until the owner separately authorises its creation. Not yet authorised.

**Dependencies:** G-00 and G-01 (approved), OD-03 (approved). Source documents (MPS, ILS, Phases 6 and 7 first) must be supplied; they were not available in this conversation. Handling of OD-08 (JWT conflict) must be stated. Blocks OD-02 and any API contract (DEP-015).

**CONFIRMED:** Option A (approach only). Approver: Project owner (explicit statement in chat). Date: 2026-11-15 (message sent 23:05, Asia/Dhaka).

### OD-02 - Backend roadmap and plan

**Status:** PENDING. **Tier:** 1.

**Why it matters:** The Roadmap contains client modules M00-M21 only and has no backend or Web Admin modules, phases, tests or release checklist. Roadmap Phase 2-4 items (DEP-003, DEP-010, DEP-011, DEP-012, DEP-015) now describe backend work with no owner.

**Options**

- **A - Create a backend roadmap and reconcile it with the client Roadmap** - Backend modules, phases, dependencies, gates.
  - Advantages: Sequencing client and server work.
  - Risks: Requires OD-01 first.
- **B - Extend the existing Roadmap with backend modules** - One combined document.
  - Advantages: One place to track.
  - Risks: Roadmap becomes large and mixes concerns.
- **C - Other** - You specify.
  - Advantages: Flexible.
  - Risks: Not assessed.

**Dependencies:** OD-01 (approved approach, not yet drafted), G-10, OD-03 (Web Admin track).

**Recommendation (PROPOSAL, not approved):** Option A after OD-01 (proposal).

**Owner decision:** NOT YET DECIDED.

### OD-03 - Separate Web Admin Dashboard, with minimum Admin functionality in R1

**Status:** **APPROVED** (Option A, including the R1 Admin clarification). **Tier:** 2.

**Why it matters:** v2.1 assumed Admin work happened on an existing web platform. With a new backend no Admin interface exists, yet Tier 1 identity verification, Business approval, discrepancy review and audit-log review all need an Admin actor.

**Options**

- **A - Web Admin interface built as part of the new system  <== CHOSEN BY THE OWNER** - Separate from the mobile app.
  - Advantages: Keeps sensitive images and evidence off phones; consistent with DEC-004 A (which remains PENDING).
  - Risks: Third deliverable with no specification, no technology decision and no roadmap; browser-client authentication conflicts with the JWT/browser-storage question (OD-08).
- **B - Admin functions in the mobile app (see DEC-004 B/C)** - NOT CHOSEN.
- **C - No Admin interface initially; manual or database-level handling** - NOT CHOSEN.

**Approved scope:** A separate Web Admin Dashboard is developed as part of the new system. The mobile app serves Founder, Investor and Skilled Professional users. Both clients use the same Node.js + Express.js backend through REST APIs. Admin-specific authorization and security requirements must be documented. Admin accounts must not be publicly self-registered. The Admin Dashboard frontend technology remains undecided.

**R1 Admin clarification (APPROVED):** Minimum Admin functionality must be available in Release 1. R1 must include the Admin functionality necessary to support its approved workflows, including Tier 1 verification review and other essential approval actions. The exact minimum Admin feature inventory must be derived from the requirements and explicitly documented (OD-10). Full Admin functionality may be scheduled for later releases, subject to G-07.

**Does NOT approve:** DEC-004, DEC-014 option C, DEC-020, DEC-026, DEC-031, DEC-038 or any other unrelated pending Admin decision.

**Open items created by this approval:** OD-09 (provisioning), OD-10 (minimum R1 inventory), OD-11 (web authentication and session), OD-12 (frontend technology and specification). CF-8 (v2.1 and Roadmap place Admin on mobile in R3) needs a change request.

**Dependencies:** OD-01 (must describe Admin duties), OD-08, DEC-038, G-05, G-07.

**CONFIRMED:** Option A with the R1 Admin clarification. Approver: Project owner (explicit statement in chat). Date: 2026-11-15 (message sent 23:05, Asia/Dhaka).

### OD-04 - External providers: email, SMS, push

**Status:** PENDING. **Tier:** 3.

**Why it matters:** The new backend must send verification/reset email (G-04), optionally SMS (DEC-016) and push (DEP-005). No provider is chosen anywhere.

**Options**

- **A - Choose providers now** - You name them.
  - Advantages: Unblocks G-04, DEC-016.
  - Risks: Cost and privacy review.
- **B - Defer; use simulated delivery in early phases** - Simulated email/SMS.
  - Advantages: No external dependency.
  - Risks: Not a real flow.
- **C - Other**

**Dependencies:** G-04, DEC-016, DEC-009.

**Recommendation (PROPOSAL, not approved):** Option B for Phase 0/R1 where the spec permits simulation (proposal).

**Owner decision:** NOT YET DECIDED.

### OD-05 - File storage and protection

**Status:** PENDING. **Tier:** 3.

**Why it matters:** Verification images, business documents and financial evidence need stored, access-controlled, audit-logged files (MPS section 29). No storage approach is decided. Admin review of verification images in the Web Admin Dashboard also depends on it.

**Options**

- **A - Decide storage design now** - You specify.
  - Advantages: Unblocks upload design.
  - Risks: Security review.
- **B - Defer until backend specification (OD-01)**
  - Advantages: Decide with full context.
  - Risks: Blocks upload features.
- **C - Other**

**Dependencies:** OD-01.

**Recommendation (PROPOSAL, not approved):** Option B (proposal).

**Owner decision:** NOT YET DECIDED.

### OD-06 - Phase 0 test backend and hosting

**Status:** PENDING. **Tier:** 1.

**Why it matters:** Roadmap Phase 0 tests on a physical phone against a non-production HTTPS backend. None exists. Hosting for Node.js and MySQL is also undecided.

**Options**

- **A - Allow a throwaway test backend for proofs of concept only** - No product code; discarded afterwards.
  - Advantages: Enables H-23 and a JWT proof of concept.
  - Risks: Must stay clearly non-production.
- **B - No test backend; test the client in isolation** - Mock only.
  - Advantages: No backend work.
  - Risks: Cannot prove auth, uploads or links.
- **C - Other**

**Dependencies:** G-10, G-02, G-03.

**Recommendation (PROPOSAL, not approved):** Option A (proposal).

**Owner decision:** NOT YET DECIDED.

### OD-07 - Legacy data: no migration

**Status:** **APPROVED** (Option A). **Tier:** 3.

**Why it matters:** Whether any data from the legacy platform is migrated.

**Options**

- **A - No migration (fresh start)  <== CHOSEN BY THE OWNER**
  - Advantages: Simplest; no schema mapping; no handling of legacy personal data.
  - Risks: Existing records are not carried over (the owner states they are test/demo data only). The new database has no reference data until it is defined (CF-10).
- **B - Migrate some data** - NOT CHOSEN.

**Approved scope:** The legacy platform contains test/demo data only. No existing data is migrated. The new MySQL database starts fresh. Legacy users, businesses, deals and other records do not transfer. The old Laravel project remains separate as a reference. Any necessary reference data, such as industry or skill categories, must be defined for the new system rather than copied automatically from the old database.

**Open after approval:** the content of reference lists and who defines them (CF-10).

**Dependencies:** G-01 (approved).

**CONFIRMED:** Option A. Approver: Project owner (explicit statement in chat). Date: 2026-11-15 (message sent 23:05, Asia/Dhaka).

### OD-08 - JWT vs original specification conflict (CF-1)

**Status:** PENDING. **Tier:** 1.

**Why it matters:** G-00 approves JWT-based authentication. v2.1 (CONF-02) reports that phase prompts P0 and P1 prohibit JWT / browser-storage tokens. This is a conflict between an approved owner decision and the original specification. I have NOT verified the P0/P1 wording myself; I rely on v2.1's report. This register does not override the original specification and does not declare it superseded. **OD-03 widens the question:** the Web Admin Dashboard is a browser client, so browser-based Admin authentication is directly affected. Option B below, as originally worded, addresses native secure storage only and would not by itself cover a browser-based Admin client.

**Options**

- **A - Owner formally records that G-00 supersedes the P0/P1 prohibition for the new backend** - Change request recorded against v2.1.
  - Advantages: Clear and auditable.
  - Risks: Overrides an original rule explicitly.
- **B - Owner confirms the prohibition only concerned browser storage; JWT in native OS secure storage is allowed** - Interpretation confirmed by the owner.
  - Advantages: Keeps the original intent.
  - Risks: Depends on the actual P0/P1 wording, which should be checked; does not settle browser-based Admin authentication.
- **C - Revisit the authentication family** - Reopens part of G-00.
  - Advantages: Removes the conflict.
  - Risks: Contradicts your decision.

**Dependencies:** G-03, OD-11, DEC-038. Not resolved here.

**Recommendation (PROPOSAL, not approved):** I cannot choose. Suggested: check the P0/P1 wording first, then decide, and decide Admin web authentication (OD-11) together with it.

**Owner decision:** NOT YET DECIDED.

### OD-09 - Admin account provisioning

**Status:** PENDING. **Tier:** 2. *(Working label; raised by the OD-03 approval; not a v2.1 DEC.)*

**Why it matters:** Approved: Admin accounts must not be publicly self-registered (OD-03; v2.1 ROL-002). Not defined: how the first and later Admin accounts are created, who may create or remove Admins, and whether one Admin tier is intended (v2.1 ADM-016 says no super admin). With a fresh database (OD-07) no Admin exists at start.

**Options:** None proposed yet. The owner has not asked for options, and no source defines a mechanism. Options will be drafted on request.

**Dependencies:** OD-03, OD-11, DEC-038.

**Owner decision:** NOT YET DECIDED.

### OD-10 - Minimum R1 Admin feature inventory

**Status:** PENDING. **Tier:** 2. *(Working label; raised by the OD-03 approval; not a v2.1 DEC.)*

**Why it matters:** The R1 Admin clarification is approved in principle. The exact inventory must be derived from the requirements and documented. v2.1 Admin actions that R1 workflows appear to rely on include Tier 1 verification review (ROL-005, VER-002, ADM-004, AC-023). Whether business approval or moderation (BIZ-006, DEC-031), account suspension (AUTH-010) or audit-log reading (ADM-013) are essential in R1 is not decided.

**Options:** Not proposed. The inventory is to be derived from the requirements (OD-01) and confirmed by the owner.

**Dependencies:** OD-03, OD-01, G-07, DEC-031, DEC-014.

**Owner decision:** NOT YET DECIDED.

### OD-11 - Admin web authentication and session

**Status:** PENDING. **Tier:** 2. *(Working label; raised by the OD-03 approval; not a v2.1 DEC.)*

**Why it matters:** The Web Admin Dashboard is a browser client using the same backend. How it authenticates, its session lifetime and its elevated-authentication meaning are undefined and intersect OD-08.

**Options:** Not proposed. Decide together with OD-08, DEC-038 and G-05.

**Dependencies:** OD-08, DEC-038, G-05, G-03.

**Owner decision:** NOT YET DECIDED.

### OD-12 - Admin Dashboard frontend technology and specification

**Status:** PENDING. **Tier:** 3. *(Working label; raised by the OD-03 approval; not a v2.1 DEC.)*

**Why it matters:** The owner stated the Admin Dashboard frontend technology is undecided. No specification or roadmap exists for the Web Admin client; the Roadmap has no Admin web track.

**Options:** Not proposed.

**Dependencies:** OD-03, OD-10, OD-02.

**Owner decision:** NOT YET DECIDED.

## 15. Revision 6 feature governance and integration

### 15.1 Proposed functionality versus approved decisions

The owner has requested the following proposed product capabilities for formal analysis: Business-scoped Professional membership, delegated Business Roles and permissions, Deal-specific Finance Manager participation, a Business Team Workspace, and a unified Messages experience spanning Hiring, Deals and Team conversations. These requested capabilities are inputs to requirements work, not evidence of implementation or approval of unresolved details. The 25 cards in sections 16 and 17 are all PENDING.

The Founder may invite or hire a Skilled Professional for one Business; membership becomes active only after acceptance. Business Roles do not grant global Founder, Investor or Admin status. Permissions are Business-, resource-, action-, Deal- and authorization-scoped and enforced server-side. A Founder may delegate negotiation and proposal preparation for a specific Deal to a Finance Manager, but only the Founder may provide final Founder-side approval, and the Investor must confirm independently. Proposals are versioned and auditable. Revocation must affect subsequent requests immediately and must not disturb memberships in unrelated Businesses.

The proposed Messages entry point provides All, Hiring, Deals and Team views, safe previews, unread counts and authorized search. Hiring Chat grants no membership or protected access. Team Chat requires active Business membership and permission. Deal Room Chat remains subject to Deal and NDA authorization; a Finance Manager participates only through explicit Deal delegation. Reads, sends, previews, notifications and search results require current server-side authorization and Business/Deal isolation. DEC-010 remains PENDING; delivery technology, attachments, read receipts, moderation, retention, deletion, historical visibility, push provider and Admin exceptions are not decided.

### 15.2 Conflict and gap additions

| ID | Item | Status / governing cards |
|---|---|---|
| CF-12 | Exact invitation expiry, withdrawal, re-invitation and acceptance semantics are undefined. | OPEN - BR-DEC-001 |
| CF-13 | Custom Role constraints, multi-role permission merging and forbidden grants are undefined. | OPEN - BR-DEC-003, BR-DEC-004 |
| CF-14 | Deal delegation limits, report authority, historical access after revocation and audit retention are undefined. | OPEN - BR-DEC-006, BR-DEC-007, BR-DEC-009, BR-DEC-010, BR-DEC-011 |
| CF-15 | Central inbox categorisation, unread/search semantics, notification redaction and history/retention rules are undefined. | OPEN - MSG-DEC-001, MSG-DEC-002, MSG-DEC-008 to MSG-DEC-010 |
| CF-16 | Messaging delivery technology, moderation, attachments, read receipts, deletion and release allocation are undefined. | OPEN - DEC-010, MSG-DEC-011 to MSG-DEC-013 |

### 15.3 Dependency impact and existing-decision traceability

| Topic | Existing decisions / requirements | Revision 6 dependency |
|---|---|---|
| Roles and active context | G-06 / DEC-047, DEC-005 | Business Roles are memberships within a Business, never global roles; role-context UI and permission evaluation must be reconciled. |
| Hiring and Professional participation | Professional and hiring requirements in v2.1 | BR-DEC-001, BR-DEC-002, MSG-DEC-003; pre-hire chat grants no membership. |
| Deal Room and agreement | G-08 / DEC-043, G-09 / DEC-006, DEC-010, DEC-035 | BR-DEC-006 and MSG-DEC-005; delegation cannot skip disclosure/NDA stages or replace dual final confirmation. |
| Financial reporting | DEC-012, DEC-013, DEC-040 | BR-DEC-007; Finance Manager access and editing remain limited to explicit grants; Admin may not edit Founder records. |
| Tasks, milestones and workspace | DEC-014, DEC-045 | BR-DEC-008; only assigned, authorized Business resources are in scope. |
| Authorization and authentication | G-03, G-05, OD-08, OD-11 | BR-DEC-005, BR-DEC-009, MSG-DEC-006, MSG-DEC-007; authorization is server-side and current on every protected request. |
| Notifications | DEC-009, OD-04 | MSG-DEC-008, MSG-DEC-009; previews and push content must be safely minimized. |
| Search | DEC-019 | MSG-DEC-008; only currently authorized conversations and fields may be searchable. |
| Admin and privacy | OD-03, OD-10, DEC-020, DEC-038 | No default Admin access to private NDA content or messages; exceptions require an explicit later decision. |
| AI | DEC-042 | AI cannot grant permissions, accept NDAs, authorize Deals, finalize terms or make identity/financial decisions. |
| Release planning | G-07 / DEC-034 and DEC-054, DEC-018 | BR-DEC-012 and MSG-DEC-013; allocations remain provisional. |

### 15.4 Revision 6 status dashboard and proposed decision order

| Register group | APPROVED | PENDING | NEEDS VERIFICATION | Total |
|---|---:|---:|---:|---:|
| Existing v2.1 decision cards | 2 | 43 | 1 | 46 |
| Existing OD cards | 3 | 9 | 0 | 12 |
| Business Role cards | 0 | 12 | 0 | 12 |
| Messaging cards | 0 | 13 | 0 | 13 |
| **Revision 6 total** | **5** | **77** | **1** | **83** |

Suggested order, not approved: decide BR-DEC-001, BR-DEC-002 and BR-DEC-005 before membership implementation planning; then BR-DEC-003, BR-DEC-004, BR-DEC-006 and BR-DEC-009; then BR-DEC-007, BR-DEC-008, BR-DEC-010 and BR-DEC-011; allocate releases under BR-DEC-012. For messaging, decide DEC-010 with MSG-DEC-001, MSG-DEC-002 and MSG-DEC-006 first; then MSG-DEC-003 to MSG-DEC-005 and MSG-DEC-007; then MSG-DEC-008 to MSG-DEC-012; allocate releases under MSG-DEC-013. G-07 remains the governing release-scope gate.

## 16. Business Role Assignment & Permission decisions

All cards in this section have **Status: PENDING**. Their recommendations are proposals only.

### BR-DEC-001 - Invitation, acceptance and membership lifecycle

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What invitation, expiry, withdrawal, acceptance, rejection and re-invitation states activate or end Business membership? |
| Alternatives | A: explicit versioned invitation accepted before activation; B: offer plus secondary Founder activation; C: owner-defined alternative. |
| Advantages / risks | A is auditable and prevents premature access; it needs expiry, race and notification rules. B adds control but friction and ambiguous acceptance. |
| Dependencies | Authentication, notifications (DEC-009), hiring, BR-DEC-009. |
| Affected features | Founder hiring, Professional onboarding, Business membership, Hiring Chat. |
| Recommendation (PROPOSAL, not approved) | A, with no Business privileges before acceptance and audited transitions. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-002 - Role grant and change authority

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Who may grant, change, suspend or remove Finance Manager, Business Manager and Project Manager roles? |
| Alternatives | A: Founder only; B: Founder plus expressly delegated role administrators; C: per-role policy. |
| Advantages / risks | A is simplest and safest; B/C reduce Founder workload but create escalation and delegation risks. |
| Dependencies | BR-DEC-001, BR-DEC-005, BR-DEC-011. |
| Affected features | Business team administration, permissions, audit. |
| Recommendation (PROPOSAL, not approved) | A for the first release; revisit delegated administration later. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-003 - Founder-defined Custom Roles

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Are Custom Roles allowed, and what names, templates, permission ceilings and forbidden grants apply? |
| Alternatives | A: no Custom Roles initially; B: restricted custom roles within a fixed permission catalogue; C: unrestricted composition. |
| Advantages / risks | B is flexible with enforceable ceilings; A is simpler; C risks privilege escalation and inconsistent support. |
| Dependencies | BR-DEC-002, BR-DEC-005, Admin/privacy boundaries. |
| Affected features | Team setup, authorization UI, audit. |
| Recommendation (PROPOSAL, not approved) | B; never permit global-role or Founder-final-approval grants. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-004 - Multiple roles and permission merging

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | May one member hold multiple roles in one Business, and how do allow/deny rules combine? |
| Alternatives | A: one role; B: multiple roles with additive allows and explicit deny precedence; C: multiple roles with another merge model. |
| Advantages / risks | B supports real teams but requires deterministic conflict handling; A is simpler but restrictive. |
| Dependencies | DEC-005, G-06, BR-DEC-003, BR-DEC-005. |
| Affected features | Role context, authorization, team roster. |
| Recommendation (PROPOSAL, not approved) | B, provided deny precedence and effective-permission visibility are specified. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-005 - Granular permission scope and evaluation

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What permission catalogue and evaluation rules apply across Business, resource, action and Deal scopes? |
| Alternatives | A: explicit allow-list with default deny; B: role defaults plus overrides; C: coarse fixed roles. |
| Advantages / risks | A maximizes control but adds configuration; B improves usability but complicates precedence; C is simple but over-broad. |
| Dependencies | G-03, G-05, OD-08, BR-DEC-003, BR-DEC-004. |
| Affected features | Every protected Business, report, document, task, Deal and message action. |
| Recommendation (PROPOSAL, not approved) | A or tightly bounded B; server-side default deny and Business isolation are mandatory. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-006 - Deal-specific Finance Manager delegation

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | How does a Founder authorize, limit and revoke Finance Manager negotiation for one Deal? |
| Alternatives | A: explicit Deal grant with defined permissions and optional limits; B: Business-wide Finance Manager Deal access; C: no delegation. |
| Advantages / risks | A is least-privilege and auditable; B is convenient but over-broad; C preserves control but blocks requested delegation. |
| Dependencies | G-08, G-09, DEC-010, BR-DEC-005, BR-DEC-009, MSG-DEC-005. |
| Affected features | Deal Room, proposal preparation, financial-document review. |
| Recommendation (PROPOSAL, not approved) | A; only Founder gives final Founder-side approval and Investor confirmation remains independent. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-007 - Financial report and proposal authority

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which reports may delegated members view, prepare or edit, and who may publish or attest them? |
| Alternatives | A: separate view/draft/edit/submit permissions per report; B: broad Finance Manager preset; C: view-only delegation. |
| Advantages / risks | A supports least privilege and audit; B is easier but may expose excess data; C limits collaboration. |
| Dependencies | DEC-012, DEC-013, DEC-040, BR-DEC-005, BR-DEC-011. |
| Affected features | Financial reporting, proposal versions, discrepancy workflows. |
| Recommendation (PROPOSAL, not approved) | A; no Admin editing and no delegated final Deal approval. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-008 - Team Workspace, task and milestone boundaries

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What Business Team Workspace resources and task/milestone actions are assignable to each role? |
| Alternatives | A: assignment plus per-action permission; B: role-wide workspace access; C: task-only initial scope. |
| Advantages / risks | A is flexible and isolated but complex; B is usable but broad; C reduces scope but delays operations. |
| Dependencies | DEC-014, DEC-045, BR-DEC-005, MSG-DEC-004. |
| Affected features | Operations, tasks, milestones, documents, Team Chat. |
| Recommendation (PROPOSAL, not approved) | A with default deny outside assigned Business resources. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-009 - Revocation and immediate enforcement

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | How quickly and by what session/cache rules do role, membership and Deal-grant revocations take effect? |
| Alternatives | A: next protected request with server-side current-state check; B: bounded cache plus forced invalidation; C: session expiry only. |
| Advantages / risks | A gives strongest immediate control but costs lookups; B can scale with careful invalidation; C leaves unsafe access windows. |
| Dependencies | G-03, G-05, BR-DEC-005, MSG-DEC-006. |
| Affected features | APIs, inbox previews, messages, reports, documents, Deal Room. |
| Recommendation (PROPOSAL, not approved) | A or provably equivalent B; unrelated Business memberships remain intact. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-010 - Historical access after removal

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What historical Business, Deal, task, document and message content remains visible after revocation or departure? |
| Alternatives | A: no user access after removal; B: limited immutable history; C: Founder-selected history subject to policy. |
| Advantages / risks | A minimizes leakage; B/C aid continuity and disputes but raise NDA, privacy and retention risk. |
| Dependencies | BR-DEC-009, MSG-DEC-010, legal/privacy policy. |
| Affected features | History, exports, Deal Room, Team Chat, audit. |
| Recommendation (PROPOSAL, not approved) | Default to A until retention and legal requirements are approved. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-011 - Permission and proposal audit policy

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which invitation, grant, change, revocation, delegated action and proposal-version events are audited, and for how long? |
| Alternatives | A: comprehensive immutable security audit; B: security events only; C: configurable categories. |
| Advantages / risks | A gives accountability but increases sensitive-data and retention obligations; B/C reduce volume but may weaken evidence. |
| Dependencies | BR-DEC-001 to BR-DEC-010, privacy/retention policy. |
| Affected features | Permissions, proposals, Deal negotiation, Admin audit review. |
| Recommendation (PROPOSAL, not approved) | A for metadata and state changes, excluding unnecessary confidential content; retention remains undecided. |
| Owner decision | NOT YET DECIDED. |

### BR-DEC-012 - Business Role release allocation

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which membership, standard roles, custom roles, Deal delegation, reports and workspace capabilities enter each release? |
| Alternatives | A: minimum secure membership and standard roles first; B: full system in R1; C: defer all. |
| Advantages / risks | A controls risk but phases value; B offers completeness with major scope; C blocks requested collaboration. |
| Dependencies | G-07, DEC-018, BR-DEC-001 to BR-DEC-011. |
| Affected features | Release roadmap, backend, mobile and Web Admin support. |
| Recommendation (PROPOSAL, not approved) | A; exact allocation requires owner approval under G-07. |
| Owner decision | NOT YET DECIDED. |

## 17. Unified Messaging & Communication decisions

All cards in this section have **Status: PENDING**. Their recommendations are proposals only. DEC-010 remains PENDING and is not superseded.

### MSG-DEC-001 - Central inbox scope

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which authorized conversations appear in the unified Messages entry point and what identity/context fields are shown? |
| Alternatives | A: Hiring, Deals and Team in one inbox; B: unified entry with separate stores; C: separate inboxes. |
| Advantages / risks | A is coherent but needs strict isolation; B eases domain separation but complicates ordering; C fragments navigation. |
| Dependencies | DEC-010, DEC-019, MSG-DEC-006 to MSG-DEC-008. |
| Affected features | Messages navigation, conversation list, previews, search. |
| Recommendation (PROPOSAL, not approved) | A, with category, Business, participants and role context displayed only when authorized. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-002 - Conversation categories and filtering

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | How are All, Hiring, Deals and Team categories assigned, filtered and handled when context overlaps? |
| Alternatives | A: one immutable primary category; B: multiple tags; C: dynamically inferred category. |
| Advantages / risks | A is predictable; B supports overlap but complicates counts; C reduces inputs but may misclassify. |
| Dependencies | MSG-DEC-001, MSG-DEC-008. |
| Affected features | Inbox filters, unread totals, search. |
| Recommendation (PROPOSAL, not approved) | A with explicit domain context; no category may broaden access. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-003 - Founder-Professional pre-hire chat

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Who may start Hiring Chat, under what anti-abuse rules, and when is it closed or converted? |
| Alternatives | A: Founder invitation/contact request; B: either party after eligibility checks; C: no pre-hire chat. |
| Advantages / risks | A controls unsolicited contact; B improves discovery but raises abuse risk; C removes useful negotiation. |
| Dependencies | BR-DEC-001, moderation (MSG-DEC-012), notifications. |
| Affected features | Hiring, Professional profiles, inbox. |
| Recommendation (PROPOSAL, not approved) | A initially; opening chat never grants membership, financial data or Deal access. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-004 - Business Team Chat membership and scope

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which active Business members may create, join and send in Team conversations? |
| Alternatives | A: explicit permission and participant membership; B: all active Business members; C: role-specific fixed channels. |
| Advantages / risks | A is least-privilege but administrative; B is simple but broad; C is predictable but inflexible. |
| Dependencies | BR-DEC-005, BR-DEC-008, BR-DEC-009, MSG-DEC-007. |
| Affected features | Team Chat, workspace, notifications. |
| Recommendation (PROPOSAL, not approved) | A; conversations are isolated to one Business and current membership. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-005 - Deal Room delegated participant communication

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | How is an authorized Finance Manager added, identified and removed from a specific Deal Room? |
| Alternatives | A: Founder-issued Deal-specific grant; B: automatic access by Finance Manager role; C: no manager messaging. |
| Advantages / risks | A is explicit and auditable; B is convenient but over-broad; C prevents delegated negotiation. |
| Dependencies | DEC-010, BR-DEC-006, BR-DEC-009, disclosure/NDA rules. |
| Affected features | Deal Room Chat, participant identity, negotiation history. |
| Recommendation (PROPOSAL, not approved) | A; show represented Business and authorized role. Chat never finalizes agreement. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-006 - Message read/send authorization

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What authorization checks govern conversation discovery, read, send and participant changes? |
| Alternatives | A: current-state server check per protected action; B: short-lived grants with revocation; C: session-only checks. |
| Advantages / risks | A best enforces revocation; B may scale with careful invalidation; C risks stale access. |
| Dependencies | G-03, G-05, BR-DEC-005, BR-DEC-009. |
| Affected features | Inbox, chat, unread, notifications, search. |
| Recommendation (PROPOSAL, not approved) | A or equivalent revocation-safe design; default deny. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-007 - Business, Deal and NDA isolation

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | How are Business/Deal boundaries and disclosure-stage/NDA restrictions applied to message content and metadata? |
| Alternatives | A: conversation bound to one security context; B: cross-context conversations with per-message labels; C: policy-specific hybrids. |
| Advantages / risks | A is safer and easier to audit; B is flexible but creates leakage risk; C adds complexity. |
| Dependencies | Four disclosure stages, NDA acceptance, Tier 1 verification, Founder Stage 4 confirmation. |
| Affected features | Deal Room, Team Chat, previews, search, notifications. |
| Recommendation (PROPOSAL, not approved) | A; unauthorized protected API fields and preview content are omitted, not merely hidden in UI. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-008 - Unread counts, safe previews and authorized search

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What counts as unread, what preview data is safe, and which content may be searched? |
| Alternatives | A: server-computed authorization-filtered metadata/search; B: device-local state/search; C: mixed model. |
| Advantages / risks | A is consistent across devices but backend-heavy; B protects some content locally but is incomplete; C needs reconciliation. |
| Dependencies | DEC-019, MSG-DEC-006, MSG-DEC-007, read-receipt decision. |
| Affected features | Inbox badges, filters, preview, search. |
| Recommendation (PROPOSAL, not approved) | A; do not infer or approve read receipts through this card. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-009 - Messaging notifications and preview redaction

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which messaging events notify users and what content may appear on lock screens or external push services? |
| Alternatives | A: generic notification by default; B: user-selected preview detail; C: full previews. |
| Advantages / risks | A minimizes leakage; B improves utility with privacy complexity; C is useful but unsafe for NDA content. |
| Dependencies | DEC-009, OD-04, MSG-DEC-006, MSG-DEC-007. |
| Affected features | Push/in-app notifications, unread badges. |
| Recommendation (PROPOSAL, not approved) | A; push provider remains undecided. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-010 - History after revocation or conversation exit

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What conversation history remains visible after membership, Deal delegation or conversation access ends? |
| Alternatives | A: access ends immediately; B: immutable history up to removal; C: context-specific policy. |
| Advantages / risks | A minimizes leakage; B supports continuity/disputes but may violate NDA/privacy expectations; C is precise but complex. |
| Dependencies | BR-DEC-009, BR-DEC-010, retention policy (MSG-DEC-011). |
| Affected features | Chat history, exports, audit, support. |
| Recommendation (PROPOSAL, not approved) | A until explicit legal and retention policy is approved. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-011 - Retention, deletion and attachments

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | What retention periods, deletion semantics and attachment support apply to each conversation type? |
| Alternatives | A: no attachments initially and retain under a later policy; B: controlled attachments with scanning and access checks; C: owner-defined variant. |
| Advantages / risks | A reduces initial security scope but leaves retention unresolved; B enables work but adds malware, storage and privacy risks. |
| Dependencies | OD-05, privacy/legal rules, MSG-DEC-007, MSG-DEC-010. |
| Affected features | Messages, file storage, audit, account deletion. |
| Recommendation (PROPOSAL, not approved) | Do not enable attachments or destructive deletion until separately approved; retention remains PENDING. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-012 - Delivery technology, receipts and moderation

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which delivery model, read-receipt behavior and moderation/reporting policy should messaging use? |
| Alternatives | A: polling; B: WebSockets; C: hybrid; with receipts/moderation independently enabled or deferred. |
| Advantages / risks | Polling is simpler but less immediate; WebSockets improve immediacy but add operational complexity; moderation improves safety but raises privacy/Admin-access questions. |
| Dependencies | DEC-010, OD-03, performance targets (DEC-025), privacy policy. |
| Affected features | All chats, presence/delivery, abuse reporting, Admin workflows. |
| Recommendation (PROPOSAL, not approved) | Run a technical evaluation; do not choose technology, receipts, or Admin content access in this revision. |
| Owner decision | NOT YET DECIDED. |

### MSG-DEC-013 - Messaging release scope

| Field | Value |
|---|---|
| Status | **PENDING** |
| Question | Which inbox, Hiring Chat, Team Chat, Deal Room delegation, search and notification capabilities enter each release? |
| Alternatives | A: secure core inbox and required Deal messaging first; B: all messaging in R1; C: defer messaging. |
| Advantages / risks | A controls risk but phases utility; B offers a complete experience with high scope; C blocks requested communication. |
| Dependencies | G-07, DEC-018, DEC-010, MSG-DEC-001 to MSG-DEC-012. |
| Affected features | Mobile releases, backend, minimum Web Admin support if moderation is later approved. |
| Recommendation (PROPOSAL, not approved) | A, but exact allocation is an owner decision under G-07. |
| Owner decision | NOT YET DECIDED. |

## 18. Closed, superseded and reserved IDs

| ID | State in v2.1 | Note |
|---|---|---|
| DEC-001 | Closed | The audit is now historical reference for the legacy platform (read-only reference under G-01); ASM-001 confirmation no longer blocks anything. |
| DEC-029 | Superseded | No mobile visual design system is mandated (ARC-008). |
| DEC-002, 021, 023, 024, 032, 033, 036, 037 | Reserved | No content in the sources; not decisions. |

## 19. Approval log

Entries for G-01, OD-01, OD-03 and OD-07 were approved by the owner at conversation level (message sent 23:05, Asia/Dhaka, 2026-11-15) and recorded in this revision on the owner's instruction (message sent 23:17). Only the items with filled rows are approved.

| Ref | DEC | Option approved | Approver | Date | Notes |
|---|---|---|---|---|---|
| G-00 | no v2.1 DEC ID | B - new backend (Node.js/Express, MySQL, REST, JWT; RN+Expo+TS) | Project owner (explicit instruction in chat) | 2026-11-15 (message sent 22:24, Asia/Dhaka) | Does not approve G-02, G-03 or resolve OD-08 |
| G-01 | DEC-046 | A - legacy Laravel platform as read-only reference; independent new backend with own repository and baseline | Project owner (explicit statement in chat) | 2026-11-15 (message sent 23:05, Asia/Dhaka) | New baseline commit not yet pinned; DEC-041 not formally closed |
| G-02 | DEC-022 | | | | |
| G-03 | DEC-003 | | | | |
| G-04 | DEC-052 | | | | |
| G-05 | DEC-053 | | | | |
| G-06 | DEC-047 | | | | |
| G-07 (1 of 2) | DEC-034 | | | | |
| G-07 (2 of 2) | DEC-054 | | | | |
| G-08 | DEC-043 | | | | |
| G-09 | DEC-006 | | | | |
| G-10 | DEC-055 | | | | |
| - | DEC-004 | | | | |
| - | DEC-042 | | | | |
| - | DEC-005 | | | | |
| - | DEC-010 | | | | |
| - | DEC-014 | | | | |
| - | DEC-016 | | | | |
| - | DEC-017 | | | | |
| - | DEC-025 | | | | |
| - | DEC-041 | | | | |
| - | DEC-044 | | | | |
| - | DEC-050 | | | | |
| - | DEC-007 | | | | |
| - | DEC-008 | | | | |
| - | DEC-009 | | | | |
| - | DEC-012 | | | | |
| - | DEC-013 | | | | |
| - | DEC-045 | | | | |
| - | DEC-048 | | | | |
| - | DEC-026 | | | | |
| - | DEC-039 | | | | |
| - | DEC-011 | | | | |
| - | DEC-015 | | | | |
| - | DEC-018 | | | | |
| - | DEC-019 | | | | |
| - | DEC-020 | | | | |
| - | DEC-027 | | | | |
| - | DEC-028 | | | | |
| - | DEC-030 | | | | |
| - | DEC-031 | | | | |
| - | DEC-035 | | | | |
| - | DEC-038 | | | | |
| - | DEC-040 | | | | |
| - | DEC-049 | | | | |
| - | DEC-051 | | | | |
| OD-01 | (not a v2.1 DEC) | A - Backend Functional Specification, all domains (Must-Have + Should-Have; excludes Future Scope section 27); approach only | Project owner (explicit statement in chat) | 2026-11-15 (message sent 23:05, Asia/Dhaka) | Creation NOT authorised; no endpoints, schemas or code |
| OD-02 | (not a v2.1 DEC) | | | | |
| OD-03 | (not a v2.1 DEC) | A - separate Web Admin Dashboard; minimum Admin functionality in R1 | Project owner (explicit statement in chat) | 2026-11-15 (message sent 23:05, Asia/Dhaka) | Does not approve DEC-004, DEC-014 C, DEC-020, DEC-026, DEC-031, DEC-038; OD-09 to OD-12 open |
| OD-04 | (not a v2.1 DEC) | | | | |
| OD-05 | (not a v2.1 DEC) | | | | |
| OD-06 | (not a v2.1 DEC) | | | | |
| OD-07 | (not a v2.1 DEC) | A - no legacy data migration; fresh MySQL; reference data defined anew | Project owner (explicit statement in chat) | 2026-11-15 (message sent 23:05, Asia/Dhaka) | Legacy data stated to be test/demo only; reference lists not yet defined (CF-10) |
| OD-08 | (not a v2.1 DEC) | | | | |
| OD-09 | (not a v2.1 DEC) | | | | |
| OD-10 | (not a v2.1 DEC) | | | | |
| OD-11 | (not a v2.1 DEC) | | | | |
| OD-12 | (not a v2.1 DEC) | | | | |

No BR-DEC or MSG-DEC row is added to the approval table because none is approved. Their complete PENDING records are in sections 16 and 17; adding blank approval evidence would not change their status.

## 20. Revision history and change summary

| Revision | Date | Summary | Approval effect |
|---|---|---|---|
| 5 | 2026-11-15 | Preserved baseline containing the original gates, v2.1 decisions, OD decisions and approval evidence. | Five approved items: G-00, G-01, OD-01, OD-03, OD-07. |
| 6 | 2026-11-18 | Added owner-requested Business Role Assignment & Permission and Unified Messaging & Communication change systems; 12 BR and 13 MSG decision cards; cross-cutting governance, conflicts, dependencies, traceability, status arithmetic and proposed ordering. | No new approval. All 25 new cards are PENDING; DEC-010, G-10 and all other pre-existing unresolved items retain their statuses. |

Revision 6 does not claim implementation, test evidence or detailed policy approval. It preserves the Revision 5 approval record verbatim apart from its section number and records the proposed systems without authorizing application development.

*End of document.*
