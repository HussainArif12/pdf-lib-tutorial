const fetch = require("node-fetch");

async function getBuffer(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  return arrayBuffer;
}

module.exports = getBuffer;
