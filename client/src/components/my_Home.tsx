import '../assets/css/my_global.css';
import '../assets/css/my_Home.css'
import { Link } from 'react-router-dom';
import book1 from '../assets/images/Book.png'
import {CatProp} from "../my_types";

function Home(props:CatProp) {
    return (

        <div className="homepage-main">
            <div className="block block-left">
                <div className="best-seller-img">
                    <img src={book1} alt="book"/>
                </div>
                <div className="best-seller-text">
                    <h1 className="book-name">Immortal Longings</h1>
                    <span className="description">Descriptions text description text description text description text 
                        description text description text description text description text description text</span>
                    <Link to="/categories">
                        <button>ShopBooks!</button>
			        </Link>
                </div>
            </div>
            <div className="block block-right">
                <h1 className="welcome">Welcome!</h1>
                <div className="slogan">
                    <h2 className="slogan-1">Stories for</h2>
                    <h2 className="slogan-2">   Every Journey.</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;
