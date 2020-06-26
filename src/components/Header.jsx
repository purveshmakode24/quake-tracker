import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header className="quake_header">
                <h1 className="navbar__h1">QuakeTracker</h1>
                <p className="navbar__p">Visualize the Earthquake in Real-Time<br/><span className="nav-followlnk-span"><a href="https://purveshmakode.com">{`</>`} w/ &#10084; by PM</a></span></p>
            </header>
        )
    }
}


export default Header;