const latencies = [];

export function addLatency(ms) {
  latencies.push(ms);
  if (latencies.length === 1000) {
    const sorted = [...latencies].sort((a, b) => a - b);
    const p90 = sorted[Math.floor(0.9 * 1000)];
    console.log(`🔥 P90 Latency after 1000 reqs: ${p90} ms`);
    latencies.length = 0; // Reset
  }
}