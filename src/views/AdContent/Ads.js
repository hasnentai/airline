import React, { Component, useEffect, useState } from "react";

import "./Ads.scss";
import ReactDOM from "react-dom";

import "react-animated-slider/build/horizontal.css";


import banner from "../../assets/img/banner-plane.jpg";
import topd from "../../assets/img/topd.svg";
import bottomd from "../../assets/img/bottomd.svg";
import flightgo from "../../assets/img/flightgo.svg";
import yellowaction from "../../assets/img/yellow-action-btn.svg";
import Loaders from "../Loaders/loaders";
import Anime, { anime } from 'react-anime';
const AdContent = (props) => {
  const content = [
    {
      title: "Vulputate Mollis Ultricies Fermentum Parturient",
      description:
        "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
      button: "Read More",
      image: "https://i.imgur.com/ZXBtVw7.jpg",
      user: "Luan Gjokaj",
      userProfile: "https://i.imgur.com/JSW6mEk.png",
    },
    {
      title: "Tortor Dapibus Commodo Aenean Quam",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
      button: "Discover",
      image: "https://i.imgur.com/DCdBXcq.jpg",
      user: "Erich Behrens",
      userProfile: "https://i.imgur.com/0Clfnu7.png",
    },
    {
      title: "Phasellus volutpat metus",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
      button: "Buy now",
      image: "https://i.imgur.com/DvmN8Hx.jpg",
      user: "Bruno Vizovskyy",
      userProfile: "https://i.imgur.com/4KeKvtH.png",
    },
    {
      title: "Ultricies Vulputate Mollis Fermentum Parturient",
      description:
        "Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
      button: "Read More",
      image: "https://i.imgur.com/ZXBtVw7.jpg",
      user: "Luan Gjokaj",
      userProfile: "https://i.imgur.com/JSW6mEk.png",
    },
    {
      title: "odo Aenean Quam Tortor Dapimodo Aenean Quam",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis  purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
      button: "Discover",
      image: "https://i.imgur.com/DCdBXcq.jpg",
      user: "Erich Behrens",
      userProfile: "https://i.imgur.com/0Clfnu7.png",
    },
    {
      title: "volutpat Aenean metus",
      description:
        "quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentumconsectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
      button: "Buy now",
      image: "https://i.imgur.com/DvmN8Hx.jpg",
      user: "Bruno Vizovskyy",
      userProfile: "https://i.imgur.com/4KeKvtH.png",
    },
  ];
  const [showAd, setShowAd] = useState(false)
  useEffect(() => {
    // Update the document title using the browser API
    setTimeout(()=>{

      let element = document.getElementById("loader-wrapper");
      let imgPlane = document.getElementById("img-plane");
      ReactDOM.findDOMNode(element).setAttribute("style","opacity: 0;-webkit-transition: opacity 800ms linear;transition: opacity 800ms linear;z-index:-999")
      ReactDOM.findDOMNode(imgPlane).classList.add("banner-wrapper-reveal")


    



    },3000);

    setTimeout(()=>{
     let element1 = document.getElementById("banner");
      ReactDOM.findDOMNode(element1).classList.remove('banner-none');
     ReactDOM.findDOMNode(element1).classList.add('banner-conent');
    },4000)
    
  });
  let title = {
    l1: "株主優待番号で",
    l2: "最大50％割引",
    l3: "チケットを入手！"
  }
  const createAnime = (val) => {
    return (<React.Fragment className={val == "l1" ? 'line1-anim' : 'line2-anim'}>
      {title[val].split("").map((item, i) => <span key={i} className="letter">{item}</span>)}
    </React.Fragment>)
  }
  useEffect(() => {
    // props.showOthers();
    setTimeout(() => {
      setShowAd(true);
      window.anime.timeline({ loop: false })
        .add({
          targets: '.ml10 .letter',
          rotateY: [-90, 0],
          duration: 1300,
          delay: (el, i) => 45 * i
        }).add({
          targets: '.ml10',
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        });
    }, 5000);

  }, []);
  return (
    <div>
      <Loaders></Loaders>
      <div className="banner-wrapper">
        <img id="img-plane" style={{ height: "100%", objectFit: "cover" }} src={banner} alt="img" />
        <div id="banner" className="banner-none">
          <div className="anajal-top-design">
            <img className="topd" src={topd} alt="topd" />
          </div>
          <div className="anajal-middle-design">
            {showAd ? <h1 className="ml10">
              <span className="text-wrapper">
                {createAnime("l1")}
                <div><span class="disc-text">{createAnime("l2")} </span>{createAnime("l3")}</div>
              </span>
            </h1> : ''}
          </div>
          <div className="anajal-bottom-design">
            <img className="bottomd" src={bottomd} alt="bottomd" />
          </div>
          <div className="anajal-row price-tag-wrapper">
            <div className="price-tag-one">
              <div className="anajal-column">
                <div className="anajal-title-one anajal-row">
                  <div className="icon-of-title">
                    <img src={flightgo} />
                  </div>
                  <div className="title">
                    <p>Discount Ticket</p>
                  </div>
                </div>
                <div className="anajal-content-one anajal-row">
                  <div className="anajal-card-logo-wrapper-one anajal-column">
                    <div className="anajal-card-logo">ANA</div>
                    <div className="anajal-card-logo-jp">全日空</div>
                  </div>


                  <div className="price-wrapper anajal-column">
                    <div className="anajal-card-price-one">¥3,500-</div>
                    <div className="info-of-price">2020年11月末ご搭乗分まで</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="price-tag-two">
              <div className="anajal-column">
                <div className="anajal-title-two anajal-row">
                  <div className="icon-of-title">
                    <img src={flightgo} />
                  </div>
                  <div className="title">
                    <p>Discount Ticket</p>
                  </div>
                </div>
                <div className="anajal-content-one anajal-row">
                  <div className="anajal-card-logo-wrapper-two anajal-column">
                    <div className="anajal-card-logo">JAL</div>

                    <div className="anajal-card-logo-jp">日本航空</div>
                  </div>
                  <div className="price-wrapper anajal-column">
                    <div className="anajal-card-price-two">¥3,500-</div>
                    <div className="info-of-price">2020年11月末ご搭乗分まで</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="sky-image">


          <div className="overlay"></div>
          <div className="container">
            <div className="button-holder">
              <div>
                <img src={yellowaction} alt="yellow-action-button" onClick={() => props.onChangeView("ad")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ScrollLink(AdContent);
export default AdContent;
