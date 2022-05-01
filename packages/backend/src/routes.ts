import express from 'express';
/* eslint new-cap: ["error", { "capIsNewExceptions": ["Router"] }] */
export const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ status: 'success' });
});

router.post('/login', (req, res) => {
  console.log('REQ:', req);
  res.json({ status: true, message: 'Logged in successfully', data: {} });
});
