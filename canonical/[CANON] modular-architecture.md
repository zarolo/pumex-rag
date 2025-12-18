## **Modular Architecture**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Pumex runs a V4-style, hooks-enabled concentrated-liquidity AMM.

* An immutable Core handles swap and liquidity math, while modular Hooks extend pool behavior without migrating liquidity.

* A singleton PoolManager and flash accounting keep routing fast and gas-efficient.

* Result: V3-level capital efficiency with V4-class extensibility and best-execution routing.

**TL;DR:**

V3-level capital efficiency, V4-class extensibility, and best-execution routing — delivered through a modular, upgradable architecture.

---

### **Overview**

Pumex is built as a **modular, hooks-enabled concentrated-liquidity AMM** designed to deliver:

* high capital efficiency,

* flexible and customizable pool behavior,

* and best execution across routes,

without fragmenting liquidity or forcing pool migrations.

At its core, Pumex deliberately separates **immutable math** from **upgradable logic**. This design allows the protocol to evolve and add new capabilities while keeping the most critical components minimal, stable, and secure.

---

### **Core Architecture**

#### **Immutable Core**

* Gas-optimized swap and liquidity math

* Minimal surface area

* Change-controlled and intentionally conservative

The Core is responsible only for what must never change: pricing, accounting, and system invariants.

By keeping this layer small and immutable, Pumex reduces risk while ensuring predictable execution under all conditions.

---

#### **Hooks (Modular Extensions)**

Hooks are external contracts that can execute **before or after** pool actions such as:

* pool initialization,

* adding or removing liquidity,

* swaps,

* and donations.

Hooks enable pools to:

* customize fee logic,

* implement incentives or rebates,

* trigger automated rebalancing,

* and introduce bespoke AMM behavior.

Crucially, Hooks can be upgraded, replaced, or iterated on **without migrating liquidity**, allowing innovation to happen at the edges while the Core remains stable.

---

#### **Singleton / PoolManager**

* All pools live under a single PoolManager

* Creating a pool is a state update, not a new contract deployment

* Enables cheaper pool creation and efficient multi-hop routing

This architecture materially lowers gas costs and allows the router to evaluate and execute complex routes more efficiently.

---

#### **Flash Accounting**

* Transfers are netted and settled only at the end of a route

* Redundant token transfers between hops are avoided

* Particularly effective for multi-hop and composite trades

Flash accounting ensures users pay only for the net result of a route, rather than incurring repeated transfer costs at each hop.

---

#### **Internal Accounting Primitives**

* Lightweight multi-token accounting (ERC-6909-style)

* Reduced gas costs for frequent interactions

* Improved performance for active traders and LPs

These primitives minimize overhead for common actions, making the protocol more efficient under sustained usage.

---

#### **Native Token Support**

Where supported by the chain:

* trades and LP positions can use the native gas token directly,

* unnecessary wrapping is avoided,

* and execution and transfer costs are reduced.

This improves UX and lowers friction for both traders and liquidity providers.

---

### **What Users Get**

#### **Traders**

* **Best Execution:** Routing searches Pumex pools and, where enabled per pair and governance, approved external sources to find the best available fill.

* **Tight Spreads:** Concentrated liquidity and actively managed ranges deepen liquidity near the market price.

* **Predictable Fees:** Dynamic fee caps help protect execution quality during periods of elevated volatility.

---

#### **Liquidity Providers (LPs)**

* **Concentrated Liquidity:** Allocate capital within custom price bands to achieve higher efficiency per unit of capital.

* **In-Range Farming:** Rewards accrue only when liquidity is active — no separate staking contracts required.

* **Dynamic Fee Protection:** Fees adjust in real time based on trade impact, helping offset impermanent loss during volatile market conditions.

---

#### **Protocols and Projects**

* **Gauge-Directed Emissions:** vePMX voters can be incentivized to direct emissions toward specific pools.

* **Bribes (Voting Incentives):** Protocols may add incentives to influence gauge voting outcomes.

* **Hook-Level Customization:** Protocol-specific logic can be implemented directly at the pool level without fragmenting liquidity.

---

### **Gas Efficiency and Performance**

* Singleton PoolManager reduces deployment and routing overhead.

* Flash accounting avoids redundant transfers across multi-hop routes.

* Internal accounting primitives lower gas costs for frequent interactions.

* Native token support reduces execution and transfer costs where available.

---

### **Security and Upgrade Model**

#### **Isolated Modules**

* Hooks are deployed as separate, reviewable contracts.

* The Core remains lean, conservative, and tightly controlled.

This separation limits blast radius and makes upgrades easier to reason about and audit.

---

#### **Change Control**

* Critical parameters are governed via a 4-of-7 core multisig with a timelock.

* Operational changes use a 3-of-7 operations multisig with a timelock.

This ensures transparency, predictability, and time for review before changes take effect.

---

#### **Reviews and Audits**

* All Pumex-native Hooks and modules undergo independent review before activation.

* Lineage audits, module audits, and multisig/timelock details are documented separately.

See **Audits** for full security documentation.