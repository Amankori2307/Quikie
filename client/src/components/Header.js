import React from 'react'
import logo from './images/logo.png'
function Header({title}) {
    return (
        <div className = "header">
            {/* logo */}
            <img className="logo" alt="logo" src = {logo} />
            {/* dynamic title that changes with routes */}
            <span>{title}</span>
        </div>
    )
}

export default Header
