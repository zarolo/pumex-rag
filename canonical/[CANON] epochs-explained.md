## **Epochs Explained**

**Truth status:** CANONICAL

**Project:** Pumex

**Source:** Pumex Docs

**Owner:** Core Team

**Last updated:** 17-12-2025 (DD/MM/YYYY)

---

### **Summary**

* Epochs are the recurring cycle that governs voting, emissions, and rewards on Pumex.

* Each epoch runs for a fixed 7-day period.

* Voting power is snapshotted at the start of each epoch.

* Emissions and rewards are determined by votes submitted before the epoch begins.

  ---

  ### **Overview**

Epochs are the **operational heartbeat** of the Pumex protocol.

Every epoch coordinates:

* vePMX voting,

* emissions allocation,

* trading fee attribution,

* and incentive distribution.

This fixed cadence ensures governance decisions are predictable, transparent, and resistant to manipulation.

---

### **Epoch Timing**

Each epoch follows a consistent weekly schedule:

* **Duration:** 7 days

* **Start:** Thursday, 00:00 UTC

* **End:** Wednesday, 23:59 UTC

At the start of each epoch, a snapshot of all **vePMX account balances** is taken to determine voting power for that epoch.

---

### **What Happens During an Epoch**

---

### **1\. Snapshot**

At epoch start:

* each account’s total vePMX balance is recorded,

* voting power is fixed for the entire epoch.

Changes to locks or balances after this point do not affect voting power until the next epoch.

---

### **2\. Voting**

* Votes (manual or delegated) must be submitted **before the epoch begins**.

* These votes determine how emissions are allocated across pools or strategies for the epoch.

* Voting power is based entirely on the snapshot.

  ---

  ### **3\. Rewards Accrual**

Throughout the epoch:

* trading activity generates fees,

* incentives and emissions accrue based on vote outcomes and pool performance.

Rewards accumulate continuously but are not claimable until the epoch completes.

---

### **4\. Rewards Distribution**

At epoch end:

* rewards become claimable,

* distributions are calculated using:

  * the epoch snapshot,

  * final vote allocations,

  * and realized pool activity.

A new epoch then begins with a fresh snapshot and voting cycle.

---

### **Key Notes**

* Votes and incentives must be submitted **before epoch start** to affect that epoch.

* Accounts that do not vote for an epoch do not receive voting-related rewards for that epoch.

* All calculations reset at the start of each new epoch.

* Emissions are recalculated every epoch using the latest vote data.

  ---

  ### **Why Epochs Matter**

Epochs provide:

* deterministic governance outcomes,

* fair reward attribution,

* and a consistent rhythm for protocol participation.

They ensure that voting, incentives, and rewards remain aligned and resistant to last-minute manipulation.