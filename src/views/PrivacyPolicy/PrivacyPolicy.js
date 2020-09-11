import React, { Component } from 'react';
import HeaderBase from "../../helpers/HeaderBase";
import { privacy } from "../../helpers/language";
import "./PrivacyPolicy.scss";
import Header from '../header/Header';
import Footer from '../footer/Footer';

class PrivacyPolicy extends Component {
    state = {}
    render() {
        return (<div>
            <Header/>
            <div className="container privacy-container" id="privacy-policy" style={{paddingTop:"150px"}}>
                <div className="fop-title mt-3 text-center" style={{ color: "#86cee7" }}>{privacy.header}</div>
                {/* <div className="text-center"><HeaderBase /></div> */}
                <div className="mt-3 mb-3">
                    {privacy.subTitle}
                </div>
                <div className="privacy-wrap">
                    {
                        privacy.privacyData.map((item, i, arr) => <div className="privacy-item" key={`privacy${i}`}>
                            <div className="privacy-list-head">{i + 1}.&nbsp;{item.head}</div>
                            <div>{item.value}</div>
                            {item.l2 ? <div>{item.l2}</div> : ''}
                            {
                                item.subHead ? <div>
                                    {item.subHead.head ? <div className="sub-head-title">{item.subHead.head}</div> : ""}
                                    {item.subHead.children ? <div>
                                        <ol type="1" className="sub-head-list">
                                            {item.subHead.children.map((val, ind) => <li key={`list${ind}`}>{val}</li>)}
                                        </ol>
                                    </div> : ""}

                                </div> : ""
                            }
                            {
                                item.anotherHead ? <div>
                                    {item.anotherHead.head ? <div className="sub-head-title">{item.anotherHead.head}</div> : ""}
                                    {item.anotherHead.value ? <div className="mt-3">{item.anotherHead.value}</div> : ""}

                                </div> : ""
                            }
                        </div>)
                    }
                </div>
            </div>
            <Footer/>
            </div>);
    }
}

export default PrivacyPolicy;