import {useParams} from "react-router";

//useParams에 type 설정 -> RouteParams : -> inteface 
//useParams는 url에서 중요한 정보를 잡아 낼 때 사용 
// /:coinId 로 url을 호출함.
interface RouteParams{
    coinId:string;
}
function Coin(){
    const {coinId} = useParams<RouteParams>();
    console.log(coinId);
    return <h1>Coin : {coinId}</h1>
}
export default Coin;