import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { FaShoppingCart, FaBookmark, FaUserCircle } from 'react-icons/fa';

function Header() {
  const { user, logout } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]); // Cart state to store items added

  // Example function to simulate adding an item to the cart
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to handle clicking the cart icon
  const handleCartClick = () => {
    alert('Redirecting to the shopping cart page...');
  };

  // Function to handle clicking the saved/bookmark icon
  const handleSavedClick = () => {
    alert('Redirecting to your saved items...');
  };

  return (
    <div>
      <header className="header">
        <img
          src="https://i.ibb.co/3RSppjG/android-chrome-192x192.png"
          alt="Applicareone"
          className="applicareone"
        />
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
             
            </ul>
            {user ? (
              <div>
                <button
                  className="sign_in ui button pink_100 size-md outline round"
                  onClick={logout}
                >
                  <FaUserCircle size={20} style={{ marginRight: '5px' }} />
                  {user} (Logout)
                </button>
              </div>
            ) : (
              <a href="LoginPage">
                <button className="sign_in ui button pink_100 size-md outline round">
                  <FaUserCircle size={20} style={{ marginRight: '5px' }} />
                  Sign In
                </button>
              </a>
            )}
          </div>

          {/* Saved/Bookmark Icon */}
          <div className="icon-container" onClick={handleSavedClick} title="Saved Items">
            <FaBookmark size={30} color="black" />
          </div>

          {/* Shopping Cart Icon */}
          <div className="icon-container" onClick={handleCartClick} title="Shopping Cart">
            <FaShoppingCart size={30} color="black" />
            {/* Display cart item count */}
            {cartItems.length > 0 && (
              <span className="cart-item-count">{cartItems.length}</span>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
