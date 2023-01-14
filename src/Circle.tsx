import styled from "styled-components";

interface ContainerProps{
    bgColor : string;
};

// tag -> styled component 로 한번 더 전달 
const Container = styled.div<ContainerProps>`
    width : 100px;
    height : 100px;
    background-color : ${props => props.bgColor };
    border-radius : 50px;
`;

// interface : typescript 에서 PropTypes와 비슷한 정의를 할 수 있는 놈/ 
interface CircleProps {
    bgColor : string;
};


function Circle({bgColor}:CircleProps) {
    return (
        <Container bgColor={bgColor}/>
    )
}
export default Circle;

// interface 정의 
interface PlayerShape{
    name:string;
    age:number;
}
//함수에서 interface 정의한 놈으로 parameter 정의 
const sayHello = (playerObj:PlayerShape)=>{
    console.log(`Hello ${playerObj.name}, you are ${playerObj.age} years old`);
}   
//함수 실행할 때 inerface 정의된대로 호출 
sayHello({name:"noco",age:30});