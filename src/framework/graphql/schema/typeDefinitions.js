'use strict';

const typeDefinitions = `
  type Beer {
    id: ID!
    name: String!
    description: String
    imageUrl: String
  }
  
  type Dish {
    id: ID!
    name: String!
    beer: [Beer]
  }

  type Query {
    dishes: [Dish]
  }
`;

module.exports = {
  typeDefinitions,
};
