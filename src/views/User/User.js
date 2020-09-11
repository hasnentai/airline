import React, { Component } from 'react';
import loginBg from "../../assets/img/morden_illustration.svg";
import Travel from "../../assets/img/crouded_illustration.svg";
import FOP from "../../assets/img/flow_of_purchase.svg";
import Conveniences from "../../assets/img/Conveniences.svg";
import "../AdContent/Ads.scss";
import "./User.scss";
class User extends Component {
    state = {}
    render() {
        return (<>
            <div className="container-fluid ad-container p-0">
                <img src={loginBg} width="100%" />
                <div className="btn ad-btn"  style={{ position: "absolute" }}>
                    <div className="alert-btn">You are logged in as User</div>
                </div>
            </div>
        </>);
    }
}

export default User;