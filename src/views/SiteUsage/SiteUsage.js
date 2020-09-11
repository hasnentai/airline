import React, { Component } from 'react';
import "./SiteUsage.scss";
// import YouTube from 'react-youtube';

export default class SiteUsage extends Component {
    // _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    //   }
    render() {
        // const opts = {
        //     height: '390',
        //     playerVars: {
        //       // https://developers.google.com/youtube/player_parameters
        //       autoplay: 1,
        //     },
        //   };
        return (
            <div className="video-container">
                <div className="site-usage">How to use this site</div>
                {/* <YouTube videoId="mdPz05nAEd0" opts={opts}  onReady={this._onReady}/> */}

            </div>
        )
    }
}