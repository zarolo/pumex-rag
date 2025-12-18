**Initiation campaign**

**Truth status:** DRAFT

**Project:** Pumex

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

**Purpose:** Pre-TGE / launch campaign to attract initial liquidity, grow community, and onboard partners through a narrative-driven, governance-aligned system.

**Public-safe:** NO (internal only)

---

## **0\) What This Campaign Is**

**Initiation** is Pumex’s pre-TGE / launch campaign. The goal is to bootstrap **real liquidity**, recruit an aligned **community**, and bring in **partners**—without relying on empty farming behavior.

It does this by rewarding actions that are **EV+ for Pumex** (depositing liquidity) while wrapping the experience in the Pumex narrative (dojos, crests, clan progression).

---

## **1\) Naming and Definitions**

* **IP — Initiation Points**

   Points earned during Initiation by completing on-protocol liquidity actions. IP converts at season end into protocol-aligned rewards (see Conversion).

* **Crests — Partner Badges**

   Claimable partner badges. One Crest per partner. A Crest gates access to a partner’s Crest Power pool.

* **Crest Power (CP)**

   Permanent governance-aligned power minted from a partner Crest’s fixed CP pool. CP aggregates into account-based voting power after conversion.

  ---

  ## **2\) Campaign Timeline**

* **Initiation duration:** 4–8 weeks

* **Claim window:** 30 days after Initiation ends (for Crest \+ CP claiming and/or final conversions)

Notes:

* Specific dates are set per campaign instance.

* Post-campaign claim window is designed to reduce urgency and allow partners to finalize eligibility lists.

  ---

  ## **3\) Earning IP (Participation Rules)**

Participants earn IP when they provide liquidity and stake it into gauges.

**IP is earned via:**

* **Strategy LP (ALM-managed) staked into a gauge**

* **Manual LP staked into a gauge**

Principle: participation requires real liquidity commitment.

---

## **4\) IP Conversion (Season End)**

At Initiation end, IP converts into two components:

* **50% oPMX**

* **50% vePMX**

* **Max-lock bonus:** \+10% bonus on the vePMX portion if max-lock is selected

Note: Conversion ratios and bonus rules are campaign parameters and should be treated as DRAFT until finalized.

---

## **5\) Partner Crests and Crest Power (CP)**

### **5.1 Crest Model**

* **One Crest per partner**

* **Each partner has a fixed CP pool** (pool size varies by partner)

Crests are designed to be simple for partners and clear for users:

* “Prove you’re part of the partner community”

* “Meet the Pumex action gate”

* “Claim your Crest and mint CP”

  ---

  ### **5.2 Eligibility to Claim a Crest \+ CP**

To claim a partner Crest and mint CP, a user must satisfy:

1. **Partner proof (required)**

   * Hold a partner token/NFT **or**

   * Appear on an approved partner snapshot list

2. **Pumex action gate (required)**

   * Stake LP into a gauge and reach the IP threshold requirement (see Defaults)

   ---

   ### **5.3 CP Minting and Conversion**

* CP is minted from the partner Crest’s CP pool at claim time.

* **CP will convert into vePMX at a defined ratio** (ratio TBD).

* CP is **not intended to be reversible**.

Reversion policy:

* CP may only be reverted in cases of **clear and obvious errors** (e.g., incorrect allowlist, misconfigured partner proof, contract bug, or admin mistake).

* Otherwise, CP is permanent to preserve governance trust and user expectations.

  ---

  ## **6\) Crest Categories (Initial Set)**

Partner and participation Crests (initial set):

* ve(3,3) DEX Crest (broad aligned voter bucket; no cap)

* DeFi Partners

* Meme Partners (token communities)

* NFT Partners (collection-gated)

* Injective Ambassadors / Bantr Participants

* Roar2Earn Participants

* Pumex Clan Members

  ---

  ## **7\) Pumex-Native LP Crests (Optional, Tiered)**

Purpose: internal gamification and progression during Initiation without impacting partner Crest CP pools.

* **LP Crest tiers:** Bronze / Silver / Gold / Shadow / Kage

* **Thresholds by IP earned (example):** 300 / 1k / 3k / 7k / 15k IP

* **Effect:** IP multipliers for the season only (no CP attached)

  * Example: \+0% / \+3% / \+6% / \+10% / \+15% IP

Optional design lever:

* progressively smaller caps at higher tiers (rarity), if needed.

  ---

  ## **8\) Claim Flow (UX)**

1. Connect wallet → **“Check eligibility”**

2. System verifies:

   * partner proof (token/NFT or snapshot list)

   * IP threshold met (action gate)

3. User clicks **“Claim Crest”**

4. Crest is issued and CP is minted from that partner’s CP pool (subject to per-wallet cap)

5. CP aggregates into account-level power and later converts into vePMX at the defined ratio (TBD)

   ---

   ## **9\) Initial Parameters (Proposed Defaults)**

These are starting values to test campaign economics and UX:

* **IP gate for Crest claim:** 300 IP

  * heuristic: ≈ $100 staked for \~3–5 days (tune to taste)

* **CP distribution among eligibles:** 60% equal / 40% IP-weighted

* **Per-wallet CP cap:** ≤ 0.3% of that Crest’s CP pool

* **Minimum stake tenure before Crest unlock (optional):** $100 staked ≥ 48–72h

* **LP Crest multipliers (seasonal):** \+0 / \+3 / \+6 / \+10 / \+15%

  ---

  ## **10\) Sybil and Abuse Approach (Lightweight)**

Initiation does not aim for heavy sybil resistance. The primary deterrent is that participation requires depositing liquidity, which is **EV+ for Pumex**.

However, “no heavy sybil” does not mean “no guardrails.” Minimal guardrails may still be used to reduce obvious abuse without adding friction, such as:

* per-wallet CP caps

* optional minimum stake tenure before Crest claim

* one Crest per partner per wallet

  ---

  ## **11\) Why This Works (Design Rationale)**

* **EV+ by construction:** earning IP requires liquidity participation.

* **Partner-friendly:** one Crest per partner, fixed pool, clear eligibility.

* **Governance-aligned:** IP converts into oPMX and vePMX; CP converts into vePMX.

* **Narrative-driven:** supports “Initiation / Crests / Clan” framing without sacrificing economic clarity.

* **Scalable:** new partners, categories, and strategies can be added over time.

  ---

  ## **12\) Remaining Open Decisions**

* **CP → vePMX conversion ratio** (must be finalized before CURRENT/CANONICAL)

* Whether a minimum stake tenure is required (recommended as optional safety valve)

* Final category list and whether any categories should be capped

