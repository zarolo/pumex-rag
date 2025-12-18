## **Swap**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Pumex supports multiple swap paths optimized for different liquidity models.

* Trades are routed for best execution across classic AMMs and concentrated liquidity.

* Strategy-aware routing prioritizes deep, active liquidity.

* The system is designed to extend beyond native pools as the ecosystem evolves.

---

### **Overview**

Pumex provides both **classic** and **strategy-aware** swap experiences, designed to maximize execution quality while preserving simplicity for users.

Rather than forcing a single liquidity model, Pumex routes trades across the most effective sources available — prioritizing depth, capital efficiency, and predictable outcomes.

---

### **Classic Swap**

**Simple, full-range AMM execution**

Classic Swap offers a familiar DEX experience using:

* volatile AMM (vAMM) pools, and

* stable AMM (sAMM) pools.

This mode is ideal for users who want:

* straightforward, permissionless swaps,

* predictable behavior,

* and minimal configuration.

Liquidity in classic pools is spread across the full price range, trading simplicity for lower capital efficiency.

---

### **Concentrated Liquidity Swap**

**Strategy-aware routing through CL and ALMs**

Concentrated Liquidity Swaps route trades through:

* manual concentrated liquidity positions, and

* ALM-managed strategy vaults.

Pumex’s routing engine prioritizes liquidity that is:

* actively in range,

* capital-efficient,

* and aligned with current market conditions.

This typically results in:

* deeper effective liquidity near the market price,

* tighter spreads,

* and lower slippage, especially on volatile pairs.

The router evaluates available paths and selects the route that delivers the best executable outcome for the trader.

---

### **Strategy-Aware Routing**

Pumex routing is **liquidity-aware**, not pool-blind.

Instead of routing purely by pool size, the system considers:

* where liquidity is actively deployed,

* which strategies are optimized for the current price,

* and how trade size interacts with available depth.

This allows Pumex to extract more performance from less total capital.

---

### **Cross-DEX Aggregation (Design Direction)**

Pumex is architected to support routing beyond its own pools when appropriate.

The routing system is designed to:

* evaluate external liquidity sources,

* compare execution quality across venues,

* and incorporate approved external routes into swap execution.

This positions Pumex as a **MetaDEX** — capable of connecting native and external liquidity into a single execution path, while maintaining clear routing rules and transparency.

---

### **Why This Matters**

For traders, this means:

* better prices from the same liquidity,

* lower slippage on active markets,

* and consistent execution quality.

For LPs and vePMX voters, it means:

* more volume routed through productive liquidity,

* better fee capture,

* and stronger alignment between incentives and usage.

---

### **Key Takeaway**

Pumex swaps are not just about moving tokens.

They are about **routing trades through the most effective liquidity available**, whether that liquidity comes from classic pools, concentrated positions, or strategy-managed vaults.

This execution-first approach is foundational to Pumex’s role as Injective’s MetaDEX.