import React, { Component } from "react";

import "./PurchaseInstructions.scss";
import usernotes from "../../assets/img/usenotes.svg";
import yellowaction from "../../assets/img/yellow-action-btn.svg";
import useVisibility from "../../components/useVisibility";
import ReactDOM from "react-dom";



const PurchaseInstructions = (props) => {

    const [isFirstVisible, fopRef] = useVisibility(-150);
    if (isFirstVisible) {
      //animation:1000ms overviewbg-animation ease-out;
      let element = document.getElementById("purchase-notes");

      ReactDOM.findDOMNode(element).classList.add("animate-fop");
    } else {
      let element = document.getElementById("purchase-notes");

      if (element !== null) {
        ReactDOM.findDOMNode(element).classList.remove(
          "animate-fop"
        );
      }
    }

    return (
      <div className="anajal-column" id="precaution-container">
        <div
        style={{opacity:0}}
          id="purchase-notes"
          className="purchase-instruction  container"
          ref={fopRef}
        >
          <img src={usernotes} alt={usernotes} />
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
      </div>
    );
  
}

export default PurchaseInstructions;
