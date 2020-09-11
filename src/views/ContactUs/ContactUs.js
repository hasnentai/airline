import React from "react";
import "./ContactUs.scss";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { contactUs } from "../../helpers/language";
const ContactUs = (props) => {
    return (
        <div>
            <Header />

            <div className="fop-title text-center" style={{ color: "#86cee7", marginTop: "150px" }}>{contactUs.header}</div>
            <div class="con_txt container">
                <ul class="box_txt">
                    <li><span>{contactUs.leftSection[0]}<br />{contactUs.leftSection[1]}</span></li>
                    <li>{contactUs.leftSection[2]}</li>
                    <li>{contactUs.leftSection[3]}</li>
                    <li><span>{contactUs.leftSection[4]}</span>{contactUs.leftSection[5]}</li>
                </ul>
                <div class="box_contact">
                    <p class="title_tel"><span>【</span>&nbsp;{contactUs.rightSection.t1}<br class="view_tab-sp" />{contactUs.rightSection.t2}&nbsp;<span>】</span></p>
                    <dl>
                        <dt>
                            {contactUs.rightSection.t3}
                        </dt>
                        <dd>
                            <p class="txt_tel"><span class="num">TEL: </span><span class="tel">{contactUs.rightSection.telephone}</span></p>
                        </dd>
                    </dl>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactUs