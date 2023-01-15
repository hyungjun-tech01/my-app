import React, {useState} from 'react';
import Circle from './Circle';

function App() {
  // typesript 하에서 아래처럼 "" 로 사용시작하면. value 안에는 string만 들어갈 수 있다.
  // 즉 setValue에서 string 만이 사용가능하다. 
  // 또한 number로 시작하면 number만 사용가능하다. setState(0) 이렇게 시작하면 그 다음에 setValue할때 number만 입력가능
    const [value, setValue] = useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>)=> {
    const {currentTarget : {value}} = event;
    setValue(value);
    // setValue(event.currentTarget.value);
  };
  // event.preventDefault() 주로 사용되는 경우는
// 1. a 태그를 눌렀을때도 href 링크로 이동하지 않게 할 경우
// 2. form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고싶을 경우 (submit은 작동됨)
//  -> 진짜네..(새로고침이 안됨)
  const onSubmit = (event:React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    <div>
      <Circle bgColor="tomato" borderColor="blue"/>
      <Circle bgColor="teal" text="im here"/>
      <form  onSubmit = {onSubmit}>
        <input type="text" placeholder="enter your name" value={value} onChange={onChange} />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
