// TODO set up for local dev only:
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

// import environment variables
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw result.error;
}

const fetch = require('node-fetch');
const express = require('express');
const app = express();

// server configuration
const PORT = 8080;

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello Sam');
});

// create a route for CrowdIn
app.get('/crowdin.json', (req, res) => {
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
