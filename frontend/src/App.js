import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <>
      <div className="App">
        <p>Hey there!</p>
        <InputTodo />
      </div>
      <ListTodos />
    </>
  );
}

export default App;
