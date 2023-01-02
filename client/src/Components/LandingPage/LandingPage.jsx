import { Link } from "react-router-dom";
import pokemon from "../images/pokemontitle.png";
import Styles from "./LandingPage.module.css";
export default function LandingPage() {
  return (
    <div className={Styles.bgimage}>
      <div>
        <Link to="/home">
          <div className={Styles.frase}>¡¡¡ Atrapalos ya !!!</div>
        </Link>
      </div>
    </div>
  );
}
