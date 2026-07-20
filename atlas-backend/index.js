const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', contributedGB: 12.4, earningsToday: 3.25 });
});

app.listen(port, () => {
  console.log(`ATLAS Backend running on http://localhost:${port}`);
});