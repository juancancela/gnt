require("isomorphic-fetch");
const retry = require("async-retry");
const NodeCache = require("node-cache");
const { httpRetries, cacheTTL } = require("../../props");

const cache = new NodeCache({ stdTTL: cacheTTL });

const retrieve = async (url) =>
  cache.get(url)
    ? cache.get(url)
    : await retry(
        async (bail) => {
          const res = await fetch(url);
          if (403 === res.status) {
            bail(new Error("Unauthorized"));
            return;
          }
          const value = await res.json();
          cache.set(url, value);
          return value;
        },
        {
          retries: httpRetries,
        }
      );

module.exports = {
    retrieve,
};