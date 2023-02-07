import { string } from "yargs";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api"
import ApexChart from "react-apexcharts"
interface IData {
    time_open:string,
    time_close:string,
    open:number,
    high:number,
    low:number,
    close:string,
    volume:number,
    market_cap:number,
}
interface ChartProps{
    coinId: string;
    isDark: boolean;
}
//Chart에서 Props 로 coinId를   보냄 
function Chart({coinId, isDark}:ChartProps){
    const {isLoading, data} = useQuery<IData[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId))
    console.log( data?.map( (price) => price.time_close) );
    console.log( data?.map( (price) => new Date(Number(price.time_close) )) );
    return <div>{isLoading? "Loading Chart... ":
    <ApexChart type="line" series={[
        {
            name:"price",
            data: data?.map((price) => Number(price.close)) as number[]
        }
    ]} 
    options=
    { 
        {
            theme:{mode: isDark ? "dark":"light"},
            chart:{ height:500, width:500, toolbar:{show:false}},
            grid:{show:false},
            stroke:{ curve:"smooth", width:3},
            xaxis:{ labels:{show:false}, axisTicks:{show:false}, categories: data?.map( (price) => new Date(Number(price.time_close) ))  }
        }
    }/>
    }</div>;
}
export default Chart;