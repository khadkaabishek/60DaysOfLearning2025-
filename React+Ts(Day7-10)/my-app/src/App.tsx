import MyButton from "./components/button";
import MyBookDataButton from "./components/book"
import InputField from "./components/input";
import ContextButton from "./components/contextController";
import {ContextProvider} from "./components/counter";
function App(){
  return <div className="App">
    <MyButton onClick ={()=>{}} name = "Click Me"/>
      <hr />
      <MyBookDataButton name ="Swap Book Details"/>
      <hr />
      <InputField></InputField>
      <hr />
      <ContextProvider>
        <ContextButton></ContextButton>
      </ContextProvider>

  </div>;
}

export default App;
