# Exploria Backend Internship Task

This repository contains the backend internship screening task for Exploria. It includes API routes with authentication, a basic caching mechanism, and performance measurement.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- Axios
- tough-cookie (for handling sessions)
- axios-cookiejar-support (to maintain auth state)

---

## ✅ Features Implemented

- 🔐 Login / Logout API
- 🔒 Protected route to simulate an expensive function
- ⚡ Caching layer (LRU logic, max 15 entries)
- 🎲 Random input generation using binomial distribution
- 📊 1000 request benchmark with:
  - Cache HIT/MISS tracking
  - Latency measurements
  - P90 latency calculation

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/arnav14-dev/exploria-backend-task.git
cd exploria-backend-task

##Install dependencies
npm install

##Setup environment variables
##Create a .env file based on the .env.example:
cp .env.example .env



##Then, fill in the required values (like session secret).
##Start the server
node server.js


##Run the benchmark script
node benchmark.js

##This script will simulate 1000 requests, log cache hit/miss stats, and calculate latency metrics.



##📬 Contact
Feel free to reach out via  https://arnav-s-portfolio.web.app