import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {minuteState, hourSelector} from "./atoms";
function TranslateHours(){
    const [minute, setMinute] = useRecoilState(minuteState);
    const [hour, setHours] = useRecoilState(hourSelector);
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        setMinute(+event.currentTarget.value);  // 문자열을 숫자로 변경 + 붙힘

    }
    const onHourChange = (event:React.FormEvent<HTMLInputElement>) => {
        setHours(+event.currentTarget.value);  // 문자열을 숫자로 변경 + 붙힘

    }
    return (
        <div>
            <input value= {minute} onChange={onChange} placeholder="Minute" />
            <input value={hour} onChange={onHourChange} placeholder="Hour"/>
        </div>
    )
}
export default TranslateHours;