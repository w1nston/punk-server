'use strict';
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefinitions } = require('./typeDefinitions');
const resolvers = require('../resolvers');

module.exports = makeExecutableSchema({
    typeDefs: typeDefinitions,
    resolvers,
});
