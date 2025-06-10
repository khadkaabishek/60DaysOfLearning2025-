import React from "react";
import {UseCounter} from "../components/counter";
const ContextButton:React.FC = ()=>{
    const context = UseCounter();
    return (
    <>
    <h1 onClick={e=>context?.setCount(context?.value+1)}>{context?.value}</h1>
    </>);
}
export default ContextButton;