import "../styles/MainPage.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="mainPage">
      <Link to="/test" className="startBtn">START</Link>
    </div>
  );
}

export default MainPage;
