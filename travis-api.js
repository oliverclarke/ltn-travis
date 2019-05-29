import express from 'express';

import { getWebReport, getTracks } from './travis-controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello travis');
});

router.get('/report/:nmtId', async (req, res) => {
  getWebReport({ ...req.params, ...req.query }).then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
});

router.get('/tracks', async (req, res) => {
  getTracks({ ...req.params, ...req.query }).then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
});

export default router;
