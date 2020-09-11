import React, { Component } from 'react';
import "../../styles/confirmation.scss";
import Footer from "../footer/Footer";
import "./payment.scss";
import { withRouter } from 'react-router';
import PaymentSuccessImg from "../../assets/img/transaction.png";
import { customerData as customerInfoData, confirmation, orderCompletion } from "../../helpers/language";
function PaymentSuccess(props) {
    return (
        <div className="form_confirm_ec container">
            <div className="block_ec form_wizard_ec">
                <h1 class="confirm_title_ec"><font className="vert-align"><font className="vert-align">{orderCompletion.orderCompleteHeader}</font></font></h1>
                <ul class="form_wizard_levels_ec">
                    <li>
                        <a>
                            <span><font className="vert-align"><font className="vert-align">1</font></font></span><font className="vert-align"><font className="vert-align">
                                {customerInfoData.customerInfoHeader}
                            </font></font></a>
                    </li>
                    <li >
                        <a>
                            <span><font className="vert-align"><font className="vert-align">2</font></font></span><font className="vert-align"><font className="vert-align">
                                {confirmation.orderConfirmationTab}
                            </font></font></a>
                    </li>
                    <li class="active">
                        <a>
                            <span><font className="vert-align"><font className="vert-align">3</font></font></span><font className="vert-align"><font className="vert-align">
                                {confirmation.orderCompletionTab}
                            </font></font></a>
                    </li>
                </ul>
                <div style={{ marginTop: "70px" }}>
                    <div class="confirm_subtitle_ec">
                        <p><font className="vert-align"><font className="vert-align">{orderCompletion.orsCompleted}</font></font></p>
                    </div>
                    <div className="payment-content">
                        <img src={PaymentSuccessImg} className="payment-success-img" />
                        <div className="order-text">
                            <div>{orderCompletion.yourOrder}</div>
                        </div>
                        <div className="order-text">
                            <div>{orderCompletion.registeredLater}</div>
                            <div>{orderCompletion.isCorrect}</div>
                        </div>
                        <div className="order-text">
                            <div>
                                {/* The email may be delayed depending on the order processing status */}
                            </div>
                            <div>
                                {orderCompletion.emailFolder}
                            </div>
                            <div>
                                {orderCompletion.mailJunkFolder}
                            </div>
                        </div>
                        <div className="order-text">
                            <div>
                                {orderCompletion.contactEmailAddress}
                            </div>
                            <div>
                                {orderCompletion.mailJunkFolder}      <a href="mailto:customer@airlineticket.co">customer@airlineticket.co</a>
                            </div>

                        </div>
                    </div>
                    <div class="confirm_subtitle_ec">
                        <p><font className="vert-align"><font className="vert-align">{orderCompletion.completionInformation}</font></font></p>
                    </div>
                    <table class="table_ec table_bordered_ec qa-shippings">
                        <tbody>
                            <tr>
                                <th class="menu_ec" style={{ width: "50%" }}><font className="vert-align"><font className="vert-align">{orderCompletion.orsNumber}</font></font></th>
                                <td class="qa-name"><font className="vert-align"><font className="vert-align">{(Math.random() * 1e6).toFixed(0)}</font></font></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default withRouter(PaymentSuccess);