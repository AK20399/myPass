import express from 'express';
/* eslint new-cap: ["error", { "capIsNewExceptions": ["Router"] }] */
export const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ status: 'success' });
});
