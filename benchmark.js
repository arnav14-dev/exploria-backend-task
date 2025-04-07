import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

function binomialRand() {
  const n1 = Math.random();  //random number 1
  const n2 = Math.random();  //random number 2
  const z = Math.sqrt(-2 * Math.log(n1)) * Math.cos(2 * Math.PI * n2);
  const x = Math.round(5 * z + 50);
  return Math.min(Math.max(1, x), 100);
}

const jar = new CookieJar();
const client = wrapper(axios.create({ baseURL: 'http://localhost:3000/api', jar, withCredentials: true }));

const latencies = [];
let hits = 0;
let misses = 0;

async function login() {
    try {
      const res = await client.post('/login', {
        username: 'Arnav',
      });
      console.log("Logged in");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      process.exit(1);//exiting and showing error in console
    }
  }
  

async function runRequests() {
  for (let i = 1; i <= 1000; i++) {
    const input = binomialRand();
    const start = Date.now();

    try {
      const res = await client.get(`/expensive?input=${input}`);
      const end = Date.now();
      const latency = end - start;

      latencies.push(latency);

      if (res.data.cache === 'HIT') hits++;
      else misses++;

      if (i % 100 === 0) console.log(`Request ${i} done`);
    } catch (err) {
      console.error(`Error on request ${i}:`, err.response?.data || err.message);
    }
  }
}

function calculateP90() {
  latencies.sort((a, b) => a - b);
  const p90 = latencies[Math.floor(latencies.length * 0.9)];
  const avg = latencies.reduce((sum, x) => sum + x, 0) / latencies.length;

  console.log("\n Results:");
  console.log(`Total: 1000 requests`);
  console.log(`Cache HITs: ${hits}`);
  console.log(`Cache MISSes: ${misses}`);
  console.log(`Hit Ratio: ${(hits / 1000 * 100).toFixed(2)}%`);
  console.log(`Average Latency: ${avg.toFixed(2)} ms`);
  console.log(`P90 Latency: ${p90} ms`);
}

async function main() {
  await login();
  await runRequests();
  calculateP90();
}

main();