import React from "react";
import style from "../Footer/Footer.module.css";

export const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.infoLeft}>
        <h5>Information</h5>
        <span>
          Individual project HENRY <br />
          Development by Federico Arrascaeta
          <br />
          arrascaetaefdev@gmail.com
          <br />
        </span>
      </div>
      <div className={style.infoRight}>
        <a target="_blank" href="https://www.linkedin.com/in/arrascaetaf/">
          LinkedIn
          <img
            src="https://i.postimg.cc/xThMr2PB/logo-Linkedin.png"
            alt="github"
          />
        </a>
        <a target="_blank" href="https://github.com/ArrascaetaFedericoIgnacio">
          GitHub
          <img
            src="https://i.postimg.cc/Vs9NRcSz/logo-Git-Hub.png"
            alt="github"
          />
        </a>
      </div>
        
    </div>
  );
};
