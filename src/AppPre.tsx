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
        initial:(back:boolean) => ({
            x: back ? -500:500,
            opacity:0,
            scale:0,
        }),
        visible:{
            x:0,
            opacity:1,
            scale:1,
            transition:{
                duration:1,
            }            
        },
        leaving:(back:boolean) => ({
            opacity:0,
            scale:0,
            x: back ? 500:-500,
            rotateX:180,
            transition:{
                duration:1,
            }
        }),
}
function AppPre(){
    const [showing, setShowing] = useState(1);
    const [back, setBack] = useState(false);

    const onClick = ()=>{
        setBack(false);
        setShowing(prev => prev==10 ? 1:prev+1);
    }
    const PrevPlease = ()=>{
        setBack(true);
        setShowing(prev => prev==1 ? 10 : prev-1);
    }
    return(
        <Wrapper>
            <AnimatePresence custom={back}>
                {
                    <Box custom={back} variants={boxVariants} 
                       initial="initial" animate="visible" exit="leaving" key={showing}>{showing}</Box>
                }
            </AnimatePresence>
            <button onClick={onClick}>Next Me</button>
            <button onClick={PrevPlease}>Prev Me</button>
        </Wrapper>            
    );
}
export default AppPre;