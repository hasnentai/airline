import React, { Component, useState, useEffect } from 'react';
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./CustomerContainer.scss";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { customerData } from "../../helpers/language";
import Fade from 'react-reveal/Fade';
const LoginContainer = (props) => {
    // const [isOpen, setIsOpen] = useState(props.isOpen);
    // const toggle = () => setIsOpen(!isOpen);
    const [isLogin, setLoginToggle] = useState(props.loginView ? props.loginView : false);
    const [logUser, setLoguser] = useState(false);
    const userLogged = () => {
        toast.success("User logged in Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setLoguser(true)
        setLoginToggle(false)
    }
    useEffect(() => {
        if (localStorage.getItem("email")) {
            axios.get(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/getuser?mail=${localStorage.getItem("email")}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                }
            }).then(data => {
                setLoguser(true)
            }).catch(err => {
                localStorage.clear()
            })
            // if(localStorage.getItem("auth_token"))
        }
        if (props.loginView) {
            setLoginToggle(true)
        } else {
            setLoginToggle(false)
        }
    }, [])
    return (
        <div id="data-value" className="margint-50 cust-container container">
            <ToastContainer />
            <h4 className="landing_form_label_ec" id="view-billing-information-header" onClick={props.changeView}><font><font>{customerData.customerInfoHeader}</font></font>{props.isOpen ? <div className="chevron-icon-bottom"><Button className="close form-close" onClick={props.hideLoginForm}><span aria-hidden="true">×</span></Button></div> : <div className="chevron-right-icon"><Button className="close form-close" onClick={props.hideLoginForm}><span aria-hidden="true">×</span></Button></div>}</h4>

            <Collapse isOpen={props.isOpen}>

                {!logUser && <div className="login_message_box_ec">
                    <p className="login_message_wrapper_ec">
                        <label>
                            <input id="show-login-view" type="checkbox" onChange={props.loginToggle} checked={props.loginView} /><font className="vert-align"><font className="vert-align">{customerData.loginToggleText}
                            </font></font>
                        </label>
                    </p>
                </div>}
                {logUser && <div class="alert_ec alert-success_ec">
                    <p className="mb-0"><font className="vert-align"><font className="vert-align">{customerData.nowLogged}</font></font></p>
                </div>}
                {props.loginView ? <Login userLogged={() => { userLogged();props.userLoggedIn()  }} /> :
                    <Register />}
            </Collapse>
        </div>
    )
}

export default LoginContainer;