import MyButton from "./components/button";
import MyBookDataButton from "./components/book"
import InputField from "./components/input";
import ContextButton from "./components/contextController";
import {ContextProvider} from "./components/counter";
import Counter from "./components/useEffect";
import FocusInput from "./components/useRef";
import WindowWidth from "./components/width";
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

<Counter></Counter>
<FocusInput></FocusInput>
<WindowWidth></WindowWidth>

  </div>;
}

export default App;
