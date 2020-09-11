import React, { Component, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";
import PopoverComponent from "../../components/popover/Popover";
import { ToastContainer, toast } from 'react-toastify';
import * as JwtDecode from "jwt-decode";
import "./Login.scss";
import { customerData } from "../../helpers/language";
import Fade from 'react-reveal/Fade';

const errorObj = {
    email: `* ${customerData.emailError}`,
    password: `* ${customerData.passwordError}`,
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateform(data, value) {
    let error;

    if (value == "email") {
        error = validateEmail(data)
        error = !error
    } else if (value == "phone") {
        error = data.toString().length === 10 ? false : true
    } else error = data.length ? false : true
    return error;
}

const Login = (props) => {
    let history = useHistory();
    const [formData, setFormData] = React.useState({ email: "", password: "" });
    const [errors, setError] = React.useState({})
    const [passwordShown, setPasswordShown] = React.useState(false)
    const getInputValue = (ev) => {
        setError({ ...errors, [ev.target.id]: false })
        setFormData({ ...formData, [ev.target.id]: ev.target.value })
    }
    const togglePasswordVisibility=()=>{
        setPasswordShown(!passwordShown)
    }
    const onLogin = (ev) => {
        let data = ev.preventDefault();
        let errors = {}
        Object.keys(formData).forEach(item => {
            errors[item] = validateform(formData[item], item);
        })
        setError(errors);
        let errArray = Object.values(errors).indexOf(true);
        let { email: mail, password } = formData;
        errArray == -1 && axios.post("https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/login", { mail, password }).then(data => {

            setFormData({ email: "", password: "" })
            var decoded = JwtDecode(data.data.auth_token);
            if (decoded.role == "user") {
                localStorage.setItem("auth_token", data.data.auth_token);
                localStorage.setItem("email", decoded.user);
                localStorage.setItem("session_id",data.data.session_id);
                props.userLogged();
            }
            else throw "invalid user"

        }).catch(err => {
            toast.error("Invalid Email or Password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }
    return (
        <Fade bottom>
            <div>
                <ToastContainer />
                <div className="login_message_ec">
                    <p><font className="vert-align"><font className="vert-align">{customerData.loginInfoTxt}</font></font></p>
                </div>
                <Form className="login-form">
                    <div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.emailAddress}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="email" className="form-input email-input" name="email" id="email" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData.email} />
                            {errors.email && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.email}</div></PopoverComponent>}
                        </div>
                    </div>
                    <div className="row m-0 password-row">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.password}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type={passwordShown?'text':'password'} className="form-input email-input password-input" name="email" id="password" placeholder="Example) ********" onChange={($event)=>{getInputValue($event)}} value={formData.password} /><i class="fa fa-eye password-icon" aria-hidden="true" onClick={togglePasswordVisibility}></i>
                            {errors.password && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.password}</div></PopoverComponent>}

                        </div>
                    </div>
                    <div className="btn-container">
                        <Button className="form-btn" onClick={onLogin}>{customerData.login}</Button>
                    </div>
                </Form>
            </div>
        </Fade>
    )
}
export default Login;