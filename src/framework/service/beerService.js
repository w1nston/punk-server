'use strict';
const rp = require('request-promise-native');
const NodeCache = require('node-cache');
const { logger } = require('../logger');

const BEERS = 'BEERS';

const baseUrl = 'https://api.punkapi.com/v2';

const beerServiceFactory = {
  create: () => {
    const punkCache = new NodeCache({
      stdTTL: 60,
      checkperiod: 120,
    });

    return {
      getBeers: async () => {
        let beers = punkCache.get(BEERS);

        if (!beers) {
          const options = {
            uri: `${baseUrl}/beers`,
            json: true,
          };
          beers = await rp(options).catch(error => logger.error(error));
          punkCache.set(BEERS, beers);
        }

        return beers;
      },
    };
  },
};

module.exports = { beerServiceFactory };
