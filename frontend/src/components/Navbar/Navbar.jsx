import React, 'react';
import { assets } from '../../assets/assets';
import styles from './Navbar.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  
  const [menu, setMenu] = React.useState("home");
  const [sidebar, setSidebar] = React.useState(false);
  const { getTotalCartAmount, token, setToken } = React.useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className={styles.navbar}> 
      <Link to="/">
        <img src={assets.logo} alt="logo" className={styles.logo} />
      </Link>
      
      {/* Mobile Menu Icon */}
      <img 
        src={assets.menu_icon} 
        alt="menu" 
        className={styles.menuIcon} 
        onClick={() => setSidebar(true)} 
      />

      {/* Navigation Links - Sidebar for mobile, row for desktop */}
      <ul className={`${styles.navbarMenu} ${sidebar ? styles.activeSidebar : ''}`}>
        <li className={styles.closeIcon} onClick={() => setSidebar(false)}>
            <img src={assets.cross_icon} alt="close" />
        </li>
        <Link
          to="/"
          onClick={() => { setMenu("home"); setSidebar(false); }}
          className={menu === "home" ? styles.active : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => { setMenu("menu"); setSidebar(false); }}
          className={menu === "menu" ? styles.active : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => { setMenu("mobile-app"); setSidebar(false); }}
          className={menu === "mobile-app" ? styles.active : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => { setMenu("contact us"); setSidebar(false); }}
          className={menu === "contact us" ? styles.active : ""}
        >
          contact us
        </a>
      </ul>

      <div className={styles.navbarRight}>
        <img src={assets.search_icon} alt="" />
        <div className={styles.navbarSearchIcon}>
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : styles.dot}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className={styles.navbarProfile}>
            <img src={assets.profile_icon} alt="" />
            <ul className={styles.navProfileDropdown}>
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
