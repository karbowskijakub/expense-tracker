import "./App.css";
import Graph from "./components/organisms/Graph";
import Form from "./components/organisms/Form";

function App() {
  return (
    <>
      <nav className="container mx-auto max-w-8xl mt-10  flex justify-center align-center bg-slate-800 ">
        <h1 className=" text-4xl p-8 text-white rounded">Expense tracker</h1>
      </nav>
      <div className="container mx-auto max-w-8xl ">
        <div className="grid md:grid-cols-2 gap-4 text-center">
          <Graph></Graph>
          <Form></Form>
        </div>
      </div>
    </>
  );
}

export default App;
