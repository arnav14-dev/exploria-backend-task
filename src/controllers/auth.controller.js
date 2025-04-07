// import jwt from 'jsonwebtoken';
// import { getFromCache, setInCache } from '../utils/cache.js';
// import { addLatency } from '../data/latency.js';
// import dotenv from "dotenv";
// dotenv.config();

// export const expensive = async (req, res) => {
//   const input = Number(req.query.input);
//   //Checking if input is valid or not
//   if (isNaN(input)) return res.status(400).json({ message: 'Invalid input' });

//   const start = Date.now();

//   const cached = getFromCache(input);
//   if (cached.hit) {
//     const end = Date.now();
//     addLatency(end - start);
//     return res.json({ result: cached.value, cache: 'HIT' });
//   }

//   // Simulate expensive operation
//   await new Promise((r) => setTimeout(r, 2000));
//   const result = Math.abs(Math.sin(input) * 1000) + 1 | 0;

//   setInCache(input, result);

//   const end = Date.now();
//   addLatency(end - start);

//   return res.json({ result, cache: 'MISS' });
// };

// export const login = (req, res) => {
//   const { username } = req.body;

//   if (!username) return res.status(400).json({ message: 'Username is required' });
//   const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// };

// export const logout = (req, res) => {
//   // Ideally blacklist token here
//   res.json({
//     message: "Logged out successfully (client should discard token)",
//   });
// };



import jwt from 'jsonwebtoken';
import { getFromCache, setInCache } from '../utils/cache.js';
import { addLatency } from '../data/latency.js';
import dotenv from "dotenv";
dotenv.config();

const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME;

// Expensive Operation
export const expensive = async (req, res) => {
  const input = Number(req.query.input);

  if (isNaN(input)) return res.status(400).json({ message: 'Invalid input' });

  const start = Date.now();

  const cached = getFromCache(input);
  if (cached.hit) {
    const end = Date.now();
    addLatency(end - start);
    return res.json({ result: cached.value, cache: 'HIT' });
  }

  await new Promise((r) => setTimeout(r, 2000));
  const result = Math.abs(Math.sin(input) * 1000) + 1 | 0;

  setInCache(input, result);
  const end = Date.now();
  addLatency(end - start);

  return res.json({ result, cache: 'MISS' });
};

// Login
export const login = (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ message: 'Username is required' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie(JWT_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  res.status(200).json({ message: "Login successful" });
};
// Logout
export const logout = (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: "Logged out successfully. Token cleared." });
};