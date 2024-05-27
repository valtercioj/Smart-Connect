

const logger = require('../../custom/logger');
const {
  getFinancialMetrics,
  getAllClientes,
  getClientId,
  getAllCities,
  getAllConcetrador,
  getAllPlan,
  getAllStatus,
  getTopThreePlanValues

} = require('../../models');

const getClientIdController = async (req, res) => {
  try {
    const id = req.params.id;
    let cliente = await getClientId(id);
    cliente = {
      ...cliente,
      consumoDownload: cliente.consumoDownload?.toString(), 
      consumoUpload: cliente.consumoUpload?.toString() 
    };
   
    res.json(cliente);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }

}



const getAllCitiesController = async (req, res) => {
  try {
    const cities = await getAllCities();
    res.json(cities);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Erro ao buscar cidades' });
  }
};
const getAllClientesController = async (req, res) => {
  try {
    let clientes = await getAllClientes();
    clientes = clientes.map((cliente) => {
      return {
        ...cliente,
        consumoDownload: cliente.consumoDownload?.toString(), 
        consumoUpload: cliente.consumoUpload?.toString() 
      };
    });
    res.json(clientes);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};



const getFinancialMetricsController = async (req, res) => {
  try {
    const data = await getFinancialMetrics();
    res.json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao buscar métricas financeiras' });
  }
};




const getAllConcetradorController = async (req, res) => {
  try {
    const data = await getAllConcetrador();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações de concentradores' });
  }
}

const getAllPlanController = async (req, res) => {
  try {
    const data = await getAllPlan();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações de planos' });
  }
}


const getAllStatusController = async (req, res) => {
  try {
    const data = await getAllStatus();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar informações de status' });
  }
}

const getTopThreePlanValuesController = async (req,res) => {
  try {
    let data = await getTopThreePlanValues();
    data = data.map((cliente) => {
      return {
        ...cliente,
        consumoDownload: cliente.consumoDownload?.toString(), 
        consumoUpload: cliente.consumoUpload?.toString() 
      };
    });
    res.json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Erro ao buscar informações de status' });
  }
}


module.exports = {
  getAllClientesController,
  getFinancialMetricsController,
  getClientIdController,
  getAllCitiesController,
  getAllConcetradorController,
  getAllPlanController,
  getAllStatusController,
  getTopThreePlanValuesController
};
