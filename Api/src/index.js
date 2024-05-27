// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.json');
const logger = require('./custom/logger');

const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '10MB' }));

// Cors
app.use(cors());

// Rotas da API
app.use(routes);

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  logger.error(`path: ${err.path ? err.path : 'no path'} message: ${err.message}`);

  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Rota para a documentação do Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
