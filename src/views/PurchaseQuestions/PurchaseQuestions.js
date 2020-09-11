import React, { Component } from 'react';
import "./PurchaseQuestions.scss";
import HeaderBase from "../../helpers/HeaderBase";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { shBenefits } from "../../helpers/language";
import AnaTicket from "../../assets/img/ana-ticket.jpg";
import JalTicket from "../../assets/img/jal-ticket.jpg";
var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function ExcelDateToJSDate(date) {
    let dateVal= new Date(Math.round((date - 25569)*86400*1000));
    return `${mL[dateVal.getMonth()]} ${dateVal.getFullYear()}`
  }
class PurchaseQuestions extends Component {
    render() {
        const { ques, toggle, increaseQuestionCount, toggleQUestionModal, changeView,showQuesModal } = this.props;
        return (
           

            
        <div className="top-border"><div className="inner-border">
            <div className="fop-title">
                Please help us in survey
            </div>
            <div className="text-center"><HeaderBase /></div>
            <br />
            {ques === 1 ?
                <div className="pc-questions">
                    Would you like to use JAL/ANA?
            </div>
                : ques === 2 ?
                    <div className="pc-questions">
                        Do you think it’s a hassle to use NARITA Airport?
            </div>
                    : ques === 3 ?
                        <div className="pc-questions">
                            Would you like to select your own airline time?
            </div> :
                        <div className="pc-questions">
                            Thank you for helping us in survey
</div>
            }
            {ques != 4 ? <div className="ques-btn-container">
                <Button className="yes-btn" onClick={increaseQuestionCount}>YES</Button>
                <Button className="no-btn" onClick={increaseQuestionCount}>NO</Button>
            </div> : ""}
            <Modal isOpen={showQuesModal} toggle={toggleQUestionModal} className="ques-modal">
                <ModalHeader toggle={toggleQUestionModal} className="fop-title text-center ques-header">BUY TICKETS</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="6" sm="6" xs="12" lg="6" className="pr-card"><Card >
                            <CardBody className="p-0">
                                <dl className="box_price ana">
                                    <dd>
                                    <img src={AnaTicket} className="ticket-imgs"/>
                                        <div className="price">
                                            <p>
                                                <b className="txt_date"><font className="vert-align"><font className="vert-align">Until the end of {this.props.productList.length&&ExcelDateToJSDate(this.props.productList[0].validity)}</font></font></b>
        <span className="txt_price"><font className="vert-align"><font className="vert-align">¥ {this.props.productList.length&&this.props.productList[0].price}</font></font></span>

                                            </p>
                                        </div>
                                    </dd>
                                </dl>
                            </CardBody>
                        </Card>
                        </Col>
                        <Col md="6" sm="6" xs="12" lg="6" className="pr-card">
                            <Card >
                                <CardBody className="p-0">
                                    <dl className="box_price ana jal">
                                        
                                        <dd>
                                            
                                    <img src={JalTicket} className="ticket-imgs"/>
                                            <div className="price">
                                                <p>
                                                    <b className="txt_date"><font className="vert-align"><font className="vert-align">Until the end of {this.props.productList.length&&ExcelDateToJSDate(this.props.productList[1].validity)}</font></font></b>
                                                    <span className="txt_price"><font className="vert-align"><font className="vert-align">¥ {this.props.productList.length&&this.props.productList[1].price}</font></font></span>
                                                </p>
                                            </div>
                                        </dd>
                                    </dl>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <div className="share-btn-container">

                        <div className="btn ad-btn" onClick={() => { changeView("ad"); toggleQUestionModal(); }}>
        <a href="#data-value" className="cvBtn"><span><font className="vert-align"><div className="vert-align ad-text ad-test-l1 buy-now-btn"><span className="buy-now-sec-1">{shBenefits.buyNow1}</span><span className="buy-now-sec-2">{shBenefits.buyNow2}</span><span className="buy-now-sec-1">{shBenefits.buyNow3}</span></div></font></span></a>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div> </div>);
    }
}

export default PurchaseQuestions;