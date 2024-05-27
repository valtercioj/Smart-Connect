/* eslint-disable @typescript-eslint/no-explicit-any */


import { useQuery } from 'react-query';
import { Table, Tag } from 'antd';
import { api } from '@/services';
import Layout from '@/components/Layout';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export interface ClientsType {
  id: string;
  statusCliente: boolean;
  ipConcentrador: string;
  nomeConcentrador: string;
  latitudeCliente: string;
  longitudeCliente: string;
  conexaoInicial: string;
  conexaoFinal: string;
  tempoConectado: number;
  consumoDownload: string;
  consumoUpload: string;
  motivoDesconexao: string;
  popCliente: string;
  nomeCliente: string;
  enderecoCliente: string;
  bairroCliente: string;
  cidadeCliente: string;
  planoContrato: string;
  statusInternet: number;
  valorPlano: number;
}

export default function Clientes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const getStatusTag = (status: number) => {
    switch (status) {
      case 0:
        return <Tag color="default">Desconhecido</Tag>;
      case 1:
        return <Tag color="success">Ativo</Tag>;
      case 2:
        return <Tag color="error">Desativado</Tag>;
      case 3:
        return <Tag color="warning">Bloqueio Manual</Tag>;
      case 4:
        return <Tag color="processing">Bloqueio Automático</Tag>;
      case 5:
        return <Tag color="error">Financeiro em Atraso</Tag>;
      case 6:
        return <Tag color="default">Aguardando Assinatura</Tag>;
      default:
        return <Tag color="default">Desconhecido</Tag>;
    }
  };

  const navigate = useNavigate();
  const { data, isLoading } = useQuery<ClientsType[]>('clients1', async () => {
    const response = await api.get('/clientes');
    return response.data;
  });

  const columns:any = [
    {
      title: 'Nome do Cliente',
      dataIndex: 'nomeCliente',
      key: 'nomeCliente',
      render: (text: string, record: ClientsType) => (
        <Link to={`/clienteId/${record.id}`}>
          <span className="text-blue-500 underline">{text}</span>
        </Link>
      ),
     
    },
    {
      title: 'Tempo Conectado',
      dataIndex: 'tempoConectado',
      key: 'tempoConectado',
      render: (value: number) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return `${hours}h ${minutes}min`;
      },
    },
    {
      title: 'Plano Contrato',
      dataIndex: 'planoContrato',
      key: 'planoContrato',
      filters: data
        ? Array.from(new Set(data.map((item) => item.planoContrato))).map((planoContrato) => ({
            text: planoContrato,
            value: planoContrato,
          }))
        : [],
      onFilter: (value: string | number | boolean, record: ClientsType) => record.planoContrato.includes(value as string),
    },
    {
      title: 'Valor do Plano (R$)',
      dataIndex: 'valorPlano',
      key: 'valorPlano',
      render: (value: number) =>
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value),
    },
    {
      title: 'Status da Internet',
      dataIndex: 'statusInternet',
      key: 'statusInternet',
      render: (statusInternet: number) => getStatusTag(statusInternet),
      filters: [
        { text: 'Desconhecido', value: 0 },
        { text: 'Ativo', value: 1 },
        { text: 'Desativado', value: 2 },
        { text: 'Bloqueio Manual', value: 3 },
        { text: 'Bloqueio Automático', value: 4 },
        { text: 'Financeiro em Atraso', value: 5 },
        { text: 'Aguardando Assinatura', value: 6 },
      ],
      onFilter: (value: string | number | boolean, record: ClientsType) => record.statusInternet === value,
    },
    {
      title: 'Status do Cliente',
      dataIndex: 'statusCliente',
      key: 'statusCliente',
      render: (statusCliente: boolean) =>
        statusCliente ? <Tag color="success">Online</Tag> : <Tag color="error">Offline</Tag>,
      filters: [
        { text: 'Online', value: true },
        { text: 'Offline', value: false },
      ],
      onFilter: (value: string | number | boolean, record: ClientsType) => record.statusCliente === value,
    },
  ];

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };


  return (
    <Layout>
      <div className="flex flex-col w-full items-center pl-4 lg:items-start lg:pl-12 ">
        <div className="flex w-full items-center mt-4">
          <button onClick={() => navigate(-1)}>
            <img src="/back.svg" alt="back" className="w-[30px] h-[30px]" />
          </button>
          <h1 className="mr-auto pl-3 text-3xl font-bold text-green-bg">Clientes</h1>
        </div>
        <h2 className="mt-4 text-xl text-green-bg dark:text-green-300 lg:w-[full]">
          Lista de todos os clientes cadastrados
        </h2>
        <div className="w-[95%]  max-h-80">
          <Table
           columns={columns}
           dataSource={data}
           loading={isLoading}
           rowKey="id"
           pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20', '50'],
          }}
          onChange={handleTableChange}
           className="table-auto h-full divide-y divide-gray-200 even:bg-d9d9d9 odd:bg-aeaeae mt-2"
           scroll={{ x: true }}
          />
        </div>
      </div>
    </Layout>
  );
}