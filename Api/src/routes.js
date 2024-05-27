// routes/clienteRoutes.js

const { Router } = require('express');
const {
    getAllClientesController,
    getFinancialMetricsController,
    getClientIdController,
    getAllCitiesController,
    getAllConcetradorController,
    getAllPlanController,
    getAllStatusController,
    getTopThreePlanValuesController
  } = require('./controllers/client');
  
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger.json');
  
  const router = Router();
  
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  
  router.get('/clientes', getAllClientesController);
  router.get('/cidades',getAllCitiesController);
    router.get('/clienteId/:id', getClientIdController);
  router.get('/clientes/financial-metrics', getFinancialMetricsController);
  router.get('/clientes/top-three-plan-values', getTopThreePlanValuesController);
  router.get('/concentrador', getAllConcetradorController);
  router.get('/planos', getAllPlanController);
  router.get('/status', getAllStatusController);
  
  module.exports = router;
