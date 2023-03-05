import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import { networkInterfaces } from "os";

const Wrapper = styled(motion.div)`
  display : flex;
  justify-content : space-around;
  align-items : center;
  height : 100vh;
  width : 100vw;
`;
//    justify-content:center;
//align-items:center;
const Grid = styled.div`
    display : grid;
    grid-template-columns:repeat(3,1fr);
    width:50vw;
    gap: 10px;
    div:first-child,
    div:last-child{
        grid-column : span 2;
    }
`;
const Box = styled(motion.div)`
    height : 200px;
    background-color : rgba(255,255,255,1);
    border-radius: 10px;
    display:flex;
    justify-content:center;
    align-items:center;
    box-shadow : 0 20px 3px rgba(0,0,0,0.1), 0 0px 20px 
`;
const Overlay = styled(motion.div)`
    width:100%;
    height: 100%;
    background-color:rgba(0,0,0,0.5);
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;    
`;
function AppPre(){
    const [lId, setlId] = useState<null|string>(null);
    return(
        <Wrapper >
        <Grid>
        {["1","2","3","4"].map(n => <Box onClick={()=>setlId(n)} key={n} layoutId={n}></Box>)}
        </Grid>    
        <AnimatePresence>{lId? 
            <Overlay initial={{opacity:0}} 
                    animate={{opacity:1}} 
                    exit={{opacity:0}}>
                    <Box onClick={()=>setlId(null)} layoutId={lId} style={{width:200, height:200 }}/>
            </Overlay>
            :null}
        </AnimatePresence>        
        </Wrapper>            
    );
}
export default AppPre;