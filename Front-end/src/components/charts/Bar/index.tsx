import { Column } from '@ant-design/charts';

interface ReceitaMediaPorPlano {
    receitaTotal: string;
  cidade: string;
}



const PieChartComponent = ({ data }: {data:ReceitaMediaPorPlano[]}) => {
    const config = {
        data,
        xField: 'cidade',
        yField: 'receitaTotal',
        colorField: 'receitaTotal',
        legend: false,
        label: {
          position: 'middle',
          layout: [
            { type: 'interval-adjust-position' },
            { type: 'interval-hide-overlap' },
            { type: 'adjust-color' },
          ],
        },
      };
      return (
        <div className='h-full w-full'><Column {...config}  /></div>
      );
};

export default PieChartComponent;
