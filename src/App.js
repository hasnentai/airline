import React, { useContext, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Main from "./Main";
import './App.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import User from './views/User/User';
// import Confirmation from "./views/Payment/Confirmation";
// import PaymentSuccess from "./views/Payment/PaymentSuccess";
import PaymentContext from "./context/PaymentContext";
import Loader from "./views/Loader/Loader";
// import './styles/animate.css';
import "animate.css/animate.min.css";
import faStyles from 'font-awesome/css/font-awesome.css'
import Loaders from './views/Loaders/loaders';
// import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy';
// import Terms from './views/TermsAndConditions/Terms';
const Main = React.lazy(() => import("./Main"));
const Confirmation = React.lazy(() => import("./views/Payment/Confirmation"));
const PaymentSuccess = React.lazy(() => import("./views/Payment/PaymentSuccess"));
const PrivacyPolicy = React.lazy(() => import("./views/PrivacyPolicy/PrivacyPolicy"));
const Terms = React.lazy(() => import("./views/TermsAndConditions/Terms"))
const ContactUs = React.lazy(() => import("./views/ContactUs/ContactUs"))
function App() {
  const state = useContext(PaymentContext)
  return (
    <Suspense fallback={<Loaders></Loaders>}>
      {/* <PaymentContext.Provider> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/paymentsuccess">
            <PaymentSuccess />
          </Route>
          <Route path="/privacypolicy">
            <PrivacyPolicy />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/contactus">
            <ContactUs />
          </Route>
        </Switch>
      </Router>
      {/* </PaymentContext.Provider> */}
    </Suspense>
  );
}

export default App;
