## **Tokens**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Pumex uses a structured token stack to align liquidity incentives, governance, and long-term participation.

* **PMX** is the base asset and coordination token.

* **vePMX** aligns governance power with time commitment and directs emissions.

* **oPMX** is the option-style emissions instrument earned by staked liquidity.

* **bvePMX** is a voter-alignment incentive that compounds active governance participation.

---

### **Overview**

The Pumex ecosystem operates with a structured token model designed to optimize:

* liquidity incentives,

* governance alignment,

* and capital efficiency.

At the core is **PMX**, supported by a set of complementary tokens that each serve a distinct role in the Incentive Engine.

The design goal is simple:

**reward productive liquidity, align decision-making with long-term commitment, and reduce misaligned emissions behavior.**

---

## **PMX — Core Utility Token**

PMX is the primary token of the Pumex ecosystem.

#### **Key Utilities**

* **Governance access:** PMX can be locked to create vePMX and participate in emissions direction.

* **Incentive coordination:** PMX underpins emissions and value distribution mechanisms.

* **Token derivation:** aligned tokens originate from PMX locking or emissions/redemption flows.

#### **Notes**

PMX is the base asset from which governance and incentive instruments derive. It is the main coordination token across the ecosystem.

---

## **vePMX — Vote-Escrowed Governance Token**

vePMX is created by locking PMX for a user-selected duration **up to 2 years**.

Longer locks provide greater voting power, and voting power decays toward expiry unless extended.

#### **Key Utilities**

* **Gauge voting:** direct emissions toward specific pools or strategies each epoch.

* **Fee and incentive capture:** earn a pro-rata share of trading fees from voted pools and external incentives (bribes) where applicable.

* **Liquidity coordination:** shape market depth by allocating emissions to productive liquidity.

#### **Governance Mechanics**

* **Account-based voting:** voting power is determined per epoch using an account snapshot.

* **Tokenized positions:** vePMX may be represented as transferable tokenized positions, while voting and delegation are enforced at the account level for simpler UX.

* **Position management:** depending on implementation, positions may support operations such as transfer, split, or merge.

(Exact implementation details are subject to deployed contracts; the governance outcomes remain consistent.)

---

## **oPMX — Emissions and Redemption Token**

oPMX is Pumex’s emissions instrument, earned by eligible liquidity providers who:

* stake positions into gauges, and

* receive vote support during an epoch.

oPMX provides optional redemption paths designed to reduce immediate dilution pressure and improve incentive alignment.

#### **Redemption Options**

* **Redeem for PMX at a discount** (protocol-parameterized)

* **Convert to vePMX** (subject to lock conditions and protocol parameters)

#### **Why oPMX Exists**

* reduces inflationary sell pressure relative to direct emissions,

* gives LPs choice in how they realize rewards,

* ties emissions outcomes to governance alignment and protocol health.

#### **Utilization of Redemption Value**

Value generated through oPMX redemptions can be allocated (via governance configuration) to:

* PMX buybacks,

* protocol reserves,

* and/or incentives to vePMX voters.

---

## **bvePMX — Voter Incentive Token**

bvePMX is a non-liquid incentive token distributed to active vePMX voters, designed to reward ongoing governance participation.

#### **Utility**

* **Redeemable 1:1 into vePMX** under defined conditions (e.g., discounted conversion / protocol-parameterized).

* Serves as an additional incentive layer to encourage consistent voting and long-term alignment.

#### **Funding Source**

bvePMX can be funded through governance-defined mechanisms, including flows such as redemption value allocation and buyback programs.

---

### **How the Token Stack Fits Together**

* **PMX** is the base asset.

* Locking PMX produces **vePMX**, which directs emissions and earns fees/incentives.

* Staked liquidity earns **oPMX**, which can be redeemed into PMX exposure or deeper governance alignment.

* Active voting can be rewarded through **bvePMX**, reinforcing consistent participation.

Together, this token stack supports Pumex’s broader design principle:

**incentives should follow productive liquidity and long-term commitment.**