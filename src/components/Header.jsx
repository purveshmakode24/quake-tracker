import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header className="quake_header">
                <h1 className="navbar__h1">QuakeTracker</h1>
                <p className="navbar__p">Visualize the Earthquake in Real-Time<br />
                    {/* <span className="nav-followlnk-span"><a href="https://purveshmakode.com">{`</>`} w/ &#10084; by PM</a></span> <br /> */}
                </p>
                <p className="iframe">
                    <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.quaketracker.gq&width=122&layout=button_count&action=like&size=small&share=true&height=46&appId" title="fb_like_share_btn" width="122" height="22" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </p>
            </header>
        )
    }
}


export default Header;