# VAULT VENTURES — MOBILE FUNCTIONAL MASTER SPECIFICATION
### React Native (Expo) Mobile Application — Authoritative Functional Requirements Reference

**Edition:** Mobile Functional Master Specification **2.2-DRAFT (reconciled content retained in the v2.1 physical filename)** (supersedes internal Edition 2.1-DRAFT; derived from *Master Project Specification v1.1* and reconciled to Decision Register Revision 6)
**Status:** DRAFT — **pending stakeholder approval of the items marked *PENDING USER APPROVAL* in Section 19.** Not yet a baseline.
**Document type:** **Functional specification only.** It states WHAT the application must do, WHO may do it, WHAT data is required, WHAT happens after each action, WHICH business rules and validations apply, HOW the mobile and separate Web Admin clients interact with the approved Node.js + Express.js REST backend, and which errors, edge cases and security restrictions apply. It contains **no application code, no scaffolding, no migrations and no UI/UX design prescription**, and it **authorises no development**.
**Design boundary:** This document does **not** prescribe the mobile visual design (colours, typography, spacing, layouts, components, icons, animation, navigation appearance). Antigravity designs the UI/UX freely, but may not change functional behaviour, permissions, validation, data requirements, security rules or business workflows for visual convenience (ARC-008, MOB-104). Legacy visual references are kept only in **Appendix M** as "Historical design reference only. Not a mobile UI implementation requirement."
**Date prepared:** 15 November 2026
**Currency convention:** All monetary values are Bangladeshi Taka (BDT, ৳) with South Asian digit grouping (e.g., ৳5,00,000), per Phase 2 Prompt (P2) "Currency & Localization Requirement".
**Evidence convention:** Statements about the old Laravel platform come from the *Phase 1 Audit Report* (AUD), which is a **static, read-only legacy review**. Every such finding is **LEGACY AUDIT REFERENCE — NOT THE CURRENT APPROVED ARCHITECTURE**. It may inform requirements and defects not to repeat, but it is not implementation evidence for the new Node.js system. **No statement in this document claims runtime verification of the new system.**
**Approved architecture and development environment:** React Native · Expo · TypeScript mobile client; Node.js · Express.js backend; fresh MySQL database; REST; JWT-based authentication family; separate Web Admin Dashboard; Antigravity or VS Code; testing on a **physical Android phone** without requiring Android Studio (G-00, G-01, OD-03, OD-07). Exact Expo details and JWT/session/token design remain pending under G-02/DEC-022, G-03/DEC-003, G-05/DEC-053, OD-08 and OD-11.
**Evidence labels used throughout:** **FACT** (audit- or source-evidenced; static) · **ASSUMPTION** (default adopted from a source, unconfirmed) · **PROPOSAL** (engineering proposal; never a business rule) · **PENDING USER APPROVAL** (unresolved decision). No proposal is treated as approved.

---

## Change Log — Edition 2.0 → 2.1 (concise)

### Edition 2.1 → 2.2 reconciliation (18 November 2026)

- Replaced active Laravel/Sanctum integration assumptions with the approved independent Node.js + Express.js, fresh MySQL, REST and JWT-family architecture (G-00, G-01, OD-07); retained all Laravel audit material as legacy evidence only.
- Moved Admin delivery out of the mobile application into the approved separate Web Admin Dashboard and identified minimum necessary R1 Admin support, including Tier 1 verification review, as required but inventory-confirmation-gated by OD-10 (OD-03).
- Added Business-scoped Professional membership, roles, granular permissions, Deal-specific Finance Manager delegation, Team Workspace and revocation requirements, traceable to BR-DEC-001…012 (all PENDING).
- Added Unified Messages, Hiring Chat, Business Team Chat, retained Deal Room Chat, Finance Manager–Investor communication, safe previews/search/unread/notifications and revocation security, traceable to MSG-DEC-001…013 and DEC-010 (all PENDING).
- Preserved all existing requirements, the four disclosure stages, the exact eight Deal states, two-sided versioned NDA acceptance, Founder-only final Founder-side approval, independent Investor confirmation, simulation-only finance and AI authority boundaries. No implementation or test result is claimed.

**Purpose of this edition.** One consolidated correction pass, driven by the *Final Independent Review Report* (F-01 … F-24) and by the owner's brief: convert the specification into a **functional** master specification that preserves all web functionality and business rules, removes binding visual design, and adds feature-level functional detail. Nothing was rewritten wholesale; requirement IDs are preserved and every wording change is logged (Appendix D.2).

**1. What was corrected**
- **Status over-grading (F-03):** 45 rows regraded from *IMP* to *PAR*/*UNV* where the audit evidences only the domain, not the rule (Appendix D.2). *IMP* now means the audit names the specific capability the row describes.
- **R1 gates and release naming (F-04, F-06, F-02, F-12):** "Mobile MVP" renamed **Mobile Release 1**, with an explicit statement that it is **not** the MPS MVP (§4.4); R1 gates rebuilt from the decisions R1 rows actually cite (§21.2); promoted DEC-022 and DEC-047 to P0; combined release values split into single-valued rows (Appendix F.2); N/A added to the legends.
- **Traceability (F-05, F-08, F-11):** item-level matrix for all **21 MPS §25.1 Must-Have items** plus MPS §7, §25.2 and §27 (Appendix K); preservation claims narrowed (§1.2); all wording changes logged (Appendix D.2).
- **Mobile technical gaps (F-07, F-09, F-10, F-14):** React Native/Expo integration constraints (§5.4); email-verification and password-reset completion (AUTH-016/017, DEC-052); session lifetime, re-authentication and multi-device policy (AUTH-018/019, DEC-053); dependency sequencing and critical path (§17.3).
- **Acceptance and clarity (F-13, F-15, F-16, F-17…F-24):** acceptance criteria for every R1 requirement group (AC-020 …); unsourced cells and AI priorities flagged; unverified share stated (§1.6); normative-row designations (§1.7); observable conditions for vague rows.
- **Feature-level functional detail:** 33 feature specifications covering purpose, roles, preconditions, inputs, behaviour, rules, outputs, API dependencies, errors, security, acceptance criteria, status/evidence and release (Appendix J).

**2. Review findings addressed:** all 24 (F-01 … F-24). F-01 and F-02 are decision/verification gates and remain open by nature; the other findings are corrected in the document. Per-finding resolution: **Appendix L**. Documentation defects are separated from genuine product decisions in **Appendix N**.

**3. What remains unverified.** Everything runtime: this specification rests on a **static** audit. **170 of 374 requirement rows (45%) are `UNV` and 81 are `PAR`** (computed on this edition); only 17 rows are `IMP` under the strict v2.1 definition, so most platform-capability statements remain unproven. The runtime verification backlog (Appendix H, H-01 … H-23) is a condition of baseline freeze (§1.6, NFR-E05). No claim of runtime verification, testing, deployment or production-readiness is made.

**4. Decision governance.** Decision Register Revision 6 is authoritative: exactly G-00, G-01 / DEC-046, OD-01 (approach only), OD-03 and OD-07 are APPROVED. All other unresolved decisions retain their Revision 6 status, including G-07, G-10, DEC-010, DEC-042, BR-DEC-001…012 and MSG-DEC-001…013. Older v2.1 decision briefs are historical where Revision 6 reframed them (§19.0).

**5. Legacy visual design instructions made nonbinding.** Direction G (Charcoal + Copper) and its hex tokens (ARC-008, MOB-092, DEC-029, CONF-15); retired Navy/Cyan tokens (P0 line 221, P1 line 346); bottom tab bar, drawers, stacked card rows, three-pane collapse (MOB-001, DLR-004, ADM-017); gold-shield/icon/tint rules (PRO-008, VER-007); chips, badges, steppers, segmented controls, status dots, gauges and chart palettes (VER-008, BIZ-007/008/009, DSC-006/007, DLR-003, NEG-003, MIL-010, INV-005/008/009, FIN-010, PTF-002, DSH-001/004/005, AI-007); loading-skeleton, modal-vs-screen, banner, no-confetti and no-infinite-scroll rules (DIS-015/016, DLR-009, DSC-008, PERF-002); screen-layout language in §18. Each now states only the functional intent; the original references are preserved in **Appendix M**.

---

## Contents

1. Document Control & Conventions
2. Source Register, Evidence Basis & Access Report
3. Project Overview & Objectives
4. Scope, Boundaries & Release Structure
5. Platform Context & Architecture Constraints (incl. §5.4 Development environment and Expo/React Native integration constraints)
6. User Roles & Permissions
7. Feature Baseline (Audit-Classified)
8. Functional Requirements (8.1–8.15)
9. Business Workflows
10. Investment Model, Payments, Commission & Premium (Simulated)
11. AI Requirements (Deterministic Scoring and Gemini Insights)
12. Mobile-Specific Requirements (incl. functional navigation, MOB-100…104)
13. Security, Privacy & Compliance Requirements
14. API Integration Requirements
15. Non-Functional Requirements: Performance, Reliability & Load Testing
16. Quality Assurance & Test Requirements
17. Dependencies & Assumptions (incl. §17.3 sequencing and critical path)
18. Mobile Functional Access Points (Screen Inventory — functional, not visual)
19. Decisions Register (Prioritised; Options; Briefs; PENDING USER APPROVAL)
20. Contradictions & Conflicts Register
21. Acceptance Criteria & Release Plan

**Appendices**
A. Glossary & Abbreviations
B. Audit Evidence Register (including audit-observed defects)
C. Preservation Ledger (MPS → this document)
D. Status & Wording Change Ledgers (D.1 v1.0 → v2.0; D.2 v2.0 → v2.1)
E. Correction Log (Edition 2.0 review findings R-01 … R-24)
F. Proposed Release Allocation by Requirement Group (incl. F.2 split rows)
G. MPS Section-Numbering Map (v1.0 vs v1.1)
H. Static-Audit Verification Backlog (H-01 … H-23)
I. Document History & Approval Block
J. Feature Functional Specifications (FEAT-001 … FEAT-033)
K. Item-Level Traceability (MPS §25.1, §7, §25.2, §27; brief §3 coverage checklist)
L. Final-Review Findings Resolution (F-01 … F-24)
M. Nonbinding Legacy Design References
N. Documentation Defects vs Product Decisions vs Verification Items

---

## 1. Document Control & Conventions

### 1.1 Purpose
Rebuild the web-oriented *Vault Ventures Master Project Specification v1.1* (MPS) into a complete **functional** specification for a **native React Native (Expo) mobile application**, preserving the business requirements, roles, workflows, investment rules, AI rules and payment/commission statements of the source set, while adding mobile-specific functional requirements and making every gap, contradiction and unresolved decision explicit.

Edition 2.0 corrected Edition 1.0 against the independent review (R-01…R-24) and the Phase 1 Audit Report. **Edition 2.1** applies the *Final Independent Review Report* (findings F-01…F-24, FRR) and the owner's brief: it is functional, not visual, and adds feature-level functional detail (Appendix J) and item-level traceability (Appendix K).

### 1.2 Preservation guarantee
- The original `Vault_Ventures_Master_Project_Specification.md` and all other uploaded files were **read only**; none was modified. Integrity references, re-computed during preparation of this edition and matching Edition 1.0:
  - `Vault_Ventures_Master_Project_Specification.md` SHA-256: `deab874c53e9fc8aa1f12c8a84aa2969e1020d07a6d5c9269acdf9a2bee48a1b`
  - `final_prompt.zip` SHA-256: `8b42fe01a8d69b208cc473f33cdaabeeac37668d0765c97ee56aebfa620aeb4c`
  - Edition 2.0 input file `Vault_Ventures_Mobile_Master_Project_Specification_v2.md` SHA-256: `ff72fb35f39bbed3c2b073f4aafadf85edc84c9bb65c5f1e29bd51fc6f75482d`
  - `Vault_Ventures_Mobile_Final_Review_Report.md` SHA-256 (as received for this edition): `d6f73a2b2672594c0134af6b52e13b1fd3663942a75767397f5c9fe92ce95ec9`
  - *(The review report states its own reviewed-file hash as `ff72fb35f39bbed3c2b073f4aafadf85edc84c9bb65c5f1e29bd51fc6f75482d`; it matches the Edition 2.0 file hash above.)*
- **No MPS Must-Have item has been removed from this specification.** Item-level proof for the 21 MPS §25.1 Must-Have items (and MPS §7, §25.2, §27) is in **Appendix K**; section-level preservation is in Appendix C. Where a requirement is adapted to mobile, the adaptation is recorded in Appendix C and every wording change in Appendix D.2. *(Narrowed in v2.1, review finding F-08: the claim rests on Appendix K, not on assertion.)*
- **All IDs defined in Edition 1.0 §§1–9 are retained** (verified by the final review). IDs defined only in the unavailable V1 §§10–21 (MOB/SEC/API/PERF/TST/SCR) **could not be checked** (SG-10). Wording or status changes are recorded in Appendices D.1 and D.2; **any wording change to a V1 requirement shall appear in Appendix D.2** (rule added in v2.1, review finding F-11). New IDs are added only where marked `NEW` or where a review finding required a clarification row.
- **No business rule has been invented.** Anything the sources do not define is `TBD` with a decision ID (`DEC-nnn`, Section 19). Where a review finding needs a business decision, this document lists the **options** and marks the item **PENDING USER APPROVAL**; it does not choose.
- Items labelled **PROPOSED** are engineering or release proposals and are never presented as business rules.

### 1.3 Requirement ID scheme
Format: `DOMAIN-NNN`, unique across the document.

| Domain | Meaning | Domain | Meaning |
|---|---|---|---|
| OBJ | Objectives | NEG / AGR / MIL | Negotiation / Agreement / Milestones |
| SCP | Scope | INV | Investment model & terms |
| ARC | Architecture constraints | FIN | Financial transparency & reporting |
| ROL | Roles & permissions | PTF | Investor portfolio / dashboard |
| AUTH | Authentication & account | REP | Reputation |
| PRO | Profiles | PRM | Premium (simulation) |
| VER | Identity verification | PAY | Payments & commission (simulated) |
| BIZ | Business / opportunity | NTF / MSG | Notifications / Messaging |
| DSC | Search & discovery | ADM | Admin |
| AI | AI components | DSH | Dashboards |
| DIS | Staged disclosure & NDA | MOB | Mobile-specific |
| CON | Interest / application / connection | SEC / PRV | Security / privacy |
| DLR | Deal Room & lifecycle | API | API integration |
| NFR / PERF / LOAD | Non-functional / performance / load | TST | Quality assurance |
| WF | Workflows | SCR | Mobile screens |
| AC | Acceptance criteria | REL | Release plan |
| CONF | Contradictions | DEC | Decisions |
| SG | Source gaps | DEP / ASM | Dependencies / assumptions |
| AUD-D | Audit-observed defect (Appendix B) | | |

### 1.4 Column legends used in requirement tables

**Pri. (Priority)** — `Must` / `Should` / `Future` mirror MPS §25.1 / §25.2 / §27. For rows with status `NEW`, and for any row without an MPS source (for example AI-020…AI-029, marked "(proposed)"), the priority is **proposed** (pending DEC-034).

**Status** — describes the *existing platform capability* (not the mobile client; every mobile screen is new work). Edition 2.1 uses these values:

| Code | Meaning (v2.1, strict — review finding F-03) |
|---|---|
| **IMP** | **Implemented (static)** — the Phase 1 Audit Report **names the specific capability the row describes**. *Static evidence only; not runtime-verified.* A row whose rule-level detail the audit does not evidence is **not** IMP. The audit's own qualifiers (e.g., "COMPLETE core / NOT RUNTIME VERIFIED") are carried in the row's Source cell and in §7.1 (review finding F-24). |
| **PAR** | **Partial** — the audit observed the domain or part of the capability, **or** observed it only in the uncommitted working tree, **or** observed UI without backend enforcement, **or** evidences the domain but not the rule-level behaviour stated in the row (regraded rows say so in their Source cell). |
| **MIS** | **Missing** — the audit explicitly states the capability is absent, unimplemented, or "not found". |
| **UNV** | **Unverified** — the audit neither confirms nor denies it. It may be claimed by a phase prompt (P0–P9), or it is only a requirement. It must not be treated as implemented. |
| **NEW** | **New Mobile Requirement** — exists only because the product is a native mobile app. For client-only rules (e.g., ARC-003) the Status reflects the server capability the rule relies on, if the row says so; otherwise NEW (review finding F-18). |
| **N/A** | **Not applicable** — a legal/compliance statement, future-scope statement, intent, or design-boundary statement that is not a platform capability (review finding F-12). |

*§7.1 records **domain-level** audit observations (for example "Deal Room: COMPLETE core"). A domain-level observation does **not** by itself grade the rule-level rows in §8 (review finding F-03).*

**Rel. (Release)** — **PROPOSED** release tier, all **PENDING USER APPROVAL** under DEC-034 (Section 4.4). **Each row carries exactly one value**; Edition 2.0 combined values (e.g., "R1 / R2") were split into separate rows with a `-A`/`-B` suffix (Appendix F.2).

| Code | Meaning |
|---|---|
| **R1** | **Mobile Release 1** candidate — **not** the MPS MVP (§4.4, DEC-054) |
| **R2** | Later release 2 |
| **R3** | Later release 3 |
| **PA** | Cannot be allocated until a stakeholder decision is made (Section 19) |
| **N/A** | Not scheduled work (statement, intent or design boundary) |

**Source references** — abbreviations in Section 2.1. MPS `§` numbers use **v1.1 numbering**; Appendix G maps pre-insertion (v1.0) numbers cited by P1–P3.

### 1.5 Normative language
"**Shall**" = mandatory. "**Should**" = recommended. "**May**" = optional. Rows are written in "shall" form unless Priority says otherwise.

### 1.6 Evidence-integrity rules (new in Edition 2.0)
| ID | Rule |
|---|---|
| NFR-E01 | A capability shall be marked `IMP` only if the audit **names the specific capability the row describes** (rule-level evidence). Domain-level observations are recorded in §7.1 and do not grade rule-level rows; phase-prompt claims alone yield `UNV` (strengthened in v2.1, review finding F-03). |
| NFR-E02 | No status in this document shall be described as "runtime-verified", "tested", "deployed" or "production-ready". The audit states that no runtime verification, browser audit, query profiling, migration execution or load benchmark was performed, and that automated suites were not re-run. |
| NFR-E03 | Legacy `IMP`/`PAR` statuses describe only the historically audited Laravel working tree and are not evidence for the new system. The independent Node.js backend receives its own repository and baseline when separately authorized; no legacy commit is pinned or reused (G-01 / DEC-046). |
| NFR-E04 | Where the audit contradicts an MPS requirement, MPS remains the requirement (MDP §23) and the deviation is recorded in Section 20; it is not silently adopted as a new business rule. |
| NFR-E05 | **Unverified share (review finding F-16).** **170 of 374 requirement rows (45%) are `UNV` and 81 are `PAR`** (computed on this edition); only 17 rows are `IMP` under the strict v2.1 definition, so most platform-capability statements remain unproven. Approval of this document as a baseline means approving a document in which a large share of platform capability statements is unproven. **Completion of H-01…H-06 is a condition of baseline freeze**; the full backlog (H-01…H-23) governs any later upgrade of a status. |
| NFR-E06 | **Change-logging rule (review finding F-11).** Any wording change to a requirement carried over from Edition 1.0, and any status or release change, shall appear in Appendix D.2. Extensions of a business rule are flagged **"proposed clarification — pending approval"** and never presented as approved. |
| NFR-E07 | **No visual prescription (owner instruction).** No requirement in this document shall prescribe colours, typography, spacing, layouts, component styles, icons, illustrations, animation or navigation-bar appearance. Visual material from the legacy sources appears only in Appendix M and is nonbinding. |


### 1.7 Normative-row designations (review finding F-17)
Where one rule is stated in several rows, **one row is normative**; the others cross-reference it and shall not be edited independently.

| Rule | Normative row | Cross-referencing rows |
|---|---|---|
| Session expiry vs transient failure handling | AUTH-012-D | MOB-010, AC-002, API-003 |
| Credentials/session material in OS secure storage | MOB-011 | SEC-006 |
| Sensitive screens obscured in the OS app-switcher snapshot | MOB-012 | SEC-009 |
| Push payloads are generic | NTF-003 | SEC-008 |
| Server is the sole authority for stage, status, role, tier | ARC-003 | ROL-001, SEC-002, API-004 |
| No demo/locally generated match explanations | AI-013 | DSC-006, DEP-016, AC-009 |

### 1.8 Verified facts, assumptions, proposals and decisions
| Label | Meaning | Where it appears |
|---|---|---|
| **FACT** | Stated by a source document or the static audit; *not* runtime-verified | Source cells; §7; Appendix B |
| **ASSUMPTION** | Default adopted from a source or by engineering convention, unconfirmed (ASM-*) | §17.2; rows marked "assumption" |
| **PROPOSAL** | Engineering proposal; not a business rule (e.g., release allocation, performance targets, recommended options in §19) | Rows marked PROPOSED; §19.1 |
| **PENDING USER APPROVAL** | Unresolved decision (DEC-*); no option is selected by this document | §19 |

---

## 2. Source Register, Evidence Basis & Access Report

### 2.1 Sources and abbreviations

| Abbr. | Document | Format | Access | Reading depth | Reliability notes |
|---|---|---|---|---|---|
| **MPS** | Master Project Specification v1.1 | .md | Accessed | Read in full in Edition 1.0; Edition 2.0 re-read §§8–10, 12, 24, 25, 28–31, update notes | Authoritative product/business source (MDP §23). |
| **ILS** | Investment Logic & Profit/Loss Transparency Specification | .pdf | Accessed | Read in full in Edition 1.0; discrepancy vocabulary re-checked | Authoritative for investment logic. "৳" extracts as "■" (font issue only). |
| **UXP** | UI/UX Design PRD (Direction G — Charcoal + Copper) | .md | Accessed | Read in full (hex-token table summarised); §11–12 re-read | Authoritative for **functional UX rules only** (stage gating, trust labelling, workflows). Its visual/design content (§1–§2, §8, §11, §14) is **web-responsive, not native, and nonbinding for mobile** (owner instruction; Appendix M). |
| **MDP** | Master Development Prompt | .md | Accessed | Read in full; §23 re-read | Process authority; defines conflict-resolution order. |
| **P0** | Phase 0 — Foundation | .md | Accessed | Selective; stack lines re-verified | Prescribes Laravel 12 / PHP 8.3+ / PostgreSQL — **differs from audit-observed stack** (Section 5.1). Line 221 refers to palette tokens (confirmed stale; nonbinding — Appendix M). |
| **P1** | Phase 1 — Foundation & Authentication | .pdf | Accessed | ~85% | Sanctum SPA cookie auth; single role per account (default assumption, flagged ambiguous). |
| **P2** | Phase 2 — Profiles & Verification | .pdf | Accessed | ~75% | BDT convention; Tier 0/1/2 data model. States that if multi-role was implemented the conflict must be surfaced. |
| **P3** | Phase 3 — Business & Opportunity Mgmt | .md | Accessed | Full | **Self-declared reconstruction** (30–50% inferred). Lower confidence. |
| **P4** | Phase 4 — Search, Filtering & Discovery | .pdf | Accessed | Full | Reliable. |
| **P5** | "Phase 5 Implementation Prompt FINAL" | .pdf | Accessed | Full | **Not a Phase 5 spec** — an instruction to *update* it (SG-02). |
| **P6** | Phase 6 — Trust, Staged Disclosure, NDA & Security | .md | Accessed | ~60% | Updated for the Investment Model boundary. |
| **P7** | Phase 7 — Deal Room, Negotiation & Milestones | .md | Accessed | ~60%; lifecycle/chat lines re-verified | **Predates the Investment Model.** |
| **P8** | Phase 8 — Reputation (UPDATED) | .md | Accessed | ~55%; cancelled-deal rule re-verified | Premium removed from scope. |
| **P9** | Phase 9 — Admin (UPDATED) | .md | Accessed | ~55% | Adds Investment & Financial oversight; assumes data P7 does not define. |
| **AUD** | Vault Ventures Phase 1 Audit Report | .md (text) | Accessed | Read in full | **Static, read-only.** No runtime, browser, query-plan, migration or load evidence. `.env` deliberately not inspected. Working tree dirty. States the MDP and ILS were "NOT AVAILABLE" to it, although both are in the ZIP. |
| **RVW** | Independent Review Report of Edition 1.0 | .md / Doc | Accessed | Read in full | Source of findings R-01 … R-24. |
| **V1** | Mobile Master Spec Edition 1.0-DRAFT | .md | Accessed (§§1–9 only in the received text) | §§1–9 | **§§10–21 and appendices of V1 were not present in the received text** (review finding R-01). This edition regenerates them from the sources; where V1 IDs referenced in §§1–9 pointed into the missing text, the meaning is taken from the V1 usage and flagged "meaning inferred from V1 usage". |
| **V2** | Mobile Master Spec Edition 2.0-DRAFT | .md | Accessed | Read in full | The base document corrected by this edition. Its SHA-256 is recorded in §1.2. |
| **FRR** | Final Independent Review Report of Edition 2.0 (findings F-01…F-24; score 7.5/10; APPROVED WITH CONDITIONS) | .md | Accessed | Read in full | Correction checklist for this edition. **Self-disclosed:** produced by the same assistant that wrote V2; a human or separately-sourced reviewer should countersign (FRR §2.3). Its technical statements on Expo/Sanctum are general knowledge, not verified. |
| **BRF** | Owner brief for v2.1 ("FINAL TASK — Mobile Functional Master Specification v2.1") | text | Accessed (this conversation) | Read in full | Highest-precedence instruction (MDP §23 item 1): functional specification; no visual design; intended environment React Native/Expo/TypeScript/Antigravity or VS Code/physical Android/no Android Studio. |

> **Reading-depth disclosure.** "Selective/targeted" means requirement-bearing sections were read (scope, boundaries, ambiguities, data, API, authorisation, update notes) and specific claims were confirmed by text search. Boilerplate (Git, build verification, reporting formats) was not exhaustively read. No requirement is asserted from an unread portion. Edition 1.0's wording "every business requirement ... of the source set" is therefore narrowed here: **MPS and UXP requirements are fully preserved; P1–P9 requirements are preserved to the depth stated above** (review finding R-10).

### 2.2 Source gaps and inaccessible inputs

| ID | Gap | Impact | Handling in this document |
|---|---|---|---|
| **SG-01** | *(Edition 1.0)* Code Audit Report not provided. **Now partly resolved:** the Phase 1 Audit Report was supplied. | Statuses can now be classified against audit evidence. The audit is **static**; nothing is runtime-verified. | Statuses re-classified (Section 7, Appendix D). Residual limit recorded as SG-08. DEC-001 closed (Section 19). Owner to confirm AUD is the intended "Code Audit Report". |
| **SG-02** | The Phase 5 requirements document is absent (the PDF is an update instruction). | Readiness weights/thresholds/bands, match-explanation shape, recommendation API and Phase 5 data model are unknown beyond MPS §8–§10 and later references. The audit does record that readiness scoring and matching are implemented deterministically. | AI requirements rely on MPS §8–§10, UXP §8 and audit observations; unknowns are `TBD` (DEC-015). |
| **SG-03** | P3 is a reconstruction. | Business-entity details have lower confidence. | Business requirements trace to MPS/UXP first; audit observations are used for status. |
| **SG-04** | No Phase 10 document (Testing, Security Review, Optimisation, Deployment). | No source defines release, deployment or load criteria. The audit's Section 10 ("Load-test preparation") supplies preparation guidance only. | Performance/load targets in Section 15 remain **PROPOSED** (DEC-025). |
| **SG-05** | The original Project Proposal is not in the upload. | Original intent behind some rules cannot be re-checked. | MPS is treated as the single source of truth it declares itself to be. |
| **SG-06** | No source defines payment gateways, payout methods, commission rate selection, premium pricing, notification events, chat design or any mobile requirement. | These are decisions, not facts. | `TBD` + DEC IDs. |
| **SG-07** | No existing mobile artefacts, device matrix, store plans or analytics requirements. | Mobile requirements are entirely derived. | `NEW` / PROPOSED. |
| **SG-08** | *(new)* The audit is static: no runtime verification, browser audit, query profiling, migration execution, or load benchmark; automated suites not re-run; working tree dirty; `.env` not inspected. | Every `IMP`/`PAR` status is unproven at runtime. Production headers, cookies behind HTTPS, proxy trust, CSP, TLS, storage ACLs are unverified. | NFR-E01…E04; Appendix H lists what runtime checking must prove. |
| **SG-09** | *(new)* The audit is silent on several MPS Must-Have items (e.g., Investment Type selection and per-deal return-model terms, discrepancy status vocabulary, Tier 2 promotion, NDA withdrawal/expiry). | Cannot be classified `IMP`/`MIS`. | Classified `UNV`; listed in Appendix H. |
| **SG-10** | *(new)* Edition 1.0 §§10–21 and appendices were not available to this edition (review finding R-01). | The V1 text of Sections 10–21 cannot be diffed. | Regenerated from the sources; appendices rebuilt (Appendices C–F). |
| **SG-11** | *(new)* No repository access and no runtime in this work: statements about Expo, React Native and Laravel Sanctum mobile behaviour are **general engineering knowledge**, not verified against current vendor documentation or a proof of concept. | Feasibility of mobile authentication, push, uploads and native capabilities is unproven. | Recorded as risk flags/criteria (§5.4, DEC-022, DEC-003); proof of concept required (TST-006, H-23). |

### 2.3 Source precedence (MDP §23) and how it is applied
Priority order when sources conflict: **(1)** explicit current user instruction; **(2)** MPS; **(3)** approved Design PRD (UXP); **(4)** existing working implementation; **(5)** general engineering best practice. "Never silently pick an interpretation when sources conflict — surface it."

| ID | Rule applied in this document |
|---|---|
| NFR-S01 | Existing implementation (AUD) is **evidence of current status**, not a source of business rules (precedence 4 < 2). |
| NFR-S02 | Where AUD shows behaviour that differs from MPS (e.g., LLM-generated insights vs MPS §8 "deterministic, rule-based"), the difference is recorded in Section 20 and, where a business decision is needed, in Section 19; MPS stays the requirement until a stakeholder approves a change. |
| NFR-S03 | `PROJECT_CONTEXT.md` and early `IMPLEMENTATION_LOG.md` entries are treated as **historical** (AUD §3: they contradict current code). They are not used as authority for current status. |
| NFR-S04 | The audit's statement that the Master Development Prompt and Investment Logic Specification were "NOT AVAILABLE" is a limitation of the audit's input set; both documents exist in `final_prompt.zip` and are used here (review finding R-20). |

---

## 3. Project Overview & Objectives

### 3.1 Overview (preserved from MPS §1–§6)
Vault Ventures is an AI-powered platform unifying **Idea, Capital, and Skills**. It connects **Founders**, **Investors** (Large and Small/Micro), and **Skilled Professionals**, governed by **Admin**. It offers search and advanced filtering, an explainable rule-based scoring layer (Readiness Score, Matching Engine, AI Suggestions), staged information disclosure, an NDA workflow, a Deal Room, a two-mode Investment model (Micro: Profit/Loss Sharing; Large/Standard: Equity/Ownership), a financial transparency and reporting layer, milestone-based **simulated** investment, tiered verification, reputation, premium (simulated), and an Admin governance centre. The MVP is an **academic prototype / simulation**, not a licensed financial platform (MPS §30).

### 3.2 Objectives

| ID | Objective | Source |
|---|---|---|
| OBJ-001 | Deliver a **native React Native** application (iOS and Android) giving Founders, Investors and Skilled Professionals access to every MPS Must-Have capability that is in the agreed mobile release scope (DEC-034). | MPS §25.1; user brief |
| OBJ-002 | Preserve all existing business rules, workflows, investment logic and commission/payment statements unchanged; mobile adaptations may change *presentation and interaction*, never *business logic*. | MDP §1, §23 |
| OBJ-003 | Keep the **approved Node.js + Express.js REST backend as the sole authority** for access decisions, Business permissions, stage/state transitions, calculations and scoring; the mobile and Web Admin clients render and submit, they never decide. The legacy Laravel platform is reference-only and is not integrated. | G-00; G-01; MDP §9, §12; P6 §F; P7 |
| OBJ-004 | Preserve trust UX on small screens: explainable scores, locked-state content, persistent Risk/Disclosure and "Simulated" labelling. | UXP §8, §9, §14 |
| OBJ-005 | Provide a secure native session model (**without weakening the existing web security controls**), safe handling of identity and confidential documents on personal devices, and graceful behaviour on unreliable networks. | User brief; MPS §12; AUD §6, §8 |
| OBJ-006 | Make unresolved product, legal and platform decisions explicit, prioritised and approvable before build. | User brief |
| OBJ-007 | Remain within the prototype/simulation boundary: no real fund custody, escrow, equity transactions, payouts or guaranteed-return claims. | MPS §30; MDP §17 |
| OBJ-008 | *(new)* Keep every status claim traceable to audit evidence and never imply runtime verification. | NFR-E01…E04 |

### 3.3 Success metrics (preserved from MPS §32; mobile additions PROPOSED)
- End-to-end completion of each role workflow without error (MPS §32).
- Correct, explainable Readiness/Match output; correct stage-gating; Deal lifecycle Matched → Completed; correct Net Profit/Loss calculation; discrepancy flag → Admin review; Tier 0 → 1 → 2 progression; audit entries generated.
- **Mobile additions (PROPOSED):** crash-free session rate and performance targets in Section 15; zero confidential-data exposure defects in mobile security testing (Section 13).


---

## 4. Scope, Boundaries & Release Structure

### 4.1 In scope (mobile)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| SCP-001 | The mobile app shall implement client-side experiences for the **Must-Have** capabilities in MPS §25.1, allocated across releases per Section 4.4 (DEC-034). Allocating a Must-Have to a later release defers it; it does not remove it. | Must | NEW | R1 | MPS §25.1 |
| SCP-002 | The mobile app shall support global participant roles **Founder, Investor, Skilled Professional**, including accounts that hold more than one participant role (ROL-003), plus Business-scoped memberships and roles that never confer a global platform role (BRM-001…020). Admin is excluded from the mobile client by approved OD-03. | Must | NEW | R1 | MPS §5; UXP §3; G-00; OD-03; BR-DEC-001…012 |
| SCP-002-A | **Separate Web Admin Dashboard (corrected by approved OD-03).** Admin requirements are delivered through a separate web client using the shared Node.js + Express.js REST backend. Minimum necessary Admin functionality shall exist in R1, including Tier 1 verification review; the exact inventory is PENDING under OD-10. Admin accounts are never publicly self-registered. DEC-004 remains historically PENDING but cannot override OD-03 by placing Admin in the participant mobile app. | Must | NEW | R1 | MPS §5; OD-03; OD-10; DEC-004 |
| SCP-003 | The mobile app and separate Web Admin Dashboard shall consume the approved independent Node.js + Express.js REST API and shall not duplicate business logic client-side. No Laravel code, framework dependency, database structure or backend integration is reused. | Must | NEW | R1 | G-00; G-01; OD-03; OD-07 |
| SCP-004 | **Should-Have** items (Reverse Investment Discovery, portfolio dashboard, saved searches/alerts, basic dispute reporting, Deal Room scheduling, profile/reputation analytics) are specified but **not in the proposed MVP** unless approved (DEC-018). | Should | NEW | PA | MPS §25.2, §26 |

### 4.2 Out of scope / Future Scope (preserved from MPS §27, §30)
The mobile app shall **not** implement, scaffold, or imply any of: real investment processing or custody; financial-institution integration; real escrow; real equity transactions; real profit distribution/payout processing; automated KYC/AML; government ID integration; BSEC/regulatory registration; ML-based ranking; NLP pitch-deck analysis; advanced fraud/duplicate/misreporting detection; advanced dispute resolution; recommendation-fairness tooling; advanced data-leak detection; advanced retention analytics; third-party verification/audit services; an international marketplace. *(Each preserved from MPS §27.)*

> **Clarification (review finding R-05):** MPS §27 lists "NLP pitch-deck analysis" and "ML-based ranking" as Future Scope. The audit-observed Gemini integration generates structured *narrative insights* via an LLM provider (Section 11). Whether that is consistent with the Future-Scope exclusion is **not decided here** — see CONF-24 and DEC-042.

### 4.3 Legal & compliance boundary (preserved, MPS §30; MDP §17)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| SCP-010 | The app shall present every investment, milestone, commission, premium and profit/ownership figure as **simulated**, with a persistent, non-dismissible "Simulated" indicator (never tooltip-only). | Must | UNV | R1 | MPS §30; UXP §9, §14 |
| SCP-011 | The app shall display an explicit **simulation disclaimer** and require **Terms-of-Service acceptance** (unchecked by default) at registration. | Must | UNV | R1 | MPS §30; P1; UXP §7.1 |
| SCP-012 | The app shall never state or imply guaranteed profit, fixed return, guaranteed ownership, "risk-free", "safe", "guaranteed ROI", or fraud-proof/fully verified financial reporting. Prohibited-phrase list: §13.5. | Must | UNV | R1 | MPS §24, §30; UXP §13 |
| SCP-013 | NDA, Agreement and disclosure UI copy shall never claim legal enforceability. The Agreement view is labelled **"Recorded Agreement (Platform Simulation)"**. | Must | UNV | R1 | P6 §D; P7 §F; UXP §10 |
| SCP-014 | This specification is a product/business document, not legal or financial advice. Real-money deployment requires legal/compliance review (securities, taxation, custody, investor eligibility). | Must | N/A | N/A | MPS §15.9, §30; ILS §10 |

*(The audit did not review UI copy; SCP-010…013 are therefore `UNV` even though Edition 1.0 listed them as claimed by phase prompts.)*

### 4.4 Release structure — PROPOSED, PENDING USER APPROVAL (DEC-034, DEC-054)

> The release structure below is an **engineering proposal** to separate an initial mobile release from later releases and from items blocked on stakeholder decisions. It changes **timing only**; it removes no requirement (OBJ-001, SCP-001). All allocations are **PENDING USER APPROVAL**.

**Naming and relationship to the MPS MVP (review finding F-06).** MPS §25 defines the "MVP Scope" as the complete §25.1 Must-Have list of 21 items. Release allocation remains PENDING under G-07 / DEC-034 and DEC-054. OD-03 nevertheless requires the minimum necessary separate Web Admin functionality in R1; this does not approve the full Admin inventory. Mobile-plus-Web-Admin equivalence, not Admin-on-mobile parity, is the relevant system boundary.

| ID | Release | Proposed content (by requirement group; full allocation in Appendix F) | Rationale |
|---|---|---|---|
| REL-001 | **R1 — Mobile Release 1** | Authentication and multi-role session (AUTH, ROL, MOB session items); profiles (PRO); user-side verification submission (VER); business view, create/edit and documents (BIZ); discovery (DSC); readiness and match display (AI-display items); staged disclosure and NDA (DIS); interest/connection (CON); Deal Room, negotiation, agreement, milestones (DLR/NEG/AGR/MIL); basic in-app notifications and existing deal messaging (NTF-001, MSG); reputation view (REP); dashboards (DSH); security and privacy (SEC/PRV). | Backend capability is at least audit-observed for these areas (domain level). **Not** the MPS MVP. |
| REL-002 | **R2 — Later release 2 (PROPOSED)** | Investment Type and return-model screens; financial reporting/discrepancy functions; simulated payment/commission display; premium; push; portfolio; approved Should-Have items. | Allocation remains PENDING under G-07. New-backend functions require approved rules, implementation and verification; the legacy branch is not a dependency. |
| REL-003 | **R3 — Later release 3 (PROPOSED)** | Remaining Web Admin functions beyond the OD-03 minimum; saved searches/alerts; reverse discovery; Deal Room scheduling; analytics views. | Full scope remains pending under G-07 and OD-10; no Admin mobile client is planned. |
| REL-004 | **PA — PENDING USER APPROVAL** | Any item whose behaviour depends on an unresolved business rule (Section 19), e.g., commission rate, premium pricing, report cadence, cancel state. | Cannot be scheduled until decided. |

**Alternative allocations offered for approval (DEC-034):**
- **Option A (proposed above):** R1 excludes the investment/financial layer; R2 adds it after runtime verification. *Not MPS §25.1-equivalent until R3.*
- **Option B:** R1 contains **all participant-facing MPS §25.1 Must-Haves** (largest scope; depends on all `UNV` backend items being verified first); Admin follows. *MPS §25.1-equivalent only when the Admin dashboard item is also delivered.*
- **Option C:** Role-by-role release (e.g., Investor first, then Founder, then Professional), each with the full Must-Have set for that role. *Equivalent only when all roles and Admin are delivered.*

*Review findings R-09 and F-06 are addressed by this structure and by Appendix K.1; the choice remains with the stakeholders.*

### 4.5 Explicit non-goals carried forward
- **Off-platform bypass:** no message scanning, contact-detail blocking or surveillance (MPS §16.3; MDP §15). Retention is value-based; soft in-app nudges only (MPS §16.2).
- **No enterprise-grade infrastructure** (SOC2/SIEM) is required (MPS §12.3, §29). Mobile-specific hardening in §13 is proportionate to a prototype and flagged where optional.

### 4.6 Non-negotiable state and authority invariants

The disclosure stages remain exactly, in order: **1. Public Teaser; 2. Extended Information; 3. NDA-Protected Information; 4. Full Proposal.** No stage may be skipped. Stage 3 requires Tier 1 where applicable and two-sided acceptance of the same versioned NDA. Stage 4 requires explicit Founder confirmation. Unauthorized protected fields are omitted from API responses.

The Deal lifecycle remains exactly, in order: **1. Matched; 2. Interest Confirmed; 3. Deal Room Opened; 4. NDA Signed; 5. Negotiation; 6. Agreement; 7. Milestone Funding Active; 8. Completed.** No new state or bypass is introduced; G-08 sequencing details remain PENDING. A delegated Finance Manager may negotiate but cannot provide final Founder-side confirmation. The Founder and Investor independently confirm through the structured workflow. Chat never finalizes an agreement.

All investment, funding, milestone release, commission and premium behavior remains simulated. There is no real-money transfer, payment gateway or custody. AI never decides identity, permissions, NDA acceptance, disclosure, Deal transitions, agreement, investment approval or financial authorization; DEC-042 remains PENDING.

---

## 5. Platform Context & Architecture Constraints

### 5.1 Approved target architecture and legacy audit reference

| Target component | Approved direction | Governance |
|---|---|---|
| Mobile | React Native + Expo + TypeScript | G-00; detailed workflow/SDK choices remain G-02 / DEC-022 |
| Backend | Independent Node.js + Express.js | G-00; no Laravel code reuse or integration (G-01) |
| Database | Fresh MySQL | G-00, OD-07; no legacy migration |
| API | REST | G-00; exact contracts remain to be authored |
| Authentication | JWT-based family | G-00; token/session design remains G-03, G-05, OD-08 and OD-11 |
| Admin | Separate Web Admin Dashboard sharing the REST backend | OD-03; minimum necessary R1 functionality, exact inventory OD-10 |

> **LEGACY AUDIT REFERENCE — NOT THE CURRENT APPROVED ARCHITECTURE.** The table below records what the historical Phase 1 audit observed in the old Laravel platform. It is retained for evidence integrity and defect avoidance only. It does not describe an implemented, integrated or reusable backend for the new application.

> **Correction (review findings R-04, R-02):** Edition 1.0 repeated P0's stack (PHP 8.3+, PostgreSQL). The audit-observed stack differs. P0 is a *prompt*; AUD is *evidence of what exists*. Nothing in this document assumes PostgreSQL.

| Layer | Audit-observed (static) | Differs from P0? | Source |
|---|---|---|---|
| Backend framework | **Laravel 12 / PHP 8.2** | PHP: P0 says 8.3+ | AUD §2 (composer.json) |
| Authentication | **Laravel Sanctum, first-party cookie (SPA session) authentication**; bearer-token extraction disabled on the session guard; state-changing SPA routes use `RequireSpaSession` | Consistent with P0/P1 | AUD §2, §8 |
| Database | **MySQL-oriented migrations** | **Yes — P0 says PostgreSQL** | AUD §2 |
| Database behaviour | Foreign keys, composite unique constraints and indexes present; transactions and row locks (`lockForUpdate`) in key workflows; **database-backed cache locks** for AI generation | — | AUD §2, §6 |
| Backend structure | Form Requests, controllers, services, policies, resources, enums, Eloquent models | — | AUD §2 |
| Web client | React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router (lazy-loaded pages); shared API client with standardised API error handling | Newer major versions than the P0 list implies | AUD §2 |
| AI provider | **Single Gemini adapter** (`GeminiAnalysisProvider`), key from environment | Not in P0 (P0 specifies deterministic PHP services; Future ML out of scope) | AUD §7 |
| Production DB engine / PHP version actually deployed | **Not verified** (`.env` deliberately not inspected; no migration was run) | — | AUD §1, §6 |

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| ARC-020 | The Laravel/PHP/Sanctum stack described in the legacy table is **historical audit evidence only**. It shall not be treated as deployed or implemented evidence for the new Node.js system and shall not be used to derive the new API contract. DEC-041 is legacy-only/moot unless formally closed by the owner. | Must | N/A | N/A | G-00; G-01; AUD §2, §6; DEC-041 |
| ARC-021 | The mobile client shall be **independent of the database engine**; no mobile requirement shall depend on PostgreSQL- or MySQL-specific behaviour. | Must | NEW | R1 | R-04 |

### 5.2 Architecture requirements for the mobile client

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| ARC-001 | The mobile client shall be a **React Native + Expo + TypeScript** application. Development uses Antigravity or VS Code and physical Android-phone testing without requiring Android Studio. Detailed Expo workflow/SDK/native-module choices remain PENDING under G-02 / DEC-022. | Must | NEW | R1 | G-00; G-02 / DEC-022 |
| ARC-002 | The mobile client and separate Web Admin Dashboard shall integrate only with the independent Node.js + Express.js REST backend and shall never access MySQL directly. The legacy Laravel platform shall not be integrated or reused. | Must | NEW | R1 | G-00; G-01; OD-03; OD-07 |
| ARC-003 | All authorisation, Business permission evaluation, disclosure-stage resolution, state transitions, calculations and visibility decisions shall be made **server-side by the new backend**. Neither client shall compute or trust a client-derived stage, Deal status, milestone status, effective permission, role, or verification tier. Legacy audit evidence supplies design cautions only. | Must | NEW | R1 | G-00; G-01; MDP §9, §12; BR-DEC-005; MSG-DEC-006 |
| ARC-004 | A **single API client layer** shall handle auth, error-shape parsing, retries, pagination, and request cancellation; screens shall not call the network directly. | Must | NEW | R1 | MDP §8 |
| ARC-005 | Both clients shall implement the error/response contract authored for the new REST backend. No contract shall be extracted from legacy Laravel code as if it were the new implementation; useful legacy error patterns may be considered as non-authoritative reference. | Must | NEW | R1 | G-00; G-01; DEP-015 |
| ARC-006 | Authentication shall use the approved **JWT-based family**. Exact access/refresh token model, lifetime, rotation, revocation, secure mobile storage and Web Admin browser-session design remain PENDING under G-03 / DEC-003, G-05 / DEC-053, OD-08, OD-11 and DEC-038. This specification does not select them. | Must | NEW | PA | G-00; G-03; G-05; OD-08; OD-11 |
| ARC-007 | A **single centralised currency module** shall format all money as BDT (৳) with South Asian grouping (৳50,000; ৳5,00,000; ৳10,00,000); no hard-coded symbols in components; no multi-currency, currency selection or exchange rates; numeric values are exchanged as raw decimals, never pre-formatted strings. | Must | UNV | R1 | P2 Currency Req. |
| ARC-008 | **No mandatory mobile visual design system (owner instruction).** This specification does **not** prescribe colours, palettes, gradients, theme tokens, fonts, typography scales, spacing, shadows, radii, icons, illustrations, layouts, component styles, animation or navigation-bar appearance. The mobile UI/UX is designed independently by the design team (Antigravity). The design shall **not** change functional behaviour, permissions, validation, data requirements, security rules or business workflows for visual convenience (MOB-104). Legacy visual references are kept only as *Nonbinding Legacy Design References* in Appendix M. | Must | N/A | R1 | Owner instruction (v2.1 brief §2); review F-21; supersedes v2.0 ARC-008; DEC-029 superseded |
| ARC-009 | Mobile code shall be organised by domain modules that mirror the platform layers — Core Platform, AI, Trust & Security. | Should | NEW | R1 | MPS §28 |
| ARC-010 | Environment configuration (API base URL, feature flags) shall be externalised per build environment; no secrets, API keys or credentials shall be embedded in the app bundle. | Must | NEW | R1 | MDP §10; AUD §7–§8 (key from environment) |
| ARC-011 | The API version targeted by the app shall be explicit; the app shall handle "unsupported version / force update" responses (MOB-070). The existing API versioning convention is **unknown** and shall be confirmed from the repository (DEP-006). | Must | UNV | R1 | P1 |
| ARC-012 | The mobile client shall not call any AI provider directly and shall not embed provider keys. AI features are consumed only through the platform API (Section 11). *Edition 1.0 wording "no ML/NLP components referenced by the client" is replaced: the platform itself uses an LLM provider (AI-020…), which the client does not call.* | Must | NEW | R1 | MPS §8; AUD §7; CONF-24 |
| ARC-013 | All server-held files (verification IDs, business documents, financial evidence, agreements) shall be fetched only through authenticated, authorisation-checked API endpoints; the app shall never rely on unguessable or public URLs. | Must | IMP | R1 | P2; P6 §E; AUD §6 (dedicated storage services; document policies) |

### 5.3 Authentication governance — JWT family approved; detailed design PENDING

The authentication family is JWT-based (G-00). The new Node.js backend shall implement the eventual approved design independently. The following remain unresolved: access/refresh token split, token lifetimes, rotation, replay protection, revocation, logout semantics, multi-device behavior, native secure-storage details, browser-safe Web Admin session handling and re-authentication for sensitive actions. No browser-storage interpretation is approved; OD-08 remains PENDING. Mobile and Web Admin may use different safe session presentations within the JWT family if later approved.

The controls ARC-006-C1…C8 remain functional security requirements, reinterpreted for the new backend. ARC-006-C6 means that no insecure bearer-token exposure shall be introduced into browser contexts; it no longer instructs reuse of old SPA routes.

#### Legacy authentication analysis retained for history

> **LEGACY AUDIT REFERENCE — NOT THE CURRENT APPROVED ARCHITECTURE.** The observed Sanctum facts and A/B/C options below explain the superseded v2.1 analysis. They are not active implementation choices for the new backend and do not resolve G-03, G-05, OD-08 or OD-11.

**Observed facts (static):** Sanctum first-party cookie authentication; session auth **disables bearer-token extraction**; state-changing SPA routes use `RequireSpaSession`; login throttling combines account/IP and IP-wide limits; signed email-verification routes; admin routes require Sanctum authentication **and** admin middleware (AUD §6, §8). The behaviour of `RequireSpaSession` toward non-browser clients is **not verified**.

| Option | Description | Backend change | Notes / risks |
|---|---|---|---|
| **A — Stateful cookie session from the native client** | The native HTTP client keeps a cookie jar, performs the CSRF-cookie handshake and sends whatever headers `RequireSpaSession` requires. | Possibly none, possibly adjustments to `RequireSpaSession`/CORS-origin handling (unverified). | Reuses existing guards and throttles; native cookie handling and secure storage of the session cookie must be designed; middleware may reject non-browser origins. |
| **B — Dedicated mobile token guard** (e.g., Sanctum personal access tokens on a separate route group) | Token issued at login, stored in OS secure storage, revoked on logout. | **Yes.** Bearer extraction is currently disabled for the session guard *by design*; a separate guard must be added without enabling bearer tokens on web SPA routes. | Needs token abilities/expiry/revocation design, throttling parity, device binding decision. Edition 1.0 proposed this; it is **not** a trivial addition. |
| **C — Another mechanism** | Not assessed by any source. | Unknown. | May be proposed by stakeholders; shall satisfy ARC-006-C. |

**ARC-006-C — Constraints that every option shall satisfy (no weakening of existing security):**

| ID | Constraint | Source |
|---|---|---|
| ARC-006-C1 | Auth, password-recovery, email-verification and phone-verification throttling shall apply equally to mobile clients. | AUD §6 |
| ARC-006-C2 | Email verification shall remain a signed, server-validated flow. | AUD §8 |
| ARC-006-C3 | Admin isolation (authentication **and** admin middleware) shall be unchanged; elevated admin auth meaning remains DEC-038. | AUD §6, §8; UXP §5 |
| ARC-006-C4 | Logout shall invalidate the session/token **server-side** (AUTH-009). | P1 |
| ARC-006-C5 | Generic login failure messages (AUTH-008). | P1 |
| ARC-006-C6 | Bearer-token acceptance shall **not** be enabled on the existing web SPA routes. | AUD §8 |
| ARC-006-C7 | RBAC, stage-based access control and the NDA gate (ROL-001) shall be enforced identically for every client type. | MPS §12.1 |
| ARC-006-C8 | No credential, token or session identifier shall be written to logs, crash reports or analytics. | SEC-005 |

**Session policy (review finding F-10).** The options above cannot be assessed fully without a session policy: session/token lifetime, idle behaviour, re-authentication for sensitive actions, remote revocation and multi-device behaviour. No source defines these. They are specified as decisions in **AUTH-018, AUTH-019 and DEC-053** and shall be decided together with DEC-003. Email-verification and password-reset completion on mobile are specified in **AUTH-016/017 and DEC-052**.



### 5.4 Development environment and Expo / React Native integration constraints

> **Status of this section.** React Native + Expo + TypeScript, Antigravity or VS Code, and physical Android-phone testing without requiring Android Studio are the approved direction. Detailed workflow, SDK, navigation/state libraries, native modules and push choices remain subject to G-02 / DEC-022 and proof of concept. The proof must target the new non-production Node.js backend; legacy Sanctum behavior is irrelevant except as historical risk context.

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| ARC-022 | The approved development direction is React Native, Expo, TypeScript, Antigravity or VS Code, physical Android-phone testing and no Android Studio requirement. G-02 / DEC-022 governs only the remaining workflow, SDK and capability details. | Must | NEW | R1 | G-00; G-02 / DEC-022 |
| ARC-023 | **Capability compatibility check.** Before DEC-022 is approved, each native capability this specification needs shall be checked against the intended workflow: OS-backed secure storage for credentials (MOB-011); camera and gallery capture and file selection (MOB-061); multipart upload with progress and cancel (MOB-062); push registration and token lifecycle (MOB-080); deep/universal links (MOB-081, AUTH-016/017); obscuring sensitive content in the app-switcher snapshot (MOB-012); removal of captured images from cache/gallery (MOB-063); encrypted local draft storage (MOB-050); app lifecycle events for session restore (MOB-010). A capability found unavailable in the chosen workflow is raised as a decision, not silently dropped. | Must | UNV | R1 | AUD §2, §8; F-07 |
| ARC-024 | **Authentication feasibility.** The eventual JWT design shall be proven from a physical Android device against a non-production Node.js backend, including issuance, secure storage, refresh/expiry, revocation, throttling and logout invalidation. This proof does not choose the pending design. | Must | UNV | R1 | G-03; G-05; OD-08; H-05; TST-006 |
| ARC-025 | **Push approach.** The push mechanism (device tokens sent directly to OS push services versus an intermediary push service) is a pending decision with consequences for what the independent Node.js + Express.js backend sends, where provider credentials live and what DEP-005 must deliver. No provider or delivery model is selected here. Push allocation remains PROPOSED under G-07 (NTF-003, MOB-080). | Should | NEW | PA | G-00; OD-04; DEP-005; DEC-022; MSG-DEC-009/013 |
| ARC-026 | **Updates.** Over-the-air JavaScript updates vs store-reviewed binaries shall be decided, including how an update channel interacts with the force-update signal (MOB-070, DEP-008) and app-store policy (DEC-048). An update channel shall not be used to bypass version gating for security-relevant API changes. | Should | NEW | PA | F-07; DEC-048 |
| ARC-027 | **Development transport.** Physical-device testing shall use a backend reachable over **HTTPS** (SEC-001) and a **non-production** dataset (LOAD-001); no cleartext-traffic exception shall ship in a release build. How a phone reaches a development backend (shared network, tunnel, staging host) is an environment decision outside this specification. | Must | NEW | R1 | SEC-001; AUD §8 |

**Decision criteria for DEC-022 (the stack is not fixed here).**

| # | Criterion | Why it matters | Linked requirements | Evidence expected |
|---|---|---|---|---|
| 1 | Authentication transport feasibility | Every authenticated feature depends on it | ARC-006, ARC-024, DEC-003 | H-05 proof of concept on a physical Android phone |
| 2 | Secure credential storage | Tokens/session material must not sit in plain storage | MOB-011, SEC-005/006 | Storage inspection |
| 3 | Camera, gallery and file upload | Verification and document flows | MOB-060…064 | Upload PoC incl. cancel/retry |
| 4 | Push approach and credentials | Changes backend work and testing method | NTF-003, MOB-080, DEP-005 | Push PoC (R2) |
| 5 | Deep/universal links | Email-verification/reset completion and notification links | AUTH-016/017, MOB-081, DEP-007 | Link PoC |
| 6 | Over-the-air update vs store binary | Force-update and store policy | MOB-070, ARC-026, DEC-048 | Policy review |
| 7 | Native modules needed | App-switcher obscuring, image cleanup | MOB-012, MOB-063 | Capability check |
| 8 | Physical-Android workflow without Android Studio | Intended environment (ARC-022) | ARC-022, ARC-027 | A working build-and-run loop on the owner's phone |
| 9 | TypeScript typing of the API contract | Reduces client/server drift | DEP-015, TST-007 | Contract inventory (DEP-015) |
| 10 | Accessibility API availability | WCAG target | MOB-091, TST-008 | Screen-reader test |
| 11 | Version support and upgrade effort | Maintainability | NFR-005 | Release-cadence review |
| 12 | Store distribution and device matrix | Release readiness | DEC-048, DEC-050 | Matrix approved |

---

## 6. User Roles & Permissions

### 6.1 Roles (preserved from MPS §5)

| Role | Summary | Notes |
|---|---|---|
| **Founder** | Creates businesses; funding ask; finds investors/professionals; manages disclosure; negotiates; defines milestones; submits periodic financial reports. | May own multiple businesses (default assumption, P3 Amb.1). |
| **Investor — Large** | Capital provider; typically Large/Standard (Equity/Ownership) investment (e.g., ৳5–50+ lakh, MPS §5.2). | |
| **Investor — Small/Micro** | Small-ticket participant; typically Micro (Profit/Loss Sharing). MPS §5.2 gives ৳10,000–50,000; MPS §15 / ILS give ৳5,000–10,000 (**CONF-04**, retained). | Investor type is a profile attribute (P2). |
| **Skilled Professional** | Offers expertise; applies to startups; negotiates salary/equity. | |
| **Admin** | Governance, trust, verification and risk-control centre (MPS §19). Provisioned internally — **no public registration**. | Uses the separate Web Admin Dashboard (OD-03), not the participant mobile app. Minimum necessary R1 functions include Tier 1 verification review; exact inventory remains OD-10 PENDING. |

### 6.2 Role requirements

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| ROL-001 | Access shall be governed by global-role, Business-membership/permission, disclosure-stage, NDA, verification-tier and Deal-participation controls, enforced by the new backend on every protected action. UI hiding is a convenience, never a security boundary. | Must | NEW | R1 | MPS §12.1; G-00; BR-DEC-005; MSG-DEC-006/007 |
| ROL-002 | Public registration shall offer only Founder, Investor, Skilled Professional. Admin accounts shall not be self-registerable. | Must | PAR | R1 | P1; AUD §4 (admin isolation); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| ROL-003 | **(Corrected — review finding R-03.)** A user account **may hold more than one participant role** (Founder, Investor, Professional). The platform already supports **role enrollment and removal, role profiles and per-role workspaces**. Each role is an **isolated workspace** with no data bleed (UXP §3.1). A user shall not be able to change their role by editing a profile field; role changes occur only through the existing enrollment/removal operations. The mobile client shall provide a **role switcher** where the account holds more than one role and shall **validate the active role against the enrolled roles returned by the server**. *Edition 1.0's baseline "one role per account" (from P1/P2 default assumptions) is superseded as a statement of platform status; the MPS itself never required single-role.* | Must | PAR | R1 | UXP §3.1; AUD §2, §4 (multi-role participant accounts COMPLETE in code / NOT RUNTIME VERIFIED); CONF-03; DEC-005; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| ROL-003-D | **Active-role persistence defect (AUD-D01).** On session refresh the web client selects the **first returned role** as `activeRole`, so a user's chosen workspace can reset after reload. The mobile client shall not inherit this behaviour: the active role shall survive app restart and session restore, and shall be validated against enrolled roles. The persistence mechanism (server-side vs bounded client storage) is **PENDING USER APPROVAL** (DEC-047). | Must | PAR | R1 | AUD §5 (Medium); DEC-047 |
| ROL-004 | Disclosure Stage is **relationship-specific** (per Business × viewer), never global. | Must | IMP | R1 | MPS §13; MDP §13; AUD §4 (staged disclosure) |
| ROL-005 | Stage 3+ access requires an active, mutually accepted NDA **and** viewer verification of at least **Tier 1**. Tier 0 may browse, search and express interest. Founder-side tier requirement: none beyond existing publish rules (default; unconfirmed — DEC-016). | Must | PAR | R1 | MPS §12.1, §24; P6 §G; AUD §4 (verification tier gates; staged disclosure); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| ROL-006 | Admin visibility of confidential relationship content shall be limited to what oversight requires (deal/lifecycle metadata) and shall not automatically include Stage 3/4 documents or NDA-protected content. | Must | UNV | R3 | P9 §1, §10 |
| ROL-007 | Admin shall **review, change status and escalate** only: Admin shall never edit a founder's reported revenue/expenses/notes, recompute Net Profit/Loss, alter agreed investment terms, fabricate evidence, or execute/settle an investment. | Must | UNV | R3 | P9 §14–§15; UXP §6.6 |

### 6.3 Business-scoped roles and permissions (new in internal Edition 2.2)

Business Roles are memberships inside one Business; they never grant a global Founder, Investor, Skilled Professional or Admin role. A Professional may belong to several Businesses with different effective permissions. All detailed alternatives remain PENDING under BR-DEC-001…012.

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| BRM-001 | A Founder shall invite or hire a Skilled Professional for a specific Business. The invitation shall identify the Business and proposed role/permission context. | Must | NEW | PA | BR-DEC-001/002 |
| BRM-002 | No Business-member privilege shall activate until the invited Professional explicitly accepts. Pending, declined, withdrawn or expired invitations confer no Business, report, document, Team Chat or Deal access. Expiry, cancellation and re-invitation semantics remain PENDING. | Must | NEW | PA | BR-DEC-001 |
| BRM-003 | Supported Business-scoped role labels shall include Finance Manager, Business Manager and Project Manager. Restricted Founder-defined Custom Roles are proposed; their catalogue, ceilings and creation rules remain PENDING. | Must | NEW | PA | BR-DEC-002/003 |
| BRM-004 | A Business Role shall never automatically confer a global participant or Admin role. Removing membership from Business A shall not remove legitimate membership from Business B. | Must | NEW | PA | BR-DEC-002/005/009 |
| BRM-005 | The Founder shall control grants for Business information, reports, proposals, documents, tasks, milestones, workspace, Team Chat and assigned Deal participation. A role title alone shall never grant unrestricted access. | Must | NEW | PA | BR-DEC-002/005/007/008 |
| BRM-006 | Effective permission shall be scoped by Business, resource, action, membership state, Deal membership and current delegation, using server-side default deny. Multiple-role combination and deny/allow precedence remain PENDING. | Must | NEW | PA | BR-DEC-004/005 |
| BRM-007 | A Founder may expressly delegate a Finance Manager to one Deal. The grant shall identify the Business, Deal and allowed actions and shall be auditable and revocable. Business-wide automatic Deal access is prohibited unless later approved. | Must | NEW | PA | BR-DEC-006/009/011 |
| BRM-008 | Within an active Deal grant, a Finance Manager may communicate with the Investor, discuss terms, review specifically authorized financial information, and prepare versioned draft/revised proposals within delegated limits. | Must | NEW | PA | BR-DEC-006/007; MSG-DEC-005 |
| BRM-009 | A Finance Manager shall never provide final Founder-side agreement confirmation, finalize the Deal, override the Founder, accept an NDA for another participant, escalate personal permissions or grant Deal access to others. Only the Founder confirms the Founder side; the Investor confirms independently. | Must | NEW | PA | BR-DEC-006; G-08; AGR-001 |
| BRM-010 | Financial report permissions shall distinguish view, prepare, edit draft and submit/publish authority per report. Admin shall never edit Founder financial records. Exact report authority remains PENDING. | Must | NEW | PA | BR-DEC-007; ROL-007 |
| BRM-011 | The Business Team Workspace shall expose only assigned and authorized Business documents, operations, tasks and milestones. Create, assign, update, complete and approve actions require separate permissions. | Must | NEW | PA | BR-DEC-008 |
| BRM-012 | Membership, role, permission and Deal-delegation revocation shall deny every subsequent unauthorized request, preview, search result, notification and message access. Cache/session strategy remains PENDING but may not create a stale-access window. | Must | NEW | PA | BR-DEC-009; MSG-DEC-006 |
| BRM-013 | Historical user visibility after removal is PENDING. Until approved, the conservative requirement is no interactive access after revocation; server audit records remain protected from the removed member. | Must | NEW | PA | BR-DEC-010; MSG-DEC-010 |
| BRM-014 | Invitations, acceptances, role/permission changes, revocations, delegated actions and proposal versions shall be audit-recorded without unnecessary confidential content. Retention remains PENDING. | Must | NEW | PA | BR-DEC-011 |
| BRM-015 | Release allocation for Business Roles, Custom Roles, Deal delegation and workspace features remains PENDING under G-07, DEC-018 and BR-DEC-012. No row marked PA is an approved R1 commitment. | Must | NEW | PA | G-07; BR-DEC-012 |

| Business capability | Founder | Finance Manager | Business Manager | Project Manager | Custom Role | Investor | Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Grant/revoke Business membership and roles | ✓ | — | — | — | — | — | — |
| View Business information | ✓ | ◐ explicit grant | ◐ explicit grant | ◐ explicit grant | ◐ restricted grant | relationship stage | oversight metadata only |
| View/prepare financial reports | ✓ | ◐ per-action grant | ◐ grant | — unless granted | ◐ restricted | funded-Deal rights | review only; never edit |
| Draft financial Deal proposals | ✓ | ◐ Deal grant | — unless granted | — | ◐ restricted | respond as Investor | — |
| Negotiate in Deal Room | ✓ | ◐ Deal-specific grant | — unless granted | — | ◐ restricted | own Deal | read only only if oversight requires |
| Final Founder-side agreement confirmation | ✓ only | — | — | — | — | — | — |
| Manage assigned tasks/milestones | ✓ | ◐ | ◐ | ◐ | ◐ | confirmation only where Deal permits | oversight only |
| Team Chat | ✓ | ◐ membership + permission | ◐ | ◐ | ◐ | — | no default access |

### 6.4 Global capability matrix (derived from MPS, UXP, P1–P9; ✓ = permitted, — = not permitted, ◐ = conditional, † = no source located; pending confirmation)

| Capability | Founder | Investor | Professional | Admin |
|---|:---:|:---:|:---:|:---:|
| Self-register | ✓ | ✓ | ✓ | — (provisioned) |
| Hold more than one participant role on one account | ✓ | ✓ | ✓ | — † |
| Create/edit own profile | ✓ | ✓ | ✓ | — |
| Submit identity verification (Tier 1) | ✓ | ✓ | ✓ | — |
| Review/approve/reject verification; set Tier 2 | — | — | — | ✓ |
| Create/edit/publish Business | ✓ | — | — | — |
| Discover published Businesses | — | ✓ | ✓ | — |
| Discover Investor / Professional profiles | ✓ | — | — | — |
| View Readiness Score of own business | ✓ | — | — | ✓ † |
| View Match Score / AI Suggestions | ✓ | ✓ | ✓ | ✓ † |
| Express interest in a business | — | ✓ | ✓ | — |
| Decline / reciprocate interest; confirm Stage 4 | ✓ | — | — | — |
| Accept NDA | ✓ | ◐ Tier ≥ 1 | ◐ Tier ≥ 1 | — |
| Manage disclosure content/document stage tags | ✓ | — | — | — |
| Open/enter Deal Room | ✓ (own deals) | ✓ (own deals) | ✓ (own deals) | ◐ read-only |
| Submit negotiation terms / confirm Agreement | ✓ | ✓ | ✓ | — (cannot act for parties) |
| Define milestones; mark milestone complete | ✓ | — | — | — |
| Confirm milestone completion; flag dispute | — | ✓ | ◐ (engagement) | — |
| Submit periodic financial reports | ✓ (after Milestone Funding Active) | — | — | — |
| Flag financial discrepancy | — | ✓ (funded deal) | — | — |
| Review financial reports; set verification status; resolve discrepancy | — | — | — | ✓ |
| Submit post-completion feedback | ✓ | ✓ | ◐ (TBD, DEC-027) | — |
| Premium features (simulated) | ✓ | ✓ | ✓ | read/adjust ◐ (DEC-008) |
| Manual reputation adjustment | — | — | — | ✓ (logged) |
| View audit logs | ◐ "Viewed by" line on own documents | — | — | ✓ |

*Sources: P1, P3, P4, P6, P7, P8, P9, UXP §7.2–§7.6, §9. † rows (review findings R-23, F-15): Edition 1.0 listed Admin read access to Readiness/Match scores without a located source; the Admin "—" cell for holding more than one participant role is inferred from "admin isolation" and has no stated source. Both are retained, flagged †, and subject to confirmation against P5/P9.*

---

## 7. Feature Baseline (Audit-Classified)

> **Basis.** Every row below is classified from the **Phase 1 Audit Report** (static, read-only). Status codes are defined in §1.4. **No row claims runtime verification** (NFR-E02). Where Edition 1.0 listed a feature as `GAP` and the audit observed it, the row is corrected; Appendix D lists each change. Every mobile screen is new regardless of backend status.

### 7.1 Platform capabilities

| # | Feature area | MPS ref | Phase prompt | **Domain status (domain-level, audit-observed)** | Audit evidence and qualifiers | Mobile impact |
|---|---|---|---|---|---|---|
| 1 | Authentication: registration, login, logout, password reset, email verification, password change, throttling | §7(1), §12 | P0, P1 | **IMP** | AUD §4 "COMPLETE in code / NOT RUNTIME VERIFIED". Cookie/session transport (AUD §2, §8). | Native transport undecided — §5.3 |
| 2 | Multi-role participant accounts: role enrollment/removal, role profiles, per-role workspaces | §5 (UXP §3.1) | P1/P2 assumed single role | **IMP** | AUD §2, §4. **Defect AUD-D01:** active role not persisted. | ROL-003, ROL-003-D |
| 3 | Admin isolation (separate middleware + frontend guard) | §19 | P1 | **IMP** | AUD §4, §6 | ADM scope DEC-004 |
| 4 | Founder profile, Investor preferences, Professional profiles/skills | §5, §23 | P2 | **IMP** | AUD §2, §4 (API, model, validation, UI present) | PRO-* |
| 5 | Founder business management: draft, update, requirements, submit, approve/reject, publish, photos, documents | §7(2) | P3 (reconstruction) | **IMP** | AUD §4. The audit lists submit **and approve/reject**; whether pre-publish Admin moderation is mandatory is **not stated** (BIZ-006 stays `UNV`). | BIZ-* |
| 6 | Search, filtering, discovery (3 role views) | §7(5) | P4 | **UNV** | AUD observes a shared Discovery page and matching endpoints but does not assess filter facets or search semantics. | DSC-* |
| 7 | Matching engine (deterministic matchers, recommendation endpoints) | §9 | P5 absent | **PAR** | AUD §4 "COMPLETE backend / PARTIAL frontend": **one discovery UI still uses demo explainability data (AUD-D03)**. | AI-010…, DSC-006 |
| 8 | Investor readiness: versioned inputs, deterministic scoring, assessments, insight APIs | §10 | P5 absent | **IMP** | AUD §4 "COMPLETE in code" | AI-001… |
| 9 | **Gemini-based AI insight workflows** (business analysis; matching, deal, readiness and admin insights) with schema validation, fingerprints, immutable versions, concurrency locks | §8 (rule-based only) | none | **IMP** | AUD §4, §7: "COMPLETE foundation / NOT OPERATIONALLY VERIFIED". Single provider; no fallback; 429 recognised but no backoff; quota only on business analysis; operational cause of the earlier key issue **unverified** (AUD-D05, D06). | AI-020…; CONF-24; DEC-042 |
| 10 | Verification tiers: phone foundation, evidence, admin review, tier gates, audit logs | §11 | P2 | **IMP** | AUD §4. Tier 2 promotion trigger and upload hardening: `UNV`/defect AUD-D10. | VER-* |
| 11 | Staged disclosure (4 stages), interest synchronisation, access controls | §13 | P6 | **IMP** | AUD §4 "COMPLETE in code" | DIS-* |
| 12 | NDA: request, accept, decline; deal-lifecycle synchronisation | §13 | P6 | **IMP** | AUD §4. **NDA decline is observed** (Edition 1.0 said rejection was undefined). Withdrawal/expiry not mentioned → `UNV`. | DIS-005, DIS-006 |
| 13 | Connections and applications | §14 | P7 | **PAR** | AUD §4 "core interest/connection flows exist; some frontend 'application' ... surfaces require deeper runtime confirmation" | CON-* |
| 14 | Deal Room: deals, stages, negotiation, agreements, **messages**, insights, participant authorisation | §14 | P7 | **IMP** | AUD §4 "COMPLETE core / PARTIAL polish" | DLR/NEG/AGR |
| 15 | Milestones, feedback | §14 | P7 | **IMP** | AUD §4 (milestones/feedback in schema; "Investment simulation PARTIAL") | MIL-* |
| 16 | **Investment Type selection (Micro / Large-Standard) and per-deal return-model terms** | §15, §24, §25.1 | none | **UNV** | AUD does not mention it. Must not be assumed present or absent (SG-09). | INV-*, DEC-006 |
| 17 | **Financial transparency**: reports, evidence, discrepancies, audit records; participant and admin views | §15.4, §25.1 | none (P9 presumed) | **IMP** | AUD §4 "COMPLETE core / NOT RUNTIME VERIFIED". (Edition 1.0 said GAP — corrected.) Details such as status vocabulary, cadence and investor-flag semantics are `UNV`. | FIN-* |
| 18 | Reputation and feedback | §17 | P8 | **IMP** | AUD §4 "COMPLETE core" | REP-* |
| 19 | **Notifications**: participant notifications and preferences | §7(18), §25.1 | none | **PAR** | AUD §4 "PARTIAL: participant notifications/preferences exist; admin notification inbox explicitly does not" | NTF-* |
| 20 | **Premium**: premium page | §18, §25.1 | none | **PAR** | AUD §4 "PARTIAL / primarily UI; authoritative billing/subscription enforcement was not found" | PRM-* |
| 21 | **Payments and platform commission** (simulated): deal payments, platform revenue | §20, §33(16) | none | **PAR** | AUD §1, §4: present **only in the dirty working tree** (branch `feature/simulated-payments-commission`); tests exist but not run; idempotency, double-transition protection, rounding, reconciliation **not verified**. | PAY-*, DEC-046 |
| 22 | **Admin**: user directory (paginated), business/verification governance, admin insights (AI) | §19, §25.1 | P9 | **IMP** | AUD §4 "COMPLETE core" | ADM-* |
| 23 | Admin investment/financial oversight | §19 | P9 | **PAR** | Present in uncommitted work (AUD §1); financial-report/discrepancy admin views per AUD §4 | ADM-008…010 |
| 24 | Admin teams / staff-tier RBAC / staff-role assignment / policy editing / staff permission audit history | §19 | P9 | **MIS** | AUD §4–§5: UI labels them "not implemented" | ADM-015 |
| 25 | Admin matching-rule controls | §9.2 | P9 | **MIS** | AUD §4 (display/documentation only; no rule administration) | ADM-015 |
| 26 | Admin notification-template administration | §19 | P9 | **MIS** | AUD §4 (static catalogue, not editable dispatch) | ADM-015 |
| 27 | Admin notification inbox | §19 | P9 | **MIS** | AUD §5 | NTF-001 (Admin) |
| 28 | Predictive analytics / forecasting | — | — | **MIS** (by design) | AUD §4–§5: UI states no forecasting model exists | Not a requirement |
| 29 | Settings screen | — | — | **PAR** | AUD §5: "Coming soon" controls | AUD-D09 |
| 30 | Reverse Investment Discovery; saved searches/alerts; Deal Room scheduling | §25.2 | none | **UNV** | Not mentioned by AUD | R2/R3 |
| 31 | Pagination of histories/audit/collections | — | — | **PAR** | AUD §6 (Medium): several history and admin endpoints use unrestricted `get()` | AUD-D04; DEP-010 |
| 32 | Accessibility (WCAG 2.1 AA target) | UXP §12 | — | **UNV** | AUD §5: no keyboard/focus/screen-reader/contrast/automated audit run | NFR-A* |
| 33 | Automated tests | — | — | **UNV** | AUD §1, §11: test files exist; not executed; historical pass claims are not proof for the dirty tree | TST-* |
| 34 | **Mobile client (everything above, as native screens)** | — | none | **NEW** | — | Entire client |
| 35 | Mobile-specific platform needs: native token/session auth | — | none | **MIS** | AUD §2, §8 (bearer extraction disabled) | §5.3 |
| 36 | Push notifications, device registration, deep links, force-update endpoint, account deletion/data-removal | — | none | **UNV** | Not mentioned by AUD; DEP-003 … DEP-009 | MOB-* |

### 7.2 Audit-observed defects and constraints that the mobile client must not inherit
Full evidence and audit section references are in Appendix B (AUD-D01 … AUD-D13). Summary: **D01** active role not persisted; **D02** any session-refresh failure treated as logout; **D03** demo match explainability in discovery; **D04** unpaginated histories; **D05** missing AI quotas/budgets for matching, deal, admin insights; **D06** single AI provider, no backoff, generic failure codes; **D07** many separate aggregate queries in admin insight snapshot; **D08** uncommitted payment branch; **D09** unfinished "Coming soon" settings; **D10** upload and link-validation hardening; **D11** outdated documentation; **D12** accessibility not audited; **D13** production headers/cookies/proxy/CSP/TLS unverified.


---

## 8. Functional Requirements

> Each requirement describes platform behaviour **as presented and operated through the mobile client**. Status describes the existing platform (see §1.4); "IMP" means the audit names the specific capability the row describes (static; **not** runtime-verified) — see §1.4. Items needing a decision carry **PA** and a DEC ID.

### 8.1 Authentication & Account (AUTH)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| AUTH-001 | Registration shall be a stepped flow (presentation is a design decision): (1) **role selection** among Founder / Investor / Professional, each with a short description; (2) account details (email, password); (3) role-specific minimum profile fields; (4) a required, **unchecked-by-default** Terms-of-Service + simulation-disclaimer acceptance; then email verification (AUTH-004, AUTH-016). **Choosing a role is not irreversible: additional roles can be added later** (multi-role, ROL-003). *(Corrected, review finding R-11.)* | Must | PAR | R1 | UXP §7.1; P1; MPS §30; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AUTH-002 | Step 3 (role-specific fields) may be delivered as a "complete your profile" step after first login rather than inside the registration wizard (P2 default). Field set and validation shall match UXP §7.1 Step 3 either way. | Must | UNV | R1 | P2 Amb.1 |
| AUTH-003 | Login uses email + password with a "Forgot password" entry point and a link to Register. No role selection at login. SSO is **TBD** ("if applicable", UXP §7.1; no source defines providers). | Must | IMP | R1 | UXP §7.1; P1; AUD §4 |
| AUTH-004 | Email verification shall support send, confirm and resend. Registration places the user at **Tier 0 (Unverified)**. | Must | PAR | R1 | MPS §11; P1; AUD §4, §8 (signed verification routes); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AUTH-005 | Phone verification is part of Tier 0 (MPS §11). P1 permits a **structurally complete but simulated** flow when no SMS provider exists. The audit observes a "phone foundation"; whether the provider is real or simulated is **TBD** (DEC-016). | Must | PAR | R1 | MPS §11; P1; AUD §4, §6 (throttled) |
| AUTH-006 | Password reset shall be available (request + reset) in a minimal flow. | Must | IMP | R1 | P1; AUD §4 |
| AUTH-007 | Password strength and email format shall be validated client-side in real time **and** re-validated server-side; errors shall be announced to assistive tech and shown inline. | Must | PAR | R1 | P1; UXP §12; AUD §6 (request validation); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AUTH-008 | Failed-login responses shall not reveal whether an email exists. The client shall display generic, accessible error text. | Must | UNV | R1 | P1 |
| AUTH-009 | Logout shall invalidate the session **server-side** (not only delete local credentials) and return the app to the unauthenticated state. | Must | UNV | R1 | P1; AUD §4 (logout exists) |
| AUTH-010 | If an account is **suspended**, the client shall show a clear message, end the session and prevent protected-screen access. Reason visibility follows the server response. | Must | UNV | R1 | P1; P9 §7–§8 |
| AUTH-011 | Authentication-relevant events are audit-logged **server-side**. Whether the app sends device/app-version metadata is **TBD**. | Must | UNV | PA | MPS §12.2; P1 |
| AUTH-012 | The client shall handle `401` (expired/revoked session) by clearing credentials, preserving unsaved draft data in secure local storage where safe (MOB-053), and routing to Login. | Must | NEW | R1 | MDP §12; ARC-003 |
| AUTH-012-D | **(New — audit defect AUD-D02, review finding R-12.)** The client shall **distinguish authentication expiry (`401`/`419`) from transient network or `5xx` failures** and shall present a recoverable session-error state for the latter instead of treating them as logout. *(The web client collapses all `refreshUser` failures into "unauthenticated"; recorded as a known defect and dependency, not inherited.)* | Must | NEW | R1 | AUD §5 (Medium); DEP-011 |
| AUTH-013 | The client shall handle throttling responses (`429`) with a visible "try again later" state and no automatic retry storm. | Must | NEW | R1 | P1; AUD §6 |
| AUTH-014 | In-app **account deletion** and data-removal request flow: required by major app stores for apps with account creation, but **no source defines it**. Behaviour is **TBD** (DEC-026). | Must | UNV | PA | MPS §29; DEC-026 |
| AUTH-015 | Admin login uses "elevated auth" (UXP §5). Meaning (MFA, shorter sessions, device policy) is **TBD** (DEC-038). | Must | UNV | PA | UXP §5; P1 |
| AUTH-016 | **Email-verification completion on mobile (review finding F-09).** A registered user stays at Tier 0 until the email address is verified (AUTH-004). The audit observes **signed, server-validated email-verification routes** (AUD §8). How a mobile user completes verification — returning to the app from the link, completing it in a browser then signing in, or another mechanism — is **PENDING USER APPROVAL (DEC-052)**. Whatever the mechanism, it shall keep the flow signed and server-validated (ARC-006-C2), show the user's verification state, allow resend, and never treat an unverified email as verified. | Must | UNV | PA | AUD §8; AUTH-004; DEC-052; DEP-007 |
| AUTH-017 | **Password-reset completion on mobile (review finding F-09).** Request and reset exist (AUTH-006). How a mobile user completes the reset (app link vs browser) is **PENDING USER APPROVAL (DEC-052)**. The reset link is single-purpose and its expiry/single-use behaviour is whatever the server enforces (not defined by any source; extract from the repository — DEP-006). Whether a reset or password change ends other sessions is part of DEC-053. | Must | UNV | PA | AUD §4; AUTH-006; DEC-052; DEC-053 |
| AUTH-018 | **Session lifetime and re-authentication policy (review finding F-10).** Session/token lifetime, idle behaviour, refresh/expiry semantics, and **re-authentication for sensitive actions** (for example NDA acceptance, financial report submission, access to verification images) are **not defined by any source** and are **PENDING USER APPROVAL (DEC-053)**. Until decided the client honours only server-issued expiry (`401`/`419`, AUTH-012-D) and shall not invent timeouts or lock behaviour. | Must | UNV | PA | AUD §6, §8 (silent); DEC-053 |
| AUTH-019 | **Multi-device and revocation behaviour (review finding F-10).** Whether one account may be signed in on several devices, whether "sign out everywhere"/remote revocation exists, and whether a password change or reset revokes other sessions are **not defined by any source** — **PENDING USER APPROVAL (DEC-053)**. | Must | UNV | PA | AUD §8 (silent); DEC-053 |
| AUTH-020 | Biometric unlock and device-integrity checks are **optional improvements** only if stakeholders want them (DEC-053); none is required by any source. | Should (optional) | NEW | PA | FRR F-10; DEC-053 |

### 8.2 Profiles (PRO)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| PRO-001 | **Founder Profile:** bio/background and structured prior-experience entries (role, duration, industry). The Business is a separate entity. | Must | PAR | R1 | MPS §5.1; P2; AUD §2; v2.1 regrade (F-03): structured prior-experience entries are not mentioned by AUD |
| PRO-002 | **Investor Profile:** bio; investor type (Large / Small-Micro); available, minimum and maximum investment (BDT, numeric); industry focus; risk level; business-stage preference; location preference; involvement level. | Must | PAR | R1 | MPS §5.2; P2; AUD §4 (investor preferences); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| PRO-003 | Investor **investment-type interest** (Micro / Large-Standard / both) is required by MPS §33 step 5 and UXP §7.3, but P2 does not include it and the audit does not mention it. | Must | UNV | PA | MPS §33; UXP §7.3; DEC-006 |
| PRO-004 | **Professional Profile:** skill tags with proficiency level; structured experience; availability (hours/week, start date); compensation preference (salary / equity / hybrid, with BDT range; equity % is not a monetary value). Not a free-text résumé for scoring. | Must | PAR | R1 | MPS §5.3; P2; UXP §7.4; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| PRO-005 | Monetary inputs shall use the shared BDT input (grouping, ৳ symbol, non-negative; `min ≤ max` where both exist). | Must | UNV | R1 | P2 |
| PRO-006 | A **profile-completeness** indicator shall appear on the own-profile view and the dashboard greeting strip; <20% shows an onboarding checklist instead of the metric row. | Must | UNV | R1 | P2; UXP §6.1 |
| PRO-007 | Own profile is editable per section; another user's profile is **read-only**, shows **locked-section placeholders** rather than omitting gated sections, and exposes role-appropriate actions only when backing features exist. | Must | UNV | R1 | UXP §6.2; P2; P4 |
| PRO-008 | Verified users shall show an **identity-verification indicator that states the tier**; **Tier 0 shows no verification indicator.** (How the indicator looks is a design decision; the legacy gold-shield reference is nonbinding — Appendix M.) | Must | UNV | R1 | UXP §9; P2 |
| PRO-009 | **Reverse Investment Discovery** option ("Publish my preferences so founders can approach me") with a preview of how founders will see the investor's published preferences. | Should | UNV | R3 | MPS §5.2, §25.2; UXP §7.3 |
| PRO-010 | A reputation summary appears on the profile only when Reputation exists; otherwise the section is omitted rather than implying function. | Should | PAR | R1 | P2; P8; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |

### 8.3 Identity Verification (VER)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| VER-001 | Tiers: **Tier 0** Unverified (email + phone) → **Tier 1** Identity Verified (government ID + selfie/document + Admin manual review) → **Tier 2** Track-Record Verified (Tier 1 + demonstrated on-platform history). | Must | IMP | R1 | MPS §11; AUD §4 |
| VER-002 | The user shall submit a Tier 1 request with ID and selfie/document images (capture or select) and see a pending state; statuses: pending / approved / rejected / more-info-requested, with the Admin's reason note shown to the applicant. | Must | PAR | R1 | P2; UXP §7.6; AUD §4 (evidence, admin review); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| VER-003 | Verification documents shall be visible only to the owner and reviewing Admin; no public URL; every access authorised server-side. Upload hardening (explicit MIME allow-list, decoding checks, malware scanning, quarantine) is an **audit-recommended dependency** (AUD-D10, DEP-012). | Must | PAR | R1 | P2; AUD §6, §8; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| VER-004 | **Tier 2** is assigned manually by Admin in the MVP; automatic eligibility from completed deals is deferred; Reputation supplies data only and shall not itself change a tier. Promotion trigger **TBD** (DEC-028). | Must | UNV | PA | P2 Amb.3; P8 §1.1; DEC-028 |
| VER-005 | Copy shall state that verification is **not** legal KYC/AML and shall not imply legal certification. | Must | UNV | R1 | MPS §11.2 |
| VER-006 | When a Tier ≥ 1 action is attempted at Tier 0, the app shall present the **verification-upgrade path** (not a bare error). | Must | UNV | R1 | P6 §G; AUD §4 (tier gates exist) |
| VER-007 | **Identity verification** status and **Financial Verification Status** shall be presented as two separately labelled statuses and shall never be merged into, or presented as, a single trust score or combined label. (Icons, colours and tints from the legacy PRD are nonbinding — Appendix M.) | Must | UNV | R1 | UXP §2.4, §9; ILS |
| VER-008 | The user's current verification tier shall be available in a consistently reachable place while authenticated (for example from the profile/account area), in every active role. | Must | NEW | R1 | UXP §3 |

### 8.4 Business / Opportunity (BIZ)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| BIZ-001 | A Founder shall create a Business via a multi-step wizard. UXP step set: Basics → Business Model → Market & Competition → Team/Founder Capability → Funding Requirement → Traction/Customer Validation → Review. P3's in-scope fields are narrower — **the field set shall be reconciled with the actual schema** (DEP-006). Each field that feeds scoring shall be labelled with its scoring factor. | Must | PAR | R1 | UXP §7.2; P3; P4; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| BIZ-002 | **Autosave** at every step; a Business may remain **Draft** and be resumed. Drafts are visible only to the owner. | Must | UNV | R1 | UXP §7.2; P3; AUD §4 (draft) |
| BIZ-003 | The Review step of the Business creation flow shall show a **Readiness Score preview** with the note that the score recalculates on later edits. | Must | UNV | R1 | UXP §7.2 |
| BIZ-003-B | The Review step shall also show a read-only preview of the Business's **Investment Type** state and the **Risk/Disclosure Notice** (depends on INV items; split from BIZ-003). | Must | UNV | R2 | UXP §7.2; INV-008; DEC-006 |
| BIZ-004 | **Funding Requirement:** P3 provides a single descriptive BDT funding-amount field. UXP additionally requires an **Investment Type Selector** (Micro / Large-Standard / Both) with type-specific *proposed* terms. Where this lives (Business-level vs Deal-level only) is **TBD** (DEC-006). | Must | UNV | PA | MPS §15.6, §24; UXP §7.2; P3 Amb.7; CONF-05; DEC-006 |
| BIZ-005 | The Founder shall select required **skills** from the shared Skill entity (searchable multi-select). | Must | IMP | R1 | P3; P2; AUD §4 (requirements, skills) |
| BIZ-006 | **Publish** requires server-side publish-readiness validation. The audit observes **submit and approve/reject** states; whether Admin approval is a mandatory pre-publish gate is **not stated**. **Unpublish/withdraw** is undefined (P3 default: none) — **TBD** (DEC-031). | Must | PAR | PA | P3 Amb.2–3; AUD §4; DEC-031 |
| BIZ-007 | **My Businesses** list shows, per Business: title, status (Draft/Published; plus Admin statuses where they exist), funding amount and Readiness Score indication. A Founder may own multiple Businesses (default). | Must | PAR | R1 | P3; UXP §6.1; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| BIZ-008 | The owner Business view shall give the Founder access to these functional areas: **Overview · Readiness Score Detail · Team · Documents · Activity** (R1). The Funding Ask & Investment Terms and Financial Reporting areas are BIZ-008-B (R2). Arrangement (tabs, sections, navigation) is a design decision. | Must | UNV | R1 | UXP §7.2 |
| BIZ-008-B | The owner Business view shall also provide **Funding Ask & Investment Terms** and **Financial Reporting** functional areas (split from BIZ-008). | Must | UNV | R2 | UXP §7.2; INV-*; FIN-* |
| BIZ-009 | Non-owner Business view: **Stage 1 (teaser) content is always available**; Stage 2+ sections are presented as **locked, with the unlock condition stated**. The Investment Type indication and Risk/Disclosure Notice are Stage 1; the detailed proposed return model is Stage 2+. | Must | PAR | R1 | UXP §7.2; P6; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| BIZ-010 | Ownership shall be enforced server-side; a Founder shall never read-for-edit, edit, publish or delete another Founder's Business. | Must | IMP | R1 | P3; AUD §6 (business ownership resolved server-side) |
| BIZ-011 | Founder shall upload Business documents (pitch deck, plan, financial documents) and tag each **Public / Stage 2 / Stage 3 / Stage 4**; mobile upload constraints in MOB-060…. | Must | PAR | R1 | P6 §A, §E; UXP §7.2; AUD §4, §6; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| BIZ-012 | **Multi-investor funding** (one large investor, many small investors, or a combination, "where legally permitted"): rules for target tracking, caps, oversubscription, round closing and aggregate progress are **not defined**. | Must | UNV | PA | MPS §4, §20; DEC-039 |

### 8.5 Search, Filtering & Discovery (DSC)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| DSC-001 | Three role-scoped discovery experiences: **Discover Startups** (Investor), **Discover Startups** (Professional), **Discover Investors / Professionals** (Founder). One reusable pattern. | Must | UNV | R1 | MPS §25.1; UXP §6.3; P4; AUD §2 (shared Discovery page) |
| DSC-002 | Search is **deterministic, keyword-based, case-insensitive, substring** over existing structured fields; empty query returns the full paginated, filtered set; no fuzzy/semantic/NLP matching. | Must | UNV | R1 | P4; MPS §8 |
| DSC-003 | Filters are limited to facets backed by real fields (UXP target facets listed in V1; facets lacking a backing field are **reported as gaps, not invented**). | Must | UNV | R1 | UXP §6.3; P4 Amb.1 |
| DSC-004 | The **investment-type filter and indication** (Micro / Large-Standard / Both) are required by UXP but excluded in P4 and have no confirmed Business-level field. | Must | UNV | PA | UXP §6.3; P4 Amb.7; DEC-006 |
| DSC-005 | Default sort: most recently published (Business) / updated (profiles); additional sorts only on existing fields. No relevance scoring. | Must | UNV | R1 | P4 Amb.6 |
| DSC-006 | Result entries show: name/logo, one-line summary, 3–4 filter-relevant facts, verification indication (if any) and an action to open the item. The Match Score appears **only** in the AI Suggestions view. **Match explanations shall come from the server's persisted/deterministic match detail; the client shall never synthesise or display demo explainability data** (web discovery still calls a demo factory — AUD-D03; review finding R-18). | Must | PAR | R1 | UXP §6.3; P4; AUD §5 (High) |
| DSC-007 | Active filters shall be visible and **individually removable**, with a "clear all" action; the result count and sort control shall be available; empty results shall offer **relaxed-filter suggestions**, never a dead end. | Must | UNV | R1 | UXP §6.3; P4 |
| DSC-008 | Results are **server-paginated with bounded page size**; how the user moves between pages (explicit paging, "load more", or another interaction) is a design decision. *(Pagination of other collections — see MOB-075, DEP-010. The legacy PRD anti-pattern "infinite-scroll feed" is recorded in Appendix M.)* | Must | PAR | R1 | UXP §13; P4; AUD §6 |
| DSC-009 | Filter/search/sort/page state shall persist when navigating to a result and back. | Must | NEW | R1 | P4 |
| DSC-010 | A **Search Results ⇄ AI Suggestions** toggle is provided when AI Suggestions exists; the two shall never be merged into one list. | Must | UNV | R1 | MPS §8; UXP §6.3, §13 |
| DSC-011 | Only **published** Businesses appear; drafts and non-public fields never appear. All discovery requires authentication. | Must | UNV | R1 | P4 |
| DSC-012 | A verification-tier **filter** is not defined (indication display only). | — | UNV | PA | P4 Amb.4 |
| DSC-013 | **Global top-bar search** across entity types: mentioned in UXP §3, not delivered by P4; scope **TBD** (DEC-019). | Should | UNV | PA | UXP §3; P4 Amb.5 |
| DSC-014 | **Express Interest** itself is a core flow (CON, DIS) and is **not deferred**. Only the **result-entry shortcut** for Express Interest and **Save/bookmark** (Saved Opportunities, Should-Have; no backing entity) are deferred. *(Clarified, review finding R-24.)* | Should | UNV | R2 | MPS §25.2; P4; DEC-018 |
| DSC-015 | **Saved searches / alerts** (Premium / Should-Have). | Should | UNV | R3 | MPS §18, §25.2 |


### 8.6 AI Features (summary — full requirements in Section 11)
Business Analysis / Readiness Score, Matching Engine, AI Suggestions **and the Gemini-based insight workflows** are specified in **Section 11 (AI-001 … AI-040)**. Functional placement on mobile: Readiness Score Detail and Improvement Suggestions (Founder, BIZ-008); Match Score and its detail (Discovery, Connections, Deal Room); AI Suggestions top 3 (Dashboard); AI Suggestions view in Discovery (DSC-010); deal and matching insights where the platform exposes them.

### 8.7 Staged Disclosure & NDA (DIS)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| DIS-001 | Four stages, per (Business, viewer) relationship: **1 Teaser · 2 Extended · 3 NDA · 4 Full Proposal**. Stage 1 needs no relationship record; a record is created on the viewer's first stage-relevant action (expressing interest). | Must | IMP | R1 | MPS §13; P6 §A–B; AUD §4 |
| DIS-002 | **1→2:** viewer expresses interest **and** Founder does not decline. P6 implementation: **auto-grant on interest** with a revocable Founder **Decline**. Interpretation unconfirmed (DEC-017). | Must | PAR | R1 | MPS §24; P6 §C; AUD §4 (interest synchronisation); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| DIS-003 | **2→3:** both parties accept the NDA. **3→4:** NDA complete **plus** explicit Founder confirmation to proceed (never automatic). No stage may be skipped; the client never supplies a stage value. | Must | UNV | R1 | MPS §24; P6 §C; v2.1 regrade (F-03): no audit citation exists for the 2→3 / 3→4 transition rules (review F-03) |
| DIS-004 | **Decline:** Founder may decline at Stage 1 or 2, holding the relationship at Stage 1. Re-expressing interest after decline is **undefined** (DEC-017). | Must | PAR | PA | P6 §C, Amb.2; AUD §4 |
| DIS-005 | **NDA:** platform-provided, **versioned** template; each party's acceptance recorded independently (user, role, version, timestamp); "Waiting on [Counterparty]" shown when only one has accepted; accept enabled only after the user scrolls to the end; a timestamped confirmation screen follows dual acceptance. | Must | PAR | R1 | P6 §D; UXP §7.5; AUD §4 (request/accept/decline); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| DIS-006 | **(Corrected — review finding R-08.)** The audit observes NDA **request, accept and decline**. NDA **withdrawal and expiry** are not mentioned in any source or in the audit and are **not to be built or implied** without a decision (DEC-017). UXP's alert example "Your NDA expires in 2 days" (UXP §2.5) conflicts with this (CONF-23). | Must | PAR | PA | P6 Amb.4; AUD §4; CONF-23; DEC-017 |
| DIS-007 | NDA acceptance is a confidentiality gate only; copy shall never imply an investment agreement, entitlement or legal enforceability. | Must | UNV | R1 | P6; MPS §30 |
| DIS-008 | Documents carry a stage tag (**Public / Stage 2 / Stage 3 (NDA) / Stage 4**) set only by the owning Founder. Documents the viewer cannot access are **listed as locked entries** (name + tag only, no download). | Must | PAR | R1 | P6 §E; UXP §9; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| DIS-009 | Restricted fields are **omitted from API payloads**, not nulled; the client renders locked UI from the **stage indicator**, never from missing/null fields. | Must | UNV | R1 | P6 §F |
| DIS-010 | The viewer's **current disclosure stage (1–4)** for the (Business, viewer) relationship shall be shown wherever a Business, Connection or Deal Room is presented, derived from server data and never computed on the client. | Must | UNV | R1 | UXP §9; P6 §H |
| DIS-011 | Every successful view/download of a Stage 2+ document is audit-logged server-side; the Founder sees a lightweight "Viewed by [X] on [date]" line. Full audit detail is Admin-only. | Must | PAR | R1 | MPS §12.2; UXP §9; P6; AUD §6, §8 (document policies and audit-log models); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| DIS-012 | Founder Activity view lists viewers/interested parties with stage and timestamps. Whether pre-interest "who viewed" is tracked is **TBD** (DEC-040). | Must | UNV | PA | UXP §7.2; P6 Amb.7 |
| DIS-013 | The **field-level mapping** of Business fields to Stage 2 vs Stage 4 is not enumerated by the sources; Founder-tagged documents are the source of truth for documents. | Must | UNV | PA | P6 Amb.6 |
| DIS-014 | **No AI output** — deterministic scores, recommendations **or LLM-generated insights** — may influence any disclosure, NDA or document-access decision. | Must | UNV | R1 | P6; UXP §13; AI-025 |
| DIS-015 | A **soft retention nudge** (a non-blocking informational message that can be dismissed; never a blocking dialog) shall be shown at Deal Room entry and at the NDA stage. | Must | UNV | R1 | MPS §16.2; UXP §10 |
| DIS-016 | Stage unlocks shall be communicated **factually** (what changed and what it unlocks). Celebratory reveal effects (confetti, counting animation) are a legacy design preference (Appendix M), not a requirement. | Must | UNV | R1 | UXP §8, §13 |

### 8.8 Interest, Application & Connection (CON)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| CON-001 | A Founder may **reciprocate** a viewer's interest; when both sides have expressed interest and the relationship is not declined, a **Connection** is created and references the Match Score. One-sided interest remains a visible pending record. | Must | PAR | R1 | MPS §24; P7 §A; AUD §4 |
| CON-002 | **Connections list:** counterpart, role, Match Score, current stage/status, last activity and a primary action; filterable by All / Pending / Active / Completed. | Must | PAR | R1 | UXP §6.5; P7; AUD §4 |
| CON-003 | **Professional Applications Tracker:** the applicant can see the application status progression *Applied · Under Review · Interview/Negotiation · Offer · Joined · Declined*. The unified status model with the Investor interest flow is an **assumption** (Founder sets intermediate statuses before mutual interest); the audit flags "application" surfaces as needing runtime confirmation. | Must | PAR | R1 | UXP §7.4; P7 §A, Amb.2; AUD §4 |
| CON-004 | Tier 0 users may express interest; higher-trust actions (Stage 3 NDA, recommendation priority) require Tier ≥ 1. | Must | UNV | R1 | MPS §24 |
| CON-005 | Founder **Decline** is a single mechanism reused across disclosure and connection flows. | Must | UNV | R1 | P7 §A |

### 8.9 Deal Room, Negotiation, Agreement & Milestones (DLR / NEG / AGR / MIL)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| DLR-001 | The Deal lifecycle shall be exactly: **Matched → Interest Confirmed → Deal Room Opened → NDA Signed → Negotiation → Agreement → Milestone Funding Active → Completed**. No states added, removed or skipped. Every transition is recorded as history (from, to, actor, timestamp); the client never sends a target status. | Must | PAR | R1 | MPS §14.1; MDP §14; P7 §B; AUD §4 (deal stages); v2.1 regrade (F-03): AUD lists deals and stages; the exact eight-state lifecycle is not evidenced |
| DLR-002 | State triggers (P7 defaults): *Matched* — Match Score exists (**conceptual; may not be persisted** — see DLR-011); *Interest Confirmed* — Connection created; *Deal Room Opened* — same transaction as Interest Confirmed (unconfirmed); *NDA Signed* — the linked disclosure relationship reaches Stage 3 (the **same** NDA event as DIS-005; **cannot be advanced manually**); *Negotiation* — after NDA; *Agreement* — both confirm the same terms; *Milestone Funding Active* — Agreement confirmed and milestones defined; *Completed* — all milestones completed. **Ordering edge cases are resolved in DLR-011…DLR-014 (PENDING USER APPROVAL).** | Must | PAR | R1 | P7 §B, Amb.3; MPS §24; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| DLR-003 | The Deal Room shall always show the Deal's **current state and its position in the eight-state progression** (DLR-001) and, for investor deals, the **Investment Type** (when INV exists). Content is driven by the current state. Presentation is a design decision. | Must | UNV | R1 | UXP §10 |
| DLR-004 | **Mobile access to Deal Room functions:** the user shall be able to reach **Overview · Documents · Chat · Terms · Milestones · Financial Reports (R2)**, with availability adapting to Deal state; the participant summary and activity log shall be accessible. How these are arranged (tabs, sections, navigation) is a design decision. | Must | NEW | R1 | UXP §10, §11 |
| DLR-005 | The Documents area is a **view over the Phase 6 stage-gated set**; no separate store or access path; no Deal Room content is served unless the linked disclosure relationship permits it. | Must | UNV | R1 | P7 §D; AUD §4; v2.1 regrade (F-03): AUD does not state that Deal Room documents are a view over the stage-gated set |
| DLR-006 | State-specific Deal Room content (UXP §10): *Matched/Interest Confirmed* — invitation to proceed and the NDA action; *NDA Signed* — documents unlock per stage; *Negotiation* — terms; *Agreement* — read-only recorded agreement; *Milestone Funding Active* — milestones and progress updates; *Completed* — read-only archive and feedback prompt. Investment-type terms and the Financial Reports area are DLR-006-B (R2). | Must | PAR | R1 | UXP §10 |
| DLR-006-B | During *Negotiation* the Deal Room shall present **Investment Type-specific terms** (NEG-002…004) and during *Milestone Funding Active* the **Financial Reports** area (FIN-*) (split from DLR-006). | Must | UNV | R2 | UXP §10; DEC-006; DEC-012 |
| DLR-007 | Deal access is limited to the Founder, the counterparty, and a Finance Manager whom the Founder has expressly authorized for that specific Business and Deal. The Finance Manager receives only delegated resources/actions and remains subject to current membership, disclosure-stage, two-sided NDA, verification-tier and Business-isolation rules. No other non-participant receives Deal, negotiation, agreement, milestone or progress data. Admin has no default access to confidential Deal content; any read-only oversight exception must be explicitly authorized, necessary and audited. | Must | NEW | PA | BR-DEC-005/006/009; MSG-DEC-005/007; ROL-006 |
| DLR-008 | A **single generic Deal entity**, parameterised by counterparty role (Investor or Professional), is assumed; "Teams" is a derived view. | Must | UNV | PA | P7 Amb.6; DEC-030 |
| DLR-009 | Irreversible or high-stakes actions (NDA acceptance, Agreement finalisation, milestone completion, investment terms finally agreed) shall require an **explicit, separate confirmation step that states the consequence** before the action is submitted. | Must | UNV | R1 | UXP §2.5 |
| DLR-010 | Deal Room **meeting scheduling**. | Should | UNV | R3 | MPS §14, §25.2 |
| DLR-011 | **(New — review finding R-08(b).) "Matched" and the first persisted state.** The client shall render **only the state the server returns for an existing Deal**; it shall not display a Deal state progression for a pair that has no Deal record. *Matched* is a **conceptual** state (a Match Score exists) unless a decision says it is persisted. **PENDING USER APPROVAL (DEC-043):** (i) *Matched is conceptual; first persisted state is Interest Confirmed* (P7 default); (ii) persist a Deal at *Matched* when a Match Score is generated for a pair; (iii) other. | Must | UNV | PA | P7 §B; MPS §14.1; DEC-043 |
| DLR-012 | **(New — review finding R-08(a).) NDA completed before the Connection exists.** MPS §24 allows the Deal Room to be created "alongside or after NDA initiation" and the disclosure relationship (P6) is independent of the Connection (P7), so the relationship may already be at **Stage ≥ 3** when a Connection/Deal is created. The sources do not say how lifecycle states 3–4 behave then. **PENDING USER APPROVAL (DEC-043):** (A) the server records the intermediate transitions in order within one transaction (history preserved, nothing skipped) and the Deal opens at *NDA Signed*; (B) the Deal is created at *Deal Room Opened* and *NDA Signed* is applied by a separate server evaluation; (C) other. Until decided, the client shall render whatever state and history the server returns and shall never infer or reorder states. | Must | UNV | PA | MPS §14.1, §24; P7 §B; DEC-043 |
| DLR-013 | **(New — review finding R-08(c).) Non-completion.** P8 and REP-004 refer to **cancelled/rejected/abandoned deals**, but MPS §14.1 and DLR-001 define no cancel/terminate state. **PENDING USER APPROVAL (DEC-044):** (i) *no new state* — non-completion is expressed only by Founder Decline (CON-005), a Disputed milestone (MIL-004) and Admin escalation; (ii) add a terminal "Cancelled/Withdrawn" state (**requires an MPS §14.1 amendment**); (iii) other. DLR-001 stands unchanged until a decision. | Must | UNV | PA | P8 §1.4; MPS §14.1; CONF-28; DEC-044 |
| DLR-014 | **(New — review finding R-08(d).) Professional deals and funding semantics.** DLR-008 makes the Deal generic, but "Milestone Funding Active", BDT milestone amounts and Financial Reports (FIN) are defined for investor deals. **PENDING USER APPROVAL (DEC-045):** (i) apply the same milestone model to Professional engagements as the P7 default; (ii) Professional deals use milestones **without** funding/commission semantics; (iii) Professional deals omit Milestone Funding Active and Financial Reports. | Must | UNV | PA | P7 Amb.6; MIL-001; DEC-045 |
| NEG-001 | Negotiation presents **current offer vs counter-offer side by side as structured terms**. Every counter creates a **new versioned entry** (proposer, terms payload, timestamp, status proposed/countered/accepted). History is never overwritten. | Must | PAR | R1 | UXP §7.4, §10; P7 §E; AUD §4; v2.1 regrade (F-03): AUD lists negotiations; versioned-row-per-counter is not evidenced |
| NEG-002 | Terms columns shall **adapt to Investment Type**: **Micro** — amount, proposed profit/loss-sharing %, reporting period; **Large/Standard** — amount, valuation basis, ownership %. Founder↔Professional — compensation, equity %, start date, role scope. P7 specifies only "investment amount, equity %, milestone structure" for investors (**CONF-06**). Final field list **TBD**. | Must | UNV | PA | UXP §10; P7 §E; CONF-06; DEC-006 |
| NEG-003 | If Investment Type has not been chosen for an investor deal, **selecting the Investment Type (Micro or Large/Standard) is the first required step** of Negotiation. | Must | UNV | PA | UXP §10, §6.7 |
| NEG-004 | Investment Type and its terms are **not interchangeable mid-deal without renegotiating** terms. Loss-handling is **explicitly defined in the terms before acceptance** (Micro loss-sharing only if explicitly agreed). | Must | UNV | PA | MPS §24; ILS §7 |
| NEG-005 | The Founder and Investor may submit/respond to versioned terms. A Finance Manager may submit versioned draft or counter-proposals only while an explicit Founder-issued authorization for that Business and Deal permits the action and only within delegated limits. A Finance Manager and Admin shall never finalize an agreement or confirm for a participant. Only the Founder provides final Founder-side confirmation, and the Investor independently confirms the same final version. | Must | NEW | PA | BR-DEC-006/007/011; BRM-008/009; AGR-001 |
| NEG-006 | The non-dismissible **Risk/Disclosure Notice** appears on every Negotiation and Agreement view (INV-008). | Must | UNV | R2 | UXP §6.7 |
| AGR-001 | An **Agreement** is created when both parties confirm the same finalised terms; **read-only** afterwards with both confirmation timestamps. Labelled "Recorded Agreement (Platform Simulation)", never "Legally Binding Contract". | Must | PAR | R1 | P7 §F; UXP §10; MPS §30; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AGR-002 | Whether the "signed agreement document" is a downloadable generated file or an in-app read-only record is **TBD** (DEC-035). Any file is a plain platform record, not a legal instrument. | Must | UNV | PA | P7 Amb.9 |
| MIL-001 | After Agreement, the Founder defines milestones (description, BDT amount, sequence), e.g., MPS example: total ৳15,00,000 → ৳5,00,000 MVP Development; ৳4,00,000 First 100 Customers; ৳3,00,000 First Revenue; ৳3,00,000 Business Expansion *(illustrative only)*. | Must | PAR | R1 | MPS §14.2; P7 §G; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| MIL-002 | Milestone statuses: **Pending, In Progress, Completed, Disputed**. A milestone moves the Deal forward only when Completed. | Must | PAR | R1 | MPS §23–§24; AUD §4; v2.1 regrade (F-03): AUD §4 lists milestones but not the four statuses |
| MIL-003 | **Two-step completion:** Founder "Mark Complete" (with notes/evidence) does not complete the milestone; the counterparty must separately **confirm**; both actions timestamped and logged; the next milestone unlocks only after confirmation. *(MPS §24 says "marked completed"; the two-step rule comes from UXP §7.5/P7 — CONF-13, meaning inferred from V1 usage.)* | Must | PAR | R1 | UXP §7.5; P7 §H; AUD §10 (milestone confirmation is a concurrency-test scenario); CONF-13; v2.1 regrade (F-03): AUD §10 cites milestone confirmation only as a concurrency-test scenario; the two-step rule is not evidenced |
| MIL-004 | Either participant may flag a milestone **Disputed**; no mediation/Admin dispute-resolution workflow beyond the status and basic Admin oversight. | Must | UNV | R1 | P7 §H, Amb.7; DEC-014 |
| MIL-005 | **Progress updates:** author, content, optional attachment, timestamp; visible to the two participants and read-only Admin. | Must | UNV | R1 | P7 §H |
| MIL-006 | When the last milestone is confirmed, the Deal becomes **Completed** and archived; both parties are prompted for feedback. | Must | UNV | R1 | P7 §H; P8 §1.3 |
| MIL-007 | Milestone "release" is a **status change only**: no real payment, real-value ledger entry, escrow or custody. Simulated payment/commission records are permitted only when labelled **Simulated** and carrying no real value. Any release containing them depends on the new Node.js backend requirements, implementation and verification in PAY-007; the legacy Laravel branch is historical evidence only and is not a baseline, contract or merge dependency. | Must | NEW | PA | MPS §14.2, §20, §30; G-00; G-01; PAY-007 |
| MIL-008 | Milestone funding governs **when capital is released**; the Investment Model governs **what the investor receives**. These shall not be conflated in UI or data. | Must | UNV | R1 | MPS §14.2 |
| MIL-009 | Whether the counterparty must separately approve the milestone *structure* (vs implicit via Agreement confirmation — P7 default) is **TBD** (DEC-014). | Must | UNV | PA | P7 Amb.5 |
| MIL-010 | Milestones shall be presented as an **ordered sequence showing each milestone's amount and status** (status always with a text label, never by colour alone), with access to progress updates and to funding progress against milestone points. | Must | NEW | R1 | UXP §2.5, §7.5 |

### 8.10 Investment Model & Financial Transparency (INV / FIN / PTF)

> **Status correction (review findings R-02, R-07):** Edition 1.0 marked this whole area `GAP`. The audit observes **financial reports, evidence, discrepancies, audit records and participant/admin views** ("COMPLETE core / NOT RUNTIME VERIFIED"), but is **silent on Investment Type selection and per-deal return-model terms**. INV items are therefore `UNV`; FIN items are `IMP` only where the audit evidences the capability, otherwise `UNV`. Proposed release for this group: **R2** (REL-002), PENDING USER APPROVAL. Commission/payment items are in Section 10.

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| INV-001 | Investment is **one feature with two modes** — **Micro Investment (Profit/Loss Sharing)** and **Large/Standard Investment (Equity/Ownership)** — sharing the same discovery, Staged Disclosure, NDA and Deal Room flow. | Must | UNV | R2 | MPS §15; ILS §1; SG-09 |
| INV-002 | **Micro:** the investor normally holds **no ownership**; profit/loss-sharing terms are **deal-specific, agreed and recorded in the Deal Room** — never a platform-wide percentage; **profit is not guaranteed**; no distributable profit may mean no payout for a period; loss sharing applies only if explicitly in the agreed terms. | Must | UNV | R2 | MPS §15.1, §15.3; ILS §2, §7 |
| INV-003 | **Large/Standard:** the investor may receive an **agreed ownership percentage**, subject to the final contractual/legal structure; value can rise or fall; equity does not mean guaranteed profit. | Must | UNV | R2 | MPS §15.2–§15.3; ILS §3 |
| INV-004 | A business may accept Micro, Large/Standard or **both**; the investor chooses a type per opportunity; the founder enables types. A founder-set **minimum Micro contribution** appears **only as an ILS illustrative example** (ILS line 24) and is **not asserted as a requirement** (review finding R-21); whether it is a rule is **TBD** (DEC-011). Platform-wide minimum/maximum per type is **TBD** (DEC-011). | Must | UNV | PA | MPS §15; ILS §2; DEC-006; DEC-011 |
| INV-005 | The two modes shall **never be presented as interchangeable**: each mode's presentation differs in content and structure (not by label alone). Micro never uses an equity presentation; Large/Standard never uses a profit-sharing presentation. | Must | UNV | R2 | UXP §6.7, §13 |
| INV-006 | **Return Model Summary** — two mutually exclusive variants, never shown together: *Profit/Loss Sharing Summary* (agreed terms, reporting period, profit received to date, persistent line "No distributable profit may mean no payout this period.") and *Equity Ownership Summary* (agreed ownership %, valuation basis where applicable, persistent line "Ownership value may increase or decrease with business performance."). Values render from the **agreed deal terms**. | Must | UNV | R2 | UXP §6.7 |
| INV-007 | **No hard-coded universal percentages.** The sample figures in the sources (5% profit share, 2% ownership, ৳40,000 pool → ৳2,000; ৳10,000 ÷ ৳5,00,000) are **illustrative only** and shall never appear as defaults, placeholders or marketing numbers. | Must | UNV | R2 | MPS §15.1–§15.2; UXP §13 |
| INV-008 | The **Risk/Disclosure Notice** — "Returns are not guaranteed and investment can lose value" plus the type-specific line — shall be **persistently displayed (not dismissible)** on every Investment Summary, Return Model Summary and Deal Room Negotiation/Agreement view. | Must | UNV | R2 | UXP §6.7; MPS §15.3 |
| INV-009 | **Investment Terms Summary:** Investment Type, Amount (৳), Return Model, terms status (Proposed / Negotiated / Final Agreed — mirrors Deal Status). | Must | UNV | R2 | UXP §6.7 |
| INV-010 | Whether and how **simulated distributions / "profit received"** are recorded is **undefined**; the platform shall not calculate or invent payouts. | Must | UNV | PA | MPS §15.7; ILS §8; DEC-006 |
| INV-011 | Investor eligibility rules per investment type, securities treatment and taxation are **out of MVP**; real-money use requires legal review. | Must | N/A | N/A | MPS §15.9; ILS §10 |
| FIN-001 | **Periodic Financial Report** for a defined reporting period: revenue, expenses, **net profit/loss (calculated)**, cash position (optional), notes. Cadence **TBD** (DEC-012). | Must | PAR | R2 | MPS §15.4; ILS §4–§5; AUD §4 (reports); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| FIN-002 | **Net Profit/Loss = Revenue − Expenses**, calculated by the platform from structured inputs, read-only and labelled "Calculated: Revenue − Expenses". There is **no typed "profit" field**. | Must | UNV | R2 | MPS §15.4, §24; ILS §5, §10 |
| FIN-003 | The Founder may attach **supporting evidence** (invoices, sales summaries, expense records, statements, other documents), multi-file, to a report. | Must | IMP | R2 | MPS §15.4; UXP §7.2; AUD §4 (evidence) |
| FIN-004 | **Financial Verification Status**: *Self-Reported · Evidence Submitted · Under Review · Verified/Reviewed*. On submission: Self-Reported (no evidence) or Evidence Submitted (evidence attached) — **never higher**; only Admin advances to Under Review/Verified-Reviewed, except an investor discrepancy flag which moves a report to Under Review. | Must | UNV | R2 | MPS §15.4; UXP §7.2, §7.5 |
| FIN-005 | "Self-Reported" shall never be shown or implied as reviewed; "Verified/Reviewed" reads **"Reviewed by Admin"**, never "Verified", "Certified" or "Audited". Evidence presence is shown separately from verification status. | Must | UNV | R2 | MPS §15.4; UXP §6.7, §9 |
| FIN-006 | Submitted reports are **read-only**; an edit creates a **new versioned entry** with an "edited after submission" note; material changes are audit-trailed. Historical reports remain visible and traceable. *(History lists are an audit-observed pagination risk — AUD-D04.)* | Must | UNV | R2 | MPS §15.4; UXP §7.2; ILS §6; AUD §4, §6 |
| FIN-007 | Financial reporting becomes active once the Deal reaches **Milestone Funding Active**; an investor on a funded deal may **flag a discrepancy** with a short structured reason and optional neutral-language note; never "fraud"/"scam" wording. | Must | PAR | R2 | MPS §15.4, §24; UXP §7.2, §7.5; AUD §4 (discrepancies) |
| FIN-008 | On flag: Discrepancy Status = **Needs Review** (UXP) and the report's Financial Verification Status = **Under Review**. Discrepancy vocabulary (3 values in MPS/ILS vs 4 in UXP) and the full set of Admin outcomes are **TBD** (CONF-12; DEC-013). | Must | UNV | PA | UXP §6.7; MPS §15.4; ILS §6 |
| FIN-009 | Financial evidence documents follow the **same stage/NDA gating, encryption-at-rest and audit logging** as Stage 3/4 confidential documents; evidence opens in the review workspace/viewer, never via a generic thumbnail. | Must | UNV | R2 | MPS §12.2, §29; UXP §9; P9 §15 |
| FIN-010 | Financial figures presented graphically shall **always have a text/table equivalent**, carry the persistent **"Simulated"** label, and shall never be presented as a "win" or celebratory outcome. Chart type, colours and styling are design decisions (legacy chart-palette and AI-accent rules → Appendix M). | Must | UNV | R2 | UXP §2.5, §6.7, §12 |
| FIN-011 | The layer makes misreporting **harder, more visible and reviewable**; the product shall never claim fraud-proof or fully verified financial reporting. | Must | UNV | R2 | MPS §15.5, §30; ILS §6 |
| FIN-012 | Handling of **late or missing reports** (reminders, flags, consequences) is **undefined**; none shall be invented. | Must | UNV | PA | DEC-012 |
| PTF-001 | **Investment Detail** (per investment): type, amount, agreed terms, profit received (Micro) or ownership (Large/Standard), current and historical financial performance, profit/loss, verification status per report, evidence availability, risk statement, historical reports, discrepancy flags with status. *(The investor's ability to **view** reports and statuses on a funded deal is Must via FIN; this row is the Should-Have portfolio-level aggregation — overlap clarified, review finding R-19.)* | Should | UNV | R2 | MPS §15.7; UXP §7.3 |
| PTF-002 | **Portfolio** summary: total simulated committed, active deals, completed deals, average Match Score; per deal: Financial Verification Status, discrepancy indication and the Risk Notice; an aggregate milestone view labelled "Simulated". | Should | UNV | R2 | UXP §7.3, §11 |
| PTF-003 | "Portfolio Value (simulated)" and "Avg. Match Score of saved" have **no defined calculation** — **TBD** (DEC-040). | Should | UNV | PA | UXP §6.1 |

### 8.11 Reputation (REP)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| REP-001 | Multi-sided, per role — **Founder:** identity verification, experience, previous projects, milestone completion, investor feedback, timely evidence-backed financial reporting; **Investor:** verification, investment history, deal completion, founder feedback; **Professional:** skills, experience, previous projects, startup feedback. | Must | PAR | R1 | MPS §17; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| REP-002 | Reputation is strengthened by **verified on-platform activity and completed deals**, not profile claims; verification tier is an input, not the score. | Must | PAR | R1 | MPS §17, §24; P8 §1.1; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| REP-003 | Reputation is **explainable and traceable**: qualitative tier + trend, contributing-factor breakdown, chronological history with cause per event; never a bare number. History is immutable. *(History lists must be paginated — DEP-010.)* | Must | UNV | R1 | UXP §7.5; P8 §1.2 |
| REP-004 | Feedback eligibility (server-enforced): only parties to a **Completed** deal; Founder↔Investor bidirectional; Professional reputation draws on startup feedback only; one feedback per reviewer per deal; no self-review; no edit workflow; **cancelled/rejected/abandoned deals neither help nor penalise** *(this P8 rule presupposes a non-completion outcome that DLR-001 does not define — see DLR-013 / CONF-28 / DEC-044)*. | Must | PAR | R1 | P8 §1.4–§1.5; AUD §4 (feedback); v2.1 regrade (F-03): AUD says feedback/reputation services exist; eligibility rules are not evidenced |
| REP-005 | Recalculation triggers: verified milestone completions, deal completions, feedback submissions, verification tier changes (read-only). No decay, no login signal. | Must | UNV | R1 | MPS §24; P8 §1.2 |
| REP-006 | Exact formula/weights are not defined by the MPS; P8 uses a documented smallest-reasonable deterministic assumption. Whether Professional engagements reach a "completed" signal is **unconfirmed** (DEC-027, DEC-028). | Must | UNV | PA | P8 §1.6, §0.3 |
| REP-007 | Reputation never guarantees returns, validates financial truth, replaces financial verification status or alters profit/loss/equity; it is not an AI score and is not used in Search ranking or AI input (P8 scope). | Must | UNV | R1 | P8 §2–§4 |
| REP-008 | Admin may adjust reputation manually; every adjustment is logged. | Must | UNV | R3 | P8; P9 §12 |
| REP-009 | Reputation/profile analytics views. | Should | UNV | R3 | MPS §25.2 |

### 8.12 Premium — Subscription Simulation (PRM)

> **Status correction (review finding R-14):** Edition 1.0 marked Premium `GAP`. The audit observes a **premium page (primarily UI)** and found **no authoritative billing/subscription enforcement**. Premium rows are `PAR`. Pricing and scope remain open (DEC-008).

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| PRM-001 | **Free tier (all roles):** profile creation, basic listings, basic search/filters, limited AI recommendations, basic messaging, basic Deal Room. | Must | PAR | R2 | MPS §18; AUD §4 |
| PRM-002 | **Premium Founder:** advanced AI business analysis, detailed Readiness Score, AI improvement suggestions, advanced investor matching, priority visibility, AI pitch-deck assistance, financial projection assistance, advanced analytics, priority access to verified investors. | Must | PAR | R2 | MPS §18 |
| PRM-003 | **Premium Investor:** advanced AI deal recommendations, early access to selected opportunities, advanced filters, detailed startup analytics, advanced founder reputation info, portfolio dashboard, opportunity comparison, AI-powered deal ranking, saved searches/alerts, priority access to verified founders. | Must | PAR | R2 | MPS §18 |
| PRM-004 | **Premium Professional:** priority profile visibility, advanced search/filters, AI startup recommendations, profile analytics, more applications, verified skill badge, priority access to selected opportunities. | Must | PAR | R2 | MPS §18 |
| PRM-005 | Premium is a **simulation** — feature-gating with **no real payment processing** unless separately specified. | Must | PAR | R2 | MPS §18, §20, §30 |
| PRM-006 | A premium boost may influence AI-Suggestion ranking but **never hides** lower-ranked legitimate results from Search & Filtering. | Must | UNV | R2 | MPS §24 |
| PRM-007 | Pricing page: role-tabbed Free vs Premium comparison with Monthly/Annual toggle (UXP). **No prices, durations or tier names are defined** — **TBD** (DEC-008). | Must | UNV | PA | UXP §7.1 |
| PRM-008 | Phase assignment (P8 removed Premium; P9 assumes it exists), **whether subscriptions are real scope with backend enforcement** (audit open question) and whether any mobile-store billing is involved are **TBD** (DEC-008, DEC-048; CONF-08). | Must | UNV | PA | P8; P9 §13; AUD §9 (P1 item 5) |

### 8.13 Admin — Governance, Trust, Verification & Risk Control (ADM)

> Admin is **not a CRUD dashboard** (MPS §19). All requirements are preserved. **Whether each is delivered in the mobile app is PENDING USER APPROVAL (DEC-004).** Statuses are corrected from the audit (review finding R-02): the platform already has a paginated user directory, business and verification governance, financial/discrepancy admin views and AI admin insights; it **lacks** staff-tier RBAC, matching-rule administration, notification-template administration and an admin notification inbox.

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| ADM-001 | Admin shall provide: user management; identity-verification review; business oversight; application/team oversight; Micro and Large/Standard investment records and terms visibility; financial reports, verification status and evidence review; investor-raised discrepancies and complaints; founder financial-reporting activity and risk indicators; basic dispute/review workflows; deal oversight; reputation oversight; audit-log review; investment/financial analytics; platform analytics and settings. | Must | PAR | R3 | MPS §19; AUD §4 |
| ADM-002 | **Dashboard:** stat row (New Users 7d, Pending Verifications, Open Reports, Active Deals, Businesses Published) + previews of Verification Queue (oldest first), Reports/Disputes (by severity), open Financial Discrepancies (by age), recent audit tail. | Must | UNV | R3 | UXP §7.6; P9 §2 |
| ADM-003 | **Users:** list/search/filter (role, tier, status); view; suspend/restore (reversible, audited). **Impersonate-for-support** is named in UXP §6.6 but **deferred** by P9 — not built unless explicitly instructed (CONF-22; DEC-020). | Must | PAR | R3 | UXP §6.6; P9 §2, §29; AUD §4 (paginated directory) |
| ADM-004 | **R1 separate Web Admin Verification Queue:** the minimum R1 Web Admin shall support Tier 1 review with applicant, requested tier, waiting time, authorized ID/selfie evidence viewing, profile/history needed for review, and **Approve / Reject / Request More Info**, each with a required short reason surfaced to the applicant. This requirement does not approve the complete Admin inventory; OD-10 remains PENDING for the exact minimum set. | Must | NEW | R1 | OD-03; OD-10; UXP §7.6; P2; P9 §7 |
| ADM-005 | **Businesses:** view, **flag**, **suspend listing** — explicit, reversible, auditable, reason visible to the founder; Admin shall not edit business content and shall not manipulate ranking silently. | Must | PAR | R3 | P9 §8; MPS §24; AUD §4 (review/decision actions) |
| ADM-006 | **Applications** and **Teams** (startup teams): read-only oversight; Teams are derived from Business + Connection/Application data. | Must | UNV | R3 | P9 §9 |
| ADM-007 | **Deals:** view lifecycle/status metadata (not automatically Stage 3/4 content) and **Escalate**. | Must | PAR | R3 | P9 §10; AUD §1 |
| ADM-008 | **Investments:** founder, investor, Investment Type, amount, deal stage, latest Financial Verification Status; View and Escalate only; never execute, alter terms/percentages, settle funds or imply guaranteed return. *(Admin investment oversight exists only in uncommitted work — AUD §1.)* | Must | PAR | R3 | P9 §14; UXP §6.6 |
| ADM-009 | **Financial Reports review workspace:** submitter identity → reported summary → evidence (inline viewer where possible) → current verification status → linked discrepancy → prior reports → status-change audit mini-log. Actions: Review, Mark Evidence Submitted / Under Review / Verified-Reviewed, Request More Evidence — each with a logged reason. Admin cannot edit figures, recompute net or attach evidence for a founder. | Must | PAR | R3 | P9 §15; UXP §7.6; AUD §4 (admin views) |
| ADM-010 | **Financial Discrepancies:** reporter, business, report, status, flagged date; Investigate / Resolve / Mark Disputed; outcomes limited to Resolved, Disputed, or left Under Review — no penalties. A **separate Must-Have**, higher priority than generic Reports/Disputes. | Must | PAR | R3 | P9 §1, §15; MPS §25.1; AUD §4 |
| ADM-011 | **Reports/Disputes** (generic, minimal): category, severity, status (open / investigating / resolved / escalated), resolver, reason; Investigate / Resolve / Escalate. | Should | UNV | R3 | MPS §25.2; P9 §11 |
| ADM-012 | **Reputation oversight:** table, history, logged manual adjustment. **Premium oversight:** read; adjust only if genuinely needed, authorised and audited. | Must / Should | UNV | R3 | P9 §12–§13 |
| ADM-013 | **Audit Logs:** read-only, immutable, searchable (actor, action, entity, timestamp, IP if captured); never expose secrets, tokens or document contents. Every new Admin write action writes to the existing audit mechanism. *(Unrestricted audit/access-log collections are an audit-observed pagination risk — AUD-D04.)* | Must | PAR | R3 | MPS §12.2; P9 §17; AUD §6 |
| ADM-014 | **Platform Analytics** (date-range control + CSV export on each): user growth by role; deal funnel; Readiness Score distribution; Match Score distribution; **simulated commission revenue over time**; investment volume by type (simulated); financial-report verification-status mix and open-discrepancy trend. The audit confirms an admin insight snapshot exists (with many separate aggregate queries — AUD-D07) and that **predictive analytics/forecasting does not exist and is not a requirement**. | Must | PAR | R3 | UXP §7.6; P9 §16; AUD §4, §6 |
| ADM-015 | **Settings:** platform feature flags and simulation-disclaimer text; Matching Engine weights (read-only display; editing, if ever allowed, requires a live-scoring warning); notification templates; Admin team/roles. **Audit: staff-tier RBAC and staff-role assignment, policy editing, match-engine administration, notification-template administration and staff permission audit history are explicitly not implemented** (UI labels them unavailable). Feature flags/disclaimer-text administration are `UNV`. | Must | MIS | PA | UXP §7.6; MPS §9.2; AUD §4–§5 |
| ADM-016 | **Admin security:** the new backend shall enforce Admin role and target-resource authorization on every request, prevent IDOR/privilege escalation, and preserve RBAC/stage/NDA boundaries. Admin authentication/session design remains OD-11/OD-08/DEC-038 PENDING. *(Legacy Sanctum middleware evidence is historical only.)* | Must | NEW | R1 minimum / PA | OD-03; OD-11; DEC-038 |
| ADM-017 | **Admin data on a small screen:** every field available in the web Admin tables shall remain accessible per entity, with an entity detail view and that entity's audit history; bulk actions are deferred. Presentation is a design decision. | Must | NEW | R3 | UXP §6.6, §11 |
| ADM-018 | **Admin approvals never touch substance:** actions limited to review, status changes (Verified/Reviewed, Resolved, Disputed) and escalation. | Must | UNV | R3 | UXP §6.6; P9 |

### 8.14 Notifications & Messaging (NTF / MSG)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| NTF-001 | A basic **in-app notification centre** (bell, unread count, detail view) shall exist for authenticated users. **Participant notifications exist; an admin notification inbox explicitly does not** (AUD §5) — Admin mobile notification inbox therefore depends on backend work (DEP-013). | Must | PAR | R1 | MPS §7(18), §25.1; UXP §3; AUD §4–§5 |
| NTF-001-A | An **Admin** in-app notification inbox (split from NTF-001). **Explicitly not implemented** (AUD §5); depends on backend work (DEP-013) and on DEC-004. | Must | MIS | R3 | AUD §5; DEP-013; DEC-004 |
| NTF-002 | **Event taxonomy** is undefined in the sources. Candidate events *derivable from the sources (not decided):* verification decision; new interest; Founder decline/reciprocation; NDA awaiting/completed; stage change; Deal state change; negotiation offer/accept; Agreement confirmed; milestone marked/confirmed/disputed; financial report submitted/reviewed; discrepancy flagged/resolved; Admin action outcomes; reputation change. The **implemented event set shall be extracted from the repository** rather than invented (DEP-006; DEC-009). | Must | UNV | PA | P9 §18; DEC-009 |
| NTF-003 | **Push notifications** (APNs/FCM) are new for mobile. Content shall avoid exposing confidential business/financial details on lock screens (generic text; detail after authentication). | Should | NEW | R2 | MPS §12 |
| NTF-004 | **Notification preferences** exist for participants (audit); opt-out semantics, quiet hours and per-channel control for mobile are **TBD** (DEC-009). | Should | PAR | PA | AUD §4; DEC-009 |
| NTF-005 | Saved-search **alerts** are Premium/Should-Have. | Should | UNV | R3 | MPS §18, §25.2 |
| MSG-001 | **Deal Room messaging** remains part of the Deal Room and follows the formal Deal lifecycle and disclosure/NDA controls. Legacy audit observation of old messages is historical only and does not evidence the new backend. Delivery model, attachments, read receipts and moderation remain PENDING (DEC-010; MSG-DEC-011/012). | Must | NEW | PA | MPS §14; DEC-010; MSG-DEC-005/011/012 |
| MSG-002 | "Basic messaging" appears in the Free tier (MPS §18) with no definition relative to Deal Room chat — **TBD**. | Must | UNV | PA | MPS §18 |
| MSG-003 | No message scanning, contact-detail detection or blocking of phone/email in messages — ever in MVP. | Must | UNV | R1 | MPS §16.3; MDP §15 |
| MSG-004 | Deal Room Chat is accessible only to currently authorized Deal participants and an expressly delegated Finance Manager for that Business and Deal. It follows disclosure/NDA gates; message history is paginated. Admin has no default access. | Must | NEW | PA | P7 §D; BR-DEC-006/009; MSG-DEC-005/006/007 |
| UMSG-001 | The mobile app shall provide one Messages entry point with **All, Hiring, Deals and Team** filters. Category logic and release allocation remain PENDING. | Must | NEW | PA | MSG-DEC-001/002/013 |
| UMSG-002 | Each listed conversation shall show only authorized identity, conversation type, Business context, participant/represented role, permitted last-message preview and unread count. Unauthorized sensitive fields shall be omitted server-side. | Must | NEW | PA | MSG-DEC-001/006/007/008 |
| UMSG-003 | Authorized conversation search shall return only conversations and fields the requester can currently discover and read. Search results and snippets shall obey Business, Deal, disclosure-stage and NDA isolation. | Must | NEW | PA | MSG-DEC-006/007/008; DEC-019 |
| UMSG-004 | Founder–Professional Hiring Chat may occur before membership. Starting or using it shall not grant Business membership, Team Chat, Deal Room, financial-report, document or NDA-protected access. Initiation and anti-abuse policy remain PENDING. | Must | NEW | PA | MSG-DEC-003; BR-DEC-001 |
| UMSG-005 | Business Team Chat requires accepted active membership and the relevant permission for one Business. Participant discovery, listing, read, send, join and leave actions shall be authorized server-side with no cross-Business leakage. | Must | NEW | PA | MSG-DEC-004/006/007; BR-DEC-005/009 |
| UMSG-006 | An expressly delegated Finance Manager may communicate with the Investor only in the authorized Deal Room. The UI shall show the represented Business and delegated role; Founder participation remains available. | Must | NEW | PA | MSG-DEC-005; BR-DEC-006 |
| UMSG-007 | Messages are negotiation communications only. Text such as “I agree” shall never accept an NDA, confirm final terms, transition the Deal or substitute for structured Founder and Investor confirmations. | Must | NEW | PA | MSG-DEC-005/006; BRM-009; AGR-001 |
| UMSG-008 | The backend shall authorize conversation discovery, list, read, send, preview, search, unread calculation, notification and membership changes against current state on every protected action. | Must | NEW | PA | MSG-DEC-006/007/008/009 |
| UMSG-009 | Revocation of Business membership, messaging permission or Deal delegation shall prevent all subsequent message reads/sends and remove unauthorized previews, search hits, unread details and notification content, including cached inbox refresh. | Must | NEW | PA | MSG-DEC-006/010; BR-DEC-009/010 |
| UMSG-010 | Messaging notifications shall be generic by default and shall not expose NDA-protected, financial or confidential content on lock screens or through an external provider. Provider and user-preview choices remain PENDING. | Must | NEW | PA | MSG-DEC-009; DEC-009; OD-04 |
| UMSG-011 | Message history after revocation, retention periods, deletion semantics and attachments remain PENDING. No client shall promise access, deletion or retention behavior not approved under MSG-DEC-010/011. | Must | NEW | PA | MSG-DEC-010/011; BR-DEC-010 |
| UMSG-012 | Polling versus WebSockets, delivery/presence indicators, read receipts, moderation/reporting and Admin-access exceptions remain PENDING. No default Admin access to private Deal or NDA messages is permitted. | Must | NEW | PA | DEC-010; MSG-DEC-012 |
| UMSG-013 | Messaging release scope remains PENDING under G-07, DEC-018 and MSG-DEC-013. Required security controls apply in every release that includes any messaging category. | Must | NEW | PA | G-07; MSG-DEC-013 |

### 8.15 Dashboards (DSH)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| DSH-001 | The dashboard shall provide, for the active role: (a) verification tier and profile completeness; (b) key metrics (DSH-002); (c) the primary work list; (d) recent activity; (e) **AI Suggestions (top 3)** and Deal Rooms in progress; (f) a notifications preview. Arrangement and grouping are design decisions. | Must | NEW | R1 | UXP §6.1 |
| DSH-002 | **Founder** key metrics: Readiness Score · Active Connections · Deal Rooms Open · Profile Views (DSH-003); list: My Businesses. **Investor:** Active Deal Rooms; list: Recommended Startups (portfolio-linked metrics are DSH-002-B, R2). **Professional:** Active Applications · Deal Rooms · Profile Views (DSH-003) · Avg. Match Score; list: Recommended Startups + Application status. **Admin** (R3, DEC-004): Pending Verifications · Open Reports · New Users (7d) · Active Deals. A user holding several roles sees the dashboard of the **active role** (ROL-003). | Must | PAR | R1 | UXP §6.1; AUD §4 |
| DSH-002-B | **Investor** portfolio-linked metrics: Portfolio Value (simulated) · Saved Opportunities · Avg. Match Score of saved (split from DSH-002). Calculations and Save are undefined (DSH-003, DEC-040). | Should | UNV | R2 | UXP §6.1; MPS §25.2; DEC-040 |
| DSH-003 | "Profile Views", "Portfolio Value (simulated)", "Saved Opportunities" and "Avg. Match Score of saved" depend on **view tracking, Save and undefined calculations** — **TBD** (DEC-040). | Must | UNV | PA | P4; P6 Amb.7 |
| DSH-004 | New users (<20% profile completeness) see an **onboarding checklist** instead of the metric set. Loading states shall indicate progress without implying completion. | Must | UNV | R1 | UXP §6.1 |
| DSH-005 | Each dashboard module shall lead to a next action, and the user's **position in the role workflow** shall be visible (Founder: Readiness → Discovery → Disclosure → Deal Room → Milestones). | Must | NEW | R1 | UXP §5, §14 |


---

## 9. Business Workflows

### WF-001 Registration & onboarding
1. Visitor opens app → Landing/Login/Register. 2. Role selection → account details → role-specific profile fields (or post-login "complete your profile"). 3. Accept ToS + simulation disclaimer (explicit, unchecked by default). 4. Email verification (+ phone verification, possibly simulated) → **Tier 0**. 5. Profile completeness drives the onboarding checklist. 6. Optional identity verification → Tier 1 (WF-009). 7. **A user may later add further roles (ROL-003); the active role persists across restarts (ROL-003-D).**
*Sources: UXP §7.1; P1; P2; MPS §11; AUD §4.*

### WF-002 Founder end-to-end
Register → verify → create Business (wizard, autosave) → readiness analysis (deterministic score + AI insight, Section 11) → act on improvement suggestions → publish → discover investors/professionals (search + AI Suggestions) → receive/express interest → Staged Disclosure advances → NDA → Deal Room → negotiate (investment type and terms — R2) → Agreement → milestone funding (simulated) → periodic financial reports (R2) → progress updates → feedback → reputation.
*Sources: MPS §4, §33; UXP §5.*

### WF-003 Investor end-to-end
Register → verify → set preferences (incl. investment-type interest — `UNV`, DEC-006) → discover startups (search / AI Suggestions with Match Score) → express interest → Stage 2 → NDA (Tier ≥ 1) → Stage 3 → Founder confirms → Stage 4 → mutual interest → Connection → Deal Room → negotiate type and terms → Agreement → track milestones → review financial reports → optionally flag a discrepancy → feedback → reputation.
*Sources: MPS §4, §33; ILS §9; UXP §5.*

### WF-004 Professional end-to-end
Register → verify → build skills/experience profile → discover startups → AI Suggestions → apply (interest) → Founder sets status (Under Review / Interview/Negotiation / Offer) → negotiate compensation/equity → Joined (Deal) → track engagement → feedback → reputation. *(Completion signal for reputation unconfirmed — DEC-027; milestone/funding semantics for Professional deals — DEC-045.)*
*Sources: MPS §4; UXP §5, §7.4; P7.*

### WF-005 Staged Disclosure & NDA state machine (per Business × viewer)

| From | Trigger / Actor | Guard (server) | To |
|---|---|---|---|
| Stage 1 (no record) | Viewer expresses interest | Eligible role; not declined | Stage 2 (auto-grant; Founder may Decline) |
| Stage 2 | Founder **Decline** | Before Stage 3 | Stage 1 held (re-progress TBD — DEC-017) |
| Stage 2 | Viewer accepts NDA | **Tier ≥ 1** | Stage 2 (waiting on Founder) |
| Stage 2 | Founder accepts NDA | — | Stage 2 (waiting on viewer) |
| Stage 2 | NDA **declined** by a party | — (audit observes NDA decline) | Behaviour after decline: as implemented; not further specified in the sources |
| Stage 2 | Both NDA acceptances present | Dual acceptance recorded with NDA version | **Stage 3** |
| Stage 3 | Founder **confirms to proceed** | Stage 3 reached | **Stage 4** |

Any attempted skip, client-supplied stage, or Tier 0 access to Stage 3+ is rejected server-side with a clear reason. NDA withdrawal/expiry are not defined (DEC-017). *Sources: MPS §13, §24; P6 §C–§D; AUD §4.*

### WF-006 Deal lifecycle (transition table)

| # | State | Entered when (actor / event) | Key content | Open item |
|---|---|---|---|---|
| 1 | Matched | Match Score exists for the pair (conceptual) | — | DLR-011 / DEC-043 |
| 2 | Interest Confirmed | Founder reciprocates → Connection created | Invitation to proceed | — |
| 3 | Deal Room Opened | Same transaction as #2 (P7 default, unconfirmed) | Overview, NDA CTA | — |
| 4 | NDA Signed | Linked disclosure relationship reaches Stage 3 (same NDA event) | Documents unlock per stage | DLR-012 / DEC-043 |
| 5 | Negotiation | NDA signed; either party proposes terms | Versioned terms; investment type selector (R2) | — |
| 6 | Agreement | Both confirm the same finalised terms | Read-only recorded agreement | — |
| 7 | Milestone Funding Active | Agreement confirmed + milestones defined by Founder | Milestones primary; Financial Reports area (R2) | DLR-014 / DEC-045 |
| 8 | Completed | Last milestone confirmed by counterparty | Archive; feedback prompt | DLR-013 / DEC-044 |

*Each transition is server-validated, history-recorded and audit-logged. Sources: MPS §14.1; P7 §B; UXP §10.*

### WF-007 Milestone completion (two-step)
Founder defines milestones → status Pending/In Progress → Founder **Marks Complete** (notes/evidence) → counterparty **Confirms** (or flags **Disputed**) → status Completed → next milestone unlocks → on the last milestone, Deal → Completed. Release is a status change only (simulated). *Sources: UXP §7.5; P7 §G–§H.*

### WF-008 Financial reporting & discrepancy review
1. Deal reaches Milestone Funding Active → reporting enabled for Founder. 2. Founder enters revenue, expenses, optional cash/notes, attaches evidence → platform calculates net; status = Self-Reported or Evidence Submitted. 3. Investor reviews current and historical reports and verification status. 4. If inconsistent, investor flags a discrepancy (structured reason) → Discrepancy *Needs Review*; report → *Under Review*. 5. Admin investigates → **Resolved**, **Disputed**, or leaves **Under Review**; may mark the report **Verified/Reviewed** ("Reviewed by Admin") or request more evidence. 6. All status changes audit-logged. 7. No claim of fraud-proof reporting at any step.
*Sources: MPS §15.4; ILS §4–§6; UXP §6.7, §7.2, §7.5; P9 §15. The audit observes financial reports, evidence and discrepancies in code (static); vocabulary and cadence are `UNV`/`TBD`.*

### WF-009 Identity verification
User (Tier 0) submits ID + selfie/document → pending → Admin queue → **Approve** (→ Tier 1) / **Reject** / **Request More Info** (reason shown to user) → Tier 2 assigned manually by Admin when on-platform track record exists. *Sources: MPS §11; P2; AUD §4.*

### WF-010 Reputation update
Verified milestone completion / deal completion / feedback / tier change → recalculation → history entry (cause, before/after) → Reputation Detail updated. *Sources: MPS §17, §24; P8.*

### WF-011 Admin oversight loop
Dashboard → Verification Queue → Businesses/Deals/Investments/Financial Reports/Discrepancies/Reports as flags surface → Audit Logs → Analytics → Settings. *Sources: UXP §5; P9.*

### WF-012 Commission (simulated)
On a successfully processed (**simulated**) funding tranche, a simulated platform commission is computed at a rate in the **3–5%** range (MPS §20). Rate, payer, trigger definition, rounding and display rules are **TBD** (Section 10; DEC-007). Implementation exists only in the uncommitted working tree (AUD §1). *Source: MPS §20, §33(16).*

### WF-013 Reconciliation of Disclosure, Connection, Deal Room and Milestone workflows *(new — review finding R-08; resolves inconsistency item 9)*

**Principle.** Four server-side records interlock; the mobile client **renders** their server-computed state and never infers or reorders it (ARC-003, OBJ-003).

| Concept | Owning record / phase | Created or advanced by | Mobile client behaviour |
|---|---|---|---|
| Interest (one-sided) | Disclosure relationship (P6) | Viewer expresses interest; Founder may **Decline** | Show pending/declined state from server |
| Disclosure Stage 1–4 | Disclosure relationship (P6) | Interest → NDA acceptances → Founder confirmation | Render the stage indicator (DIS-010); never send a stage |
| NDA acceptance | Disclosure relationship (P6) | Each party accepts the versioned NDA; decline observed | One NDA only — the Deal's "NDA Signed" **reuses** it (P7 §D) |
| Connection | Interest/Connection (P7) | Created when both sides have expressed interest and no decline | Show in Connections list (CON-002) |
| Deal and Deal state (8 states) | Deal (P7) | Created on Connection (P7 default); advances only via server triggers | State progression from server state (DLR-003, DLR-011) |
| "NDA Signed" Deal state | Derived from the disclosure relationship reaching Stage 3 | Cannot be advanced manually | Never display as signed unless the server says so |
| Deal documents | Disclosure document set (P6) | Founder tags stage | Locked rows from stage; no separate access path (DLR-005) |
| Negotiation → Agreement | Deal (P7) | Participants submit/confirm terms | Versioned table (NEG-001), read-only Agreement (AGR-001) |
| Milestones | Deal (P7) | Founder defines; two-step completion | Per MIL-003; **Disputed** is the only non-completion signal at milestone level |
| Financial reports | Deal / Business (R2) | Founder submits after Milestone Funding Active | Per FIN rows |

**Sequencing rules stated by the sources (no new rules):**
1. Stage 2 unlocks on interest unless the Founder declines (MPS §24; P6).
2. Stage 3 requires both NDA acceptances; Stage 4 additionally requires Founder confirmation (MPS §24).
3. A Connection requires mutual interest and no decline (MPS §24; P7).
4. MPS §24 says the Deal Room is created at mutual interest, "typically alongside or after NDA initiation" — so **NDA initiation or completion may precede the Connection**.
5. "NDA Signed" is not a second NDA and cannot be forced (P7).

**Open ordering questions** (not resolvable from the sources → options in the DLR rows, PENDING USER APPROVAL): *Matched record* (DLR-011), *NDA already complete when the Connection is created* (DLR-012), *non-completion outcome* (DLR-013), *Professional-deal milestone semantics* (DLR-014). Decision: **DEC-043, DEC-044, DEC-045**.

### WF-014 Business invitation, membership and role assignment

Founder selects one Business and Professional → prepares an invitation with proposed standard/restricted role context → Professional receives Hiring conversation/invitation → Professional accepts or declines → only an accepted invitation may activate Business membership → Founder grants explicit permissions → effective access is evaluated server-side. Withdrawal, expiry, re-invitation, Custom Role rules and multi-role merging remain PENDING (BR-DEC-001…005). No pending invitation grants protected access.

### WF-015 Finance Manager delegated Deal negotiation

Founder selects an active Business and Deal → grants a Finance Manager specified Deal actions → backend validates active Business membership and current delegation on every read/send/proposal action → manager communicates as an identified Business representative and prepares versioned proposal terms → Founder reviews and alone supplies formal Founder-side final confirmation → Investor separately confirms the same final version. Revocation blocks subsequent actions. Chat content never performs the formal confirmation (BR-DEC-006/007/009/011; MSG-DEC-005/006).

### WF-016 Unified Messages

User opens Messages → backend returns only authorized conversations and safe metadata → user filters All / Hiring / Deals / Team or performs authorized search → selecting a conversation triggers a current-state authorization check → read/send updates authorized unread state → notification content is minimized → membership/permission/Deal-grant revocation removes subsequent access, previews, search hits and sensitive notification content. Retention, attachments, receipts, delivery technology, moderation and historical visibility remain PENDING (MSG-DEC-001…013; DEC-010).

### WF-017 Business Team Workspace

Accepted Business member opens the assigned workspace → backend returns only authorized tasks, milestones, documents and Team conversations → member performs only specifically granted resource/action operations → Founder may change or revoke permission → next protected request reflects the new state. Business A state is isolated from Business B (BR-DEC-005/008/009).

---

## 10. Investment Model, Payments, Commission & Premium (Simulated)

### 10.1 Source statements (preserved)
- **Primary revenue:** 3–5% commission on successfully processed investments through the platform, subject to applicable laws and each investment's legal structure; the mechanism applies to **both** Micro and Large/Standard investment — the return model does not change how commission is calculated (MPS §20).
- Illustrative examples only: ৳10,00,000 × 5% = ৳50,000; 20 investors × ৳25,000 = ৳5,00,000 × 5% = ৳25,000; three tranches totalling ৳10,00,000 at 5% = ৳50,000 (MPS §20).
- **All** monetary flows — commission, subscriptions, milestone funding and investment returns — are **simulated**, not real transactions (MPS §20, §30).
- Premium subscription is a **simulation** (MPS §18, §30).

### 10.2 Audit status
The audit observes payment/commission functionality (deal payments, platform revenue, admin investment oversight and associated tests) **only in the uncommitted working tree** of branch `feature/simulated-payments-commission`. The tests were **not executed**; payment idempotency, double-transition protection, commission rounding and financial reconciliation are **NOT VERIFIED** (AUD §1, §6). **Status: `PAR`, unstable.** (Edition 1.0 listed commission as `GAP`; corrected.)

### 10.3 Payment & commission requirements

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| PAY-001 | The platform earns a **simulated** commission in the **3–5%** range on processed (simulated) investment amounts. | Must | PAR | R2 | MPS §20, §33(16); AUD §1 |
| PAY-002 | Commission applies **identically regardless of investment type**. | Must | UNV | R2 | MPS §20, update notes |
| PAY-003 | Commission may be applied **per successfully processed funding tranche** (milestone-based), per the MPS example. | Must | UNV | R2 | MPS §20 |
| PAY-004 | Every payment, commission, subscription and returns figure shown in the app is labelled **Simulated** (SCP-010); the app shall not integrate any real payment service provider, collect card/bank/wallet credentials, or process payouts (derived from MPS §30: no custody, escrow or real transactions). | Must | UNV | R2 | MPS §30 |
| PAY-005 | **Unresolved (TBD — DEC-007):** the actual commission rate within 3–5% (one platform-wide rate vs per-deal vs admin-configurable); who bears the commission in the simulation (investor-added, founder-deducted, or display-only); the precise trigger ("successfully processed"); rounding; and how it is displayed. **No option is selected here.** | Must | UNV | PA | MPS §20; SG-06; DEC-007 |
| PAY-006 | The mobile client shall display payment and commission figures **exactly as returned by the server** and shall never compute commission, rounding or totals itself. | Must | NEW | R2 | ARC-003 |
| PAY-007 | **New-backend release dependency:** no client shall depend on simulated payment/commission capability until its functional rules are approved, the independent Node.js + Express.js backend implementation and REST contract exist, and isolated verification covers authorization, idempotency, duplicate/double-transition prevention, rounding and reconciliation. The old Laravel working-tree branch, merge state and tests are **LEGACY AUDIT REFERENCE — NOT A CURRENT DEPENDENCY**. This row authorizes no implementation and no real-money processing. | Must | NEW | PA | G-00; G-01; DEC-007; G-07; DEP-019 |
| PAY-008 | Admin visibility of simulated commission revenue is specified in ADM-014. | Must | PAR | R3 | MPS §19; P9 §16 |
| PAY-009 | MIL-007 applies: milestone "release" is a status change; platform-simulated payment records carry no real value. | Must | PAR | R2 | MPS §14.2, §30 |

### 10.4 Premium (simulated)
Premium requirements are PRM-001 … PRM-008 (§8.12), status `PAR`. Open questions: pricing/tier names/durations (DEC-008); whether subscriptions are real scope requiring backend enforcement (DEC-008); whether mobile-store billing rules apply (DEC-048). Premium may influence AI-Suggestion ranking but never hides legitimate results from Search (PRM-006).

### 10.5 Investment-model cross-reference
INV-001 … INV-011, FIN-001 … FIN-012, PTF-001 … PTF-003 are in §8.10. Statuses: INV `UNV`; FIN per audit (§8.10).


---

## 11. AI Requirements (Deterministic Scoring and Gemini Insights)

> **Correction (review findings R-05, R-02):** Edition 1.0 described AI as deterministic only (MPS §8) and stated "no ML/NLP". The audit shows **two distinct layers**. This section keeps them separate and does **not** silently accept the second as an approved business change (CONF-24; DEC-042).

### 11.1 The two AI layers

| | **Layer 1 — Deterministic scoring** | **Layer 2 — Gemini AI insight workflows** |
|---|---|---|
| What it produces | Readiness Score (0–100), Match Score (0–100%), rule-based improvement suggestions, recommendations | Narrative insights: business analysis; matching, deal, readiness and admin insights |
| Basis | Structured inputs, fixed documented weights, rule-based templates (MPS §8–§10) | LLM call through a **single Gemini adapter** (`GeminiAnalysisProvider`), schema-validated output |
| In MPS? | **Yes** (MPS §8–§10, §24, §31) | **No** — MPS says scoring is rule-based; MPS §27 lists NLP pitch-deck analysis as Future Scope |
| Audit status | **IMP** — deterministic matchers, recommendation endpoints, versioned readiness inputs and assessments (AUD §4). Frontend discovery explainability partly demo (AUD-D03). | **IMP** foundation, **operation not verified**: model/endpoint compatibility and the cause of an earlier key problem are unverified (AUD §7). |
| Determinism | Same inputs → same score | Not deterministic; outputs are versioned by fingerprint and stored immutably |
| Authority | Scores are the platform's explainable output | Insight text must never change scores or any access decision (AI-025) |

### 11.2 Layer 1 — Deterministic scoring and matching

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| AI-001 | **Investor Readiness Score:** explainable, rubric-based weighted score **0–100** over eight factors — Market Potential, Business Model Clarity, Competition, Scalability, Founder Capability, Funding Requirement Realism, Risk, Customer Validation. | Must | PAR | R1 | MPS §10.1; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AI-002 | The Readiness output always shows: overall score, factor-level scores for all 8 factors, **weak areas** (factors below a defined threshold) and **improvement suggestions** — rule-based, templated guidance tied to weak factors. | Must | UNV | R1 | MPS §10.2 |
| AI-003 | Scoring is **structured-input + deterministic/rule-based**; no deep learning or NLP is required for the scoring layer. Documented as a Known Limitation (MPS §31). | Must | UNV | R1 | MPS §10.3, §31 |
| AI-004 | Factor weights are documented and sum to 100%. The **actual weights, thresholds and bands** are not in the supplied sources (Phase 5 absent — SG-02) → **TBD** (DEC-015); they shall be read from the platform, never hard-coded in the client. | Must | UNV | PA | MPS §10.1; SG-02; DEC-015 |
| AI-005 | Where required structured inputs are missing, the affected factor defaults to a documented neutral/low value and is **flagged "incomplete"**, never silently omitted. | Must | UNV | R1 | MPS §24 |
| AI-006 | Readiness inputs and assessments are **versioned**; scores are recalculated when relevant inputs change. | Must | IMP | R1 | MPS §24; AUD §2, §4 |
| AI-007 | The Readiness view shall present the **factor breakdown as text alongside any graphical score**; never a bare number. Reveal animation is a legacy preference (Appendix M). | Must | NEW | R1 | UXP §8, §12 |
| AI-010 | **Match Score** = Σ (Factor Score × Weight) × 100, factors normalised 0–1, presented as 0–100% **always with a per-factor explanation**. | Must | PAR | R1 | MPS §9; AUD §4; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AI-011 | **Founder ↔ Investor** criteria and weights: Industry Match 25%, Investment Range Compatibility 25%, Business Stage Match 15%, Risk Level Compatibility 15%, Location Preference 10%, Expected Involvement 10%. Weights are configurable per deployment, must sum to 100%, and remain visible/auditable. | Must | UNV | R1 | MPS §9.1 |
| AI-012 | **Founder ↔ Professional** criteria with *suggested* weights: Required Skill Overlap 35%, Industry Experience 20%, Experience Level 15%, Availability 15%, Location 10%, Compensation Preference Compatibility 5%. | Must | UNV | R1 | MPS §9.2 |
| AI-013 | **Explainability:** every match result exposes overall score, per-factor score and the weight applied. The client shall render these **from server-supplied data** and shall never use demo or locally-generated explanation data (AUD-D03). | Must | PAR | R1 | MPS §9.3; AUD §5 (High) |
| AI-014 | **AI Suggestions** rank candidates by Match Score, applying any relevant Premium visibility boost, but **never hide** lower-ranked legitimate opportunities from Search & Filtering. | Must | PAR | R1 | MPS §24; AUD §4 (recommendation endpoints); v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| AI-015 | Scores shall not be presented as predictions of success, guarantees or investment advice. **Observable condition:** wherever a Readiness or Match Score is shown, the user can reach, in no more than two interactions, a statement of the cold-start and rule-based limitations (MPS §31); a copy audit (TST-012) finds no prediction/guarantee wording. | Must | UNV | R1 | MPS §30, §31 |
| AI-016 | Match/readiness scores and recommendations shall **never** influence any disclosure, NDA or document-access decision (DIS-014). | Must | UNV | R1 | P6; UXP §13 |
| AI-017 | The platform shall not calculate or invent investment payouts or returns via AI (INV-010). | Must | UNV | R2 | P5 (as cited in V1); MPS §30 |

### 11.3 Layer 2 — Gemini AI insight workflows (audit-observed)

> **Release coupling (review finding F-23).** The guardrails AI-024 (no provider key in the app) and AI-025 (insight text never alters scores or access) apply **under every DEC-042 option**, including Option B (no insight screens in Release 1).

| ID | Requirement / statement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| AI-020 | The platform provides AI insight workflows — **business analysis, matching insights, deal insights, readiness insights and admin insights** — through a **single Gemini provider adapter**. These are **not specified in the MPS**. The mobile client shall consume them only via the platform API (ARC-012). | Should (proposed) | IMP | PA | AUD §2, §4, §7; CONF-24; DEC-042 |
| AI-021 | Provider outputs are validated against defined contracts/schemas, parsed, fingerprinted and stored as **immutable versions**; generation is protected by **database-backed cache locks**; identical-input results are reused from cache. | Should (proposed) | IMP | PA | AUD §2, §6, §7 |
| AI-022 | **Cost/abuse controls (audit-observed):** business analysis has a configured **founder-per-hour generation limit**; **matching, deal and admin AI generation rely on concurrency locks and cached-result reuse only — no explicit per-user or global quota, daily budget, usage metrics or circuit breaker** (AUD-D05). Adding quotas is a **backend dependency** (DEP-014), not mobile work. | Should (proposed) | PAR | PA | AUD §6 (High), §7 |
| AI-023 | **Failure behaviour (audit-observed):** provider errors are mapped to generic internal error codes; raw exceptions are not retained; **HTTP 429 is recognised but there is no exponential retry/backoff**; there is **no fallback provider and no deterministic narrative fallback** beyond "provider unavailable" (AUD-D06). The client shall present a clear, non-blocking "insight unavailable, try later" state, shall not auto-retry in a loop, and shall continue to show the deterministic scores. | Should (proposed) | NEW | PA | AUD §7 |
| AI-024 | The provider key comes from environment configuration; redirects are disabled; connect/total timeouts, response size and JSON depth are bounded. No key shall ever exist in the mobile app. | Must (proposed) | IMP | R1 | AUD §7; ARC-010 |
| AI-025 | **Guardrail (preserved from MPS §8, §24 and DIS-014):** LLM-generated insight text shall **never** alter the deterministic Readiness or Match scores, nor influence disclosure, NDA, document access, verification tier, reputation or financial verification status. **Whether the current code satisfies this is not established by the audit.** | Must (proposed) | UNV | R1 | MPS §8, §24; P6; AUD §7 |
| AI-026 | **Presentation (PROPOSED):** the client shall distinguish **deterministic scores** from **LLM-generated narrative** visibly and in text, and never present narrative as a score. | Should (proposed) | NEW | PA | CONF-24 |
| AI-027 | The **operational status** of the Gemini integration is **NOT VERIFIED**: the earlier "revoked/disabled key" issue may stem from revocation, quota, billing, model access, endpoint incompatibility, configuration cache or malformed key configuration; static code cannot say which. The model name and the `/v1beta/interactions` contract were not externally verified. No single cause shall be assumed. | Must (proposed) | UNV | N/A | AUD §7; AUD §9 (P0 item 4) |
| AI-028 | Whether **confidential business, financial or NDA-protected content** is sent to the provider, and under what stage gating, is **not stated by the audit** and is an open privacy question. | Must (proposed) | UNV | PA | AUD §7; PRV-005; DEC-042 |
| AI-029 | The audit records **no token accounting or cost telemetry**. Any AI usage reporting for mobile is a backend dependency (DEP-014). | Should (proposed) | UNV | PA | AUD §7 |
| AI-040 | **Future Scope preserved:** ML-based ranking, NLP pitch-deck analysis, learned weights, vector stores and fairness tooling remain out of scope (MPS §27). | Future | N/A | N/A | MPS §27, §31 |

### 11.4 Decision needed — CONF-24 (DEC-042, PENDING USER APPROVAL)

| Option | Description | Effect on mobile |
|---|---|---|
| **A** | Accept Gemini insights as Mobile Release 1 scope, subject to AI-025 guardrails, quotas (DEP-014) and a privacy review of data sent (AI-028). Requires an explicit MPS amendment note. | Insight screens and states built per AI-023/AI-026. |
| **B** | Treat Gemini insights as **outside Mobile Release 1**; show only deterministic scores and rule-based suggestions until approved. | No insight screens in R1; MPS wording unchanged. |
| **C** | Restrict insights to specific roles/surfaces (e.g., Founder business analysis only; Admin insights excluded). | Partial insight screens. |

---

## 12. Mobile-Specific Requirements

> All rows are **NEW** (exist only because the product is a native mobile app). Priorities are **proposed** (DEC-034). Requirements marked "Should (optional)" are proportionate-to-prototype hardening (MPS §12.3).

| ID | Requirement | Pri. | Status | Rel. | Source / basis |
|---|---|---|---|---|---|
| MOB-001 | **Navigation is specified functionally only (MOB-100…MOB-104).** The information hierarchy is preserved — nothing critical is hidden on mobile, only re-flowed. Bottom tab bars, drawers, stacked card rows and similar patterns are legacy design suggestions (Appendix M) and are **nonbinding**. | Must | NEW | R1 | UXP §11 |
| MOB-002 | Accounts holding several roles shall have a **role switcher**; switching changes the entire workspace (navigation, dashboard, data) to the selected role and shall not leak data from the previous role. | Must | NEW | R1 | ROL-003; UXP §3.1 |
| MOB-003 | The **active role** shall be restored on app restart/session restore and validated against the server's enrolled roles (see ROL-003-D, DEC-047). | Must | NEW | R1 | AUD-D01 |
| MOB-010 | App launch shall restore the session and distinguish **authentication expiry** from **transient failure** (AUTH-012-D); a failed restore due to network/`5xx` shall show a retry state, not the login screen. | Must | NEW | R1 | AUD-D02 |
| MOB-011 | Credentials/session material shall be stored only in the **OS secure store** appropriate to the chosen authentication option (ARC-006). | Must | NEW | PA | ARC-006; DEC-003 |
| MOB-012 | Sensitive screens (verification images, financial evidence, NDA/Stage 3–4 content) should be obscured in the OS app-switcher snapshot. | Should (optional) | NEW | R2 | MPS §12, §29 |
| MOB-020 | **Connectivity:** show clear offline/poor-network states; retry only **idempotent reads** automatically with backoff; **never auto-retry state-changing requests** (NDA acceptance, offers, milestone confirmations, report submissions); disable duplicate submissions while in flight. | Must | NEW | R1 | MDP §8; ARC-004 |
| MOB-050 | Local persistence is limited to non-sensitive UI state and **unsent drafts**; drafts are stored encrypted and cleared on logout and on account switch. Server-side autosave (BIZ-002) remains the system of record. | Must | NEW | R1 | MPS §29; BIZ-002 |
| MOB-053 | On `401` the app preserves unsaved draft data in secure local storage where safe, routes to Login, and offers to restore after re-authentication. | Must | NEW | R1 | AUTH-012 |
| MOB-060 | **Uploads:** verification evidence accepts PDF/JPEG/PNG (Laravel `mimes` rule per audit); business PDFs are validated for extension, MIME and size server-side. The client shall pre-validate type and size using **server-provided limits** (values not stated in the sources — DEP-006) and shall rely on server validation as authoritative. | Must | NEW | R1 | AUD §6, §8 |
| MOB-061 | ID/selfie capture uses camera or gallery with just-in-time permission prompts and purpose text. | Must | NEW | R1 | VER-002; PRV-004 |
| MOB-062 | Uploads show progress and support cancel and manual retry; a failed upload shall not create a silent partial record. | Must | NEW | R1 | MOB-020 |
| MOB-063 | Captured ID/selfie images shall not remain **in the app's cache directory or the device photo library after the upload completes, fails or is cancelled**. **Observable condition:** after each outcome, a file-system inspection of the app's cache and a gallery check find no copy created by the app (subject to native-capability verification — ARC-023). | Should | NEW | R1 | VER-003; PRV-002 |
| MOB-064 | Documents are opened only through authenticated, authorisation-checked API calls (ARC-013); no public or shareable URLs. | Must | NEW | R1 | ARC-013 |
| MOB-070 | **Force-update / unsupported-version:** the app handles an "unsupported API version" response by presenting an update-required screen. Backend support for this signal is `UNV` (DEP-008). | Must | NEW | R1 | ARC-011 |
| MOB-075 | **Bounded lists:** every history/audit/message/notification/report list shall be **server-paginated with a capped page size**; the client shall not assume a full collection is returned. Several backend collections are currently unpaginated (AUD-D04, DEP-010). | Must | NEW | R1 | AUD §6 (Medium) |
| MOB-080 | **Push notifications** (APNs/FCM) with device registration and token lifecycle; payload content generic (NTF-003). Backend support `UNV` (DEP-005). | Should | NEW | R2 | NTF-003 |
| MOB-081 | **Deep links** from notifications to Deal Room/Connection/verification screens shall require authentication and shall re-run server authorisation; an inaccessible target shows a neutral "not available" state. Backend/link scheme `UNV` (DEP-007). | Should | NEW | R2 | SEC-002 |
| MOB-090 | **UI language(s)** are not defined by any source (BDT/South-Asian grouping is defined; language is not) — **TBD** (DEC-049). | Must | NEW | PA | SG-07 |
| MOB-091 | **Accessibility target WCAG 2.1 AA**, translated to native: screen-reader labels on icon-only controls, form labels, sufficient contrast, colour never the sole differentiator, support for reduced motion and text scaling, announced validation errors, and text equivalents for charts. The audit ran **no** accessibility test (UNV). | Must | NEW | R1 | UXP §12; AUD §5 |
| MOB-092 | **Appearance** (theme, light/dark support, palette, typography) is a design decision outside this specification (ARC-008). Whatever is chosen shall satisfy MOB-091. | Must | N/A | N/A | Owner instruction (v2.1 brief §2); supersedes v2.0 MOB-092 (Direction G); DEC-029 superseded |
| MOB-093 | Financial and investment data shall remain **fully readable on a small screen** — every value together with its label — without hidden or truncated content. Presentation form is a design decision. | Must | NEW | R2 | UXP §11 |
| MOB-094 | Mobile performance targets: Section 15 (PROPOSED, DEC-025). | Should | NEW | R1 | §15 |
| MOB-095 | **Telemetry/crash reporting/analytics:** no source defines any; if introduced it shall exclude credentials, tokens, ID images, financial figures and confidential content (SEC-005). Scope **TBD** (DEC-051). | Should | NEW | PA | SG-07 |
| MOB-096 | **Device and OS support matrix**, store distribution and release channels are **TBD** (DEC-050). | Must | NEW | PA | SG-07 |
| MOB-097 | **App-store policy posture** for a simulated-investment app with premium gating (listing category, disclosures, in-app-purchase rules, account deletion) is **TBD** (DEC-048). | Must | NEW | PA | AUTH-014; PRM-008 |
| MOB-100 | **Feature reachability.** Every feature allocated to the active release shall be reachable by an authorised user, for the active role, through the app's navigation. Features the user's role, verification tier or disclosure stage does not permit are not offered as actions; where this specification requires it, the locked state and the way to unlock it are explained (DIS-008, VER-006). *(Functional requirement only; how navigation looks is a design decision — ARC-008.)* | Must | NEW | R1 | Owner brief §2 |
| MOB-101 | **Role switching reachable.** A user holding more than one participant role shall be able to switch between authorised roles from within the app without logging out (MOB-002, ROL-003). | Must | NEW | R1 | Owner brief §2; ROL-003 |
| MOB-102 | **Resume interrupted workflows.** After backgrounding, restart or session expiry a user shall be able to return to an interrupted multi-step workflow — registration/profile completion, Business creation, verification submission, NDA acceptance, negotiation, milestone or report submission — **at the last server-confirmed state**; unsent client-side drafts follow MOB-050/MOB-053. | Must | NEW | R1 | Owner brief §2; BIZ-002; MOB-050/053 |
| MOB-103 | **Action feedback.** After every action that changes server state, or fails, the app shall tell the user the outcome (success; field-level validation errors; authorisation denial; throttling; network failure) and shall not leave the user uncertain whether a state-changing action was applied (MOB-020, API-009). | Must | NEW | R1 | Owner brief §2; API-003 |
| MOB-104 | **Design freedom boundary.** The UI/UX is designed independently (ARC-008) but shall not alter functional behaviour, permissions, validation, data requirements, security rules or business workflows for visual convenience. A design proposal that would do so shall be raised as a change request against this specification. | Must | NEW | R1 | Owner brief §2 |
| MOB-105 | **Unified Messages reachability.** When messaging is allocated to a release, one Messages entry point shall expose the authorized All / Hiring / Deals / Team views without making any conversation discoverable merely because the filter exists. | Must | NEW | PA | UMSG-001…003; MSG-DEC-001/002/013 |
| MOB-106 | **Business-context isolation.** Business Team Workspace and conversation views shall show the active Business and delegated role context and shall clear or re-authorize cached data when the Business, role, membership or Deal authorization changes. | Must | NEW | PA | BRM-004/006/012; UMSG-005/006/009 |

---

## 13. Security, Privacy & Compliance Requirements

### 13.1 Security requirements

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| SEC-001 | All traffic uses **HTTPS**; no cleartext endpoints; certificate validation is not disabled in any build. | Must | NEW | R1 | MPS §12.2, §29 |
| SEC-002 | RBAC + Stage-Based Access Control + NDA gate are enforced **server-side for every client type**; the client treats every authorisation denial as final. | Must | PAR | R1 | MPS §12.1; ROL-001; AUD §6; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| SEC-003 | Every view/download of a sensitive document (including financial reports and evidence) is **audit-logged server-side**. | Must | PAR | R1 | MPS §12.2; DIS-011; AUD §8; v2.1 regrade (F-03): audit observes the domain; the rule-level behaviour in this row is not evidenced by AUD |
| SEC-004 | No secrets, API keys or credentials are embedded in the app bundle or build configuration shipped to devices. | Must | NEW | R1 | ARC-010; AUD §8 |
| SEC-005 | Credentials, tokens, session identifiers, ID images and financial figures shall **never** be written to logs, crash reports, analytics or clipboard. | Must | NEW | R1 | MPS §29; ARC-006-C8 |
| SEC-006 | Credentials/session material live only in OS secure storage (MOB-011). | Must | NEW | PA | DEC-003 |
| SEC-007 | **Workspace isolation:** switching role or account clears role-scoped cached data, drafts and in-memory state (no data bleed between roles). | Must | NEW | R1 | ROL-003 |
| SEC-008 | Push payloads and lock-screen content are generic (NTF-003). | Should | NEW | R2 | MPS §12 |
| SEC-009 | Sensitive screens obscured in app-switcher snapshot (MOB-012). | Should (optional) | NEW | R2 | MPS §12.3 |
| SEC-010 | **Upload hardening (backend dependency, audit-recommended):** explicit MIME allow-list, image decoding checks, malware scanning and quarantine for verification evidence; production web-server controls preventing execution and content sniffing for uploads (DEP-012). | Must | UNV | R1 | AUD §8 (Medium) |
| SEC-011 | **Link safety:** public profile link fields are validated server-side only as bounded strings (audit); the client shall open only `http`/`https` links and shall not execute other schemes (DEP-012). | Must | NEW | R1 | AUD §8 (Medium) |
| SEC-012 | User-supplied text is rendered as plain text; no user content is injected into WebViews or interpreted as markup. | Must | NEW | R1 | AUD §8 (no `dangerouslySetInnerHTML` on web) |
| SEC-013 | **Production hardening is UNVERIFIED** (audit): security headers, cookie behaviour behind HTTPS, proxy trust, CSP, TLS, storage ACLs, server configuration. These shall be verified before any mobile release and **before** choosing cookie-based mobile auth (Option A, §5.3). | Must | UNV | R1 | AUD §8; SG-08 |
| SEC-014 | Admin security per ADM-016; elevated-auth meaning **TBD** (DEC-038). | Must | UNV | PA | UXP §5 |
| SEC-015 | Throttling responses are honoured (AUTH-013); the client shall not circumvent rate limits. | Must | NEW | R1 | AUD §6 |
| SEC-016 | Every Business-role, membership, Deal-delegation and messaging action shall be authorized server-side against current Business, resource, action, Deal, disclosure/NDA and membership state. | Must | NEW | PA | BR-DEC-005/009; MSG-DEC-006/007 |
| SEC-017 | Cross-Business identifiers, caches, search indexes, unread counters and notification jobs shall not expose data from another Business. Revocation shall be reflected on the next protected request and refresh. | Must | NEW | PA | BR-DEC-009; MSG-DEC-007/008/009 |
| SEC-018 | Proposal versions, permission changes and delegated actions shall be audit-linked to actor, Business, Deal where applicable, prior/new state and timestamp. Audit content shall be minimized and protected. | Must | NEW | PA | BR-DEC-011; MSG-DEC-006 |

### 13.2 Privacy requirements

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| PRV-001 | **Consent capture** at registration: ToS + simulation disclaimer, unchecked by default. | Must | UNV | R1 | MPS §28, §30; SCP-011 |
| PRV-002 | Confidential Deal Room, message and financial-reporting data is restricted to currently authorized relationship/Business members. Admin has no default access to private messages, Stage 3/4 documents or NDA content; any oversight exception requires an explicit approved policy and least-privilege audit. | Must | NEW | R1 | MPS §28–§29; OD-03; ROL-006; MSG-DEC-007/012 |
| PRV-003 | Basic data retention/deletion consideration for confidential Deal Room and financial data (e.g., founder/Admin removal request after a deal concludes or is withdrawn) — full implementation may be deferred. | Must | UNV | PA | MPS §29; DEC-026 |
| PRV-004 | Camera, photo-library, notification and file-access permissions are requested **just-in-time** with plain-language purpose text; the app works (with reduced function) if denied. | Must | NEW | R1 | MOB-061 |
| PRV-005 | **Third-party processing:** any transmission of user or confidential business data to a third-party AI provider shall be disclosed to the user and shall respect stage/NDA gating. Current behaviour **unknown** (AI-028). | Must | UNV | PA | AI-028; DEC-042 |
| PRV-006 | Inbox previews, search snippets, unread metadata and push notifications shall be data-minimized and shall never reveal content the user is no longer authorized to read. | Must | NEW | PA | MSG-DEC-008/009/010 |

### 13.3 Compliance boundary (preserved)
See SCP-010 … SCP-014 and §4.2. MPS §30 prohibitions apply to every screen, notification, store listing text and marketing string.

### 13.4 Audit-observed security positives (informational; static)
`.env` not tracked by Git; `.env.example` tracked; no hard-coded API key found; session auth disables bearer extraction; login throttling combines account/IP and IP-wide limits; signed email-verification routes; sensitive-document policies and audit-log models; no destructive SQL, unsafe deserialisation or shell execution found in reviewed paths; no critical source-code vulnerability identified in the static pass (AUD §8). **These are not a security certification.**

### 13.5 Prohibited-claim phrase list (UI copy, notifications, store text)
Compiled from MPS §24/§30, UXP §13 and ILS. The following shall **not** appear as affirmative claims: "guaranteed profit", "guaranteed return", "guaranteed ROI", "fixed return", "guaranteed ownership", "risk-free", "safe investment", "fraud-proof", "fully verified" (for financial reports), "Verified"/"Certified"/"Audited" as the label of Admin-reviewed financial status (use **"Reviewed by Admin"**), "legally binding", "enforceable", "executed contract", "fraud"/"scam" in discrepancy-flag language, and any copy implying real money moves. **Permitted:** negations and risk statements such as "Returns are not guaranteed and investment can lose value". The list may be extended only by stakeholder approval.


---

## 14. API Integration Requirements

> The mobile client and separate Web Admin Dashboard integrate only with the approved independent Node.js + Express.js REST backend (ARC-002). The API contract has not yet been authored; DEP-015 remains a dependency. Legacy Laravel endpoints are not the new contract. Nothing below invents an endpoint.

### 14.1 Integration requirements

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| API-001 | All calls go through the single API client layer (ARC-004): authentication, error-shape parsing, retries, pagination, cancellation. | Must | NEW | R1 | ARC-004 |
| API-002 | Authentication transport shall remain within the approved JWT family and follow the later decisions under G-03 / DEC-003, G-05 / DEC-053, OD-08 and OD-11 while satisfying ARC-006-C1…C8. | Must | NEW | PA | §5.3; G-00 |
| API-003 | The client shall parse the error/response contract authored for the new backend, including field-level validation and distinct authentication, authorization, validation, throttle and transient failures. Exact status conventions are defined in the future API contract, not extracted from legacy code. | Must | NEW | R1 | ARC-005; DEP-015 |
| API-004 | **Server-driven state:** the client displays stage, deal status, milestone status, role and tier **exactly as returned**; it tolerates **unknown enum values** from newer servers by showing a neutral label rather than crashing (forward compatibility). | Must | NEW | R1 | ARC-003 |
| API-005 | Restricted fields are absent from payloads when the viewer lacks access (DIS-009); the client derives locked states from the stage indicator, not from missing fields. | Must | UNV | R1 | P6 §F |
| API-006 | Monetary values are raw decimals (ARC-007); timestamps, time-zone presentation and locale formatting conventions are **not defined by any source** — extracted from the repository / **TBD** (DEP-006). | Must | UNV | R1 | P2; SG-07 |
| API-007 | Lists use **server-side pagination with capped page size**; the pagination style (page vs cursor) is confirmed from the repository (DEP-010; MOB-075). | Must | PAR | R1 | AUD §6 |
| API-008 | **File upload/download:** multipart upload with server-side validation as authoritative (MOB-060); downloads only via authorised endpoints (ARC-013). | Must | IMP | R1 | AUD §6, §8 |
| API-009 | **Duplicate-submission safety:** state-changing calls (NDA acceptance, offers, confirmations, milestone actions, financial submissions and simulated payment-status changes) shall not be auto-retried by the client. The new Node.js backend shall provide and verify operation-appropriate idempotency and double-transition protection; no such protection is claimed implemented. Legacy payment-branch evidence is historical only. | Must | NEW | PA | MOB-020; PAY-007; G-00; G-01 |
| API-010 | **AI endpoints** may be slow or unavailable (single provider; no fallback; 429 without backoff). The client uses bounded timeouts, shows non-blocking unavailable states and never blocks deterministic scores (AI-023). | Should | NEW | PA | AUD §7 |
| API-011 | **Versioning:** the app targets an explicit API version and handles unsupported-version responses (ARC-011, MOB-070). The existing convention is `UNV`. | Must | UNV | R1 | P1 |
| API-012 | **Throttling** (`429`) is honoured with a visible state and no retry storm (AUTH-013). | Must | NEW | R1 | AUD §6 |
| API-013 | Browser and native authentication presentations shall follow the later approved JWT/session design and shall not expose reusable bearer material to unsafe browser storage. The legacy SPA-route rule is historical only. | Must | NEW | PA | OD-08; OD-11; ARC-006-C6 |
| API-014 | Business membership, role and effective-permission responses shall be scoped to one Business and omit unauthorized grants/resources. Every protected mutation shall be re-authorized server-side. | Must | NEW | PA | BRM-001…015; BR-DEC-005/009 |
| API-015 | Deal delegation and proposal operations shall validate current Founder authority, active delegated membership, exact Deal/Business scope and proposal version; only structured final-confirmation operations may create Founder/Investor agreement confirmations. | Must | NEW | PA | BR-DEC-006/011; UMSG-007 |
| API-016 | Conversation list/read/send/search/unread/notification operations shall filter and omit unauthorized metadata/content server-side. Revoked conversations shall not remain readable through cached identifiers. | Must | NEW | PA | MSG-DEC-006…010 |

### 14.2 API domain map (audit-observed capability → mobile consumption)

| Domain | Audit status | Mobile release (PROPOSED) |
|---|---|---|
| Authentication, registration, reset, email/phone verification | IMP (static); transport MIS for native | R1 (transport PA) |
| Roles / role enrollment / active role | IMP; AUD-D01 | R1 |
| Profiles (Founder, Investor, Professional), skills | IMP | R1 |
| Businesses, requirements, photos, documents | IMP | R1 |
| Readiness inputs, assessments, scores | IMP | R1 |
| Matching and recommendations | IMP (backend) / PAR (explainability) | R1 |
| Gemini AI insights (business, matching, deal, readiness, admin) | IMP; operation UNV | PA (DEC-042) |
| Verification codes, requests, evidence, audit logs | IMP | R1 |
| Disclosure relationships, NDAs | IMP | R1 |
| Interests, connections | PAR | R1 |
| Deals, negotiation, agreements | IMP | R1 |
| Milestones, feedback, messages | IMP | R1 |
| Financial reports, evidence, discrepancies, audit records | IMP (core) | R2 |
| Investment Type / return-model terms | UNV | R2 / PA |
| Payments and commission | Legacy PAR evidence only; new system not implemented | PA (PAY-007; G-07) |
| Notifications and preferences | PAR | R1 (in-app) / R2 (push) |
| Reputation | IMP (core) | R1 |
| Premium | PAR (UI only) | R2 |
| Admin (directory, business/verification governance, insights, financial/discrepancy views) | IMP / PAR | R3 (DEC-004) |

---

## 15. Non-Functional Requirements: Performance, Reliability & Load Testing

### 15.1 Preserved non-functional requirements (MPS §28)

| ID | Requirement | Pri. | Status | Rel. | Source |
|---|---|---|---|---|---|
| NFR-001 | **Security** — RBAC, stage-based access, encrypted sensitive fields, HTTPS and audit logging, scoped to prototype-appropriate levels (not enterprise SLA). | Must | PAR | R1 | MPS §28; AUD §6, §8 |
| NFR-002 | **Privacy** — consent at registration; confidential Deal Room and financial data restricted to relationship members and Admin; basic retention/deletion consideration. | Must | UNV | R1 | MPS §28 |
| NFR-003 | **Performance** — responsive interaction at **demonstration scale** (not production-scale load). | Must | UNV | R1 | MPS §28 |
| NFR-004 | **Scalability** — the architecture should not preclude future scaling; the MVP is not required to be load-tested at production scale. | Should | UNV | N/A | MPS §28 |
| NFR-005 | **Maintainability** — clear separation between Core Platform, AI and Trust/Security layers (ARC-009). | Should | NEW | R1 | MPS §28 |
| NFR-006 | **Usability** — role-appropriate, uncluttered flows for three user types plus Admin. | Must | NEW | R1 | MPS §28 |
| NFR-007 | **Reliability** — core flows (submission, matching, Deal Room, milestones, financial reporting) behave predictably and consistently. | Must | UNV | R1 | MPS §28 |
| NFR-008 | **Auditability** — document access, verification decisions, deal status changes, financial report edits and discrepancy resolutions are logged. | Must | PAR | R1 | MPS §28; AUD §6, §8 |
| NFR-A01 | **Accessibility** — WCAG 2.1 AA target (MOB-091); no accessibility audit has been run on the platform (UNV). | Must | UNV | R1 | UXP §12; AUD §5 |

### 15.2 Mobile performance targets — **PROPOSED, PENDING USER APPROVAL (DEC-025)**
No source defines mobile performance, crash-rate or release criteria (SG-04, SG-07). The audit states that **no concurrent-user capacity can be responsibly stated from the repository** and that thresholds must be defined **before** benchmarking. The values below are **engineering proposals only**, not business rules, and require approval.

| ID | Proposed target | Pri. | Status | Rel. |
|---|---|---|---|---|
| PERF-001 | Cold start to first interactive screen on the **reference mid-range device defined under DEC-050**: **≤ 3 s** (untestable until DEC-050 names the device). | Should | NEW | PA |
| PERF-002 | List/detail screens show first meaningful content (placeholder content acceptable) within **≤ 2 s** on a typical mobile network, **measured on the reference device/network defined under DEC-050**; reads cancelled on navigation away. | Should | NEW | PA |
| PERF-003 | Crash-free sessions **≥ 99%** over a measurement window and telemetry scope defined under DEC-051 and DEC-050 (untestable until both are decided). | Should | NEW | PA |
| PERF-004 | No unbounded in-memory collections; all lists capped by pagination (MOB-075). | Must | NEW | R1 |
| PERF-005 | Backend latency thresholds (p50/p95/p99) are **TBD** and are to be set before load testing (LOAD-009). | Should | UNV | PA |

### 15.3 Load-test requirements (from AUD §10; documentation of preparation only)

> **Requirements for a later, separately authorised activity (review finding F-19).** Load-test items describe preparation only. They authorise no development, testing or environment change by themselves (Appendix I.3).

| ID | Requirement | Pri. | Status | Rel. |
|---|---|---|---|---|
| LOAD-001 | Load testing shall use an **isolated environment with a synthetic dataset**; never production data. | Must | UNV | PA |
| LOAD-002 | Define scenarios for: login, discovery, matching, deal-room reads, messaging, milestones, financial reports, admin lists. | Must | UNV | PA |
| LOAD-003 | **Exclude or mock Gemini** during baseline API/database tests; run **separate, controlled AI-quota tests**. | Must | UNV | PA |
| LOAD-004 | Capture p50/p95/p99 latency, error rate, database query count, lock waits, connection usage, memory and queue depth. | Must | UNV | PA |
| LOAD-005 | Test concurrent **interest creation, deal creation, milestone confirmation, readiness version creation and payment status changes**. | Must | UNV | PA |
| LOAD-006 | Validate **pagination at large row counts** (AUD-D04). | Must | UNV | PA |
| LOAD-007 | Measure the admin insight snapshot (many separate aggregate queries; one per deal stage — AUD-D07) against realistic volume. | Should | UNV | PA |
| LOAD-008 | Database performance (`EXPLAIN`, slow-query log, cardinality, connection pool) is **not benchmarked**; no capacity claim shall be made without it. | Must | UNV | N/A |
| LOAD-009 | Acceptable thresholds shall be **defined and approved before** any benchmark runs (DEC-025). | Must | UNV | PA |

---

## 16. Quality Assurance & Test Requirements

> **Requirements for later, separately authorised activities (review finding F-19).** Test requirements — including the native-authentication proof of concept (TST-006) — need development effort that is **not** authorised by this document (Appendix I.3).

> Test **requirements** only. No test code, framework selection or scaffolding is authorised. The audit did not re-run the automated suites; existing tests and historical pass claims are **evidence of coverage, not proof** that the dirty working tree passes (AUD §1, §11).

| ID | Requirement | Pri. | Status | Rel. |
|---|---|---|---|---|
| TST-001 | Verify the **authorisation matrix** (RBAC, stage, NDA, tier, participant-only access) against an **isolated test database** before any mobile contract is frozen (audit P0 item 3). | Must | UNV | R1 |
| TST-002 | After separate authorization and implementation, verify the **new Node.js simulated payment/commission capability** against an isolated database for authorization, idempotency, double-transition protection, rounding and reconciliation (PAY-007). Legacy branch tests do not satisfy this requirement. | Must | UNV | PA |
| TST-003 | **State-machine tests** for Disclosure Stage, NDA, Connection, Deal lifecycle and milestone flows, including the ordering edge cases in DLR-011…014 once decided. | Must | NEW | R1 |
| TST-004 | **Role-switch isolation tests:** no data bleed, correct active-role restore, enrolled-role validation (ROL-003, SEC-007). | Must | NEW | R1 |
| TST-005 | **Session tests:** `401`/`419` vs network/`5xx` distinction (AUTH-012-D); throttling; logout invalidation. | Must | NEW | R1 |
| TST-006 | **Native authentication proof of concept** for the approved option, including throttling parity and secure storage (audit migration step 7). | Must | NEW | PA |
| TST-007 | **Contract tests** against the API contract/OpenAPI inventory (DEP-015). | Must | NEW | R1 |
| TST-008 | **Accessibility testing** on native screens (screen reader, contrast, text scaling, reduced motion) per MOB-091. | Must | NEW | R1 |
| TST-009 | **Security tests:** upload type/size/decoding, link-scheme handling (SEC-011), locked-content leakage, token/credential logging (SEC-005). | Must | NEW | R1 |
| TST-010 | **Offline/failure tests:** airplane mode, mid-upload loss, duplicate-tap protection, AI-provider failure (AI-023). | Must | NEW | R1 |
| TST-011 | **AI tests:** AI-025 guardrail (insights never alter scores or access), 429 handling, provider-unavailable state, demo-data absence (AI-013). | Must | NEW | R1 |
| TST-012 | **Terminology/copy audit** against the prohibited-claim list (§13.5) and Simulated labelling (SCP-010). | Must | NEW | R1 |
| TST-013 | **Store-readiness checks** per DEC-048 once the posture is decided. | Must | NEW | PA |
| TST-014 | **Runtime verification** of every item in Appendix H before any status is upgraded from audit-observed to verified. | Must | UNV | R1 |
| TST-015 | Verify invitation acceptance gates, Business isolation, effective-permission evaluation, multi-Business independence and immediate membership/permission/Deal-delegation revocation. | Must | NEW | PA |
| TST-016 | Verify Finance Manager limits: authorized negotiation/proposal drafting succeeds; final Founder-side confirmation, permission escalation, NDA acceptance for another party and unrelated-Deal access are denied. | Must | NEW | PA |
| TST-017 | Verify Unified Messages authorization for discover/list/read/send/preview/search/unread/notification/join/leave, including revocation, cross-Business identifiers, NDA stages and redacted push content. | Must | NEW | PA |
| TST-018 | Verify that message text cannot perform NDA acceptance, Deal-state transition or final agreement confirmation and that Founder and Investor structured confirmations remain independent. | Must | NEW | PA |
| TST-019 | Verify the separate Web Admin R1 minimum workflows without granting default private-message/NDA-content access or financial-record editing. Exact cases depend on OD-10. | Must | NEW | PA |

---

## 17. Dependencies & Assumptions

### 17.1 Dependencies (backend, platform and process; none is mobile work)

| ID | Dependency | Source | Blocks | Owner |
|---|---|---|---|---|
| DEP-001 | **Legacy baseline evidence (closed as a current dependency).** The audited Laravel working tree and `feature/simulated-payments-commission` branch remain historical evidence only. They shall not be merged, pinned or reused for the new system. New backend baselining belongs to its independent repository when authorized. | G-01 / DEC-046 | Historical traceability only; does not block new API freeze | APPROVED architecture boundary |
| DEP-002 | **Requirements baseline & documentation consolidation:** one dated baseline; mark `PROJECT_CONTEXT.md`, early implementation-log entries and old roadmap items as historical. This document is the mobile counterpart. | AUD §3, §9 (P0 item 6) | Source clarity | TBD |
| DEP-003 | **Mobile authentication backend work** for the approved option (§5.3), including any `RequireSpaSession`/origin handling or a separate token guard. | AUD §2, §8 | AUTH, all APIs | TBD (DEC-003) |
| DEP-004 | **Runtime verification of the existing financial-reporting/discrepancy backend** and **confirmation whether Investment Type / return-model terms exist** (replaces Edition 1.0's "backend gap" framing). | AUD §4; SG-09 | INV, FIN screens | TBD |
| DEP-005 | Push infrastructure: device registration, token lifecycle, APNs/FCM sending. Not mentioned by the audit. | SG-07 | NTF-003, MOB-080 | TBD |
| DEP-006 | **Repository extraction tasks** (read-only analysis): standardised error shape and status conventions; API version convention; upload type/size limits; implemented notification events; implemented Business/profile field set; timestamp/time-zone conventions; actual DB engine/PHP version (DEC-041). | R-16; AUD §2 | ARC-005, ARC-011, NTF-002, BIZ-001 | TBD |
| DEP-007 | Deep-link scheme and server support for resolving links with authorisation. **Two uses:** (a) **authentication links** — email-verification and password-reset completion (AUTH-016/017, DEC-052) — an **R1 dependency** (review finding F-09); (b) notification deep links (MOB-081) — R2. | MOB-081; FRR F-09 | AUTH-016/017 (R1); MOB-081 (R2) | TBD (DEC-055) |
| DEP-008 | Force-update / minimum-version signal. | ARC-011 | MOB-070 | TBD |
| DEP-009 | Account deletion / data-removal endpoint and policy. | AUTH-014 | Store readiness | TBD (DEC-026) |
| DEP-010 | **Paginate** AI-insight histories, report access-log collections, audit logs, messages and other unrestricted `get()` collections; cap page size; select only needed columns; define retention/archive policy. | AUD §6 (Medium), §9 (P1 item 1) | MOB-075 | TBD |
| DEP-011 | Ensure session endpoints return **distinguishable** statuses for expiry vs server error so clients can tell them apart. | AUD §5 | AUTH-012-D | TBD |
| DEP-012 | **Upload and link hardening:** explicit MIME allow-list, image decoding, malware scanning, quarantine; production controls against execution/content sniffing; restrict URL schemes in profile link fields. | AUD §8 | SEC-010, SEC-011 | TBD |
| DEP-013 | **Admin notification inbox** (explicitly not implemented). | AUD §5 | NTF-001 (Admin) | TBD |
| DEP-014 | **AI cost controls:** per-user and global quotas, daily budgets, usage metrics, administrative circuit breaker; provider retry/backoff; structured diagnostics without logging secrets or sensitive prompts; token accounting. | AUD §6–§7, §9 (P0 item 5, P2 item 2) | AI-020…029 | TBD |
| DEP-015 | **API contract inventory and OpenAPI specification.** | AUD §11 (step 3) | TST-007 | TBD |
| DEP-016 | **Remove demo match-explanation data** from production discovery; supply persisted or deterministic backend match detail and completeness metadata. | AUD §5 (High), §9 (P0 item 2) | AI-013, DSC-006 | TBD |
| DEP-017 | **Active-role persistence** approach (server-side or bounded client storage). | AUD §5 | ROL-003-D | TBD (DEC-047) |
| DEP-018 | **Runtime verification campaign** (Appendix H): authorisation matrix, migrations, query profiling, browser accessibility, Gemini endpoint/model compatibility without exposing credentials, production headers. | AUD §1, §9–§10 | Any `IMP` → "verified" upgrade | TBD |
| DEP-019 | New backend functional specification covering authorization, Business memberships/permissions, Deal delegation, messaging security, state machines and Admin duties. OD-01 approves the approach only; creation still requires separate authorization. | OD-01; BR/MSG decision families | Backend/API planning | Owner authorization pending |
| DEP-020 | Business Role policy decisions: invitation lifecycle, Custom Roles, multi-role merge, permission catalogue, Deal/report/workspace authority, revocation/history/audit and release allocation. | BR-DEC-001…012 | BRM-* implementation planning | Owner decisions pending |
| DEP-021 | Messaging policy/technology decisions: inbox/category rules, initiation, Team/Deal participation, unread/search/notifications, history/retention, delivery/receipts/moderation and release scope. | DEC-010; MSG-DEC-001…013 | UMSG-* implementation planning | Owner decisions pending |
| DEP-022 | Separate Web Admin specification, exact minimum R1 inventory, provisioning, authentication/session and frontend technology. | OD-03; OD-09…12 | R1 verification review and Admin support | OD-10 et al. pending |

### 17.2 Assumptions

| ID | Assumption | If wrong |
|---|---|---|
| ASM-001 | The Phase 1 Audit Report is the "Code Audit Report" originally requested and describes the repository accurately **for the audited working-tree state**. | Re-baseline §7. |
| ASM-002 | **Superseded by G-00/G-01.** The new Node.js + Express.js REST backend is the sole server authority. Laravel is historical read-only reference only and is neither integrated nor reused. | None; approved architecture recorded in §5. |
| ASM-003 | MPS remains the authoritative requirement set (MDP §23); implementation evidence does not override it (NFR-S02). | Update precedence rule. |
| ASM-004 | The prototype/simulation boundary (MPS §30) stands; no real-money features are introduced. | Legal review required. |
| ASM-005 | A single generic Deal entity serves both Investor and Professional engagements (P7 default; DEC-030). | Revisit DLR/MIL rows. |
| ASM-006 | The audit's "COMPLETE in code" means present and structurally complete, not tested; every such claim is treated as `IMP` with the audit's own qualifier. | Statuses downgraded. |


### 17.3 Dependency sequencing and critical path (review finding F-14)

> No owners are assigned here: owners are named by the stakeholders when the baseline is approved (**DEC-055**). Sequencing below is a **dependency order, not a schedule**; no time estimates are asserted.

| Step | Dependency / decision | Must precede | Why |
|---|---|---|---|
| 1 | **G-01 / DEC-046 and DEP-001** (legacy separation) | New backend repository/contract planning | The Laravel branch is read-only historical reference and cannot be the new baseline. A new repository baseline is recorded only after separately authorized creation. |
| 2 | **DEP-002** (requirements baseline; historical documents marked) and **DEP-006** (repository extractions) | DEP-015; ARC-005/011; BIZ-001; NTF-002 | Repository-answerable facts must be extracted, not decided. |
| 3 | **H-05 proof of concept (TST-006, ARC-024)** → **DEC-003** → **DEP-003** (mobile authentication backend work) | Every authenticated feature; DEP-011 | Feasibility is unproven; every R1 screen needs authentication. |
| 4 | **DEC-022** (stack; criteria §5.4) — decided together with step 3 evidence | Any build planning | Capability checks (ARC-023) may change the stack. |
| 5 | **DEP-015** (API contract/OpenAPI inventory) | TST-007; API contract freeze | Contract must describe the pinned baseline. |
| 6 | **DEP-010, DEP-011, DEP-016, DEP-012** (pagination; distinguishable session errors; demo-data removal; upload/link hardening) | R1 acceptance (AC-009, AC-011, AC-012, AC-002) | Audit-observed defects the client must not inherit. |
| 7 | **DEC-052 → DEP-007(a)** (auth-link completion path) | Registration and password-reset completion (AUTH-016/017) | Registration cannot finish without email verification. |
| 8 | **DEC-053, DEC-047** (session policy; active-role persistence) → **DEP-017** only if server-side | AUTH-018/019; ROL-003-D; AC-001 | Role and session behaviour. |
| 9 | **DEC-043** (+ H-08) | DLR-011…012 rendering rules; TST-003 | Ordering edge cases. |
| 10 | **DEP-018 / Appendix H** (runtime verification campaign) | Any status upgrade from audit-observed to verified; baseline freeze (H-01…H-06) | NFR-E05. |
| Later | DEP-004, DEP-005, DEP-008, DEP-009, DEP-013, DEP-014 | R2/R3 or specific rows | See §17.1. |

**Critical path to build planning remains provisional under G-10:** separately authorize/specify the independent backend (OD-01/DEP-019) → resolve authentication decisions and proof (G-03/G-05/OD-08) → author the new REST contract (DEP-015) → verify security and data-isolation requirements. G-07 controls release allocation. The legacy baseline and payment branch are not on the critical path.

---

## 18. Mobile Functional Access Points (Screen Inventory — functional, not visual)

> **Functional inventory, not a visual design (owner instruction).** This inventory lists the **functional access points** the app must provide — the flows and views a user must be able to reach — and the requirement IDs they serve. It does **not** prescribe screen layout, screen count, grouping, tab or drawer structure, or navigation appearance; those are design decisions (ARC-008, MOB-100…104). "Screen" below means a functional access point and may be realised as one or several screens. It is derived from UXP §4 functionally; the legacy bottom tab bar (Dashboard · Discover · Deal Rooms · Profile · More) and the ≈38-template count are recorded in Appendix M as nonbinding. Releases are **PROPOSED** (§4.4). Public/marketing pages (Landing, How it works, Value proposition, AI capabilities, Trust & Security, FAQ) are web-marketing content; whether they exist inside the native app is **PENDING USER APPROVAL** (DEC-034).

| ID | Functional access point | Roles | UXP ref | Primary requirement IDs | Rel. |
|---|---|---|---|---|---|
| SCR-001 | Login · Register (role selection) · Forgot/Reset password · Email verification · Phone verification | All | §7.1 | AUTH-001…010 | R1 |
| SCR-002 | Role switcher / workspace chooser | Multi-role | §3.1 | ROL-003, MOB-002, MOB-003 | R1 |
| SCR-003 | Dashboard (role variants) | All | §6.1 | DSH-001…005 | R1 |
| SCR-004 | Own profile + editor (role variants) | F/I/P | §6.2, §7.3, §7.4 | PRO-001…008 | R1 |
| SCR-005 | Other user's profile (read-only, locked sections) | F/I/P | §6.2 | PRO-007 | R1 |
| SCR-006 | Verification submission & status | F/I/P | §7.6 | VER-001…008 | R1 |
| SCR-007 | My Businesses list | F | §7.2 | BIZ-007 | R1 |
| SCR-008 | Business creation wizard (autosave) | F | §7.2 | BIZ-001…005 | R1 |
| SCR-009 | Business detail — owner view (functional areas per BIZ-008; Funding Ask & Financial Reporting areas are R2 per BIZ-008-B) | F | §7.2 | BIZ-008…011 | R1 |
| SCR-010 | Business detail — non-owner view (locked stages) | I/P | §7.2 | BIZ-009, DIS-008…010 | R1 |
| SCR-011 | Discover Startups / Investors / Professionals (search, filters, sort, results) | I/P/F | §6.3 | DSC-001…011 | R1 |
| SCR-012 | AI Suggestions view | All | §6.3, §8 | DSC-010, AI-010…014 | R1 |
| SCR-013 | Readiness Score detail and improvement suggestions | F | §8 | AI-001…007 | R1 |
| SCR-014 | Match Score / explainability detail | All | §6.4 | AI-010…013 | R1 |
| SCR-015 | AI insight screens (business analysis, deal insights) | F/I/P | — (audit-observed) | AI-020…028 | PA (DEC-042) |
| SCR-016 | Interest / Connections list; Professional Applications tracker | I/P/F | §6.5, §7.4 | CON-001…005 | R1 |
| SCR-017 | Staged disclosure content view; NDA flow and confirmation | I/P/F | §7.5, §9 | DIS-001…016 | R1 |
| SCR-018 | Deal Room (functional areas: Overview · Documents · Chat · Terms · Milestones · Financial Reports — the last is R2 per DLR-006-B) | F/I/P | §10 | DLR-001…014, MSG-001…004 | R1 |
| SCR-019 | Negotiation / terms comparison; Agreement view (Investment Type-specific terms are R2 per NEG-002…004) | F/I/P | §7.4, §10 | NEG-001…006, AGR-001…002 | R1 |
| SCR-020 | Milestone tracking and progress updates | F/I/P | §7.5 | MIL-001…010 | R1 |
| SCR-021 | Investment Preferences incl. investment-type interest | I | §7.3 | PRO-002, PRO-003 | PA |
| SCR-022 | Investment Detail; Portfolio; Saved Opportunities | I | §7.3 | INV, PTF-001…003, DSC-014 | R2 |
| SCR-023 | Financial Reporting (periodic submission); Financial Report Review & Discrepancy flow | F / I | §7.2, §7.5 | FIN-001…012 | R2 |
| SCR-024 | Payments / commission display (simulated) | F/I | — | PAY-001…009 | R2 |
| SCR-025 | Reputation detail and feedback | F/I/P | §7.5 | REP-001…009 | R1 |
| SCR-026 | Notifications centre; notification preferences (push delivery is R2 per MOB-080) | All | §4, §3 | NTF-001…004 | R1 |
| SCR-027 | Premium / pricing | All | §7.1 | PRM-001…008 | R2 |
| SCR-028 | Settings (only controls that exist; no "Coming soon" controls shipped) | All | §4 | AUD-D09, AUTH-014 | R1 |
| SCR-029 | Update-required / maintenance / offline / error / suspended-account states | All | — | MOB-070, MOB-020, AUTH-010 | R1 |
| SCR-030 | **Separate Web Admin Dashboard** (not a mobile access point) | Admin | §7.6 | ADM-002, OD-03 | R1 minimum / later remainder (PA) |
| SCR-031 | Web Admin Tier 1 Verification Queue and other minimum necessary R1 actions; exact inventory requires OD-10 confirmation | Admin | §6.6, §7.6 | ADM-003…005, OD-10 | R1 minimum (PA inventory) |
| SCR-032 | Web Admin Applications; Teams; Deals; Investments | Admin | §6.6 | ADM-006…008 | PA under G-07/OD-10 |
| SCR-033 | Web Admin Financial Reports & Discrepancies workspace | Admin | §7.6 | ADM-009, ADM-010 | PA under G-07/OD-10 |
| SCR-034 | Web Admin Reports/Disputes; Reputation oversight; Audit Logs; Analytics; Settings | Admin | §7.6 | ADM-011…018 | PA under G-07/OD-10 |
| SCR-035 | Business Team Workspace: membership, role/permission view, assigned tasks, milestones and documents | Founder / authorized Professionals | — | BRM-001…015 | PA (BR-DEC-012) |
| SCR-036 | Unified Messages Inbox with All / Hiring / Deals / Team filters, safe previews, unread counts and authorized search | F/I/P | — | UMSG-001…013 | PA (MSG-DEC-013) |
| SCR-037 | Hiring Chat | Founder / Professional | — | UMSG-004 | PA |
| SCR-038 | Business Team Chat | Active authorized Business members | — | UMSG-005 | PA |
| SCR-039 | Deal Room participant/delegation management and Finance Manager negotiation identity | Founder / Investor / delegated Finance Manager | — | BRM-007…009, UMSG-006/007 | PA |


---

## 19. Decisions Register (Prioritised; Options; Briefs; PENDING USER APPROVAL)

> **Authoritative status notice (Revision 6).** Decision Register Revision 6 supersedes the earlier status narrative in this section. Exactly five decisions are approved: **G-00, G-01, OD-01 (approach only), OD-03 and OD-07**. Every other existing item remains PENDING except G-02 / DEC-022, which remains NEEDS VERIFICATION, and historical closed/reserved/superseded entries. In particular G-03 / DEC-003, G-05 / DEC-053, G-07 / DEC-034 and DEC-054, G-10 / DEC-055, DEC-010, DEC-031, DEC-042 and OD-08 remain PENDING. BR-DEC-001…012 and MSG-DEC-001…013 are owner-requested proposals and all remain PENDING. The older option briefs below are retained for history but shall be read through the approved architecture in §5; no Laravel/Sanctum option is active.

### 19.0 Revision 6 decision-family traceability

| Family | Status | Specification coverage |
|---|---|---|
| G-00, G-01, OD-07 | APPROVED | §3–§5, ARC-001…006/020, SCP-003, API, DEP, Appendices B/D/I/N |
| OD-03 | APPROVED | SCP-002-A, §6, ADM, §18, §21; separate Web Admin with minimum R1 support |
| OD-01 | APPROVED approach only | DEP-019; does not authorize creating the backend specification or development |
| BR-DEC-001…012 | **PENDING (12/12)** | BRM-001…015, WF-014/015/017, SEC-016…018, API-014/015, TST-015/016, SCR-035/039 |
| MSG-DEC-001…013 | **PENDING (13/13)** | MSG/UMSG, WF-016, PRV-006, API-016, TST-017/018, SCR-036…039 |
| DEC-010 | **PENDING** | MSG-001, UMSG-011/012; no delivery, attachment, receipt or moderation choice is made |

### 19.1 P0 — Blocking decisions

| ID | Decision | Options | Affects | Status |
|---|---|---|---|---|
| **DEC-003** | **Mobile authentication transport** | A stateful cookie session from the native client; B dedicated mobile token guard; C other mechanism (§5.3). All must satisfy ARC-006-C1…C8. | ARC-006, AUTH-*, API-002/013, MOB-011, DEP-003, TST-006 | PENDING USER APPROVAL |
| **DEC-034** | **Mobile release scope** | A R1 excludes investment/financial layer; B all MPS §25.1 Must-Haves in R1; C role-by-role phasing (§4.4). Also whether public marketing screens exist in-app (§18) and **whether R1 may omit MPS §25.1 Must-Haves (DEC-054)**. | SCP-001, §4.4, Appendix F, §21 | PENDING USER APPROVAL |
| **G-01 / DEC-046** | **Role of legacy platform and new backend baseline** | **APPROVED Option A:** legacy Laravel is read-only historical reference; no integration or code reuse; the independent new backend receives its own repository/baseline when created. | ARC-002/020, DEP-001, PAY-007 | **APPROVED** (Revision 6 evidence preserved in authoritative register) |
| **DEC-022** | **React Native / Expo stack and criteria** *(promoted to P0 — review finding F-04/F-07; extended)* | A Expo workflow with development builds as needed (managed-style); B Expo with prebuild/config plugins (bare-capable); C bare React Native; plus RN/Expo SDK version, TypeScript usage, state-management and navigation libraries, **push approach, over-the-air updates, native modules, uploads, and physical-Android build/test workflow without Android Studio**. Criteria: §5.4. | ARC-001, ARC-022…027, NTF-003, MOB-011/012/060…064/070/080/081 | PENDING USER APPROVAL |
| **DEC-047** | **Active-role persistence mechanism** *(promoted to P0 — AC-001 is an R1 acceptance criterion; AUD-D01)* | A server-side; B bounded client storage validated against enrolled roles; C both | ROL-003-D, MOB-003, DEP-017, AC-001 | PENDING USER APPROVAL |
| **DEC-043** | **Deal-state sequencing** (CONF-29) | (1) *Matched*: conceptual (P7 default) / persisted / other. (2) *NDA already complete at Connection creation*: A sequential recorded transitions in one transaction / B Deal created at Deal Room Opened then NDA state applied by server evaluation / C other. | DLR-002, DLR-011, DLR-012, WF-006, WF-013, TST-003 | PENDING USER APPROVAL |
| **DEC-006** | **Investment Type placement and terms** | A Business-level enabled types plus deal-level selection (as UXP implies); B deal-level only; C other. Plus: whether per-deal profit/loss and distributions are *recorded* (undefined; none until decided). Also confirm from the repository whether the capability exists (DEP-004). | PRO-003, BIZ-004, DSC-004, NEG-002…004, INV-*, DLR-003 | PENDING USER APPROVAL |
| **DEC-052** | **Email-verification and password-reset completion path on mobile** *(new — review finding F-09)* | A return to the app from the signed link (app/deep link); B complete in the system browser, then return and sign in; C other (e.g., a code-entry mechanism — requires backend change; not assessed by any source). Must keep the flow signed and server-validated (ARC-006-C2). | AUTH-004/006/016/017, DEP-007(a), DEC-003, DEC-022 | PENDING USER APPROVAL |
| **DEC-053** | **Session lifetime, re-authentication and multi-device policy** *(new — review finding F-10)* | A server-defined lifetime only (client honours `401`/`419`); B A + client idle lock; C B + re-authentication for sensitive actions (e.g., NDA acceptance, financial report submission) + remote revocation/"sign out everywhere". Biometric unlock and device-integrity checks are optional extras only if wanted. | AUTH-012-D, AUTH-018/019/020, ARC-006-C*, DEC-003 | PENDING USER APPROVAL |
| **DEC-054** | **Name and status of Mobile Release 1 relative to MPS §25.1** *(new — review finding F-06)* | A R1 is a partial release named "Mobile Release 1", explicitly **not** the MPS MVP (proposal in §4.4); B R1 must cover all participant-facing §25.1 Must-Haves (= DEC-034 Option B); C other. | §4.4, SCP-001, Appendix K.1 | PENDING USER APPROVAL |

#### 19.1.1 Blocking-decision briefs

> Each brief gives the question, options, functional implications, technical dependencies, risks, evidence required, a **recommended option marked as a PROPOSAL**, and the current status. Statements on Expo/Sanctum are general engineering knowledge, not verified (SG-11).

#### DEC-003 — Mobile authentication transport
| Element | Content |
|---|---|
| Question | **Historical v2.1 wording:** how a native client would authenticate to the old Laravel API. **Current question:** which JWT token/session design safely serves the native client under G-03/G-05/OD-08? |
| Options | A stateful cookie session from the native client; B dedicated mobile token guard on a separate route group; C another mechanism (not assessed by any source). All shall satisfy ARC-006-C1…C8. |
| Functional implications | Every authenticated feature; logout semantics (AUTH-009); expiry handling (AUTH-012-D); email/reset completion (AUTH-016/017); session policy (AUTH-018/019); admin isolation unchanged. |
| Technical dependencies | Behaviour of `RequireSpaSession`, CSRF and origin checks toward non-browser clients (H-05); DEP-003; DEP-011; SEC-013; client networking/storage capabilities (DEC-022); throttling parity. |
| Risks | **A:** relies on browser-origin/CSRF conventions a native client does not follow by default; session cookie held by the OS cookie store rather than an app-controlled secure store; brittle. **B:** needs backend work; personal access tokens have no expiry unless configured, so expiry, rotation, revocation and ability scoping must be specified or a stolen token is long-lived; bearer tokens must **not** be enabled on web SPA routes (ARC-006-C6). *(General knowledge; unverified.)* |
| Evidence required | H-05 proof of concept on a **physical Android phone** against a non-production backend (TST-006, ARC-024): handshake/token issuance, throttle parity, logout invalidation, secure-storage inspection, no credential in logs. |
| Recommended option (**PROPOSAL only**) | **B**, subject to H-05, because it avoids dependence on browser-origin semantics and keeps ARC-006-C6 intact; pair it with explicit expiry/rotation/revocation (DEC-053). Option A remains acceptable if H-05 shows it is secure and stable. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-034 — Mobile release scope
| Element | Content |
|---|---|
| Question | Which MPS requirements ship in which mobile release, and does the first release have to equal the MPS MVP? |
| Options | A R1 excludes the investment/financial layer; R2 adds it after runtime verification. B R1 contains all participant-facing §25.1 Must-Haves. C role-by-role release. (§4.4; Appendix K.1 shows per-option coverage of the 21 items.) |
| Functional implications | Which of the 21 §25.1 items exist on mobile at each release; whether Investment Type selection, financial reporting/discrepancy flagging, premium and Admin are in R1. |
| Technical dependencies | New backend specification/contract and verification (DEP-019, PAY-007); investment/financial decisions and evidence; TST-001. Legacy H-02 is historical only. |
| Risks | A: R1 omits the investment and transparency layer the MPS treats as core (R1 ≠ MPS MVP). B: depends on every `UNV` backend item being verified first; largest scope. C: shared work (auth, Deal Room) repeated or sequenced across role releases. |
| Evidence required | New-system authorization and financial capability verification after implementation is separately authorized; legacy H-02 does not satisfy it. |
| Recommended option (**PROPOSAL only**) | **A**, named "Mobile Release 1", with the explicit statement that it is not the MPS MVP and a committed path to full §25.1 coverage in R2/R3 — because the R2 backend capabilities are `UNV` or unstable today. |
| Current status | **PENDING USER APPROVAL** |

#### G-01 / DEC-046 — Legacy platform is read-only reference (APPROVED; Revision 6)
| Element | Content |
|---|---|
| Decision | Option A approved: the legacy Laravel platform is read-only reference only; no Laravel code, framework dependency or implementation is reused or integrated. |
| Functional implications | Legacy payment/commission work is not a dependency. PAY-007 governs any new simulated capability in the independent Node.js backend. |
| New baseline | The new backend has its own repository and baseline when authorized; no legacy commit is pinned as the new baseline. |
| Historical evidence | The uncommitted legacy branch and unrun tests remain recorded in Appendix B/H as legacy audit facts only. |
| Current status | **APPROVED** — G-01 / DEC-046, per Decision Register Revision 6. No additional decision is approved. |

#### DEC-022 — React Native / Expo stack and criteria
| Element | Content |
|---|---|
| Question | Which React Native/Expo workflow and supporting choices satisfy the app's native-capability needs against the independent Node.js + Express.js backend, within the owner's environment (Expo, TypeScript, Antigravity/VS Code, physical Android phone, no Android Studio)? |
| Options | A Expo workflow with development builds as needed; B Expo with prebuild/config plugins; C bare React Native. Plus SDK version, state/navigation libraries, push approach, OTA updates. |
| Functional implications | Whether secure storage, camera/upload, push, deep links, screen-obscuring and image cleanup are available (ARC-023); how authentication and email/reset links work. |
| Technical dependencies | DEC-003 evidence (H-05); DEP-005 (push); DEP-007 (links); DEP-008 (force update); DEP-015 (contract); store posture (DEC-048); device matrix (DEC-050). |
| Risks | A capability may be unavailable in the chosen workflow; testing push or native modules may need a development build rather than the stock Expo client; build/run without Android Studio must be proven; version upgrade effort. *(General knowledge; unverified.)* |
| Evidence required | The 12 criteria in §5.4: proof-of-concept results on the owner's Android phone for authentication, uploads, secure storage, links (and push for R2). |
| Recommended option (**PROPOSAL only**) | **A**, subject to the proof of concept, because it matches the owner's stated environment; fall back to B only if a required capability is unavailable. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-047 — Active-role persistence
| Element | Content |
|---|---|
| Question | Where is the user's chosen active role stored so it survives restart (AUD-D01)? |
| Options | A server-side; B bounded client storage validated against the enrolled roles returned by the server; C both. |
| Functional implications | AC-001; multi-device behaviour (a client-only choice is per device); role switcher (MOB-002/101). |
| Technical dependencies | A needs a backend change (DEP-017); B needs only a safe client store and the server's enrolled-role list (ROL-003). |
| Risks | A: backend work and an API contract. B: choice not shared across devices; stale role if enrolment changed — mitigated by validation on every restore. Either: role-scoped caches must be cleared on switch (SEC-007). |
| Evidence required | Confirm the session/role endpoint returns enrolled roles (DEP-006); H-01 for role isolation. |
| Recommended option (**PROPOSAL only**) | **B** for Release 1 (lowest backend dependency), with C considered later if multi-device consistency is wanted. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-043 — Deal-state sequencing (Matched; NDA complete before the Connection)
| Element | Content |
|---|---|
| Question | (1) Is *Matched* conceptual or persisted? (2) When the NDA is already complete at Connection creation, how do lifecycle states 3–4 behave? |
| Options | (1) conceptual (P7 default) / persisted / other. (2) A sequential recorded transitions in one transaction / B Deal created at *Deal Room Opened* then *NDA Signed* applied by server evaluation / C other. |
| Functional implications | DLR-011/012 rendering rules; WF-006, WF-013; AC-006; TST-003. |
| Technical dependencies | H-08 runtime evidence of current behaviour. |
| Risks | A client that infers or reorders states would contradict the server; a skipped state would violate DLR-001 ("none skipped"). |
| Evidence required | H-08. |
| Recommended option (**PROPOSAL only**) | (1) conceptual (P7 default); (2) **A**, because it preserves history and the "no state skipped" rule. Until decided the client renders exactly what the server returns (DLR-012). |
| Current status | **PENDING USER APPROVAL** |

#### DEC-006 — Investment Type placement and terms
| Element | Content |
|---|---|
| Question | Where is Investment Type (Micro vs Large/Standard) selected and its terms recorded, and are per-deal profit/loss and distributions recorded? |
| Options | A Business-level enabled types plus deal-level selection (as UXP implies); B deal-level only; C other. Plus whether distributions are recorded (undefined; none until decided). |
| Functional implications | PRO-003, BIZ-004, DSC-004, NEG-002…004, INV-001…010, DLR-003, FEAT-021/022. The R2 investment layer cannot be specified end-to-end until decided. |
| Technical dependencies | DEP-004 and H-09 (does the capability exist at runtime?). |
| Risks | The audit is silent (SG-09); building screens for a field that does not exist; confusing the return model (what the investor receives) with milestone funding (when capital is released — MIL-008). |
| Evidence required | H-09; repository extraction of the Business/Deal fields (DEP-006). |
| Recommended option (**PROPOSAL only**) | **A**, subject to H-09, because MPS §24 says the investor chooses per opportunity and the founder enables types. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-052 — Email-verification and password-reset completion on mobile
| Element | Content |
|---|---|
| Question | How does a mobile user complete the signed email-verification and password-reset links? |
| Options | A return to the app from the link; B complete in the system browser, then sign in on the app; C other (requires backend change). |
| Functional implications | Registration cannot finish without email verification (Tier 0); password recovery. |
| Technical dependencies | Signed routes exist (AUD §8); DEP-007(a); DEC-003; DEC-022 (link handling). |
| Risks | A: needs link association between the web domain and the app and a verified-link PoC; B: user leaves the app; both must keep the flow signed/server-validated (ARC-006-C2). |
| Evidence required | H-21 (link PoC; signed-link validity; expiry/single-use extracted from the repository). |
| Recommended option (**PROPOSAL only**) | **B** for Release 1 (least dependency on the existing signed web routes), with A later. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-053 — Session lifetime, re-authentication and multi-device policy
| Element | Content |
|---|---|
| Question | How long does a session last, what happens when idle, which actions require re-authentication, and may a user be signed in on several devices or sign out everywhere? |
| Options | A server-defined only; B A + client idle lock; C B + re-authentication for sensitive actions + remote revocation/sign-out-everywhere. Biometric unlock/device-integrity checks optional. |
| Functional implications | AUTH-012-D, AUTH-018/019/020; NDA acceptance and report submission flows; what happens to other sessions on password change. |
| Technical dependencies | DEC-003 (a token option needs explicit expiry/revocation); server configuration (extract — H-22). |
| Risks | No source defines it; without it a stolen token or lost phone has unbounded exposure (token option) or inconsistent behaviour (cookie option). |
| Evidence required | H-22 (current session/token lifetime and revocation configuration). |
| Recommended option (**PROPOSAL only**) | **C** for sensitive actions and revocation; keep biometric unlock optional. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-054 — Name and status of Mobile Release 1 relative to MPS §25.1
| Element | Content |
|---|---|
| Question | May the first mobile release omit MPS §25.1 Must-Haves, and what is it called? |
| Options | A partial "Mobile Release 1", explicitly not the MPS MVP; B participant-facing Must-Haves all in R1 (= DEC-034 Option B); C other. |
| Functional implications | Release communications; acceptance of "MVP" language; Appendix K.1. |
| Technical dependencies | DEC-034. |
| Risks | Calling a partial release the MVP hides omitted core functionality. |
| Evidence required | None beyond the decision. |
| Recommended option (**PROPOSAL only**) | **A**, decided with DEC-034. |
| Current status | **PENDING USER APPROVAL** |

#### DEC-004 — Admin on mobile (historical pending card constrained by approved OD-03)
| Element | Content |
|---|---|
| Question | Which Admin functions, if any, are delivered on mobile? |
| Options | A none; B triage subset (e.g., verification queue, discrepancy review); C full parity. |
| Functional implications | ADM-001…018, SCR-030…034, NTF-001-A. |
| Technical dependencies | DEP-013 (Admin inbox); staff-tier RBAC if multiple admin grades (AUD P2). |
| Risks | Admin screens show ID images and financial evidence; sensitive. |
| Evidence required | H-16. |
| Recommended option (**PROPOSAL only**) | **A** for R1/R2; revisit for R3. (Reviewer note: gating R1 on this decision is unnecessary.) |
| Current status | **PENDING USER APPROVAL** |

#### DEC-042 — Gemini AI insight layer in scope? (now P1; gates insight screens only)
| Element | Content |
|---|---|
| Question | Is the audit-observed Gemini insight layer part of mobile scope given MPS §8/§27? |
| Options | A accept with guardrails, quotas and privacy review; B exclude from Mobile Release 1; C restrict to some roles/surfaces. |
| Functional implications | FEAT-014; SCR-015; what data may be sent to the provider (AI-028). **Guardrails AI-024 and AI-025 apply whichever option is approved** (review finding F-23). |
| Technical dependencies | DEP-014 (quotas, backoff, telemetry); H-04, H-17. |
| Risks | Single provider, no fallback, no quota for matching/deal/admin insights; unknown data sent to provider. |
| Evidence required | H-04, H-17. |
| Recommended option (**PROPOSAL only**) | **B** for Release 1 (no code impact on deterministic scoring). |
| Current status | **PENDING USER APPROVAL** |

### 19.2 P1 — Before the affected feature

**19.2.1 R1 gates (P1)** — these decisions are cited by rows allocated to Release 1 (review finding F-04); they gate R1 build planning (§21.2).

| ID | Decision | Options | Affects | Status |
|---|---|---|---|---|
| DEC-005 | Mobile scope of multi-role handling (multi-role itself is `IMP`) | A role switching only; B switching + add-role; C full enrollment/removal screens | ROL-003, AUTH-001, MOB-002 | PENDING USER APPROVAL |
| DEC-010 | Deal Room chat model | Delivery: polling / real-time; attachments yes/no; read receipts; moderation (no scanning permitted — MPS §16.3) | MSG-001, MSG-002 | PENDING USER APPROVAL |
| DEC-014 | Milestone structure approval; dispute handling | Structure: implicit via Agreement (P7 default) / explicit counterparty approval. Dispute: status only / Admin queue | MIL-004, MIL-009 | PENDING USER APPROVAL |
| DEC-016 | Phone verification real vs simulated; founder-side tier requirement | A simulated; B real SMS provider; founder tier: none (default) / Tier ≥ 1 | AUTH-005, ROL-005 | PENDING USER APPROVAL |
| DEC-017 | Re-expressing interest after decline; NDA withdrawal/expiry; interpretation of 1→2 auto-grant | Re-express allowed / blocked / by Founder reset; withdrawal/expiry: none / add | DIS-002, DIS-004, DIS-006, CONF-23 | PENDING USER APPROVAL |
| DEC-025 | Performance, crash-rate and load thresholds | Approve/modify PERF-001…005; define LOAD-009 thresholds | §15 | PENDING USER APPROVAL |
| DEC-041 | Confirm actual DB engine and PHP version from repository configuration | Technical confirmation (audit: MySQL-oriented migrations; PHP 8.2; P0: PostgreSQL; PHP 8.3+) | ARC-020, CONF-25 | PENDING USER APPROVAL |
| DEC-044 | Non-completion outcome (CONF-28) | (i) no new state; (ii) add terminal Cancelled/Withdrawn (requires MPS §14.1 amendment); (iii) other | DLR-013, REP-004 | PENDING USER APPROVAL |
| **DEC-004** | **Admin on mobile (historical question)** | Remains PENDING in Revision 6, but approved OD-03 establishes the delivery direction: separate Web Admin Dashboard, with minimum necessary R1 functionality. This card cannot be read as permission to place Admin in the participant mobile app. | SCP-002-A, ADM-*, SCR-030…034, OD-03/10 | PENDING USER APPROVAL |
| **DEC-042** | **Gemini insight layer in scope?** (CONF-24) | A accept with guardrails, quotas and privacy review; B exclude from Mobile Release 1; C restrict to some roles/surfaces (§11.4). Includes what data may be sent to the provider (AI-028). | AI-020…029, SCR-015, DEP-014, PRV-005 | PENDING USER APPROVAL |
| **DEC-055** | **Dependency owners and sequencing** *(new — review finding F-14)* | Stakeholders name an owner for each of DEP-001…DEP-018 and approve the sequence in §17.3; this document assigns **no** owners. | §17.1, §17.3, NFR-E03 | PENDING USER APPROVAL |

**19.2.2 Later-release P1** — block only R2/R3 or specific later rows.

| ID | Decision | Options | Affects | Status |
|---|---|---|---|---|
| DEC-001 | Provision of the Code Audit Report | — | SG-01 | **Closed** — the Phase 1 Audit Report was supplied; owner to confirm ASM-001. |
| DEC-007 | Commission rate, payer, trigger, rounding and display (3–5% range fixed by MPS §20) | Rate: platform-wide / per-deal within range / admin-configurable. Payer: investor-added / founder-deducted / display-only. Trigger and rounding: as defined by approved rule. | PAY-001…005, WF-012 | PENDING USER APPROVAL |
| DEC-008 | Premium scope, pricing, tier names, durations; backend enforcement | A UI-only simulation as today; B backend-enforced simulated entitlements; C real subscriptions (outside MVP; legal review) | PRM-001…008 | PENDING USER APPROVAL |
| DEC-009 | Notification event taxonomy and preferences model | A adopt the implemented event set (extract per DEP-006); B extend; granularity of preferences and quiet hours | NTF-002, NTF-004 | PENDING USER APPROVAL |
| DEC-012 | Financial-report cadence and late/missing handling | Monthly / quarterly / fixed per deal / founder-set; late handling: none / reminders only | FIN-001, FIN-012 | PENDING USER APPROVAL |
| DEC-013 | Discrepancy status vocabulary and Admin outcomes | 3 values (MPS/ILS) / 4 values (UXP); outcomes limited to Resolved / Disputed / Under Review (as sourced) | FIN-008, ADM-010, CONF-12 | PENDING USER APPROVAL |
| DEC-045 | Milestone and funding semantics for Professional deals (CONF-30) | (i) same model as investor deals; (ii) milestones without funding/commission; (iii) omit Milestone Funding Active and Financial Reports | DLR-014, MIL-001, DLR-008 | PENDING USER APPROVAL |
| DEC-048 | App-store policy posture for a simulated-investment app with premium gating | Listing category, financial/simulation disclosures, in-app-purchase handling, account-deletion compliance | MOB-097, PRM-008, TST-013 | PENDING USER APPROVAL |
| DEC-026 | Account deletion / data removal semantics | Deletion request to Admin / anonymisation / full deletion (constrained by audit and financial records) | AUTH-014, PRV-003, DEP-009 | PENDING USER APPROVAL |
| DEC-039 | Multi-investor funding rules | Target tracking, caps, oversubscription, round closing, aggregate display — none defined | BIZ-012 | PENDING USER APPROVAL |

### 19.3 P2 — Later / non-blocking for R1

| ID | Decision | Options | Affects | Status |
|---|---|---|---|---|
| DEC-011 | Platform-wide minimum/maximum per investment type; founder-set Micro minimum (illustrative in ILS) | Define / leave deal-level | INV-004 | PENDING USER APPROVAL |
| DEC-015 | Readiness weights, thresholds, bands (Phase 5 absent) | Supply Phase 5 spec / extract from code | AI-004 | PENDING USER APPROVAL |
| DEC-018 | Which Should-Have items enter any release | Per MPS §25.2 list | SCP-004 | PENDING USER APPROVAL |
| DEC-019 | Global search scope | None / per-entity / cross-entity respecting RBAC and stage | DSC-013 | PENDING USER APPROVAL |
| DEC-020 | Admin impersonation-for-support | Keep deferred / implement with audit | ADM-003, CONF-22 | PENDING USER APPROVAL |
| DEC-027 | Professional feedback eligibility and completion signal | As P8 assumption / define engagement completion | REP-006, WF-004 | PENDING USER APPROVAL |
| DEC-028 | Tier 2 promotion trigger; reputation formula weights | Manual only / eligibility rule | VER-004, REP-006 | PENDING USER APPROVAL |
| DEC-030 | Single generic Deal entity (Teams derived) | Confirm / split | DLR-008, ASM-005 | PENDING USER APPROVAL |
| DEC-031 | Business pre-publish moderation and unpublish/withdraw | None (P3 default) / Admin approval mandatory / add unpublish | BIZ-006 | PENDING USER APPROVAL |
| DEC-035 | Agreement document form | In-app read-only record / generated file (not a legal instrument) | AGR-002 | PENDING USER APPROVAL |
| DEC-038 | Admin "elevated auth" meaning | MFA / shorter sessions / device policy | AUTH-015, SEC-014 | PENDING USER APPROVAL |
| DEC-040 | Dashboard metrics definitions; "who viewed" tracking | Define calculations / drop metrics | DSH-003, PTF-003, DIS-012 | PENDING USER APPROVAL |
| DEC-049 | UI language(s) | English only / Bangla / both | MOB-090 | PENDING USER APPROVAL |
| DEC-050 | Device/OS support matrix, reference device, store distribution | Define | MOB-096, PERF-001 | PENDING USER APPROVAL |
| DEC-051 | Telemetry, crash reporting and analytics scope | None / crash-only / analytics (excluding sensitive data) | MOB-095, PERF-003 | PENDING USER APPROVAL |
| DEC-029 | ~~Native design-token implementation; theme follows OS or user setting~~ | **Superseded by owner instruction (v2.1 brief §2): no mobile visual design system is mandated.** Appearance is a design-team decision (ARC-008, MOB-092). | ARC-008, MOB-092 | **Superseded** (not an approval of any palette) |
| DEC-002, 021, 023, 024, 032, 033, 036, 037 | — | — | — | **Reserved** |

---

## 20. Contradictions & Conflicts Register

> Meanings of CONF IDs referenced in Edition 1.0 §§1–9 are taken from that usage ("inferred"). CONF-01, 10, 14, 16–21 are **Reserved** (not referenced in the received text). "Resolved" here means the **documentation** is consistent; business decisions remain PENDING USER APPROVAL.

| ID | Conflict | Sources | Treatment in this edition | Decision |
|---|---|---|---|---|
| CONF-02 | Native app cannot use the browser SPA cookie flow; P0/P1 prohibit JWT/browser-storage tokens; audit: bearer extraction disabled | P0; P1; AUD §2, §8 | §5.3 options; constraints ARC-006-C1…C8 | DEC-003 |
| CONF-03 | Single role per account (P1/P2 default) vs multi-role (UXP §3.1) | P1; P2; UXP §3.1; AUD §4 | **Resolved as status:** multi-role is `IMP`; ROL-003 corrected | DEC-005, DEC-047 |
| CONF-04 | Micro/small-investor ticket size: ৳10,000–50,000 (MPS §5.2) vs ৳5,000–10,000 (MPS §15, ILS) | MPS; ILS | Both retained, not reconciled | DEC-011 |
| CONF-05 | Investment Type excluded from P3/P6 yet required by MPS §15/§25.1 and UXP | MPS; UXP; P3; P6 | Status `UNV`; options in DEC-006 | DEC-006 |
| CONF-06 | P7 negotiation terms "equity %" only vs type-adaptive terms (UXP/ILS) | P7; UXP §10; ILS | NEG-002 retained, `UNV` | DEC-006 |
| CONF-07 | P9 assumes investment/financial data models P7 never defines | P9; P7 | Audit observes financial reports (`IMP`); investment terms `UNV` | DEP-004 |
| CONF-08 | Premium: MPS Must-Have vs removed from P8 vs assumed by P9 | MPS §25.1; P8; P9 | Audit: `PAR` (UI only) | DEC-008 |
| CONF-09 | Commission (MPS §20/§33) not built by any phase (P7 excludes) | MPS; P7 | Audit: `PAR`, uncommitted | DEC-007, DEC-046 |
| CONF-11 | Deal Room chat required by MPS/UXP vs P7 "only if exists" | MPS §14; UXP §10; P7 | Audit observes messages → `IMP`; details open | DEC-010 |
| CONF-12 | Discrepancy statuses: 3 values (MPS/ILS) vs 4 (UXP) | MPS §15.4; ILS §6; UXP §6.7 | Open | DEC-013 |
| CONF-13 | Milestone completion: MPS §24 "marked completed" vs two-step Mark + Confirm (UXP §7.5/P7) *(inferred)* | MPS §24; UXP §7.5; P7 | Two-step retained (MIL-003) | — |
| CONF-15 | Palette instructions in legacy sources (P0 line 221 palette tokens; P1 line 346 cyan for AI-associated content) vs UXP Direction G (copper AI accent) vs the owner's instruction that **no mobile visual system is mandated** | P0; P1; UXP §2.1; owner brief §2 | **Resolved by owner instruction:** no palette is binding (ARC-008); the P1 cyan instruction is confirmed stale (FRR F-21); all palette content is nonbinding (Appendix M) | DEC-029 (superseded) |
| CONF-22 | UXP names Admin impersonation; P9 defers it | UXP §6.6; P9 | Deferred; not built unless instructed | DEC-020 |
| CONF-23 | UXP alert "NDA expires in 2 days" vs no NDA expiry defined | UXP §2.5; P6 Amb.4 | Expiry not built or implied | DEC-017 |
| **CONF-24** | **AI approach:** MPS §8/§10.3/§31 rule-based, no NLP (MPS §27 NLP = Future Scope) vs audit-observed **Gemini LLM insight workflows** | MPS; AUD §4, §7 | Two-layer model (§11); guardrail AI-025; MPS stays the requirement | **DEC-042** |
| **CONF-25** | **Stack:** P0 prescribes PHP 8.3+/PostgreSQL vs audit PHP 8.2 / MySQL-oriented migrations | P0; AUD §2 | §5.1 uses audit evidence; production engine unverified | DEC-041 |
| **CONF-26** | Edition 1.0 proposed bearer tokens, but audit shows bearer extraction deliberately disabled and `RequireSpaSession` on state-changing routes | V1; AUD §8 | §5.3 re-states as options | DEC-003 |
| **CONF-27** | Audit says MDP/ILS "NOT AVAILABLE" and that its documentation conflicts (outdated `PROJECT_CONTEXT.md`); both documents exist in the ZIP | AUD §3; ZIP | NFR-S03/S04; historical docs not authoritative | DEP-002 |
| **CONF-28** | MPS §14.1 has no cancel state; P8 refers to cancelled/rejected/abandoned deals | MPS; P8 | DLR-013; REP-004 annotated | DEC-044 |
| **CONF-29** | Disclosure/NDA may precede the Connection (MPS §24, P6) vs linear Deal lifecycle with NDA after Deal Room Opened (P7) | MPS §24; P6; P7 | DLR-011/012; WF-013 | DEC-043 |
| **CONF-30** | Generic Deal entity (P7) vs milestone *funding* semantics defined for investor deals | P7; MPS §14 | DLR-014 | DEC-045 |
| **CONF-31** | MIL-007 "no payment" vs audit-observed **simulated** payment records | MPS §14.2, §20, §30; AUD §1 | MIL-007 clarified (simulated, no real value) | DEC-046 |
| **CONF-32** | *Edition 1.0 internal:* AUTH-001 ("role choice not irreversible") vs ROL-003 ("role not user-editable") | V1 | **Resolved** by multi-role (AUTH-001, ROL-003) | — |
| CONF-33 | Edition 2.0 called Release 1 the "Mobile MVP" while Option A omits MPS §25.1 Must-Haves | MPS §25; v2.0 §4.4; FRR F-06 | Renamed Mobile Release 1; explicit non-equivalence statement (§4.4); Appendix K.1 | DEC-034, DEC-054 |
| CONF-34 | Edition 2.0 graded rule-level rows `IMP` on domain-level audit evidence, contradicting NFR-E01 | v2.0 §1.4, §1.6; FRR F-03 | Strict IMP definition; regrade ledger (Appendix D.2) | — (documentation defect; resolved) |
| CONF-35 | Active v2.1 requirements instructed Laravel/Sanctum integration, contrary to approved G-00/G-01 | v2.1 SCP-003, ARC-002/006, API, ASM-002 | Corrected to independent Node.js + Express.js + fresh MySQL + REST + JWT family; legacy evidence retained and labelled | **Resolved by approved G-00/G-01/OD-07** |
| CONF-36 | v2.1 placed Admin in mobile/R3; OD-03 approves a separate Web Admin Dashboard with minimum necessary R1 functionality | v2.1 SCP-002-A, REL-003, SCR-030…034 | Corrected throughout; exact R1 inventory remains OD-10 PENDING | **Direction resolved; inventory open** |
| CONF-37 | Business Role invitation, Custom Role, multi-role merge, permission, delegation, history/audit and release details are undefined | Owner feature request | BRM requirements added with all detail choices gated | BR-DEC-001…012 PENDING |
| CONF-38 | Unified inbox categories, initiation, authorization details, history/retention, delivery, moderation and release scope are undefined | Owner feature request | UMSG requirements added; DEC-010 preserved | MSG-DEC-001…013 and DEC-010 PENDING |

---

## 21. Acceptance Criteria & Release Plan

> Acceptance criteria describe **observable outcomes for the mobile client and its integration**; they do not claim that any outcome has been achieved. They are not test code. All are **PROPOSED** and subject to approval of the underlying decisions.

### 21.1 Acceptance criteria

| ID | Criterion (Given / When / Then) | Requirements | Rel. |
|---|---|---|---|
| AC-001 | Given an account with two roles, when the user switches role, then the whole workspace (navigation, dashboard, data) changes to that role and no data from the previous role is visible; after app restart the **same active role** is restored and validated against the server's enrolled roles. | ROL-003, ROL-003-D, MOB-002/003, SEC-007 | R1 |
| AC-002 | Given a valid session and a transient network or `5xx` failure at launch, when the app restores the session, then a retry state is shown and the user is **not** logged out; given `401`/`419`, the user is routed to Login with drafts preserved. | AUTH-012, AUTH-012-D, MOB-010/053 | R1 |
| AC-003 | Given the approved authentication option, when a mobile client authenticates, then ARC-006-C1…C8 hold: throttling applies, logout invalidates server-side, bearer tokens remain disabled on web SPA routes, admin isolation is unchanged. | ARC-006, §5.3 | R1 / PA |
| AC-004 | Given a Tier 0 viewer, when they attempt a Stage 3+ action, then the server refuses and the app shows the verification-upgrade path; the app never sends a stage value. | ROL-005, VER-006, DIS-003 | R1 |
| AC-005 | Given one party has accepted the NDA, then the other sees "Waiting on [counterparty]"; when both have accepted, the relationship shows Stage 3 and the confirmation screen displays a timestamp; no copy claims legal enforceability. | DIS-005, DIS-007, SCP-013 | R1 |
| AC-006 | Given a pair with no Deal, then no Deal state progression is shown; given a Deal, the progression shows exactly the server's state with history; the ordering cases in DLR-011/012 behave as the approved DEC-043 outcome states. | DLR-001/002/011/012 | R1 |
| AC-007 | Given a milestone, when the Founder marks it complete, then it is **not** Completed until the counterparty confirms; the next milestone unlocks only after confirmation; a Disputed flag is visible to both. | MIL-002…004 | R1 |
| AC-008 | Every monetary figure (milestone, investment, commission, premium) displays "Simulated"; no screen collects card or bank credentials. *(Applies to every release in which such figures are shown; R2 figures follow when delivered.)* | SCP-010, PAY-004 | R1 |
| AC-009 | Match explanations shown on mobile originate from the server; no demo/locally-generated explanation data exists in the client. | AI-013, DSC-006, DEP-016 | R1 |
| AC-010 | When an AI insight is regenerated, the deterministic Readiness/Match scores are unchanged; when the provider returns `429` or is unavailable, a non-blocking message is shown and deterministic scores remain visible; no provider key exists in the app bundle. | AI-023, AI-025, AI-024 | R1 / PA |
| AC-011 | Every list is server-paginated with a capped page size and the client never assumes a full collection. | MOB-075, DSC-008, DEP-010 | R1 |
| AC-012 | Uploading a disallowed type is rejected by the server and reported clearly; uploads show progress, can be cancelled and retried manually; captured ID images are not retained in cache or gallery. | MOB-060…063 | R1 |
| AC-013 | A submitted financial report shows a platform-calculated net, a status no higher than Self-Reported/Evidence Submitted, and evidence presence separately; an investor flag moves the report to Under Review. | FIN-002, FIN-004, FIN-005, FIN-007 | R2 |
| AC-014 | A copy audit finds no prohibited claim (§13.5) in UI strings, notifications or store text. | SCP-012, TST-012 | R1 |
| AC-015 | Screen-reader, contrast, text-scaling and reduced-motion checks pass on all R1 screens. | MOB-091, TST-008 | R1 |
| AC-016 | No client calls simulated payment/commission APIs until PAY-007 is satisfied for the independent Node.js backend; all displayed amounts remain Simulated and no real funds move. | PAY-007 | PA |
| AC-017 | No credential, token, ID image or financial figure appears in logs, crash reports or analytics. | SEC-005, MOB-095 | R1 |
| AC-018 | No status in release documentation is described as "verified" unless backed by runtime evidence recorded under Appendix H. | NFR-E02, TST-014 | R1 |
| AC-019 | Before each release, every PENDING USER APPROVAL item allocated to it is resolved or explicitly deferred by the approvers. *(Repeated before R2 and R3 for the items allocated to them.)* | §19 | R1 |
| AC-020 | Given a visitor registering, when the Terms-of-Service/simulation acceptance is not ticked, then registration is refused (and the checkbox is unchecked by default); given a registered user whose email is unverified, then the app shows the unverified state, offers resend, never treats the user as verified, and completes verification per the approved DEC-052 path through a signed, server-validated link. | AUTH-001, AUTH-004, AUTH-016, SCP-011 | R1 |
| AC-021 | Given a password-reset request, then the response does not reveal whether the email exists; completion follows the approved DEC-052 path; an invalid or expired link shows a neutral failure message and offers a new request. | AUTH-006, AUTH-008, AUTH-017 | R1 |
| AC-022 | Given a profile form with invalid input (minimum > maximum amount, negative amount, missing required field), then the server's field-level errors are shown against the fields and nothing is saved; given another user's profile, then it is read-only and gated sections are shown as locked with the unlock condition. | PRO-002, PRO-004, PRO-005, PRO-007 | R1 |
| AC-023 | Given a Tier 0 user submitting ID and selfie/document images, then the request shows *pending*; when Admin requests more information, the reason is shown to the applicant; the app never states verification is KYC/AML; captured images are not left in cache or gallery (observable per MOB-063). | VER-002, VER-005, VER-006, MOB-061, MOB-063 | R1 |
| AC-024 | Given a Founder part-way through Business creation, when the app is backgrounded, restarted or the session expires, then on return the Founder resumes at the last server-saved state; the draft is visible only to the owner; publishing a not-ready Business is refused with the server's validation message. | BIZ-001, BIZ-002, BIZ-006, MOB-102 | R1 |
| AC-025 | Given a Founder who tags a document *Stage 3*, when a Stage 2 viewer opens the Business, then the document is listed as locked (name and tag only) with no download; given an upload of a disallowed type or size, then the server rejection is shown clearly. | BIZ-011, DIS-008, MOB-060 | R1 |
| AC-026 | Given filters applied in Discovery, then only published Businesses (or the role-appropriate profiles) matching them are listed; active filters are individually removable with a clear-all; the result count is visible; an empty result offers relaxed-filter suggestions; the state survives opening a result and returning; results are server-paginated with a capped page size. | DSC-001…003, DSC-005…011, MOB-075 | R1 |
| AC-027 | Given a Founder opening Readiness detail, then the server-supplied overall score, all eight factor scores, weak areas and improvement suggestions are shown, missing inputs are flagged *incomplete*, and the text breakdown accompanies any graphic; given a match result, then overall score, per-factor score and applied weight come from the server. | AI-001, AI-002, AI-005, AI-007, AI-010, AI-013 | R1 |
| AC-028 | Given one-sided interest, then a pending record is visible and no Connection exists; given mutual interest and no decline, then a Connection appears referencing the Match Score; given a Professional application, then the current status of *Applied · Under Review · Interview/Negotiation · Offer · Joined · Declined* is visible; given a Founder Decline, then progress is held per DIS-004. | CON-001…005, DIS-004 | R1 |
| AC-029 | Given a participant countering terms, then a new versioned entry is created and earlier entries remain; given Admin, then Admin cannot submit terms; given both parties confirming the same finalised terms, then the Agreement is read-only, shows both confirmation timestamps and is labelled "Recorded Agreement (Platform Simulation)". | NEG-001, NEG-005, AGR-001, SCP-013 | R1 |
| AC-030 | Given Deal participants, then messages are visible only to them; a non-participant receives no message data; message content is never scanned or contact details blocked; message history is server-paginated. | MSG-001, MSG-003, MSG-004, MOB-075 | R1 |
| AC-031 | Given an event for a participant, then it appears in the in-app notification centre with unread state; notification preferences are applied as the server holds them; no Admin notification inbox is offered until DEP-013 exists. | NTF-001, NTF-004, NTF-001-A | R1 |
| AC-032 | Given a *Completed* deal, then each eligible party may submit exactly one feedback for the other; a second submission and a self-review are refused by the server; reputation shows tier, trend, contributing factors and a paginated history; no copy implies guaranteed outcomes. | REP-001…005, REP-007 | R1 |
| AC-033 | Given the session policy approved under DEC-053, then lifetime/idle expiry routes the user to Login with drafts preserved, sensitive actions require re-authentication as approved, and "sign out everywhere"/revocation behaves as approved. *(Conditional on DEC-053.)* | AUTH-012-D, AUTH-018, AUTH-019 | PA |
| AC-034 | Given an active role, then the dashboard shows only that role's data and metrics whose definitions exist; a user with <20% profile completeness sees the onboarding checklist; metrics without a defined calculation are not shown (DSH-003). | DSH-001…005, SEC-007 | R1 |
| AC-035 | Given a feature allocated to the release, then an authorised user can reach it; a user with several roles can switch role without logging out; an interrupted workflow resumes at the last server-confirmed state; every state-changing action ends with a clear outcome message and is not auto-retried. | MOB-100…103, MOB-020 | R1 |
| AC-036 | Given a pending Business invitation, no protected Business access is available; after explicit acceptance only granted Business-scoped permissions become available, and access to unrelated Businesses remains unchanged. | BRM-001…006 | PA |
| AC-037 | Given an authorized Finance Manager in one Deal, negotiation communication and versioned proposal drafting within the grant succeed, while final Founder confirmation, permission escalation and unrelated Deal/resource access are denied. | BRM-007…010 | PA |
| AC-038 | Given a membership, permission or Deal-delegation revocation, every subsequent protected request, preview, search result, unread detail and notification is denied or safely redacted without affecting legitimate access to another Business. | BRM-012/013, UMSG-009 | PA |
| AC-039 | Given an authorized user opens Messages, only permitted All/Hiring/Deals/Team conversations, identities, previews and unread counts appear; search and notifications reveal no unauthorized or NDA-protected content. | UMSG-001…003, UMSG-008…010 | PA |
| AC-040 | Given Hiring Chat before acceptance, neither party gains Business membership, Team Chat, Deal Room, financial-report, document or NDA-protected access from the chat. | UMSG-004 | PA |
| AC-041 | Given a message containing agreement language, no NDA acceptance, Deal transition or final agreement occurs; only separate structured Founder and Investor confirmations can reach Agreement. | UMSG-007, BRM-009, AGR-001 | PA |
| AC-042 | Given an Admin account, it uses the separate Web Admin Dashboard; R1 supports Tier 1 verification review and the later confirmed OD-10 minimum without default private-message/NDA access or editing Founder financial records. | SCP-002-A, ROL-006/007, OD-03/10 | R1 / PA inventory |

### 21.2 Release plan — PROPOSED (REL-001…REL-004; PENDING USER APPROVAL under DEC-034)

> Release scope and naming remain PENDING under G-07 / DEC-034 and DEC-054. The table is a proposal, not approval. OD-03 independently requires minimum necessary separate Web Admin functionality in R1, including Tier 1 verification review; OD-10 must confirm the exact inventory. Business Role and Messaging allocations remain PA until BR-DEC-012 and MSG-DEC-013 are decided.

| Release | Entry gates (must be true before build planning for the release) | Exit criteria |
|---|---|---|
| **R1 — Mobile Release 1 (scope PENDING)** | G-03, G-05, G-07, G-10, G-02 evidence, G-08/G-09 as applicable; OD-08; new backend/API specification authorization and contract; minimum separate Web Admin inventory under OD-10. Legacy baseline/repository extraction gates no longer govern the new backend. | Existing R1 ACs for approved scope plus AC-042; no status upgrade without new-system evidence. |
| **R2 — Later release 2 (PROPOSED)** | Pending financial, investment, payment, notification and store decisions; new-backend dependencies. | Existing R2 acceptance criteria for included scope. |
| **R3 — Later release 3 (PROPOSED)** | Remaining Web Admin and later features subject to G-07/OD-10; no Admin mobile client. | Acceptance criteria authored when inventory is approved. |
| **PA — Business Roles and Messaging** | BR-DEC-001…012, MSG-DEC-001…013 and DEC-010 as applicable; DEP-019…022. | AC-036…AC-041; TST-015…019 after authorization. |


---

# APPENDICES

## Appendix A — Glossary & Abbreviations

| Term | Meaning |
|---|---|
| **AUD** | Phase 1 Audit Report (static, read-only). |
| **IMP / PAR / MIS / UNV / NEW / N/A** | Status codes (§1.4): Implemented (the audit names the specific capability; static) / Partial / Missing / Unverified / New Mobile Requirement / Not applicable. |
| **R1 / R2 / R3 / PA / N/A** | Proposed release tiers, PENDING USER APPROVAL and not-scheduled (§1.4, §4.4). |
| **Static audit** | Review of source and configuration without running the application, migrations, tests, a browser, query profiling or load tests. |
| **Dirty working tree** | Uncommitted modified/untracked files present at audit time (payment, platform revenue, admin investment oversight, tests). |
| **MPS / ILS / UXP / MDP / P0–P9** | Source documents (§2.1). |
| **Micro Investment** | Profit/Loss Sharing mode; typically no ownership (MPS §15). |
| **Large/Standard Investment** | Equity/Ownership mode (MPS §15). |
| **Tier 0 / 1 / 2** | Unverified / Identity Verified / Track-Record Verified (MPS §11). |
| **Stage 1–4** | Teaser / Extended / NDA / Full Proposal disclosure stages (MPS §13). |
| **Sanctum** | Laravel authentication package observed only in the legacy audit; not part of the approved new architecture. |
| **Business Role** | A role scoped to one Business membership (Finance Manager, Business Manager, Project Manager or restricted Custom Role); never a global account role. |
| **Unified Messages** | Authorized inbox covering All, Hiring, Deals and Team conversations with current-state server authorization. |
| **Legacy Audit Reference** | Historical Laravel evidence retained for traceability; not implementation evidence for the new Node.js system. |
| **`RequireSpaSession`** | Middleware on state-changing SPA routes (AUD §8); behaviour toward native clients unverified. |
| **BDT (৳)** | Bangladeshi Taka; South Asian digit grouping. |
| **Simulated** | Not a real money movement or legal transaction (MPS §30). |
| **Mobile Release 1 (R1)** | Proposed first mobile release; **not** the MPS MVP (§4.4, DEC-054). |
| **MPS MVP** | The complete MPS §25.1 Must-Have list (21 items); mobile equivalence only when all 21 are delivered (Appendix K.1). |
| **Expo** | React Native tooling/platform the owner intends to use (ARC-022); workflow and capabilities subject to DEC-022. |
| **FEAT-nnn** | Feature functional specification in Appendix J (v2.1). |
| **Nonbinding Legacy Design Reference** | Visual-design content from legacy sources kept for traceability only (Appendix M). |
| **PENDING USER APPROVAL** | Decision not yet approved; no option is selected by this document (§19). |
| **FRR / F-nn** | Final Independent Review Report and its findings F-01…F-24 (Appendix L). |

---

## Appendix B — Audit Evidence Register

> **LEGACY AUDIT REFERENCE — NOT THE CURRENT APPROVED ARCHITECTURE.** Every entry is an observation about the old Laravel platform from the static Phase 1 Audit Report. It remains historically accurate but supplies no implementation or test evidence for the independent Node.js + Express.js system.

### B.1 Observations

| ID | Observation | AUD § | Used in |
|---|---|---|---|
| E-01 | Overall assessment: **PARTIAL / not production-ready**. | 1 | §1.6, §7 |
| E-02 | Branch `feature/simulated-payments-commission`; working tree dirty (deal payments, platform revenue, admin investment oversight, tests). | 1, 2 | PAY, NFR-E03 |
| E-03 | Laravel 12 / PHP 8.2; Sanctum first-party cookie auth; Form Requests, controllers, services, policies, resources, enums, Eloquent; transactions and row locks; DB-backed cache locks for AI; MySQL-oriented migrations. | 2 | §5.1 |
| E-04 | React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router, shared API client with standardised error handling. | 2 | §5.1, ARC-005 |
| E-05 | Schema domains: users, sessions, roles, admin access; Founder/Investor/Professional profiles; businesses, requirements, skills, documents; readiness inputs, assessments, AI insights; verification; matching insights; disclosure relationships, NDAs; interests, connections, deals, negotiations, agreements; milestones, feedback, **messages**, payments; financial reports, evidence, discrepancies, audit records; notifications, deal insights, admin insights. | 2 | §7 |
| E-06 | Documentation: Master Project Specification, UI/UX PRD, Roadmap, Context (outdated), Implementation Log, Phase 5–9 prompt notes (partial), backend docs, AI Phase 6 audit available; Master Development Prompt, Investment Logic Spec, SRS "not available" to the audit; roadmap/context/log contradict current code. | 3 | CONF-27, NFR-S03 |
| E-07 | Authentication COMPLETE in code / not runtime verified (registration, login, logout, reset, email verification, password change, throttling). | 4 | AUTH-* |
| E-08 | Multi-role participant accounts COMPLETE in code (role enrollment/removal, role profiles). | 4 | ROL-003 |
| E-09 | Admin isolation COMPLETE in code (separate middleware, frontend guard). | 4 | ROL-002 |
| E-10 | Founder business management COMPLETE in code (draft, update, requirements, submit, approve/reject, publish, photos, documents). | 4 | BIZ-* |
| E-11 | Investor preferences, Professional profiles COMPLETE in code. | 4 | PRO-* |
| E-12 | Matching engine COMPLETE backend / PARTIAL frontend (demo explainability in one discovery UI). | 4, 5 | AI-013, DSC-006 |
| E-13 | Investor readiness COMPLETE in code (versioned inputs, deterministic scoring, assessments, insight APIs). | 4 | AI-001…006 |
| E-14 | Business AI analysis COMPLETE foundation / NOT OPERATIONALLY VERIFIED (Gemini adapter, validation, rate limit, versioning, error mapping). | 4, 7 | §11.3 |
| E-15 | Verification tiers COMPLETE in code (phone foundation, evidence, admin review, tier gates, audit logs). | 4 | VER-* |
| E-16 | Staged disclosure COMPLETE in code; NDA COMPLETE in code (request/accept/decline; deal lifecycle synchronisation). | 4 | DIS-* |
| E-17 | Connections and applications PARTIAL. | 4 | CON-* |
| E-18 | Deal room COMPLETE core / PARTIAL polish (deals, stages, negotiation, agreements, messages, insights, participant authorisation). | 4 | DLR-*, MSG-* |
| E-19 | Investment simulation PARTIAL (milestones and simulated payment work; payment branch uncommitted). | 4 | MIL-007, PAY-* |
| E-20 | Financial transparency COMPLETE core / NOT RUNTIME VERIFIED (reports, evidence, discrepancies, audit logs, participant and admin views). | 4 | FIN-* |
| E-21 | Reputation and feedback COMPLETE core. | 4 | REP-* |
| E-22 | Notifications PARTIAL (participant notifications/preferences exist; admin inbox does not). | 4, 5 | NTF-* |
| E-23 | Premium PARTIAL / primarily UI; authoritative billing/subscription enforcement not found. | 4, 9 | PRM-* |
| E-24 | Admin user directory COMPLETE core (paginated); business/verification governance COMPLETE core. | 4 | ADM-* |
| E-25 | **MISSING:** admin teams and staff RBAC; admin matching controls; notification-template administration; predictive analytics (by design); admin notification inbox. | 4, 5 | ADM-015, NTF-001 |
| E-26 | Payment and platform commission PARTIAL / NOT VERIFIED (dirty working tree only). | 4, 6 | PAY-* |
| E-27 | Business ownership and deal participation resolved server-side; important mutations use transactions and `lockForUpdate()`; admin routes require Sanctum + admin middleware; state-changing SPA routes use `RequireSpaSession`; auth/recovery/verification/phone verification throttled; documents via dedicated storage services; business PDFs validated for extension, MIME and size. | 6 | ARC-003, SEC-* |
| E-28 | AI outputs use schemas, parsing, fingerprints, immutable versions and concurrency locks. | 6, 7 | AI-021 |
| E-29 | Gemini adapter safeguards: key from environment, redirects disabled, bounded timeouts, response size and JSON depth constrained, generic error codes, no raw exceptions retained. Weaknesses: single provider, no fallback, 429 without backoff, generic failures, no cost telemetry, model/endpoint compatibility unverified. | 7 | AI-020…029 |
| E-30 | Security: `.env` not tracked, `.env.example` tracked, no hard-coded key, bearer extraction disabled, login throttling, signed verification routes, document policies/audit-log models; no critical source vulnerability identified statically. | 8 | §13.4 |
| E-31 | Load-test preparation guidance (isolated environment, synthetic data, scenarios, metrics, concurrency tests, thresholds first). | 10 | §15.3 |
| E-32 | Mobile readiness: **NOT READY for full mobile implementation**, but suitable for API-contract preparation; recommended nine phases. | 11 | §4.4, §17 |
| E-33 | No runtime verification, browser audit, query profiling, migration execution, load benchmark; automated suites not rerun; no files changed. | 1, 11 | SG-08, NFR-E02 |

### B.2 Audit-observed defects and constraints (AUD-D)

| ID | Defect / constraint | Audit severity | AUD § | Mobile handling in this edition | Dependency |
|---|---|---|---|---|---|
| AUD-D01 | Active workspace not persisted authoritatively; refresh selects the first returned role. | Medium | 5 | ROL-003-D, MOB-003, AC-001 | DEP-017 / DEC-047 |
| AUD-D02 | Session restoration collapses all errors into logout. | Medium | 5 | AUTH-012-D, MOB-010, AC-002 | DEP-011 |
| AUD-D03 | Demo explainability (`buildDemoMatchData`) in discovery. | High | 5 | DSC-006, AI-013, AC-009 | DEP-016 |
| AUD-D04 | Unpaginated histories/collections (AI insight histories, report access logs, some admin paths). | Medium | 6 | MOB-075, DSC-008, AC-011 | DEP-010 |
| AUD-D05 | AI cost controls inconsistent: only business analysis has a founder/hour limit; no per-user/global quota, budget, usage metrics or circuit breaker for matching, deal, admin AI. | High | 6 | AI-022, AI-029 | DEP-014 |
| AUD-D06 | Single AI provider; no fallback; 429 without backoff; generic failure collapse; no token accounting. | (Weaknesses) | 7 | AI-023, API-010 | DEP-014 |
| AUD-D07 | Admin insight snapshot issues many separate aggregate queries (one per deal stage). | Medium | 6 | LOAD-007 | — (P2 backlog) |
| AUD-D08 | Uncommitted payment/commission branch; correctness and deployability not established. | P0 | 1, 6, 9 | PAY-007, DEC-046 | DEP-001 |
| AUD-D09 | Settings contains "Coming soon" controls; unfinished admin navigation. | Medium | 5 | SCR-028 | — |
| AUD-D10 | Verification evidence validation could be stronger (explicit MIME allow-list, decoding, malware scanning, quarantine); public link fields validated only as bounded strings. | Medium | 8 | SEC-010, SEC-011 | DEP-012 |
| AUD-D11 | Outdated/contradictory documentation (`PROJECT_CONTEXT.md`, implementation log, roadmap). | — | 3 | NFR-S03, CONF-27 | DEP-002 |
| AUD-D12 | Accessibility not audited. | — | 5 | MOB-091, TST-008 | — |
| AUD-D13 | Production headers, cookie behaviour behind HTTPS, proxy trust, CSP, TLS, storage ACLs not verified. | — | 8 | SEC-013 | DEP-018 |

---

## Appendix C — Preservation Ledger (MPS v1.1 → this document)

> **No MPS Must-Have item is deleted** (item-level proof: Appendix K). "Preserved" = carried over with unchanged business meaning. "Adapted" = presentation/interaction adapted for mobile, business logic unchanged. "Release-deferred" = allocated to a later release (timing only). All MPS Must-Have items remain requirements. *(Narrowed in v2.1, review finding F-08: the claim is demonstrated in Appendix K, not asserted.)*

| MPS § | Title | Disposition | v2 location (IDs) |
|---|---|---|---|
| 1 | Executive Summary | Preserved | §3.1, OBJ-001…008 |
| 2 | Project Vision | Preserved | §3.1 |
| 3 | Problem Statement | Preserved (context only; no requirement rows) | §3.1 |
| 4 | Proposed Solution | Preserved | §3.1, WF-002…004, BIZ-012 |
| 5 | Target Users (5.1 Founder, 5.2 Investor, 5.3 Professional) | Preserved | §6.1, PRO-001…009, CONF-04 |
| 6 | Core Value Proposition | Preserved | §3.1 |
| 7 | Functional Requirements (18 items) | Preserved | §8 (AUTH, PRO, VER, BIZ, DSC, DIS, CON, DLR, INV, FIN, REP, PRM, ADM, NTF, DSH) |
| 8 | AI System Specification | Preserved; **audit-observed LLM layer added and flagged** | §11, CONF-24, DEC-042 |
| 9 | Matching Engine Specification | Preserved | AI-010…014 |
| 10 | Investor Readiness Score Specification | Preserved | AI-001…007 |
| 11 | Verification & Trust Specification | Preserved | VER-001…008, AUTH-004/005 |
| 12 | Security & Confidentiality Specification | Preserved; mobile-adapted | ROL-001, §13, SEC-001…015 |
| 13 | Staged Disclosure & NDA | Preserved | DIS-001…016, WF-005 |
| 14 | Deal Room & Deal Lifecycle (14.1 lifecycle, 14.2 milestones) | Preserved; functional access on mobile (arrangement is a design decision); edge cases surfaced | DLR-001…014, NEG, AGR, MIL, WF-006/007/013 |
| 15 | Investment Model & Financial Transparency | Preserved; release-deferred (R2) | INV-001…011, FIN-001…012, PTF-001…003, WF-008 |
| 16 | Off-Platform Deal Risk & Retention Strategy | Preserved (nudge only; no scanning) | DIS-015, MSG-003, §4.5 |
| 17 | Reputation System | Preserved | REP-001…009, WF-010 |
| 18 | Premium System | Preserved; release-deferred (R2) | PRM-001…008 |
| 19 | Admin System | Preserved; mobile scope PENDING USER APPROVAL | ADM-001…018, WF-011 |
| 20 | Business Model (commission 3–5%) | Preserved; release-deferred (R2) | PAY-001…009, WF-012 |
| 21 | System Workflow (High-Level) | Preserved | §9 |
| 22 | High-Level Architecture | Preserved (no stack prescribed); audit stack recorded | §5.1, ARC-* |
| 23 | Conceptual Data Model | Preserved (data entities referenced; no schema authored) | MIL-002, FIN-*, §7.1 |
| 24 | Business Rules (Core Logic) | Preserved | DIS, DLR, INV, FIN, REP, PRM, AI rows citing MPS §24 |
| 25 | MVP Scope (25.1 Must-Have, 25.2 Should-Have) | Preserved; allocated across releases (timing only) | §4.1, §4.4, Appendix F |
| 26 | Should-Have Scope | Preserved | SCP-004 |
| 27 | Future Scope | Preserved | §4.2, AI-040 |
| 28 | Non-Functional Requirements | Preserved; mobile additions PROPOSED | §15.1 |
| 29 | Security & Privacy Considerations | Preserved | §13, PRV-001…005 |
| 30 | Legal & Compliance Boundaries | Preserved | §4.3, SCP-010…014, §13.5 |
| 31 | Known Limitations | Preserved | AI-003, AI-015, FIN-011 |
| 32 | Success Metrics | Preserved; mobile additions PROPOSED | §3.3 |
| 33 | Final End-to-End Workflow | Preserved | WF-002…004, WF-008, WF-012 |

**Adaptations recorded (v2.1):** (1) Deal Room functions remain reachable on mobile (DLR-004) — arrangement is a design decision; (2) Admin data remains fully accessible per entity on a small screen (ADM-017); (3) navigation is specified functionally only (MOB-100…104); (4) push notifications added (NTF-003); (5) dashboards must provide the same information for the active role (DSH-001) — arrangement is a design decision. Visual adaptations proposed in v2.0 (tab bars, stacked card rows, single-column layout) are now **nonbinding legacy references** (Appendix M). **No business logic changed.**

---

## Appendix D — Status & Wording Change Ledgers

### D.1 v1.0 → v2.0 status change ledger

> Edition 1.0 codes: `EX*` claimed-existing, `PT*` claimed-partial, `GAP`, `SPEC`, `DEF`, `NEW`. Edition 2.0 reclassifies every row on audit evidence. Only **material** changes are itemised; rows that moved solely from `EX*`/`PT*` (prompt claim) to `UNV` because the audit is silent are grouped.

| Area / IDs | v1.0 | v2.0 | Audit basis |
|---|---|---|---|
| Multi-role (ROL-003, AUTH-001) | `PT*`, single-role baseline | **IMP** (+ defect ROL-003-D `PAR`) | E-08, AUD-D01 |
| Financial reporting (FIN-001, FIN-003) | `GAP` | **IMP** (core, not runtime verified) | E-20 |
| FIN-007 discrepancy flag | `GAP` | **PAR** | E-20 |
| Other FIN-002, 004–006, 008–012 | `GAP`/`TBD` | **UNV** (audit silent on rules) | SG-09 |
| Investment Type & return model (INV-*, BIZ-004, NEG-002…004, DSC-004, PRO-003) | `GAP` | **UNV** | SG-09 |
| Commission/payment (WF-012; PAY-*) | `GAP` | **PAR** (uncommitted) | E-02, E-26 |
| MIL-007 | `EX*` | **PAR**; wording clarified | E-19 |
| Notifications (NTF-001, NTF-004) | `GAP`/`NEW` | **PAR**; Admin inbox **MIS** | E-22, E-25 |
| NTF-002, NTF-005 | `GAP`/`DEF` | **UNV** | — |
| Chat (MSG-001, MSG-004) | `GAP` | **IMP** (existence; model open) | E-18 |
| Premium (PRM-001…006) | `GAP` | **PAR** | E-23 |
| PRM-007/008 | `TBD`/`GAP` | **UNV**, PA | E-23 |
| Admin: directory, verification, governance (ADM-003/004/005) | `SPEC`/`EX*` | **PAR/IMP** | E-24 |
| Admin: ADM-001/007/008/009/010/013/014 | `SPEC` | **PAR** | E-24, E-02 |
| ADM-015 settings (teams/RBAC/templates/matching admin) | `SPEC` | **MIS** | E-25 |
| ADM-016 admin security | `SPEC` | **IMP** | E-27 |
| ADM-002, 006, 011, 012, 018 | `SPEC` | **UNV** | — |
| NDA decline (DIS-006) | undefined | **PAR** (decline observed; withdrawal/expiry `UNV`) | E-16 |
| BIZ-006 publish | `PT*` | **PAR** (submit/approve/reject observed; moderation rule unstated) | E-10 |
| Matching (AI-013, DSC-006) | `EX*` | **PAR** (demo explainability) | E-12 |
| Readiness (AI-001, AI-006) | `EX*` unverifiable | **IMP** | E-13 |
| Gemini AI insights (AI-020…029) | absent | **IMP** foundation; operation `UNV`; PA | E-14, E-29 |
| ARC-006 native auth | `GAP` | **MIS** | E-03, E-27 |
| ARC-003, ARC-005, ARC-013 | `EX*` | **IMP** | E-04, E-27 |
| Connections (CON-001…003) | `EX*` | **PAR** | E-17 |
| Pagination (DSC-008) | `EX*` | **PAR** | AUD-D04 |
| All remaining `EX*`/`PT*` rows where audit is silent (e.g., DIS-009/010/012/015/016, DLR-003/006/009, NEG-006, DSC-002…012, PRO-005…008, VER-005/006/007, SCP-010…013, ARC-007/008/011) | `EX*`/`PT*` | **UNV** | NFR-E01 |
| Rows with audit confirmation of the domain (AUTH-001/003/004/006/007, PRO-001/002/004/010, VER-001…003, BIZ-001/005/007/009/010/011, DIS-001…003/005/008/011, DLR-001/002/005/007, NEG-001/005, AGR-001, MIL-001…003, REP-001/002/004) | `EX*` | **IMP** (static) | E-07…E-21, E-27 |
| `DEF` (PRO-009, DSC-013…015, DLR-010, PTF-*, NTF-005, REP-009, ADM-011) | `DEF` | Status per audit (`UNV`), release **R2/R3** | §4.4 |
| DEC-001 | open | **Closed** | AUD supplied |

### D.2 v2.0 → v2.1 change ledger (review finding F-11)

> Rule (NFR-E06): every wording, status, release or priority change to an existing requirement appears here. Extensions of business rules are "proposed clarification — pending approval". This ledger is generated from the edit log of this edition.

**D.2.1 Status changes (50)**

| ID | v2.0 | v2.1 | Reason |
|---|---|---|---|
| DIS-003 | IMP | UNV | F-03: no audit citation exists for the 2→3 / 3→4 transition rules (review F-03) |
| DLR-005 | IMP | UNV | F-03: AUD does not state that Deal Room documents are a view over the stage-gated set |
| MIL-002 | IMP | PAR | F-03: AUD §4 lists milestones but not the four statuses |
| MIL-003 | IMP | PAR | F-03: AUD §10 cites milestone confirmation only as a concurrency-test scenario; the two-step rule is not evidenced |
| NEG-001 | IMP | PAR | F-03: AUD lists negotiations; versioned-row-per-counter is not evidenced |
| DLR-001 | IMP | PAR | F-03: AUD lists deals and stages; the exact eight-state lifecycle is not evidenced |
| REP-004 | IMP | PAR | F-03: AUD says feedback/reputation services exist; eligibility rules are not evidenced |
| ADM-016 | IMP | PAR | F-03: AUD states only Sanctum + admin middleware and the absence of staff-tier RBAC; "no super admin / no escalation workflow / IDOR protection" is not evidenced |
| PRO-001 | IMP | PAR | F-03: structured prior-experience entries are not mentioned by AUD |
| ARC-003 | IMP | PAR | F-03: domain-level evidence only |
| ARC-005 | IMP | PAR | F-03: domain-level evidence only |
| ROL-001 | IMP | PAR | F-03: domain-level evidence only |
| ROL-002 | IMP | PAR | F-03: domain-level evidence only |
| ROL-003 | IMP | PAR | F-03: domain-level evidence only |
| ROL-005 | IMP | PAR | F-03: domain-level evidence only |
| AUTH-001 | IMP | PAR | F-03: domain-level evidence only |
| AUTH-004 | IMP | PAR | F-03: domain-level evidence only |
| AUTH-007 | IMP | PAR | F-03: domain-level evidence only |
| PRO-002 | IMP | PAR | F-03: domain-level evidence only |
| PRO-004 | IMP | PAR | F-03: domain-level evidence only |
| PRO-010 | IMP | PAR | F-03: domain-level evidence only |
| VER-002 | IMP | PAR | F-03: domain-level evidence only |
| VER-003 | IMP | PAR | F-03: domain-level evidence only |
| BIZ-001 | IMP | PAR | F-03: domain-level evidence only |
| BIZ-007 | IMP | PAR | F-03: domain-level evidence only |
| BIZ-009 | IMP | PAR | F-03: domain-level evidence only |
| BIZ-011 | IMP | PAR | F-03: domain-level evidence only |
| DIS-002 | IMP | PAR | F-03: domain-level evidence only |
| DIS-005 | IMP | PAR | F-03: domain-level evidence only |
| DIS-008 | IMP | PAR | F-03: domain-level evidence only |
| DIS-011 | IMP | PAR | F-03: domain-level evidence only |
| DLR-002 | IMP | PAR | F-03: domain-level evidence only |
| NEG-005 | IMP | PAR | F-03: domain-level evidence only |
| AGR-001 | IMP | PAR | F-03: domain-level evidence only |
| MIL-001 | IMP | PAR | F-03: domain-level evidence only |
| FIN-001 | IMP | PAR | F-03: domain-level evidence only |
| REP-001 | IMP | PAR | F-03: domain-level evidence only |
| REP-002 | IMP | PAR | F-03: domain-level evidence only |
| ADM-004 | IMP | PAR | F-03: domain-level evidence only |
| AI-001 | IMP | PAR | F-03: domain-level evidence only |
| AI-010 | IMP | PAR | F-03: domain-level evidence only |
| AI-014 | IMP | PAR | F-03: domain-level evidence only |
| SEC-002 | IMP | PAR | F-03: domain-level evidence only |
| SEC-003 | IMP | PAR | F-03: domain-level evidence only |
| PRV-002 | IMP | PAR | F-03: domain-level evidence only |
| SCP-014 | — | N/A | F-12: legal/future-scope statement; not a platform capability |
| INV-011 | — | N/A | F-12: legal/future-scope statement; not a platform capability |
| AI-040 | — | N/A | F-12: legal/future-scope statement; not a platform capability |
| ARC-008 | UNV | N/A | User brief §2 / F-21: visual styling made nonbinding |
| MOB-092 | NEW | N/A | User brief §2 / F-21 |

**D.2.2 Release changes (16)**

| ID | v2.0 | v2.1 | Reason |
|---|---|---|---|
| SCP-014 | — | N/A | F-12: legal/future-scope statement; not a platform capability |
| INV-011 | — | N/A | F-12: legal/future-scope statement; not a platform capability |
| AI-040 | — | N/A | F-12: legal/future-scope statement; not a platform capability |
| AI-027 | — | N/A | F-12: verification statement, not scheduled work |
| NFR-004 | — | N/A | F-12: non-binding architectural intent |
| LOAD-008 | — | N/A | F-12 |
| SCP-002 | R1 / PA (Admin) | R1 | F-12: participant roles R1; Admin split to SCP-002-A (aligned with REL-003) |
| SCP-004 | R2 / R3 | PA | F-12: which Should-Have items enter any release is decided by DEC-018; per-item proposals are in Appendix K.3 |
| ADM-001 | R3 / PA | R3 | F-12: subject to DEC-004 |
| BIZ-003 | R1 / R2 | R1 | F-12 split: R1 part |
| BIZ-008 | R1 / R2 | R1 | F-12 split + visual neutralisation |
| DLR-006 | R1 / R2 | R1 | F-12 split |
| NTF-001 | R1 (participants) / PA (Admin) | R1 | F-12: participants R1; Admin split to NTF-001-A |
| DSH-002 | R1 / R2 | R1 | F-12 split |
| PAY-009 | R1 / R2 | R2 | F-02/F-12: R1 does not depend on payment records; see MIL-007 |
| MOB-092 | R1 | N/A | User brief §2 / F-21 |

**D.2.3 Priority changes (10)** — AI-020…AI-029 priorities now marked "(proposed)" (review finding F-15).

**D.2.4 Wording changes to existing requirement rows (52 rows)**

| ID | Nature of change |
|---|---|
| BIZ-003 | F-12 split: R1 part |
| BIZ-008 | F-12 split + visual neutralisation |
| DLR-006 | F-12 split |
| DSH-002 | F-12 split |
| MIL-007 | wording corrected |
| ARC-008 | User brief §2 / F-21: visual styling made nonbinding |
| AUTH-001 | visual neutralisation (role cards) |
| PRO-008 | visual neutralisation (gold shield) |
| PRO-009 | visual neutralisation (founder-card preview) |
| VER-007 | visual neutralisation (icons/gold/tint) |
| VER-008 | visual neutralisation (status chip) |
| BIZ-007 | visual neutralisation (chip) |
| BIZ-009 | visual neutralisation (locked cards/badge) |
| DSC-004 | visual neutralisation (badge) |
| DSC-006 | visual neutralisation (cards/chip/badge) |
| DSC-007 | visual neutralisation (chips) |
| DSC-008 | visual neutralisation (no infinite scroll) |
| DSC-012 | visual neutralisation (badge) |
| DSC-014 | visual neutralisation (card shortcut) |
| DIS-008 | visual neutralisation (locked row style) |
| DIS-010 | visual neutralisation (4-segment indicator) |
| DIS-015 | visual neutralisation (banner/modal) |
| DIS-016 | visual neutralisation (animation) |
| CON-002 | visual neutralisation (tabs) |
| CON-003 | visual neutralisation (status stepper) |
| DLR-003 | visual neutralisation (stepper/badge) |
| DLR-004 | visual neutralisation (tab bar/three-pane) |
| DLR-005 | visual neutralisation (tab) |
| DLR-009 | visual neutralisation (dedicated screen not modal) |
| NEG-001 | visual neutralisation (comparison table row) |
| NEG-003 | visual neutralisation (segmented control) |
| MIL-010 | visual neutralisation (timeline/dots) |
| INV-005 | visual neutralisation (layout) |
| INV-008 | visual neutralisation (inline alert) |
| INV-009 | visual neutralisation (card/badge) |
| FIN-010 | visual neutralisation (palette/gauge/animation) |
| PTF-002 | visual neutralisation (stacked rows/chart) |
| ADM-017 | visual neutralisation (stacked card rows) |
| DSH-001 | visual neutralisation (single column/Quick Info) |
| DSH-004 | visual neutralisation (skeletons) |
| DSH-005 | visual neutralisation (mini-stepper) |
| AI-007 | visual neutralisation (gauge/animation) |
| MOB-001 | visual neutralisation (bottom tab bar/drawer/cards) |
| MOB-091 | visual neutralisation (themes/contrast ratios) |
| MOB-092 | User brief §2 / F-21 |
| MOB-093 | visual neutralisation (no uncontained horizontal scroll) |
| PERF-002 | F-20 / visual neutralisation (skeleton) |
| PERF-001 | F-20 |
| PERF-003 | F-20 |
| AI-015 | F-22 observable condition |
| MOB-063 | F-22 observable condition |
| ARC-001 | F-07: Expo/TypeScript intended environment recorded |

**D.2.5 Clarifications to preserved requirements not caught by the row ledger (review finding F-11)**

| ID | Change | Classification |
|---|---|---|
| DIS-014 | Extended "no AI output may influence disclosure" to include **LLM-generated insights** (already in v2.0; now logged). | **Proposed clarification — pending approval** (extension of a business rule consistent with MPS §8/§24) |
| ARC-005 | Wording refers to the web client's standardised error handling; the mobile client must implement the platform's error shape (extract — DEP-006). | Clarification (status regraded PAR) |
| ARC-012 | Replacement wording: mobile client consumes AI insights only through the platform API (no direct provider calls). | Clarification |
| §1.2, App. C | Preservation claims narrowed (F-08). | Documentation correction |

**D.2.6 New requirement/decision/conflict IDs added in v2.1 (18)**

AUTH-016, AUTH-017, AUTH-018, AUTH-019, AUTH-020, BIZ-003-B, BIZ-008-B, CONF-33, CONF-34, DLR-006-B, DSH-002-B, MOB-100, MOB-101, MOB-102, MOB-103, MOB-104, NTF-001-A, SCP-002-A, DEC-052, DEC-053, DEC-054, DEC-055, FEAT-001…FEAT-033, AC-020…AC-035, ARC-022…ARC-027, H-21…H-23, CONF-33, CONF-34.

**D.2.7 Visual-prescription rows neutralised** — see Appendix M for the original references: ARC-008, MOB-092 (replaced); AUTH-001, PRO-008, PRO-009, VER-007, VER-008, BIZ-007…009, DSC-004/006/007/008/012/014, DIS-008/010/015/016, CON-002/003, DLR-003/004/005/009, NEG-001/003, MIL-010, INV-005/008/009, FIN-010, PTF-002, ADM-017, DSH-001/004/005, AI-007, MOB-001/091/093, PERF-002, §18.

### D.3 Edition 2.1 → internal Edition 2.2 reconciliation ledger

| Classification | IDs / areas | Change |
|---|---|---|
| Necessary architecture correction | Document control; OBJ-003; SCP-002/A/003; ARC-001…006/020/022/024; API-002/003/013; ASM-002; §5, §14, §17, §19, §21 | Active target corrected to React Native + Expo + TypeScript, independent Node.js + Express.js, fresh MySQL, REST, JWT family and separate Web Admin. Legacy Laravel evidence preserved and labelled. |
| Necessary new-feature requirement | BRM-001…015; UMSG-001…013; WF-014…017; SCR-035…039; FEAT-034/035 | Business membership/roles/permissions and Unified Messaging integrated. |
| Necessary cross-reference/dependency update | SEC-016…018; PRV-002/006; API-014…016; TST-015…019; DEP-019…022; AC-036…042; CONF-35…38 | Security, API, testing, release, conflicts and acceptance coverage added. |
| Necessary governance/revision update | §19.0; §21.2; Appendices A/B/D/I/J/K/N | Revision 6 decision status and traceability applied; no new approval invented. |

No original requirement ID was deleted. Existing rows changed above were necessary to remove active architectural contradictions or apply approved OD-03; their old meanings remain traceable through the prior edition and this ledger.

### D.3.1 Final targeted consistency audit corrections

| Corrected item | Material correction |
|---|---|
| DLR-007 | Added expressly Founder-authorized, Business/Deal-specific Finance Manager access; retained disclosure/NDA/tier/Business isolation and removed default Admin confidential access. |
| NEG-005 | Added delegated versioned draft/counter-proposals; prohibited Finance Manager/Admin finalization; preserved Founder-only and independent Investor final confirmations. |
| ADM-004 | Moved essential Tier 1 review to R1 in the separate Web Admin; kept OD-10 PENDING for exact inventory. |
| PAY-007 and coupled MIL-007, API-009, TST-002, DEP-001, sequencing/acceptance/appendix references | Removed active dependency on legacy branch merge/tests; substituted independent Node.js backend specification, implementation and verification dependencies; retained legacy facts as historical evidence. |
| ARC-025 | Replaced Laravel push-backend dependency with the independent Node.js + Express.js backend and kept provider/delivery/release choices pending. |
| G-01 / DEC-046 status references | Corrected old PENDING branch-disposition wording to the authoritative APPROVED read-only-legacy decision without adding any approval. |

Classification: necessary architecture correction, authorization correction, release-consistency correction and governance/change-history update only. No unrelated functionality was rewritten.

---

---

## Appendix E — Correction Log (Edition 2.0 review findings R-01 … R-24 → Resolution)

> **Count note.** The request refers to 23 findings (R-01 … R-23). The review report itemised **R-01 … R-24** (24 findings). **All 24 are addressed below**; none is omitted.

| Finding | Severity (review) | Type | Resolution in Edition 2.0 | Location | Remaining |
|---|---|---|---|---|---|
| **R-01** Attachment truncated (§§10–21, appendices missing) | Critical | Clarify | **Complete document regenerated:** Sections 1–21 and Appendices A–I in one file. V1 text of §§10–21 could not be diffed (SG-10); reconstructed from sources. | Whole file | Owner to confirm nothing from V1 §§10–21 beyond the source set is expected |
| **R-02** §7 baseline contradicts audit | Critical | Confirmed | §7 rebuilt on audit evidence with IMP/PAR/MIS/UNV/NEW; all statuses re-tagged; evidence register and change ledger added. No runtime claims. | §1.4, §7, App. B, D | Runtime verification (App. H) |
| **R-03** Single-role vs multi-role | Critical | Confirmed | ROL-003 corrected: multi-role **IMP**; role switcher and validation; active-role defect documented (AUD-D01) with ROL-003-D, MOB-003, AC-001. | §6.2, §12, §21 | DEC-005 (scope), DEC-047 (persistence) |
| **R-04** Stack (PHP 8.2 / MySQL vs P0) | High | Confirmed | §5.1 states audit-observed stack; PostgreSQL not assumed; DB-independence ARC-021; production engine flagged unverified. | §5.1, CONF-25 | DEC-041 |
| **R-05** AI deterministic vs Gemini | High | Confirmed; decision | Two-layer model; Gemini insight workflows documented (AI-020…029); guardrail AI-025; CONF-24; options A/B/C. | §11, §4.2 | **DEC-042** |
| **R-06** Native auth proposal | High | Confirmed | ARC-006 rewritten as Options A/B/C with observed facts (bearer disabled, `RequireSpaSession`) and constraints ARC-006-C1…C8 that prevent weakening security. | §5.3 | **DEC-003** |
| **R-07** Payment/commission baseline | High | Confirmed | Status `PAR` (uncommitted); Section 10 added; PAY-001…009; release gate PAY-007; MIL-007 clarified (simulated vs real). | §10, §8.9 | DEC-007, **DEC-046** |
| **R-08** Deal lifecycle gaps (a)–(d) | High | Clarify (c: confirmed) | WF-013 reconciliation; DLR-011 (Matched), DLR-012 (NDA before Connection), DLR-013 (no cancel state), DLR-014 (Professional deals); CONF-28/29/30; options listed, none chosen. | §8.9, §9, §20 | **DEC-043**, DEC-044, DEC-045 |
| **R-09** MVP scope too large | High | Confirmed as risk | Release structure R1/R2/R3/PA with options A/B/C; allocation by requirement group; nothing removed. | §4.4, App. F, §21.2 | **DEC-034** |
| **R-10** Completeness claim overstated | High | Confirmed | Claim narrowed: MPS/UXP fully preserved; P1–P9 to the stated depth; reading depth disclosed per document. | §2.1 | Optional: complete reading of P6–P9 tails |
| **R-11** AUTH-001 vs ROL-003 | Medium | Confirmed (internal) | Resolved via multi-role; wording aligned; CONF-32. | AUTH-001, ROL-003 | — |
| **R-12** Session errors collapse to logout | Medium | Confirmed | AUTH-012-D added (distinguish 401/419 from network/5xx); documented as AUD-D02; DEP-011; AC-002. | §8.1, App. B | — |
| **R-13** Pagination omission | Medium | Confirmed | MOB-075, API-007; DSC-008 re-tagged `PAR`; DEP-010; AC-011; LOAD-006. | §12, §14, §17 | DEP-010 |
| **R-14** Premium status | Medium | Confirmed | PRM re-tagged `PAR` (UI only; no enforcement); enforcement and store-billing questions in DEC-008/048. | §8.12 | DEC-008, DEC-048 |
| **R-15** Notifications / Admin inbox | Medium | Confirmed | NTF-001 split participant `PAR` vs Admin `MIS`; NTF-004 preferences exist; DEP-013. | §8.14 | DEC-009 |
| **R-16** TBD classification | Medium | Confirmed | DECs split P0/P1/P2; repository-answerable facts moved to DEP-006 extractions (error shape, versioning, upload limits, events, fields, DB engine) instead of TBD. | §19, §17 | Business decisions remain Pending |
| **R-17** Applications status model assumption | Medium | Clarify | CON-003 annotated: assumption retained, audit flags runtime confirmation; `PAR`. | CON-003 | Runtime check |
| **R-18** Demo explainability | Medium | Confirmed | DSC-006, AI-013 forbid demo/local explanation data; AUD-D03; DEP-016; AC-009. | §8.5, §11 | DEP-016 |
| **R-19** PTF vs FIN priority overlap | Medium | Clarify | PTF-001 annotated: investor *viewing* reports is Must via FIN; PTF is portfolio aggregation (Should). | PTF-001 | — |
| **R-20** Source hierarchy / audit input gap | Medium | Confirmed | §2.3 precedence rules NFR-S01…S04; audit's "not available" documents are present in ZIP; CONF-27. | §2.3, §20 | DEP-002 |
| **R-21** INV-004 from an illustrative example | Low | Clarify | INV-004 no longer asserts a founder-set minimum as a rule; cited as ILS illustration; DEC-011. | INV-004 | DEC-011 |
| **R-22** Navy/Cyan hits not contextualised | Low | Partly verified | Verified: one mention each in P0 and P1; context not examined; stated as such; UXP governs. | ARC-008, §2.1, CONF-15 | Optional context check |
| **R-23** Admin read of scores unsourced | Low | Clarify | Matrix rows marked † (no source located). | §6.3 | Confirm vs P5/P9 |
| **R-24** DSC-014 label | Low | Clarify | DSC-014 states Express Interest is core and not deferred; only result-card shortcut and Save are deferred. | DSC-014 | — |


---

## Appendix F — Proposed Release Allocation by Requirement Group

> **PROPOSED; PENDING USER APPROVAL (DEC-034).** Allocation changes **timing**, never scope. Option A of §4.4 is shown; under Option B every R2 row for Founder/Investor/Professional moves into R1 once its gates are met; under Option C rows are re-sliced by role.

| Requirement group | IDs | Release | Gates / dependencies | Decisions |
|---|---|---|---|---|
| Objectives, scope, legal boundary | OBJ-*, SCP-*, NFR-E*, NFR-S* | R1 | — | DEC-034 |
| Architecture (client) | ARC-001…005, 007…013, 020, 021 | R1 | DEP-006, DEP-015 | DEC-022, 029, 041 |
| Mobile authentication transport | ARC-006, §5.3, API-002/013 | PA → R1 | DEP-003, SEC-013, TST-006 | **DEC-003** |
| Roles and multi-role | ROL-001…005, ROL-003-D, MOB-002/003 | R1 | DEP-017 | DEC-005, 047 |
| Admin-only role rules | ROL-006, ROL-007 | R3 | DEC-004 | DEC-004 |
| Authentication and account | AUTH-001…010, 012…013, AUTH-012-D | R1 | DEP-011 | DEC-016 |
| Account deletion; admin elevated auth; auth audit metadata | AUTH-011, 014, 015 | PA | DEP-009 | DEC-026, 038 |
| Profiles | PRO-001, 002, 004…008, 010 | R1 | — | — |
| Investment-type interest; reverse discovery | PRO-003, PRO-009 | PA / R3 | DEP-004 | DEC-006, 018 |
| Verification (user side) | VER-001…003, 005…008 | R1 | DEP-012 | — |
| Tier 2 promotion | VER-004 | PA | — | DEC-028 |
| Business create/view/documents | BIZ-001, 002, 005, 007, 009, 010, 011; BIZ-003, 008 (R1/R2) | R1 | DEP-006 | — |
| Business: investment type, publish rules, multi-investor | BIZ-004, 006, 012 | PA | DEP-004 | DEC-006, 031, 039 |
| Discovery | DSC-001…003, 005…011, DSC-009 | R1 | DEP-016 | — |
| Discovery: investment-type facet, tier filter, global search | DSC-004, 012, 013 | PA | — | DEC-006, 019 |
| Discovery shortcuts / saved items | DSC-014, DSC-015 | R2 / R3 | — | DEC-018 |
| AI — deterministic scoring and matching | AI-001…003, 005…007, 010…017 | R1 | DEP-016 | DEC-015 |
| AI — Gemini insights | AI-020…029, SCR-015 | PA | DEP-014 | **DEC-042** |
| Staged disclosure and NDA | DIS-001…003, 005, 007…011, 014…016 | R1 | — | DEC-017 |
| Disclosure open items | DIS-004, 006, 012, 013 | PA | — | DEC-017, 040 |
| Interest / connections / applications | CON-001…005 | R1 | Runtime confirmation (CON-003) | — |
| Deal Room, negotiation (generic), agreement, milestones | DLR-001…009, DLR-011 (render rule), NEG-001, 005, AGR-001, MIL-001…003, 005…008, 010 | R1 | TST-003 | **DEC-043** |
| Deal Room open items | DLR-008, 012, 013, 014; MIL-004, 009; AGR-002 | PA | — | DEC-030, 035, 043, 044, 045, 014 |
| Deal scheduling | DLR-010 | R3 | — | DEC-018 |
| Investment type terms in negotiation | NEG-002…004, NEG-006 | R2 / PA | DEP-004 | DEC-006 |
| Investment model | INV-001…009 | R2 | DEP-004 | DEC-006, 011 |
| Investment open items | INV-004, INV-010 | PA | — | DEC-006, 011 |
| Financial reporting | FIN-001…007, 009…011 | R2 | DEP-004, runtime verification | DEC-012, 013 |
| Financial open items | FIN-008, FIN-012 | PA | — | DEC-012, 013 |
| Portfolio / investment detail | PTF-001, PTF-002, PTF-003 | R2 / PA | — | DEC-040 |
| Payments and commission (simulated) | PAY-001…009 | PA pending G-07 | **PAY-007 new-backend gate**, DEP-019 | DEC-007; G-01 excludes legacy reuse |
| Premium | PRM-001…006; PRM-007, 008 | R2 / PA | DEP-018 | DEC-008, 048 |
| Reputation | REP-001…005, 007; REP-006; REP-008, 009 | R1 / PA / R3 | — | DEC-027, 028 |
| Notifications (in-app) | NTF-001 (participants), NTF-004 | R1 / PA | DEP-006 | DEC-009 |
| Push; saved-search alerts | NTF-003, NTF-005, MOB-080/081 | R2 / R3 | DEP-005, DEP-007 | — |
| Messaging | MSG-001, 003, 004; MSG-002 | R1 / PA | DEP-010 | DEC-010 |
| Dashboards | DSH-001, 002, 004, 005; DSH-003 | R1 / PA | — | DEC-040 |
| Admin | ADM-001…018, SCR-030…034 | R3 (PA) | DEP-013 | **DEC-004** |
| Mobile-specific | MOB-001…097 | R1 (selected R2/PA per rows) | DEP-008, DEP-010 | DEC-048…051 |
| Security and privacy | SEC-001…015, PRV-001…005 | R1 (selected R2/PA per rows) | DEP-012, DEP-018 | DEC-042 |
| API, NFR, load, tests | API-*, NFR-*, PERF-*, LOAD-*, TST-* | R1 / PA | DEP-015 | DEC-025 |
| Email/reset completion; session policy | AUTH-016, AUTH-017 (PA), AUTH-018, AUTH-019 (PA), AUTH-020 (PA optional) | PA | DEP-007(a), DEP-003 | **DEC-052, DEC-053** |
| Functional navigation | MOB-100…MOB-104 | R1 | — | — |
| Development environment / Expo constraints | ARC-022…ARC-027 | R1 (ARC-026 PA; ARC-025 R2) | PoC (TST-006, H-23) | **DEC-022** |


### F.2 Combined-release rows split in v2.1 (review finding F-12)

| Edition 2.0 row(s) | Edition 2.1 allocation |
|---|---|
| SCP-002 / SCP-002-A | SCP-002 R1 (participants); SCP-002-A R3 (Admin, DEC-004) |
| SCP-004 | PA (per-item proposals in Appendix K.3) |
| BIZ-003 / BIZ-003-B | R1 Readiness preview / R2 Investment Type & Risk Notice preview |
| BIZ-008 / BIZ-008-B | R1 Overview, Readiness, Team, Documents, Activity / R2 Funding Ask & Financial Reporting |
| DLR-006 / DLR-006-B | R1 state-specific content / R2 Investment Type terms & Financial Reports |
| ADM-001 | R3 (subject to DEC-004) |
| NTF-001 / NTF-001-A | R1 participants / R3 Admin inbox (MIS; DEP-013) |
| DSH-002 / DSH-002-B | R1 core metrics / R2 investor portfolio-linked metrics |
| PAY-009 / MIL-007 | PA under G-07; any simulated payment capability requires PAY-007 on the independent Node.js backend. Milestone release remains a simulated status change only. |
| SCR-009, 018, 019, 021, 026, 027, 030…034 | Single release value each; split noted in the Functional access point cell |

### F.3 R1 gate consistency check (review finding F-04, computed on the v2.1 text)

Every decision cited by a row allocated to R1 is either an R1 gate in §21.2 or explicitly excluded with a reason. **Unexplained omissions: none.**

| Decision | Cited by R1 rows (sample) | Treatment |
|---|---|---|
| DEC-003 | ARC-024 | R1 gate (§21.2) |
| DEC-004 | SCP-002, DSH-002 | Not a gate: cited only in the Admin-scoped parts of SCP-002/DSH-002; gates R3 only |
| DEC-005 | ROL-003 | R1 gate (§21.2) |
| DEC-010 | MSG-001 | R1 gate (§21.2) |
| DEC-014 | MIL-004 | R1 gate (§21.2) |
| DEC-016 | ROL-005, AUTH-005 | R1 gate (§21.2) |
| DEC-017 | DIS-002 | R1 gate (§21.2) |
| DEC-022 | ARC-001, ARC-022, ARC-023 | R1 gate (§21.2) |
| DEC-025 | MOB-094 | R1 gate (§21.2) |
| DEC-029 | ARC-008 | Not a gate: superseded by owner instruction |
| DEC-034 | SCP-001 | R1 gate (§21.2) |
| DEC-041 | ARC-020 | R1 gate (§21.2) |
| DEC-044 | REP-004 | R1 gate (§21.2) |
| G-01 / DEC-046 | ARC-002/020, DEP-001, MIL-007, PAY-007 | APPROVED architecture boundary; not a release gate and not a legacy-branch dependency |
| DEC-047 | ROL-003-D, MOB-003 | R1 gate (§21.2) |
| DEC-050 | ARC-001 | R1 gate (§21.2) |

---

## Appendix G — MPS Section-Numbering Map (v1.0 vs v1.1)

Basis: MPS "Document Update Notes" — a new **Section 15 (Investment Model & Financial Transparency)** was inserted after the Deal Room section; all former sections 15–32 shifted up by one (now 16–33). Phase prompts P1–P3 cite some **pre-insertion (v1.0)** numbers; individual citations in P1–P3 were **not** re-mapped one by one here, and where this document cites a P1–P3 reference it carries the prompt's own wording.

| Former (v1.0) | Now (v1.1) | Title |
|---|---|---|
| 1–14 | 1–14 | Unchanged (Executive Summary … Deal Room & Deal Lifecycle) |
| — | **15** | **Investment Model & Financial Transparency (new)** |
| 15 | 16 | Off-Platform Deal Risk & Retention Strategy |
| 16 | 17 | Reputation System |
| 17 | 18 | Premium System |
| 18 | 19 | Admin System |
| 19 | 20 | Business Model |
| 20 | 21 | System Workflow (High-Level) |
| 21 | 22 | High-Level Architecture |
| 22 | 23 | Conceptual Data Model |
| 23 | 24 | Business Rules (Core Logic) |
| 24 | 25 | MVP Scope |
| 25 | 26 | Should-Have Scope |
| 26 | 27 | Future Scope |
| 27 | 28 | Non-Functional Requirements |
| 28 | 29 | Security & Privacy Considerations |
| 29 | 30 | Legal & Compliance Boundaries |
| 30 | 31 | Known Limitations |
| 31 | 32 | Success Metrics |
| 32 | 33 | Final End-to-End Workflow |

*(Rows for former 17–31 follow from the stated "shift up by one" rule; the update notes name explicitly former 15→16, 16→17, 28→29, 29→30.)*

---

## Appendix H — Static-Audit Verification Backlog (what runtime checking must still prove)

> Until each item is checked at runtime, the related status remains **audit-observed (static)**. This backlog is documentation only; it authorises no testing or development by itself.

| ID | Item to verify | Related | Source of doubt |
|---|---|---|---|
| H-01 | Authorisation matrix (RBAC, stage, NDA, tier, participant) against an **isolated test database** | ROL-001, SEC-002, TST-001 | AUD §9 P0-3 |
| H-02 | **Legacy audit backlog only:** old payment/commission branch idempotency, double-transition protection, rounding and reconciliation | Appendix B historical evidence | AUD §6; does not verify the new backend |
| H-03 | Actual DB engine, PHP version, migrations executing cleanly | ARC-020, DEC-041 | AUD §1, §2, §6 |
| H-04 | Gemini endpoint/model compatibility and key/quota/billing state, **without exposing credentials**; cause of earlier key failure | AI-027 | AUD §7, §9 P0-4 |
| H-05 | Behaviour of `RequireSpaSession`, CSRF and origin checks toward native clients; feasibility of Option A or B | ARC-006, §5.3 | AUD §8 |
| H-06 | Production headers, cookie behaviour behind HTTPS, proxy trust, CSP, TLS, storage ACLs | SEC-013 | AUD §8 |
| H-07 | Accessibility: keyboard, focus order, screen reader, contrast (web reference) | MOB-091 | AUD §5 |
| H-08 | Disclosure/NDA/Deal ordering when NDA completes **before** the Connection exists; whether Matched is persisted; non-completion behaviour | DLR-011…014 | MPS §24; P6; P7 |
| H-09 | Existence and shape of Investment Type selection and per-deal return terms | INV-*, DEC-006 | AUD silent |
| H-10 | Financial reporting runtime: statuses, cadence, investor flag preconditions, evidence gating | FIN-* | AUD §4 |
| H-11 | NDA withdrawal/expiry behaviour; re-expression after decline | DIS-004, DIS-006 | AUD silent |
| H-12 | Pagination of histories, audit logs, messages, notifications under large row counts | MOB-075 | AUD §6 |
| H-13 | Notification event set, preferences model, delivery | NTF-* | AUD §4 |
| H-14 | Messages: delivery model, history size, attachments | MSG-001 | AUD §4 |
| H-15 | Premium enforcement (or its absence) | PRM-* | AUD §4 |
| H-16 | Admin: suspend/restore, flag/suspend business, financial/discrepancy workspaces, investment oversight | ADM-* | AUD §4 |
| H-17 | Whether any LLM output influences numerical scores or access decisions; what data is sent to the provider | AI-025, AI-028 | AUD §7 |
| H-18 | Error response shape and status conventions; API versioning; upload limits; timestamp conventions | ARC-005, ARC-011, MOB-060, API-006 | AUD §2 |
| H-19 | Tier 2 promotion mechanics; reputation formula/weights; Professional completion signal | VER-004, REP-006 | AUD §4 |
| H-20 | Load and query-plan evidence (`EXPLAIN`, slow-query log, concurrency scenarios) | LOAD-* | AUD §6, §10 |
| H-21 | Email-verification and password-reset completion on a native client: signed-link validity, expiry/single-use, link handling | AUTH-016/017, DEC-052, DEP-007 | AUD §8; FRR F-09 |
| H-22 | Current session/token lifetime, idle, revocation and multi-device configuration | AUTH-018/019, DEC-053 | AUD silent; FRR F-10 |
| H-23 | Expo/React Native capability proof of concept on a physical Android phone (secure storage, camera/upload, links, push for R2, screen-obscuring) without Android Studio | ARC-022…027, DEC-022 | SG-11; FRR F-07 |

---

## Appendix I — Document History & Approval Block

### I.1 History

| Edition | Date | Status | Summary |
|---|---|---|---|
| Mobile 1.0-DRAFT | 15 Nov 2026 | Superseded | First mobile reconstruction; no audit available; §§1–9 only in the received text. |
| Independent Review | 15 Nov 2026 | Input | 24 findings itemised (R-01 … R-24); rating 6.5/10. |
| Mobile 2.0-DRAFT | 15 Nov 2026 | Superseded | Complete regeneration (Sections 1–21, Appendices A–I); audit-based statuses; correction log; decision register with options; no development authorised. |
| Final Independent Review | 15 Nov 2026 | Input | 24 findings (F-01…F-24); 7.5/10; APPROVED WITH CONDITIONS; self-disclosed same-assistant authorship. |
| Mobile Functional Master Specification 2.1-DRAFT | 15 Nov 2026 | Superseded internally | Functional (not visual) specification based on legacy-platform assumptions. |
| **Mobile Functional Master Specification 2.2-DRAFT reconciled content (physical filename remains v2_1)** | 18 Nov 2026 | **Current draft** | Reconciled to Decision Register Revision 6; approved new architecture and separate Web Admin; Business Roles and Unified Messaging added; five authoritative approvals preserved; detailed new decisions remain PENDING; no development authorised. |

### I.2 Approval block *(to be completed by stakeholders; no approvals are recorded here)*

| Role | Name | Decision scope | Approved / Rejected / Deferred | Date |
|---|---|---|---|---|
| Product owner | ______ | DEC-034, DEC-004, DEC-042, DEC-006 | | |
| Technical owner / architect | ______ | DEC-003, DEC-041, DEC-046, DEC-022 | | |
| Security / compliance reviewer | ______ | DEC-048, DEC-026, DEC-038, PRV-005 | | |
| Business owner | ______ | DEC-007, DEC-008, DEC-012, DEC-013, DEC-039 | | |

### I.3 Non-authorisation statement
This specification is **documentation only**. It authorises **no** application development, no frontend/backend/database change, no dependency installation, no Git operation, no code or project scaffolding, and no change to any original document. Statuses are drawn from a **static** audit and make **no runtime-verification claim**. Items marked **PENDING USER APPROVAL** require stakeholder decisions before they can be scheduled.

## Appendix J — Feature Functional Specifications (FEAT-001 … FEAT-035)

> **How to read.** Each card specifies one major feature functionally: business purpose, roles, preconditions, inputs, behaviour, rules, outputs/state changes, backend dependencies, errors/edge cases, security/privacy, acceptance criteria, status/evidence and release. Cards **summarise and cross-reference** the normative rows in §8–§14 (they add no new business rules; where a rule is absent or ambiguous they say **PENDING USER APPROVAL** with the DEC). **No visual design is prescribed** (ARC-008). **Backend/API dependencies** name audit-observed capability domains only: **no endpoint, column or backend evidence is invented** (no endpoint inventory exists — DEP-015). Status uses the strict v2.1 legend (§1.4); evidence "AUD §n" is static. FEAT IDs are new in v2.1; underlying requirement IDs are unchanged.

### FEAT-001 — Registration and onboarding
| Element | Specification |
|---|---|
| Purpose | Let a visitor create an account in one participant role and reach Tier 0 (MPS §7(1), §11). |
| Roles | Visitor → Founder, Investor or Skilled Professional. Admin is never self-registered (ROL-002). |
| Preconditions / permissions | Not authenticated. No public registration for Admin. |
| Inputs / data | Role; email; password; role-specific minimum profile fields (may be a post-login "complete your profile" step — AUTH-002); Terms-of-Service + simulation-disclaimer acceptance (unchecked by default). |
| Functional behaviour | 1) Choose role. 2) Enter account details. 3) Provide role-specific minimum fields (or defer). 4) Accept terms. 5) Submit. 6) Verify email (FEAT-003) and phone (AUTH-005). 7) User is at Tier 0; profile completeness drives onboarding (PRO-006, DSH-004). Further roles can be added later (FEAT-004). |
| Business rules / validation | Password strength and email format validated client-side in real time **and** server-side (AUTH-007); errors shown at the field and announced to assistive technology; consent required (PRV-001); registration places the user at Tier 0 (AUTH-004). |
| Outputs / state changes | New account (role set, Tier 0, unverified email); audit event recorded server-side (AUTH-011). |
| Backend / API dependencies | Authentication domain (registration, email verification, phone foundation, throttling) — AUD §4; transport PENDING USER APPROVAL (DEC-003). |
| Errors / edge cases | Duplicate email; validation failure (field-level `422`); throttling (`429`, no retry storm — AUTH-013); network loss mid-submit (no auto-retry — MOB-020); phone verification provider real vs simulated (DEC-016). |
| Security / privacy | HTTPS only; no credential logged (SEC-005); generic errors that do not reveal whether an email exists (AUTH-008). |
| Acceptance criteria | AC-020; AC-003 (throttling parity) · *FEAT-001-AC1:* given the terms box is unticked, registration is refused. *AC2:* given a valid submission, the user is Tier 0 and is told verification is required. |
| Status / evidence | AUTH-001 **PAR**, AUTH-004 **PAR**, AUTH-007 **PAR**, AUTH-005 **PAR** (AUD §4 "COMPLETE in code / NOT RUNTIME VERIFIED" at domain level); AUTH-002/008 **UNV**. |
| Release | **R1** (AUTH-016 completion path PA — DEC-052). |

### FEAT-002 — Login, session restore and logout
| Element | Specification |
|---|---|
| Purpose | Authenticate returning users, restore sessions safely, end sessions on request. |
| Roles | All authenticated roles. |
| Preconditions | Registered account; for suspended accounts see below. |
| Inputs / data | Email + password; stored credential/session material (per DEC-003). |
| Functional behaviour | Login with email/password (no role selection — AUTH-003); on launch restore the session and distinguish **authentication expiry** (`401`/`419`) from **transient network/`5xx`** (AUTH-012-D, MOB-010); on logout invalidate the session **server-side** and clear local credentials and role-scoped data (AUTH-009, SEC-007); on `401` preserve unsent drafts and route to Login (AUTH-012, MOB-053). |
| Business rules / validation | Failed login reveals nothing about email existence (AUTH-008); throttling honoured (AUTH-013); suspended account: show a clear message, end the session, block protected screens (AUTH-010); session lifetime/idle/re-auth/multi-device **PENDING USER APPROVAL** (DEC-053). |
| Outputs / state changes | Authenticated session for the **active role**; logout ends it server-side. |
| Backend / API dependencies | Authentication domain; distinguishable expiry vs error statuses (DEP-011); mobile transport (DEP-003). |
| Errors / edge cases | Expired session; offline at launch (retry state, not login); `429`; account suspended; server returns an unknown enum/status (tolerated — API-004). |
| Security / privacy | Credentials only in OS secure storage (MOB-011); never in logs/clipboard/crash reports (SEC-005). |
| Acceptance criteria | AC-002, AC-003, AC-033 (if DEC-053) · *AC1:* given airplane mode at launch, the app shows a retry state, not Login. *AC2:* given logout, a subsequent request with the old credential is rejected. |
| Status / evidence | AUTH-003 **IMP**; AUTH-009/010/008 **UNV**; AUTH-012-D **NEW**; transport **MIS** (ARC-006). |
| Release | **R1** (transport/policy gated by DEC-003, DEC-053). |

### FEAT-003 — Email verification and password reset completion
| Element | Specification |
|---|---|
| Purpose | Complete signed email-verification and password-reset flows on a native client (review F-09). |
| Roles | All participant roles. |
| Preconditions | Registered account (verification); account with a known email (reset). |
| Inputs / data | Signed verification link; reset request email; new password. |
| Functional behaviour | Verification: show state (unverified/verified), allow resend, complete via the DEC-052 path; Reset: request, complete via the DEC-052 path, then sign in. |
| Business rules / validation | Flow stays signed and server-validated (ARC-006-C2); an unverified email is never treated as verified; reset-link expiry/single-use is whatever the server enforces (extract — DEP-006); whether sessions end on reset is DEC-053. |
| Outputs / state changes | Email marked verified (server); password changed; messages shown. |
| Backend / API dependencies | Signed verification routes (AUD §8); reset request/complete (AUD §4); link support (DEP-007(a)). |
| Errors / edge cases | Expired/used link (neutral failure + new request); link opened on a device without the app; wrong account signed in. |
| Security / privacy | Reset request must not reveal whether the email exists (AUTH-008). |
| Acceptance criteria | AC-020, AC-021. |
| Status / evidence | AUTH-004 **PAR**, AUTH-006 **IMP**, AUTH-016/017 **UNV** (PA). |
| Release | **R1 dependency; mechanism PA (DEC-052).** |

### FEAT-004 — Multi-role enrollment and active-role switching
| Element | Specification |
|---|---|
| Purpose | Let one account hold Founder, Investor and Professional roles as isolated workspaces (ROL-003). |
| Roles | Any participant account. Admin excluded (†). |
| Preconditions | Authenticated; role not already held (enroll) or held (remove). |
| Inputs / data | Role to enroll/remove; chosen active role. |
| Functional behaviour | Enroll/remove roles through the existing operations; switch active role without logout (MOB-101); the whole workspace (navigation, dashboard, data) follows the active role (MOB-002); on restart the active role is restored and **validated against enrolled roles from the server** (ROL-003-D, MOB-003). |
| Business rules / validation | A user cannot change role by editing a profile field; no data bleed between roles (SEC-007); persistence mechanism PENDING USER APPROVAL (DEC-047). |
| Outputs / state changes | Updated enrolled-role set; new active role; role-scoped caches/drafts cleared on switch. |
| Backend / API dependencies | Role enrollment/removal and role profiles — AUD §4; active-role persistence (DEP-017 if server-side). |
| Errors / edge cases | Role removed on another device; role list changed while app suspended; web defect AUD-D01 (first role selected) must not be inherited. |
| Security / privacy | Authorisation is server-side per role (ROL-001). |
| Acceptance criteria | AC-001, AC-035; TST-004. |
| Status / evidence | ROL-003 **PAR** (domain observed — AUD §2, §4); ROL-003-D **PAR**; MOB-002/003 **NEW**. |
| Release | **R1** (DEC-005, DEC-047). |

### FEAT-005 — Founder profile
| Element | Specification |
|---|---|
| Purpose | Record the founder's background; the Business is a separate entity (PRO-001). |
| Roles | Founder (own); others view read-only with locked sections. |
| Preconditions | Authenticated Founder role. |
| Inputs / data | Bio/background; structured prior-experience entries (role, duration, industry). |
| Functional behaviour | Edit per section; view another user's profile read-only (PRO-007); show profile completeness (PRO-006); show tier indication and reputation summary only when they exist (PRO-008, PRO-010). |
| Business rules / validation | Server-side validation; no free-text résumé used for scoring. |
| Outputs / state changes | Updated profile; completeness recalculated. |
| Backend / API dependencies | Founder profile domain — AUD §2, §4. |
| Errors / edge cases | Field validation errors; editing while offline (draft rules MOB-050). |
| Security / privacy | Own-profile edits only; locked sections not leaked (DIS-009). |
| Acceptance criteria | AC-022. |
| Status / evidence | PRO-001 **PAR** (experience-entry detail not evidenced). |
| Release | **R1**. |

### FEAT-006 — Investor profile (Micro and Large/Standard)
| Element | Specification |
|---|---|
| Purpose | Capture investor preferences used for matching (MPS §5.2, §9.1). |
| Roles | Investor (own); Founders see published/permitted parts. |
| Preconditions | Authenticated Investor role. |
| Inputs / data | Bio; investor type (Large / Small-Micro); available, minimum, maximum investment (BDT numeric, grouping, non-negative, min ≤ max); industry focus; risk level; business-stage preference; location preference; involvement level; **investment-type interest** (Micro / Large-Standard / both — PRO-003, PENDING USER APPROVAL DEC-006). |
| Functional behaviour | Edit per section; optional Reverse Investment Discovery toggle (R3, PRO-009). |
| Business rules / validation | Investor type is a profile attribute; the ticket-size ranges differ between MPS §5.2 and §15/ILS (CONF-04, retained); BDT input validation (PRO-005). |
| Outputs / state changes | Updated preferences feeding Match Score (AI-011). |
| Backend / API dependencies | Investor preferences — AUD §4 (field list not evidenced). |
| Errors / edge cases | min > max; investment-type interest has no confirmed field (DEC-006). |
| Security / privacy | Own-profile edits only. |
| Acceptance criteria | AC-022. |
| Status / evidence | PRO-002 **PAR**; PRO-003 **UNV**. |
| Release | **R1** (PRO-003 PA/R2). |

### FEAT-007 — Skilled Professional profile
| Element | Specification |
|---|---|
| Purpose | Describe skills and availability for matching with Founder skill needs (MPS §5.3, §9.2). |
| Roles | Professional (own); Founders view permitted parts. |
| Preconditions | Authenticated Professional role. |
| Inputs / data | Skill tags with proficiency; structured experience; availability (hours/week, start date); compensation preference (salary / equity / hybrid, BDT range; equity % is not a monetary value). |
| Functional behaviour | Edit per section; select skills from the shared Skill entity. |
| Business rules / validation | Not a free-text résumé for scoring; BDT range validation. |
| Outputs / state changes | Updated profile; Match Score inputs (AI-012). |
| Backend / API dependencies | Professional profiles and skills — AUD §4. |
| Errors / edge cases | Invalid ranges; unknown skill. |
| Security / privacy | Own edits only. |
| Acceptance criteria | AC-022. |
| Status / evidence | PRO-004 **PAR** (availability/compensation fields not evidenced). |
| Release | **R1**. |

### FEAT-008 — Identity verification (Tier 0 / 1 / 2)
| Element | Specification |
|---|---|
| Purpose | Build trust: Tier 0 unverified, Tier 1 identity verified (manual review), Tier 2 track-record verified (manual in the MPS MVP) — MPS §11. |
| Roles | Founder, Investor, Professional (submit); Admin (review). |
| Preconditions | Authenticated; Tier 0 to request Tier 1. |
| Inputs / data | Government ID image and selfie/document image (capture or select); optional notes. |
| Functional behaviour | Submit request → status *pending / approved / rejected / more-info-requested* with Admin reason shown (VER-002); upgrade path offered when a Tier ≥ 1 action is attempted at Tier 0 (VER-006); tier indication reachable at all times (VER-008). |
| Business rules / validation | Not legal KYC/AML and never implied so (VER-005); Tier 2 assigned manually, trigger undecided (DEC-028); identity status never merged with financial verification status (VER-007). |
| Outputs / state changes | Verification request record; tier change on Admin decision; audit entries. |
| Backend / API dependencies | Verification codes, requests, evidence, admin review, tier gates, audit logs — AUD §4; upload hardening (DEP-012). |
| Errors / edge cases | Upload failure/cancel (no silent partial record — MOB-062); camera/gallery permission denied (reduced function — PRV-004); unsupported file. |
| Security / privacy | Documents visible only to owner and reviewing Admin; never public URLs; images not left in cache/gallery (MOB-063). |
| Acceptance criteria | AC-023; TST-009. |
| Status / evidence | VER-001 **IMP**; VER-002/003 **PAR**; VER-004 **UNV**. |
| Release | **R1 user submission plus minimum separate Web Admin review required by OD-03; exact Admin inventory PA under OD-10.** |

### FEAT-009 — Business creation and management
| Element | Specification |
|---|---|
| Purpose | Let a Founder describe a business, obtain a Readiness Score, and publish it for discovery (MPS §7(2)). |
| Roles | Founder (owner). Admin views/moderates; other roles see only published, stage-permitted content. |
| Preconditions | Authenticated Founder role. A Founder may own several Businesses (default). |
| Inputs / data | Wizard step set (UXP §7.2): Basics → Business Model → Market & Competition → Team/Founder Capability → Funding Requirement → Traction/Customer Validation → Review. Actual field set is to be reconciled with the platform schema (DEP-006). Required skills from the shared Skill entity (BIZ-005). Funding amount (BDT). Investment Type selector is PENDING USER APPROVAL (DEC-006). |
| Functional behaviour | Create and **autosave** at every step; keep as **Draft** and resume (BIZ-002, MOB-102); Review step shows a Readiness Score preview that recalculates on later edits (BIZ-003); submit; **publish** after server-side publish-readiness validation (BIZ-006); view the **My Businesses** list (BIZ-007) and the owner Business functional areas (BIZ-008). |
| Business rules / validation | Drafts visible only to the owner (BIZ-002); ownership enforced server-side — a Founder can never read-for-edit, edit, publish or delete another Founder's Business (BIZ-010); whether Admin approval is a mandatory pre-publish gate is not stated (BIZ-006); unpublish/withdraw is undefined (DEC-031); multi-investor funding rules are undefined (BIZ-012, DEC-039). |
| Outputs / state changes | Business record (Draft → submitted → approved/rejected → Published); Readiness inputs versioned (AI-006). |
| Backend / API dependencies | Business management (draft, update, requirements, submit, approve/reject, publish, photos, documents) — AUD §4; field set extraction (DEP-006). |
| Errors / edge cases | Validation failures (field-level); publish refused with the server's reasons; offline editing (drafts follow MOB-050); app restart mid-wizard (resume at last server-saved state). |
| Security / privacy | Owner-only access to drafts; locked sections for non-owners (BIZ-009). |
| Acceptance criteria | AC-024; TST-001 (authorisation). *FEAT-009-AC1:* given another Founder's Business id, the server refuses edit/publish. |
| Status / evidence | BIZ-001 **PAR**, BIZ-005 **IMP**, BIZ-010 **IMP**, BIZ-006 **PAR**; BIZ-002/003 **UNV** (AUD §4 domain). |
| Release | **R1**; BIZ-003-B/BIZ-004 investment preview R2/PA. |

### FEAT-010 — Business documents and file uploads
| Element | Specification |
|---|---|
| Purpose | Let a Founder attach pitch deck, plan and financial documents tagged by disclosure stage (BIZ-011). |
| Roles | Founder (upload, tag); viewers per stage. |
| Preconditions | Owner of the Business. |
| Inputs / data | File (PDF for business documents; verification evidence PDF/JPEG/PNG); stage tag Public / Stage 2 / Stage 3 / Stage 4 (set only by the Founder). |
| Functional behaviour | Pre-validate type and size using **server-provided limits** (not stated in sources — DEP-006), upload with progress, cancel and manual retry (MOB-060…062); list documents; locked entries show name and tag only (DIS-008); open documents only through authenticated, authorisation-checked calls (MOB-064). |
| Business rules / validation | Server validation is authoritative; a failed upload never creates a silent partial record (MOB-062); Founder sees "Viewed by [X] on [date]" (DIS-011). |
| Outputs / state changes | Stored document with stage tag; access audit entries on every Stage 2+ view/download. |
| Backend / API dependencies | Dedicated document storage services, document policies, access-log models, PDF extension/MIME/size validation — AUD §6, §8; upload hardening (DEP-012). |
| Errors / edge cases | Disallowed type/size; interrupted upload; permission denied; unavailable document (neutral message). |
| Security / privacy | No public/shareable URLs; no malware-scan evidence yet (SEC-010); link fields restricted to http/https (SEC-011). |
| Acceptance criteria | AC-012, AC-025; TST-009. |
| Status / evidence | BIZ-011 **PAR**; DIS-008 **PAR**; API-008 **IMP**; ARC-013 **IMP**. |
| Release | **R1**. |

### FEAT-011 — Search, filtering and discovery
| Element | Specification |
|---|---|
| Purpose | Role-scoped discovery: Investors and Professionals discover published Businesses; Founders discover Investor/Professional profiles (MPS §7(5)). |
| Roles | Investor, Professional, Founder (active role). |
| Preconditions | Authenticated. Only **published** Businesses appear (DSC-011). |
| Inputs / data | Keyword; filters limited to facets backed by real fields (DSC-003); sort. |
| Functional behaviour | Deterministic keyword, case-insensitive substring search over structured fields; empty query returns the full paginated, filtered set (DSC-002); result entries per DSC-006; removable filters and clear-all, count and sort, relaxed suggestions on empty (DSC-007); server-paginated bounded paging (DSC-008); state persists when returning from a result (DSC-009); a mechanism to switch between Search Results and AI Suggestions, never merged (DSC-010). |
| Business rules / validation | No fuzzy/semantic matching; default sort by most recently published/updated (DSC-005); investment-type filter/indication and tier filter undefined (DSC-004, DSC-012); global top-bar search undecided (DEC-019). |
| Outputs / state changes | None (read-only); optionally Express Interest (FEAT-015). |
| Backend / API dependencies | Shared discovery and matching endpoints — AUD §2, §4; facet confirmation (DEP-006); demo explainability removed (DEP-016). |
| Errors / edge cases | No results; filter facet with no backing field (reported as gap); slow network; stale page after publish/unpublish. |
| Security / privacy | Drafts and non-public fields never returned; all discovery requires authentication. |
| Acceptance criteria | AC-026, AC-009, AC-011. |
| Status / evidence | DSC-001…011 **UNV/PAR** (AUD observes the page and endpoints, not facets or semantics). |
| Release | **R1**; DSC-004/012/013 PA; DSC-014/015 R2/R3. |

### FEAT-012 — Investor Readiness Score
| Element | Specification |
|---|---|
| Purpose | Give a Founder an explainable 0–100 score and improvement guidance (MPS §10). |
| Roles | Founder (own Business). Admin read access is unsourced (†). |
| Preconditions | A Business with readiness inputs. |
| Inputs / data | Structured business inputs; eight factors: Market Potential, Business Model Clarity, Competition, Scalability, Founder Capability, Funding Requirement Realism, Risk, Customer Validation. |
| Functional behaviour | Show the overall score, factor scores for all eight factors, weak areas, rule-based improvement suggestions (AI-002); show factor breakdown as text alongside any graphic (AI-007); flag missing inputs as *incomplete* (AI-005); recompute when relevant inputs change, versioned (AI-006). |
| Business rules / validation | Deterministic, rule-based, documented fixed weights summing to 100% — actual weights/thresholds are not in the supplied sources (DEC-015) and are read from the platform, never hard-coded in the client (AI-004); never presented as a prediction or guarantee (AI-015); never influences disclosure or access (AI-016). |
| Outputs / state changes | Versioned assessment; none on the client. |
| Backend / API dependencies | Readiness inputs, deterministic scoring, assessments — AUD §4. |
| Errors / edge cases | Incomplete inputs; recalculation lag; unknown factor values (tolerated). |
| Security / privacy | Owner-only; no AI narrative may alter the score (AI-025). |
| Acceptance criteria | AC-027, AC-010. |
| Status / evidence | AI-001 **PAR**, AI-006 **IMP**; AI-002/003/005 **UNV**. |
| Release | **R1**. |

### FEAT-013 — Matching engine and AI Suggestions
| Element | Specification |
|---|---|
| Purpose | Rank Founder↔Investor and Founder↔Professional candidates by an explainable Match Score and surface recommendations (MPS §8–§9). |
| Roles | All participant roles; Admin read † . |
| Preconditions | Complete enough profiles/business inputs. |
| Inputs / data | Server-computed match data. Founder↔Investor weights: Industry 25, Investment Range 25, Business Stage 15, Risk Level 15, Location 10, Involvement 10. Founder↔Professional suggested weights: Skill Overlap 35, Industry Experience 20, Experience Level 15, Availability 15, Location 10, Compensation 5 (weights configurable, visible, auditable). |
| Functional behaviour | Show Match Score 0–100% **always with per-factor score and applied weight from the server** (AI-010, AI-013); AI Suggestions rank by Match Score with any Premium boost but never hide lower-ranked legitimate results from Search (AI-014, PRM-006); shown in the AI Suggestions view and dashboard top 3 (DSH-001). |
| Business rules / validation | Scores never influence disclosure/NDA/document access (AI-016, DIS-014); not investment advice (AI-015); **no demo or locally generated explanations** (AUD-D03). |
| Outputs / state changes | None on client. |
| Backend / API dependencies | Deterministic matchers and recommendation endpoints — AUD §4 (backend COMPLETE / frontend PARTIAL); DEP-016. |
| Errors / edge cases | Cold start (limited data); missing factor inputs; provider-free (no AI dependency). |
| Security / privacy | Server-side computation; no weights hard-coded in client. |
| Acceptance criteria | AC-009, AC-027. |
| Status / evidence | AI-010 **PAR**, AI-014 **PAR**, AI-013 **PAR**; AI-011/012 **UNV**. |
| Release | **R1**. |

### FEAT-014 — AI-assisted insights (Gemini layer)
| Element | Specification |
|---|---|
| Purpose | Present audit-observed narrative insights (business analysis; matching, deal, readiness, admin) without treating them as scores (§11.3). |
| Roles | Per DEC-042 (Founder business analysis candidate; others PA). |
| Preconditions | Approved scope (DEC-042); stage/NDA gating of data sent undecided (AI-028). |
| Inputs / data | None client-side beyond the request; **no provider key ever in the app** (AI-024). |
| Functional behaviour | Show insight text clearly distinguished from deterministic scores (AI-026, proposed); on provider error/`429`/unavailable show a non-blocking "insight unavailable, try later" state, never auto-retry in a loop, keep deterministic scores visible (AI-023, API-010). |
| Business rules / validation | Insight text **never** alters scores or influences disclosure, NDA, document access, verification tier, reputation or financial status (AI-025 — not established by the audit); guardrails apply under every DEC-042 option (F-23). |
| Outputs / state changes | Immutable versioned insight on the server. |
| Backend / API dependencies | Single Gemini adapter, schema validation, fingerprints, locks — AUD §2, §6, §7; quotas, backoff, telemetry (DEP-014). |
| Errors / edge cases | Single provider, no fallback; key/quota/model errors collapse to generic failure; operational status unverified (AI-027). |
| Security / privacy | Whether confidential/NDA content is sent to the provider is unknown (AI-028, PRV-005). |
| Acceptance criteria | AC-010; TST-011. |
| Status / evidence | AI-020/021/024 **IMP** (foundation, not operationally verified); AI-022 **PAR**; AI-025/028 **UNV**. |
| Release | **PA (DEC-042)**; recommended proposal: not in R1. |

### FEAT-015 — Interest, connection and application
| Element | Specification |
|---|---|
| Purpose | Turn one-sided interest into a Connection when mutual, and track Professional applications (MPS §24). |
| Roles | Investor/Professional (express interest); Founder (reciprocate/decline). |
| Preconditions | Authenticated; Tier 0 may express interest (CON-004). |
| Inputs / data | Express interest on a published Business; Founder reciprocation or Decline. |
| Functional behaviour | One-sided interest stays a visible pending record; when both sides expressed interest and not declined, a Connection is created referencing the Match Score (CON-001); Connections list filterable All/Pending/Active/Completed (CON-002); Professional application status progression (CON-003); Founder Decline is one mechanism across disclosure and connection (CON-005). |
| Business rules / validation | Higher-trust actions (Stage 3 NDA, recommendation priority) need Tier ≥ 1; the unified application status model is an assumption (CON-003). |
| Outputs / state changes | Interest/Connection records; Deal creation per DLR-002. |
| Backend / API dependencies | Interest/connection flows — AUD §4 (PARTIAL; applications require runtime confirmation). |
| Errors / edge cases | Re-expressing interest after decline undefined (DEC-017); duplicate interest. |
| Security / privacy | Participant-only visibility. |
| Acceptance criteria | AC-028. |
| Status / evidence | CON-001…003 **PAR**; CON-004/005 **UNV**. |
| Release | **R1** (DSC-014 shortcut R2). |

### FEAT-016 — Staged disclosure
| Element | Specification |
|---|---|
| Purpose | Reveal business information in four stages per (Business, viewer) relationship (MPS §13). |
| Roles | Founder (owner, confirms Stage 4); Investor/Professional (viewer). |
| Preconditions | Authenticated; relationship record created on first stage-relevant action. |
| Inputs / data | Interest; NDA acceptances; Founder confirmation to proceed. |
| Functional behaviour | Stage 1 Teaser (no record) → Stage 2 Extended (interest, Founder not declining; auto-grant with revocable Decline — DEC-017) → Stage 3 NDA (both accept) → Stage 4 Full Proposal (NDA complete + Founder confirmation, never automatic). The client shows the current stage wherever relevant (DIS-010), never sends a stage, renders locked states from the stage indicator not missing fields (DIS-009), and shows a soft retention nudge (DIS-015). |
| Business rules / validation | No stage may be skipped (DIS-003); Stage 3+ needs Tier ≥ 1 (ROL-005); restricted fields omitted from payloads (DIS-009); no AI output influences disclosure (DIS-014). |
| Outputs / state changes | Relationship stage transitions; document access audit entries. |
| Backend / API dependencies | Disclosure relationships, stages, interest synchronisation, access controls — AUD §4. |
| Errors / edge cases | Founder Decline; attempted skip (server rejects with reason); stage unknown to the client (neutral label). |
| Security / privacy | Server-side enforcement for every client; Founder-set tags only. |
| Acceptance criteria | AC-004, AC-005, AC-025. |
| Status / evidence | DIS-001 **IMP**; DIS-002/008/011 **PAR**; DIS-003 **UNV**. |
| Release | **R1**. |

### FEAT-017 — NDA workflow
| Element | Specification |
|---|---|
| Purpose | Mutual confidentiality gate before Stage 3 (MPS §13). |
| Roles | Founder and viewer (Tier ≥ 1). |
| Preconditions | Stage 2 reached; viewer Tier ≥ 1. |
| Inputs / data | Versioned platform NDA template; each party's acceptance. |
| Functional behaviour | Show the versioned NDA; accept enabled only after scrolling to the end (DIS-005); record user, role, version, timestamp per party; show "Waiting on [counterparty]"; after dual acceptance show a timestamped confirmation; decline is observed (AUD §4); explicit confirmation step for the irreversible action (DLR-009). |
| Business rules / validation | NDA is a confidentiality gate only, never an investment agreement or legal enforceability claim (DIS-007); withdrawal and expiry are **not defined** and must not be built or implied (DIS-006, DEC-017); UXP "NDA expires in 2 days" conflicts (CONF-23). |
| Outputs / state changes | NDA acceptance records; relationship → Stage 3; Deal state *NDA Signed* derived (not manual). |
| Backend / API dependencies | NDA request/accept/decline; deal-lifecycle synchronisation — AUD §4. |
| Errors / edge cases | One party accepts, other never does; decline behaviour as implemented (not further specified); Tier 0 attempts (verification-upgrade path). |
| Security / privacy | Server-side tier gate; audit-logged. |
| Acceptance criteria | AC-004, AC-005. |
| Status / evidence | DIS-005 **PAR**; DIS-006 **PAR**; DIS-007 **UNV**. |
| Release | **R1**. |

### FEAT-018 — Deal Room and deal lifecycle
| Element | Specification |
|---|---|
| Purpose | One shared workspace per Deal between a Founder and an Investor or Professional (MPS §14). |
| Roles | Founder and counterparty (participants); Admin read-only. |
| Preconditions | A Deal exists (created on Connection — P7 default; see DEC-043). |
| Inputs / data | Server-returned Deal state, history, documents, messages, terms, milestones. |
| Functional behaviour | Show the current state and its position in the eight states **Matched → Interest Confirmed → Deal Room Opened → NDA Signed → Negotiation → Agreement → Milestone Funding Active → Completed** (DLR-001, DLR-003); give access to Overview, Documents, Chat, Terms, Milestones, Financial Reports (R2) (DLR-004); state-specific content (DLR-006); soft retention nudge at entry (DIS-015); the client renders **only** the server's state and never infers or reorders (DLR-011/012). |
| Business rules / validation | Transitions are server-validated, history-recorded, audit-logged; the client never sends a target status; *NDA Signed* cannot be advanced manually (DLR-002); non-participants receive nothing (DLR-007); cancel/non-completion state undefined (DLR-013, DEC-044); Professional-deal funding semantics undefined (DLR-014, DEC-045). |
| Outputs / state changes | Deal state history; archive when Completed with feedback prompt (MIL-006). |
| Backend / API dependencies | Deals, stages, participant authorisation — AUD §4 (COMPLETE core / PARTIAL polish). |
| Errors / edge cases | NDA already complete before Connection (DEC-043); Deal for a pair that has none; unknown state value. |
| Security / privacy | Participant-only; documents follow disclosure gating (DLR-005). |
| Acceptance criteria | AC-006, AC-005. |
| Status / evidence | DLR-001/002 **PAR**; DLR-007 **IMP**; DLR-005 **UNV**. |
| Release | **R1** (DLR-006-B R2). |

### FEAT-019 — Negotiation and agreement
| Element | Specification |
|---|---|
| Purpose | Agree terms in a versioned, auditable way and record a platform Agreement (MPS §14, UXP §10). |
| Roles | The two Deal participants; Admin cannot act for them. |
| Preconditions | Deal at or after *NDA Signed*. |
| Inputs / data | Terms payload per counterparty type: Micro — amount, profit/loss-sharing %, reporting period; Large/Standard — amount, valuation basis, ownership %; Founder↔Professional — compensation, equity %, start date, role scope. Final field list undecided (CONF-06, DEC-006). |
| Functional behaviour | Show current offer vs counter side by side; each counter creates a new versioned entry (proposer, payload, timestamp, status proposed/countered/accepted); history never overwritten (NEG-001); if the Investment Type is not chosen, choosing it is the first required step (NEG-003, R2); both confirm the same finalised terms → read-only Agreement with both timestamps, labelled "Recorded Agreement (Platform Simulation)" (AGR-001); explicit confirmation step before finalising (DLR-009). |
| Business rules / validation | Type and terms not interchangeable mid-deal without renegotiation; loss handling explicit before acceptance (NEG-004); persistent Risk/Disclosure Notice on every Negotiation/Agreement view (NEG-006, INV-008); never "legally binding" (SCP-012/013). |
| Outputs / state changes | Negotiation entries; Agreement record; Deal → *Agreement*. |
| Backend / API dependencies | Negotiations and agreements — AUD §4. |
| Errors / edge cases | Simultaneous counters (server ordering); one party confirms and the other counters; downloadable vs in-app agreement undecided (DEC-035). |
| Security / privacy | Participant-only (NEG-005). |
| Acceptance criteria | AC-029, AC-006. |
| Status / evidence | NEG-001 **PAR**; NEG-005 **PAR**; AGR-001 **PAR**; NEG-002…004 **UNV**. |
| Release | **R1** (investment-type terms R2/PA). |

### FEAT-020 — Milestones and progress updates
| Element | Specification |
|---|---|
| Purpose | Track staged delivery and (simulated) funding release (MPS §14.2). |
| Roles | Founder (define, mark complete); counterparty (confirm, flag Disputed). |
| Preconditions | Deal at *Agreement*; milestones defined by the Founder. |
| Inputs / data | Description, BDT amount, sequence; progress updates (author, content, optional attachment); completion notes/evidence. |
| Functional behaviour | Statuses Pending / In Progress / Completed / Disputed (MIL-002); Founder **Mark Complete** with notes; counterparty separately **Confirm** — both timestamped and logged; next milestone unlocks only after confirmation (MIL-003); either party may flag **Disputed** (MIL-004); last confirmation → Deal Completed, archived, feedback prompt (MIL-006); present amounts and statuses in order with text labels (MIL-010). |
| Business rules / validation | A milestone moves the Deal forward only when Completed; "release" is a **status change only** — no real payment, escrow or custody (MIL-007); amounts carry "Simulated"; funding timing (milestones) is not conflated with the return model (MIL-008); counterparty approval of the milestone structure undecided (DEC-014). |
| Outputs / state changes | Milestone state history; Deal state progress; notifications. |
| Backend / API dependencies | New Node.js Deal/milestone services and REST contract; legacy milestone evidence is historical only (MIL-007, G-01). |
| Errors / edge cases | Double-tap confirm (no auto-retry; duplicate-submission safety); dispute with no Admin workflow (status plus oversight only); unconfirmed milestone stalls Deal. |
| Security / privacy | Participant-only; read-only Admin. |
| Acceptance criteria | AC-007, AC-035. |
| Status / evidence | MIL-001/002/003 **PAR**; MIL-004/005/006/008 **UNV**; MIL-007 **PAR**. |
| Release | **R1**. |

### FEAT-021 — Investment: Micro (Profit/Loss Sharing)
| Element | Specification |
|---|---|
| Purpose | Small-ticket participation where the investor normally holds **no ownership** and shares in profit/loss only as agreed (MPS §15.1). |
| Roles | Investor (Small/Micro typical); Founder. |
| Preconditions | Deal in Negotiation or later; Investment Type chosen (placement PENDING USER APPROVAL — DEC-006). |
| Inputs / data | Amount (৳); agreed profit/loss-sharing terms; reporting period. |
| Functional behaviour | Select/record Micro terms in the Deal Room; show the **Profit/Loss Sharing Summary** (agreed terms, reporting period, profit received to date, "No distributable profit may mean no payout this period.") (INV-006); show the persistent Risk/Disclosure Notice (INV-008); Investment Terms Summary (INV-009). |
| Business rules / validation | Terms are deal-specific and recorded in the Deal Room — never a platform-wide percentage (INV-002, INV-007); profit is not guaranteed; loss sharing only if explicitly agreed (NEG-004); sample figures (5%, ৳40,000 pool → ৳2,000) are illustrative only and never defaults; the platform never calculates or invents payouts (INV-010, AI-017); platform-wide min/max per type undecided (DEC-011); an ILS minimum-contribution example is not a rule. |
| Outputs / state changes | Recorded terms on the Deal; distributions: undefined. |
| Backend / API dependencies | Unknown — AUD silent (DEP-004, H-09). |
| Errors / edge cases | Founder enables only Large; investor switches type mid-deal (requires renegotiation). |
| Security / privacy | Participant-only; "Simulated" labelling. |
| Acceptance criteria | AC-008 (labelling); AC-014 (copy audit) · *FEAT-021-AC1:* the Micro presentation never shows equity ownership. |
| Status / evidence | INV-001…010 **UNV** (SG-09). |
| Release | **R2**. |

### FEAT-022 — Investment: Large/Standard (Equity/Ownership)
| Element | Specification |
|---|---|
| Purpose | Larger-ticket participation where the investor may receive an **agreed ownership percentage**, subject to the final contractual/legal structure (MPS §15.2). |
| Roles | Investor (Large typical); Founder. |
| Preconditions | As FEAT-021. |
| Inputs / data | Amount (৳); valuation basis where applicable; ownership %. |
| Functional behaviour | Record terms in the Deal Room; show the **Equity Ownership Summary** (agreed ownership %, valuation basis, "Ownership value may increase or decrease with business performance.") (INV-006); Risk/Disclosure Notice (INV-008); never presented as a profit-sharing treatment (INV-005). |
| Business rules / validation | Ownership is agreed, not guaranteed; equity does not mean guaranteed profit; investor eligibility, securities treatment and taxation are out of the MPS MVP and require legal review (INV-011). |
| Outputs / state changes | Recorded terms on the Deal. |
| Backend / API dependencies | Unknown — AUD silent (DEP-004, H-09). |
| Errors / edge cases | Business enabling both types; terms changed after Agreement (renegotiate). |
| Security / privacy | Participant-only; "Simulated". |
| Acceptance criteria | AC-008, AC-014. |
| Status / evidence | INV-003/005/006/008/009 **UNV**. |
| Release | **R2**. |

### FEAT-023 — Financial transparency and periodic reporting
| Element | Specification |
|---|---|
| Purpose | Make misreporting harder, more visible and reviewable — never claim fraud-proof reporting (MPS §15.4–§15.5). |
| Roles | Founder (submit); Investor on a funded deal (view); Admin (review). |
| Preconditions | Deal at *Milestone Funding Active* (FIN-007). |
| Inputs / data | Reporting period; revenue; expenses; optional cash position; notes; supporting evidence files (multi-file). Cadence undecided (DEC-012). |
| Functional behaviour | Founder submits; the platform calculates **Net Profit/Loss = Revenue − Expenses** (read-only, no typed profit field — FIN-002); status on submission is Self-Reported (no evidence) or Evidence Submitted — never higher (FIN-004); "Verified/Reviewed" reads "Reviewed by Admin" (FIN-005); submitted reports are read-only, edits create a new versioned entry with a note (FIN-006); historical reports remain visible; graphical figures always have a text equivalent (FIN-010). |
| Business rules / validation | Late/missing report handling undefined — none invented (FIN-012); evidence follows the same stage/NDA gating, encryption and audit logging as Stage 3/4 documents (FIN-009); persistent "Simulated" label. |
| Outputs / state changes | Versioned report; evidence records; audit entries. |
| Backend / API dependencies | Financial reports, evidence, discrepancies, audit records, participant and admin views — AUD §4 (COMPLETE core / not runtime verified); history pagination (DEP-010). |
| Errors / edge cases | Evidence upload failure; edit after submission; Founder reports before funding active (refused). |
| Security / privacy | Confidential; viewer opens evidence only through the authorised viewer; no figures in logs (SEC-005). |
| Acceptance criteria | AC-013, AC-017. |
| Status / evidence | FIN-001 **PAR**, FIN-003 **IMP**; FIN-002/004…006/009…011 **UNV**. |
| Release | **R2**. |

### FEAT-024 — Investor discrepancy flagging and Admin review
| Element | Specification |
|---|---|
| Purpose | Let an investor raise a financial-report concern and route it to Admin (MPS §15.4). |
| Roles | Investor on a funded deal (flag); Admin (investigate/resolve). |
| Preconditions | Funded Deal; a submitted report. |
| Inputs / data | Short structured reason; optional note in neutral language (never "fraud"/"scam"). |
| Functional behaviour | Flag → discrepancy status *Needs Review* and report status *Under Review* (FIN-008); Admin investigates and chooses Resolved, Disputed or leaves Under Review; may mark the report "Reviewed by Admin" or request more evidence; no penalties. |
| Business rules / validation | Discrepancy vocabulary (3 vs 4 values) and full Admin outcomes undecided (CONF-12, DEC-013); Admin never edits figures or recomputes net (ROL-007, ADM-009). |
| Outputs / state changes | Discrepancy record; report status change; audit entries. |
| Backend / API dependencies | Discrepancies, admin views — AUD §4. |
| Errors / edge cases | Duplicate flags; flag on a report already Under Review. |
| Security / privacy | Reasons visible to the parties and Admin only. |
| Acceptance criteria | AC-013. |
| Status / evidence | FIN-007 **PAR**; FIN-008 **UNV**; ADM-010 **PAR**. |
| Release | **PROPOSED R2 investor side; Admin review allocation PA under G-07/OD-10.** |

### FEAT-025 — Reputation and feedback
| Element | Specification |
|---|---|
| Purpose | Multi-sided, explainable reputation per role built from verified on-platform activity (MPS §17). |
| Roles | Founder, Investor, Professional (view/submit); Admin adjusts (R3). |
| Preconditions | A *Completed* deal for feedback. |
| Inputs / data | Feedback; verified milestone completions; deal completions; tier changes (read-only). |
| Functional behaviour | Show qualitative tier + trend, contributing factors and chronological history with the cause of each event (REP-003); submit feedback once per reviewer per deal, no self-review, no edit (REP-004). |
| Business rules / validation | Cancelled/rejected/abandoned deals neither help nor penalise — presupposes a non-completion state not defined by DLR-001 (DLR-013, CONF-28); no decay or login signal; reputation never guarantees returns or replaces financial verification status (REP-007); formula/weights undefined (REP-006). |
| Outputs / state changes | Feedback record; reputation recalculation and history entry. |
| Backend / API dependencies | Feedback/reputation services — AUD §4 (COMPLETE core); history pagination (DEP-010). |
| Errors / edge cases | Second submission refused; Professional completion signal unconfirmed (DEC-027). |
| Security / privacy | Server-enforced eligibility. |
| Acceptance criteria | AC-032. |
| Status / evidence | REP-001/002/004 **PAR**; REP-003/005…007 **UNV**. |
| Release | **R1** (REP-008/009 R3). |

### FEAT-026 — Premium (simulated)
| Element | Specification |
|---|---|
| Purpose | Simulate tiered features for Founder, Investor, Professional (MPS §18). |
| Roles | All participant roles; Admin read/adjust (DEC-008). |
| Preconditions | Authenticated. |
| Inputs / data | Plan choice (pricing, names and durations are undefined — PRM-007, DEC-008). |
| Functional behaviour | Free vs Premium feature sets per role (PRM-001…004); feature-gating only; a Premium boost may influence AI-Suggestion ranking but never hides legitimate results from Search (PRM-006). |
| Business rules / validation | No real payment processing (PRM-005); whether subscriptions are real scope with backend enforcement and whether mobile-store billing rules apply are undecided (DEC-008, DEC-048). |
| Outputs / state changes | Simulated entitlement (backend enforcement not found — AUD §4). |
| Backend / API dependencies | Premium page (UI) — AUD §4; enforcement absent. |
| Errors / edge cases | Entitlement mismatch between UI and server. |
| Security / privacy | "Simulated" labelling; no card/bank credential collection (PAY-004). |
| Acceptance criteria | AC-008. |
| Status / evidence | PRM-001…005 **PAR**; PRM-006…008 **UNV**. |
| Release | **R2**. |

### FEAT-027 — Commission and payments (simulated)
| Element | Specification |
|---|---|
| Purpose | Show the platform's simulated 3–5% commission and simulated funding records (MPS §20). |
| Roles | Participants (view); Admin (revenue). |
| Preconditions | Simulated payment/commission rules approved and PAY-007 satisfied for the independent Node.js backend. |
| Inputs / data | Server-returned payment/commission figures only. |
| Functional behaviour | Display figures exactly as returned and never compute commission, rounding or totals on the client (PAY-006). |
| Business rules / validation | Commission applies identically regardless of investment type (PAY-002), may apply per funding tranche (PAY-003); rate, payer, trigger, rounding, display undecided (PAY-005, DEC-007); all flows simulated; no real PSP, no credentials, no payouts (PAY-004). |
| Outputs / state changes | None on client. |
| Backend / API dependencies | Deal payments, platform revenue — **uncommitted working tree only** (AUD §1); idempotency, double-transition protection, rounding, reconciliation **not verified**. |
| Errors / edge cases | Branch changes contracts; duplicate processing. |
| Security / privacy | No payment credentials in the app. |
| Acceptance criteria | AC-008, AC-016. |
| Status / evidence | PAY-001 **PAR**; others **UNV/NEW**. |
| Release | **R2** (gate PAY-007). |

### FEAT-028 — Deal Room messaging
| Element | Specification |
|---|---|
| Purpose | Let the two Deal participants communicate inside the Deal Room (MPS §14). |
| Roles | Deal participants; Admin read-only oversight. |
| Preconditions | Deal exists; participant. |
| Inputs / data | Message text; attachments (undecided). |
| Functional behaviour | Send and read messages; history server-paginated (MSG-004, MOB-075). Delivery model (real-time vs polling), attachments, read receipts, moderation are undecided (DEC-010, CONF-11). |
| Business rules / validation | No scanning, contact-detail detection or blocking of phone/email — ever in the MPS MVP (MSG-003); "basic messaging" in the Free tier is undefined relative to Deal Room chat (MSG-002). |
| Outputs / state changes | Message records; notifications. |
| Backend / API dependencies | Deal messages and participant authorisation — AUD §2, §4. |
| Errors / edge cases | Send failure (no silent duplicate; no auto-retry of a send); very long history. |
| Security / privacy | Participant-only; follows Deal Room gating. |
| Acceptance criteria | AC-030. |
| Status / evidence | MSG-001/004 **IMP**; MSG-002/003 **UNV**. |
| Release | **R1**. |

### FEAT-029 — Notifications (in-app and push)
| Element | Specification |
|---|---|
| Purpose | Inform users of events relevant to them (MPS §7(18)). |
| Roles | Participants (in-app R1); Admin inbox not implemented (NTF-001-A). |
| Preconditions | Authenticated; push needs device registration. |
| Inputs / data | Server notification events and user preferences. |
| Functional behaviour | In-app notification centre with unread count and detail (NTF-001); preferences as the server holds them (NTF-004); the **implemented event set is extracted from the repository, not invented** (NTF-002); push (R2): device registration and token lifecycle (MOB-080) with generic lock-screen text (NTF-003); notification deep links re-run server authorisation and show a neutral state if inaccessible (MOB-081). |
| Business rules / validation | Opt-out semantics, quiet hours, per-channel control undecided (DEC-009). |
| Outputs / state changes | Read/unread state; device token record (push). |
| Backend / API dependencies | Participant notifications/preferences — AUD §4; push infrastructure not mentioned (DEP-005, DEP-007(b)). |
| Errors / edge cases | Push permission denied (app still works); stale link target. |
| Security / privacy | No confidential business/financial detail on the lock screen (SEC-008). |
| Acceptance criteria | AC-031. |
| Status / evidence | NTF-001 **PAR**; NTF-001-A **MIS**; NTF-003 **NEW**; NTF-002 **UNV**. |
| Release | **R1** in-app; **R2** push. |

### FEAT-030 — Dashboards
| Element | Specification |
|---|---|
| Purpose | Give each active role an overview and next actions (UXP §6.1). |
| Roles | Founder, Investor, Professional; Admin through the separate Web Admin Dashboard. Tier 1 verification review is required in R1; all other minimum/full Admin inventory remains OD-10/G-07 PENDING. |
| Preconditions | Authenticated; active role set. |
| Inputs / data | Role metrics (DSH-002): Founder Readiness Score, Active Connections, Deal Rooms Open, Profile Views (undefined — DSH-003); Investor Active Deal Rooms (portfolio-linked metrics R2); Professional Active Applications, Deal Rooms, Avg. Match Score. |
| Functional behaviour | Provide verification tier and completeness, metrics, primary work list, recent activity, AI Suggestions top 3 and Deal Rooms in progress, notifications preview (DSH-001); show an onboarding checklist for <20% completeness (DSH-004); show next actions and workflow position (DSH-005). |
| Business rules / validation | Metrics without a defined calculation or backing entity (Profile Views, Portfolio Value, Saved Opportunities) are not shown until defined (DEC-040). |
| Outputs / state changes | None. |
| Backend / API dependencies | Aggregations of existing domains — AUD §4; unpaginated aggregates risk (AUD-D07). |
| Errors / edge cases | Partial data failure (show what loads; no false zeros). |
| Security / privacy | Only the active role's data (SEC-007). |
| Acceptance criteria | AC-034, AC-001. |
| Status / evidence | DSH-002 **PAR**; DSH-001/003/004 **UNV/NEW**. |
| Release | **R1**; DSH-002-B R2. |

### FEAT-031 — Admin oversight
| Element | Specification |
|---|---|
| Purpose | Governance, trust, verification and risk control — not a CRUD dashboard (MPS §19). |
| Roles | Admin only (provisioned internally). Mobile scope PENDING USER APPROVAL (DEC-004). |
| Preconditions | Admin authentication ("elevated auth" meaning undefined — DEC-038). |
| Inputs / data | Entity selections; decisions with required reasons. |
| Functional behaviour | Users (list/search/filter, view, suspend/restore audited — ADM-003); Verification queue (Approve/Reject/Request More Info with reason surfaced to the applicant — ADM-004); Businesses (flag, suspend listing, never edit content — ADM-005); Deals and Investments (view, Escalate only — ADM-007/008); Financial Reports review and Discrepancies (ADM-009/010); Reputation/Premium oversight; Audit Logs (read-only, immutable, searchable — ADM-013); Analytics (ADM-014); Settings (ADM-015). |
| Business rules / validation | Admin never edits revenue/expenses, recomputes net, alters agreed terms, fabricates evidence or executes/settles an investment (ROL-007, ADM-018); no staff-tier RBAC, matching-rule or notification-template administration exists (ADM-015, MIS). |
| Outputs / state changes | Status changes with logged reasons; escalations. |
| Backend / API dependencies | Paginated user directory, business/verification governance, admin insights — AUD §4; Admin notification inbox absent (DEP-013). |
| Errors / edge cases | Target-resource authorisation; collections unpaginated (AUD-D04). |
| Security / privacy | Server-side Admin check on every request; no bypass of RBAC/stage/NDA gating; Admin visibility of confidential content limited (ROL-006). |
| Acceptance criteria | To be authored when DEC-004 is decided (§21.2). |
| Status / evidence | ADM-004 is a **NEW R1 requirement** under approved OD-03; legacy evidence for other Admin functions remains historical. ADM-015 and the exact minimum/full inventory remain unresolved. |
| Release | **R1: ADM-004 Tier 1 review minimum. Other Admin functions: PA under OD-10 and G-07.** |

### FEAT-032 — Audit logging, privacy and security controls
| Element | Specification |
|---|---|
| Purpose | Protect confidential data and keep sensitive actions traceable (MPS §12, §28–§29). |
| Roles | All; Admin reads logs. |
| Preconditions | n/a |
| Inputs / data | Server events: document views/downloads, verification decisions, deal status changes, financial report edits, discrepancy resolutions. |
| Functional behaviour | The client never bypasses server authorisation (SEC-002); treats every denial as final; opens documents only via authorised calls (MOB-064); requests permissions just-in-time with purpose text (PRV-004); shows consent at registration (PRV-001); applies the prohibited-claim list to all copy (§13.5). |
| Business rules / validation | RBAC + Stage-Based Access Control + NDA gate enforced server-side for every client type (ROL-001); no secrets in the app (SEC-004); no sensitive data in logs/analytics (SEC-005); workspace isolation (SEC-007). |
| Outputs / state changes | Server audit records. |
| Backend / API dependencies | Policies and audit-log models — AUD §6, §8; production headers/TLS/CSP unverified (SEC-013). |
| Errors / edge cases | Offline; throttling; unknown link scheme (only http/https opened — SEC-011). |
| Security / privacy | Third-party AI processing disclosure (PRV-005); data retention/deletion consideration (PRV-003, DEC-026). |
| Acceptance criteria | AC-014, AC-017; TST-009. |
| Status / evidence | SEC-002/003 **PAR**; PRV-002 **PAR**; SEC-010/013 **UNV**. |
| Release | **R1**. |

### FEAT-033 — Mobile platform capabilities
| Element | Specification |
|---|---|
| Purpose | Native behaviours the web app does not need (§12). |
| Roles | All. |
| Preconditions | Chosen stack supports each capability (ARC-023). |
| Inputs / data | Camera/gallery, files, device token, links, app version. |
| Functional behaviour | Secure credential storage (MOB-011); connectivity states and no auto-retry of state-changing requests (MOB-020); encrypted unsent drafts cleared on logout/account switch (MOB-050); uploads with progress/cancel/retry (MOB-062); forced-update screen on unsupported API version (MOB-070); bounded lists (MOB-075); optional app-switcher obscuring of sensitive screens (MOB-012); push and deep links (R2); account deletion/data-removal flow (AUTH-014, DEC-026). |
| Business rules / validation | Language, device matrix, telemetry, store posture are undecided (DEC-049…051, DEC-048). |
| Outputs / state changes | Local encrypted drafts; device registration. |
| Backend / API dependencies | Force-update signal, push, account deletion — not mentioned by the audit (DEP-005, DEP-008, DEP-009). |
| Errors / edge cases | Offline; permission denied; unsupported version. |
| Security / privacy | No credential, token, ID image or financial figure in logs/crash reports (SEC-005). |
| Acceptance criteria | AC-002, AC-011, AC-012, AC-017, AC-035. |
| Status / evidence | MOB-* **NEW**; backend support **UNV**. |
| Release | **R1** (push/links R2; some PA). |

---

### FEAT-034 — Business Role Assignment & Permission System
| Element | Specification |
|---|---|
| Purpose | Let a Founder build a Business team through accepted membership and least-privilege Business-scoped roles. |
| Roles | Founder; Skilled Professional as Finance Manager, Business Manager, Project Manager or restricted Custom Role. |
| Preconditions | Authenticated Founder owns the Business; Professional account exists; invitation acceptance precedes activation. |
| Inputs / data | Business, invitee, proposed role(s), granular permissions, optional Deal delegation, assignments. |
| Functional behaviour | Invite/hire → accept → active membership → grant/change/revoke permissions → assigned Team Workspace; Finance Manager may negotiate and draft versioned proposals only within an explicit Deal grant. |
| Business rules / validation | No global-role conversion; Business/resource/action/Deal scoping; default deny; Founder-only final Founder-side confirmation; independent Investor confirmation; unrelated Business memberships preserved. |
| Outputs / state changes | Invitation/membership/grant/delegation/proposal versions and audit events. |
| Backend / API dependencies | New authorization and audit capabilities; DEP-019/020. |
| Errors / edge cases | Pending/expired/withdrawn invitation; conflicting roles; revoked membership; concurrent proposal; cross-Business identifier. Detailed policies remain BR-DEC-001…012 PENDING. |
| Security / privacy | Current-state server authorization; immediate subsequent denial; historical access PENDING. |
| Acceptance criteria | AC-036…038; TST-015/016. |
| Status / evidence | **NEW; not implemented or tested.** |
| Release | **PA (BR-DEC-012; G-07).** |

### FEAT-035 — Unified Messaging & Communication System
| Element | Specification |
|---|---|
| Purpose | Provide one secure Messages experience for Hiring, Deals and Business Teams. |
| Roles | Founder, Investor, Professional; delegated Finance Manager only within an explicit Deal; Admin has no default private-message access. |
| Preconditions | Authentication plus category-specific authorization; Team requires accepted membership; Deal requires participant/delegate authority and disclosure/NDA compliance. |
| Inputs / data | Conversation category/context, participants, text, authorized search, unread state and notification metadata. |
| Functional behaviour | All/Hiring/Deals/Team inbox → safe previews/unread/search → authorized chat; Hiring Chat grants no membership; Team Chat is Business-isolated; Deal Chat supports identified delegated Finance Manager participation. |
| Business rules / validation | Each discover/list/read/send/preview/search/unread/notification/join/leave action is server-authorized; chat never finalizes NDA or agreement; formal Founder and Investor confirmations remain separate. |
| Outputs / state changes | Messages, unread state and minimized notifications; no Deal-state transition from free text. |
| Backend / API dependencies | New messaging authorization/search/notification capabilities; DEP-019/021. |
| Errors / edge cases | Revocation, stale cache, wrong Business/Deal, unauthorized NDA stage, unsafe preview. Delivery, receipts, attachments, retention, deletion and moderation remain PENDING. |
| Security / privacy | No cross-Business leakage; protected fields omitted; generic notifications; no default Admin access. |
| Acceptance criteria | AC-039…041; TST-017/018. |
| Status / evidence | **NEW; not implemented or tested.** Legacy Deal messages are historical evidence only. |
| Release | **PA (MSG-DEC-013; G-07; DEC-010).** |

## Appendix K — Item-Level Traceability (review finding F-05)

> Proves, item by item, that every MPS §25.1 Must-Have (21 items), §7 functional area (18), §25.2 Should-Have (6) and §27 Future-Scope item is represented. "Domain status" is the static audit's observation (§7.1), **not** a rule-level grade (§1.4). Columns A/B/C show the proposed release under DEC-034 Options A/B/C; Option C is role-phased (**I**nvestor-first, **F**ounder, **P**rofessional, **Ad**min last). **All allocations are PROPOSED, PENDING USER APPROVAL.**

### K.1 MPS §25.1 — the 21 Must-Have items

| # | MPS §25.1 Must-Have | v2.1 requirement IDs | Feature | Domain status (AUD) | Opt. A | Opt. B | Opt. C |
|---|---|---|---|---|---|---|---|
| 1 | User authentication and role-based profiles | AUTH-001…020, ROL-001…007, PRO-001…010 | FEAT-001…007 | IMP (domain); transport MIS | R1 | R1 | All roles |
| 2 | Founder business submission | BIZ-001…012 | FEAT-009, 010 | IMP (domain) | R1 | R1 | F |
| 3 | Investor opportunity/preference profiles | PRO-002, PRO-003, PRO-009 | FEAT-006 | IMP (domain); type interest UNV | R1 (PRO-003 PA) | R1 | I |
| 4 | Skilled professional profiles | PRO-004 | FEAT-007 | IMP (domain) | R1 | R1 | P |
| 5 | Search and Advanced Filtering (per role) | DSC-001…015 | FEAT-011 | UNV (facets) | R1 | R1 | per role |
| 6 | AI Business Analysis / Investor Readiness Score (rule-based) | AI-001…007, AI-020…029 | FEAT-012, 014 | IMP (deterministic); Gemini foundation | R1 (insights PA) | R1 | F |
| 7 | AI Matching Engine (F↔I, F↔P) | AI-010…013, AI-016, AI-017 | FEAT-013 | IMP backend / PAR frontend | R1 | R1 | per role |
| 8 | AI Suggestions | AI-014, DSC-010 | FEAT-013 | IMP (endpoints) | R1 | R1 | per role |
| 9 | Staged Information Disclosure (4 stages) | DIS-001…016, ROL-004/005, WF-005 | FEAT-016 | IMP (domain) | R1 | R1 | per role |
| 10 | NDA workflow | DIS-005…007, WF-005 | FEAT-017 | IMP (domain) | R1 | R1 | per role |
| 11 | Deal Room (documents, chat, negotiation, agreement templates, milestones) | DLR-001…014, NEG-001/005, AGR-001/002, MSG-001…004, MIL-001…010 | FEAT-018…020, 028 | IMP (core) | R1 | R1 | per role |
| 12 | Investment type selection (Micro / Large-Standard) with terms recorded per deal | INV-001…010, BIZ-004, NEG-002…004, DSC-004, PRO-003 | FEAT-021, 022 | **UNV** (audit silent) | R2 | R1 | I first |
| 13 | Financial transparency & reporting layer | FIN-001…012 | FEAT-023 | IMP (core) / not runtime verified | R2 | R1 | F/I |
| 14 | Investor discrepancy flagging with basic Admin review | FIN-007/008, ADM-010 | FEAT-024 | Legacy domain evidence only | Proposed R2; Admin allocation PA under G-07/OD-10 | R1 proposal subject to decisions | I |
| 15 | Milestone-based investment simulation and progress tracking | MIL-001…010, PAY-009 | FEAT-020 | PAR (simulation; payments uncommitted) | R1 (milestones) | R1 | per role |
| 16 | Reputation system (basic, rule-based) | REP-001…009 | FEAT-025 | IMP (core) | R1 | R1 | per role |
| 17 | Tiered Verification (Tier 0–2, manual Tier 1/2 review) | VER-001…008, ADM-004 | FEAT-008 | Legacy domain evidence; new system unimplemented | **R1 user side + separate Web Admin Tier 1 review (OD-03); exact remainder OD-10 PA** | R1 proposal subject to G-07 | per role |
| 18 | Premium subscription simulation | PRM-001…008 | FEAT-026 | PAR (UI only) | R2 | R1 | per role |
| 19 | Admin dashboard (users, verification, businesses, deals, investment/financial oversight, audit logs) | ADM-001…018 | FEAT-031 | IMP core / PAR / MIS parts | R3 (DEC-004) | R3 | Ad |
| 20 | Basic audit logging for sensitive document access and financial report changes | DIS-011, SEC-003, FIN-006/009, ADM-013, NFR-008 | FEAT-032 | PAR (models exist) | R1 (documents); R2 (financial) | R1 | per role |
| 21 | Notifications (basic) | NTF-001…005, MOB-080/081 | FEAT-029 | PAR | R1 in-app; R2 push | R1 | per role |

**Coverage result.** All 21 items map to at least one v2.1 requirement. **Under Option A, R1 does not deliver items 12, 13, 14, 18, 19 and part of 20/21; therefore R1 ≠ the MPS MVP.** Under Option B, every participant-facing item is in R1 and only item 19 (Admin) follows. Under Option C each role phase delivers that role's items.

### K.2 MPS §7 — the 18 functional areas

| # | MPS §7 area | v2.1 IDs | # | MPS §7 area | v2.1 IDs |
|---|---|---|---|---|---|
| 1 | Authentication and role-based profiles | AUTH, ROL, PRO | 10 | NDA workflow | DIS-005…007 |
| 2 | Business submission and management | BIZ | 11 | Deal Room | DLR, NEG, AGR, MSG, MIL |
| 3 | Investor preference/opportunity profiles | PRO-002/003/009 | 12 | Investment model (Micro; Large/Standard) | INV |
| 4 | Skilled professional profiles | PRO-004 | 13 | Financial transparency & reporting | FIN |
| 5 | Search and Advanced Filtering | DSC | 14 | Milestone-based simulation | MIL, PAY-009 |
| 6 | AI Business Analysis and Readiness Score | AI-001…007, AI-020…029 | 15 | Reputation & tiered Verification | REP, VER |
| 7 | AI Matching Engine | AI-010…013 | 16 | Premium simulation | PRM |
| 8 | AI Suggestions | AI-014, DSC-010 | 17 | Admin dashboard, oversight, audit | ADM, NFR-008 |
| 9 | Staged Disclosure (4 stages) | DIS-001…004, 008…016 | 18 | Notifications | NTF |

### K.3 MPS §25.2 Should-Have and §27 Future Scope

| MPS item | v2.1 IDs | Proposed release |
|---|---|---|
| Reverse Investment Discovery | PRO-009 | R3 (DEC-018) |
| Portfolio dashboard (per-investment financial/verification visibility) | PTF-001…003, DSH-002-B | R2 |
| Saved searches / alerts | DSC-015, NTF-005 | R3 |
| Basic dispute reporting to Admin | ADM-011 | R3 |
| Deal Room meeting scheduling | DLR-010 | R3 |
| Profile/reputation analytics views | REP-009 | R3 |
| §27 Future Scope (ML ranking, NLP pitch-deck analysis, learned weights, vector stores, fairness tooling, real payments/escrow, etc.) | §4.2, AI-040 | Not scheduled (N/A) |

### K.4 Owner-brief functional coverage checklist (brief §3)

| Brief §3 area | v2.1 features / IDs |
|---|---|
| Authentication and account management | FEAT-001…003; AUTH-* |
| Founder / Investor (Micro, Large) / Professional / Admin functionality | FEAT-005…007, 021, 022, 031 |
| Multi-role enrollment and active-role switching | FEAT-004; ROL-003, MOB-002/101 |
| User profiles and verification | FEAT-005…008 |
| Business creation and management | FEAT-009, 010 |
| Discovery, filtering, matching | FEAT-011, 013 |
| AI readiness scoring and AI-assisted insights | FEAT-012, 014 |
| Connection requests and applications | FEAT-015 |
| NDA and staged disclosure | FEAT-016, 017 |
| Deal Room and negotiations; agreements and milestones | FEAT-018…020 |
| Investment types and workflows; Micro simulation; Large equity-related | FEAT-021, 022 |
| Financial transparency; investor discrepancy reporting | FEAT-023, 024 |
| Reputation and feedback | FEAT-025 |
| Premium; commission and payment | FEAT-026, 027 |
| Messaging and notifications | FEAT-028, 029 |
| Administrative oversight | FEAT-031 |
| Privacy, authorization, security, audit logging | FEAT-032, §13 |
| Mobile-specific capabilities | FEAT-033, §12 |

**Items in v2.1 with no MPS ancestor** (not invented MPS requirements): MOB-*, ARC-0nn mobile rows, API-*, PERF-*, LOAD-*, TST-*, AUTH-012/012-D/013, AUTH-016…020, AI-020…029 (audit-observed), PAY-006/007, DSC-009. They are marked `NEW`/`UNV` with proposed priority.

### K.5 Revision 6 feature-decision traceability

| Decision cards | Requirements / workflows / features | Security, tests and access points |
|---|---|---|
| BR-DEC-001…005 | BRM-001…006; WF-014; FEAT-034 | SEC-016/017; API-014; TST-015; SCR-035 |
| BR-DEC-006…008 | BRM-007…011; WF-015/017; FEAT-034 | API-015; TST-016; SCR-035/039 |
| BR-DEC-009…012 | BRM-012…015; FEAT-034 | SEC-017/018; AC-038; DEP-020; release PA |
| MSG-DEC-001…004 | UMSG-001…005; WF-016; FEAT-035 | SCR-036…038; AC-039/040 |
| MSG-DEC-005…009 | UMSG-006…010; WF-015/016; FEAT-035 | API-016; TST-017/018; SCR-039 |
| MSG-DEC-010…013 | UMSG-011…013; FEAT-035 | PRV-006; DEP-021; release PA |
| DEC-010 | MSG-001; UMSG-011/012; FEAT-035 | Delivery, attachments, receipts and moderation remain PENDING |

All 12 BR cards and all 13 MSG cards remain PENDING. Traceability expresses dependencies, not approval.

**Card-by-card coverage:** BR-DEC-001, BR-DEC-002, BR-DEC-003, BR-DEC-004, BR-DEC-005, BR-DEC-006, BR-DEC-007, BR-DEC-008, BR-DEC-009, BR-DEC-010, BR-DEC-011, BR-DEC-012; MSG-DEC-001, MSG-DEC-002, MSG-DEC-003, MSG-DEC-004, MSG-DEC-005, MSG-DEC-006, MSG-DEC-007, MSG-DEC-008, MSG-DEC-009, MSG-DEC-010, MSG-DEC-011, MSG-DEC-012, MSG-DEC-013. Each card is referenced by its grouped row above and by the corresponding normative BRM/UMSG requirement; none is approved here.

---

## Appendix L — Final-Review Findings Resolution (F-01 … F-24)

> Source: *Final Independent Review Report* (FRR). "Addressed in document" = corrected in this edition. "Open — decision" / "Open — verification" = cannot be closed by documentation. No finding is marked closed on the strength of an unapproved decision.

| Finding | Sev. | Resolution in v2.1 | Location | Remaining |
|---|---|---|---|---|
| **F-01** Mobile authentication undecided/unproven | Critical | Decision brief with options A/B/C, risks, evidence (H-05/TST-006) and a marked proposal; session-policy gap closed (F-10); Expo feasibility criteria. **Not decided here.** | §19.1.1 DEC-003; §5.3; §5.4; ARC-024 | **Open — decision and verification** |
| **F-02** Backend baseline unpinned; R1 entangled with payment branch | Critical | **Historical v2.1 treatment retained as review evidence. Current resolution:** G-01 / DEC-046 excludes legacy code/branch reuse; DEP-001, MIL-007 and PAY-007 now require an independent new-backend baseline and verification rather than legacy merge/tests. | §5; DEP-001; MIL-007; PAY-007 | Legacy issue closed by architecture boundary; new implementation/verification not yet authorized |
| **F-03** IMP over-graded | High | Strict IMP definition; 45 rows regraded; ledger. | §1.4; NFR-E01; App. D.2 | Addressed in document |
| **F-04** R1 gates omit decisions | High | Gates rebuilt from cited decisions; DEC-022/DEC-047 promoted; computed consistency check. | §21.2; §19; App. F.3 | Addressed in document (decisions still open) |
| **F-05** No item-level traceability | High | Appendix K: 21 Must-Haves, 18 areas, Should-Have, Future, brief checklist. | App. K | Addressed in document |
| **F-06** "Mobile MVP" naming conflict | High | Renamed Mobile Release 1; explicit non-equivalence; per-option coverage; DEC-054. | §4.4; App. K.1; CONF-33 | Open — decision (DEC-034/054) |
| **F-07** Expo/RN compatibility not addressed | High | §5.4 with ARC-022…027 and 12 DEC-022 criteria; stack not fixed. | §5.4; DEC-022 | Open — decision and proof of concept |
| **F-08** Preservation claims overstated | Med. | §1.2 narrowed; App. C narrowed; reliance on App. K. | §1.2; App. C | Addressed in document |
| **F-09** Email/reset link handling | Med. | AUTH-016/017; DEC-052; DEP-007 moved to an R1 dependency. | §8.1; §17.1; §19 | Open — decision |
| **F-10** Session lifetime/re-auth/multi-device | Med. | AUTH-018/019/020; DEC-053; H-22. | §8.1; §5.3; §19 | Open — decision |
| **F-11** Wording changes not logged | Med. | App. D.2 incl. D.2.5 (DIS-014 flagged "proposed clarification — pending approval"); NFR-E06. | App. D.2 | Addressed in document |
| **F-12** Notation violates legends | Med. | N/A added; combined values split; SCP-002 aligned with REL-003. | §1.4; App. F.2 | Addressed in document |
| **F-13** Uneven acceptance criteria | Med. | AC-020…AC-035 cover each R1 group; Admin criteria deferred to DEC-004. | §21.1 | Addressed in document (Admin deferred) |
| **F-14** No owners/sequencing | Med. | §17.3 sequencing and critical path; DEC-055; **no owners invented**. | §17.3; DEC-055 | Open — decision (owners) |
| **F-15** Unsourced cell / AI priorities | Med. | † on Admin multi-role cell; AI-020…029 priorities marked proposed. | §6.3; §11.3 | Addressed in document |
| **F-16** Large unverified share | Med. | Share stated; H-01…H-06 a condition of baseline freeze. | NFR-E05; App. H | Open — verification |
| **F-17** Duplicated statements | Low | Normative-row table. | §1.7 | Addressed |
| **F-18** Client-only rule status semantics | Low | Legend note. | §1.4 | Addressed |
| **F-19** PoC/load items could authorise development | Low | Headers state they are requirements for later, separately authorised activities (below). | §15.3; §16; App. I.3 | Addressed |
| **F-20** Performance targets untestable | Low | PERF-001…003 conditional on DEC-050/051. | §15.2 | Addressed (decision open) |
| **F-21** Navy/Cyan confirmed | Low | CONF-15 updated; palette made nonbinding by owner instruction; App. M. | CONF-15; ARC-008; App. M | Addressed |
| **F-22** Vague wording | Low | Observable conditions for AI-015 and MOB-063. | §11.2; §12 | Addressed |
| **F-23** AI insight release coupling | Low | Sentence added: AI-024/AI-025 apply under every DEC-042 option. | §11.3; DEC-042 | Addressed |
| **F-24** IMP vs "COMPLETE in code" | Low | Qualifier carried in Source cells and §7.1; legend note. | §1.4; §7.1 | Addressed |

*FRR §2.3 independence caveat stands: the review and this correction were produced by the same assistant; a human or separately-sourced reviewer should countersign.*

---

## Appendix M — Nonbinding Legacy Design References

> **Historical design reference only. Not a mobile UI implementation requirement.**
> These references are preserved for traceability. They are **not** approved mobile design decisions. Antigravity designs the mobile UI/UX independently (ARC-008) without changing functional behaviour (MOB-104).

| Legacy reference | Source | Where it appeared in v2.0 | v2.1 handling |
|---|---|---|---|
| "Direction G — Charcoal + Copper", dark default, light = warm ivory token; hex tokens | UXP §2.1; P0 line 221 | ARC-008, MOB-092, DEC-029, CONF-15 | Replaced by ARC-008/MOB-092 (design freedom); DEC-029 superseded |
| Retired Navy/Cyan palette; "cyan reserved for AI-associated content" | P0/P1 (P1 line 346) | ARC-008, CONF-15 | Confirmed stale (F-21); nonbinding |
| Typography, spacing, grid, radius, elevation, iconography, core components | UXP §2.2–§2.5 | ARC-008 | Not prescribed |
| Bottom tab bar (Dashboard · Discover · Deal Rooms · Profile · More); sidebar → tab bar | UXP §3, §11 | MOB-001, §18, App. C | Replaced by functional navigation MOB-100…104 |
| Filters in a full-screen drawer; stacked key-value card rows; three-pane → tab bar | UXP §6.3, §6.6, §10, §11 | MOB-001, DLR-004, ADM-017, SCR-011 | Functional intent only |
| Large tappable role cards at registration | UXP §7.1 | AUTH-001 | Role selection required; form is a design choice |
| Gold shield badge for verified users; shield/document-check icons; "Reviewed by Admin" tint | UXP §2.4, §9 | PRO-008, VER-007 | Two separate labelled statuses required; visuals free |
| Persistent verification chip; status chips; dots with text | UXP §3, §2.5 | VER-008, BIZ-007, MIL-010 | Tier reachable; status always has text |
| 4-segment disclosure indicator; locked-row style; locked cards | UXP §9; P6 §H | DIS-008/010, BIZ-009 | Stage shown; locked entries listed |
| 8-state stepper header; status stepper for applications; mini role stepper | UXP §10, §7.4, §14 | DLR-003, CON-003, DSH-005 | Progression visible; form free |
| Segmented control "never a dropdown" for Investment Type | UXP §6.7, §10 | NEG-003 | Selection is first step; control free |
| Radial AI gauge; copper AI accent; chart palette; no reveal animation | UXP §8, §2.5, §6.7 | AI-007, FIN-010 | Text breakdown + "Simulated" required |
| Skeleton loaders; modal-vs-screen confirmation; dismissible banner; no confetti; no infinite scroll | UXP §2.5, §8, §13 | PERF-002, DLR-009, DIS-015/016, DSC-008 | Functional intent retained (progress shown; explicit confirmation; non-blocking nudge; bounded paging) |
| Single-column dashboard with expandable Quick Info | UXP §6.1, §11 | DSH-001 | Content required; layout free |
| ≈38 screen templates / ≈68 views | UXP §4 | §18 | Functional access points only |
| WCAG contrast ratios "in both themes" | UXP §12 | MOB-091 | Accessibility target kept (WCAG 2.1 AA), theme wording removed |

---

## Appendix N — Documentation Defects vs Product Decisions vs Verification Items

| Class | Meaning | Items |
|---|---|---|
| **Documentation defect (fixed in v2.1)** | The document was wrong, inconsistent or incomplete | F-03, F-04, F-05, F-08, F-11, F-12, F-13, F-15, F-17…F-24; binding visual prescriptions (owner brief §2); missing feature-level functional detail |
| **Genuine product decision (PENDING USER APPROVAL)** | Business/product choice no source settles | DEC-034/054 (release scope and naming), DEC-006, DEC-007, DEC-008, DEC-012, DEC-013, DEC-004, DEC-042, DEC-043/044/045, DEC-017, DEC-016, DEC-005 and the rest of §19 |
| **Technical decision (PENDING USER APPROVAL)** | Engineering choice needing evidence | DEC-003, DEC-022, DEC-047, DEC-052, DEC-053, DEC-055 (G-01 / DEC-046 is APPROVED, not in this row) |
| **Runtime verification** | Cannot be settled by documentation | H-01…H-23 (Appendix H); F-01, F-02, F-07, F-16 |
| **Backend dependency (not mobile work)** | Work on the existing platform | DEP-003, DEP-010…014, DEP-016, DEP-017 |
| **Approved architecture correction (internal Edition 2.2)** | Revision 6 decisions supersede active Laravel/Admin-mobile assumptions | G-00, G-01, OD-03, OD-07; CONF-35/36; §5 |
| **New feature decisions (all PENDING)** | Detailed Business Role and Unified Messaging policy choices | BR-DEC-001…012; MSG-DEC-001…013; DEC-010 |
| **New-system dependency** | Work/specification needed for the independent Node.js system; not evidence of implementation authorization | DEP-019…022 |


*— End of document —*
