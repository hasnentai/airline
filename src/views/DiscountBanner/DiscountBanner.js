import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardGroup,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import Fade from "react-reveal/Fade";
import "./DiscountBanner.scss";
import cardlogoone from "../../assets/img/bulb-c1.png";
import cardlogotwo from "../../assets/img/discount-c2.png";
import cardlogothree from "../../assets/img/discount-c4.png";
import cardlogofour from "../../assets/img/envelop-c3.png";
import SiteOffer from "../../assets/img/website-offering.jpg";
class DiscountBanner extends Component {
  state = {};
  render() {
    return (
      <div className="dic-wrapper">
        <div className="disc-banner-container">
          <div className="container">
          
              <h3>What This Site Offers</h3>
              <img alt="site-offer" src={SiteOffer} width="100%"/>
              {/* <Row>
                <CardGroup className="card-group">
                  <Col md="6" sm="12" xs="3" className="p-3">
                    <Card>
                      <CardImg
                        style={{ height: "100px", objectFit: "contain" }}
                        src={cardlogoone}
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardText>
                          <div style={{ marginBottom: 0 }}>発表します!!</div>
                          <div style={{ marginTop: 0 }}>
                            旅慣れている⼈なら<span>誰もが知っている</span>
                          </div>
                          <div>Heads up!!</div>
                          <div>
                            The ultimate life-hack{" "}
                            <span>every jet setter knows</span>
                          </div>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" sm="12" xs="12" className="p-3">
                    <Card>
                      <CardImg
                        style={{ height: "100px", objectFit: "contain" }}
                        src={cardlogotwo}
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardText>
                          <div>
                            <span>
                              Book plane tickets at an “absolute” discount.
                            </span>
                          </div>
                          <span>JAL ANA 株主優待番号メールで即納.com</span>
                          はそれを提供します
                          <div>
                            <span>JALANA </span>helps you do just that
                          </div>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" sm="12" xs="12" className="p-3">
                    <Card>
                      <CardImg
                        style={{ height: "100px", objectFit: "contain" }}
                        src={cardlogothree}
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardText>
                        なんで「断然」安く購⼊できるの?
                          <div>
                            Why can you buy at an <span>”absolute”</span>
                            discount?
                          </div>
                          <span>株主優待券のコード</span>を即時
                          <span>メールで受け取れて、</span>
                          <span> shareholder benefit code </span>instantly
                          <span> in your email</span>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" sm="12" xs="12" className="p-3">
                    <Card>
                      <CardImg
                        style={{ height: "100px", objectFit: "contain" }}
                        src={cardlogofour}
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardText>
                          株主優待券コードを使うと国内線が<span>50％オフ</span>
                          になるからです！
                          <div>
                            And when you use the code, all domestic flights{" "}
                            <span> become 50% off! </span>
                          </div>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </CardGroup>
              </Row> */}
            </div>
          </div>
        </div>
     
    );
  }
}

export default DiscountBanner;
