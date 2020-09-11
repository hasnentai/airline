import React, { Component, useState } from "react";
import HeaderBase from "../../helpers/HeaderBase";
import { faq } from "../../helpers/language";
import "./faq.scss";
import useVisibility from "../../components/useVisibility"
import { Collapse, Button, CardBody, Card } from "reactstrap";
import ReactDOM from "react-dom";
const Faq = (props) => {
  const qaArray = faq.questionList.map((item) => ({ ...item, isOpen: false }));


  const [activeIndex, setActiveIndex] = useState(null);

  const [isFirstVisible, firstRef] = useVisibility(-150);

  if(isFirstVisible){
    //animation:1000ms overviewbg-animation ease-out;
    let element = document.getElementById("faq-holder");
   
    ReactDOM.findDOMNode(element).classList.add("animate-fop");
  

  } else {
     let element = document.getElementById("faq-holder");
     
    
     if(element!==null){

        
            
        ReactDOM.findDOMNode(element).classList.remove("animate-fop");
    
     }
    
  }


  return (
    <div id="faq-holder" style={{opacity:"0"}} className="faq-container" ref={firstRef}>
      <div className="container privacy-container" id="faq">
        <div className="fop-title mt-3 faq-title">{faq.header}</div>
        {/* <div className="text-center"><HeaderBase /></div> */}
        <div className="faq-container mt-3">
          {qaArray.map((item, index, arr) => (
            <div key={index}>
              <div
                className="ques-container"
                onClick={(event) =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className="faq-txt faq-ques-txt">Q.</span> {item.q}
                <div className="chevron-icon-bottom"></div>
              </div>
              <Collapse isOpen={activeIndex === index}>
                <div className="ans-container">
                  <span className="faq-txt faq-ques-txt"></span>{" "}
                  {item.children.map((val) => (
                    <React.Fragment>
                      <div> {val}</div>
                    </React.Fragment>
                  ))}
                  {item.block
                    ? item.block.map((ele) => (
                        <div key={Math.random} className="block-item">
                          <div className="block-head">{ele.header}</div>
                          <div className="block-data">{ele.value}</div>
                        </div>
                      ))
                    : ""}
                  <div
                    className="show-less"
                    onClick={(event) =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    <div className="chevron-icon-top"></div>
                    {faq.showLess}
                  </div>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
