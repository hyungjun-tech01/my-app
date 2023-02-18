import {IToDo} from "./atoms";
interface ICategory{
    category : string;
}
function ToDo(data:IToDo){
    // IToDo의 항목으로 type 정의 , IToDo["category"]
    // 기억 argument 넘길때  onClick = ()=>{} , button onClick={()=>onClick("sss")}
    const onClick = (newCategory:IToDo["category"])=> {
        console.log(newCategory);
    }
    // 위 방법 말고 button의 속성으로 넘기는 방법 
    const onNameClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
        console.log(event.currentTarget.name);
    }
    return (
        <li>
            <span>{data.text}</span>
            {data.category !== "TO_DO" ? <button onClick={()=>onClick("TO_DO")} >To Do</button> : ""}
            {data.category !== "DOING" ? <button onClick={()=>onClick("DOING")}>Doing</button> : ""}
            {data.category !== "DONE" ? <button name="DONE" onClick={onNameClick}>Done</button> : ""}
        </li>
    );
}
export default ToDo;