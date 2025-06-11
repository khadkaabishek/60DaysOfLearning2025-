import React ,{createContext,useState,useContext} from "react";

interface ContextProviderProps {
    children : React.ReactNode
}
interface CounterContextValue{
    value:number;
    setCount :(num : number) =>void
}
const CounterContext = createContext<null|CounterContextValue>(null);
export  const ContextProvider:React.FC<ContextProviderProps>= (props)=>{
    const [count,setCount]= useState<number>(1);
    return (
        <>
        <CounterContext.Provider value={{
            value : count,
            setCount
        }}>
            {props.children}
        </CounterContext.Provider>
        </>
    );
} 
export const UseCounter =()=>{
    return useContext(CounterContext);
}