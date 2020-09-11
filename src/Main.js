import React, { Component } from "react";
import Header from "./views/header/Header";
import Footer from "./views/footer/Footer";
import AdContent from "./views/AdContent/Ads";
import CustomerContainer from "./views/Customer/CumstomerContainer";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import Product from "./views/Product/Product";
import Overview from "./views/Overview/Overview";
import SiteUsage from "./views/SiteUsage/SiteUsage";
import PeopleChooseUs from "./assets/img/people_choose.svg";
import ShareHolder from "./views/ShareHolder/ShareHolder";
import ShareHolder_Jal from "./views/ShareHolder/ShareHolder_Jal";
import FlowOfPurchase from "./views/FlowOfPurchase/FlowOfPurchase";
import PeopleChooseTitle from "./assets/img/Title.svg";
import PeopleChooseC1 from "./assets/img/people_choose_1.svg";
import PeopleChooseC2 from "./assets/img/people_choose_2.svg";
import PeopleChooseC3 from "./assets/img/people_choose_3.svg";
import gleaf from "./assets/img/gleaf.png";

import HeaderBase from "./helpers/HeaderBase";
import PurchaseInstructions from "./views/PurchaseInstructions/PurchaseInstructions";
import PurchaseQuestions from "./views/PurchaseQuestions/PurchaseQuestions";
import PrivacyPolicy from "./views/PrivacyPolicy/PrivacyPolicy";
import Faq from "./views/Faq/Faq";
import Fade from "react-reveal/Fade";
import LazyLoad from "react-lazyload";
import axios from "axios";
import Cloud1 from "./assets/img/cloud 1.svg";
import Cloud2 from "./assets/img/cloud 2.svg";
import Cloud3 from "./assets/img/cloud 3.svg";
import Flight1 from "./assets/img/flight 1.svg";
import Flight2 from "./assets/img/flight 2.svg";
import Flight3 from "./assets/img/flight 3.svg";
import Flight4 from "./assets/img/flight 4.svg";
import DiscountBanner from "./views/DiscountBanner/DiscountBanner";
import Terms from "./views/TermsAndConditions/Terms";
import { withRouter } from 'react-router-dom';
class Main extends Component {
  changeView = (value, view) => {
    if (value == "ad") {
      if (view && view == "login") {
        this.setState({ isOpen: true, showCustomer: true, loginView: true }, () => {
          setTimeout(() => {
            let valueElement = document.getElementById("data-value").getBoundingClientRect();
            window.scrollTo(0, document.documentElement.scrollTop + valueElement.top - 123);
          }, 500);
        });
      } else {
        this.setState({ isOpen: true, showCustomer: true, loginView: false }, () => {
          setTimeout(() => {
            let valueElement = document.getElementById("data-value").getBoundingClientRect();
            window.scrollTo(0, document.documentElement.scrollTop + valueElement.top - 123);
          }, 500);
        });
      }

    } else {
      this.setState({ isOpen: !this.state.isOpen });
    }
  };
  state = {
    isOpen: false,
    showCustomer: false,
    activeTab: "1",
    questionCount: 1,
    showQuesModal: false,
    showPrivacy: false,
    showFaq: false,
    showOthers: false,
    productList: [],
    loginView: false,
    userSessionActive: false
  };
  hideCustomer = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      setTimeout(() => {
        this.setState({ showCustomer: false });
      });
    });
  };
  toggle = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) this.setState({ activeTab: tab });
  };
  increaseQuestionCount = () => {
    let { questionCount } = this.state;
    this.setState({ questionCount: questionCount + 1 }, () => {
      // debugger
      this.state.questionCount == 4 &&
        this.setState({ showQuesModal: !this.state.showQuesModal });
    });
  };
  toggleQUestionModal = () => {
    let { showQuesModal } = this.state;
    this.setState({ showQuesModal: !showQuesModal });
  };
  setFaq = (ev) => {
    this.setState({ showFaq: true, showPrivacy: false }, () => {
      setTimeout(() => {
        window.location.href = "#faq";
      }, 500);
    });
  };
  loginToggle = (ev) => {
    this.setState({ loginView: ev.target.checked })
  }
  componentDidMount() {
    const { pathname, state } = this.props.location;
    if (state && state.value) {
      setTimeout(() => {
        let valueElement = document.getElementById(state.value).getBoundingClientRect();
        window.scrollTo(0, document.documentElement.scrollTop + valueElement.top - 123);
      }, 500);
    }
    if (state && state.data) {
      if (state.data == "login") this.changeView("ad", "login")
      if (state.data == "reg") this.changeView("ad")
    }
    this.getProduct();
    if (sessionStorage.getItem("user_data")) sessionStorage.clear();
    if (localStorage.getItem("email")) {
      axios.get(`https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/getuser?mail=${localStorage.getItem("email")}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
        }
      }).then(data => {
        this.userLoggedIn()
      }).catch(err => {
        localStorage.clear()
      })
      // if(localStorage.getItem("auth_token"))
    }
  }
  setPrivacy = (ev) => {
    this.setState({ showFaq: false, showPrivacy: true }, () => {
      setTimeout(() => {
        window.location.href = "#privacy-policy";
      }, 500);
    });
  };
  showOthers = () => {
    setTimeout(() => {
      this.setState({ showOthers: true });
    }, 2000);
  };
  getProduct() {
    axios
      .get(
        `https://gbek5gmml7.execute-api.us-east-1.amazonaws.com/dev/Getproduct`
      )
      .then((data) => {
        this.setState({ productList: data.data });
      })
      .catch((err) => {
        localStorage.clear();
      });
  }
  userLoggedIn = (data) => {
    if (data) this.setState({ userSessionActive: false, showCustomer: false })
    else this.setState({ userSessionActive: true, loginView: false })
  }
  render() {
    const { activeTab, showOthers, showPrivacy, showFaq, userSessionActive } = this.state;
    return (
      <React.Fragment>
        <Header onChangeView={this.changeView} userLogged={userSessionActive} userLogOut={this.userLoggedIn} />
        <Overview />
        <FlowOfPurchase onChangeView={this.changeView} />
        <Faq />
        <PurchaseInstructions onChangeView={this.changeView} />
        {this.state.showCustomer ? <CustomerContainer userLoggedIn={this.userLoggedIn} loginToggle={this.loginToggle} isOpen={this.state.isOpen} loginView={this.state.loginView} changeView={this.changeView} hideLoginForm={this.hideCustomer} /> : ''}
        <Footer />

      </React.Fragment>
    );
  }
}

export default withRouter(Main);
