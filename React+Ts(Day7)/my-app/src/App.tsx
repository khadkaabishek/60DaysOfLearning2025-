import MyButton from "./components/button";


function App(){
  return <div className="App">
    <MyButton onClick ={()=>{alert("Button Clicked")}} name = "Click Me"/>
  </div>;
}

export default App;
