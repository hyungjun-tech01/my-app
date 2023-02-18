import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {toDoState} from "./atoms";

interface IForm{
    toDo:string,
}
function CreateToDo(){
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    //onValid엣 사용자 정의 message 추가 
    const onValid = (data:IForm)=>{
        console.log("data", data.toDo);
        setToDos(oldToDos => [{text:data.toDo, id:Date.now(), category:"TO_DO"}, ...oldToDos]);
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