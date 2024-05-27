
import { Pie } from '@ant-design/plots';

export interface rendaType {
  nomeCliente: string;
  mediaValorPlano: number;
}

export default function PieCharts({ data }: { data: rendaType }) {

  const config = {
    data,
    angleField: 'ValorPlano',
    colorField: 'nomeCliente',
    paddingRight: 80,
    label: {
      text: 'ValorPlano',
      position: 'outside',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: true,
        position: 'top',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
}