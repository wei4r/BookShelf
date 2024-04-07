import '../assets/css/my_CategoryBookListItem.css';
import "../my_types";
import {BookItem} from "../my_types";
import {useContext} from "react";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";
import {asDollarsAndCents} from "../utils";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  name = name.replace(/:/g, "+");
  return `${name}.jpg`;
};

function CategoryBookListItem(props:BookItem) {
	// @ts-ignore
	const  {dispatch} = useContext(CartStore);
	const addBookToCart = () => {
		// @ts-ignore
		dispatch({ type: CartTypes.ADD, item:props, id: props.bookId });
	};
	return (
		<div className="grid-item">
			<div className="book-cover">
				<img src={require('../assets/images/books/' + bookImageFileName(props))}
				alt={props.title}
				/>
				<button className="read-now-button">ReadNow</button>
			</div>
			<div className="book-content">
				<h2 className="book-title">{props.title}</h2>
				<span className="book-author">{props.author}</span>
				<span className="book-price">{asDollarsAndCents(props.price)}</span>
				<button className="add-to-cart"  onClick={addBookToCart}>Add</button>
				{/*<button className="add-to-cart">Add</button>*/}
			</div>
		</div>

	)
}
export default CategoryBookListItem;
