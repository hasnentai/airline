import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
class Loader extends Component {
    state = {}
    render() {
        return (<div>
            {/* <Header /> */}
            <div className="spinner-container">
                <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
            </div>
        </div>);
    }
}

export default Loader;