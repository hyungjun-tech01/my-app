import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";

const Wrapper = styled(motion.div)`
  display : flex;
  justify-content : space-around;
  align-items : center;
  height : 100vh;
  width : 100vw;
`;
//    justify-content:center;
//align-items:center;

const Box = styled(motion.div)`
    width : 400px;
    height : 400px;
    background-color : rgba(255,255,255,1);
    border-radius: 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    box-shadow : 0 20px 3px rgba(0,0,0,0.1), 0 0px 20px 
`;
const Circle = styled(motion.div)`
    width : 100px;
    height : 100px;
    border-radius : 50px;    
    background-color : blue;
    box-shadow : 0 20px 3px rgba(0,0,0,0.1), 0 0px 20px 
`;
function AppPre(){
    const [clicked, setClicked] = useState(false);
    const toggleClicked = ()=>{
        setClicked(prev => !prev);
    };
    return(
        <Wrapper onClick={toggleClicked}>
            <Box>
                {clicked ? null:<Circle layoutId="circle" />}
            </Box>
            <Box>
                {clicked ? <Circle layoutId="circle"/>:null} 
            </Box>                    
        </Wrapper>            
    );
}
export default AppPre;