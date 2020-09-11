import React, { Component } from "react";

import "./fop.scss";
import foptitle from "../../assets/img/3 point .svg";
import easyone from "../../assets/img/easyi.svg";
import xmark from "../../assets/img/Xmark.svg";
import quicki from "../../assets/img/quicki.svg";
import fine from "../../assets/img/fine.svg";
import divideri from "../../assets/img/divideri.svg";
import shareholder from "../../assets/img/shareholder.svg";
import ticketsample from "../../assets/img/ticketsample.svg";
import offcard from "../../assets/img/offcard.svg";
import flow from "../../assets/img/flow.svg";
import yellowaction from "../../assets/img/yellow-action-btn.svg";
import exampleticket from "../../assets/img/exampleticket.svg";
import ana from "../../assets/img/Ana.png";
import jal from "../../assets/img/Jal.png";

import useVisibility from "../../components/useVisibility";
import ReactDOM from "react-dom";

//https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fraw.githubusercontent.com%2Farijitsil%2FOnlineTicketBookingSystem%2Fmaster%2Fsrc%2Fassets%2Fimg%2Ftransaction.png%3Ftoken%3DACRCILMYRE377Q5VOB2ORV27CHIAM
export default function FlowOfPurchase(props) {
  const [fopVisible, fopRef] = useVisibility(-150);
  const [fopBVisible, fopRefB] = useVisibility(-150);
  const [fopEVisible, fopRefE] = useVisibility(-150);

  if (fopVisible) {
    let elementHolder = document.getElementById("fop-holder");
    let isClassPresent = ReactDOM.findDOMNode(elementHolder).classList.contains(
      "animate-fop"
    );
    if (!isClassPresent) {
      ReactDOM.findDOMNode(elementHolder).classList.add("animate-fop");
    }
  } else {
    let elementHolder = document.getElementById("fop-holder");
    if (elementHolder !== null) {
      ReactDOM.findDOMNode(elementHolder).classList.remove("animate-fop");
    }
  }

  if (fopBVisible) {
    let elementHolder = document.getElementById("fop-bottom-holder");
    let isClassPresent = ReactDOM.findDOMNode(elementHolder).classList.contains(
      "animate-fop"
    );
    if (!isClassPresent) {
      ReactDOM.findDOMNode(elementHolder).classList.add("animate-fop");
    }
  } else {
    let elementHolder = document.getElementById("fop-bottom-holder");

    if (elementHolder !== null) {
      ReactDOM.findDOMNode(elementHolder).classList.remove("animate-fop");
    }
  }

  if (fopEVisible) {
    let elementHolder = document.getElementById("fop-bottom-holder-e");
    let isClassPresent = ReactDOM.findDOMNode(elementHolder).classList.contains(
      "animate-fop"
    );
    if (!isClassPresent) {
      ReactDOM.findDOMNode(elementHolder).classList.add("animate-fop");
    }
  } else {
    let elementHolder = document.getElementById("fop-bottom-holder-e");

    if (elementHolder !== null) {
      ReactDOM.findDOMNode(elementHolder).classList.remove("animate-fop");
    }
  }

  return (
    <div className="anajal-fop  anajal-column">
      <div id="fop-holder" style={{ opacity: "0" }} ref={fopRef}>
        <div className="fop-title-container" id="convinces-container">
          <img src={foptitle} alt="fop-title" />
        </div>
        <div className="fop-content-container anajal-row">
          <div className="easy-content">
            {" "}
            <img src={easyone} alt="fop-title" />
          </div>
          <div className="custom-divider">
            <img src={xmark} alt="fop-title" />
          </div>
          <div className="easy-content">
            <img src={quicki} alt="fop-title" />
          </div>
          <div className="custom-divider">
            <img src={xmark} alt="fop-title" />
          </div>
          <div className="easy-content">
            <img src={fine} alt="fop-title" />
          </div>
        </div>
      </div>
      <div id="fop-bottom-holder" style={{ opacity: "0" }} ref={fopRefB} >
        <div className="fop-bottom-title-container">
          <img src={flow} alt="fop-title" />
        </div>
        <div className="fop-bottom-content-container anajal-row">
          <div className="easy-content">
            {" "}
            <img src={shareholder} alt="fop-title" />
          </div>
          <div className="custom-divider">
            <img src={divideri} alt="fop-title" />
          </div>
          <div className="easy-content">
            <img src={ticketsample} alt="fop-title" />
          </div>
          <div className="custom-divider">
            <img src={divideri} alt="fop-title" />
          </div>
          <div className="easy-content">
            <img src={offcard} alt="fop-title" />
          </div>
        </div>
      </div>
      <div className="sky-image">
        <div className="overlay"></div>
        <div className="container">
          <div className="button-holder">
            <div>
              <img src={yellowaction} alt="yellow-action-button" onClick={() => props.onChangeView("ad")} />
            </div>
          </div>
        </div>
      </div>
      <div
        id="fop-bottom-holder-e"
        style={{ opacity: "0" }}
        className="anajal-example "
        ref={fopRefE}
      >
        <div className="fop-example-title-container">
          <img src={exampleticket} alt="fop-title" />
        </div>
        <div className="fop-bottom-content-container anajal-row container">
          <div className="easy-content" style={{ padding: "0px 25px 0px 0px" }}>
            <img src={ana} alt="fop-title" />
          </div>

          <div className="easy-content" style={{ padding: "0px 0px 0px 25px" }}>
            <img src={jal} alt="fop-title" />
          </div>
        </div>
      </div>
    </div>
  );
}
