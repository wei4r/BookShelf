import '../assets/css/my_global.css'
import '../assets/css/my_headerDropDown.css';
import { CategoryItem } from '../my_types';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { Category } from '../contexts/CategoryContext';

function HeaderDropdown() {
	const categories = useContext<CategoryItem[]>(Category);
	return (

      <div className="dropdown">
        <button>
			Others
			<svg width="24" height="25" viewBox="0 0 24 25" fill="#FEDD58" xmlns="http://www.w3.org/2000/svg" className="triangle">
				<path d="M3 1.5V23.5L22 12.5"/>
			</svg>
		</button>
		<div className='dropdown-content'>
			{categories.map((item) =>    <button key={item.categoryId}>
				<Link key={item.categoryId} to={`/categories/${item.name}`} className='link-button'>
					{item.name}</Link></button>)}
		</div>


</div>

)
}
export default HeaderDropdown

