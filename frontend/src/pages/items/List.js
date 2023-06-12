import React from "react";

const User = ({userData}) => {
    return (
        <li>
            <strong>{userData.name}</strong>
            <p>{userData.email}</p>
        </li>
    )
}

const UserList = () => {
    const users = [
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
        {email: 'chrisjyh@naver.com', name: "주은호"},
    ];

    return (
        <div>
            <ul>
                {users.map(user => <User userData={user} />)}
            </ul>
        </div>
    )
}

export { UserList };