## **Account-Based Voting**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Pumex uses an account-based snapshot voting system.

* Voting power is determined once per epoch and remains fixed for that epoch.

* Multiple vePMX positions are aggregated at the account level for voting.

* Rewards are tracked and claimed per lock position.

  ---

  ### **Overview**

Pumex uses an **account-based snapshot voting model** to simplify governance participation while preserving precise reward accounting.

Rather than voting per individual lock position, voting power is aggregated at the **account level**, allowing users with multiple vePMX positions to vote efficiently without managing each lock separately.

---

### **How Account-Based Voting Works**

---

### **Snapshot Timing**

At the start of each epoch:

* a snapshot records each account’s total **vePMX balance**,

* this snapshot defines voting power for the entire epoch.

Once the snapshot is taken:

* voting power is fixed,

* changes to locks during the epoch do not affect voting weight until the next epoch.

This prevents mid-epoch manipulation and ensures predictable governance outcomes.

---

### **Account-Level Voting**

Voting is performed **per account**, not per lock position.

* If a user holds multiple vePMX positions, their voting power is automatically aggregated.

* Votes are submitted once per account per epoch.

* This reduces operational complexity and improves usability.

From the voter’s perspective, governance participation remains simple regardless of how many locks they manage.

---

### **Per-Position Reward Accounting**

While voting power is aggregated at the account level, **rewards are tracked per vePMX position**.

This allows users to:

* manage multiple locks with different durations,

* claim rewards separately for each position,

* and maintain flexibility across lock strategies.

Voting simplicity and reward precision are handled independently.

---

### **Immutability and Fairness**

The snapshot-based design ensures that:

* voting power cannot be altered mid-epoch,

* governance outcomes are deterministic,

* and incentives are distributed fairly.

This structure provides strong guarantees around transparency and trustlessness without introducing unnecessary complexity.

---

### **Why This Matters**

Account-based voting allows Pumex to:

* support flexible lock strategies,

* reduce friction for active voters,

* and scale governance participation without sacrificing accuracy.

It is a key component in aligning usability with robust incentive design.

