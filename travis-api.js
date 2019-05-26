import express from 'express';

import getData from './travis-controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello travis');
});

router.get('/report/:nmtId', async (req, res) => {
  getData({ ...req.params, ...req.query }).then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
});

router.get('tracks', async (req, res) => {
  res.send('Travis tracks');
});

export default router;
