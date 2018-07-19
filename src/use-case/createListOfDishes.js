'use strict';
const uuidv4 = require('uuidv4');

const onlyDefined = x => x;

const addDish = (acc, beer) => dishName => {
  if (!acc[dishName]) {
    acc[dishName] = {
      id: uuidv4(),
      name: dishName,
      beer: [].concat([
        {
          id: beer.id,
          name: beer.name,
          description: beer.description,
          imageUrl: beer.image_url,
        },
      ]),
    };
  } else {
    const temp = acc[dishName];
    acc[dishName] = {
      ...temp,
      beer: temp.beer.concat([
        {
          id: beer.id,
          name: beer.name,
          description: beer.description,
          imageUrl: beer.image_url,
        },
      ]),
    };
  }
};

const createListOfDishes = beers => {
  const dishMap = beers.reduce((acc, beer) => {
    const foodPairing = beer.food_pairing.filter(onlyDefined);
    foodPairing.forEach(addDish(acc, beer));
    return acc;
  }, {});
 
  return Object.keys(dishMap).map(dishName => dishMap[dishName]);
};

module.exports = {
  createListOfDishes,
};
