import React from 'react';
import { assets } from '../../assets/assets';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = React.useState("home");
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

            <ul className={styles.navbarMenu}>
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? styles.active : ""}>
                    home
                </Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? styles.active : ""}>
                    menu
                </a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? styles.active : ""}>
                    mobile-app
                </a>
                <a href="#footer" onClick={() => setMenu("contact us")} className={menu === "contact us" ? styles.active : ""}>
                    contact us
                </a>
            </ul>

            <div className={styles.navbarRight}>
                <img src={assets.search_icon} alt="search" />
                <div className={styles.navbarSearchIcon}>
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="cart" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : styles.dot}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                ) : (
                    <div className={styles.navbarProfile}>
                        <img src={assets.profile_icon} alt="profile" />
                        <ul className={styles.navProfileDropdown}>
                            <li onClick={() => navigate("/myorders")}>
                                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
