import styled from "styled-components";

// css에선 optional 로 만들수가 없다. 
interface ContainerProps{
    bgColor : string;
    borderColor : string;
};

// tag -> styled component 로 한번 더 전달 
const Container = styled.div<ContainerProps>`
    width : 100px;
    height : 100px;
    background-color : ${props => props.bgColor };
    border-radius : 50px;
    border : 2px solid ${props=>props.borderColor};
`;

// interface : typescript 에서 PropTypes와 비슷한 정의를 할 수 있는 놈/ 
// ? : optional prop 표시 
interface CircleProps {
    bgColor : string;
    borderColor?:string;
    text?:string;
};

// ?? : default 로 주는 값 : 이게 있어야 optional 시 에러가 안남 . 
// aa = "  " : default 줄 때  
function Circle({bgColor, borderColor, text="default text"}:CircleProps) {
    return (
        <Container bgColor={bgColor} borderColor={borderColor?? bgColor}>{text}</Container>
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