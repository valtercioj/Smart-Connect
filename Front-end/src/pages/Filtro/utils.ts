

export const statusValues = [
    "Desconhecido",
    "Ativo",
    "Desativado",
    "Bloqueio Manual",
    "Bloqueio Automático",
    "Financeiro em Atraso",
    "Aguardando Assinatura",
  ];

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
  
  export interface city {
    cidadeCliente: string;
  }
  
  export interface concentrator {
    nomeConcentrador: string;
  }
  
  export interface plans {
    planoContrato: string;
  }
  
  export interface status {
    statusInternet: number;
  }

  