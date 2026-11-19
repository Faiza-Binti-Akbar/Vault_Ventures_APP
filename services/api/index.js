require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Vault Ventures API is running',
  });
});

app.listen(PORT, () => {
  console.log(`Vault Ventures API is running on port ${PORT}`);
});
