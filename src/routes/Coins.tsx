import styled from "styled-components";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

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
    text-align : center;
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
    color: ${props=>props.theme.accentColor};
`;
const Loading = styled.span`
    font-size : 20;
    text-align : center;
    display : block;
    color: ${props=>props.theme.accentColor}
`;
const Img = styled.img`
    width : 25px;
    height : 25px;
`;


// type 결정 
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
    //coin state 생성 , type 을 지정 CoinInterface의 배열로 지정  <CoinInterface[]>
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    // loading 중일 때 아닐 때 판단 
    const [loading, setLoading] = useState(true);
    const getCoinFetch = async() =>{
        const response =  await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        // array slice 배열 슬라이스 (0,100개 까지만)
        setCoins(json.slice(0,100));
        setLoading(false);
    }
    
    // 화면 열때 1회만 fetch 
    useEffect(()=>{
        getCoinFetch();
    }, []);
        return (
        <Container>
            <Header>
            <Title>Coins</Title>
            </Header>
            {loading? (<Loading>loading</Loading>) : 
            (
            <CoinList>
                {coins.map(coin =>(
                <Coin key={coin.id}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link> 
                </Coin>
                ))}
            </CoinList>
            )}
        </Container>
    );
}
export default Coins;