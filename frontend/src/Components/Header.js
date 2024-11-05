import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

function Header() {
  const { user, logout } = useContext(UserContext)

  return (
    <div>
      <header className="header">
        <img src="https://i.ibb.co/3RSppjG/android-chrome-192x192.png" alt="Applicareone" className="applicareone" />
        <div className="row container-xs">
          <div className="rowsign_in">
            <ul className="rowhome">
              <li>
                <a href="HomePage">
                  <p className="home ui text size-text3xl">Home</p>
                </a>
              </li>
              <li>
                <a href="About">
                  <p className="about ui text size-text3xl">About</p>
                </a>
              </li>
              <li>
                <a href="OurServices">
                  <p className="home ui text size-text3xl">Our Services</p>
                </a>
              </li>
              <li>
                <a href="ProfessionalServices">
                  <p className="home ui text size-text3xl">Service Map</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p className="home ui text size-text3xl">Contact Us</p>
                </a>
              </li>
            </ul>
            {user ? (
              <div>
                <button className="sign_in ui button pink_100 size-md outline round" onClick={logout}>
                  {user} (Logout)
                </button>
              </div>
            ) : (
              <a href="LoginPage">
                <button className="sign_in ui button pink_100 size-md outline round">Sign In</button>
              </a>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;