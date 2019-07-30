import React from 'react';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand mb-0 h1" href="/#">Weather App</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/list">List</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/map/0">Map</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default Header
