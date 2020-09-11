import React, { Component, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PopoverComponent from "../../components/popover/Popover";
import { Toast, ToastBody, ToastHeader, Table } from 'reactstrap';
import axios from "axios";
import "./Register.scss";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router';
import { data } from "../../helpers/postal.js";
import { customerData } from "../../helpers/language";
import Fade from 'react-reveal/Fade';
// import Loader from "../Loader/Loader";
import * as Cryptr from "cryptr";
const cryptr = new Cryptr('Airline@$Ticket123#');




function returnNumbers() {
    return (<React.Fragment>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
    </React.Fragment>)
}

const errorObj = {
    email: `* ${customerData.emailError}`,
    confirmmail: `* ${customerData.emailError}`,
    password: `* ${customerData.passwordError}`,
    phonetic: `* ${customerData.enterkatakana}`,
    postal: `* ${customerData.enterInteger}`,
    phone: `* ${customerData.enterInteger}`,
    password: `* ${customerData.passwordErrNumbers}`
}
function generateNumbers(start, num) {
    let arr = [];
    for (let i = start; i <= num; i++) {
        arr.push(i)
    }
    return arr;
}
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateform(data, value) {
    let error;
    if (value.toString().toLowerCase().includes("check")) {
        error = !data;
        return error
    }
    if (value == "email" || value == "confirmmail") {
        error = validateEmail(data)
        error = !error
    } if (value == "phone") {
        error = String(data).length < 10 ? true : false
    } else {
        error = data.toString().length ? false : true
    }
    return error;
}


const Register = (props) => {
    let formFields = {
        product: "",
        fname: "",
        lname: "",
        phonetic: "",
        postal: "",
        prefecture: "",
        address1: "",
        address2: "",
        address3: "",
        phone: "",
        email: "",
        confirmmail: "",
        password: "",
        sex: "",
        bdYear: "",
        bdMonth: "",
        bdDay: "",
        paymentMethod: "Credit card lump sum",
        ccNumber: "",
        expDate: "",
        cardHolder: "",
        termsCheck: false,
        p1Check: false,
        p2Check: false,
        p3Check: false,
        p4Check: false,
        p1Items: 1,
        p2Items: 1,
        p3Items: 1,
        p4Items: 1

    }
    const [formData, setFormData] = React.useState({ ...formFields });
    const [errors, setError] = React.useState({})
    const [productList, setProductList] = React.useState([])
    const [productSelect, setProductSelect] = React.useState({})
    const [scratchList, setScratchList] = React.useState([])
    const [showLoader, setShowLoader] = React.useState(0);
    useEffect(() => {
        axios.get(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/Getproduct`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        }).then(data => {
            setProductList(data.data)
            //  debugger
        }).catch(err => {
            localStorage.clear()
        })
        if (localStorage.getItem("email")) {
            axios.get(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/getuser?mail=${localStorage.getItem("email")}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                }
            }).then(data => {
                if (data.data.message && data.data.message.includes("pls")) {
                    localStorage.clear()
                    return false
                }
                let mail = data.data.Mail ? data.data.Mail[0] : {}
                let value = {
                    product: "",
                    fname: "",
                    lname: "",
                    phonetic: "",
                    postal: "",
                    prefecture: "",
                    address1: "",
                    address2: "",
                    address3: "",
                    phone: "",
                    email: "",
                    confirmmail: "",
                    password: "",
                    sex: "",
                    bdYear: "",
                    bdMonth: "",
                    bdDay: "",
                    paymentMethod: "",
                    ccNumber: "",
                    expDate: "",
                    cardHolder: "",
                    termsCheck: false,
                    p1Check: false,
                    p2Check: false,
                    p3Check: false,
                    p4Check: false,
                    p1Items: 1,
                    p2Items: 1,
                    p3Items: 1,
                    p4Items: 1
                }
                value.fname = mail.Name.split(" ")[1] ? mail.Name.split(" ")[0] : "";
                value.lname = mail.Name.split(" ")[1] ? mail.Name.split(" ")[1] : mail.Name.split(" ")[0];
                value.phonetic = mail.Phonetic;
                value.address1 = mail.Address1;
                value.address2 = mail.Address2;
                value.address3 = mail.Address3;
                value.phone = Number(mail.Phone_no);
                value.sex = mail.sex;
                value.postal = mail.Postel_code;
                value.email = mail.Email;
                value.confirmmail = mail.Email;
                value.prefecture = mail.prefectures;
                if (mail.Birthday && mail.Birthday.length) {
                    mail.Birthday = mail.Birthday.split("/");
                    value.bdDay = Number(mail.Birthday[0]);
                    value.bdMonth = Number(mail.Birthday[1]);
                    value.bdYear = mail.Birthday[2];
                }
                setFormData(value)
            }).catch(err => {
                localStorage.clear()
            })

        }
    }, [])
    useEffect(() => {
        let data = productSelect;
    }, [productSelect])
    const addToCart = (ev, product) => {
        const { checked, value } = ev.target;
        let payload = {
            "product_name": product.Product_Name,
            "NoItem": value.toString()
        }
        //  setProductSelect({...productSelect,[product.Product_Name]:{...product,itemsSelected:value.toString()}})

        axios.post(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/cart`, payload, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        }).then(data => {
            data = data.data;
            if (data.Alert) alert(data.Alert)
            else {
                let selectedProduct = productSelect;
                if (selectedProduct[product.Product_Name]) {
                    setScratchList([...scratchList, ...data])
                    setProductSelect({ ...productSelect, [product.Product_Name]: { ...product, itemsSelected: value.toString() } })
                    setTimeout(() => {
                        console.log(scratchList, productSelect)
                    }, 3000)
                }
            }
        }).catch(err => {

        })
    }
    const checkProduct = (ev, product, items) => {
        const { checked, value } = ev.target;
        if (checked == true) {
            let payload = {
                "product_name": product.Product_Name,
                "NoItem": formData[items]
            }
            // setProductSelect({ ...productSelect, [product.Product_Name]: { ...product, itemsSelected: formData[items] } })
            // console.log(productSelect)
            //  debugger
            axios.post(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/cart`, payload, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                }
            }).then(data => {
                data = data.data;
                if (data.Alert) alert(data.Alert)
                else {
                    setScratchList([...scratchList, ...data])
                    setProductSelect({ ...productSelect, [product.Product_Name]: { ...product, itemsSelected: formData[items] } })
                    setTimeout(() => {
                        console.log(scratchList, productSelect)
                    }, 3000)
                }
            }).catch(err => {

            })

        } else {
            if (productSelect[product.Product_Name]) {
                let selectedProduct = productSelect;
                delete selectedProduct[product.Product_Name]
                setProductSelect(selectedProduct)
            }
        }


    }
    const getInputValue = (ev) => {
        console.log(ev.target.type)
        if (ev.target.id == "postal" && ev.target.value.length == 7) {
            if (data[ev.target.value]) {
                let arr = data[ev.target.value];
                console.log(arr[0], arr[1], arr[2])
                setFormData({ ...formData, prefecture: arr[0].toString(), address2: arr[1], address1: arr[2], [ev.target.id]: ev.target.value })
                return
            } else {
                alert("Invalid postal code")
            }

        }
        setError({ ...errors, [ev.target.id]: false })
        if (ev.target.type == "checkbox") {
            setFormData({ ...formData, [ev.target.id]: ev.target.checked })
        }

        else {
            setFormData({ ...formData, [ev.target.id]: ev.target.value })
        }
    }
    const onLogin = (ev) => {
        setShowLoader(true)
        let data = ev.preventDefault();
        let errors = {}
        Object.keys(formData).forEach(item => {
            if (item != "paymentMethod" && item != "ccNumber" && item != "expDate" && item != "cardHolder") {

                errors[item] = validateform(formData[item], item);

            }
        })
        delete errors["paymentMethod"]
        delete errors["ccNumber"]
        delete errors["expDate"]
        delete errors["cardHolder"]
        errors.product = false;
        if (!errors.p1Check || !errors.p2Check || !errors.p3Check || !errors.p4Check) {
            errors.p1Check = false;
            errors.p2Check = false;
            errors.p3Check = false;
            errors.p4Check = false;
        }
        if (localStorage.getItem("auth_token")) errors.password = false
        setError(errors);
        let errArray = Object.values(errors).indexOf(true)
        let { fname, lname, phonetic, postal, prefecture, address1, address2, address3, phone, email, password, sex, bdDay, bdMonth, bdYear } = formData;
        let payload = {
            name: `${fname} ${lname}`,
            phonetic, postel: postal, prefectures: prefecture, address1, address2, address3, phoneno: phone, mail: email, password, sex, dob: `${bdDay}/${bdMonth}/${bdYear}`
        }
        if (errArray != 1) setShowLoader(false)
        if (errArray == -1 && localStorage.getItem("auth_token")) {
            setShowLoader(true)
            let encryptedData = cryptr.encrypt(JSON.stringify({ formData, productSelect, productList, scratchList }))
            sessionStorage.setItem("user_data", encryptedData);
            props.history.push("/confirmation")
        }
        else {
            if (errArray == -1) {
                setShowLoader(true)
                axios.post(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/register`, payload).then(data => {
                    data = data.data;
                    toast.success("User Registered Successfully", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    let encryptedData = cryptr.encrypt(JSON.stringify({ formData, productSelect, productList, scratchList }))
                    sessionStorage.setItem("user_data", encryptedData);
                    props.history.push("/confirmation")
                }).catch(err => {
                    toast.error("Registration failed", {
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
        }
    }
    return (
        <Fade bottom>
            <div>
                {/* {showLoader ? <Loader /> : ""} */}
                <ToastContainer />
                <div className="login_message_ec">
                    <p><font className="vert-align"><font className="vert-align">{customerData.customerDetailsApply}</font></font></p>
                </div>
                <Form className="login-form">
                    <div>
                        <h4 className="landing_form_label_ec m-0" id="view-billing-information-header"><font><font>{customerData.productInfoTxt}</font></font></h4>
                        <div className="product-info-wrap">
                            {productList.length ? <Table striped>
                                <thead>
                                    <tr>
                                        <th>{customerData.selectProductTxt}</th>
                                        <th>{customerData.productName}</th>
                                        <th>{customerData.productPrice}</th>
                                        <th>{customerData.qtyToPurchase}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <FormGroup check>
                                                <Input type="checkbox" onChange={($event) => { getInputValue($event); checkProduct($event, productList[0], "p1Items") }} id="p1Check" checked={formData.p1Check} />{' '}
                                            </FormGroup>
                                        </th>
                                        <td>{productList[0].Product_Name}</td>
                                        <td>&#165;{productList[0].price}</td>
                                        <td>
                                            <Input type="select" name="select" id="p1Items" value={formData.p1Items} onChange={($event) => { getInputValue($event); addToCart($event, productList[0]) }}>
                                                {returnNumbers()}
                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <FormGroup check>
                                                <Input type="checkbox" onChange={($event) => { getInputValue($event); checkProduct($event, productList[1], "p2Items") }} checked={formData.p2Check} id="p2Check" />{' '}
                                            </FormGroup>
                                        </th>
                                        <td>{productList[1].Product_Name}</td>
                                        <td>&#165;{productList[1].price}</td>
                                        <td>
                                            <Input type="select" name="select" id="p2Items" value={formData.p2Items} onChange={($event) => { getInputValue($event); addToCart($event, productList[1]) }}>
                                                {returnNumbers()}
                                            </Input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <FormGroup check>
                                                <Input type="checkbox" onChange={($event) => { getInputValue($event); checkProduct($event, productList[2], "p3Items") }} checked={formData.p3Check} id="p3Check" />{' '}
                                            </FormGroup>
                                        </th>
                                        <td>{productList[2].Product_Name}</td>
                                        <td>&#165;{productList[2].price}</td>
                                        <td>
                                            <Input type="select" name="select" id="p3Items" value={formData.p3Items} onChange={($event) => { getInputValue($event); addToCart($event, productList[2]) }}>
                                                {returnNumbers()}
                                            </Input>
                                        </td>
                                    </tr><tr>
                                        <th scope="row">
                                            <FormGroup check>
                                                <Input type="checkbox" onChange={($event) => { getInputValue($event); checkProduct($event, productList[3], "p4Items") }} checked={formData.p4Check} id="p4Check" />{' '}
                                            </FormGroup>
                                        </th>
                                        <td>{productList[3].Product_Name}</td>
                                        <td>&#165;{productList[3].price}</td>
                                        <td>
                                            <Input type="select" name="select" id="p4Items" value={formData.p4Items} onChange={($event) => { getInputValue($event); addToCart($event, productList[3]) }}>
                                                {returnNumbers()}
                                            </Input>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table> : ""}
                        </div>

                    </div>
                    {/* <div className="row m-0">
                    <div className="col-md-5 col-xs-12 landing_form_ec">
                        <p className="form_box_label_ec">
                            <strong><font className="vert-align"><font className="vert-align">Product name</font></font></strong>
                            <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                        </p>
                    </div>
                    <div className="col-md-7 col-xs-12 email-field">
                        <Input type="select" className="form-input email-input" name="product" id="product" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData["product"]}>
                            <option value="492" selected="selected">Product 1</option>
                            <option value="490">Product 2</option>
                        </Input>
                        {errors.email && <PopoverComponent ><div>* {customerData.reqFieldError}</div></PopoverComponent>}
                    </div>
                </div> */}
                    <div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.nameOfTheCustomer}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field name-field">
                            <div className="row m-0">
                                <div className="col-md-6 col-xs-12 inner-input pl-0 m-0 fname">
                                    <Input type="text" className="form-input email-input" name="fname" id="fname" placeholder="Surname" onChange={getInputValue} value={formData.fname} />
                                    {errors.fname && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                                </div>
                                <div className="col-md-6 col-xs-12 inner-input p-0 lname">
                                    <Input type="text" className="form-input email-input" name="lname" id="lname" placeholder="Name" onChange={getInputValue} value={formData.lname} />
                                    {errors.lname && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                                </div>
                            </div>

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.phonetic}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="phonetic" className="form-input email-input" name="phonetic" id="phonetic" placeholder="Yamada Hanako" onChange={getInputValue} value={formData.phonetic} />
                            {errors.phonetic && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.phonetic}</div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.postalCode}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field postal" style={{ display: 'flex' }}>
                            <Input type="text" className="form-input email-input" name="postal" id="postal" placeholder="Example) 1500031" onChange={getInputValue} value={formData.postal} />
                            {errors.postal && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.postal}</div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.prefecture}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="select" className="form-input email-input" name="prefecture" id="prefecture" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData["prefecture"]}>
                                <option value="">Please select</option>
                                <option value="1">Hokkaido</option>
                                <option value="2">Aomori Prefecture</option>
                                <option value="3">Iwate Prefecture</option>
                                <option value="4">Miyagi Prefecture</option>
                                <option value="5">Akita</option>
                                <option value="6">Yamagata Prefecture</option>
                                <option value="7">Fukushima Prefecture</option>
                                <option value="8">Ibaraki Prefecture</option>
                                <option value="9">Tochigi Prefecture</option>
                                <option value="10">Gunma Prefecture</option>
                                <option value="11">Saitama</option>
                                <option value="12">Chiba</option>
                                <option value="13">Tokyo</option>
                                <option value="14">Kanagawa Prefecture</option>
                                <option value="15">Niigata</option>
                                <option value="16">Toyama Prefecture</option>
                                <option value="17">Ishikawa Prefecture</option>
                                <option value="18">Fukui Prefecture</option>
                                <option value="19">Yamanashi Prefecture</option>
                                <option value="20">Nagano Prefecture</option>
                                <option value="21">Gifu Prefecture</option>
                                <option value="22">Shizuoka Prefecture</option>
                                <option value="23">Aichi prefecture</option>
                                <option value="24">Mie Prefecture</option>
                                <option value="25">Shiga Prefecture</option>
                                <option value="26">Kyoto</option>
                                <option value="27">Osaka Prefecture</option>
                                <option value="28">Hyogo prefecture</option>
                                <option value="29">Nara Prefecture</option>
                                <option value="30">Wakayama Prefecture</option>
                                <option value="31">Tottori prefecture</option>
                                <option value="32">Shimane Prefecture</option>
                                <option value="33">Okayama Prefecture</option>
                                <option value="34">Hiroshima Prefecture</option>
                                <option value="35">Yamaguchi Prefecture</option>
                                <option value="36">Tokushima</option>
                                <option value="37">Kagawa Prefecture</option>
                                <option value="38">Ehime Prefecture</option>
                                <option value="39">Kochi Prefecture</option>
                                <option value="40">Fukuoka Prefecture</option>
                                <option value="41">Saga Prefecture</option>
                                <option value="42">Nagasaki Prefecture</option>
                                <option value="43">Kumamoto Prefecture</option>
                                <option value="44">Oita Prefecture</option>
                                <option value="45">Miyazaki</option>
                                <option value="46">Kagoshima prefecture</option>
                                <option value="47">Okinawa Prefecture</option>
                            </Input>
                            {errors.prefecture && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.address1}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="address1" className="form-input email-input" name="address1" id="address1" placeholder="Example) ○○ City △△ Ward □ Town" onChange={getInputValue} value={formData.address1} />
                            {errors.address1 && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.address2}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="address2" className="form-input email-input" name="address2" id="address2" placeholder="Example) △Chome 1-4" onChange={getInputValue} value={formData.address2} />
                            {errors.address2 && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.address3}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="address3" className="form-input email-input" name="address3" id="address3" placeholder="Example) ○○ Mansion 101" onChange={getInputValue} value={formData.address3} />
                            {errors.address3 && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.phoneNumber}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="number" className="form-input email-input" name="phone" id="phone" placeholder="Example) 0000000000" onChange={getInputValue} value={formData.phone} />
                            {errors.phone && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.phone}</div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
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
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.confirmMail}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field conf-mail">
                            <Input type="confirmmail" className="form-input email-input" name="email" id="confirmmail" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData.confirmmail} />
                            {errors.confirmmail && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.confirmmail}</div></PopoverComponent>}
                            <div className="check-confirm">{customerData.emailNotReceived}</div>

                        </div>
                    </div>
                    {!localStorage.getItem("email") && <div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.password}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="password" className="form-input email-input" name="password" id="password" placeholder="8 or more single-byte alphanumeric characters" onChange={getInputValue} />
                            {errors.password && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div>{errorObj.password}</div></PopoverComponent>}

                        </div>
                    </div>}
                    <div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.sex}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field">
                            <Input type="select" className="form-input email-input" name="sex" id="sex" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData["sex"]}>
                                <option value="">Please select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Input>
                            {errors.sex && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                        </div>
                    </div><div className="row m-0">
                        <div className="col-md-5 col-xs-12 landing_form_ec">
                            <p className="form_box_label_ec">
                                <strong><font className="vert-align"><font className="vert-align">{customerData.birthday}</font></font></strong>
                                <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                            </p>
                        </div>
                        <div className="col-md-7 col-xs-12 email-field bday-field">
                            <div className="bd-inner">
                                <div className="bd-year">
                                    <Input type="select" className="form-input email-input" name="bdYear" id="bdYear" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData["bdYear"]}>
                                        <option>----</option>
                                        {generateNumbers(1920, new Date().getFullYear()).map(item => <option key={item} value={item}>{item}</option>)}
                                    </Input>
                                    {errors.bdYear && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                                </div>
                                <div className="bd-month">
                                    <Input type="select" className="form-input email-input" name="bdMonth" id="bdMonth" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData["bdMonth"]}>
                                        <option>-</option>

                                        {monthNames.map((item, i) => <option key={item} value={i + 1}>{item}</option>)}
                                    </Input>
                                    {errors.bdMonth && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                                </div>
                                <div className="bd-day">
                                    <Input type="select" className="form-input email-input" name="bdDay" id="bdDay" placeholder="Example) ○○○@example.com" onChange={getInputValue} value={formData["bdDay"]}>
                                        <option>-</option>

                                        {generateNumbers(1, 31).map(item => <option key={item} value={item}>{item}</option>)}
                                    </Input>
                                    {errors.bdDay && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div>
                    <h4 className="landing_form_label_ec m-0" id="view-billing-information-header"><font><font>Payment Information</font></font></h4>

                </div> */}
                    {/* <div className="row m-0">
                    <div className="col-md-5 col-xs-12 landing_form_ec">
                        <p className="form_box_label_ec">
                            <strong><font className="vert-align"><font className="vert-align">Payment method</font></font></strong>
                            <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                        </p>
                    </div>
                    <div className="col-md-7 col-xs-12 email-field">
                        <Input type="select" className="form-input email-input" name="paymentMethod" id="paymentMethod" onChange={getInputValue} value={formData["paymentMethod"]}>
                            <option value="Credit card lump sum">Credit card lump sum</option>
                            <option value="atone (pay next month at convinience store)">atone (pay next month at convinience store)</option>
                            <option value="Paidy next month payment (convinience store/bank)">Paidy next month payment (convinience store/bank)</option>
                        </Input>
                        {errors.paymentMethod && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-5 col-xs-12 landing_form_ec">
                        <p className="form_box_label_ec">
                            <strong><font className="vert-align"><font className="vert-align">credit card number</font></font></strong>
                            <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                        </p>
                    </div>
                    <div className="col-md-7 col-xs-12 email-field">
                        <Input type="text" className="form-input email-input" name="ccNumber" id="ccNumber" placeholder="Example) ********" onChange={getInputValue} />
                        {errors.ccNumber && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-5 col-xs-12 landing_form_ec">
                        <p className="form_box_label_ec">
                            <strong><font className="vert-align"><font className="vert-align">Card expiration date</font></font></strong>
                            <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                        </p>
                    </div>
                    <div className="col-md-7 col-xs-12 email-field">
                        <Input type="text" className="form-input email-input" name="expDate" id="expDate" placeholder="MM/YY" onChange={getInputValue} />
                        {errors.expDate && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-5 col-xs-12 landing_form_ec">
                        <p className="form_box_label_ec">
                            <strong><font className="vert-align"><font className="vert-align">Cardholder</font></font></strong>
                            <span className="form_required_ec"><font className="vert-align"><font className="vert-align">{customerData.formRequiredTxt}</font></font></span>
                        </p>
                    </div>
                    <div className="col-md-7 col-xs-12 email-field">
                        <Input type="text" className="form-input email-input" name="cardHolder" id="cardHolder" placeholder="Example) ********" onChange={getInputValue} />
                        {errors.cardHolder && <PopoverComponent ><div>* {customerData.reqFieldError}</div><div></div></PopoverComponent>}

                    </div>
                </div> */}
                    <div className="terms">
                        <div><input id="show-login-view" type="checkbox" onChange={getInputValue} id="termsCheck" checked={formData["termsCheck"]} style={{ marginRight: "10px" }} />{customerData.terms_11}</div>
                        {/* <div>・This product is a regular course, and the contract is an indefinite term that will continue unless you notify me of cancellation.</div> */}
                        <div>{customerData.terms_l3}</div>
                        <div>{customerData.terms_14}</div>
                        <div>{customerData.terms_15}</div>
                        {errors.termsCheck && <PopoverComponent ><div>{customerData.agreeTermsErr}</div><div></div></PopoverComponent>}

                    </div>
                    <div className="btn-container">
                        <Button className="form-btn" onClick={onLogin}>{customerData.clickToBuy}</Button>
                    </div>
                </Form>
            </div>
        </Fade>
    )

}

export default withRouter(Register);