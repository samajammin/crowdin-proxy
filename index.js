// TODO set up for local dev only:
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

// import environment variables
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw result.error;
}

const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors')
const app = express();

// TODO limit to ethereum.org
// enable all CORS requests
app.use(cors());

// server configuration
const PORT = 8080;

app.get('/just-some-misc-health-check-endpoint', (req, res) => {
  res.send('All good');
});

app.get('/crowdin', (req, res) => {
  const key = process.env.CROWDIN_API_KEY;
  const baseURL =
    'https://api.crowdin.com/api/project/ethereumfoundation/status';

  fetch(`${baseURL}?key=${key}&json`)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.send(err);
    });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
