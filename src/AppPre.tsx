import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";

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
const boxVariants = {
        initial:{
            opacity:0,
            scale:0,
        },
        visible:{
            opacity:1,
            scale:1,
            rotateZ:360,
        },
        leaving:{
            opacity:0,
            scale:0,
            y:20,
        },
}
function AppPre(){
    const [showing, setShowing] = useState(false);
    const onClick = ()=>{
        setShowing(prev => !prev);
    }
    return(
        <Wrapper>

            <AnimatePresence>{showing ? 
            <Box
                variants = {boxVariants}
                initial= "initial"
                animate="visible"
                exit = "leaving"
            /> : null}</AnimatePresence>
            <button onClick={onClick}>Click Me</button>
        </Wrapper>            
    );
}
export default AppPre;