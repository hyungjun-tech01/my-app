import { useSetRecoilState } from "recoil";
import {IToDo, toDoState, ToDoOptions} from "./atoms";
interface ICategory{
    category : string;
}
function ToDo(data:IToDo){
    // setDodo 할 atom 가지고 와야 함. 
    const setToDos = useSetRecoilState(toDoState);
    // IToDo의 항목으로 type 정의 , IToDo["category"]
    // 기억 argument 넘길때  onClick = (arg)=>{} , button onClick={()=>onClick("sss")}
    const onClick = (newCategory:IToDo["category"])=> {
        setToDos((oldToDos)=>{
            //oldToDos 는 array , array에서 index를 찾는 함수 , findindex , findIdx에 들어가는 arg는 test fn이 들어감. 
            const targetIdx = oldToDos.findIndex( (a1) => a1.id === data.id );
            const aoldToDo = oldToDos[targetIdx];
            const anewToDo = { id:data.id, text:data.text, category:newCategory,};
            return [...oldToDos.slice(0,targetIdx), anewToDo, ...oldToDos.slice(targetIdx+1)];
        });
    }
    // 위 방법 말고 button의 속성으로 넘기는 방법 : typescript 방어가 되는지 ?? 
    const onNameClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
        console.log(event.currentTarget.name);

        setToDos((oldToDos)=>{
            //oldToDos 는 array , array에서 index를 찾는 함수 , findindex , findIdx에 들어가는 arg는 test fn이 들어감. 
            const targetIdx = oldToDos.findIndex( (a1) => a1.id === data.id );
            // 배열의 특정 위치를 바꾸는 방법이 
            // array = target전까지 값 + target의 바뀐 값 + target 이후의 값 
            // replace 는 없는 것일까??             
            const anewToDo = { id:data.id, text:data.text, category:event.currentTarget.name as any,};
            return [...oldToDos.slice(0,targetIdx), anewToDo, ...oldToDos.slice(targetIdx+1)];
        });
 
    }
    return (
        <li>
            <span>{data.text}</span>
            {data.category !== ToDoOptions.TO_DO ? <button onClick={()=>onClick(ToDoOptions.TO_DO)} >To Do</button> : ""}
            {data.category !== ToDoOptions.DOING ? <button onClick={()=>onClick(ToDoOptions.DOING)}>Doing</button> : ""}
            {data.category !== ToDoOptions.DONE ? <button name={ToDoOptions.DONE} onClick={onNameClick}>Done</button> : ""}
        </li>
    );
}
export default ToDo;