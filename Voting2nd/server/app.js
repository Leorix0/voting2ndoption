const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const qrcode = require('qrcode');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

