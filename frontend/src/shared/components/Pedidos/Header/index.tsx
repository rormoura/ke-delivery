import styles from "./header.module.css"
import logo from "../../../../shared/assets/logoZe.jpg"
import SearchBar from "../SearchBar";
import CartButton from "../CartButton";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" width ="100px" />
                <h1 className={styles.title}>Ké Delivery</h1>
            </div>
            <SearchBar></SearchBar>
            
            <div className={styles.container}>
                <CartButton/>
                <button className={styles.buttonLogin}>Entrar</button>
            </div>
        </header>
    )
}

export default Header; 