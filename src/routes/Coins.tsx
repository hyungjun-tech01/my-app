import styled from "styled-components";

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
const Container = styled.div``;
const Header = styled.header`
    height : 10vh;
    display : flex;
 `;
const CoinList = styled.ul``;
const Coin = styled.li``;
const Title = styled.h1`
color: ${props=>props.theme.accentColor}
`;


function Coins(){
    return (
        <Container>
            <Header>
            <Title>Coins</Title>
            </Header>
            <CoinList>
                {coins.map(coin =><Coin key={coin.id}>{coin.name} {coin.symbol}</Coin> )}
               
            </CoinList>
        </Container>
    );
 
}
export default Coins;