import Layout from "@/components/Layout";
import { Table, Tag } from "antd";
import { api } from "@/services";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ClientsType>();
  async function getCliente(id: string | undefined) {
    try {
      setIsLoading(true);
      const response = await api.get(`/clienteId/${id}`);
      return setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCliente(id);
  }, [id]);

  const columns = [
    {
      title: "Nome do Cliente",
      dataIndex: "nomeCliente",
      key: "nomeCliente",
      render: (text: string, record: ClientsType) => (
        <Link to={`/clientes/${record.id}`}>
          <span className="text-blue-500 underline">{text}</span>
        </Link>
      ),
    },
    {
      title: "Tempo Conectado",
      dataIndex: "tempoConectado",
      key: "tempoConectado",
      render: (value: number) => {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return `${hours}h ${minutes}min`;
      },
    },
    {
      title: "Plano Contrato",
      dataIndex: "planoContrato",
      key: "planoContrato",
    },
    {
      title: "Valor do Plano (R$)",
      dataIndex: "valorPlano",
      key: "valorPlano",
      render: (value: number) =>
        new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value),
    },
    {
      title: "Status da Internet",
      dataIndex: "statusInternet",
      key: "statusInternet",
      render: (statusInternet: number) => getStatusTag(statusInternet),
    },
    {
      title: "Status do Cliente",
      dataIndex: "statusCliente",
      key: "statusCliente",
      render: (statusCliente: boolean) =>
        statusCliente ? (
          <Tag color="success">Online</Tag>
        ) : (
          <Tag color="error">Offline</Tag>
        ),
    },
  ];
  return (
    <Layout>
      <div className="flex w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className=" flex  w-full items-center mt-4">
          <Link to="/clientes" className="mr-1 hover:cursor-pointer">
            <img src="/back.svg" alt="back" className="w-[30px] h-[30px]" />
          </Link>
          <h1 className={` mr-auto pl-3 text-3xl font-bold  text-green-bg `}>
            Cliente
          </h1>
        </div>
        <h2
          className={`mt-4 text-xl text-green-bg dark:text-green-300 lg:w-[full]`}
        >
          Dados de um cliente especifico
        </h2>
        <div className="w-full md:w-[95%] max-h-80">
          <Table
            columns={columns}
            dataSource={data ? [data] : []}
            loading={isLoading}
            rowKey="id"
            pagination={false} 
            className="table-auto w-full h-full divide-y divide-gray-200 even:bg-d9d9d9 odd:bg-aeaeae mt-2"
            scroll={{ x: true }}
          />
        </div>
      </div>
    </Layout>
  );
}
