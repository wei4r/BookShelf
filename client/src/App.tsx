import AppHeader from './components/my_AppHeader';
import AppFooter from './components/my_AppFooter';
import Home from './components/my_Home'
import CategoryBookList from './components/my_CategoryBookList';
import CartTable from './components/CartTable';
import Checkout from './components/Checkout';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import {useEffect, useState, useContext} from "react";
import {Category} from './contexts/CategoryContext';
import {CategoryItem} from './my_types';
import {CartStore} from "./contexts/CartContext";
import CheckoutPage from "./components/CheckoutPage";
import ConfirmationTable from "./components/ConfirmationTable";
import ConfirmationPage from './components/ConfirmationPage';

function App() {
    const categories = useContext<CategoryItem[]>(Category);
    const {cart} = useContext(CartStore);
    console.log(cart);
    return (
        <Router basename ={"ShihHungBookstoreReactTransact"}>
            <AppHeader/>
            <Routes>home
                <Route path="/categories" element={<CategoryBookList catList ={categories} />} >
                    <Route path=":id" element={<CategoryBookList catList= {categories}  />} />
                </Route >
                <Route path="/" element={<Home  catList= {categories } />} />
                <Route path="/cart" element={<CartTable />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkoutpage" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
            <AppFooter />

        </Router>
    );

}

export default App;

