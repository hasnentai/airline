import React, { Component } from "react";

import "./Overview.scss";
import overviewText from "../../assets/img/overviewtext.svg";
import overviewImage from "../../assets/img/banner-tag.jpg";
import infoone from "../../assets/img/person-info-one.svg";
import infotwo from "../../assets/img/person-info-two.svg";
import infothree from "../../assets/img/person-info-three.svg";
import infofour from "../../assets/img/person-info-four.svg";
import useVisibility from "../../components/useVisibility"
import ReactDOM from "react-dom";


const Overview = (props) => {
  const [isFirstVisible, firstRef] = useVisibility(-110);

  console.log(firstRef)
  if(isFirstVisible){
    //animation:1000ms overviewbg-animation ease-out;
    let element = document.getElementById("airport-image");
   
    ReactDOM.findDOMNode(element).classList.add("animate-airport");
    
    let elementHolder = document.getElementById("img-holder");
    ReactDOM.findDOMNode(elementHolder).classList.add("people-image-animation");

    
    let elementHolderImage = document.getElementById("text-anime");
    ReactDOM.findDOMNode(elementHolderImage).classList.add("img-anime");

  } else {
     let element = document.getElementById("airport-image");
     let elementHolder = document.getElementById("img-holder");
     let elementHolderImage = document.getElementById("text-anime");
    
     if(element!==null){

        
       
        ReactDOM.findDOMNode(elementHolder).classList.remove("people-image-animation");
        ReactDOM.findDOMNode(element).classList.remove("animate-airport");        
        ReactDOM.findDOMNode(elementHolderImage).classList.remove("img-anime");
    
     }
    
  }






  return (
    <div className="overview-wrapper anajal-row"  ref={firstRef} id="beginner-guide-container">
      <div className="overview-section-one anajal-column">
        <img
        style={{opacity:0}}
        id="text-anime"
          className="overview-section-text"
          src={overviewText}
          alt="overviewtext"
          
        />
      </div>
      <div className="overview-display-none overview-section-two">
        <img
          id="airport-image"
          className="overview-section-img"
          src={overviewImage}
          alt="overviewtext"
          style={{opacity:"0"}}
          
        />
        <div className="person-infos">
          <div id="img-holder" className="anajal-column ">
            <img
            style={{opacity:"0"}}
            id="img-one"
              className="person-info-one "
              src={infoone}
              alt="overviewtext"
              
            />
            <img
            style={{opacity:"0"}}
             id="img-two"
              className="person-info-two"
              src={infotwo}
              alt="overviewtext"
              
            />
            <img
            style={{opacity:"0"}}
            id="img-three"
              className="person-info-three"
              src={infothree}
              alt="overviewtext"
              
            />
            <img
            style={{opacity:"0"}}
            id="img-four"
              className="person-info-four"
              src={infofour}
              alt="overviewtext"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
