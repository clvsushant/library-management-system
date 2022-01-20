const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openapi');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      `Welcome!. Please got to <a href="/api-docs">docs</a> to see swagger UI`
    );
});

app.use('/books', require('./books/router'));

module.exports = app;
