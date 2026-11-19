# Vault Ventures Mobile App - Admin Dashboard Specification

**Document:** 3 of 6 (Admin Dashboard Functional and Security Specification)
**Edition:** 0.3-DRAFT (supersedes Edition 0.2-DRAFT; see sections 0.11 and 0.12)
**Status:** DRAFT. Not approved. Not development-ready. **It does not authorise development.**
**Type:** Specification document. It contains no application code, no endpoint URLs, no SQL schema, no database column definitions and no approved dates.
**Language note:** This file is ASCII-only by design.

---

## 0. Document control

### 0.1 Title, edition and purpose
This document specifies the functional and security behaviour of the separate Web Admin Dashboard of the Vault Ventures Mobile App. It is intended to guide, later, the Web Admin implementation, the database design, the API contract and the testing plan. It is not permission to begin any of them. Planning readiness is not development authorisation (Gate G-10 / DEC-055 is PENDING).

### 0.2 Labels used in this document
| Label | Meaning |
|---|---|
| **APPROVED** | Explicitly decided by the project owner and logged in DECISIONS Revision 6. Exactly five: G-00, G-01 / DEC-046, OD-03, OD-07 and OD-01 (approach only). |
| **SOURCED** | Stated by a source document (Backend Functional Specification Edition 0.4-DRAFT, corrected Mobile Functional Master Specification v2.1, Decision Register Revision 6, or the provisional Backend Development Roadmap). Where the source is itself a DRAFT, SOURCED is not an approval. |
| **PROPOSED** | Proposal made by this document. Not a business rule. Not approved. |
| **PENDING** | Unresolved decision (includes NEEDS VERIFICATION). No option is chosen. Nothing PENDING may be built as if decided. |
| **UNKNOWN** | Absent from every available source. Must not be guessed. |

Module release classification labels (used in Sections 5, 6 and 17):
| Class | Meaning |
|---|---|
| **R1 REQUIRED** | Required in Release 1 by confirmed scope: OD-03 (APPROVED) names Tier 1 verification review and requires minimum Web Admin functionality in R1, and the Roadmap marks the item REQUIRED. |
| **R1 CANDIDATE** | Proposed input to the minimum R1 Admin inventory. Included in R1 only if the approved inventory (OD-10, PENDING) includes it. |
| **R2 PROPOSED** | Proposed for Release 2. Not approved (G-07 PENDING). |
| **R3 PROPOSED** | Proposed for Release 3. Not approved (G-07 PENDING). |
| **PENDING / NOT APPROVED** | Cannot be allocated or built until a named decision is made. |
| **NOT BUILT** | Deliberately not built; recorded for traceability. |

### 0.3 Source hierarchy
| Priority | Source | Use | Note |
|---|---|---|---|
| 1 | DECISIONS Revision 6 | Authority for approval and pending status | Current authoritative Decision Register. Its BR-DEC-001..012 and MSG-DEC-001..013 cards are all PENDING. |
| 2 | Backend Functional Specification Edition 0.4-DRAFT | Active backend requirement IDs (BE-*), security boundaries, decisions and acceptance criteria | A DRAFT. Its creation remains not recorded as authorised (BC-16, BE-DEC-20). |
| 3 | Corrected Mobile Functional Master Specification v2.1 (internal Edition 2.2) | Active mobile functional context, including Business Roles, Unified Messaging and corrected Node.js/Web Admin direction | A DRAFT; Business Role and Messaging allocations remain PENDING. |
| 4 | Backend Development Roadmap Edition 0.2-DRAFT, if available | Historical/provisional phase dependencies, release proposals and task IDs BR-* | Not authoritative over the three newer documents; OD-02 and G-07 remain PENDING. |
| 5 | MPS v1.1, ILS, P0-P9, UI/UX PRD and Phase 1 legacy audit | Historical evidence reached through the reconciled sources above | Historical evidence only; it is not implementation evidence for the new backend. |

If sources disagree, the conflict is listed in Section 0.9 and not silently resolved.

### 0.4 Approval status (from DECISIONS Revision 6)
| Item | Status | Approved scope relevant to this document |
|---|---|---|
| G-00 | APPROVED (2026-11-15) | Node.js + Express.js, MySQL, REST, JWT-based family, React Native + Expo + TypeScript. Laravel is not used as the backend. Does NOT approve the JWT token model (G-03), Expo details (G-02), hosting, providers, endpoints, schema or the start of development. |
| G-01 / DEC-046 | APPROVED (2026-11-15) | Legacy Laravel platform is a read-only reference. No code, framework dependency or implementation is reused or integrated. The new backend has its own repository and baseline (not yet created or pinned). |
| OD-03 | APPROVED (2026-11-15) | Separate Web Admin Dashboard, part of the new system, using the same Node.js + Express.js backend through REST. Mobile app serves Founder, Investor and Skilled Professional only. Admin-specific authorization and security requirements must be documented. Admin accounts must not be publicly self-registered. Frontend technology undecided. **Minimum Admin functionality must be available in Release 1**, including Tier 1 verification review and other essential approval actions. The exact minimum inventory must be derived and documented (OD-10). OD-03 does NOT approve DEC-004, DEC-014 option C, DEC-020, DEC-026, DEC-031, DEC-038 or any other unrelated pending Admin decision. |
| OD-07 | APPROVED (2026-11-15) | No legacy data migration; the new MySQL database starts fresh; reference data defined anew. A fresh database has no Admin account at start (OD-09 text). |
| OD-01 | APPROVED approach only | Backend Functional Specification approach for all domains. Creation authorisation is not recorded (BE-DEC-20). |

Everything else is PENDING, NEEDS VERIFICATION (G-02 only) or UNKNOWN. A proposed roadmap allocation is not an approved business decision.

### 0.5 Terminology
| Term | Meaning |
|---|---|
| Web Admin Dashboard (Web Admin) | The separate browser-based Admin client approved by OD-03. |
| Admin | An internally provisioned platform governance user. Never publicly self-registered. Not a participant. |
| Participant | A Founder, Investor or Skilled Professional account served by the mobile app. |
| Business member | A participant with an accepted, active membership in one Business. Membership and granular grants are Business-specific and confer no Platform Admin authority. |
| Business Role | Finance Manager, Business Manager, Project Manager or restricted Custom Role within one Business; a title alone grants no resource action. |
| Deal delegation | A current Founder-issued grant for one Business, one Deal and specified actions; it never grants final Founder-side confirmation. |
| Tier 0 / 1 / 2 | Verification tiers: Unverified, Identity Verified (manual Admin review), Track-Record Verified (manual in the MPS MVP; trigger PENDING, DEC-028). |
| Verification request | A participant's request for Tier 1, with evidence. Statuses: pending, approved, rejected, more-information-requested. |
| Simulated | No real money, escrow, custody or legal effect. |
| R1 / R2 / R3 | Proposed release tags (G-07 / DEC-034, DEC-054 PENDING). |
| OD-10 inventory | The minimum Release 1 Admin feature inventory, to be derived from the requirements and approved by the owner. PENDING. |

### 0.6 Assumptions
| ID | Assumption | If wrong |
|---|---|---|
| AA-01 | There is a single Admin role as sourced (v2.1 ADM-016 "no super admin"). No multi-level Admin hierarchy exists or is approved. | Section 4 and all authorisation rows must be revised once an admin-grade decision exists (BE-ADM-011). |
| AA-02 | The number of Admin users and their working hours are UNKNOWN. | Queue handling and concurrency rules may need adjustment. |
| AA-03 | Admin is a web client used from a desktop-class browser. The browser and device matrix is UNKNOWN. | UX requirements (Section 14) need revision. |
| AA-04 | Statuses from the legacy audit (IMP, PAR, UNV, MIS) describe the old platform only and prove nothing about the new backend (BE-GEN-018, Revision 6 AS-1). | None; no legacy status is used as evidence here. |
| AA-05 | Release tags are PROPOSED, informed historically by Roadmap Edition 0.2 and reconciled with the newer specifications. | Section 17 must be re-baselined after G-07. |

### 0.7 Exclusions
This document does not: select a Web Admin frontend framework (OD-12 PENDING); define endpoint URLs, request or response field names, SQL tables or columns; define visual design, branding or a design system; specify mobile screens; authorise or schedule any work; introduce real payments, escrow, custody, payment processors or payment credentials; introduce Admin impersonation; introduce an LLM or AI provider; reuse or integrate any legacy Laravel code, data or payment branch.

### 0.8 Document relationships
| Document | Relationship |
|---|---|
| 1 Backend_Functional_Specification.md | Edition 0.4-DRAFT is the active source of BE-* requirements and acceptance criteria. This document decomposes its BE-ADM rows. |
| 2 Backend_Development_Roadmap.md | Historical/provisional source of phases, release proposals and task IDs only; it cannot override Revision 6 or the corrected specifications. |
| 3 Admin_Dashboard_Specification.md | This document. |
| Upcoming Database_Design.md, API_Contract.md and the Testing Plan | Consume Sections 11, 15, 16 and 20. Their numbering within 4 to 6 is not stated by any source and is not assumed here. No design, contract or plan exists today. |
| DECISIONS 2_REV6.md | Authority for approval status. If this document differs, Revision 6 governs and this document must be corrected. |

### 0.9 Source conflicts and gaps register (flagged, NOT silently resolved)
| ID | Conflict or gap | Sources | Treatment here | Status |
|---|---|---|---|---|
| ADC-01 | Earlier mobile text placed Admin on mobile in R3; OD-03 and the corrected mobile specification place Admin in a separate Web Admin client with a minimum in R1. | Corrected mobile specification; Revision 6; Backend Spec 0.4 BC-05 | Web-only direction is resolved. Exact Web Admin frontend and inventory remain pending. | RESOLVED direction; OD-10/OD-12 PENDING |
| ADC-02 | Earlier mobile allocation separated R1 verification submission from later Admin review. | Corrected mobile specification; Revision 6; Backend Spec 0.4 BC-13 | R1 Tier 1 Web Admin review is required by OD-03. The rest of the inventory is not derived. | RESOLVED requirement; OD-10 PENDING |
| ADC-03 | JWT (G-00) versus the P0/P1 prohibition reported by corrected mobile CONF-02, extended by OD-03 because Web Admin is a browser client. | Revision 6 (CF-1, OD-08), Backend Spec 0.4 BC-04 | No statement that the prohibition does or does not apply. Security requirements in Section 12 remain conditional on the approved model. | OPEN (OD-08) |
| ADC-04 | A suspended user account must be refused and its sessions revoked (BE-AUTH-013, v2.1 AUTH-010 R1), but the Admin capability that suspends users (BE-ADM-002) is only an R1 CANDIDATE. If it is not inventoried, R1 has no sanctioned way to suspend an account. | Backend Spec, Roadmap | Flagged. No default is chosen. | OPEN (OD-10, AD-DEC-09) |
| ADC-05 | Notification of a verification decision depends on the event catalogue (v2.1 NTF-002 lists "verification decision" only as a candidate; DEC-009 PENDING). | v2.1, Backend Spec BE-NTF-002 | The participant must be able to read the updated status and reason regardless (BE-VER-002). A notification is specified only as conditional. | OPEN (DEC-009) |
| ADC-06 | Admin governance may require limited Business or Deal metadata, but Admin has no default access to Stage 3/4 documents, NDA-protected content, private messages or confidential Deal content. The exact necessary Business review fields remain undefined. | Backend Spec 0.4 BE-ADM-015, BE-SEC-013; corrected mobile ROL-006 | No confidential participant content is shown by default. Any narrowly necessary exception requires an explicit later decision, least privilege and audit. | OPEN (AD-DEC-06) |
| ADC-07 | Earlier backend wording suggested Admin read-only Deal messages. Backend Specification 0.4 now states that Admin has no default private-message or confidential Deal access. Exceptional review, moderation and reporting access remains undefined. | Backend Spec 0.4 BE-MSG-001, BE-SEC-013; MSG-DEC-006/007/011/012 | No Admin module lists, searches, previews, joins or displays private conversation content or existence. No moderation privilege is inferred. | RESOLVED default; exception PENDING (AD-DEC-03) |
| ADC-08 | v2.1 ADM-016 says "no super admin"; BE-ADM-011 says whether multiple admin grades are required is undecided. | v2.1, Backend Spec | Single Admin role assumed (AA-01); no hierarchy invented. | OPEN |
| ADC-09 | The Roadmap tags BR-P7-09 (deal and application oversight) and BR-P9-08 (reputation and premium oversight, analytics, settings) as R2/R3 while Roadmap Section 4.1 lists BE-ADM-005, 007, 008, 010, 011 under R3 "per G-07". BE-PAY (simulated payments) is R2 but its Admin view BE-PAY-006 / BE-ADM-008 is tagged later. | Roadmap | Split not decided; shown as "R2/R3 PROPOSED" or R3 PROPOSED as the Roadmap states. | OPEN (G-07) |
| ADC-10 | Fresh database (OD-07) has no Admin account at start, and Admin provisioning is undefined (OD-09), yet R1 verification review needs an Admin. | Revision 6 (OD-09), Backend Spec 0.4 BE-ADM-016 | Bootstrap problem flagged; constraints only (Section 3). | OPEN (OD-09) |
| ADC-11 | Earlier Admin small-screen/mobile wording conflicts with OD-03. The corrected mobile specification now treats Admin as a separate Web Admin client. | Corrected mobile specification; Revision 6 | Mobile-Admin direction is resolved; Web Admin browser/device requirements remain pending. | RESOLVED direction; OD-12 PENDING |
| ADC-12 | Whether Admin approval is a mandatory pre-publish step of the Business lifecycle is not stated by any source (BE-BIZ-004, DEC-031 PENDING). The sourced lifecycle steps (submit, approve or reject, publish) were observed in the legacy platform only. | Backend Spec BE-BIZ-004, v2.1 BIZ-006 | The Business lifecycle in this document is conditional on that decision (AD-BIZ-001, AD-BIZ-002, AD-MOD-04). | OPEN (DEC-031, OD-10) |

### 0.10 Rules of this document
- ARU-01. Nothing here is an approval. Nothing here says development is authorised.
- ARU-02. No endpoint URL, request or response field name, table name or column name is defined. Capabilities are named in business terms only.
- ARU-03. No Web Admin frontend framework or library is selected (OD-12 PENDING).
- ARU-04. A module or action is never described as implemented, tested or available. None exists.
- ARU-05. Where a source is silent the item is PENDING or UNKNOWN. Any new default offered here is labelled PROPOSED.
- ARU-06. R1 completion requires only R1-tagged items. R2 and R3 modules never block R1 (Roadmap RR-09 and Section 4.4).
- ARU-07. All amounts, commissions, premium effects and funding shown to Admin are simulated and labelled so (BE-GEN-013).
- ARU-08. New IDs: AD-ARC (architecture), AD-AUT (authentication), AD-PRM (permissions), AD-IA (information architecture), AD-MOD (modules), AD-WF (workflow), AD-USR, AD-BIZ, AD-FIN, AD-EVT (audit events), AD-SEC, AD-MET (metrics), AD-UX, AD-DEP (dependencies), AD-AC (acceptance criteria), AD-DEC (decisions raised here), AR (risks, Section 18), AQ (open questions), ADC (conflicts), AA (assumptions), ARU (rules of this document).

### 0.11 Revision note (Edition 0.1 to 0.2)
Corrections only. (1) Sections 2.2, 5.1 and 7.3 are expressed as tables and lists; earlier text used triple-backtick code fences that terminated the enclosing code block and lost content. No fenced block remains anywhere in this document. (2) Table cells that contained a literal vertical bar in state transitions (Sections 6.3, 6.6, 6.13) now use words. (3) The acceptance criterion AD-AC-061 trace pointed to a wrong workflow ID and now points to AD-WF-001 step 7 and Section 7.6. (4) The Business publication lifecycle is conditional on the PENDING mandatory-approval decision (ADC-12). (5) Rule IDs of Section 0.10 were renamed from AR-nn to ARU-nn because they collided with the risk IDs AR-nn of Section 18. (6) The audit-integrity acceptance range cited by AD-MOD-10 was corrected to AD-AC-042..045. All other content is unchanged.

### 0.12 Revision note (Edition 0.2 to 0.3)
Reconciled the active authority to Decision Register Revision 6, corrected Mobile Specification internal Edition 2.2 and Backend Functional Specification Edition 0.4-DRAFT. Integrated Business-scoped roles and Deal-specific Finance Manager delegation into actor descriptions without creating Admin Business-role powers. Replaced the obsolete message-content conflict with the no-default-Admin-access rule, retained exceptional review/moderation as PENDING, reconciled versioned delegated financial reporting, and preserved OD-03 Tier 1 review with OD-10 inventory PENDING. No decision, release or implementation status was upgraded.

---

## 1. Executive overview

### 1.1 Purpose
The Web Admin Dashboard is the governance, trust, verification and risk-control client of the Vault Ventures Mobile App (BE-ADM context; MPS Admin is described in v2.1 as "not a CRUD dashboard"). It lets internally provisioned Admin users review, change status and escalate, within strict limits, so that the participant workflows served by the mobile app (notably Tier 1 identity verification) can complete end to end.

### 1.2 Users
Admin users only. Admin accounts are provisioned internally and are never publicly self-registered (APPROVED, OD-03). The provisioning method (OD-09), authentication and session design (OD-11, OD-08, G-03, G-05, DEC-038) and the number of Admin users (UNKNOWN) are PENDING. Participants (Founder, Investor, Skilled Professional) never use the Web Admin.

### 1.3 Responsibilities (SOURCED from BE-ADM-001..017; release per Section 17)
Verification review (R1 REQUIRED); user directory and suspension, Business moderation, dashboard summary, audit-log view (R1 CANDIDATES); deal, application and investment oversight, financial report review and discrepancy handling, reports and disputes, reputation and premium oversight, analytics and settings (later releases, PROPOSED); sensitive-action reason and audit rules, confidential-content limits, Admin authentication and provisioning, and the Admin security documentation duty (R1 REQUIRED).

### 1.3.1 Boundaries
Admin reviews, changes permitted governance statuses and escalates only. Platform Admin is not a Business member, cannot assign itself Business permissions, cannot use a Business Role to obtain Founder authority, and cannot join a Hiring, Team or Deal conversation. Admin never edits participant-reported financial figures, recomputes net profit or loss, alters agreed terms, fabricates evidence, executes or settles an investment, edits Business content, negotiates or confirms for a party, impersonates a user, or edits/deletes audit entries (BE-ADM-012, BE-FIN-010, BE-NEG-004, BE-SEC-013/014, BE-ADM-013, BE-AUD-003).

### 1.4 Relationship with the mobile application
| Aspect | Statement |
|---|---|
| Clients | Two clients share one backend through REST: the mobile app (participants) and the Web Admin (Admin). Admin-only operations are not callable with participant credentials (BE-CLI-001). |
| Data flow | Participants create the state that Admin reviews (for example a verification request with evidence). Admin decisions change server state that the mobile app then displays. |
| Authority | The server decides. Neither client enforces access, stage, tier or state transitions (BE-GEN-001). |
| R1 anchor | The R1 end-to-end workflow is: verification submitted in the mobile app, decided in the Web Admin, resulting status and reason visible in the mobile app (Section 7). |
| Not shared | The Web Admin does not reuse mobile screens, and mobile does not host Admin screens (ADC-01). |

---

## 2. Architecture and integration

### 2.1 Architecture requirements
| ID | Requirement | Label | Trace |
|---|---|---|---|
| AD-ARC-001 | The Web Admin is a separate client from the mobile app. It is a client of the shared backend and holds no business logic that decides access, state or eligibility. | APPROVED (OD-03); no-logic rule PROPOSED | BE-CLI-001, BE-GEN-001 |
| AD-ARC-002 | Backend: Node.js with Express.js. Database: MySQL, fresh, no legacy data. API style: REST. | APPROVED (G-00, OD-07) | BA-01..BA-03, BA-09 |
| AD-ARC-003 | Web Admin frontend technology and specification are PENDING. This document names no framework, library or design system and shall not be read as selecting one. | PENDING (OD-12, BE-DEC-19) | BE-CLI-007 |
| AD-ARC-004 | All Admin operations are authorised server-side on every request: Admin status, target-resource authorisation and, where applicable, disclosure and confidentiality limits. Hiding a control in the client is a convenience, never a security boundary. | SOURCED / PROPOSED | BE-ADM-016 (v2.1 ADM-016), BE-GEN-002 |
| AD-ARC-005 | Admin authentication is separate from participant authentication. Admin-only operations refuse participant credentials and participant-only actions cannot be performed by Admin on behalf of a party. | SOURCED | BE-AUTH-015, BE-AC-036 |
| AD-ARC-006 | All Admin traffic uses HTTPS. No cleartext endpoint. Certificate validation is never disabled. | SOURCED / PROPOSED | BE-SEC-001 |
| AD-ARC-007 | The Web Admin and the backend use one versioned API. The backend can signal a minimum supported client version; the Web Admin tolerates unknown fields and unknown enum values by showing a neutral label. | PROPOSED | BE-GEN-011, BE-CLI-004 |
| AD-ARC-008 | Admin lists, histories and audit views are server-paginated with a bounded maximum page size. | SOURCED | BE-GEN-005 |
| AD-ARC-009 | Secrets, provider keys and signing material are never present in the Web Admin bundle, repository, logs or responses. | SOURCED / PROPOSED | BE-GEN-009 |
| AD-ARC-010 | Each Admin state change and its audit entry are written atomically: both exist or neither does. | PROPOSED | BE-GEN-006, BE-GEN-007 |
| AD-ARC-011 | Hosting of the Web Admin static assets, the Admin origin, CORS allow-list, environments and deployment are undecided. Environments use synthetic data only; production data is never used for testing. | PENDING (OD-06, BE-DEC-09); synthetic-data rule SOURCED | BE-GEN-016, BE-NFR-005 |
| AD-ARC-012 | The Web Admin has no access path to the database and no privileged channel outside the REST API. | PROPOSED | BE-CLI-001 |
| AD-ARC-013 | Nothing from the legacy Laravel platform (code, framework dependency, data, uncommitted payment branch) is reused. Legacy defects (AUD-D01..D13) may inform design as defects not to repeat; for example the "Coming soon" controls defect (AUD-D09) means no unavailable control is shipped. | APPROVED (G-01, OD-07) | BE-GEN-018 |

### 2.2 Logical interaction (descriptive, not a design)
| Step | From | Channel | To | Note |
|---|---|---|---|---|
| 1 | Admin user (desktop browser) | HTTPS | Web Admin client | Admin-only client (OD-03) |
| 2 | Web Admin client | REST over HTTPS | Shared backend (Node.js + Express.js) | Admin credentials only; participant credentials refused |
| 3 | Participant (phone) | HTTPS | Mobile app (React Native + Expo + TypeScript) | Participants only |
| 4 | Mobile app | REST over HTTPS | Shared backend (Node.js + Express.js) | Participant credentials only |
| 5 | Shared backend | Server-side access only | Fresh MySQL database | State, evidence references, audit entries |

The backend, not either client, authorises every request and writes every audit entry. Neither client has any path to the database.

### 2.3 Environment and deployment considerations
| ID | Consideration | Label |
|---|---|---|
| AD-ARC-014 | A non-production backend reachable over HTTPS is needed before any Web Admin integration can be tested. None exists. | PENDING (OD-06) |
| AD-ARC-015 | The Admin origin must be known before a cross-origin allow-list can be defined (Section 12). | PENDING (OD-06, OD-12) |
| AD-ARC-016 | The initial Admin account on a fresh database needs a provisioning route that is not a public endpoint (ADC-10). | PENDING (OD-09) |
| AD-ARC-017 | Web Admin sessions share the session decisions G-03 and G-05 and the browser-authentication conflict OD-08. | PENDING |
| AD-ARC-018 | Backup, recovery, availability and monitoring objectives are UNKNOWN. | UNKNOWN (BE-NFR-003) |

---

## 3. Admin identity and authentication

### 3.1 Requirements
| ID | Requirement | Label | Trace |
|---|---|---|---|
| AD-AUT-001 | No public Admin registration. An attempt to create an Admin account through public registration is refused and creates nothing. | APPROVED (OD-03) | BE-AUTH-001, BE-ADM-016, BE-AC-038 |
| AD-AUT-002 | Admin accounts are provisioned internally. The method (who may create or remove Admin accounts, whether one tier exists, how the first account is created on a fresh database) is undefined. Constraints PROPOSED: provisioning is never reachable through a public operation; it is audit logged; the first-account route is a controlled internal step. | PENDING (OD-09, BE-DEC-16); constraints PROPOSED | BE-ADM-016, ADC-10 |
| AD-AUT-003 | Admin authentication is separate from participant authentication; Admin credentials never grant participant capability and participant credentials never grant Admin capability. | SOURCED | BE-AUTH-015, ARC-006-C3 |
| AD-AUT-004 | Admin login uses credentials and issues a JWT-based session. The JWT family is approved. Token transport, lifetimes, refresh, rotation, revocation and storage are not. | Family APPROVED (G-00); model PENDING (G-03 / DEC-003, G-05 / DEC-053, OD-08, OD-11) | BE-AUTH-008 |
| AD-AUT-005 | Failed Admin login responses are generic and never reveal whether an identifier exists. | SOURCED (AUTH-008, ARC-006-C5) applied to Admin | BE-AUTH-011 |
| AD-AUT-006 | Admin login is rate limited and throttled responses are distinguishable. The threshold is UNKNOWN. | SOURCED requirement; threshold UNKNOWN | BE-GEN-008, BE-SEC-004 |
| AD-AUT-007 | Admin logout invalidates the session server-side and returns the client to the unauthenticated state. Because a JWT is self-contained, a revocation mechanism is required; its design is undecided. | SOURCED requirement; mechanism PENDING | BE-AUTH-009 |
| AD-AUT-008 | Session lifetime, idle behaviour, re-authentication for sensitive actions, remote revocation and multi-device behaviour for Admin are undefined. Until decided the client honours only server-issued expiry and invents no timeout. | PENDING (G-05 / DEC-053, OD-11) | BE-AUTH-010 |
| AD-AUT-009 | Authentication expiry is distinguishable from a transient server failure so the Web Admin does not treat a server error as logout. | SOURCED requirement (legacy defect AUD-D02 not to be repeated) | BE-GEN-004, BE-AC-003 |
| AD-AUT-010 | Password security: passwords are stored only as salted hashes from an adaptive algorithm. Policy values (length, composition) are undefined. A password change requires the current password. | Hashing PROPOSED; policy PENDING (BE-DEC-04) | BE-AUTH-004, BE-AUTH-012 |
| AD-AUT-011 | Admin password recovery path (who may reset, by what channel) is undefined; it depends on the email provider and on provisioning. It must not reveal whether an account exists. | PENDING (OD-04, OD-09) | BE-AUTH-011 |
| AD-AUT-012 | A suspended or disabled Admin account cannot authenticate or use any operation; its sessions are revoked; the refusal is distinguishable. The mechanism that disables an Admin account is undefined (there is no super admin). | Behaviour SOURCED (BE-AUTH-013); mechanism UNKNOWN (AD-DEC-04) | BE-AUTH-013 |
| AD-AUT-013 | Authorisation re-evaluates Admin status, suspension and target-resource rights on every request. Token claims are never the sole authority. | SOURCED / PROPOSED | BE-AUTH-014 |
| AD-AUT-014 | "Elevated authentication" for Admin (MFA, shorter sessions or device policy) is undefined. No option is chosen. | PENDING (DEC-038, OD-11, OD-08, G-05) | BE-ADM-014 |
| AD-AUT-015 | An Admin account does not hold a participant role. | PROPOSED (source dagger-flagged and unlocated) | BE-ROL-004 |
| AD-AUT-016 | Admin authentication events (login success and failure, logout, session revocation, password change or reset, account provisioning and disabling) are audit logged (Section 11). | SOURCED / PROPOSED | BE-AUTH-016, BE-AUD-002 |
| AD-AUT-017 | Admin-specific authorization and security requirements must be documented. Sections 3, 4, 11 and 12 of this document are a DRAFT input to that duty; the duty is not fulfilled until the content is approved. | Duty APPROVED (OD-03); content PENDING | BE-ADM-017, BR-P3-11 |

### 3.2 Pending decisions preserved for this area
| Item | Subject | Status |
|---|---|---|
| OD-08 | JWT versus the P0/P1 prohibition, including browser-based Admin authentication | PENDING |
| OD-09 | Admin account provisioning | PENDING |
| OD-11 | Admin web authentication and session | PENDING |
| G-03 / DEC-003 | JWT token model | PENDING |
| G-05 / DEC-053 | Session lifetime, re-authentication, multi-device | PENDING |
| DEC-038 | Admin "elevated auth" meaning (Revision 6 records MFA / shorter sessions / device policy options; none chosen) | PENDING |
| BE-DEC-04 | Password policy values | PENDING |
| OD-04 | Email and SMS providers (affects recovery and any MFA channel) | PENDING |

---

## 4. Admin roles and permission matrix

### 4.1 Role model
There is one Platform Admin role as sourced (AA-01, ADC-08). It is separate from Business membership and the Finance Manager, Business Manager, Project Manager and restricted Custom Roles. Admin cannot self-assign those roles or their permissions and cannot act through them. No multi-level Admin hierarchy, super admin, staff-tier RBAC, Business-role management console or per-permission role editor is specified or approved (BE-ADM-011; BR-DEC-001..012 PENDING). Permission rows below state what the single Admin role may or may not do; they are not a hierarchy.

### 4.2 Permission matrix
Legend: Y = permitted; R = read-only; C = conditional (server must also check the stated condition); - = not permitted; P = PENDING decision. "Rel" is the proposed release of the Admin capability (Section 17). The Professional column includes only a Skilled Professional acting in the applicable active context. Business-member actions require accepted current membership plus an explicit Business/resource/action grant; Finance Manager Deal actions additionally require a current Deal-specific Founder delegation. They never apply automatically to every Professional.

| ID | Capability | Admin | Founder | Investor | Professional | Rel | Label / note |
|---|---|---|---|---|---|---|---|
| AD-PRM-001 | Read own account and profile | Y (own Admin account) | Y | Y | Y | R1 | SOURCED |
| AD-PRM-002 | Read user directory (all users) | R | - | - | - | R1 CANDIDATE | BE-ADM-002; displayed fields limited (AD-USR-007) |
| AD-PRM-003 | Read another user's profile | C (directory view only; fields PENDING) | C (permitted parts) | C | C | R1 CANDIDATE | Gated sections absent for participants (BE-USR-009) |
| AD-PRM-004 | Read verification request and evidence | C (reviewing Admin) | C (own only) | C (own only) | C (own only) | R1 REQUIRED | BE-VER-003: evidence visible only to owner and reviewing Admin |
| AD-PRM-005 | Approve, reject, or request more information on a verification request | Y with reason | - | - | - | R1 REQUIRED | OD-03, BE-ADM-003, BE-VER-009 |
| AD-PRM-006 | Assign Tier 2 | P | - | - | - | PENDING | Trigger undecided (DEC-028); manual Admin assignment is the sourced MVP position |
| AD-PRM-007 | Suspend or restore a user account | Y with reason | - | - | - | R1 CANDIDATE | BE-ADM-002, BE-ADM-012; reversible, audited |
| AD-PRM-008 | Revoke sessions of a suspended user | Y (effect of suspension) | - | - | - | R1 CANDIDATE | BE-AUTH-013; mechanism PENDING (G-03) |
| AD-PRM-009 | Read published Business (Stage 1) | R | Y (own and others) | Y | Y | R1 | BE-DSC-002 |
| AD-PRM-010 | Read Business in review (submitted state) | C (fields PENDING) | Y (own) | - | - | R1 CANDIDATE | ADC-06, AD-DEC-06 |
| AD-PRM-011 | Read Stage 3 / Stage 4 or NDA-protected content | - (not automatic) | owner | C | C | - | v2.1 ROL-006; ADC-06 |
| AD-PRM-012 | Approve or reject a submitted Business | P | - | - | - | R1 CANDIDATE if mandatory | Mandatory gate undecided (BE-BIZ-004, DEC-031, ADC-12) |
| AD-PRM-013 | Flag a Business; suspend or restore a listing | Y with reason | - | - | - | R1 CANDIDATE | BE-ADM-004; reason visible to the founder (v2.1 ADM-005) |
| AD-PRM-014 | Edit Business content or authorized Business resources | - | Y (own; ownership-sensitive operations retained) | - | C only for explicit Business/resource/action grant; no automatic Business Manager authority | Never for Admin | BE-BIZ-006/014; BE-ADM-004/012; ownership-sensitive delegation PENDING |
| AD-PRM-015 | Read Deals and applications (lifecycle metadata) | R (governance metadata only) | C (own) | C (own) | C only as participant or current Deal-specific delegate | R3 PROPOSED | BE-ADM-005; BE-DLR-004/009; no confidential content by default |
| AD-PRM-016 | Read, search, preview or join private conversation content | - (no default access; exceptional review PENDING) | C (authorized conversations) | C (authorized conversations) | C only under Hiring, Business-membership or Deal-delegation rules | No Admin messaging module approved | BE-MSG-005..020; BE-SEC-013; ADC-07, AD-DEC-03 |
| AD-PRM-017 | Propose/counter terms or give final Agreement confirmation | - | Propose/counter; Founder alone gives final Founder-side confirmation | Propose/counter; Investor independently confirms | Finance Manager draft/counter only under current Deal-specific grant; never final | - | BE-NEG-004/006..009; BE-AGR-001/003/005 |
| AD-PRM-018 | Draft/manage milestones; formally mark complete; confirm | - | Founder retains formal definition and mark-complete authority | C independent counterparty confirmation | C only for granted draft/update/assign/manage actions; no automatic formal certification | - | BE-MIL-001/003; BE-BIZ-016; exact delegation PENDING |
| AD-PRM-019 | Escalate a Deal, application or investment | Y with reason | - | - | - | R3 PROPOSED | Escalation target and effect UNKNOWN (AD-DEC-01) |
| AD-PRM-020 | Read financial reports and evidence | R only in necessary review workspace | Y (own) | C (funded deal) | C only for current explicit Business/report permission and applicable Deal gates | R2 PROPOSED | BE-FIN-012..016, BE-ADM-006 |
| AD-PRM-021 | Set financial verification status; request more evidence | Y with reason | - | - | - | R2 PROPOSED | BE-FIN-004, v2.1 ADM-009 |
| AD-PRM-022 | Prepare/edit/submit participant financial reports or alter submitted figures | - | Founder authority; edits create a version | - | C only for separately granted prepare/edit/submit action; exact submission authority PENDING; edits versioned | Never for Admin | BE-FIN-005/010/013..016; BR-DEC-007 |
| AD-PRM-023 | Flag a financial discrepancy | - | - | C (funded deal) | - | R2 PROPOSED | BE-FIN-008 |
| AD-PRM-024 | Resolve, mark disputed, or leave a discrepancy under review | Y with reason | - | - | - | R2 PROPOSED | BE-FIN-009; vocabulary PENDING (DEC-013) |
| AD-PRM-025 | Read reputation; adjust reputation manually | R; adjust Y with reason | R own | R own | R own | R3 PROPOSED | BE-REP-008 (Should-Have); formula PENDING (DEC-028) |
| AD-PRM-026 | Read premium entitlements; adjust | R; adjust P | R own | R own | R own | R2/R3 PROPOSED | BE-ADM-008, DEC-008 PENDING |
| AD-PRM-027 | Read simulated payment and commission records and revenue | R | R own (as decided) | R own (as decided) | - | R2/R3 PROPOSED | BE-PAY-006; DEC-007 PENDING; read-only |
| AD-PRM-028 | Alter or create payment or commission records | - | - | - | - | Never for Admin | BE-PAY-003, BE-PAY-004 |
| AD-PRM-029 | Read audit logs | R | C ("Viewed by" line on own documents only) | - | - | R1 CANDIDATE | BE-ADM-009, BE-DOC-005 |
| AD-PRM-030 | Edit or delete audit entries | - | - | - | - | Never | BE-AUD-003 |
| AD-PRM-031 | Read notifications addressed to Admin | R | n/a | n/a | n/a | R1 CANDIDATE | BE-NTF-006; inbox only if inventoried |
| AD-PRM-032 | Platform settings, feature flags, simulation-disclaimer text, notification templates | P | - | - | - | R3 PROPOSED | BE-ADM-011; staff-tier RBAC, matching-rule and template administration not in MVP |
| AD-PRM-033 | Read analytics | R | - | - | - | R3 PROPOSED | BE-ADM-010; definitions PENDING |
| AD-PRM-034 | Impersonate a user for support | - | - | - | - | NOT BUILT | BE-ADM-013; DEC-020 PENDING |
| AD-PRM-035 | Create an Admin account | P (provisioning method) | - | - | - | R1 REQUIRED to exist | OD-09; never public |
| AD-PRM-036 | Act as a participant, hold a participant role | - | n/a | n/a | n/a | - | AD-AUT-015 PROPOSED |
| AD-PRM-037 | Read credential hashes, session tokens, secrets | - | - | - | - | Never | BE-GEN-009, BE-SEC-007 |
| AD-PRM-038 | Delete a user account or erase user data | P | - | - | - | PENDING | DEC-026 undecided |

### 4.3 Permission rules
| ID | Rule | Label |
|---|---|---|
| AD-PRM-R01 | Every "Y with reason" action requires a non-empty reason supplied by the Admin and recorded in the audit entry. | SOURCED (BE-ADM-012) |
| AD-PRM-R02 | The client shows or hides controls from server-supplied eligibility and never infers permission from role alone. | PROPOSED (BE-GEN-001) |
| AD-PRM-R03 | Admin never bypasses RBAC, stage-based access or NDA gating for participant content beyond what this matrix states. | SOURCED (BE-ADM-015) |
| AD-PRM-R04 | A row marked "Never" has no operation in any release; a negative test exists for each (Section 16). | PROPOSED |
| AD-PRM-R05 | Any new Admin privilege requires a source or an explicit PROPOSED label and owner approval before build. | PROPOSED |
| AD-PRM-R06 | Platform Admin is never treated as a Business member or participant, cannot grant itself Business permissions, and cannot use Business-role or Deal-delegation data to perform participant actions. | SOURCED (BE-SEC-009/013/014; BE-ROL-012) |
| AD-PRM-R07 | Conversation list, search, preview, unread, notification and existence metadata are confidential outputs. Admin receives none by default; any exceptional review access remains a separately approved, least-privilege and audited policy. | SOURCED default / exception PENDING (BE-MSG-010..017; AD-DEC-03) |

---
## 5. Admin dashboard information architecture

### 5.1 Proposed navigation structure (PROPOSED; labels and arrangement are not approved)
| Nav position | Entry | Module ID | Note |
|---|---|---|---|
| Entry point | Sign-in and session | AD-MOD-00 | Always present; design PENDING |
| 1 | Overview | AD-MOD-01 | Present only if inventoried (OD-10) |
| 2 | User Management | AD-MOD-02 | Present only if inventoried (OD-10) |
| 3 | Verification Queue | AD-MOD-03 | R1 REQUIRED; default landing page in a minimum R1 build |
| 4 | Business Review | AD-MOD-04 | Present only if inventoried (OD-10) |
| 5 | Deal and Application Oversight | AD-MOD-05 | R3 PROPOSED |
| 6 | Financial Reporting and Discrepancies | AD-MOD-06 | R2 PROPOSED |
| 7 | Reputation Oversight | AD-MOD-07 | R3 PROPOSED |
| 8 | Premium and Simulated Payment Oversight | AD-MOD-08 | R2/R3 PROPOSED, split not decided |
| 9 | Notifications | AD-MOD-09 | Present only if inventoried (OD-10) and DEC-009 decided |
| 10 | Audit Logs | AD-MOD-10 | Present only if inventoried (OD-10) |
| 11 | Analytics | AD-MOD-11 | R3 PROPOSED; definitions PENDING |
| 12 | Settings | AD-MOD-12 | R3 PROPOSED / PENDING |
| 13 | Reports and Disputes (Should-Have) | AD-MOD-13 | R3 PROPOSED |
| No entry | Admin impersonation | AD-MOD-14 | NOT BUILT; no navigation entry exists |

### 5.2 Module classification
| Nav | Module ID | Module | Class | Basis |
|---|---|---|---|---|
| - | AD-MOD-00 | Admin sign-in, session and account provisioning | R1 REQUIRED (design PENDING) | BE-ADM-014, BE-ADM-016, BE-AUTH-015; OD-03 requires an Admin client with Admin accounts that cannot self-register |
| 1 | AD-MOD-01 | Overview | R1 CANDIDATE awaiting OD-10 | BE-ADM-001 |
| 2 | AD-MOD-02 | User Management | R1 CANDIDATE awaiting OD-10 | BE-ADM-002 (see ADC-04) |
| 3 | AD-MOD-03 | Verification Queue | R1 REQUIRED by confirmed scope | OD-03, BE-ADM-003, BE-VER-009 |
| 4 | AD-MOD-04 | Business Review | R1 CANDIDATE awaiting OD-10 (approve and reject action only if the mandatory gate is decided) | BE-ADM-004, BE-BIZ-004 |
| 5 | AD-MOD-05 | Deal and Application Oversight | R3 PROPOSED (BR-P7-09 also tagged R2/R3; split not decided) | BE-ADM-005 |
| 6 | AD-MOD-06 | Financial Reporting and Discrepancies | R2 PROPOSED | BE-ADM-006, BE-FIN |
| 7 | AD-MOD-07 | Reputation Oversight | R3 PROPOSED (manual adjustment is Should-Have) | BE-ADM-008, BE-REP-008 |
| 8 | AD-MOD-08 | Premium and Simulated Payment Oversight | R2/R3 PROPOSED, split not decided (ADC-09); PENDING DEC-007, DEC-008 | BE-ADM-008, BE-PAY-006, BE-PRM |
| 9 | AD-MOD-09 | Notifications (Admin inbox) | R1 CANDIDATE awaiting OD-10; PENDING DEC-009 | BE-NTF-006 |
| 10 | AD-MOD-10 | Audit Logs | R1 CANDIDATE awaiting OD-10 | BE-ADM-009 |
| 11 | AD-MOD-11 | Analytics | R3 PROPOSED; definitions PENDING | BE-ADM-010 |
| 12 | AD-MOD-12 | Settings | R3 PROPOSED; PENDING / NOT APPROVED beyond display; staff-tier RBAC, matching-rule and template administration not in MVP | BE-ADM-011 |
| 13 | AD-MOD-13 | Reports and Disputes | R3 PROPOSED (Should-Have) | BE-ADM-007 |
| - | AD-MOD-14 | Admin impersonation-for-support | NOT BUILT (DEC-020 PENDING) | BE-ADM-013 |
| - | AD-MOD-15 | Admin security documentation duty | R1 REQUIRED (documentation) | BE-ADM-017, BE-ADM-015 |

### 5.3 Information architecture rules
| ID | Rule | Label |
|---|---|---|
| AD-IA-001 | Only modules in the approved minimum inventory are present in an R1 build. Candidate modules absent from the approved inventory are absent, not shown disabled or "coming soon". | PROPOSED (legacy defect AUD-D09) |
| AD-IA-002 | Every list view is paginated, searchable and filterable by the fields the source states; no unbounded list exists. | SOURCED (BE-GEN-005) |
| AD-IA-003 | Every entity detail view offers that entity's audit history to authorised Admin where Audit Logs are in the release. | PROPOSED (v2.1 ADM-017 intent) |
| AD-IA-004 | Navigation visibility follows server-supplied eligibility; the server still authorises every request. | PROPOSED |
| AD-IA-005 | The Verification Queue is reachable from the Overview (if built) and directly from the main navigation. In a minimum R1 build with no Overview, it is the default landing page after sign-in. | PROPOSED |
| AD-IA-006 | Release classification is not shown to end users; it governs scope only. | PROPOSED |

---

## 6. Detailed functional module specifications

Each module card states the same fields. "Server-side authorization" always includes the Admin check of AD-ARC-004. Audit event IDs refer to Section 11. Acceptance criteria refer to Section 16. Where a field depends on a PENDING decision, the decision is named.

### 6.0 AD-MOD-00 Admin sign-in, session and account provisioning
| Field | Specification |
|---|---|
| Module ID | AD-MOD-00 |
| Purpose | Let an internally provisioned Admin authenticate, hold a session and sign out; define the boundary between Admin and participant credentials. |
| Source requirement IDs | BE-ADM-014, BE-ADM-016, BE-AUTH-001, 008..010, 013..016, BE-ADM-012, BE-SEC-004; v2.1 ARC-006-C3 |
| Proposed release | R1 REQUIRED (design PENDING) |
| Preconditions | An Admin account exists (provisioning method PENDING, OD-09); the session model is approved (G-03, G-05, OD-08, OD-11); a non-production backend exists (OD-06). |
| Authorized actors | Admin (own session). Account creation actor UNKNOWN (OD-09). |
| Screen or page responsibilities | Sign-in; sign-out; session-expired state; account-disabled state; (if approved) elevated re-authentication prompt; password change. |
| Data displayed | Identifier and credential entry; generic error text; remaining session indication only if the approved model supplies it. |
| Available actions | Sign in; sign out; change own password (current password required). |
| Validation rules | Server-side credential check; generic failure text; throttling per approved threshold (UNKNOWN); password policy PENDING (BE-DEC-04). |
| State transitions | Unauthenticated to authenticated; authenticated to expired, revoked or signed out. A disabled account stays unauthenticated. |
| Server-side authorization | Admin status and not-disabled checked on every request (AD-AUT-013). Participant credentials never accepted. |
| Audit events | AD-EVT-001, 002, 003, 004, 005, 006, 029 |
| Error and empty states | Wrong credentials (generic); throttled; expired session (distinguishable from server error); account disabled; server unavailable (retry state, not logout). |
| Security and privacy | No token in logs or URLs; no credential in browser storage beyond what the approved model requires; storage model PENDING (OD-08). |
| Acceptance criteria | AD-AC-001..010 |
| Blocking decisions | OD-08, OD-09, OD-11, G-03, G-05, DEC-038, BE-DEC-04, OD-04, OD-06 |

### 6.1 AD-MOD-01 Overview
| Field | Specification |
|---|---|
| Module ID | AD-MOD-01 |
| Purpose | Give Admin a summary of work waiting and platform state. |
| Source requirement IDs | BE-ADM-001, BE-DSH-004; v2.1 ADM-002 |
| Proposed release | R1 CANDIDATE awaiting OD-10 |
| Preconditions | Admin authenticated; underlying modules present in the release. |
| Authorized actors | Admin |
| Screen or page responsibilities | Summary counters; preview of the verification queue (oldest first) in R1; later previews of open reports, open discrepancies and recent audit entries only when those modules exist. |
| Data displayed | Only metrics with an established definition (Section 13): pending verification requests; new users in the last 7 days (sourced window). Metrics tied to later modules are absent until those modules are released. |
| Available actions | Navigate to a module or a queue item. No state change from this page. |
| Validation rules | Counters computed on the server; never computed in the client. |
| State transitions | None. |
| Server-side authorization | Admin only; counters never include content a module would not show. |
| Audit events | None for reads (AD-EVT-025 only if audit view is accessed). |
| Error and empty states | Partial data failure shows what loads and marks failed counters unavailable; no false zeros (AD-UX-009). |
| Security and privacy | No participant personal detail beyond counts and the queue preview fields (AD-MOD-03). |
| Acceptance criteria | AD-AC-055, AD-AC-056 |
| Blocking decisions | OD-10; DEC-040 for undefined metrics |

### 6.2 AD-MOD-02 User Management
| Field | Specification |
|---|---|
| Module ID | AD-MOD-02 |
| Purpose | Find users, view limited account information, suspend and restore accounts. |
| Source requirement IDs | BE-ADM-002, BE-AUTH-013, BE-ADM-012, BE-USR-001, BE-VER-008; v2.1 ADM-003, AUTH-010 |
| Proposed release | R1 CANDIDATE awaiting OD-10 (ADC-04) |
| Preconditions | Admin authenticated; users exist. |
| Authorized actors | Admin |
| Screen or page responsibilities | Directory list; search; filters; user detail; suspend and restore dialogs. Full specification in Section 8. |
| Data displayed | Section 8 (AD-USR-007, AD-USR-008). |
| Available actions | Search; filter; view detail; suspend with reason; restore with reason. |
| Validation rules | Reason required for suspend and restore; target must exist; suspending an already suspended account is refused with a conflict. |
| State transitions | Active to suspended and suspended to active; reversible and audited. |
| Server-side authorization | Admin only; cannot target the acting Admin's own account for suspension (PROPOSED); Admin-account management is outside this module (OD-09). |
| Audit events | AD-EVT-012, 013, 004 (session revocation) |
| Error and empty states | No results; target not found; already in requested state; permission denied. |
| Security and privacy | Directory never shows credential hashes, tokens, verification images or financial figures. |
| Acceptance criteria | AD-AC-024..028 |
| Blocking decisions | OD-10, AD-DEC-09, G-03 (revocation), DEC-026 (no deletion), AD-DEC-04 |

### 6.3 AD-MOD-03 Verification Queue
| Field | Specification |
|---|---|
| Module ID | AD-MOD-03 |
| Purpose | Let Admin review Tier 1 identity verification requests and record a decision with a reason. This is the R1 REQUIRED Admin capability named by OD-03. |
| Source requirement IDs | BE-ADM-003, BE-VER-001..005, 008, 009, BE-ADM-012, BE-DOC-005, BE-AUD-002; v2.1 ADM-004, VER-002, AC-023 |
| Proposed release | R1 REQUIRED by confirmed scope |
| Preconditions | Admin authenticated; a verification request exists in status pending; evidence stored in protected storage (OD-05 decided). |
| Authorized actors | Admin |
| Screen or page responsibilities | Queue list (oldest first); request detail with applicant summary and evidence viewer; decision form (approve, reject, request more information) with required reason; decision history of the request. Full workflow in Section 7. |
| Data displayed | Applicant identifier and role(s); tier requested; waiting time; submitted evidence (ID image and selfie or document image) in the viewer; optional applicant notes; prior decisions and reasons on the request; applicant current tier. |
| Available actions | Open request; view evidence; approve with reason; reject with reason; request more information with reason. |
| Validation rules | Reason required for each decision (SOURCED, v2.1 ADM-004 as carried by BE-ADM-003); reason length limits UNKNOWN (AD-DEC-05); decision only on a request in status pending; one decision applies once (BE-GEN-006). |
| State transitions | pending to approved, rejected, or more-information-requested; more-information-requested to pending on applicant resubmission (SOURCED, Backend Spec 6.3). Rejected-resubmission policy UNKNOWN (AD-DEC-02). |
| Server-side authorization | Admin only; evidence retrievable only by the owner and the reviewing Admin (BE-VER-003); participant credentials refused (BE-AC-036). |
| Audit events | AD-EVT-007, 008, 009, 010, 011 |
| Error and empty states | Empty queue ("no requests waiting"); evidence unavailable or corrupt; request already decided (conflict); decision without reason refused; permission denied; server error with no state change. |
| Security and privacy | Evidence never at a public address; viewed through authorised retrieval; not cached by the browser (AD-SEC-011); view events audited; no evidence in logs. |
| Acceptance criteria | AD-AC-011..023 |
| Blocking decisions | OD-10 (inventory approval), OD-05, OD-11, OD-08, G-03, DEC-016, DEC-028 (Tier 2 not via this queue), DEC-009 (notification), AD-DEC-02, AD-DEC-05, AD-DEC-08 |

### 6.4 AD-MOD-04 Business Review
| Field | Specification |
|---|---|
| Module ID | AD-MOD-04 |
| Purpose | Allow Admin to flag a Business and suspend or restore its listing, and, only if approved policy makes pre-publish approval mandatory, approve or reject a submitted Business. |
| Source requirement IDs | BE-ADM-004, BE-BIZ-004, 005, 008, BE-ADM-012; v2.1 ADM-005, BIZ-006 |
| Proposed release | R1 CANDIDATE awaiting OD-10 |
| Preconditions | Business exists in a reviewable state; approval gate decided (for approve and reject only). |
| Authorized actors | Admin |
| Screen or page responsibilities | Business list; Business review view; flag, suspend-listing and restore-listing dialogs; approve and reject only if the gate is approved. Full specification in Section 9. |
| Data displayed | Business Stage 1 teaser content and status; owner identifier; flags and prior actions; any further field only as AD-DEC-06 permits. |
| Available actions | Flag; suspend listing with reason; restore listing with reason; approve or reject with reason (gated on the mandatory-approval decision). |
| Validation rules | Reason required; Admin never edits content; suspension reversible. |
| State transitions | Conditional on the PENDING decision (DEC-031, BE-BIZ-004, ADC-12). Always: Draft to submitted (owner), then published state, with a listing active to suspended and suspended to active toggle by Admin. If Admin approval is decided mandatory: submitted to approved or rejected (Admin, with reason) before Published. If it is decided not mandatory: no Admin approve or reject transition exists. Unpublish or withdraw by the owner is undefined (BE-BIZ-008). |
| Server-side authorization | Admin only; no Admin write to Business content fields. |
| Audit events | AD-EVT-014, 015, 016, 017 (017 only if the gate is mandatory) |
| Error and empty states | None awaiting review; Business withdrawn by owner meanwhile (conflict); permission denied. |
| Security and privacy | No Stage 3/4 documents or NDA-protected content (ADC-06). |
| Acceptance criteria | AD-AC-029..031 |
| Blocking decisions | OD-10, DEC-031, AD-DEC-06 |

### 6.5 AD-MOD-05 Deal and Application Oversight
| Field | Specification |
|---|---|
| Module ID | AD-MOD-05 |
| Purpose | Read-only oversight of Deals, applications and investment records, with Escalate. |
| Source requirement IDs | BE-ADM-005, BE-DLR-004, BE-NEG-004, BE-MIL-005; v2.1 ADM-006, ADM-007, ADM-008, ROL-006 |
| Proposed release | R3 PROPOSED (BR-P7-09 also tagged R2/R3; ADC-09) |
| Preconditions | Deals and applications exist. |
| Authorized actors | Admin (read-only) |
| Screen or page responsibilities | Deal list; Deal lifecycle metadata view and state history; application list; investment record view; Escalate. |
| Data displayed | Participant identities and represented Business/authorized-role metadata needed for governance, Deal state/history, milestone statuses, investment type and amount (simulated), and latest financial verification status. A delegated Finance Manager may be identified as an actor, but their grants are not Admin powers. No document content, conversation identity/content/preview/unread/search result, or NDA-protected content. |
| Available actions | Read permitted governance metadata; Escalate with reason. No write to Deals, negotiation, agreement, milestones, applications, memberships, permissions or delegations. Admin cannot join a conversation. |
| Validation rules | Reason required for Escalate. |
| State transitions | None on Deals. An escalation record is created; its meaning is UNKNOWN (AD-DEC-01). |
| Server-side authorization | Admin only; read-only enforced server-side. |
| Audit events | AD-EVT-018 |
| Error and empty states | None found; Deal not found; permission denied. |
| Security and privacy | Metadata only; "Simulated" label on all amounts. Business/Deal isolation applies, and no Admin request bypasses disclosure, NDA or Business permission boundaries. |
| Acceptance criteria | AD-AC-032, AD-AC-033 |
| Blocking decisions | G-07, AD-DEC-01, DEC-044 (non-completion), DEC-045. AD-DEC-03 does not block metadata-only oversight because private conversation access is excluded. |

### 6.6 AD-MOD-06 Financial Reporting and Discrepancies
| Field | Specification |
|---|---|
| Module ID | AD-MOD-06 |
| Purpose | Review versioned financial reports and evidence, set financial review status, and handle investor-raised discrepancies, without preparing, submitting or altering participant figures. |
| Source requirement IDs | BE-ADM-006, BE-FIN-001..012, BE-AUD-002; v2.1 ADM-009, ADM-010 |
| Proposed release | R2 PROPOSED |
| Preconditions | Deal at Milestone Funding Active; report submitted; file storage decided. |
| Authorized actors | Admin |
| Screen or page responsibilities | Report review workspace; discrepancy list and detail. Full specification in Section 10. |
| Data displayed | Original owner, acting submitter and represented Business/role where delegated, report version, period, revenue, expenses, server-computed net, evidence, current financial verification status, linked discrepancy, prior versions and status-change history. Delegated permission details appear only if necessary for audit/review. All amounts are labelled Simulated. |
| Available actions | Mark status (Evidence Submitted, Under Review, Reviewed by Admin) with reason; request more evidence with reason; resolve, mark disputed, or leave under review a discrepancy, with reason. |
| Validation rules | Reason required; no edit of figures; no typed profit field; allowed statuses only. |
| State transitions | Report: Self-Reported or Evidence Submitted, then Under Review, then Reviewed by Admin; a founder edit creates a new version. Discrepancy: Needs Review, then Resolved, Disputed, or Under Review (vocabulary PENDING, DEC-013). |
| Server-side authorization | Admin only for the review operations listed here; evidence remains confidential and gated like Stage 3/4 documents. Admin review authority is not Business membership and grants no participant edit or submission authority. |
| Audit events | AD-EVT-019, 020, 021, 007 (evidence view) |
| Error and empty states | No reports awaiting review; evidence unavailable; report superseded by a newer version; permission denied. |
| Security and privacy | Confidential; no financial figure in logs; evidence not cached. |
| Acceptance criteria | AD-AC-034..039 |
| Blocking decisions | G-07, G-09 / DEC-006, DEC-012, DEC-013, OD-05 |

### 6.7 AD-MOD-07 Reputation Oversight
| Field | Specification |
|---|---|
| Module ID | AD-MOD-07 |
| Purpose | Read reputation tables and histories; record a logged manual adjustment where approved. |
| Source requirement IDs | BE-ADM-008, BE-REP-001..008; v2.1 ADM-012, REP-008, REP-009 |
| Proposed release | R3 PROPOSED (adjustment and analytics are Should-Have) |
| Preconditions | Reputation exists (R1 module); adjustment policy approved. |
| Authorized actors | Admin |
| Screen or page responsibilities | Reputation table, event history with cause; adjustment form. |
| Data displayed | Qualitative tier, trend, contributing factors, history with causes. |
| Available actions | Read; adjust with reason only if approved. |
| Validation rules | Reason required; formula and weights UNKNOWN, so no adjustment semantics are defined here (DEC-028). |
| State transitions | Reputation event appended. History is immutable. |
| Server-side authorization | Admin only. |
| Audit events | AD-EVT-022 |
| Error and empty states | No reputation yet; permission denied. |
| Security and privacy | Reputation never replaces or alters Financial Verification Status and no financial review outcome changes reputation unless separately approved (BE-REP-005). |
| Acceptance criteria | AD-AC-040 |
| Blocking decisions | DEC-028, DEC-027, G-07 |

### 6.8 AD-MOD-08 Premium and Simulated Payment Oversight
| Field | Specification |
|---|---|
| Module ID | AD-MOD-08 |
| Purpose | Read simulated premium entitlements and simulated commission and payment records; no real money exists. |
| Source requirement IDs | BE-ADM-008, BE-PAY-001..006, BE-PRM-001..003, BE-GEN-013 |
| Proposed release | R2/R3 PROPOSED, split not decided (ADC-09) |
| Preconditions | Premium and payment simulation modules exist (R2). |
| Authorized actors | Admin (read-only); entitlement adjustment only if DEC-008 approves it. |
| Screen or page responsibilities | Entitlement list; simulated revenue and commission records view. |
| Data displayed | Plan and validity (simulated); deal, tranche, amount, rate, status of simulated records, each labelled Simulated. |
| Available actions | Read. Adjust entitlement only if approved, with reason. No action creates or alters a payment or commission record. |
| Validation rules | Reason required for any adjustment. |
| State transitions | None on payment records. |
| Server-side authorization | Admin only. |
| Audit events | AD-EVT-023 (adjustment only) |
| Error and empty states | No records; permission denied. |
| Security and privacy | No payment credentials, card or bank data exist or are displayed. No real processor. |
| Acceptance criteria | AD-AC-039, AD-AC-041 |
| Blocking decisions | DEC-007, DEC-008, G-07 |

### 6.9 AD-MOD-09 Notifications (Admin inbox)
| Field | Specification |
|---|---|
| Module ID | AD-MOD-09 |
| Purpose | Show notifications addressed to Admin, if the approved inventory includes an Admin inbox. |
| Source requirement IDs | BE-NTF-006, BE-NTF-001..003; v2.1 NTF-001-A |
| Proposed release | R1 CANDIDATE awaiting OD-10; event catalogue PENDING |
| Preconditions | Inventory includes it; DEC-009 decides events. |
| Authorized actors | Admin |
| Screen or page responsibilities | Inbox list with read and unread state; detail. |
| Data displayed | Event summary and link to the related module item. Links carry no authority; opening one re-runs authorisation. |
| Available actions | Read; mark read. |
| Validation rules | Only events decided by DEC-009 appear. |
| State transitions | unread to read. |
| Server-side authorization | Admin only; the recipient is the acting Admin. |
| Audit events | None required for read state (PROPOSED). |
| Error and empty states | Empty inbox; permission denied. |
| Security and privacy | No confidential participant content in a notification summary. |
| Acceptance criteria | AD-AC-061 |
| Blocking decisions | OD-10, DEC-009, DEP-013 (v2.1 Admin inbox not previously implemented) |

### 6.10 AD-MOD-10 Audit Logs
| Field | Specification |
|---|---|
| Module ID | AD-MOD-10 |
| Purpose | Let authorised Admin read the append-only audit record. |
| Source requirement IDs | BE-ADM-009, BE-AUD-001..003, BE-GEN-007; v2.1 ADM-013 |
| Proposed release | R1 CANDIDATE awaiting OD-10 |
| Preconditions | Audit foundation exists (BR-P2-12). |
| Authorized actors | Admin (read-only) |
| Screen or page responsibilities | Searchable, filterable, paginated list; entry detail. Full specification in Section 11. |
| Data displayed | Actor, active role, action, target, timestamp, result, reason where applicable, before and after summary where applicable. Never secrets, tokens or document contents. |
| Available actions | Search; filter; read. No edit, delete or redaction action exists. |
| Validation rules | Bounded page size; bounded date range per query is UNKNOWN. |
| State transitions | None. Entries are append-only. |
| Server-side authorization | Admin only. |
| Audit events | AD-EVT-025 (audit viewed; PROPOSED) |
| Error and empty states | No matching entries; permission denied. |
| Security and privacy | Redaction of sensitive values at write time; retention PENDING (BE-DEC-14). |
| Acceptance criteria | AD-AC-042..045 |
| Blocking decisions | OD-10, BE-DEC-14, AD-DEC-07 |

### 6.11 AD-MOD-11 Analytics
| Field | Specification |
|---|---|
| Module ID | AD-MOD-11 |
| Purpose | Aggregate descriptive analytics only. No forecasting model exists or is required. |
| Source requirement IDs | BE-ADM-010; v2.1 ADM-014 |
| Proposed release | R3 PROPOSED; definitions PENDING |
| Preconditions | Metric definitions approved (Section 13). |
| Authorized actors | Admin |
| Screen or page responsibilities | Date-range control; per-metric views; export where approved. |
| Data displayed | Only metrics defined in Section 13 once approved. |
| Available actions | Read; export only if approved. |
| Validation rules | Date range validation; bounded result size. |
| State transitions | None. |
| Server-side authorization | Admin only. |
| Audit events | AD-EVT-028 (export, if built) |
| Error and empty states | No data in range; metric undefined (not displayed). |
| Security and privacy | Exports neutralise spreadsheet formula injection (AD-SEC-014); no participant personal detail. |
| Acceptance criteria | AD-AC-055 |
| Blocking decisions | G-07, DEC-040, DEC-015, DEC-007, AD-DEC-07 |

### 6.12 AD-MOD-12 Settings
| Field | Specification |
|---|---|
| Module ID | AD-MOD-12 |
| Purpose | Platform feature flags and simulation-disclaimer text; display of matching weights; notification templates; Admin team and roles. |
| Source requirement IDs | BE-ADM-011, BE-ADM-013; v2.1 ADM-015, ADM-016 |
| Proposed release | R3 PROPOSED. PENDING / NOT APPROVED beyond read-only display: staff-tier RBAC, staff-role assignment, matching-rule administration and notification-template administration are not in the MVP. |
| Preconditions | Scope decision; consumer features exist. |
| Authorized actors | Admin |
| Screen or page responsibilities | Read-only display of approved settings. No control for an unapproved capability is shown. |
| Data displayed | Approved settings only. |
| Available actions | None approved. |
| Validation rules | Not applicable until scoped. |
| State transitions | Not applicable. |
| Server-side authorization | Admin only. |
| Audit events | AD-EVT-024 (if any setting becomes editable) |
| Error and empty states | Not applicable. |
| Security and privacy | Editing live scoring weights, if ever allowed, requires a live-scoring warning (v2.1 ADM-015); not approved. |
| Acceptance criteria | AD-AC-060 |
| Blocking decisions | G-07, DEC-015, DEC-038, ADC-08 (admin grades) |

### 6.13 AD-MOD-13 Reports and Disputes
| Field | Specification |
|---|---|
| Module ID | AD-MOD-13 |
| Purpose | Minimal generic reports and disputes handling (Should-Have). |
| Source requirement IDs | BE-ADM-007, BE-MIL-005; v2.1 ADM-011 |
| Proposed release | R3 PROPOSED |
| Preconditions | A reports feature exists. |
| Authorized actors | Admin |
| Screen or page responsibilities | List by category, severity and status; detail; investigate, resolve, escalate. |
| Data displayed | Category, severity, status (open, investigating, resolved, escalated), resolver, reason. |
| Available actions | Investigate; resolve; escalate, each with reason. |
| Validation rules | Reason required. |
| State transitions | open to investigating; investigating to resolved or escalated. |
| Server-side authorization | Admin only. |
| Audit events | AD-EVT-018 (escalation); resolution events PROPOSED |
| Error and empty states | No open reports. |
| Security and privacy | Milestone dispute handling beyond a status flag is not approved (DEC-014 option C is not approved by OD-03). |
| Acceptance criteria | AD-AC-033 |
| Blocking decisions | DEC-014, G-07, DEC-018 |

### 6.14 AD-MOD-14 Admin impersonation-for-support
| Field | Specification |
|---|---|
| Module ID | AD-MOD-14 |
| Purpose | Recorded only to prevent accidental inclusion. |
| Source requirement IDs | BE-ADM-013; v2.1 CONF-22 |
| Proposed release | NOT BUILT |
| Preconditions | Not applicable. |
| Authorized actors | None. |
| Screen or page responsibilities | None. |
| Data displayed | None. |
| Available actions | None. No operation lets an Admin act as, or sign in as, a participant. |
| Validation rules | Not applicable. |
| State transitions | Not applicable. |
| Server-side authorization | Any such attempt is refused (BE-AC-036). |
| Audit events | AD-EVT-026 (denied attempt) |
| Error and empty states | Not applicable. |
| Security and privacy | Not built unless separately approved with audit design. |
| Acceptance criteria | AD-AC-059 |
| Blocking decisions | DEC-020 (PENDING; Revision 6 keeps it deferred/unapproved) |

---
## 7. R1 minimum Admin workflow: Tier 1 verification (AD-WF-001)

### 7.1 Scope and status
This workflow is R1 REQUIRED by confirmed scope: OD-03 (APPROVED) requires minimum Admin functionality in R1 including Tier 1 verification review, and the Roadmap marks BE-ADM-003 REQUIRED. The rest of the inventory (OD-10) is PENDING. The workflow has not been built or tested. No step approves a request automatically.

### 7.2 End-to-end steps
| Step | Actor | Behaviour | State after | Requirements | Audit event | Acceptance |
|---|---|---|---|---|---|---|
| 1 | Participant (mobile app) | Submits a Tier 1 request with ID and selfie or document evidence and optional notes. Allowed file types and sizes are validated by the server (limits UNKNOWN, BE-DEC-05). | Request created, status pending | BE-VER-002, BE-DOC-001, 008 | AD-EVT-030 (submission recorded; PROPOSED) | AD-AC-011 |
| 2 | Backend | Validates the request, authorises the participant, stores evidence in protected storage (OD-05) with no public address, creates one request record, writes no partial record on failure. One open request per user and level. | pending | BE-VER-003, BE-DOC-004, 008, BE-GEN-006 | AD-EVT-030 | AD-AC-018 |
| 3 | Backend and Web Admin | The request appears in the queue, oldest first, paginated. Counter on Overview if built. | pending | BE-ADM-003, BE-ADM-001 | none | AD-AC-011 |
| 4 | Admin | Opens the request; the server authorises the Admin and serves evidence through authorised retrieval; each evidence view is recorded. | pending | BE-VER-003, BE-ADM-012 | AD-EVT-007 | AD-AC-018, 019 |
| 5 | Admin | Chooses approve, reject, or request more information and enters a reason; a confirmation step states the consequence before submission. | pending until submitted | BE-ADM-003, BE-ADM-012 | none until submitted | AD-AC-012..015, 053 |
| 6 | Backend | Applies the decision once, atomically with the audit entry. Approve sets Tier 1. Reject keeps Tier 0. Request more information sets more-information-requested. The reason is stored and returned to the applicant. | approved, rejected or more-information-requested | BE-VER-001, 002, 008, 009, BE-GEN-006, BE-GEN-007 | AD-EVT-008, 009 or 010; AD-EVT-011 on tier change | AD-AC-012..014, 016, 020 |
| 7 | Participant (mobile app) | Reads the updated verification status and the Admin reason. A push or in-app notification is sent only if the approved event catalogue includes it. | as step 6 | BE-VER-002, BE-NTF-002 | none | AD-AC-021, 061 |

### 7.3 State model and transition table
| From state | Trigger and actor | Required input | To state | Side effects and notes |
|---|---|---|---|---|
| (none) | Participant submits request | Evidence, optional notes | pending | One open request per user and level; AD-EVT-030 |
| pending | Admin approves | Non-empty reason | approved | Tier 1 set; AD-EVT-008 and AD-EVT-011 |
| pending | Admin rejects | Non-empty reason | rejected | Tier stays 0; AD-EVT-009 |
| pending | Admin requests more information | Non-empty reason | more-information-requested | AD-EVT-010 |
| more-information-requested | Applicant resubmits | Updated evidence or notes | pending | SOURCED (Backend Spec 6.3) |
| rejected | Applicant makes a new request | Not defined | UNKNOWN | Resubmission policy PENDING (AD-DEC-02) |

No other transition exists. No transition occurs without an Admin decision except the applicant's resubmission. Tier 2 is not reachable through this workflow (AD-PRM-006). Terminal behaviour of approved and rejected requests (for example re-verification or expiry) is not defined by any source and is not specified here.

### 7.4 Permissions and handling rules
| ID | Rule | Label |
|---|---|---|
| AD-WF-002 | Only an authenticated Admin may decide. Participant credentials are refused. Admin cannot hold a participant role, so no self-review exists. | SOURCED / PROPOSED |
| AD-WF-003 | A reason is required for approve, reject and request more information. Length limits and allowed content are UNKNOWN. A decision without a reason is refused and changes nothing. | SOURCED (BE-ADM-003 via v2.1 ADM-004); limits UNKNOWN (AD-DEC-05) |
| AD-WF-004 | The reason is shown to the applicant. Admin must therefore be told, at entry, that the text is applicant-visible. Internal-only notes are not specified. | SOURCED (BE-VER-002); warning PROPOSED |
| AD-WF-005 | Evidence is visible only to the owner and the reviewing Admin, has no public address, and is not shown in any list view, thumbnail, notification, log or export. | SOURCED (BE-VER-003, v2.1 FIN-009 analogue) |
| AD-WF-006 | Two Admin users reviewing the same request: the first valid decision applies; the second receives a conflict and no state change. No claim or assignment feature is sourced and none is added. | PROPOSED (BE-GEN-006) |
| AD-WF-007 | No automatic approval, no timeout approval, no scoring-based approval and no AI-assisted approval exists. A request stays pending until an Admin decides. | SOURCED (owner rule; BE-VER-001 "manual Admin review"); AI excluded (BE-AI-009) |
| AD-WF-008 | If the applicant account becomes suspended while a request is pending, the request remains visible to Admin and is marked accordingly; whether a decision is allowed on a suspended applicant is UNKNOWN. | UNKNOWN (AD-DEC-02) |
| AD-WF-009 | Copy never states or implies legal KYC/AML or certification. | SOURCED (BE-VER-004) |
| AD-WF-010 | Identity verification status is never combined with financial verification status. | SOURCED (BE-VER-005) |
| AD-WF-011 | Approval at Tier 1 enables the Tier gates that depend on it (Stage 3 and NDA require Tier 1 or higher; Tier 0 may express interest). Tier 0 receives the verification-upgrade path when blocked. | SOURCED (BE-VER-007, BE-AC-016); DEC-016 PENDING |
| AD-WF-012 | Admin never edits the applicant's evidence, profile or tier directly outside a decision. | SOURCED (BE-ADM-012) |

### 7.5 Edge cases
| ID | Case | Specified behaviour |
|---|---|---|
| AD-WF-013 | Evidence missing, unreadable or removed | The request shows an evidence-unavailable state; the only allowed decisions are request more information, or reject with reason; approval is refused. PROPOSED. |
| AD-WF-014 | Upload failed during submission | No partial request exists (BE-DOC-008); nothing appears in the queue. |
| AD-WF-015 | Applicant submits a second request while one is open | Refused (one open request per user and level, BE-GEN-006). |
| AD-WF-016 | Decision submitted but response lost | A retried identical decision returns the existing outcome without a second audit entry or state change (BE-GEN-006). PROPOSED. |
| AD-WF-017 | Admin session expires mid-decision | The decision is refused with an expiry response distinguishable from a server error; no state change; the entered text is not stored server-side. |
| AD-WF-018 | Backend unavailable | Retry state; no assumption of success. |

### 7.6 Notifications (conditional)
The mobile status read is required. An in-app notification, and push in R2, are used only if DEC-009 includes a verification-decision event (ADC-05). Notification content never includes the reason text or evidence detail on lock screens (BE-NTF-004 generic payload rule). The R1 workflow does not depend on push, which is R2.

---

## 8. User management

### 8.1 Confirmed requirements versus R1 candidate functionality
| ID | Capability | Class | Source |
|---|---|---|---|
| AD-USR-001 | Paginated user directory with search and filter by role, tier and status | R1 CANDIDATE awaiting OD-10 (the capability is SOURCED, its R1 inclusion is not approved) | BE-ADM-002; v2.1 ADM-003 |
| AD-USR-002 | Read-only user detail view | R1 CANDIDATE | BE-ADM-002 |
| AD-USR-003 | Suspend and restore, reversible, audited, with reason | R1 CANDIDATE (ADC-04: needed by BE-AUTH-013 behaviour) | BE-ADM-002, BE-ADM-012, BE-AUTH-013 |
| AD-USR-004 | Data displayed in the directory and detail (see 8.2) | PROPOSED minimum | BE-GEN-017, privacy rules |
| AD-USR-005 | Session revocation on suspension | R1 CANDIDATE; mechanism PENDING | BE-AUTH-009, BE-AUTH-013, G-03 |
| AD-USR-006 | Impersonation, password reset by Admin, profile editing, role changes, deletion | NOT BUILT or PENDING | DEC-020, DEC-026, BE-USR-003 |

### 8.2 Behaviour
| ID | Requirement | Label |
|---|---|---|
| AD-USR-007 | Directory columns (PROPOSED minimum): internal user identifier, display name, participant role(s), verification tier, account status, creation date. No credential hash, token, evidence image, financial figure, message or Business confidential content. | PROPOSED |
| AD-USR-008 | User detail (PROPOSED): the directory fields plus email-verified and phone-verified indicators, enrolled roles, current and past verification request statuses with Admin reasons, and an audit history of Admin actions on this user where Audit Logs exist. | PROPOSED |
| AD-USR-009 | Search is deterministic and case-insensitive over the permitted fields; an empty query returns the paginated full set; the maximum page size is bounded. Which fields are searchable is UNKNOWN. | SOURCED (analogue of BE-DSC-003); fields UNKNOWN |
| AD-USR-010 | Filters: role, tier, status. | SOURCED (v2.1 ADM-003) |
| AD-USR-011 | Suspend: reason required; target must be active; effect is that the account cannot authenticate or use protected operations and its sessions are revoked; the refusal is distinguishable to the user. Whether and how the suspension reason is shown to the user follows the server response and is not defined. | SOURCED (BE-AUTH-013); reason visibility UNKNOWN |
| AD-USR-012 | Restore: reason required; target must be suspended; the user may authenticate again; sessions revoked at suspension are not reinstated; the user signs in again. | PROPOSED |
| AD-USR-013 | An Admin cannot suspend or restore their own account through this module; Admin accounts are outside the module. | PROPOSED (OD-09) |
| AD-USR-014 | Suspension does not delete, anonymise or alter user data. Deletion policy is PENDING. | SOURCED (DEC-026 PENDING) |
| AD-USR-015 | Suspension does not alter a user's Deals, Businesses or verification state automatically. Effects on owned data (for example listing visibility, pending interests) are UNKNOWN. | UNKNOWN (AD-DEC-09) |
| AD-USR-016 | Privacy restriction: Admin sees only what this section lists; viewing a participant's confidential Business or Deal content is not part of User Management. | SOURCED (BE-ADM-015) |

---

## 9. Business and deal oversight

### 9.1 Business review (AD-BIZ)
| ID | Requirement | Label |
|---|---|---|
| AD-BIZ-001 | Business lifecycle, conditional on the PENDING mandatory-approval decision (ADC-12). Always: the owner creates a Draft and submits it; Admin sees Businesses only from the submitted state onward (drafts are visible only to their owner). If Admin approval is decided mandatory: submitted, then approved or rejected by Admin with reason, then Published. If Admin approval is decided not mandatory: no Admin approve or reject step exists and the path from submitted to Published follows the publish-readiness validation only (BE-BIZ-005). No path is assumed until the decision is recorded. | SOURCED steps (BE-BIZ-004, observed in legacy only); mandatory gate PENDING (DEC-031, OD-10); Admin draft invisibility PROPOSED |
| AD-BIZ-002 | Whether Admin approval is a mandatory pre-publish gate is not stated by any source. If it is not mandatory, the approve and reject action does not exist in R1. If it is mandatory, it becomes an R1 CANDIDATE action with a required reason. The decision is not made here. | PENDING (BE-BIZ-004, DEC-031, OD-10) |
| AD-BIZ-003 | Admin may flag a Business and suspend or restore its listing. The action is explicit, reversible and audited, requires a reason, and the reason is visible to the founder. | SOURCED (v2.1 ADM-005 via BE-ADM-004) |
| AD-BIZ-004 | Admin never edits Business content, assigns itself or others Business permissions, changes Business-role membership/delegation, or manipulates discovery ranking silently. A Business member may edit only an explicitly granted Business/resource/action under Backend Specification 0.4; that delegation creates no Admin capability. | SOURCED (BE-ADM-004/012, BE-BIZ-006/014, BE-SEC-009/013) |
| AD-BIZ-005 | Unpublish or withdraw by the owner is undefined and not specified. | PENDING (DEC-031, BE-BIZ-008) |
| AD-BIZ-006 | Which Business fields and documents an Admin may read in review is undefined. Default (PROPOSED): Stage 1 teaser content and status only; no Stage 3 or Stage 4 documents, no NDA-protected content. | PENDING (AD-DEC-06, ADC-06) |
| AD-BIZ-007 | A suspended listing is excluded from discovery and not deleted. The founder is told the reason. | PROPOSED |

### 9.2 Deal and application oversight (AD-BIZ-008 onward)
| ID | Requirement | Label |
|---|---|---|
| AD-BIZ-008 | Admin has read-only access only to the Deal lifecycle metadata and state history necessary for approved governance, application lists and investment records, plus Escalate. Admin does not inherit confidential access from the Founder, Investor or a delegated Business member. | SOURCED (BE-ADM-005, BE-DLR-004, BE-SEC-013); release R3 PROPOSED |
| AD-BIZ-009 | Admin does not participate in negotiations, propose/counter terms, approve or finalize a Deal, or confirm an Agreement for either party. A Finance Manager may draft/counter only under an active Deal-specific Founder delegation; only the Founder gives final Founder-side confirmation and the Investor independently confirms. | SOURCED (BE-NEG-004/006..009, BE-AGR-001/003/005) |
| AD-BIZ-010 | Admin does not define, mark or confirm milestones and does not change a Deal state. | SOURCED (BE-MIL, BE-DLR-003) |
| AD-BIZ-011 | Admin has no default access to Hiring, Team or Deal conversation identity, content, history, search results, previews, unread counts or notifications and cannot join as a participant. Chat never accepts an NDA, changes Deal state, grants permission or confirms an Agreement. A narrowly defined exceptional review/moderation policy, if any, remains PENDING and shall not be built or allocated to a release until approved. | SOURCED default (BE-MSG-010..020, BE-SEC-013/014); exception PENDING (AD-DEC-03, MSG-DEC-006/007/011/012) |
| AD-BIZ-012 | Admin does not read documents inside a Deal beyond what AD-BIZ-006 allows. | SOURCED (v2.1 ROL-006) |
| AD-BIZ-013 | Escalate records a reason-bearing escalation against the object. What an escalation does, who receives it, whether it has a lifecycle and whether the participants see it is UNKNOWN. No escalation workflow is specified beyond creating the record. | UNKNOWN (AD-DEC-01) |
| AD-BIZ-014 | Non-completion of a Deal, cancelled or abandoned deals, and Professional-deal funding are undefined; oversight views display whatever the server returns and infer nothing. | PENDING (DEC-044, DEC-045) |

---

## 10. Financial and simulation oversight

All content in this section is R2 or later (Section 17), is PROPOSED where not SOURCED, and is subject to G-07. Everything is simulated. None of it is an R1 prerequisite (RR-09).

### 10.1 Financial reports and discrepancies (AD-FIN)
| ID | Requirement | Label |
|---|---|---|
| AD-FIN-001 | The review workspace shows: original owner, acting submitter and represented Business/role where delegated, report version, reported summary (period, revenue, expenses, optional cash, notes), server-computed net, evidence, current Financial Verification Status, linked discrepancy, prior versions and a status-change mini-log. | SOURCED (BE-ADM-006, BE-FIN-012..016) |
| AD-FIN-002 | Admin actions: review; mark Evidence Submitted; mark Under Review; mark Reviewed by Admin; request more evidence. Each requires a reason that is logged. | SOURCED (BE-FIN-004, v2.1 ADM-009) |
| AD-FIN-003 | Initial status on submission is Self-Reported (no evidence) or Evidence Submitted, never higher. Only Admin advances to Under Review or Reviewed by Admin, except an investor discrepancy flag that moves a report to Under Review. | SOURCED (BE-FIN-004, BE-FIN-008) |
| AD-FIN-004 | The label for the highest status is "Reviewed by Admin". The words Verified, Certified and Audited are never used for it. Self-Reported is never presented or implied as reviewed. | SOURCED (BE-FIN-004, BE-GEN-014) |
| AD-FIN-005 | Admin never prepares, submits or edits revenue, expenses, cash or notes, never recomputes net, never types a profit figure and never attaches evidence for a participant. Reports are immutable by version. The Founder owns the reporting authority; a Business member may prepare/edit a draft or submit only under the separate explicit report action, with exact submission/attestation authority still PENDING. Every delegated version records actor, represented Business and permission context. | SOURCED (BE-FIN-005/010/013..016; BR-DEC-007/011) |
| AD-FIN-006 | Evidence follows the same stage and NDA gating, storage protection and audit as Stage 3 and Stage 4 documents, opens only in the review viewer, and is never shown as a generic thumbnail. | SOURCED (BE-FIN-006, v2.1 FIN-009) |
| AD-FIN-007 | Discrepancy handling: Admin may investigate, and set Resolved, Disputed, or leave Under Review, with a logged reason. No penalties. The vocabulary (three values per MPS and ILS, four per the UX document) and the full set of outcomes are undefined. | SOURCED (BE-FIN-009); vocabulary PENDING (DEC-013, CONF-12) |
| AD-FIN-008 | A discrepancy is a separate Must-Have flow from generic reports and disputes; its priority is higher. | SOURCED (v2.1 ADM-010) |
| AD-FIN-009 | The review workspace never states or implies that reporting is fraud-proof or fully verified. | SOURCED (BE-FIN-011) |
| AD-FIN-010 | Reporting cadence and handling of late or missing reports are undefined; Admin has no reminder or penalty action. | PENDING (DEC-012) |
| AD-FIN-011 | Every amount shown carries the persistent Simulated indicator. | SOURCED (BE-GEN-013) |

### 10.2 Reputation implications
| ID | Requirement | Label |
|---|---|---|
| AD-FIN-012 | A financial review outcome does not change reputation, and reputation does not replace or alter Financial Verification Status. Any link between them requires separate approval. | SOURCED (BE-REP-005); link not approved |
| AD-FIN-013 | Manual reputation adjustment by Admin is a Should-Have, requires a logged reason, and has no defined formula. | SOURCED (BE-REP-008); formula PENDING (DEC-028) |

### 10.3 Premium entitlements and simulated payments
| ID | Requirement | Label |
|---|---|---|
| AD-FIN-014 | Admin may read simulated premium entitlements. Adjusting them is permitted only if DEC-008 approves it, with a logged reason. Whether premium is real scope, its pricing and its plan structure are undefined. | SOURCED (v2.1 ADM-012); PENDING (DEC-008) |
| AD-FIN-015 | Admin may read simulated commission and payment records and simulated platform revenue, each labelled Simulated. Admin cannot create, edit, reverse or settle any record. | SOURCED (BE-PAY-006); read-only PROPOSED |
| AD-FIN-016 | The commission rate (3 to 5 percent range), payer, trigger, rounding and display are undefined. No figure is shown as a default. | PENDING (DEC-007, BE-PAY-001) |
| AD-FIN-017 | No real payment, escrow, custody, payment processor integration, card, bank or wallet credential, or payout exists anywhere in the Web Admin. | SOURCED (BE-PAY-005, BE-GEN-013) |
| AD-FIN-018 | The uncommitted legacy payment branch is not a dependency. | APPROVED (G-01) |

---

## 11. Audit logging and accountability

### 11.1 Requirements
| ID | Requirement | Label | Trace |
|---|---|---|---|
| AD-AUD-001 | Each audit entry records actor, active role, action, target, timestamp, result, reason where applicable, and a before and after summary where applicable. | PROPOSED | BE-AUD-001 |
| AD-AUD-002 | Audit records are append-only. No operation of any client edits or deletes an entry. | SOURCED | BE-GEN-007, BE-AUD-003 |
| AD-AUD-003 | An Admin state change and its audit entry are written atomically. If the audit entry cannot be written, the state change does not occur. | PROPOSED | BE-GEN-006, BE-GEN-007 |
| AD-AUD-004 | Every Admin write action writes an audit entry. If a later approved governance view exposes Business membership, role, permission, delegation or delegated-report metadata, the Admin view is read-only and its sensitive access is auditable; no management action is implied. | SOURCED (BE-ADM-012, BE-AUD-004..007) | BE-ADM-012 |
| AD-AUD-005 | A reason is mandatory wherever Section 4.3 (AD-PRM-R01) applies, and is stored in the entry. | SOURCED | BE-ADM-012 |
| AD-AUD-006 | Audit entries never contain secrets, tokens, passwords, document contents, ID images or financial figures. Redaction happens at write time. | SOURCED / PROPOSED | BE-SEC-007, v2.1 ADM-013 |
| AD-AUD-007 | Audit view access is restricted to Admin. Sensitive entries (authentication, evidence views, provisioning) have no wider audience. A finer restriction between Admin users is not specified (no hierarchy). | PROPOSED | AA-01 |
| AD-AUD-008 | Viewing the audit log is itself recorded. | PROPOSED | AD-EVT-025 |
| AD-AUD-009 | Audit views are paginated with a bounded page size, searchable by actor, action, target and date. Date-range bound is UNKNOWN. | SOURCED / UNKNOWN | BE-ADM-009, BE-GEN-005 |
| AD-AUD-010 | Audit retention, archival and any export are undefined. | PENDING (BE-DEC-14, AD-DEC-07) | BE-AUD-003 |
| AD-AUD-011 | Time values are stored and returned in an unambiguous form (UTC, ISO 8601); the Web Admin presents them in a clearly labelled time zone. The presentation time zone is UNKNOWN. | SOURCED (BE-GEN-010); presentation UNKNOWN | BE-GEN-010 |
| AD-AUD-012 | Denied Admin operations (participant credentials on an Admin operation, Admin on a forbidden action) are recorded. | PROPOSED | AD-EVT-026 |

### 11.2 Audit event catalogue
Release follows the owning module. "SOURCED event class" means the class is listed in BE-AUD-002; individual event names are PROPOSED labels, not schema.

| ID | Event | Trigger | Mandatory content beyond AD-AUD-001 | Release | Label |
|---|---|---|---|---|---|
| AD-EVT-001 | Admin login success | Successful Admin authentication | Origin summary (not secrets) | R1 | SOURCED class (authentication events) |
| AD-EVT-002 | Admin login failure | Failed Admin authentication | Generic reason code | R1 | SOURCED class |
| AD-EVT-003 | Admin logout | Logout | - | R1 | SOURCED class |
| AD-EVT-004 | Session revoked | Revocation by suspension, password change or policy | Cause | R1 | PROPOSED |
| AD-EVT-005 | Admin account provisioned | Provisioning (method PENDING) | Provisioning actor | R1 | PROPOSED |
| AD-EVT-006 | Admin account disabled | Disablement (mechanism UNKNOWN) | Reason | R1 | PROPOSED |
| AD-EVT-007 | Evidence viewed by Admin | Admin retrieves verification or financial evidence | Request or report reference, not content | R1 (verification), R2 (financial) | SOURCED class (sensitive document access) |
| AD-EVT-008 | Verification approved | Admin approves | Reason, before and after tier | R1 | SOURCED class (verification decisions) |
| AD-EVT-009 | Verification rejected | Admin rejects | Reason | R1 | SOURCED class |
| AD-EVT-010 | More information requested | Admin requests information | Reason | R1 | SOURCED class |
| AD-EVT-011 | Tier changed | Tier 1 set by approval | Before and after tier | R1 | SOURCED (BE-VER-008) |
| AD-EVT-012 | User suspended | Admin suspends | Reason | R1 CANDIDATE | SOURCED class (suspension) |
| AD-EVT-013 | User restored | Admin restores | Reason | R1 CANDIDATE | SOURCED class |
| AD-EVT-014 | Business flagged | Admin flags | Reason | R1 CANDIDATE | PROPOSED |
| AD-EVT-015 | Listing suspended | Admin suspends listing | Reason | R1 CANDIDATE | SOURCED (v2.1 ADM-005) |
| AD-EVT-016 | Listing restored | Admin restores listing | Reason | R1 CANDIDATE | PROPOSED |
| AD-EVT-017 | Business approved or rejected | Gate decided mandatory | Reason | R1 CANDIDATE if gate approved | PROPOSED |
| AD-EVT-018 | Escalation created | Admin escalates | Reason, object reference | R3 | SOURCED class (Escalate) |
| AD-EVT-019 | Financial report status changed by Admin | Admin sets status | Reason, before and after status | R2 | SOURCED class (financial report changes) |
| AD-EVT-020 | Discrepancy outcome | Admin resolves, disputes or leaves under review | Reason | R2 | SOURCED class (discrepancy resolutions) |
| AD-EVT-021 | More evidence requested | Admin requests evidence | Reason | R2 | PROPOSED |
| AD-EVT-022 | Reputation adjusted | Admin adjustment (if approved) | Reason, before and after summary | R3 | SOURCED (BE-REP-008) |
| AD-EVT-023 | Premium entitlement adjusted | Admin adjustment (if approved) | Reason | R2/R3 | PROPOSED |
| AD-EVT-024 | Setting changed | Settings edit (if ever approved) | Before and after | R3 | PROPOSED |
| AD-EVT-025 | Audit log viewed | Admin opens audit view | Filter summary | R1 CANDIDATE | PROPOSED |
| AD-EVT-026 | Admin operation denied | Authorisation failure | Operation class, credential class | R1 | PROPOSED |
| AD-EVT-028 | Analytics export | Export (if built) | Metric and range | R3 | PROPOSED |
| AD-EVT-029 | Admin password changed or reset | Password operation | - | R1 | SOURCED class (authentication events) |
| AD-EVT-030 | Verification request submitted | Participant submits | Request reference | R1 | PROPOSED |

(ID AD-EVT-027 is intentionally unassigned.)

---
## 12. Security and privacy

Requirements that depend on the session model are conditional on the model finally approved under G-03, G-05, OD-08 and OD-11. Nothing here chooses a model.

| ID | Requirement | Label | Trace |
|---|---|---|---|
| AD-SEC-001 | Server-side authorization: every Admin operation checks current Admin status, suspension, permitted governance purpose and target-resource authorization. Admin credentials never satisfy Business membership, Deal delegation or participant authorization. | SOURCED | BE-ADM-016, BE-GEN-002, BE-SEC-009/013 |
| AD-SEC-002 | Admin and participant separation: Admin-only operations refuse participant credentials and return no data; participant operations do not expose Admin data; Admin cannot perform participant actions for a party. | SOURCED | BE-CLI-001, BE-AC-036, BE-TST-010 |
| AD-SEC-003 | Cross-user and tenant authorization: an authenticated Admin cannot read or change an object outside Section 4; participant credentials cannot reach another participant or Business; denial, lists, search, previews, unread counts and notifications reveal neither hidden content nor hidden conversation existence. | SOURCED | BE-GEN-002/022, BE-SEC-010/012 |
| AD-SEC-004 | Least privilege: each Admin operation exposes only the fields its module needs; no operation returns credential hashes, tokens or secrets. | PROPOSED | BE-GEN-017 |
| AD-SEC-005 | Secure session handling per the approved model: session or token material is not exposed in URLs, logs, error pages or analytics; logout and revocation are effective server-side. | SOURCED requirement; model PENDING | BE-AUTH-009 |
| AD-SEC-006 | CSRF: if the approved model relies on browser-managed credentials (for example cookies), every state-changing Admin request requires CSRF protection and a restrictive cookie policy. If it relies on an explicitly attached credential, CSRF exposure is reduced but token storage and XSS exposure must be addressed. The Web Admin must not rely on either until the model is approved. | PENDING (OD-08, OD-11, G-03) | BE-SEC |
| AD-SEC-007 | CORS: the backend accepts cross-origin Admin requests only from an explicit allow-list of the approved Admin origin; no wildcard for credentialed requests. The origin is not known. | PROPOSED; origin PENDING (OD-06, OD-12) | AD-ARC-015 |
| AD-SEC-008 | XSS: all user-supplied text shown to Admin (verification notes, display names, Business text, financial notes) is rendered as plain text; no user content is interpreted as markup or injected into scripts or frames. | PROPOSED (mirrors v2.1 SEC-012 for the web client) | BE-SEC-003 |
| AD-SEC-009 | Browser hardening (PROPOSED): a content security policy, a frame-ancestors restriction against clickjacking, no-sniff content-type handling, strict transport security, and referrer limitation. Exact values belong to the deployment design. | PROPOSED | BE-SEC-001 |
| AD-SEC-010 | Injection protection: no query is built by concatenating user input; no dynamic code execution or unsafe deserialisation from user input. | SOURCED | BE-SEC-003 |
| AD-SEC-011 | Protected file access: evidence has no public address; each retrieval is authorised and audited; responses carry no-store caching directives; file names are never trusted; content type is verified; previews do not execute active content. | SOURCED / PROPOSED | BE-DOC-004, BE-DOC-005, BE-VER-003 |
| AD-SEC-012 | Rate limiting: Admin login, password change and recovery, and any bulk-reading operation are rate limited, and throttled responses are distinguishable. Thresholds are UNKNOWN. | SOURCED requirement; values UNKNOWN | BE-GEN-008, BE-SEC-004 |
| AD-SEC-013 | Sensitive data redaction: tokens, passwords, ID images, financial figures and document contents never appear in logs, audit entries, error messages, analytics or exports. | SOURCED | BE-SEC-007 |
| AD-SEC-014 | Exports (only if built): cell values that could be interpreted as formulas are neutralised; exports contain no participant personal detail beyond the approved fields; every export is audited. Exports are not approved. | PROPOSED; exports PENDING (AD-DEC-07) | AD-EVT-028 |
| AD-SEC-015 | Secure logging: operational logs follow BE-GEN-012 and exclude sensitive data; audit entries are separate from operational logs. | SOURCED | BE-GEN-012 |
| AD-SEC-016 | No Admin impersonation exists unless separately approved with its own audit design. | PENDING (DEC-020) | BE-ADM-013 |
| AD-SEC-017 | Production hardening (transport, headers, CORS, proxy trust, storage access) is verified before any release. | SOURCED | BE-SEC-001, BR-P10-03 |
| AD-SEC-018 | Elevated authentication and re-authentication for sensitive Admin actions (for example verification approval, suspension, evidence viewing) are undefined. No such control is assumed. | PENDING (DEC-038, G-05) | BE-ADM-014 |
| AD-SEC-019 | Admin screens that show verification evidence or financial evidence must not leave data readable after sign-out (for example by cached views). | PROPOSED | AD-SEC-011 |
| AD-SEC-020 | No participant personal data is used outside its purpose. Admin access is limited to the fields an approved governance module requires and is audited where sensitive. Admin is not a Business member, cannot self-assign Business permissions or use a Business Role to obtain Founder authority, and cannot negotiate, approve or finalize for a participant. | SOURCED / PROPOSED | BE-ADM-015, BE-SEC-013/014, BE-ROL-012 |

---

## 13. Dashboard metrics and analytics

Only metrics whose definitions and data sources are established are specified. All others list what must be defined and approved first. No formula or KPI is invented.

### 13.1 Metrics with an established basis
| ID | Metric | Definition status | Data source (business level) | Release | Gate |
|---|---|---|---|---|---|
| AD-MET-001 | Pending verifications | Count of verification requests currently in status pending. The status vocabulary is SOURCED; the display grouping is PROPOSED. | Verification request | R1 CANDIDATE (counter on Overview); the queue itself is R1 REQUIRED | OD-10 |
| AD-MET-002 | Oldest waiting verification request | Waiting time of the oldest request in status pending, measured from submission. Display PROPOSED; the oldest-first ordering is SOURCED (v2.1 ADM-002). | Verification request | R1 CANDIDATE | OD-10 |
| AD-MET-003 | New users, last 7 days | Count of accounts created in the previous 7 days. The 7-day window is SOURCED (v2.1 ADM-002); counting rules for roles are PROPOSED. | Account | R1 CANDIDATE | OD-10 |

### 13.2 Metrics requiring definition before display
| ID | Metric | Required definition | Data source | Calculation dependencies | Approval gate |
|---|---|---|---|---|---|
| AD-MET-004 | Open reports | Meaning of "open", report categories and severities | Reports (R3 module) | AD-MOD-13 exists | G-07, DEC-018 |
| AD-MET-005 | Active Deals | Which Deal states count as active; effect of the undefined non-completion state | Deal and Deal state history | DEC-044, DEC-043 | DEC-043, DEC-044 |
| AD-MET-006 | Businesses published | Count of Businesses in Published state; effect of listing suspension and unpublish | Business | DEC-031 | DEC-031 |
| AD-MET-007 | Open financial discrepancies and their age | Status vocabulary; meaning of open | Discrepancy | DEC-013 | DEC-013, G-07 |
| AD-MET-008 | User growth by role | Role counting for multi-role accounts; period buckets | Account, role enrolment | DEC-005 | G-07 |
| AD-MET-009 | Deal funnel | Funnel stages and counting rules | Deal state history | DEC-043, DEC-044 | G-07 |
| AD-MET-010 | Readiness Score distribution | Bands and thresholds | Readiness assessment | DEC-015 | DEC-015 |
| AD-MET-011 | Match Score distribution | Bands | Match result | DEC-015 | DEC-015 |
| AD-MET-012 | Simulated commission revenue over time | Rate, trigger, rounding, period | Simulated payment and commission record | DEC-007 | DEC-007 |
| AD-MET-013 | Investment volume by type (simulated) | Type placement and amount basis | Investment terms | G-09 / DEC-006 | DEC-006 |
| AD-MET-014 | Financial-report verification-status mix and open-discrepancy trend | Vocabulary and counting | Financial report, discrepancy | DEC-013, DEC-012 | DEC-013 |
| AD-MET-015 | Profile Views, Portfolio Value, Saved Opportunities, Avg. Match Score of saved | Calculation and backing data absent | None defined | DEC-040 | DEC-040 |

### 13.3 Rules
| ID | Rule | Label |
|---|---|---|
| AD-MET-016 | A metric without an approved definition is not displayed; no placeholder or zero is shown. | SOURCED (BE-DSH-003) |
| AD-MET-017 | All metrics are computed on the server over bounded queries; the client never computes a metric. | PROPOSED (BE-DSH-004) |
| AD-MET-018 | Analytics are descriptive only. No forecasting or predictive model exists or is required. | SOURCED (BE-ADM-010) |
| AD-MET-019 | Date-range controls and CSV export are named by v2.1 ADM-014 but are not approved; export raises AD-SEC-014. | SOURCED name; PENDING (AD-DEC-07) |

---

## 14. UX and interaction requirements

Visual style, branding, framework and design system remain PROPOSED and are not supported by an approved source (OD-12 PENDING). The requirements below are functional usability requirements, PROPOSED unless a source is cited.

| ID | Requirement | Label |
|---|---|---|
| AD-UX-001 | Desktop-oriented responsive layout: usable on a desktop-class browser, and remaining usable (no loss of function) at narrower widths. The device and browser matrix is UNKNOWN. | PROPOSED (AA-03) |
| AD-UX-002 | Clear, consistent navigation reflecting Section 5, with the Verification Queue reachable in one step. | PROPOSED |
| AD-UX-003 | Every list offers search, filters, sort and pagination with a bounded page size, shows the result count, and keeps filter and page state when returning from a detail view. | SOURCED (BE-GEN-005) / PROPOSED |
| AD-UX-004 | Status indicators always carry a text label and are never conveyed by colour alone. | PROPOSED (mirrors v2.1 MIL-010 / MOB-091 intent) |
| AD-UX-005 | Accessible forms: labelled fields, keyboard operability, visible focus, errors shown at the field and announced to assistive technology. The accessibility target for the Web Admin is not sourced; WCAG 2.1 AA is proposed because the mobile specification targets it. | PROPOSED |
| AD-UX-006 | Confirmation for consequential actions: approve, reject, request information, suspend, restore, suspend listing, any status change on financial reports, discrepancy outcomes and adjustments. The confirmation states the consequence and shows the reason that will be recorded and whether it is shown to the user. | PROPOSED |
| AD-UX-007 | Required-reason entry: the control for any "Y with reason" action cannot be submitted empty; the server refuses an empty reason regardless of the client. | SOURCED (BE-ADM-012) |
| AD-UX-008 | Loading states indicate progress without implying completion; after a state-changing action the screen reports the outcome (success, validation failure, denial, conflict, throttling, network failure) and never leaves the Admin uncertain whether the action applied. | PROPOSED (mirrors MOB-103) |
| AD-UX-009 | Empty, error and permission-denied states exist for every list and detail view; a partial failure shows what loaded and marks the failed part unavailable. | PROPOSED |
| AD-UX-010 | A persistent, non-dismissible "Simulated" label appears wherever a payment, commission, premium, investment or milestone amount is shown. | SOURCED (BE-GEN-013) |
| AD-UX-011 | Copy never claims guaranteed returns, fraud-proof reporting, legal enforceability or KYC/AML certification, and uses "Reviewed by Admin" for the financial status. | SOURCED (BE-GEN-014, BE-FIN-004) |
| AD-UX-012 | Admin is told at entry which fields are visible to the participant (for example the decision reason). | PROPOSED |
| AD-UX-013 | No control for an unavailable capability is shown ("coming soon" controls are not shipped). | PROPOSED (AUD-D09) |
| AD-UX-014 | An expired session produces a recoverable session-expired state, distinct from a server error, and never discards an unsent reason silently where it can be preserved locally for re-entry. Local storage of that text is subject to the approved session and privacy model. | PROPOSED |
| AD-UX-015 | Time values are shown in a clearly labelled time zone. | PROPOSED (AD-AUD-011) |
| AD-UX-016 | The language of the Web Admin is not defined by any source. | UNKNOWN (DEC-049 concerns the mobile UI language) |

---

## 15. API and database dependencies

This section lists the capabilities the Admin needs from the backend in business terms. It defines no endpoint URL, request or response field name, SQL table or column. "Database_Design topic" refers to business-level entity categories in Backend Functional Specification Section 7; "API_Contract topic" is a contract section to be authored (BE-DEC-15 PENDING).

| ID | Admin capability needed from the backend | Database_Design.md topic | API_Contract.md topic | Release | Gate |
|---|---|---|---|---|---|
| AD-DEP-001 | Admin credential verification, session issuance and expiry, logout and revocation | Admin account; session or revocation state (shape depends on G-03) | Admin authentication section; error model | R1 | OD-08, OD-11, G-03, G-05 |
| AD-DEP-002 | Admin-only authorisation gate on every Admin operation, refusing participant credentials | Admin account and status; role and permission data | Admin authorisation rules per operation | R1 | OD-03 (approved) |
| AD-DEP-003 | Admin provisioning mechanism and Admin account disablement | Admin account; provisioning record | Possibly no public operation; internal mechanism PENDING | R1 | OD-09, AD-DEC-04 |
| AD-DEP-004 | Verification request listing: filter by status, order oldest first, bounded pagination | Verification request, status | Queue list section | R1 | OD-10 |
| AD-DEP-005 | Verification request detail with applicant summary, decision history and reasons | Verification request, reviewer, reason | Request detail section | R1 | - |
| AD-DEP-006 | Authorised evidence retrieval for owner and reviewing Admin, no public address, audited, no-store | Evidence reference, protected storage | File retrieval section | R1 | OD-05, BE-DEC-05 |
| AD-DEP-007 | Verification decision operation with mandatory reason, applied once, atomic with audit, conflict on re-decision, concurrency-safe | Verification request status, tier, audit entry | Decision section; conflict and validation errors | R1 | AD-DEC-05, AD-DEC-08 |
| AD-DEP-008 | Applicant-visible verification status and reason (consumed by the mobile app) | Verification request status, reason | Participant verification-status section | R1 | - |
| AD-DEP-009 | User directory query and detail, with bounded fields (AD-USR-007, 008) | Account, role enrolment, tier, verification statuses | Directory and detail sections | R1 CANDIDATE | OD-10 |
| AD-DEP-010 | Suspend and restore with reason; session revocation | Account status, revocation state, audit entry | Suspension section | R1 CANDIDATE | OD-10, G-03 |
| AD-DEP-011 | Business review list, flag, listing suspension and restoration; approve or reject if gated | Business, status, flag, listing state | Business review section | R1 CANDIDATE | OD-10, DEC-031 |
| AD-DEP-012 | Audit write for every sensitive event, atomic with the state change; append-only storage | Audit log entry | Audit write contract (internal) and audit read section | R1 | BE-DEC-14 |
| AD-DEP-013 | Audit log query: search, filter, paginate, bounded | Audit log entry | Audit read section | R1 CANDIDATE | OD-10 |
| AD-DEP-014 | Dashboard counters computed on the server over bounded queries | Verification request, account | Overview section | R1 CANDIDATE | OD-10 |
| AD-DEP-015 | Admin notification inbox and event feed | Notification | Admin notification section | R1 CANDIDATE | OD-10, DEC-009 |
| AD-DEP-016 | Error model distinguishing expiry, forbidden, validation, not found, conflict, throttled and server error; bounded pagination; minimum client version | Not applicable | Cross-cutting contract section | R1 | BE-GEN-004, 005, 011 |
| AD-DEP-017 | Read-only Deal, application and investment governance metadata and Escalate; no private conversation content or participant action | Deal, Deal state history, delegation actor metadata, escalation record | Oversight section | R3 | G-07, AD-DEC-01; confidential-access exception PENDING |
| AD-DEP-018 | Versioned financial report review, actor/represented-Business audit context, status change with reason, evidence retrieval and discrepancy handling; no participant edits | Financial report/version, delegation context, evidence, discrepancy | Financial review section | R2 | DEC-012, DEC-013, OD-05, BR-DEC-007/011 |
| AD-DEP-019 | Read-only simulated payment, commission and premium views | Payment and commission record, premium entitlement | Simulation oversight section | R2/R3 | DEC-007, DEC-008 |
| AD-DEP-020 | Reputation read and logged adjustment | Reputation event | Reputation oversight section | R3 | DEC-028 |
| AD-DEP-021 | Analytics aggregates | Aggregated read models of existing entities | Analytics section | R3 | DEC-040, G-07 |
| AD-DEP-022 | Settings read (and later edit) | Setting record | Settings section | R3 | G-07 |
| AD-DEP-023 | Reference data availability is not needed by the Admin R1 workflow beyond display of values already chosen by users | Reference list entry | Reference data section (shared) | R1 | BE-DEC-10 |

Notes for the future documents: the database design must make audit entries append-only and make the decision, tier change and audit entry atomic; the API contract must give each Admin operation an explicit authorisation requirement, a stable error code set, a mandatory reason where AD-PRM-R01 applies, and bounded pagination.

---
## 16. Testing and acceptance criteria

Each criterion is measurable and traceable. "Gated" means the criterion cannot be completed until the named decision supplies the value. No test, tool, test environment or result exists today; no criterion has been met. Tooling is PENDING (BR-P1-07 of the Roadmap).

### 16.1 Authentication, session and Admin isolation
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-001 | Given an unauthenticated visitor, when any public registration capability is used with Admin as the requested role, then it is refused, no account exists afterwards, and 100 percent of public registration variants tested refuse it. | AD-AUT-001, BE-AC-038 | R1 |
| AD-AC-002 | Given valid participant credentials of each role, when each Admin-only operation in the approved inventory is invoked, then every invocation is refused with no Admin data returned, and a denied-operation audit entry exists for each (tested 100 percent of Admin operations). | AD-SEC-002, BE-AC-036, AD-EVT-026 | R1 |
| AD-AC-003 | Given valid Admin credentials, when Admin attempts Business-role enrollment/self-assignment or any participant action (edit Business content, draft/submit terms, confirm Agreement, mark milestone, prepare/submit a report, accept NDA or join/send in a conversation), then it is refused and grants no participant authority. | AD-PRM-014/016..018/022, AD-PRM-R06, BE-AC-036/043/047/048 | R1 |
| AD-AC-004 | Given a wrong identifier and a wrong password, when each is submitted to Admin login, then the status code and body are identical for both cases. | AD-AUT-005 | R1 |
| AD-AC-005 | Given a signed-in Admin who signs out, when a request is made with the earlier credential, then it is refused, and the refusal is distinguishable from a server error. | AD-AUT-007, BE-AC-003 | R1 |
| AD-AC-006 | Given an expired session and a simulated server failure, when each is encountered, then the Web Admin shows distinct states and does not treat the server failure as logout. | AD-AUT-009, AD-UX-014 | R1 |
| AD-AC-007 | Given repeated failed Admin logins reaching the approved throttle threshold, when another attempt is made, then a distinguishable throttled response is returned. Gated on the threshold value (UNKNOWN). | AD-AUT-006, AD-SEC-012 | R1 |
| AD-AC-008 | Given a disabled Admin account, when it attempts any operation, then it is refused with a distinguishable reason and its sessions are revoked. Gated on the disablement mechanism (AD-DEC-04). | AD-AUT-012 | R1 |
| AD-AC-009 | Given Admin login, logout, failure, password change and provisioning events, when each occurs, then exactly one audit entry with the AD-AUD-001 fields exists per event. | AD-AUT-016, AD-EVT-001..006, 029 | R1 |
| AD-AC-010 | Given the session policy approved under G-05, when lifetime, idle and re-authentication behaviours are exercised, then they match the approved values. Gated on G-05 / DEC-053 and DEC-038. | AD-AUT-008, AD-AUT-014 | R1 |

### 16.2 Verification workflow and file privacy
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-011 | Given N verification requests in mixed statuses, when the queue is opened, then only requests in status pending are listed, ordered oldest first, in pages not exceeding the bounded page size, and the Overview counter (if built) equals the pending count. | AD-WF-001, AD-MET-001, BE-AC-031 | R1 |
| AD-AC-012 | Given a pending request, when an authenticated Admin approves with a non-empty reason, then the request status is approved, the applicant tier is 1, exactly one audit entry for the decision and one for the tier change exist, and the applicant reads the status and reason. | AD-WF-001, BE-AC-035 | R1 |
| AD-AC-013 | Given a pending request, when an Admin rejects with a non-empty reason, then status is rejected, tier remains 0, one audit entry exists, and the applicant reads the status and reason. | AD-WF-001, BE-AC-035 | R1 |
| AD-AC-014 | Given a pending request, when an Admin requests more information with a non-empty reason, then status is more-information-requested; when the applicant resubmits, then status returns to pending; both transitions are audited. | AD-WF-001, BE-VER-002 | R1 |
| AD-AC-015 | Given a decision submitted with an empty or whitespace-only reason, when it reaches the server, then it is refused, the request status is unchanged and no audit entry for a decision exists. | AD-WF-003, AD-PRM-R01 | R1 |
| AD-AC-016 | Given two Admin sessions submitting decisions on the same request at the same time, when both execute, then exactly one decision is applied, the other receives a conflict, and exactly one decision audit entry exists. | AD-WF-006, BE-GEN-006 | R1 |
| AD-AC-017 | Given a request left pending for any elapsed time or after evidence upload or applicant resubmission, when no Admin action occurs, then the status stays pending; across the test dataset the count of approved requests equals the count of approval audit entries. | AD-WF-007 | R1 |
| AD-AC-018 | Given verification evidence, when a user who is neither the owner nor an Admin requests it, then nothing is returned and existence is not revealed; when any evidence request is made without credentials, then it is refused; no evidence address is usable without authorisation (public-address test passes). | AD-WF-005, AD-SEC-011, BE-VER-003 | R1 |
| AD-AC-019 | Given an Admin views evidence, when the retrieval completes, then one evidence-view audit entry exists referencing the request and containing no image content. | AD-EVT-007, BE-DOC-005 | R1 |
| AD-AC-020 | Given an injected failure after the decision is applied but before the audit write (and the reverse), when the operation ends, then either both the state change and the audit entry exist or neither does. | AD-ARC-010, AD-AUD-003 | R1 |
| AD-AC-021 | Given a verification submitted on a physical Android phone, decided in the Web Admin, when the phone next reads status, then the new status and the Admin reason are shown (end to end, recorded with device model and OS version). | AD-WF-001, BE-AC-035, BR-P10-06 | R1 |
| AD-AC-022 | Given a Tier 0 user, when Stage 3 or NDA acceptance is attempted before approval, then it is refused with the verification-upgrade path; after approval to Tier 1, the same user may accept the NDA at Stage 2. | AD-WF-011, BE-AC-016 | R1 |
| AD-AC-023 | Given any Admin operation in the verification module, when the available actions are enumerated, then no operation assigns Tier 2 and no operation changes tier outside a decision. | AD-PRM-006, AD-WF-012 | R1 |

### 16.3 User management
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-024 | Given more users than one page, when the directory is searched and filtered by role, tier and status, then results are paginated within the bounded size and every row matches the applied filters. | AD-USR-001, 009, 010 | R1 CANDIDATE |
| AD-AC-025 | Given an active user with a valid session, when an Admin suspends the account with a reason, then the next authenticated request by that user is refused with a distinguishable suspension response, new login is refused, and an audit entry exists. The maximum revocation delay is UNKNOWN. | AD-USR-011, BE-AC-005 | R1 CANDIDATE |
| AD-AC-026 | Given a suspended user, when an Admin restores with a reason, then login succeeds again and an audit entry exists; sessions revoked at suspension are not reinstated. | AD-USR-012 | R1 CANDIDATE |
| AD-AC-027 | Given directory and detail responses for a seeded dataset, when the content is inspected, then no credential hash, token, evidence image, financial figure, message or confidential Business content appears. | AD-USR-007, AD-SEC-013 | R1 CANDIDATE |
| AD-AC-028 | Given any Admin operation list, when negative tests run, then no operation edits user profile fields, roles, passwords or evidence, and none deletes a user. | AD-USR-006, AD-PRM-038 | R1 CANDIDATE |

### 16.4 Business and deal oversight
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-029 | Given any Admin operation list, when negative tests run, then no operation modifies Business content, membership, roles, granular permissions or Deal delegation, and Admin cannot assign itself Business access. | AD-BIZ-004, AD-PRM-014, AD-PRM-R06 | R1 CANDIDATE |
| AD-AC-030 | Given a published Business, when an Admin suspends its listing with a reason, then it disappears from discovery results, is not deleted, the founder sees the reason, and an audit entry exists; restoring reverses it with an audit entry. | AD-BIZ-003, AD-BIZ-007 | R1 CANDIDATE |
| AD-AC-031 | Given the Business approval decision, when it is recorded as mandatory, then approve and reject with reason exist for submitted Businesses and are audited, and a Business cannot reach Published without an approval; when it is recorded as not mandatory, then no Admin approve or reject operation exists. Until the decision is recorded this criterion is gated on DEC-031 and no path is assumed. | AD-BIZ-001, AD-BIZ-002, ADC-12 | R1 CANDIDATE |
| AD-AC-032 | Given any Admin operation list, when negative tests run, then no operation writes to Deals, negotiation entries, Agreements, milestones or applications; joins or moderates a private conversation; or returns conversation identity/content/history/search/preview/unread data, Stage 3/4 documents or NDA-protected content. A delegated Finance Manager actor does not enlarge Admin authority. | AD-BIZ-008..012, AD-PRM-015..018 | R3 |
| AD-AC-033 | Given an Escalate action, when an Admin submits it without a reason, then it is refused; with a reason, an escalation audit entry exists. The downstream behaviour is gated on AD-DEC-01. | AD-BIZ-013, AD-EVT-018 | R3 |

### 16.5 Financial data restrictions and simulation
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-034 | Given any versioned financial report, including one prepared or submitted by an authorized Business member, when negative tests run, then no Admin operation prepares, submits or changes revenue, expenses, cash, notes, evidence or net for a participant; actor/represented-Business/version history remains immutable and net remains server-computed. | AD-FIN-001/005, BE-AC-028 | R2 |
| AD-AC-035 | Given a report, when an Admin sets a status, then only the allowed statuses are accepted, a reason is required, the change is audited with before and after values, and no status above Evidence Submitted exists at submission. | AD-FIN-002, AD-FIN-003, BE-AC-026 | R2 |
| AD-AC-036 | Given financial evidence, when a user who is neither the founder, a permitted investor nor an Admin requests it, then nothing is returned; evidence has no public address and each Admin retrieval is audited. | AD-FIN-006, AD-EVT-007 | R2 |
| AD-AC-037 | Given the Admin financial views, when the copy is inspected, then the highest status reads "Reviewed by Admin", and none of the words Verified, Certified or Audited labels it. | AD-FIN-004, BE-AC-034 | R2 |
| AD-AC-038 | Given a flagged discrepancy, when an Admin chooses an outcome, then only the approved vocabulary is accepted, a reason is required, and the outcome is audited. Gated on DEC-013. | AD-FIN-007, BE-AC-028 | R2 |
| AD-AC-039 | Given any amount shown to Admin, when each screen is inspected, then a persistent Simulated label is present; no screen contains a field for card, bank or wallet credentials. | AD-UX-010, AD-FIN-011, AD-FIN-017, BE-AC-030 | R2 |
| AD-AC-040 | Given reputation views and the audit view, when negative tests run, then no operation alters or deletes a reputation history entry or an audit entry; any adjustment (if approved) appends an entry with a reason. | AD-FIN-013, AD-AUD-002 | R3 |
| AD-AC-041 | Given simulated payment and commission views, when negative tests run, then no Admin operation creates, edits, reverses or settles a record. | AD-FIN-015, AD-PRM-028 | R2/R3 |

### 16.6 Audit integrity
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-042 | Given the audit store, when attempts are made through every operation to edit or delete an entry, then all attempts fail and the entry is unchanged. | AD-AUD-002, BE-AC-032 | R1 |
| AD-AC-043 | Given a sample of every Admin action in the release, when entries are inspected, then 100 percent contain actor, active role, action, target, timestamp and result, and reason where required. | AD-AUD-001, AD-AUD-005, BE-AC-032 | R1 |
| AD-AC-044 | Given seeded secret-like strings in inputs (token, password, document content, financial figure), when the audit and operational logs are searched, then none appears. | AD-AUD-006, AD-SEC-013, BE-SEC-007 | R1 |
| AD-AC-045 | Given the audit view, when it is opened, then an audit-view entry exists, results are paginated within the bounded size, and search by actor, action, target and date works. | AD-AUD-008, AD-AUD-009 | R1 CANDIDATE |

### 16.7 Security tests
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-046 | Given script, markup and long-string payloads in every participant-supplied field shown to Admin, when each Admin view renders, then payloads display as inert text and no script executes. | AD-SEC-008 | R1 |
| AD-AC-047 | Given injection payloads in every Admin search and filter input, when submitted, then no query manipulation, error disclosure or data leak occurs. | AD-SEC-010 | R1 |
| AD-AC-048 | Given a cross-origin request from an origin not on the allow-list, when it is sent with credentials, then it is rejected. Gated on the Admin origin (OD-06, OD-12). | AD-SEC-007 | R1 |
| AD-AC-049 | Given the approved session model, when it uses browser-managed credentials, then a state-changing request without a valid CSRF token is rejected. Conditional on OD-08, OD-11, G-03. | AD-SEC-006 | R1 |
| AD-AC-050 | Given the Web Admin responses, when headers are inspected, then the hardening headers approved for deployment are present. Values gated on the deployment design. | AD-SEC-009, AD-SEC-017 | R1 |
| AD-AC-051 | Given evidence responses, when headers are inspected, then no-store caching directives are present, and after sign-out no evidence is retrievable from the browser cache. | AD-SEC-011, AD-SEC-019 | R1 |
| AD-AC-052 | Given Admin login, password change and bulk read operations, when throttle thresholds are reached, then throttled responses occur. Gated on threshold values. | AD-SEC-012 | R1 |

### 16.8 UX, metrics, integration and regression
| ID | Criterion (Given / When / Then) | Traces | Rel |
|---|---|---|---|
| AD-AC-053 | Given each consequential action in the release, when it is initiated, then a confirmation states the consequence and the recorded reason before submission. | AD-UX-006 | R1 |
| AD-AC-054 | Given each R1 screen, when keyboard-only operation and a screen-reader pass are performed, then all controls are reachable and form errors are announced (target WCAG 2.1 AA is PROPOSED). | AD-UX-005 | R1 |
| AD-AC-055 | Given any metric without an approved definition, when the Overview and Analytics are inspected, then it is not displayed. | AD-MET-016 | R1 |
| AD-AC-056 | Given a seeded dataset, when AD-MET-001 and AD-MET-003 are displayed, then they equal independently computed counts. | AD-MET-001, AD-MET-003 | R1 CANDIDATE |
| AD-AC-057 | Given the approved API contract sections for Admin, when contract tests run, then every Admin operation conforms, and unknown fields and enum values are tolerated by the Web Admin. | AD-DEP-016, BE-CLI-002, BE-CLI-004 | R1 |
| AD-AC-058 | Given the R1 candidate build, when the R1 regression suite runs, then it passes without any R2 or R3 module present. | RR-09 and Section 4.4 of the Roadmap, ARU-06 | R1 |
| AD-AC-059 | Given any Admin operation list, when negative tests run, then no operation lets an Admin act as or sign in as a participant. | AD-SEC-016, AD-PRM-034 | R1 |
| AD-AC-060 | Given the R1 Web Admin build, when navigation is inspected, then no control for an unapproved or unavailable capability exists, and Settings is absent unless inventoried. | AD-IA-001, AD-UX-013 | R1 |
| AD-AC-061 | Given a verification decision, when the approved event catalogue includes it, then an in-app notification of generic content appears for the participant; when it does not include it, then no notification is sent and the status read still works. Gated on DEC-009. | AD-WF-001 step 7, Section 7.6, ADC-05 | R1 |

### 16.9 Test coverage by type
| Test type | Criteria |
|---|---|
| Authentication and session | AD-AC-001, 004..010 |
| RBAC and Admin isolation | AD-AC-002, 003, 028, 029, 032, 059 |
| Verification workflow | AD-AC-011..023 |
| File privacy | AD-AC-018, 019, 036, 051 |
| Suspension and restoration | AD-AC-025, 026 |
| Audit integrity | AD-AC-009, 019, 020, 042..045 |
| Cross-user negative tests | AD-AC-002, 018, 027, 036 |
| Financial data restrictions | AD-AC-034..039, 041 |
| Web Admin integration | AD-AC-057, 058 |
| Mobile-to-Admin end to end | AD-AC-021, 022 |
| Regression and security | AD-AC-046..052, 058 |

---

## 17. R1 / R2 / R3 release matrix

Release allocation is PROPOSED, historically informed by Roadmap Edition 0.2 and reconciled with Revision 6 and the corrected specifications. G-07 (DEC-034, DEC-054) remains PENDING. The only approved release constraint is OD-03: minimum Web Admin functionality in R1, including Tier 1 verification review. Nothing here places Business-role oversight or messaging moderation in R1, and no R1 CANDIDATE becomes approved without OD-10.

| Feature or module | Class | Roadmap task | Approval status | Dependencies | Blocking decisions |
|---|---|---|---|---|---|
| Admin sign-in, session, provisioning (AD-MOD-00) | R1 REQUIRED (design PENDING) | BR-P2-13 | Requirement APPROVED by OD-03 context; design PENDING | Authentication foundation | OD-08, OD-09, OD-11, G-03, G-05, DEC-038 |
| Verification Queue and decision workflow (AD-MOD-03) | R1 REQUIRED by confirmed scope | BR-P3-07 | APPROVED requirement (OD-03 names Tier 1 verification review) | Verification submission, protected storage, audit foundation | OD-05, OD-10 (inventory approval), OD-11 |
| Reason-and-audit rule for Admin actions (BE-ADM-012) | R1 REQUIRED | BR-P3-08 | SOURCED | Audit foundation | - |
| Admin confidential-content limits (BE-ADM-015) | R1 REQUIRED | BR-P3-11 | SOURCED | - | AD-DEC-06 |
| Admin security documentation duty (AD-MOD-15) | R1 REQUIRED (documentation) | BR-P3-11 | Duty APPROVED (OD-03); content PENDING | - | OD-08, OD-11 |
| Overview (AD-MOD-01) | R1 CANDIDATE | BR-P3-09 | PENDING (OD-10) | Queue | OD-10 |
| User Management (AD-MOD-02) | R1 CANDIDATE | BR-P3-09 | PENDING (OD-10) | Authentication, revocation | OD-10, G-03, AD-DEC-09 |
| Audit Logs view (AD-MOD-10) | R1 CANDIDATE | BR-P3-09 | PENDING (OD-10) | Audit foundation | OD-10, BE-DEC-14 |
| Business Review (AD-MOD-04) | R1 CANDIDATE (approve and reject only if the mandatory gate is decided) | BR-P4-04 | PENDING (OD-10, DEC-031) | Business lifecycle | OD-10, DEC-031, AD-DEC-06 |
| Admin notifications inbox (AD-MOD-09) | R1 CANDIDATE | BR-P9-05 | PENDING (OD-10, DEC-009) | Notification module | OD-10, DEC-009 |
| Web Admin end-to-end integration test | R1 REQUIRED | BR-P10-06 | - | All R1 Admin modules | OD-10 |
| Financial Reporting and Discrepancies (AD-MOD-06) | R2 PROPOSED | BR-P8-09 | PENDING (G-07); not part of the R1 minimum unless OD-10 and G-07 say so | Financial reporting module, file storage | G-07, DEC-006, DEC-012, DEC-013 |
| Premium and Simulated Payment Oversight (AD-MOD-08) | R2/R3 PROPOSED (split not decided) | BR-P9-08 | PENDING | Premium and payment simulation | G-07, DEC-007, DEC-008 |
| Deal and Application Oversight (AD-MOD-05) | R3 PROPOSED (historical roadmap: BR-P7-09 R2/R3) | BR-P7-09, BR-P9-08 | PENDING (G-07); no messaging moderation or Business-role management included | Deal Room governance metadata | G-07, AD-DEC-01; AD-DEC-03 exception PENDING |
| Reputation Oversight (AD-MOD-07) | R3 PROPOSED | BR-P9-08, BR-P9-07 | PENDING | Reputation module | DEC-028, G-07 |
| Analytics (AD-MOD-11) | R3 PROPOSED | BR-P9-08 | PENDING | Metric definitions | DEC-040, G-07 |
| Settings (AD-MOD-12) | R3 PROPOSED / PENDING | BR-P9-08 | PENDING | Scope decision | G-07, DEC-038 |
| Reports and Disputes (AD-MOD-13) | R3 PROPOSED (Should-Have) | BR-P9-07 | PENDING | Reports feature | DEC-018, DEC-014, G-07 |
| Admin impersonation (AD-MOD-14) | NOT BUILT | BR-P9-09 | DEC-020 PENDING | - | DEC-020 |
| Mobile Admin screens (v2.1 SCR-030..034) | Not applicable to this document | - | Change request open (CF-8) | - | ADC-01 |

### 17.1 Explicit distinction
R1 REQUIRED functionality is: Admin sign-in and provisioning (AD-MOD-00), the Verification Queue and decision workflow (AD-MOD-03), the reason-and-audit rule, the confidential-content limits and the documentation duty. Every other R1 item above is a CANDIDATE awaiting OD-10 and is not approved for R1. No R2 or R3 item is a prerequisite of any R1 item.

---

## 18. Risk register

Severity, likelihood and impact use High / Medium / Low and are PROPOSED judgements. "Owner role" names a role, not a person.

| ID | Risk | Severity | Likelihood | Impact | Mitigation | Owner role | Decision dependency |
|---|---|---|---|---|---|---|---|
| AR-01 | OD-10 inventory not derived, so R1 Admin scope is unclear | High | High | R1 cannot complete end to end | Derive OD-10 requirement by requirement from this document and the Backend Specification | Backend developer, Project owner | OD-10 |
| AR-02 | Admin authentication model undecided; JWT vs P0/P1 conflict extends to the browser client | High | Medium | Authentication redesign late; security requirements unfixable | Resolve OD-08 first, then OD-11 with G-03, G-05 and DEC-038 | Project owner | OD-08, OD-11 |
| AR-03 | No Admin provisioning route on a fresh database | High | High | No Admin can exist, so R1 verification cannot be reviewed | Decide OD-09; keep first-account creation a controlled internal step | Project owner | OD-09 |
| AR-04 | Evidence exposure through caching, logs or public addresses | High | Medium | Privacy breach of ID images | AD-SEC-011, AD-SEC-013, AD-AC-018, 051 | Backend developer | OD-05 |
| AR-05 | XSS from participant-supplied text rendered to Admin | High | Medium | Admin session compromise | AD-SEC-008 and AD-AC-046 | Web Admin developer | OD-12 |
| AR-06 | Admin over-privilege: an operation exceeds Section 4 | High | Medium | Violates BE-ADM-012 and ROL-007 | Negative tests for every "Never" row (AD-PRM-R04) | Reviewer | - |
| AR-07 | R2 and R3 modules mistaken for R1 prerequisites | High | Medium | R1 delayed by work it does not need | Section 17 and rule ARU-06 of Section 0.10; Roadmap RR-09 and Section 4.4; review each phase exit | Reviewer, Project owner | G-07 |
| AR-08 | Suspension capability absent in R1 although BE-AUTH-013 needs it | Medium | Medium | No sanctioned way to suspend an account | Decide AD-DEC-09 and OD-10 together | Project owner | OD-10 |
| AR-09 | Concurrent Admin decisions apply twice or inconsistently | Medium | Medium | Wrong tier or duplicate audit | AD-WF-006, AD-AC-016 | Backend developer | AD-DEC-08 |
| AR-10 | Audit entry missing after a state change | High | Low | Loss of accountability | Atomic write and AD-AC-020 | Backend developer | BE-DEC-14 |
| AR-11 | Admin reason text exposes internal remarks to the applicant | Medium | Medium | Privacy and conduct risk | AD-WF-004, AD-UX-012; decide internal notes | Project owner | AD-DEC-05 |
| AR-12 | Admin reads confidential content or conversation-existence metadata beyond approved governance rights | High | Medium | Breach of Business/Deal/NDA/message isolation | Default exclusion, negative tests and safe list/search/preview rules; separately decide any exceptional review policy and AD-DEC-06 | Project owner | AD-DEC-03, AD-DEC-06, MSG-DEC-006/007/011/012 |
| AR-22 | Admin is incorrectly treated as a Business member or uses role/delegation records to gain Founder or participant authority | High | Medium | Cross-Business privilege escalation and unauthorized participant action | AD-PRM-R06, AD-SEC-001/020, AD-AC-003/029/032 | Reviewer | BR-DEC-002/005/006/009 remain PENDING |
| AR-13 | Web Admin frontend technology undecided | Medium | High | Security controls and UX cannot be specified in detail | Decide OD-12; keep requirements technology-neutral | Project owner | OD-12 |
| AR-14 | Hosting and Admin origin undecided | Medium | High | CORS and hardening cannot be finalised; no phone-to-Admin test environment | Decide OD-06 | Project owner | OD-06 |
| AR-15 | Source conflicts (ADC-01..ADC-12) remain unresolved | Medium | Medium | Rework | Track in Section 0.9; raise change requests | Project owner | CF-8, CF-9 |
| AR-16 | Single-author source chain with no independent countersign | Medium | Medium | Undetected requirement errors | Human or separately sourced countersign | Project owner, Reviewer | BC-18 |
| AR-17 | Team capacity and Admin user count unknown | Medium | High | Queue and schedule assumptions fail | Confirm before baselining | Project owner | G-10 |
| AR-18 | Admin export or analytics introduces privacy and injection exposure | Medium | Low | Data leakage | Keep exports unapproved; AD-SEC-014 | Reviewer | AD-DEC-07 |
| AR-19 | Admin account disablement mechanism missing (no super admin) | Medium | Medium | A compromised Admin account cannot be disabled in a controlled way | Decide AD-DEC-04 with OD-09 | Project owner | OD-09, AD-DEC-04 |
| AR-20 | Legacy behaviour copied by mistake | Medium | Low | Violates G-01 and OD-07 | Review checklist at each phase exit | Reviewer | G-01 |
| AR-21 | Business lifecycle built with or without an Admin approval step before DEC-031 is decided | Medium | Medium | Rework or an unreviewed publication path | Keep AD-BIZ-001 conditional; AD-AC-031 gated | Project owner | DEC-031, OD-10 |

---

## 19. Decision and approval register

### 19.1 Approved
| Item | Revision 6 | Status | Effect on this document |
|---|---|---|---|
| OD-03 | Section 3.4 | APPROVED (2026-11-15) | Separate Web Admin Dashboard; no public Admin registration; minimum Admin functionality in R1 including Tier 1 verification review; documentation duty; inventory PENDING |
| G-00 | Section 3.1 | APPROVED (2026-11-15) | Backend and API baseline |
| G-01 / DEC-046 | Section 3.2 | APPROVED (2026-11-15) | Legacy is read-only reference |
| OD-07 | Section 3.3 | APPROVED (2026-11-15) | Fresh database; no Admin at start |
| OD-01 | Section 3.5 | APPROVED approach only | Backend specification approach; creation authorisation not recorded |

### 19.2 Unresolved Admin decisions and dependencies
| Item | Subject | Backend Spec ID | Status | Affects (modules) |
|---|---|---|---|---|
| OD-08 | JWT vs P0/P1 prohibition, including browser Admin authentication | BE-DEC-03 | PENDING | AD-MOD-00, Section 12 |
| OD-09 | Admin account provisioning | BE-DEC-16 | PENDING | AD-MOD-00, AD-MOD-02 |
| OD-10 | Minimum R1 Admin feature inventory | BE-DEC-17 | PENDING | All R1 CANDIDATE modules, Section 17 |
| OD-11 | Admin web authentication and session | BE-DEC-18 | PENDING | AD-MOD-00, Section 12 |
| OD-12 | Web Admin frontend technology and specification | BE-DEC-19 | PENDING | Section 2, Section 14 |
| G-03 / DEC-003 | JWT token model | BE-DEC-02 | PENDING | Sessions, revocation, CSRF |
| G-05 / DEC-053 | Session lifetime, re-authentication, multi-device | BE-DEC-02 | PENDING | AD-MOD-00 |
| DEC-038 | Admin "elevated auth" meaning (Revision 6 records MFA / shorter sessions / device policy options; none chosen) | BE-ADM-014 | PENDING | AD-MOD-00, AD-SEC-018 |
| DEC-020 | Admin impersonation-for-support (Revision 6 keeps it pending/deferred) | BE-ADM-013 | PENDING | AD-MOD-14 (NOT BUILT) |
| BR-DEC-001..012 | Business membership, roles, granular permissions, Deal delegation, revocation, audit and release allocation | BE-ROL-006..012, BE-BIZ-013..018, BE-DLR-009..013 | PENDING | Actor context only; no Admin management capability or R1 allocation inferred |
| MSG-DEC-001..013; DEC-010 | Unified inbox, conversation access, authorization, privacy, retention, moderation, technology and release allocation | BE-MSG-005..020 | PENDING | No Admin private-message access or moderation module; AD-DEC-03 exception remains pending |
| DEC-004 | Admin on mobile (not approved by OD-03) | BC-05 | PENDING | Change request CF-8 |
| DEC-014 | Milestone dispute handling, option C Admin queue (not approved by OD-03) | BE-MIL-005 | PENDING | AD-MOD-13 |
| DEC-026 | Account deletion | BE-DEC-13 | PENDING | AD-USR-014 |
| DEC-031 | Pre-publish moderation and unpublish (OD-03 does not approve it) | BE-BIZ-004 | PENDING | AD-MOD-04, AD-BIZ-001 |
| DEC-009 | Notification events and preferences | BE-NTF-002 | PENDING | AD-MOD-09, workflow step 7 |
| DEC-013 | Discrepancy vocabulary | BE-FIN-009 | PENDING | AD-MOD-06 |
| DEC-012 | Report cadence and late handling | BE-FIN-007 | PENDING | AD-MOD-06 |
| DEC-028 | Tier 2 trigger, reputation weights | BE-VER-006 | PENDING | AD-PRM-006, AD-MOD-07 |
| DEC-007, DEC-008 | Commission, premium | BE-PAY, BE-PRM | PENDING | AD-MOD-08 |
| DEC-040 | Dashboard metrics definitions | BE-DSH-003 | PENDING | Section 13 |
| DEC-016 | Tier 0 and phone verification; Tier gates | BE-VER-007 | PENDING | AD-WF-011 |
| G-07 / DEC-034, DEC-054 | Release scope and name | Section 11.4 | PENDING | Section 17 |
| G-10 / DEC-055 | Owners and development authorisation | BE-DEC-20 | PENDING | Whole document |
| OD-04, OD-05, OD-06 | Providers, file storage, test backend and hosting | BE-DEC-06..09 | PENDING | AD-MOD-03, Section 2 |
| BE-DEC-04, BE-DEC-05, BE-DEC-14 | Password policy, upload limits, audit retention | - | PENDING | Sections 3, 7, 11 |

### 19.3 Decisions raised by this document (none approved; no option is chosen)
| ID | Question | Status |
|---|---|---|
| AD-DEC-01 | What does Escalate do: who receives it, does it have a lifecycle, can participants see it? | PENDING |
| AD-DEC-02 | May a rejected applicant submit a new request, and may a decision be made on a request whose applicant is suspended? | PENDING |
| AD-DEC-03 | Is any exceptional Admin access to private Hiring, Team or Deal conversation content necessary for an approved reporting/moderation purpose, and if so what least-privilege scope, legal basis, audit, retention and release apply? Default access is none; this question does not create a moderation feature. | PENDING (MSG-DEC-006/007/011/012; G-07) |
| AD-DEC-04 | How is an Admin account disabled or removed when there is no super admin? | PENDING (with OD-09) |
| AD-DEC-05 | Reason entry rules: minimum and maximum length, allowed content, whether an internal-only note exists. | PENDING |
| AD-DEC-06 | Which Business fields and documents may Admin read in review? | PENDING |
| AD-DEC-07 | Audit log retention, archival and export; analytics export. | PENDING (with BE-DEC-14) |
| AD-DEC-08 | Concurrent review rule: first decision wins (proposed), or an assignment or claim step. | PENDING |
| AD-DEC-09 | Effects of user suspension on owned data (listings, pending interests, Deals) and whether user suspension is in the R1 inventory. | PENDING (with OD-10) |
| AD-DEC-10 | Evidence retention after a verification decision. | PENDING (with BE-DEC-14) |

---

## 20. Requirements traceability matrix

### 20.1 BE-ADM-001 to BE-ADM-017
| Requirement | Subject | Admin module | Proposed release | Backend dependency | Acceptance criterion | Blocking decision |
|---|---|---|---|---|---|---|
| BE-ADM-001 | Dashboard summary | AD-MOD-01 | R1 CANDIDATE | AD-DEP-014 | AD-AC-055, 056 | OD-10 |
| BE-ADM-002 | User directory, suspend, restore | AD-MOD-02 | R1 CANDIDATE | AD-DEP-009, 010 | AD-AC-024..028 | OD-10, G-03, AD-DEC-09 |
| BE-ADM-003 | Verification queue | AD-MOD-03 | R1 REQUIRED | AD-DEP-004..008 | AD-AC-011..023 | OD-10, OD-05 |
| BE-ADM-004 | Business moderation | AD-MOD-04 | R1 CANDIDATE | AD-DEP-011 | AD-AC-029..031 | OD-10, DEC-031 |
| BE-ADM-005 | Application, Deal and Investment oversight | AD-MOD-05 | R3 PROPOSED (historical BR-P7-09 R2/R3) | AD-DEP-017 | AD-AC-032, 033 | G-07, AD-DEC-01; private conversations excluded by default |
| BE-ADM-006 | Financial review and discrepancies | AD-MOD-06 | R2 PROPOSED | AD-DEP-018 | AD-AC-034..039 | G-07, DEC-012, DEC-013 |
| BE-ADM-007 | Reports and disputes | AD-MOD-13 | R3 PROPOSED | AD-DEP-017 | AD-AC-033 | DEC-018, DEC-014 |
| BE-ADM-008 | Reputation and Premium oversight | AD-MOD-07, AD-MOD-08 | R3 and R2/R3 PROPOSED | AD-DEP-019, 020 | AD-AC-039..041 | DEC-007, DEC-008, DEC-028 |
| BE-ADM-009 | Audit log | AD-MOD-10 | R1 CANDIDATE | AD-DEP-012, 013 | AD-AC-042..045 | OD-10, BE-DEC-14 |
| BE-ADM-010 | Analytics | AD-MOD-11 | R3 PROPOSED | AD-DEP-021 | AD-AC-055 | DEC-040, G-07 |
| BE-ADM-011 | Settings; admin grades | AD-MOD-12 | R3 PROPOSED / PENDING | AD-DEP-022 | AD-AC-060 | G-07, ADC-08 |
| BE-ADM-012 | Reason and audit for sensitive actions; Admin limits | All modules | R1 REQUIRED | AD-DEP-007, 012 | AD-AC-015, 043 | - |
| BE-ADM-013 | Impersonation not built | AD-MOD-14 | NOT BUILT | - | AD-AC-059 | DEC-020 |
| BE-ADM-014 | Elevated auth and Web Admin session transport | AD-MOD-00 | R1 REQUIRED (design PENDING) | AD-DEP-001 | AD-AC-005..010, 049 | DEC-038, OD-08, OD-11, G-05 |
| BE-ADM-015 | Admin confidential-content limits | All modules | R1 REQUIRED | AD-DEP-002 | AD-AC-027, 032 | AD-DEC-06; AD-DEC-03 only if an exceptional conversation-review capability is later proposed |
| BE-ADM-016 | Admin provisioning; no self-registration | AD-MOD-00 | R1 REQUIRED to exist (method PENDING) | AD-DEP-003 | AD-AC-001, 008 | OD-09, AD-DEC-04 |
| BE-ADM-017 | Admin security documentation duty | AD-MOD-15 | R1 REQUIRED (documentation) | - | Section 21.4 item DOC-03 | OD-08, OD-11 |

### 20.2 Related backend requirements
| Requirement | Subject | Admin sections | Acceptance criterion |
|---|---|---|---|
| BE-VER-001..005, 008, 009 | Tiers, request, evidence privacy, audit, Tier 1 review by Admin | AD-MOD-03, Section 7 | AD-AC-011..023 |
| BE-VER-006, 007 | Tier 2 trigger; Tier gates | AD-PRM-006, AD-WF-011 | AD-AC-022, 023 |
| BE-AUTH-001, 008..010, 013..016 | Admin authentication, session, suspension, audit | Section 3 | AD-AC-001, 004..010 |
| BE-SEC-001..008 | Security | Section 12 | AD-AC-046..052 |
| BE-AUD-001..003 | Audit | Section 11 | AD-AC-042..045 |
| BE-FIN-004..012 | Financial status, evidence, discrepancy | Section 10 | AD-AC-034..038 |
| BE-FIN-013..016 | Granular delegated report preparation/edit/submission boundaries and versioned actor context | Sections 4, 6.6, 10 | AD-AC-034, 035 |
| BE-PAY-005, 006; BE-PRM-001..003 | Simulated payments and premium | AD-MOD-08 | AD-AC-039, 041 |
| BE-REP-005, 008 | Reputation limits, adjustment | AD-MOD-07 | AD-AC-040 |
| BE-BIZ-004, 005, 008 | Business lifecycle, publish validation, unpublish | AD-MOD-04, Section 9.1 | AD-AC-029..031 |
| BE-CLI-001, 002, 004, 007 | Two clients, contract, tolerance, frontend PENDING | Sections 2, 15 | AD-AC-057 |
| BE-TST-001, 002, 003, 006, 007, 008, 010 | Test requirements | Section 16 | AD-AC-002, 016, 042..052 |
| BE-NTF-001..006 | Notifications | AD-MOD-09, Section 7.6 | AD-AC-061 |
| BE-ROL-006..012; BE-BIZ-013..018 | Business roles, scoped grants and Founder authority boundary | Sections 1, 4, 9, 12 | AD-AC-003, 029 |
| BE-DLR-009..013; BE-NEG-006..009; BE-AGR-003..005 | Deal-specific delegation and non-delegable final confirmation | Sections 4, 6.5, 9 | AD-AC-003, 032 |
| BE-MSG-005..020; BE-SEC-009..014 | Unified Messaging authorization, no default Admin access, isolation and formal-action separation | Sections 4, 6.5, 9, 12 | AD-AC-003, 032 |
| BE-AUD-004..007 | Business-role, delegation and messaging security audit boundaries | Section 11 | AD-AC-043, 044 |
| BE-GEN-001..022 | Cross-cutting authority, revocation and isolation | Sections 2, 11, 12 | AD-AC-020, 058 |
| BE-AC-032, 035, 036, 038, 043, 047, 048 | Backend acceptance criteria relevant to Admin separation and confidentiality | Section 16 | AD-AC-001..003, 012, 029, 032, 043 |

---

## 21. Definition of done

A module is done only when every item below that applies to it is recorded with evidence. Nothing is described as verified, tested or production-ready without evidence.

### 21.1 Functional
- [ ] Every requirement of the module has an outcome: implemented and tested, gated with the decision named, or not built with a recorded reason.
- [ ] Every acceptance criterion allocated to the module passes with recorded results, or is recorded as gated with its decision.
- [ ] State transitions in Sections 7 to 10 behave exactly as specified; no other transition exists.
- [ ] No operation exists for any row of Section 4 marked "Never".

### 21.2 Security
- [ ] Server-side authorisation tested for every Admin operation (AD-AC-002, 003).
- [ ] Evidence privacy and cache tests pass (AD-AC-018, 051).
- [ ] XSS, injection, CORS, CSRF (if applicable) and header tests pass (AD-AC-046..050).
- [ ] No secret, token or sensitive value in logs or audit (AD-AC-044).
- [ ] Admin security documentation (BE-ADM-017) is approved by the owner.

### 21.3 Integration
- [ ] The Admin contract sections are approved before the Web Admin builds against them.
- [ ] Contract tests pass (AD-AC-057).
- [ ] The mobile-to-Admin end-to-end test passes on a physical Android phone and a desktop browser (AD-AC-021).
- [ ] No legacy code, dependency or data is present.

### 21.4 Documentation
- [ ] DOC-01: this specification is approved by the owner and its PENDING items are resolved or explicitly carried.
- [ ] DOC-02: the OD-10 inventory is approved and recorded.
- [ ] DOC-03: Admin security documentation required by OD-03 is complete and approved.
- [ ] DOC-04: Database_Design.md and API_Contract.md reference Sections 11, 15 and 20.
- [ ] DOC-05: change requests CF-2 and CF-8 are recorded against v2.1 and the Mobile Roadmap.

### 21.5 Testing
- [ ] Test evidence records build identifier, environment, tester, date and result; physical runs record device model and OS version.
- [ ] The R1 regression suite passes without R2 or R3 modules (AD-AC-058).
- [ ] An independent human countersign of the specification chain is recorded (BC-18).

### 21.6 Release
- [ ] The R1 candidate includes the R1 REQUIRED items and exactly the CANDIDATES the approved inventory includes.
- [ ] Release scope and name are approved (G-07).
- [ ] No claim of development authorisation exists outside G-10.

---

## 22. Open questions

| ID | Question | Blocking effect |
|---|---|---|
| AQ-01 | Decision Register Revision 6 is the current authority; what later formally issued revision, if any, supersedes it? | Reconcile only when a later authoritative register is supplied |
| AQ-02 | Who approves G-10 and authorises development? | Whole document remains a draft |
| AQ-03 | How is JWT reconciled with the P0/P1 prohibition for the browser-based Web Admin (OD-08)? | AD-MOD-00; Section 12 cannot be finalised |
| AQ-04 | How are Admin accounts provisioned, including the first on a fresh database, and how is one disabled (OD-09, AD-DEC-04)? | No Admin can exist; AD-AC-001, 008 gated |
| AQ-05 | What is the Admin session design and elevated authentication (OD-11, G-03, G-05, DEC-038)? | AD-AC-007, 010, 049 gated |
| AQ-06 | What is the approved minimum R1 Admin inventory (OD-10)? Is user suspension included (AD-DEC-09)? Is a Business approval gate mandatory (DEC-031)? | All R1 CANDIDATE modules; AD-BIZ-001 |
| AQ-07 | Which frontend technology and design system will the Web Admin use (OD-12)? | Section 14 refinement |
| AQ-08 | What is the Admin origin, hosting and non-production environment (OD-06)? | CORS, hardening, device-to-Admin tests |
| AQ-09 | What are the reason-entry rules (AD-DEC-05) and may internal-only notes exist? | AD-WF-003 completeness |
| AQ-10 | May a rejected applicant resubmit, and what happens to a pending request of a suspended applicant (AD-DEC-02)? | Workflow state model |
| AQ-11 | What does Escalate do (AD-DEC-01)? | AD-MOD-05 and AD-MOD-13 |
| AQ-12 | Is any exceptional, purpose-limited Admin review of private conversations ever required, and which Business fields may Admin see in governance review (AD-DEC-03, AD-DEC-06)? Default private-message access is none and no moderation feature is approved. | AD-BIZ, AD-PRM-010, 016 |
| AQ-13 | What are audit retention, archival and export rules (BE-DEC-14, AD-DEC-07)? | Section 11 |
| AQ-14 | What are the evidence storage approach, size limits and retention (OD-05, BE-DEC-05, AD-DEC-10)? | AD-MOD-03 |
| AQ-15 | Which events notify, and does a verification decision notify (DEC-009)? | AD-AC-061 |
| AQ-16 | How many Admin users exist, and will multiple Admin grades be required (BE-ADM-011)? | Section 4 hierarchy; concurrency |
| AQ-17 | What are the approved metric definitions and thresholds (DEC-040, DEC-015)? | Section 13 |
| AQ-18 | What is the Web Admin language and accessibility target? | AD-UX-005, AD-UX-016 |
| AQ-19 | Will an independent countersign of the specification chain be provided (BC-18)? | Definition of done |

---

## 23. Final document status

This document is a DRAFT specification (Edition 0.3). It has not been approved. It does not authorise development, scaffolding, installation, testing or deployment. Exactly five decisions are APPROVED in Decision Register Revision 6: G-00, G-01 / DEC-046, OD-03, OD-07 and the approach of OD-01. OD-03 requires minimum Web Admin functionality in Release 1 including Tier 1 verification review; the exact inventory (OD-10) remains PENDING. G-07, G-10, DEC-010, DEC-042, BR-DEC-001..012, MSG-DEC-001..013 and every R1 CANDIDATE, R2/R3 allocation, session design, Admin provisioning method, frontend technology, Business approval gate, exceptional conversation-review policy and metric definition remain PENDING, NEEDS VERIFICATION or UNKNOWN. No Admin interface, backend, database or API implementation is claimed. This edition was reconciled with Backend Functional Specification Edition 0.4-DRAFT, corrected Mobile Specification internal Edition 2.2 and Decision Register Revision 6; Roadmap Edition 0.2 remains historical/provisional only. No independent review has been performed.

ADMIN-DASHBOARD-SPEC-DOC3-0.3-DRAFT-END-MARKER

**END OF DOCUMENT - Admin_Dashboard_Specification.md**
