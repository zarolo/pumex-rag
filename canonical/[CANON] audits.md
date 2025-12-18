## **Audits**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Pumex is built on audited DEX infrastructure and a ve(3,3) lineage with extensive third-party review.

* This page references upstream audits relevant to inherited components and documents Pumex’s audit and activation standards.

* Pumex-specific modules follow a defined audit policy before production deployment.

* Third-party ALMs and vault strategies must meet audit and operational requirements before being listed.

* Administrative controls use timelocked multisigs to provide a public review window.

---

### **Overview**

Pumex is built on audited infrastructure and established design lineages. This page provides:

* references to upstream audits relevant to inherited architecture, and

* the audit and change-control standards applied to Pumex-specific modules.

Where an upstream audit is referenced, scope and applicability are determined by the audited repo/version and the portion of the design Pumex inherits.

---

## **1\) DEX Engine (V4-Style Infrastructure)**

Pumex’s AMM/router stack derives from a V4-style architecture aligned with the PancakeSwap Infinity Core design.

Selected upstream audits:

* Hexens — View Audit (https://github.com/pancakeswap/infinity-core/blob/main/docs/audits/Hexens.pdf)

* OtterSec — View Audit (https://github.com/pancakeswap/infinity-core/blob/main/docs/audits/OtterSec.pdf)

* Zellic — View Audit (https://github.com/pancakeswap/infinity-core/blob/main/docs/audits/Zellic.pdf)

Typical scope areas include (see each report for specifics):

* PoolManager / Singleton architecture

* Hooks lifecycle and permissions model

* Router and multi-hop execution

* Core concentrated liquidity (CLAMM) logic

Note: Upstream audits do not automatically cover Pumex-specific integrations, adapters, parameters, or deployments.

---

## **2\) Codebase Lineage (ve(3,3) Stack)**

Pumex’s gauges, vote-escrow, and emissions mechanics descend from a widely used ve(3,3) family with significant community usage and third-party review.

Selected lineage audits:

Thena

* OpenZeppelin — View Audit (https://www.openzeppelin.com/news/retro-thena-audit)

* PeckShield — View Audit (https://github.com/peckshield/publications/blob/master/audit\_reports/PeckShield-Audit-Report-Thena-v1.0.pdf)

Lynex

* Paladin — View Audit (https://drive.google.com/file/d/13VG-j7E-aQHin7CoJUTlN7k\_3v\_vduuZ/view)

Note: Lineage audits support design confidence but do not replace audits for Pumex-specific modules, configurations, or deployments.

---

## **3\) Partner Strategy Requirements (ALMs and Vaults)**

All third-party Automated Liquidity Managers (ALMs) and strategy vaults listed in the Yield Strategy Hub must meet the following requirements before production enablement:

Audit coverage

* Provide an external audit for the exact strategy version being listed.

Version control and upgrades

* Use version pinning (commit hash or equivalent) and allow-list gating.

* Any strategy upgrade requires review and may require re-audit depending on change scope.

Safety operations

* Expose emergency controls (pause and/or withdraw paths where applicable).

* Provide a public incident-response contact.

Monitoring

* Undergo ongoing monitoring for TVL anomalies and abnormal rebalancing behavior.

Partners are onboarded only when these conditions are satisfied.

---

## **Audit Policy for Major Changes**

Scope includes (non-exhaustive):

* emissions logic (oPMX mechanisms, redemption routing)

* gauges and voting systems

* treasury routing and revenue flows

* router adapters and external venue integrations

* pool hooks (fee hooks, risk hooks, incentive hooks)

* vault interfaces and strategy integrations

Requirements

* Independent third-party audit prior to production deployment for material changes in scope.

Process

* Fix findings.

* Re-audit may be required for high or medium severity issues (as appropriate).

* Publish reports and summaries on this page.

Governance and activation

* Parameter changes and new module activations follow a public, timelocked process with on-chain visibility where applicable.

---

## **Multisig and Timelocks**

Administrative control is separated into two timelocked multisigs:

Core Admin Multisig

* Quorum: 4-of-7

* Timelock: 72 hours

* Governs critical changes such as:

  * ownership and upgrade controls

  * gauge and treasury routing

  * security switches and emergency controls

Operations Multisig

* Quorum: 3-of-7

* Timelock: 24 hours

* Handles routine parameters and non-critical operations.

Safety principles

* Multiple signers: no single actor can execute sensitive actions.

* Timelock delays: a public review window exists before execution.

* Transparency: admin actions are on-chain and should be communicated publicly.

* Community oversight: activity is open to monitoring.

Deployment transparency

* Multisig addresses, signer sets, quorum thresholds, and timelock configurations are published in the docs once finalized for the relevant deployment environment.

---

### **Key Takeaway**

Audits, change-control, and operational safeguards are treated as first-class requirements in Pumex. Upstream audits establish baseline confidence, while Pumex-specific modules and integrations follow a stricter audit and activation policy to support safety and transparency as the protocol evolves.

