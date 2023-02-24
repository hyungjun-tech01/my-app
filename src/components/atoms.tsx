import {atom, selector} from "recoil";
//enum 을 정의해서 이걸 모든 곳에서 사용할 수 있도록 
// 실제로 enum은 숫자로 인식한다. (따라서 문자로 인식하게 하려면, 아래 처럼 써줘야 함.)
export enum ToDoOptions{
    "TO_DO" ="TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}
export interface IToDo{
    text:string;
    id:number;
    category:ToDoOptions;
}
//categorystate가 3개 값중에 하나라고 알려 줌. 이거 안해주면 categoryState의 값을 가지고 와서 
// toDoSate에 집어 넣으려고 하면 계속 에러나서 
//결국 as any를 줘야 함.
export const categoryState = atom<ToDoOptions>({
    key:"category",
    default:ToDoOptions.TO_DO,
});
export const toDoState = atom<IToDo[]>(
    {
        key:"toDo",
        default:[],
    }
);
export const toDoSelector = selector({
    key:"toDoSelector",
    get:( {get}) => {
        const toDos = get(toDoState);
        //category로 필터링해서 리턴하는 것 같은데.. 
        const category = get(categoryState);
        return [toDos.filter((toDo)=> toDo.category === category)];
    },
});

export const minuteState = atom (
    {
        key:"minute",
        default:0,
    }
);

// selector 
export const hourSelector = selector({
    key:"hours",
    get:({get}) => {
        const minute = get(minuteState);  // atom내에서 다른 atom을 가지고 올때?? 
        return minute / 60;
    },
    //selector 에서 set ?? 
    set:({set}, newValue)=>{
        const minute = Number(newValue) * 60;
        set(minuteState, minute);

    }
});

interface IToDoSate {
    [key:string] : string[];
}
export const  dndToDoState = atom <IToDoSate>(
    {
        key:"dndToDo",
        default:{
            to_do : ["a", "b",],
            doing : ["c","d"],
            done : ["e","f",],
        },
    }
);