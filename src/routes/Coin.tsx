import {useParams, useLocation, useRouteMatch} from "react-router";
import {useState, useEffect} from "react";
import styled from "styled-components";
import { Switch, Route, Link} from "react-router-dom";
import {useQuery} from "react-query";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
    padding : 0px 20px ;
    max-width : 480px;
    margin : 0;
`;
const Header = styled.header`
    height : 10vh;
    display : flex;
    justify-content : center;
    align-items : center;
 `;
 const Title = styled.h1`
    font-size : 48px;
    color: ${props=>props.theme.accentColor};
`;
const Loading = styled.span`
    font-size : 20;
    text-align : center;
    display : block;
    color: ${props=>props.theme.accentColor}
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive:boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color : ${props => props.isActive ? props.theme.accentColor : props.theme.textColor}
 `;

//useParams에 type 설정 -> RouteParams : -> inteface 
//useParams는 url에서 중요한 정보를 잡아 낼 때 사용 
// /:coinId 로 url을 호출함.
interface RouteParams{
    coinId:string;
}
interface RouteState{
    name:string;
}

//Object.keys(temp1).join()
//, 선택하고 ctrl+d 연타하면 ,만 계속 선택됨.
//Object.values(temp1).map(v => typeof v).join()
// shift + ctrl + l을 선택하면 한번에  편집할 수 있다는데 난 안됨.
interface InfoData{
    id : string;
    name : string;
    symbol :string;
    rank :  number;
    is_new :boolean;
    is_active : boolean;
    type : string;
    logo :string;
    description : string;
    message : string;
    open_source :boolean;
    started_at : string;
    development_status :string;
    hardware_wallet : boolean;
    proof_type :string;
    org_structure : string;
    hash_algorithm : string
    first_data_at : string;
    last_data_at :string;
}
interface PriceData{
    id: string;
    name : string;
    total_supply : number;
    max_supply : number;
    quotes :{
        USD:{
            ath_date : string;
            ath_price: number;
        }
    }
    
}
function Coin(){

    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    //useRouteMatch : 현재 url이 맞으면 true 안맞으면 null
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    const getCoinInfo = async() =>{
        //const response =  await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
        const json = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        // array slice 배열 슬라이스 (0,100개 까지만)

    }
    // useEffect [] 를 [coinId] 변경 (warning 같은게 난다는 데 안 안난다. ) -> coinId변경시에 다시 함수 적용 
    useEffect(()=>{
        (async() =>{
            //const json = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const infodata = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();     
            const pricedata = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            console.log(infodata);
            setInfo(infodata);
            setPriceInfo(pricedata);
           setLoading(false);
    
        })()

    }, [coinId]);

    // {state?.name ? state.name : loading ? "Loading" : info?.name}
    // state에 name 이 있으면 state.name을 쓰고, 그렇지 않으면 loading 을 보여주는 데 loading 은 bool 이므로 
    //loading이 ture 이면 "Loading 으로 ", 그렇지 않으면 info.name으로 

   //  ${coinId -> :coinId
    return (
    <Container>
        <Header>
           <Title> {state?.name ? state.name : loading ? "Loading" : info?.name}
           </Title>
        </Header>
        {loading? (<Loading>loading</Loading>) : 
        (
            <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{info?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>{info?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open Source:</span>
                    <span>{info?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
            </Overview>
            <Description> {info?.description}  </Description>
            <Overview>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{priceInfo?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{priceInfo?.max_supply}</span>
                </OverviewItem>
            </Overview>   
            <Tabs>
                <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}> Price </Link>
                </Tab>
                <Tab isActive={chartMatch !== null}>
                    <Link to={`/${coinId}/chart`}>Chart</Link>    
                </Tab>
            </Tabs>    
            <Switch>
                <Route path={`/${coinId}/price`}>
                    <Price />
                </Route>
                <Route path ={`/${coinId}/chart`}>
                    <Chart />
                </Route>

            </Switch>
            </>
        )
          
        }
    </Container>
    );
}
export default Coin;