## **Hooks**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Hooks are attach-once, pluggable smart contracts that extend pool behavior.

* They run custom logic before or after core pool actions without modifying immutable pool math.

* Hooks enable fees, incentives, execution logic, risk controls, and protocol-specific behavior.

* Only reviewed and approved hooks are enabled on production pools.

---

### **Overview**

Hooks are the primary extensibility mechanism in Pumex’s V4-style architecture.

A **hook** is a smart contract selected at pool creation that defines how an individual pool behaves beyond the immutable core math. Once attached, a hook **cannot be swapped**, ensuring predictable behavior and strong safety guarantees.

A single hook implementation may serve many pools.

Pumex exposes well-scoped lifecycle “touchpoints” that allow hooks to run custom logic **before or after** core pool actions, without altering pricing or accounting invariants.

---

### **Lifecycle Touchpoints**

Hooks may execute logic at the following moments:

* before / after pool initialization

* before / after adding liquidity

* before / after removing liquidity

* before / after swaps

* before / after donations

These touchpoints allow hooks to extend behavior while keeping the core AMM logic minimal and immutable.

---

### **Design Constraints**

To ensure safety and performance, hooks are expected to be:

* stateless or minimally stateful

* deterministic

* gas-aware

Reentrancy into the same pool context is blocked by the PoolManager.

---

### **Mutability and Upgrades**

#### **Immutable Attachment**

* The hook address for a pool is fixed at initialization.

* Hooks cannot be replaced after a pool is created.

This guarantees consistency for LPs and traders interacting with the pool.

---

#### **Configurable Behavior**

Production hooks ship with governance-controlled parameters, including:

* bounded configuration ranges,

* pause or no-op modes,

* emergency shutdown capabilities.

Governance can effectively disable hook behavior without modifying pool math or migrating liquidity.

---

#### **Upgrade Path**

To materially change behavior:

* a new hook is deployed,

* a new pool is created with that hook,

* incentives and liquidity can migrate.

When applicable, the app surfaces a guided **Migrate** flow to reduce friction.

---

### **What Can Hooks Do?**

Hooks enable a wide range of pool-level behavior. Below are the primary hook families supported on Pumex.

---

### **1\) Fee and Monetization Hooks**

* **Dynamic Fees:** Adjust fees based on trade impact or volatility, with a capped maximum to preserve fair execution.

* **Fee Redirects / Shares:** Route a portion of fees to vePMX voters, treasury vaults, or pool-specific destinations.

* **Rebates and Discounts:** Apply conditional fee reductions for defined cohorts (e.g., vePMX holders or high-volume traders).

---

### **2\) Liquidity Strategy Hooks**

* **Auto-Rebalancing:** Adjust ranges as price moves, including laddered or channel-based strategies.

* **Liquidity Throttles:** Slow adds or removals near sensitive levels to reduce sandwich or cliff risks.

* **IL Mitigation Schemes:** Structured mechanisms to offset impermanent loss, subject to governance policy.

---

### **3\) Order and Execution Hooks**

* **TWAMM / Streamed Orders:** Execute large trades over time to improve execution quality.

* **Limit, Stop, and Take-Profit Orders:** Non-custodial order logic encoded as receipts.

* **DCA and Auto-Roll:** Programmatic dollar-cost averaging or periodic position adjustments.

---

### **4\) Incentive Hooks**

* **In-Range Boosts:** Increase rewards for liquidity that remains active.

* **Bribe Pass-Through:** Map external incentives directly to vePMX voting or pool rewards.

* **Donation Routing:** Direct donations to LPs within the active tick range.

---

### **5\) Access and Risk Hooks**

* **Token-Gated or Allowlisted Pools:** Access control for specialized markets.

* **Circuit Breakers:** Automatic pauses during abnormal price or oracle deviations.

* **Slippage and Price-Move Caps:** Enforce transaction-level safety limits.

---

### **Featured Example: Dynamic Fee Hook**

#### **Goal**

Improve LP outcomes during volatile conditions while maintaining efficient markets.

---

#### **How It Works (High Level)**

* Tracks recent trade impact and price movement.

* Applies a dynamic fee curve that increases during high-impact periods.

* Reverts to a low base fee during calm market conditions.

* Enforces a maximum fee cap so arbitrage and price discovery remain functional.

---

#### **Why It Matters**

* Recovers more value for LPs during arbitrage-heavy periods.

* Maintains profitable arbitrage, keeping prices aligned with the broader market.

* Results in lower fees for traders during normal conditions.

Default parameters are set by governance and can be updated via timelock.

The hook supports pause or no-op modes for emergency situations.

---

### **Production Standards**

To be enabled on production pools, a hook must meet strict requirements:

* **Governance Controls:** Parameter bounds, pause/no-op modes, timelocked updates.

* **Access Control:** Least-privileged roles; no privileged drains.

* **Safety:** No reentrancy into the same pool context; robust input validation.

* **Gas:** Bounded complexity on hot paths, especially around swaps.

* **Testing and Review:** Unit and integration tests, internal review, and security analysis.

---

### **Requesting a Hook**

Teams may propose new hooks by submitting:

* a concise specification (purpose, parameters, safety model),

* test vectors and gas analysis,

* available security artifacts such as audits or formal proofs.

Approved hooks are rolled out behind feature flags and enabled for specific pools through governance.

---

### **Why Hooks Matter**

Hooks allow Pumex to evolve without fragmenting liquidity or compromising safety.

They are the mechanism through which:

* new fee models are introduced,

* incentives are refined,

* execution quality improves,

* and protocol-specific needs are met.

This extensibility is a core reason Pumex can remain adaptable while keeping its foundation stable.

