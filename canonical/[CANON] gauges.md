## **Gauges**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Gauges connect liquidity provisioning with emissions distribution.

* LP positions must be staked into gauges to earn oPMX emissions.

* vePMX voters direct emissions to gauges each epoch.

* Gauges ensure emissions flow only to productive, governance-approved liquidity.

---

### **Overview**

Gauges are the mechanism that translates **governance intent into on-chain incentives**.

They act as staking and accounting contracts where eligible liquidity positions are deposited in order to receive emissions.

However, staking alone is not sufficient — emissions are distributed **only if the gauge receives vePMX vote support**.

This design ensures emissions follow demand, usage, and governance alignment.

---

### **How Gauges Work**

---

### **Staking Requirement**

To be eligible for **oPMX emissions**, liquidity providers must:

* provide liquidity to a supported pool or strategy, and

* stake their liquidity position into the corresponding gauge.

Both manual concentrated liquidity positions and supported automated strategies may be eligible, depending on pool configuration.

Unstaked positions do not receive emissions.

---

### **Vote-Directed Rewards**

Each epoch:

* vePMX holders vote to allocate emissions across available gauges,

* gauges receiving more votes are allocated a larger share of emissions,

* oPMX is distributed proportionally to staked positions within those gauges.

This creates a direct link between:

* governance decisions,

* liquidity incentives,

* and capital allocation.

---

### **Emissions and Epochs**

Gauge emissions are recalculated every epoch.

* Votes are snapshotted at epoch start.

* Emissions are allocated based on that snapshot.

* Rewards accrue during the epoch and become claimable after it ends.

This ensures emissions respond dynamically to changing governance preferences.

---

### **Why Gauges Matter**

#### **Efficient Emissions**

Gauges prevent emissions from being spread across idle or unproductive liquidity.

Only pools that receive active vePMX support receive incentives.

---

#### **Governance-Driven Liquidity**

Liquidity distribution is guided by vePMX voters rather than protocol administrators, reinforcing decentralization and alignment.

---

#### **Protocol Flexibility**

Protocols can:

* introduce incentives or bribes to attract votes to their gauges,

* compete transparently for liquidity,

* and adapt incentives without relying on fixed deals.

---

#### **LP Alignment**

LPs are encouraged to:

* stake positions,

* participate in governance (directly or via delegation),

* and align capital with strategies that voters support.

---

### **Key Takeaway**

Gauges are the bridge between **liquidity, governance, and emissions**.

They ensure that incentives are:

* intentional,

* performance-driven,

* and aligned with the long-term health of the Pumex ecosystem.

