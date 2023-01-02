import React from "react";
import { useHistory } from "react-router-dom";

//Styles
import Style from "./About.module.css";
import linkedinLogo from "../images/linkedinlogo.webp";
import mailLogo from "../images/hotmailogo.jpg";
import githubLogo from "../images/githublogo.png";

export default function About() {
  const history = useHistory();
  const handleBack = () => {
    history.push("/home");
  };

  return (
    <div className={Style.backgroudimg}>
      <div className={Style.buttomdiv}>
        <button onClick={() => handleBack()} className={Style.buttom}>
          BACK TO HOME
        </button>
      </div>
      <div>
        <h1 className={Style.texth1}>About me</h1>
      </div>
      <div className={Style.pkcdiv}>
        <div className={Style.pkc} />
      </div>

      <div className={Style.orderdiv}>
        <img src={mailLogo} alt="hotmail" className={Style.hotmaillogo} />
        <a
          rel="noreferrer"
          href="https://www.linkedin.com/in/arrascaetaf/"
          target="_blank"
        >
          <img
            src={linkedinLogo}
            alt="linkedin"
            className={Style.linkedinlogo}
          />
        </a>
        <a
          rel="noreferrer"
          href="https://github.com/ArrascaetaFedericoIgnacio"
          target="_blank"
        >
          <img src={githubLogo} alt="github" className={Style.githublogo} />
        </a>
      </div>
      <div>E-MAIL: arrascaetaefdev@gmail.com</div>
    </div>
  );
}
