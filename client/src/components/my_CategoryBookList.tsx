import '../my_types';
import '../assets/css/my_CategoryBookList.css';
import CategoryBookListItem from './my_CategoryBookListItem';
import {BookItem} from "../my_types";
import {CatProp} from "../my_types";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function CategoryBookList(props:CatProp) {
	const {id="Romance"} = useParams ();
	const [books, setBooks]  = useState([]);
	useEffect(() => {
		axios.get(`/ShihHungBookstoreReactTransact/api/categories/name/${id}/books/`)
			.then((result) => {
				setBooks(result.data );
			} )
			.catch(console.error);
	}, [id]);

	return (
      <div className="main">
	  	<h1>{id}</h1>
		<div className="grid-container">
	  
              {books.map((book:BookItem) => (
                  <CategoryBookListItem  key={book.bookId} bookId={book.bookId} isPublic={book.isPublic} price={book.price} title={book.title} author={book.author} categoryId ={book.categoryId}/>))}
		</div>
      </div>
)
}

export default CategoryBookList;
