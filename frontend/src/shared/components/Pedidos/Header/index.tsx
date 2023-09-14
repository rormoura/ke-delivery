import styles from "./header.module.css"
import logo from "../../../../shared/assets/logoZe.jpg"
import SearchBar from "../SearchBar";
import CartButton from "../CartButton";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" width ="100px" />
                <h1 className={styles.title}>K� Delivery</h1>
            </div>
            <SearchBar></SearchBar>
            
            <div className={styles.container}>
                <CartButton/>
                <Link to="/" data-cy="Sair"  className={styles.buttonLogin}>Sair</Link>

            </div>
        </header>
    )
}

export default Header; 