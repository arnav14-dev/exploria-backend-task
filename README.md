# Exploria Backend Internship Task

This repository contains the backend internship screening task for Exploria. It includes API routes with authentication, a basic caching mechanism, and performance measurement.

## 🔧 Tech Stack

- Node.js
- Express.js
- Axios
- tough-cookie (for handling sessions)
- axios-cookiejar-support (to maintain auth state)

---

## ✅ Features Implemented

- Login / Logout API
- Protected route to simulate an expensive function
- Caching layer with a maximum of 15 entries (LRU logic)
- Random input generation with binomial distribution
- 1000 request benchmark with:
  - Cache HIT/MISS tracking
  - Latency measurements
  - P90 latency calculation

---

## 🚀 How to Run

### 1. Clone the repo

```bash
git clone https://github.com/arnav14-dev/exploria-backend-task.git
cd exploria-backend-task
node server.js
node benchmark.js