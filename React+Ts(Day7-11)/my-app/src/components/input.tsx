import React,{useState} from "react";



const InputField :React.FC= ()=>{

    const [value,setValue] = useState<string|undefined>("");
    const handleDrawChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value);
    }
    const [name,setName]= useState<string>("");
    const handleOnclick = ()=>{

      if(name === "")
         setName("A"); 
      else if (name === "A")
         setName("Ab") ;
      else if (name === "Ab")
         setName("Abi") 
      else if (name === "Abi")
         setName("Abis")
      else if (name === "Abis")
         setName("Abish")
      else if (name === "Abish")
         setName("Abishe")
      else
         setName("Abishek")
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();
    }
    return (<>
       <div>
        <form onSubmit={handleSubmit} >
         <button onClick={handleOnclick}>Click</button>
         <hr />
         <h1>{name}</h1>
          <input onChange={handleDrawChange} type="text"  placeholder="Enter smth to see magic"/>
          <button type="submit">Submit</button>
          </form>
          <h1>{value}</h1>
       </div>
    
    </>);
}
export default InputField;