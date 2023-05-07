import React from 'react';
import logoSrc from '../../assets/images/logo.png';

function Header() {
  
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src={logoSrc} width="364" height="58" alt="logo" />
        </div>

        <div className="search-view" data-search-view>
          <div className="search-wrapper">
            <input
              type="search"
              name="search"
              placeholder="Search city..."
              autoComplete="off"
              className="search-field"
              data-search-field
            />
            <span className="m-icon leading-icon">search</span>
            <button
              className="icon-btn leading-icon has-state"
              aria-label="close search"
              data-search-toggler
            >
              <span className="m-icon">arrow_back</span>
            </button>
          </div>
          <div className="search-result" data-search-result>
            <ul className="view-list">
              <li className="view-item">
                <span className="m-icon">location_on</span>
                <div>
                  <p className="item-title">London</p>
                  <p className="Label-2 item-subtitle">State of London, GB</p>
                </div>
                <a href="/" className="item-link has-state"></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="icon-btn has-state"
            aria-label="open search"
            data-search-toggler
          >
            <span className="m-icon icon">search</span>
          </button>

          <a
            href="#/current-location"
            className="btn-primary has-state"
            data-current-location-btn
          >
            <span className="m-icon">my_location</span>

            <span className="span">Current Location</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
