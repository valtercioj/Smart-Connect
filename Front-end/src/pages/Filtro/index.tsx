/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Select, Table, Tag, Spin } from "antd";
import { Link } from "react-router-dom";
import { api } from "@/services";
import Layout from "@/components/Layout";
import { MdOnlinePrediction } from "react-icons/md";
import { IoCloudOffline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {statusValues, ClientsType, city,concentrator,plans, status} from "./utils"
const { Option } = Select;

function App() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [cities, setCities] = useState<city[]>([]);
  const [concentrators, setConcentrators] = useState<concentrator[]>([]);
  const [plans, setPlans] = useState<plans[]>([]);
  const [statuses, setStatuses] = useState<status[]>([]);
  const [clientes, setClientes] = useState<ClientsType[]>([]);
  const [clientesFiltered, setClientesFiltered] = useState<ClientsType[]>(clientes);
  const [allClients, setAllClientes] = useState<number>(0);
  const [onlineClients, setOnlineClients] = useState<number>(0);
  const [offlineClients, setOfflineClients] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );
  const [selectedConcentrator, setSelectedConcentrator] = useState<
    string | undefined
  >(undefined);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(
    undefined
  );
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    getCitys();
    getPlans();
    getStatus();
    getClients();
    getConcentrators();
  }, []);

  useEffect(() => {
    filterClients();
  }, [
    clientes,
    selectedCity,
    selectedConcentrator,
    selectedPlan,
    selectedStatus,
  ]);

  const getClients = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/clientes");
      setClientes(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getConcentrators = async () => {
    try {
      const response = await api.get("/concentrador");
      setConcentrators(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCitys = async () => {
    try {
      const response = await api.get("/cidades");
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPlans = async () => {
    try {
      const response = await api.get("/planos");
      setPlans(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStatus = async () => {
    try {
      const response = await api.get("/status");
      setStatuses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterClients = () => {
    let filteredClients = clientes;

    if (selectedCity) {
      filteredClients = filteredClients.filter(
        (client) => client.cidadeCliente === selectedCity
      );
    }
    if (selectedConcentrator) {
      filteredClients = filteredClients.filter(
        (client) => client.nomeConcentrador === selectedConcentrator
      );
    }
    if (selectedPlan) {
      filteredClients = filteredClients.filter(
        (client) => client.planoContrato === selectedPlan
      );
    }
    if (selectedStatus !== undefined) {
      filteredClients = filteredClients.filter(
        (client) => client.statusInternet === selectedStatus
      );
    }
    setClientesFiltered(filteredClients);
    setAllClientes(filteredClients.length);
    setOnlineClients(
      filteredClients.filter((client) => client.statusCliente === true).length
    );
    setOfflineClients(
      filteredClients.filter((client) => client.statusCliente === false).length
    );
  };

  

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

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full w-full items-center pl-4 lg:items-start lg:pl-12 ">
        <div className="flex w-full items-center mt-4">
          <button onClick={() => navigate(-1)}>
            <img src="/back.svg" alt="back" className="w-[30px] h-[30px]" />
          </button>
          <h1 className="mr-auto pl-3 text-3xl font-bold text-green-bg">
            Filtro
          </h1>
        </div>
        <h2 className="mt-4 text-xl text-green-bg dark:text-green-300 lg:w-[full]">
          Filtro de Clientes a partir de informações escolhidas
        </h2>
        <div className="mt-16 flex flex-col items-center md:flex-row gap-y-8 md:gap-y-0 h-full w-full justify-around px-8">
          {isLoading ? (
            <Spin />
          ) : (
            <div className="flex h-[157px] w-64 flex-col justify-between rounded-lg bg-[#F2EAE1] px-6">
              <div className="my-4 flex h-full flex-col justify-around">
                <span>
                  <img src="/user1.svg" alt="clientes" className="w-9 h-9" />
                </span>
                <span className="font-Montserrat text-sm font-medium leading-normal text-[#262020]">
                  CLIENTES TOTAIS
                </span>
              </div>
              <div className="flex w-full justify-end">
                <h1 className="font-Montserrat text-3xl font-bold leading-normal text-[#9E6868]">
                  {allClients}
                </h1>
              </div>
            </div>
          )}

          {isLoading ? (
            <Spin />
          ) : (
            <div className="flex h-[157px] w-64 flex-col justify-between rounded-lg bg-gradient-to-r from-[#FEAF00] to-[#F8D442] px-6">
              <div className="my-4 flex h-full flex-col justify-around">
                <MdOnlinePrediction fill="white" size={36} />
                <span className="font-Montserrat text-sm font-medium leading-normal text-white-default">
                  CLIENTES ONLINE
                </span>
              </div>
              <div className="flex w-full justify-end">
                <h1 className="font-Montserrat text-3xl font-bold leading-normal text-[#000000]">
                  {onlineClients}
                </h1>
              </div>
            </div>
          )}

          {isLoading ? (
            <Spin />
          ) : (
            <div className="flex h-[157px] w-64 flex-col justify-between rounded-lg bg-gradient-to-r from-[#FEAF00] to-[#F8D442] px-6">
              <div className="my-4 flex h-full flex-col justify-around">
                <IoCloudOffline fill="white" size={36} />
                <span className="font-Montserrat text-sm font-medium leading-normal text-white-default">
                  CLIENTES OFFLINE
                </span>
              </div>
              <div className="flex w-full justify-end">
                <h1 className="font-Montserrat text-3xl font-bold leading-normal text-[#000000]">
                  {offlineClients}
                </h1>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 bg-white p-2">
          <Select
            placeholder="Selecione uma cidade"
            className="w-64"
            onChange={(value) => setSelectedCity(value)}
            allowClear
          >
            {cities.map((city) => (
              <Option key={city.cidadeCliente} value={city.cidadeCliente}>
                {city?.cidadeCliente}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Selecione um concentrador"
            className="w-64"
            onChange={(value) => setSelectedConcentrator(value)}
            allowClear
          >
            {concentrators.map((concentrator) => (
              <Option
                key={concentrator.nomeConcentrador}
                value={concentrator.nomeConcentrador}
              >
                {concentrator.nomeConcentrador}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Selecione um plano"
            className="w-64"
            onChange={(value) => setSelectedPlan(value)}
            allowClear
          >
            {plans.map((plan) => (
              <Option key={plan.planoContrato} value={plan.planoContrato}>
                {plan.planoContrato}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Selecione um status"
            className="w-64"
            onChange={(value) => setSelectedStatus(value)}
            allowClear
          >
            {statuses.map((status) => (
              <Option key={status.statusInternet} value={status.statusInternet}>
                {statusValues[status.statusInternet + 1]}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-8 w-full md:w-[90%]">
          <Table columns={columns} 
          dataSource={clientesFiltered} 
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
          scroll={{ x: true }}/>
        </div>
      </div>
    </Layout>
  );
}

export default App;
