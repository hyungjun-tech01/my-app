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
}
//Chart에서 Props 로 coinId를   보냄 
function Chart({coinId}:ChartProps){
    const {isLoading, data} = useQuery<IData[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId))
    return <div>{isLoading? "Loading Chart... ":
    <ApexChart type="line" series={[
        {
            name:"sales",
            data: data?.map((price) => Number(price.close)) as number[]
        }
    ]} options={ {chart:{ height:500, width:500,}}}/>
    }</div>;
}
export default Chart;