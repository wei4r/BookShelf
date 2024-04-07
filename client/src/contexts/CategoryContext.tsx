import {useEffect, useState, createContext} from "react";
import axios from "axios";
import {CategoryItem} from "../my_types"

export const Category = createContext<CategoryItem[] | []>([]);   // creates a context called Category
Category.displayName = 'CategoryContext';

function CategoryContext ({ children }: { children: React.ReactNode })  {
    // cut/paste the categories code here from the App component
    const [categories, setCategories]  = useState([]);
    useEffect(() => {
        axios.get('/ShihHungBookstoreReactTransact/api/categories')
            .then((result) => setCategories(result.data ))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value ={categories}>{children}</Category.Provider>
    );
}
export default CategoryContext;