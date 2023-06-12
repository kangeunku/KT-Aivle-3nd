import React, { useState } from "react";

const Input = () => {

    // 틀만들기
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
    });

    // return에서 인풋내용들을 사용할수있게 변수저장
    const {name, email} = inputs;

    // 변경사항 저장
    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputs({
            ...inputs,
            [name]: value
        });
    }
    
    return (
        <div>
            <div>
                <label>이름</label>
                <input type="text" name="name" value={name} onChange={onChange}/>
            </div>
            <div>
                <label>이메일</label>
                <input type="text" name="email" value={email} onChange={onChange}/>
            </div>
            <p>name : {name}</p>
            <p>email  : {email}</p>
        </div>
    )
}

// export default Input;

export { Input };