import express from 'express';
import travisApi from './travis-api';

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/travis', travisApi);

app.listen(3000);
