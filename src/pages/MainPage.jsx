import "../MainPage.css";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <div className="flex mainContent">
        <img src="/images/icon/hc.png" alt="logo_image" />
        <Link to="/test">START</Link>
      </div>
    </div>
  );
}

export default MainPage;
