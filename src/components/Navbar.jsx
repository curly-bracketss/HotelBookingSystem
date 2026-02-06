import React from 'react'

export default function Navbar() {
  return (
    <nav className="topbar">
      <div className="topbar-left">
        <button className="menu-button" type="button" aria-label="Open menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="brand">
          <span className="brand-dot"></span>
          <span className="brand-name">Triply</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="text-button" type="button">App</button>
        <button className="text-button" type="button">Support</button>
        <button className="text-button" type="button">Bookings</button>
        <button className="primary-button" type="button">Sign in / Join</button>
      </div>
    </nav>
  )
}
