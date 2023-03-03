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
  height : 200vh;
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
 const Svg = styled.svg`
    width:300px;
    height:300px;
    color:white;
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
const svgVariants = {
    start : { 
        pathLength:0,
        fill:"rgba(255,255,255,0)",},
    end: {
        pathLength:1,
        fill:"rgba(255,255,255,1)",
    }
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
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <motion.path 
                    variants ={svgVariants}
                    initial={"start"}
                    animate={"end" }
                    transition={{
                        default:{duration:5},
                        fill:{duration:2, delay:5}
                    }}
                    stroke="white"
                    strokeWidth="2"
                    fill = "transparent" 
                    d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z">
                </motion.path>        
            </Svg>

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

        </Wrapper>
    );
}
export default AppAni;

 