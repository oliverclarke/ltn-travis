import express from 'express';

import TravisController from './travis-controller';

const router = express.Router();
const travis = new TravisController();

router.get('/', (req, res) => {
  res.send('Hello travis');
});

router.get('/report/:nmtId', async (req, res) => {
  travis.getWebReport({ ...req.params, ...req.query }).then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
});

router.get('/tracks', async (req, res) => {
  travis.getTracks({ ...req.params, ...req.query }).then((result) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  });
});

export default router;
