import {useParams, useLocation, useRouteMatch} from "react-router";
import {useState, useEffect} from "react";
import styled from "styled-components";
import { Switch, Route, Link} from "react-router-dom";
import {useQuery} from "react-query";
import Price from "./Price";
import Chart from "./Chart";
import {fetchCoinInfo, fetchCoinTicker} from "../api"
import {Helmet} from "react-helmet";


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
interface ICoinProps {
    isDark: boolean;
}
function Coin({isDark}:ICoinProps){

 
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    //useRouteMatch : 현재 url이 맞으면 true 안맞으면 null
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    //useQuery의 키를 배열로 선언 - 항상 유니크해야 하기 때문에 , 각 코인별로 설정 되게 
    // isLoading 도 두개, data도 두개가 안에 선언이 되었는데 
    // 뒤에 사용할 때 왜 data를 사용 안하는지는 모르겠음 -> 그냥 infoData로 사용하니 문제없이 수행.
    // fetchCoinInfo에 파라메터를 넘겨 줘야 하는데, ()=>fetchCoinInfo(coinId) 이렇게 넘겨 주고 있음
    const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(["info",coinId], ()=>fetchCoinInfo(coinId));
    const {isLoading:tickerLoading, data:tickerData} = useQuery<PriceData>(["tickers",coinId], ()=>fetchCoinTicker(coinId),{refetchInterval:5000});

 
   const loading = infoLoading||tickerLoading;
    return (
    <Container>
        <Helmet>
             <title>{coinId}</title>
        </Helmet>        
        <Header>
           <Title> {state?.name ? state.name : loading ? "Loading" : infoData?.name}
           </Title>
        </Header>
        {loading? (<Loading>loading</Loading>) : 
        (
            <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>{infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Price:</span>
                    <span>{tickerData?.quotes.USD.ath_price.toFixed(3)}</span>
                </OverviewItem>
            </Overview>
            <Description> {infoData?.description}  </Description>
            <Overview>
                <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{tickerData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickerData?.max_supply}</span>
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
                    <Chart isDark={isDark} coinId={coinId}/>
                </Route>

            </Switch>
            </>
        )
          
        }
    </Container>
    );
}
export default Coin;