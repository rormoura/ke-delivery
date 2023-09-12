import { useState, useContext } from "react";
import { CgSearch } from 'react-icons/cg'

import styles from "./SearchBar.module.css"
import fetchProducts from "../../../../api/fetchProducts.js";
import PedidosContext from "../../../../app/home/context/PedidosContext/PedidosContext.js";

function SearchBar(){
    const [searchValue, setSearchValue] = useState('');

    return (
            <form className={styles.SearchBar}>
                <input
                    type="search"
                    value={searchValue}
                    placeholder="Buscar produtos"
                    className={styles.SearchInput}
                    onChange={({ target }) => setSearchValue(target.value)}
                    required
                />
                {searchValue}
                <button type="submit" className={styles.SearchButton}>
                    <CgSearch/>
                </button>
            </form>
    )
}

export default SearchBar;