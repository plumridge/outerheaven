const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes');

const app = express()
const port = 3000;


app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}`));

