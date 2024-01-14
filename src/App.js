import "./App.css";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <MainPage></MainPage> */}
      <TestPage></TestPage>
      {/* <ResultPage></ResultPage> */}
    </div>
  );
}

export default App;
