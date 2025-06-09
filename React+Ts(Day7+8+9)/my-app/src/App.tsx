import MyButton from "./components/button";
import MyBookDataButton from "./components/book"
import InputField from "./components/input";
import ContextButton from "./components/contextController";
import {ContextProvider} from "./components/counter";
function App(){
  return <div className="App">
    <MyButton onClick ={()=>{alert("Button Clicked")}} name = "Click Me"/>
      <MyBookDataButton name ="click Me!!"/>
      <InputField></InputField>
      <ContextProvider>
        <ContextButton></ContextButton>
      </ContextProvider>

  </div>;
}

export default App;
