import React, { Component,useState,useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import "../../styles/confirmation.scss";
import Footer from "../footer/Footer";
import { withRouter } from 'react-router';
import StripeCheckout from 'react-stripe-checkout';
import * as Cryptr from "cryptr";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { customerData as customerInfoData,confirmation } from "../../helpers/language";
const cryptr = new Cryptr('Airline@$Ticket123#');   
const PaymentConfirmation = (props) => {
    const [customerData,setCustomerData]=useState({})
    const [totalAmount,setTotalAmount]=useState(0)
    const [successData,setSuccessData]=useState({})
    const [failureData,setFailureData]=useState([])
    const [product, setProduct] = useState({
        name: "stripe checking",
        price: 10,
        productBy: "amazon"
      })
      useEffect(()=>{
          const userData=sessionStorage.getItem("user_data")
        //   if(!userData)window.location.back()
        // console.log(cryptr.decrypt(userData))
        let userVal={};
        if(userData)userVal=JSON.parse(cryptr.decrypt(userData))
        setCustomerData(userVal)
        let totalValue=0;
        let successValue={}
        userVal.productSelect&& Object.keys(userVal.productSelect).forEach(element => {
           let scListFilter=userVal.scratchList.filter(item=>item.Product_Name==element);
           let scItems="";
           scListFilter.forEach(val => {
               scItems=!scItems.length?cryptr.decrypt(val.Scratch_Card):`${scItems},${cryptr.decrypt(val.Scratch_Card)}`;
           });
           const nameCapitalized = element.charAt(0).toUpperCase() + element.slice(1);
           let thenum = element.match(/\d+/)[0]
           successValue[nameCapitalized]=element;
           successValue[`Scratch_Card${thenum}`]=scItems
           totalValue+= Number(userVal.productSelect[element]["price"])*userVal.productSelect[element]["itemsSelected"]
        });
        console.log(successValue)
       setTotalAmount(totalValue)
       setProduct({
        name: "stripe checking",
        price: totalValue,
        productBy: "amazon"
      })
      setFailureData(userVal.scratchList)
      setSuccessData(successValue)
    //   let successValue=userVal.
        return function cleanup () {
            // sessionStorage.clear();
            // window.onpopstate = () => {
            //     window.confirm("Do you really want to quit?")
            // }  
          }
      },[])
    const onPayment = () => {
        props.history.push("/paymentsuccess")
    }
    const makePayment = token => {
        const body = {
            token,
            product
        }
        const headers = {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("auth_token")}`
        }
        return fetch('https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/stripe', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(res=>res.json()).then(response => {
            console.log(response)
            axios.post(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/success`, {...successData,Tomail:customerData.formData.email},{headers:{
                "Authorization":`Bearer ${localStorage.getItem("auth_token")}`}}).then(data => {
                    toast.success("Payment done Successfully", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    sessionStorage.clear()
                    props.history.push("/paymentsuccess")
                    
                }).catch(err=>{
                    toast.error("Payment failed", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })

        }).catch(err => {
            console.log(err)
            axios.post(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/failed`, failureData,{headers:{
                "Authorization":`Bearer ${localStorage.getItem("auth_token")}`}}).then(data => {

                })
                debugger
                    toast.error("Payment failed", {
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
        <div className="container">
            
            <ToastContainer />
            {customerData.formData?
            <React.Fragment>
            <div className="form_confirm_ec">
                <div className="block_ec form_wizard_ec">
            <h1 className="confirm_title_ec"><font className="vert-align"><font className="vert-align">{confirmation.orderConfirmationHeader}</font></font></h1>
                    <ul className="form_wizard_levels_ec">
                        <li>
                            <a>
                                <span><font className="vert-align"><font className="vert-align">1</font></font></span><font className="vert-align"><font className="vert-align">
                                    {customerInfoData.customerInfoHeader}
</font></font></a>
                        </li>
                        <li className="active">
                            <a>
                                <span><font className="vert-align"><font className="vert-align">2</font></font></span><font className="vert-align"><font className="vert-align">
                                    {confirmation.orderConfirmationTab}
</font></font></a>
                        </li>
                        <li>
                            <a>
                                <span><font className="vert-align"><font className="vert-align">3</font></font></span><font className="vert-align"><font className="vert-align">
                                   {confirmation.orderCompletionTab}
</font></font></a>
                        </li>
                    </ul>
                    <div className="confirm_subtitle_ec">
            <p><font className="vert-align"><font className="vert-align">{confirmation.checkDetails}</font></font></p>
                    </div>
                    <table className="table_ec table_bordered_ec qa-orders" style={{ marginBottom: '10px' }}>
                        <tbody>
                            <tr>
            <th className="product_name_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.productName}</font></font></th>
            <th className="product_price_ec"><font className="vert-align"><font className="vert-align">{confirmation.unitPrice}</font></font></th>
            <th className="product_quantity_ec"><font className="vert-align"><font className="vert-align">{confirmation.number}</font></font></th>
            <th className="product_sub_total_ec"><font className="vert-align"><font className="vert-align">{confirmation.subtotal}</font></font></th>
                            </tr>
                            {Object.keys(customerData.productSelect).map((item,i)=><tr key={i}>
                                <td className="qa-name">
                            <p><font className="vert-align"><font className="vert-align">{customerData.productSelect[item]["Product_Name"]}</font></font></p>
                                </td>
                                <td className="pull_right_ec qa-price"><font className="vert-align"><font className="vert-align">&#165; {customerData.productSelect[item]["price"]}</font></font></td>
                                <td className="pull_right_ec qa-quantity"><font className="vert-align"><font className="vert-align">
                                {customerData.productSelect[item]["itemsSelected"]}
</font></font></td>
                            <td className="pull_right_ec qa-subtotal_price"><font className="vert-align"><font className="vert-align">&#165; {Number(customerData.productSelect[item]["price"])*customerData.productSelect[item]["itemsSelected"]}</font></font></td>
                            </tr>)}
                            {/* <tr>
                                <td className="qa-name">
                                    <p><font className="vert-align"><font className="vert-align">Notification of start of mileage program service</font></font></p>
                                </td>
                                <td className="pull_right_ec qa-price"><font className="vert-align"><font className="vert-align">0 Yen</font></font></td>
                                <td className="pull_right_ec qa-quantity"><font className="vert-align"><font className="vert-align">
                                    1 piece
</font></font></td>
                                <td className="pull_right_ec qa-subtotal_price"><font className="vert-align"><font className="vert-align">0 Yen</font></font></td>
                            </tr> */}
                            {/* <tr>
                                <td className="pull_right_ec blank_field_ec" colspan="3"><font className="vert-align"><font className="vert-align">subtotal</font></font></td>
                                <td className="pull_right_ec qa-subtotal"><font className="vert-align"><font className="vert-align">2,380 yen</font></font></td>
                            </tr>
                            <tr>
                                <td className="pull_right_ec blank_field_ec" colspan="3"><font className="vert-align"><font className="vert-align">Postage</font></font></td>
                                <td className="pull_right_ec qa-deliv_fee"><font className="vert-align"><font className="vert-align">0 Yen</font></font></td>
                            </tr>
                            <tr>
                                <td className="pull_right_ec blank_field_ec" colspan="3"><font className="vert-align"><font className="vert-align">Fee</font></font></td>
                                <td className="pull_right_ec qa-charge"><font className="vert-align"><font className="vert-align">0 Yen</font></font></td>
                            </tr>
                            <tr>
                                <td className="pull_right_ec blank_field_ec" colspan="3"><font className="vert-align"><font className="vert-align">consumption tax</font></font></td>
                                <td className="pull_right_ec qa-tax"><font className="vert-align"><font className="vert-align">238 yen</font></font></td>
                            </tr> */}
                            <tr>
                        <td className="pull_right_ec blank_field_ec" colSpan="3"><font className="vert-align"><font className="vert-align">{confirmation.total}</font></font></td>
                        <td className="pull_right_ec total_color_ec qa-total"><font className="vert-align"><font className="vert-align">&#165; {totalAmount}</font></font></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <table className="table_ec table_bordered_ec qa-details" style={{ marginBottom: "20px", marginTop: "20px", marginLeft: "auto", width: "80%" }}>
                        <tbody>
                            <tr>
                                <th><font className="vert-align"><font className="vert-align">10% target</font></font></th>
                                <th><font className="vert-align"><font className="vert-align">subtotal</font></font></th>
                                <td className="pull_right_ec qa-subtotal10"><font className="vert-align"><font className="vert-align">2,380 yen</font></font></td>
                                <th><font className="vert-align"><font className="vert-align">consumption tax</font></font></th>
                                <td className="pull_right_ec qa-tax10"><font className="vert-align"><font className="vert-align">238 yen</font></font></td>
                            </tr>
                        </tbody>
                    </table> */}
                    <div style={{ marginBottom: "20px" }}>
                <div className="product_caution_ec qa-caution" colSpan="4"><p><strong><font color="red"><font size="3"><font className="vert-align"><font className="vert-align">&lt;{confirmation.plsCheck} </font><font className="vert-align">{confirmation.orderedProduct}</font><font className="vert-align">&gt;</font></font></font></font></strong></p>
                            {/* <p><font className="vert-align"><font className="vert-align">・[Regular Course] FACE CARE 3STEP COURSE is the first set of 6 sets of THE FACE WASH (facial cleanser), THE TONER (lotion), THE LOTION (the emulsion), THE BUBBLE NET, THE BOTTLE 100mL, THE BOTTLE 200mL. Is 73% off the regular price of 2,380 yen (excluding tax) + free shipping, and from the second time onward, THE FACE WASH (facial cleanser), THE TONER (lotion), THE LOTION (milky lotion) 3-piece set 10% OFF 7,200 yen (excluding tax) + free shipping, it is a convenient and affordable course that is delivered monthly.</font></font></p> */}
                            {/* <p><font className="vert-align"><font className="vert-align">・If you call us (0120-919-518) 3 business days before the second delivery, you can change the delivery every two months (every 60 days).</font></font></p> */}
                            {/* <p><font className="vert-align"><font className="vert-align">・[Regular Course] FACE CARE 3STEP COURSE can be suspended/cancelled at any time, but if you cancel the second scheduled period after receiving the first minute, a separate cancellation fee of 3,000 yen (tax included) will be charged. I will. </font><font className="vert-align">*The first part of this course is covered by the "Full Money Back Guarantee". </font><font className="vert-align">*No cancellation fee will be charged for cancellations after the third regular term.</font></font></p> */}
                            <p><font className="vert-align"><font className="vert-align">{confirmation.reservedProduct} </font><font className="vert-align">{confirmation.afterOrdering}</font></font></p></div>
                    </div>
                    <div className="confirm_subtitle_ec">
                <p><font className="vert-align"><font className="vert-align">{confirmation.customerInformationCheck}</font></font></p>
                    </div>
                    <table className="table_ec table_bordered_ec qa-billings">
                        <tbody>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.nameOfTheCustomer}</font></font></th>
                <td className="qa-name"><font className="vert-align"><font className="vert-align">{`${customerData.formData.fname} ${customerData.formData.lname}`}</font></font></td>
                            </tr>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.phonetic}</font></font></th>
                <td className="qa-kana"><font className="vert-align"><font className="vert-align">{customerData.formData.phonetic}</font></font></td>
                            </tr>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{confirmation.stsAddress}</font></font></th>
                                <td className="qa-address"><font className="vert-align"><font className="vert-align">
                                {`${customerData.formData.address3}, ${customerData.formData.address2}, ${customerData.formData.address1}`}
</font></font></td>
                            </tr>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.phoneNumber}</font></font></th>
                <td className="qa-tel"><font className="vert-align"><font className="vert-align">{customerData.formData.phone}</font></font></td>
                            </tr>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.emailAddress}</font></font></th>
                                <td className="qa-email"><font className="vert-align"><font className="vert-align">{customerData.formData.email}</font></font></td>
                            </tr>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.sex}</font></font></th>
                <td className="qa-sex"><font className="vert-align"><font className="vert-align">{customerData.formData.sex}</font></font></td>
                            </tr>
                            <tr>
                <th className="menu_ec"><font className="vert-align"><font className="vert-align">{customerInfoData.birthday}</font></font></th>
                                <td className="qa-birth"><font className="vert-align"><font className="vert-align">{`${customerData.formData.bdDay}/${customerData.formData.bdMonth}/${customerData.formData.bdYear}`}</font></font></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className="confirm_subtitle_ec">
                        <p><font className="vert-align"><font className="vert-align">Please check the addressee information</font></font></p>
                    </div>
                    <table className="table_ec table_bordered_ec qa-shippings">
                        <tbody>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">name</font></font></th>
                                <td className="qa-name"><font className="vert-align"><font className="vert-align">Matsuzaki</font></font></td>
                            </tr>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">Phonetic</font></font></th>
                                <td className="qa-kana"><font className="vert-align"><font className="vert-align">Matsuzaki Hayate</font></font></td>
                            </tr>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">Street address</font></font></th>
                                <td className="qa-address"><font className="vert-align"><font className="vert-align">
                                    2-16-10, Tanikaga-cho, Shinjuku-ku, Tokyo 1620062
</font></font></td>
                            </tr>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">phone number</font></font></th>
                                <td className="qa-tel"><font className="vert-align"><font className="vert-align">07064261427</font></font></td>
                            </tr>
                        </tbody>
                    </table> */}
                    {/* <div className="confirm_subtitle_ec">
                        <p><font className="vert-align"><font className="vert-align">Check payment method</font></font></p>
                    </div>
                    <table className="table_ec table_bordered_ec qa-payments">
                        <tbody>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">Payment Method</font></font></th>
                <td className="qa-payment_method"><font className="vert-align"><font className="vert-align">{customerData.formData.paymentMethod}</font></font></td>
                            </tr>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">Card number (expiration date)</font></font></th>
                                <td className="qa-display_number"><font className="vert-align"><font className="vert-align">{`${customerData.formData.ccNumber}(${customerData.formData.expDate})`}</font></font></td>
                            </tr>
                            <tr>
                                <th className="menu_ec"><font className="vert-align"><font className="vert-align">Card name</font></font></th>
                                <td className="qa-name"><font className="vert-align"><font className="vert-align">{customerData.formData.cardHolder}</font></font></td>
                            </tr>
                        </tbody>
                    </table> */}
                    <div className="btn-container" style={{textAlign:'center'}}>
                        <StripeCheckout
                            currency="JPY"
                            stripeKey="pk_test_51GtsUQDFruPsLR1hx8Ev2jNJRWHmJg6fsVa1XyaLv3aflfogeWfMu5xy8rKNkF6xTDHFCPVyrWeA9RAzy9PUW22t002dvwJrE2"
                            token={makePayment}
                            name={confirmation.buyTicket}
                            amount={product.price}
                        >
                            {/* <Button className="form-btn" onClick={onPayment}>Proceed Payment</Button> */}
                        </StripeCheckout>
                    </div>
                </div>
            </div>
            <Footer />
            </React.Fragment>
        :""}
        </div>
    )


}

export default withRouter(PaymentConfirmation);