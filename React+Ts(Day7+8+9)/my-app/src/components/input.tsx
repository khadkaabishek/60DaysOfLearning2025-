import React,{useState} from "react";
const InputField :React.FC= ()=>{
    const [value,setValue] = useState<string|undefined>("");
    const handleDrawChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value);

    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
       e.preventDefault();
       console.log(e);
    }
    return (<>
       <div>
        <form onSubmit={handleSubmit}>
          <input onChange={handleDrawChange} type="text"  placeholder="Enter smth"/>
          <button type="submit">Submit</button>
          </form>
          <h1>{value}</h1>
       </div>
    
    </>);
}
export default InputField;