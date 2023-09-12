import { useState, useContext } from "react";
import { CgSearch } from 'react-icons/cg'
import styles from "./SearchBar.module.css"
import fetchProducts from "../../../../api/fetchProducts.js";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function SearchBar() {

    const { setProducts, setLoading } = useContext(PedidosContext)
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);

        const products = await fetchProducts(searchValue);

        setProducts(products);
        setLoading(false);
        setSearchValue('');
    }
    

    return (
        <form className={styles.SearchBar} onSubmit={handleSearch}>
            {name}
                <input
                    type="search"
                    value={searchValue}
                    placeholder="Buscar produtos"
                    className={styles.SearchInput}
                    onChange={({ target }) => setSearchValue(target.value)}
                    required
                />            
                <button type="submit" className={styles.SearchButton}>
                    <CgSearch/>
                </button>
            </form>
    )
}

export default SearchBar;