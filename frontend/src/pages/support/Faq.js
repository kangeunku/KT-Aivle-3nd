import React, { useState } from "react";

const Support = () => {
    const [num, setNumber] = useState(0);

    const btn_one = () => {
        setNumber(num + 1);
    }
    const btn_two = () => {
        setNumber(num - 1);
    }

    return (
        <div>
            <button onClick={btn_one}> + 1 </button>
            <button onClick={btn_two}> - 1 </button>
            <p>{num}</p>
        </div>
    )
}

export { Support };
