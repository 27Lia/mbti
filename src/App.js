import "./App.css";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import ResultPage from "./pages/ResultPage";
import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
