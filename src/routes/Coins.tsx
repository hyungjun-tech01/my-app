import styled from "styled-components";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

const coins = [ 
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
        },
        {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
        },
        {
        id: "hex-hex",
        name: "HEX",
        symbol: "HEX",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "token",
        },
    ]
interface CoinInterface { 
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}    
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
const CoinList = styled.ul``;
const Coin = styled.li`
    background-color : white;
    color : ${props=> props.theme.bgColor};
    border-radius : 10px;
    margin-bottom : 10px;
    padding : 20px;
    a {
        transition : color 0.4s ease-in;
        display : block ; // 기존에는 화살표 까지만 클릭이 가능하였으나, 전체 블록을 클릭 가능
        padding : 20px; // 블록안으로 20pixel 안에서 부터 클릭 가능 
    }
    &:hover {
        a{
            color : ${props=>props.theme.accentColor}
        }
    }
`;
const Title = styled.h1`
    font-size : 48px;
    color: ${props=>props.theme.accentColor}
`;
interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
function Coins(){
    //coin state 생성 , type 을 지정 CoinInterface의 배열로 지정 
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const getMoiveFetch = async() =>{
        const response =  await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        console.log(json);
        setCoins(json.slice(0,100));
    }
    
    useEffect(()=>{
        getMoiveFetch();
    }, []);
        return (
        <Container>
            <Header>
            <Title>Coins</Title>
            </Header>
            <CoinList>
                {coins.map(coin =>(
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link> 
                </Coin>
                ))}
               
            </CoinList>
        </Container>
    );
 
}
export default Coins;