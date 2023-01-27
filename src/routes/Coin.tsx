import {useParams, useLocation} from "react-router";
import {useState, useEffect} from "react";
import styled from "styled-components";


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
//useParams에 type 설정 -> RouteParams : -> inteface 
//useParams는 url에서 중요한 정보를 잡아 낼 때 사용 
// /:coinId 로 url을 호출함.
interface RouteParams{
    coinId:string;
}
interface RouteState{
    name:string;
}
function Coin(){
    const [loading, setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    const getCoinInfo = async() =>{
        //const response =  await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
        const json = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
        // array slice 배열 슬라이스 (0,100개 까지만)
        console.log(json);

    }

    useEffect(()=>{
        (async() =>{
            //const json = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const infodata = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();     
            console.log("infodata", infodata);
            const pricedata = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infodata);

            console.log("info", info);
    
        })()

        //(async () => {
            //const infodata = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            //console.log("infodata", infodata);

          //  const pricedata = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
           
            //setInfo(infodata);
          //  setPriceInfo(pricedata);
           

       // } )()
    }, []);

    return (
    <Container>
        <Header>
           <Title> Coin {state.name}</Title>
        </Header>
        {loading? (<Loading>loading</Loading>) : 
            (null)
        }
    </Container>
    );
}
export default Coin;