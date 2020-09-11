import React, { Component } from 'react';
import HeaderBase from "../../helpers/HeaderBase";
import { privacy, termsAndConditions } from "../../helpers/language";
import "./Terms.scss";
import Header from '../header/Header';
import Footer from '../footer/Footer';

class Terms extends Component {
    state = {}
    render() {
        return (<div><Header /><div className="container privacy-container" id="privacy-policy" style={{paddingTop:"150px"}}>
            <div className="fop-title mt-3 text-center" style={{ color: "#86cee7" }}>{termsAndConditions.header}</div>
            {/* <div className="text-center"><HeaderBase /></div> */}
            {/* <div className="mt-3 mb-3">
                    {privacy.subTitle}
                </div> */}
            <div className="privacy-wrap">
                {
                    termsAndConditions.privacyData.map((item, i, arr) => <div className="privacy-item" key={`privacy${i}`}>
                        <div className="privacy-list-head">{item.head}</div>
                        {
                            item.children.map((val, ind) => {
                                return (
                                    <div key={`${ind}val`}>
                                        <div className="sub-head-title">{val.subHead}</div>
                                        {val.value.data ? <div>{val.value.data}</div> : ""}
                                        {val.value.children && val.value.children.length ? <ol type="1" style={{ "listStyle": "decimal" }}>{val.value.children.map((element, index) => {
                                            return (
                                                <li key={`${index}element`}>
                                                    {!element.name ? <div>{element}</div> : ""}
                                                    {element.name ? <div><div>{element.name}</div><ol style={{ "listStyle": "lower-alpha" }}>{element.children.map(ele => <li key={`${ind}ele`}>{ele}</li>)}</ol></div> : ""}
                                                </li>
                                            )
                                        })}</ol> : ""}
                                    </div>
                                )
                            })
                        }

                    </div>)
                }
            </div>
        </div><Footer /></div>);
    }
}

export default Terms;