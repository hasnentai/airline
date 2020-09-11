import React, { useState, Component, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";

import "./Header.scss";

import axios from "axios";

import logo from "../../assets/img/anajal-logo.svg";
import useReactRouter from "use-react-router";
import AdContent from "../AdContent/Ads";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Divider } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import ReactDOM from "react-dom";
import { ToastContainer, toast } from 'react-toastify';



const Header = (props) => {
  const { history, location, match } = useReactRouter();
  const [banner, setBanner] = useState(false)
  useEffect(() => {
    if (!location.pathname.length || location.pathname == "/") {
      setBanner(true)
    }
  }, [])
  const [state, setState] = React.useState({
    left: false,
  });

  const [isLoggedIn, setLogin] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    let session_id = localStorage.getItem("session_id");
    axios
      .post(
        "https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/logout",
        { session_id }
      )
      .then((data) => {
        localStorage.clear();
        history.push("/");
        if (!location.pathname.length || location.pathname == "/") props.userLogOut(true)
        toast.success("User logged out Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        localStorage.clear();
        if (!location.pathname.length || location.pathname == "/") history.push("/");
        props.userLogOut(true)
      });
  };

  const openDrawer = () => {
    let element = document.getElementById("a-drawer");
    ReactDOM.findDOMNode(element).style.height = "100vh";
    window.scrollTo(0, 0)
  };

  const closeDrawer = () => {
    let element = document.getElementById("a-drawer");
    ReactDOM.findDOMNode(element).style.height = "0";
  };



  const drawer = () => {
    return (
      <div id="a-drawer" className="anajal-drawer anajal-column">
        <ToastContainer />
        <div className=" anajal-row r-wrapper">
          <div className="action-button-m" onClick={() => { props.onChangeView("ad"); closeDrawer() }}>株主優待番号を購入</div>
          <div className="drawer-close" onClick={closeDrawer}>
            <HighlightOffIcon />
          </div>
        </div>
        <Divider />
        <div className="anajal-menu-wrapper anajal-row">
          <div className="anajal-menu-item">初めての方へ</div>
          <div className="anajal-menu-icon">
            <ChevronRightIcon style={{ color: "#f7931e" }} />
          </div>
        </div>
        <Divider variant="middle" />
        <div className="anajal-menu-wrapper anajal-row">
          <div className="anajal-menu-item">４つの便利</div>
          <div className="anajal-menu-icon">
            <ChevronRightIcon style={{ color: "#f7931e" }} />
          </div>
        </div>
        <Divider variant="middle" />
        <div className="anajal-menu-wrapper anajal-row">
          <div className="anajal-menu-item">購入の流れ</div>
          <div className="anajal-menu-icon">
            <ChevronRightIcon style={{ color: "#f7931e" }} />
          </div>
        </div>
        <Divider variant="middle" />
        <div className="anajal-menu-wrapper anajal-row">
          <div className="anajal-menu-item">注意事項</div>
          <div className="anajal-menu-icon">
            <ChevronRightIcon style={{ color: "#f7931e" }} />
          </div>
        </div>
        <Divider variant="middle" />
        <div>
          <div className="top-buttons-d anajal-row">
            <div className="button-one action-btn" onClick={() => { props.onChangeView("ad"); closeDrawer() }}>会員登録</div>
            <div className="button-two action-btn" onClick={() => { props.onChangeView("ad", "login"); closeDrawer() }}>ログイン</div>
          </div>
        </div>
      </div>
    );
  };
  const routeToTopic = (value) => {
    if (!location.pathname.length || location.pathname == "/") {
      let valueElement = document.getElementById(value).getBoundingClientRect();
      window.scrollTo(0, document.documentElement.scrollTop + valueElement.top - 123);
    } else {
      history.push("/", { value });
    }
  }
  const onNavClick = (value) => {
    if (!location.pathname.length || location.pathname == "/") {
      if (value == "login") {
        props.onChangeView("ad", "login")
      } else {
        props.onChangeView("ad")
      }
    } else {
      if (value == "login") {
        history.push("/", { data: "login" });
      } else {
        history.push("/", { data: "reg" });
      }
    }
  }
  return (
    <div>
      <nav>
        <div className="anajal-top-border"></div>
        <div className="nav-bar-wrapper">
          <div className="container container-wrapper">
            <div className="left-container anajal-column">
              <div className="logo-top-info">
                <div className="top-info-inner">
                  <div className="info">
                    <p>
                      24時間いつでもお得に航空券が買える。株主優待券の購入は株優即納.comまで。
                    </p>
                    <p>24時間自動受付中！</p>
                  </div>
                  {/* <div className="logout">{isLoggedIn ? "" : <p>LOGOUT</p>}</div> */}
                </div>
              </div>

              <div className="logo-nav-wrapper">
                <div className="left-info">
                  <div className="logo">
                    <img src={logo} alt="logo" />
                  </div>
                </div>
                <div className="right-info">
                  <ul>
                    <li onClick={() => routeToTopic("beginner-guide-container")}>
                      <a className="router-anchor">初めての方へ</a>
                      <div class="svg-wrapper">
                        <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                          <rect id="shape" height="40" width="150" />
                        </svg>
                      </div>
                    </li>
                    <li onClick={() => routeToTopic("convinces-container")}>
                      <a className="router-anchor">４つの便利</a>
                      <div class="svg-wrapper">
                        <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                          <rect id="shape" height="40" width="150" />
                        </svg>
                      </div>
                    </li>
                    <li onClick={() => routeToTopic("fop-bottom-holder")}>
                      <a className="router-anchor">購入の流れ</a>
                      <div class="svg-wrapper">
                        <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                          <rect id="shape" height="40" width="150" />
                        </svg>
                      </div>
                    </li>
                    <li onClick={() => routeToTopic("precaution-container")}>
                      <a className="router-anchor">注意事項</a>
                      <div class="svg-wrapper">
                        <svg height="40" width="150" xmlns="http://www.w3.org/2000/svg">
                          <rect id="shape" height="40" width="150" />
                        </svg>
                      </div>

                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className=" anajal-column">
                <div className="top-buttons anajal-row">
                  {((!location.pathname.length || location.pathname == "/") && props && !props.userLogged) || !localStorage.getItem("session_id") ? <>
                    <div className="button-one action-btn" onClick={() => { onNavClick("reg") }}>会員登録</div>
                    <div className="button-two action-btn" onClick={() => { onNavClick("login") }}>ログイン</div>
                  </> :
                    <div className="button-two action-btn" onClick={logout}>LOGOUT</div>}
                </div>
                <div className="bottom-buttons">
                  <div className="menu-open">
                    <MenuIcon style={{ color: "#fff" }} onClick={openDrawer} />
                  </div>
                  <div className="action-button" onClick={() => onNavClick("reg")}>株主優待番号を購入</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {banner ? <AdContent onChangeView={props.onChangeView} /> : ""}
      {drawer()}
    </div>
  );
};

export default Header;
