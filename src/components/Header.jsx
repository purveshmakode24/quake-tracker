import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header className="quake_header">
                <h1 className="navbar__h1">QuakeTracker</h1>
                <p className="navbar__p">Visualize the Earthquake in real-time</p>
            </header>
        )
    }
}


export default Header;