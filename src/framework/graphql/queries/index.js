'use strict';
const { beerServiceFactory } = require('../../service/beerService');
const { createListOfDishes } = require('../../../use-case/createListOfDishes');

const beerService = beerServiceFactory.create();

const dishes = async () => {
  const beers = await beerService.getBeers();
  return createListOfDishes(beers);
};

module.exports = {
  dishes,
};
