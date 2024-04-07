import HeaderDropdown from './my_headerDropDown';
import '../assets/css/my_global.css'
import '../assets/css/my_AppHeader.css';
import logo from '../assets/images/Logo.svg'
import cart_img from '../assets/images/cart.svg'
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { CartStore } from '../contexts/CartContext';
function AppHeader(){
	// @ts-ignore
	const { cart } = useContext(CartStore);
	const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
	return(

	<header>
		<div  className="header-bar" id="search-box">
			<Link to="/">
				<img className="logo" src={logo} alt="Logo"/>
			</Link>
			<input className="search-box" id="search-box" type="text" placeholder="Search..."/>
			<div className="nav_buttons">
				<Link to="/cart" className="cart_button" id="cart_button">
					<img src={cart_img} alt="cart"/>
					{/*<span className="cart_count">1</span>*/}
					<button className="cart_button">{cartQuantity}</button>
				</Link>
				<button className="login_button">Log in</button>
			</div>
		</div>

		<div className="catbar">
			<Link to="/categories">
				<button>BestSellers</button>
			</Link>
			<button>SpecialOffers</button>
			<button>NewArrivals</button>
	       <HeaderDropdown/>
		</div>
	</header>

  
)
}
export default AppHeader;

