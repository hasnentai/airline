import React, { Component } from "react";
import "./ShareHolder.scss";
import { Row, Col, Card, Button } from "reactstrap";
import Discount from "../../assets/img/discountcard1.svg";

import Discount2 from "../../assets/img/disc_card_2.svg";
import DiscountCard from "../../assets/img/tickets.jpg";
import { shBenefits } from "../../helpers/language";
import HeaderBase from "../../helpers/HeaderBase";
import LazyLoad from "react-lazyload";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Discount1 from "../../assets/img/discount-one.jpg";
const data = [
  {
    head: "ANA",
    dep: "TOKYO",
    arr: "SAPPORO",
    validity: "30/11/2020",
    price: "38,960",
    shPrice: "23,740",
    brA: "19,010",
    brB: "4,750",
  },
  {
    head: "JAL",
    dep: "TOKYO",
    arr: "SAPPORO",
    validity: "30/11/2020",
    price: "39,160",
    shPrice: "24,160",
    brA: "19,010",
    brB: "4,750",
  },
];

const ShareHolder_Jal = (props) => {
  return (
    <div className="discount-cards">
      <div className="container ">
    

        <Row>
          <Col>
            <div className="discount-cards-header">{shBenefits.header}</div>
            <div className="flex-wrapper">
                
                <div className="display-3 font-weight-light p-2 ">JAL</div>
                <div className="destination font-weight-bolder p-2 ">東京(Tokyo) <span>&#8594;</span> 札幌(Sapporo)</div>
            </div>
            <div >
                <img className="disc-img" src={Discount1} alt="disc-one"/>
            </div>
            <div className="price-info">
                <div className="h2 text-center font-weight-bold pb-2 break-down" >壊す</div>
                <div className="price-calc h3 text-center ">
                株主優待価格  ¥29,010 </div>
                <div className="text-center font-weight-bold h4 pb-2">+</div>
                <div className="text-center h3 p-2">株主優待券  ¥4750</div>
            </div>
                
            <Zoom top>
              <div className="share-btn-container">
                <div
                  className="btn ad-btn"
                  onClick={() => props.changeView("ad")}
                >
                  <a href="#data-value" className="cvBtn">
                    <span>
                      <font className="vert-align">
                        <div className="vert-align ad-text ad-test-l1">
                          <span className="buy-now-sec-1">
                            {shBenefits.buyNow1}
                          </span>
                          <span className="buy-now-sec-2">
                            {shBenefits.buyNow2}
                          </span>
                          <span className="buy-now-sec-1">
                            {shBenefits.buyNow3}
                          </span>
                        </div>
                      </font>
                    </span>
                  </a>
                </div>
              </div>
            </Zoom>
          </Col>
          <Col className="share-holder-right">
          <div className="image-holder">
          <img src={DiscountCard} alt="discount-card"></img>
          </div>
          
          </Col>
        </Row>

        {/* <div className="fop-title">{shBenefits.header}</div> */}

        {/* {
                    data.map((item, i) => (
                        <Card className={`share-card share-card-${i}`} key={i}>
                            <div className="share-left">
                                <div className="share-header">{item.head}</div>
                                <div className="travel-place">{item.dep}&nbsp;&nbsp; 	&#8594; &nbsp;&nbsp;{item.arr}</div>
                                <div className="date">{item.validity}</div>
                                <div className="date">REGULAR PRICE</div>
                                <div className="rp"><div className="rp-inner">&#165; {item.price}
                                    <div class="line2"></div></div></div>
                                <div className="sb-price-container">
                                    <div>SHARE HOLDER BENEFIT PRICE</div>
                                    <div>&#165; {item.shPrice}</div>
                                </div>
                            </div>
                            <div className="share-right">
                                <div className="bk-txt">BREAKDOWN</div>
                                <div>SHAREHOLDER BENEFIT</div>
                                <div className="share-pr">PRICE: &#165;{item.brA}</div>
                                <div className="plus-sign">+</div>
                                <div className="sh-num-text">SHAREHOLDER NUMBER</div>
                                <div className="bottom-txt">FOR EXAMPLE IF THE NUMBER PRICE WERE &#165;{item.brB}</div>
                            </div>
                        </Card>
                    ))
                } */}
      </div>
    </div>
  );
};
export default ShareHolder_Jal;
