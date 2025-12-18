## **Smart Trade Routing**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Smart Trade Routing is Pumex’s best-execution engine.

* Trades are routed based on net execution quality, not venue preference.

* The router evaluates native and approved external liquidity sources.

* Execution prioritizes price quality, slippage control, and transparency.

---

### **Overview**

Smart Trade Routing is the system responsible for delivering the **best executable outcome** for swaps on Pumex.

Rather than routing trades through a fixed path or favoring internal liquidity, the router evaluates available liquidity sources and selects the route that maximizes net output after accounting for:

* fees,

* price impact,

* and execution costs.

This venue-agnostic approach allows Pumex to function as a true **MetaDEX**, optimizing execution across the Injective ecosystem.

---

### **Liquidity Sources Evaluated**

The router evaluates eligible liquidity across:

* **Pumex-native pools**

  * Classic AMM pools

  * Concentrated liquidity pools

  * ALM-managed strategy liquidity

  * Pools with dynamic fee logic where applicable

* **Approved external venues**

  * Whitelisted DEXs

  * Integrated aggregators

  * External routes approved through governance or configuration

Only reviewed and approved external sources are considered.

---

### **How Routing Works**

At a high level, routing follows a deterministic process:

1. Discover viable routes across eligible liquidity sources.

2. Simulate execution for each route, accounting for:

   * pool fees,

   * expected price impact,

   * and estimated gas costs.

3. Rank routes by expected net output.

4. Execute the best route atomically, with:

   * minimum-receive protection,

   * and fallback to the next-best route if execution fails.

This ensures users receive predictable outcomes even in volatile conditions.

---

### **Trader Controls**

Traders retain full control over execution parameters, including:

* **Slippage tolerance**

* **Transaction deadline**

* **Native-only routing toggle** (optional)

* **Route preview**, showing:

  * hops,

  * liquidity sources,

  * and expected output

These controls allow users to balance execution quality against certainty and speed.

---

### **Fees and Neutrality**

Pumex does not add a routing surcharge.

* Traders pay only the fees embedded within the selected execution path.

* Routing decisions are venue-agnostic.

* If an external route offers superior net execution, it is selected.

This neutrality ensures routing decisions are driven purely by execution quality, not platform incentives.

---

### **Why This Matters**

#### **For Traders**

* Better price execution across fragmented liquidity.

* Reduced slippage on larger or more complex trades.

* Clear visibility into how a trade is executed.

---

#### **For Liquidity Providers and vePMX Voters**

* More volume routed through productive liquidity.

* Fees concentrate where liquidity is most effective.

* Incentives align with real usage rather than artificial flow capture.

---

### **Design Philosophy**

Smart Trade Routing treats liquidity as a **shared resource**, not a captive one.

By prioritizing execution quality over venue loyalty, Pumex improves outcomes for traders while reinforcing the incentives that reward active, efficient liquidity.

This execution-first mindset is foundational to Pumex’s role as Injective’s MetaDEX.