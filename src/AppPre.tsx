import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";

const Wrapper = styled(motion.div)`
  display : flex;
  margin : 0 auto;
  justify-content : center;
  align-items : center;
  height : 100vh;
  flex-direction:column;
`;
const Box = styled(motion.div)`
    width : 400px;
    height : 200px;
    background-color : rgba(255,255,255,1);
    border-radius: 10px;
    top:100px;
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size : 28px;
    box-shadow : 0 20px 3px rgba(0,0,0,0.1), 0 0px 20px 
`;
const boxVariants = {
        initial:{
            x:500,
            opacity:0,
            scale:0,
        },
        visible:{
            x:0,
            opacity:1,
            scale:1,
            transition:{
                duration:1,
            }            
        },
        leaving:{
            opacity:0,
            scale:0,
            x:-500,
            rotateX:180,
            transition:{
                duration:1,
            }
        },
}
function AppPre(){
    const [showing, setShowing] = useState(1);
    const onClick = ()=>{
       setShowing(prev => prev==10 ? 1:prev+1);
    }
    const PrevPlease = ()=>{
        setShowing(prev => prev==1 ? 10 : prev-1);
    }
    return(
        <Wrapper>
            <AnimatePresence>
                {
                    [1,2,3,4,5,6,7,8,9,10].map(i => i==showing ? 
                    <Box variants={boxVariants} 
                       initial="initial" animate="visible" exit="leaving" key={i}>{i}</Box>:null)
                }
            </AnimatePresence>
            <button onClick={onClick}>Next Me</button>
            <button onClick={PrevPlease}>Prev Me</button>
        </Wrapper>            
    );
}
export default AppPre;