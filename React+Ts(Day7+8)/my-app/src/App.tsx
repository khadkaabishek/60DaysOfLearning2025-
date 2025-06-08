import MyButton from "./components/button";
import MyBookDataButton from "./components/book"

function App(){
  return <div className="App">
    <MyButton onClick ={()=>{alert("Button Clicked")}} name = "Click Me"/>
      <MyBookDataButton name ="click Me!!"/>
  </div>;
}

export default App;
