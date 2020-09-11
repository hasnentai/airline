import React, { Component } from "react";
import "./footer.scss";
import CityScape from "../../assets/img/footer.png";
import Plane from "../../assets/img/plane.svg";
import { footer } from "../../helpers/language";
import logo from "../../assets/img/anajal-logo.svg";
import op1 from "../../assets/img/footer_op_1.png";
import op2 from "../../assets/img/footer_op_2.png";
import op3 from "../../assets/img/footer_op_3.png";
import op4 from "../../assets/img/footer_op_4.png";
import { Link } from "react-router-dom";
const Footer = (props) => {
  return (
    <footer id="footer">
      <div className="footer-img-wrap">
        <img src={CityScape} width="100%" />
        <img className="footer-plane" src={Plane} width="20%" />
        <div className="footer-logo-wrapper ">
          <div className="footer-logo pb-2 pt-2  " style={{ background: "rgba(27, 20, 60, 0.844)" }}>
            <div className="container anajal-row anajal-menu">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="right-info-f">
                <ul>
                  <Link to="/terms"><img src={op1} alt="logo" /></Link>
                  <Link to="/privacypolicy"><img src={op2} alt="logo" /></Link>
                  <Link to="/contactus"><img src={op3} alt="logo" /></Link>
                  <img src={op4} alt="logo" />
                </ul>
              </div>
            </div>
            <div className="container">
              <p style={{ textAlign: "initial", paddingTop: "10px", color: "#fff" }}>Copyright &#169; All rights reserved by OO</p>
            </div>

          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
