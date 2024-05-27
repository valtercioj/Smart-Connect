// src/models/clientesModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getClientId = async (id) => {
  return await prisma.clientes.findUnique({
    where: {
      id: id,
    },
  });

}

const getAllClientes = async () => {
  return await prisma.clientes.findMany();
};


const getFinancialMetrics = async () => {
  const totalRevenue = await prisma.clientes.aggregate({
    _sum: {
      valorPlano: true
    }
  });

  const totalRevenueByCity = await prisma.clientes.groupBy({
    by: ['cidadeCliente'],
    _sum: {
      valorPlano: true
    }
  });

  // Formatação da receita total para reais (BRL)
  const receitaTotalEmReais = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalRevenue._sum.valorPlano);

  // Formatação da receita total por cidade para reais (BRL)
  const receitaTotalPorCidadeEmReais = totalRevenueByCity.map(item => ({
    cidade: item.cidadeCliente,
    receitaTotal: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(item._sum.valorPlano)
  }));

  return {
    receitaTotal: receitaTotalEmReais,
    receitaTotalPorCidade: receitaTotalPorCidadeEmReais
  };
};


const getAllCities = async () => {
  return await prisma.clientes.findMany({
    select: {
      cidadeCliente: true,
    },
    distinct: ['cidadeCliente']
  });
};

const getAllConcetrador = async () => {
  return await prisma.clientes.findMany({
    select: {
      nomeConcentrador: true,
    },
    distinct: ['nomeConcentrador']
  });
};

const getAllPlan = async () => {
  return await prisma.clientes.findMany({
    select: {
      planoContrato: true,
    },
    distinct: ['planoContrato']
  });
};


const getTopThreePlanValues = async () => {
  const topPlans = await prisma.clientes.findMany({
    orderBy: {
      valorPlano: 'desc',
    },
    take: 3,
    distinct: ['valorPlano']
  });
  return topPlans;
  }


const getAllStatus = async () => {
  return await prisma.clientes.findMany({
    select: {
      statusInternet: true,
    },
    distinct: ['statusInternet']
  });
};

module.exports = {
  getAllClientes,
  getFinancialMetrics,
  getClientId,
  getAllCities,
  getAllConcetrador,
  getAllPlan,
  getAllStatus,
  getTopThreePlanValues
};
