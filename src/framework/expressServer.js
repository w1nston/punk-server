'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const schema = require('./graphql/schema');
const { typeDefinitions } = require('./graphql/schema/typeDefinitions');
const { logger } = require('./logger');

const PORT = process.env.PORT || 4000;
const GRAPHIQL_ENABLED = process.env.GRAPHIQL_ENABLED === 'true';

const createExpressServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use('/graphql', graphqlHTTP({ schema, graphiql: GRAPHIQL_ENABLED }));

  return {
    start: () => {
      app.get('/', (request, response) => {
        response.redirect('/graphql');
      });

      app.get('/typeDefinitions', (request, response) => {
        response.send({ typeDefinitions });
      });

      const server = app.listen(PORT, () => {
        logger.info(`Server started. Listening on port ${PORT}.`);
        if (process.send && typeof process.send === 'function') {
          process.send('ready');
        }
      });

      process.on('SIGINT', () => {
        logger.info('SIGINT signal received. Prepare shutdown...');

        server.close(error => {
          if (error) {
            logger.error('Failed to gracefully shutdown server!', error);
            process.exit(1);
          }
          process.exit(0);
        });
      });
    },
  };
};

module.exports = {
  createExpressServer,
};
