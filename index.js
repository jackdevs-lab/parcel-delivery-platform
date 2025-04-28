const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Nairobi Parcel Delivery Platform API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});