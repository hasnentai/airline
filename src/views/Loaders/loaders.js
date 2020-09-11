import React, { Component } from 'react';
import './loaders.scss'

class Loaders extends Component {
    state = {}
    render() {
        return (<div  id="loader-wrapper" className="loading-wrapper"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>);
    }
}

export default Loaders;