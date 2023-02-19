import {useForm} from "react-hook-form";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {toDoState, categoryState, IToDo} from "./atoms";

interface IForm{
    toDo:string,
}
function CreateToDo(){
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const acategory = useRecoilValue(categoryState); 
    //onValid엣 사용자 정의 message 추가 
    const onValid = (data:IForm)=>{
        console.log("data", acategory);
        // categoryState 에 제한값을 주지 않으면 계속 에러 발생 
        const todododo = {text:data.toDo, id:Date.now(), category:acategory as any};
        setToDos(oldToDos => [{text:data.toDo, id:Date.now(), category:acategory}, ...oldToDos]);
        setValue("toDo","");
    }    
    return (
        <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input  {...register("toDo", {required:"To do is required.", 
                    minLength:{
                        value: 10,
                        message:"your todo is too short."
                    }
                })} placeholder = "write a to do"/>
                <span>
                    { errors?.toDo?.message }
                </span>                       
                <button>Add</button>
        </form>
    );
}
export default CreateToDo;