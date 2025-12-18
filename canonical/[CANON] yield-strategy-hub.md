**Yield Strategy Hub**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025

---

### **Summary**

* The Yield Strategy Hub is Pumex’s coordination layer for liquidity strategies, incentives, and LP flows.

* It enables strategy-first liquidity provision through Automated Liquidity Managers (ALMs).

* vePMX governance directs emissions across competing strategies rather than static pools.

* The result is a performance-driven marketplace where efficient strategies attract liquidity.

---

### **Overview**

The Yield Strategy Hub is the **strategy and execution layer** of Pumex’s liquidity system.

It acts as a central platform where:

* liquidity strategies,

* governance incentives,

* and LP capital

are dynamically coordinated.

Rather than treating liquidity as static capital, the Hub treats liquidity as an actively managed resource — deployed, adjusted, and incentivized based on market conditions and performance.

---

### **How the Yield Strategy Hub Works**

#### **Strategy Pools**

Each trading pair on Pumex can host **multiple strategies**, each operated by an **Automated Liquidity Manager (ALM)**.

* ALMs may be on-chain systems or trusted partner protocols.

* Each strategy defines its own range logic, rebalancing behavior, and risk profile.

* Strategies compete for liquidity based on performance and governance incentives.

---

#### **LP Flow**

Liquidity providers interact with the Hub through a structured flow:

1. Browse available strategies for a given pair.

2. Compare strategy parameters such as yield characteristics, fee exposure, and risk style.

3. Deposit liquidity into a chosen strategy.

4. Optionally stake the resulting position into a gauge.

5. Earn trading fees and, where applicable, emissions or oRewards.

---

#### **Automated Execution**

Once liquidity is deposited:

* the selected ALM manages rebalancing,

* adjusts price ranges,

* and handles inventory changes automatically.

This allows LPs to earn yield **without constant manual management**.

Manual liquidity provision remains available for users who prefer full control.

---

#### **vePMX Coordination**

The Yield Strategy Hub is governed through **vePMX voting**.

* vePMX voters direct emissions across strategies rather than only across pools.

* This transforms the Hub into a governance-driven yield layer.

* Strategies that demonstrate strong performance and alignment attract more emissions.

---

#### **Composable Incentives**

Protocols can:

* boost or bribe specific strategies,

* incentivize targeted liquidity behavior,

* and compete for depth using governance-aligned mechanisms.

This creates a competitive environment where incentives follow **effective liquidity**, not idle capital.

---

### **What Is an ALM?**

An **Automated Liquidity Manager (ALM)** is a system — either a protocol or an on-chain contract — that dynamically manages a liquidity position.

Instead of leaving liquidity spread passively across a full price range, an ALM:

* keeps positions within targeted, active ranges,

* adapts to market price movements,

* and applies performance-optimized strategy parameters.

On Pumex, ALMs compete on **liquidity efficiency**, forming a marketplace where capital flows toward the best-performing strategies.

---

### **Why Use the Yield Strategy Hub**

#### **Passive Income, Active Management**

LPs do not need to monitor price ranges or rebalance positions manually.

ALMs handle execution while LPs retain exposure to fees and incentives.

---

#### **Strategy Customization**

LPs can choose strategies aligned with their goals and risk appetite, including:

* narrow or wide range strategies,

* stablecoin-focused designs,

* and volatility-aware approaches.

---

#### **Competitive Strategy Marketplace**

ALMs compete based on:

* yield characteristics,

* historical performance,

* and risk-adjusted outcomes.

LPs allocate capital based on transparent strategy parameters rather than static pool assumptions.

---

#### **Staking for oRewards**

Eligible strategy positions can be staked into gauges to:

* participate in weekly emissions,

* and receive oRewards where applicable.

---

#### **Modular and Scalable**

The Yield Strategy Hub is designed to support:

* additional ALMs,

* new strategy types,

* and deeper integrations over time,

without requiring changes to the core protocol.

---

### **Position Type Comparison**

(Insert table in Google Docs)

Columns:

* Position Type

* Trading Fees

* Native Emissions

* Stake Required

Rows:

* Manual (Classic or CL): Yes / No / No

* Auto (Unstaked): No / No / No

* Auto (Staked in Gauge): No / Yes / Yes

---

### **Strategy Examples**

The Yield Strategy Hub supports strategies suited to different market conditions and risk profiles:

* **Narrow:** Focused liquidity for maximum fee capture near the market price.

* **Wide:** Broader coverage for passive exposure and volatile assets.

* **Correlated:** Optimized strategies for highly correlated pairs (e.g., ETH / wstETH).

* **Stable:** Deep liquidity within tight ranges for stable assets.

* **Single-Sided Deposit:** Enter with one asset while the strategy manages balance.

* **Custom Hooks:** Protocol-specific logic such as compliance controls, buybacks, fee adjustments, or MEV mitigation.

The Hub is **extensible by design** — new strategies and integrations can be introduced as demand evolves.

---

### **Why This Matters**

By coordinating **automation, governance, and incentives at the strategy level**, the Yield Strategy Hub transforms liquidity from a passive input into a performance-driven system.

This alignment is central to Pumex’s approach to sustainable, capital-efficient liquidity.

