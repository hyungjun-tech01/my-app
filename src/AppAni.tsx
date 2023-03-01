import {motion, useMotionValue, useTransform} from "framer-motion";
import styled from "styled-components";
import {useRef} from "react";

const Wrapper = styled(motion.div)`
  display : flex;
  flex-direction : column;
  max-width : 480px;
  margin : 0 auto;
  justify-content : center;
  align-items : center;
  height : 100vh;
`;
const Box = styled(motion.div)`
    width : 200px;
    height : 200px;
    display : grid; 
    grid-template-columns : repeat(2,1fr);
    background-color : rgba(255,255,255,0.2);
    border-radius: 10px;
    box-shadow : 0 20px 3px rgba(0,0,0,0.1), 0 0px 20px 
`;
const Circle = styled(motion.div)`
    background-color : white;    
    place-self : center;
    width : 70px;
    height : 70px;
    border-radius: 35px;
    box-shadow : 0 20px 3px rgba(0,0,0,0.1), 0 0px 20px 
`;
const boxVariants = {
    start:{ 
        opacity:0,
        scale:0.5, 
    },
    end:{
        opacity:1, 
        scale:1,
        transition:{
            type:"spring",
            duration:0.5,
            bounce:0.5,
            delayChildren : 0.5,
            staggerChildren: 0.5,
        }        
    }
};
 const circleVariants = {
    start:{
        opacity:0,
        y: -10,
    }, 
    end:{
        opacity:1,
        y:10,
    },
 }
 const BiggerBox = styled.div`
    width: 600px;
    height : 600px;
    background-color : rgba(255,255,255,0.4);
    border-radius: 40px;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow : hidden; 
 `;
 const boxGestureVariants = {
    hover:{scale:1.1, rotateZ:90},
    click: {scale:1, borderRadius:"100px"},
    drag : { backgroundColor : "rgba(46,204,113)", transition:{duration:5} }
 }
const myVars ={
    start : {scale:0},
    end: {scale:1 , rotateZ:360, transition:{ type:"spring", damping:5, delay:0.5}}
}
function AppAni(){
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const potato = useTransform(x, [-800,0,800], [2, 1, 0.1])
    const gradient = useTransform(
        x,
        [-800,800],
        [
            "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
            "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",        
        ]
    );
    return (
        <Wrapper style={{background:gradient}}>
            <Box transition={{delay:3, duration:3 }}animate={{borderRadius : "100px"}}  />
            <br/>
            <Box 
                transition={{type:"spring", damping:5 , delay:0.5}} 
                initial={{scale:0}} 
                animate={{scale : 1, rotateZ:360}}
            />
            <br/>
            <Box variants={myVars} initial = "start" animate="end" />
            <br/>
          
            <Box variants={boxVariants} initial = "start" animate = "end">
               <Circle variants={circleVariants}/>
               <Circle variants={circleVariants}/>
               <Circle variants={circleVariants}/>
               <Circle variants={circleVariants}/>
            </Box>
<br/>
            <BiggerBox ref={biggerBoxRef}>
                <Box drag 
                dragSnapToOrigin
                dragConstraints= {biggerBoxRef}
                variants = {boxGestureVariants} 
                whileHover="hover" 
                whileDrag="drag" 
                whileTap="click"/>
            </BiggerBox>
<br/><br/>
            <Box style={{x, scale:potato}} drag="x" dragSnapToOrigin />
            <button onClick={()=>x.set(200)}>Click Me</button>
            <motion.div> </motion.div>
        </Wrapper>
    );
}
export default AppAni;

// npm install framer-motion