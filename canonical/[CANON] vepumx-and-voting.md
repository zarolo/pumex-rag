## **vePMX and Voting**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* vePMX is Pumex’s vote-escrow governance mechanism for guiding emissions and liquidity incentives.

* vePMX holders direct emissions via gauge voting and earn rewards tied to the pools or strategies they support.

* The system aligns long-term participants with protocol usage and liquidity health.

* Voting can be done manually or via delegated/automated voting strategies.

---

### **Overview**

Pumex uses a ve(3,3)-style governance model powered by **vePMX**, a vote-escrowed form of the native PMX token.

The purpose of vePMX is simple:

* align governance power with long-term commitment,

* direct emissions to productive liquidity,

* and reward voters who support active markets.

vePMX holders act as the **coordinators of liquidity** — deciding where emissions flow and earning rewards in return.

---

### **What Is vePMX?**

vePMX is obtained by **locking PMX** for a user-selected duration.

Key properties:

* **User-selectable lock duration:** locks can be set to **any duration up to 2 years**.

* **Lock duration increases voting power:** longer locks provide greater voting influence.

* **Voting power decays over time:** voting weight decreases as the lock approaches expiry unless extended.

* **Auto-relocking (optional):** users may extend locks to maintain voting power.

* **Tokenized position representation:** vePMX positions may be represented as transferable tokenized positions, while voting and delegation are managed through controlled permissions.

(Exact mechanics depend on the deployed implementation; the user-facing outcome remains: lock PMX → receive vePMX voting power.)

---

### **Lock Duration (User-Selectable)**

vePMX locks can be set to **any duration up to 2 years**. Longer locks provide greater voting power, and voting power decays as the lock approaches expiry unless extended.

Below are **common example durations** (illustrative):

(Insert table in Google Docs)

Columns:

* Lock Duration (Example)

* Relative vePMX Voting Power (Per 1 PMX Locked)

Rows:

* 1 Week: \~0.0048 vePMX per PMX

* 6 Months: 0.125 vePMX per PMX

* 1 Year: 0.25 vePMX per PMX

* 2 Years (Max): 1.00 vePMX per PMX

**Note:** These are examples to show typical choices. Users can choose any lock duration up to 2 years.

---

### **What Can vePMX Do?**

#### **Vote on Gauges**

vePMX holders vote each epoch to direct emissions toward specific pools or strategies (where supported).

* Pools receiving more votes attract more emissions.

* LPs in those pools benefit from higher incentives.

* Voters earn rewards associated with the pools they support.

---

#### **Earn Fees and Incentives**

vePMX voters can earn:

* a pro-rata share of trading fees from the pools they vote for, and

* a pro-rata share of external incentives (bribes) added by protocols.

This creates a direct incentive to vote for pools that are both active and strategically important.

---

#### **Automate Voting (Optional)**

Voting can be done manually each epoch, or automated via delegation.

Delegation allows a voter to assign their voting power to a manager or strategy, enabling:

* continuous participation without manual weekly actions,

* dynamic optimization across gauges,

* and “set-and-manage” voting behavior.

Users retain control and can change or revoke delegation.

---

### **Voting Mechanics**

#### **Manual Voting**

* Select the pools or strategies you want to support.

* Allocate your vePMX voting power across them each epoch.

---

#### **Delegated Voting**

* Assign voting power to a manager for automated participation.

* Voting weights can be optimized across gauges according to the chosen strategy.

Delegation is designed to reduce operational overhead while keeping voting transparent and reversible.

---

### **Voting APR (UI Estimate)**

The UI may display an estimated “Voting APR” per pool or strategy based on:

* total value of rewards available to voters for that epoch,

* total votes allocated to that pool/strategy,

* and PMX price (or equivalent valuation input).

A common representation is:

Voting APR \= (Total Value of Voter Rewards ÷ Total Votes) × 52 ÷ PMX Price

This is an estimate intended to help compare voting opportunities; actual results depend on:

* your vote weight,

* final epoch totals,

* and the realized reward streams.

---

### **Voting Rewards and Claiming**

When you vote for a pool or strategy and the epoch completes:

* you receive a pro-rata share of trading fees from the pools you supported,

* you receive a pro-rata share of any external incentives assigned to those gauges,

* rewards become claimable after the epoch ends.

Important:

To receive rewards for an epoch, votes must be submitted **before the epoch cutoff**.

---

### **Key Takeaway**

vePMX aligns long-term PMX holders with the health of Pumex liquidity.

By voting each epoch (manually or via delegation), vePMX holders:

* guide emissions toward productive liquidity,

* earn trading fees and incentives,

* and shape market depth across the ecosystem.

  