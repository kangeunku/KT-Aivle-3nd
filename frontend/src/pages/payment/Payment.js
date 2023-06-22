import React, { useState } from "react";

const Test = () => {
    const [num, setNumber] = useState(0);

    const plus_one = () => {
        setNumber(num + 1);
    }
    const sub_one = () => {
        setNumber(num - 1);
    }

    return (
        <div>
            <button onClick={() => {plus_one()}}> + 1 </button>
            <button onClick={() => {sub_one()}}> - 1 </button>
            <div> test</div>
            <p>{num}</p>
        </div>
    )
}

export { Test };
