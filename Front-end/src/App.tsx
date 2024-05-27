/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "@/services/";
import { CiMoneyBill } from "react-icons/ci";
import BarChart from "@/components/charts/Bar";
import Pie from "@/components/charts/Pie"
import { Card, CardContent, CardTitle } from "./components/ui/card";
import {Spin} from "antd"

export interface rendaType {
  nomeCliente: string;
  mediaValorPlano: number;
}

export interface ClientsType {
  reduce: any;
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

export interface FinanceType {
  receitaTotal: string;
  receitaTotalPorCidade: ReceitaMediaPorPlano[];
}

export interface Receita {
  receitaTotal: string;
  receitaTotalPorPlano: {
    planoContrato:string;
    receitaTotal:string;
  }[]
  
}

export interface ReceitaMediaPorPlano {
  cidade: string;
  receitaTotal: string;
}

function App() {
  const { data: clientes, isLoading: isClients } = useQuery<ClientsType[]>(
    "clients",
    async () => {
      const response = await api.get("/clientes");
      return response.data;
    }
  );

  const { data: threePlan, isLoading: isThree } = useQuery<ClientsType[]>(
    "threePlan",
    async () => {
      const response = await api.get("/clientes/top-three-plan-values");
      return response.data;
    }
  );
  

  const threePlanFilter: rendaType | any = threePlan?.map(cliente => {
    return {
      ValorPlano: cliente.valorPlano,
      nomeCliente: cliente.nomeCliente,
    }
  });
  const { data: finance, isLoading: isFinance } = useQuery<FinanceType>(
    "finance",
    async () => {
      const response = await api.get("/clientes/financial-metrics");
      return response.data;
    }
  );

  return (
    <Layout>
      <div className="flex h-full w-full flex-col lg:p-0">
        <div className="mt-16 flex flex-col items-center md:flex-row gap-y-8 md:gap-y-0 h-full w-full justify-around px-8">
          
            {isFinance ? (
              <Spin />
            ) : (
              <div className="flex h-[157px] w-64 flex-col justify-between rounded-lg bg-[#F2EAE1] px-6">
                <div className="my-4 flex h-full flex-col justify-around">
                  <span>
                    <CiMoneyBill size={53} fill="#262020" />
                  </span>
                  <span className="font-Montserrat text-sm font-medium leading-normal text-[#262020]">
                    LUCRO TOTAL
                  </span>
                </div>
                <div className="flex w-full justify-end">
                  <h1 className="font-Montserrat text-3xl font-bold leading-normal text-[#9E6868]">
                    {finance?.receitaTotal}
                  </h1>
                </div>
              </div>
            )}
          
          <Link to="/clientes">
            {isClients ? (
              <Spin />
            ) : (
              <div className="flex h-[157px] w-64 flex-col justify-between rounded-lg bg-gradient-to-r from-[#FEAF00] to-[#F8D442] px-6">
                <div className="my-4 flex h-full flex-col justify-around">
                  <img src="/user.svg" alt="Clientes" className="h-9 w-9"/>
                  <span className="font-Montserrat text-sm font-medium leading-normal text-white-default">
                    CLIENTES
                  </span>
                </div>
                <div className="flex w-full justify-end">
                  <h1 className="font-Montserrat text-3xl font-bold leading-normal text-[#000000]">
                    {clientes?.length}
                  </h1>
                </div>
              </div>
            )}
          </Link>
        </div>

        {isFinance && isThree ?(
         <div className="w-full flex justify-center mt-20">
          <Spin />
         </div>
        ) :(
          <>
          <Card className="w-[90%] mx-auto mt-10 bg-white">
          <CardTitle className="flex justify-center text-green-bg">Média do Valor do Plano por Cidade</CardTitle>
            <CardContent className="h-80 ">
              {finance && (
                <BarChart data={finance?.receitaTotalPorCidade} />
              )}
              
            </CardContent>
            </Card>
            <Card className="w-[90%] mx-auto mt-10 bg-white">
            <CardTitle className="flex justify-center text-green-bg">Três Clientes com os maiores valores</CardTitle>
            <CardContent className="h-80 ">
              {threePlanFilter && (
                <Pie data={threePlanFilter} />
              )}
            </CardContent>
          </Card>
          </>
        )}
       
      </div>
    </Layout>
  );
}

export default App;
