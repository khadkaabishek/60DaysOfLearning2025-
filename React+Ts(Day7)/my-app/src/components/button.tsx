import React from 'react';
interface buttonProps{
    name : string;
    onClick?:()=>void;
}
const myButton : React.FC<buttonProps> = (props)=>{
    const {name,onClick=()=>{}} = props;
    return <button onClick={onClick}>{name}</button>;
}
export default myButton;