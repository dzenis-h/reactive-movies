import React from 'react';
import Logo from '../assets/icons/video-player.svg';
import { Link } from 'react-router-dom';

// Example of a stateless/ presentational component
const Header = () => {
  const myStyle = {
    fontSize: '1rem',
    fontFamily: 'Indie Flower, cursive',
    margin: '0rem 6rem',
    fontStyle: 'italic',
    color: 'gold',
    letterSpacing: '2px',
  };

  return (
    <div className="navbar-fixed">
      <nav className="teal red darken-3">
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            <img
              src={Logo}
              alt="Logo"
              width="60"
              style={{ marginLeft: '0.6rem' }}
            />
          </Link>
          <b className="left brand-logo" style={myStyle}>
            Rubicon Movies
          </b>

          <ul className="right" style={{ marginRight: '1rem' }}>
            <li>
              {' '}
              <Link to="/movies">Movies</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/tv">TV</Link>{' '}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
