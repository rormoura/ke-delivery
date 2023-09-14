import styles from "./index.module.css";
import LogoTemporaria from "../../../../../shared/assets/logoTempBlack.svg";
import HomeIcon from "../../../../../shared/assets/homeIcon.svg";
import RequestIcon from "../../../../../shared/assets/pedidosIcon.svg";
import MenuIcon from "../../../../../shared/assets/cardapioIcon.svg";
import ProfileIcon from "../../../../../shared/assets/profileIcon.svg";
import LogoutIcon from "../../../../../shared/assets/logoutIcon.svg";

const Menu = () => {
  return(
    <section className={styles.container}>
      <div className={styles.menu}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <a href="/homeRestaurant" className={styles.link}>
          <img src={HomeIcon} className={styles.icon} />
          <h3>Início</h3>
        </a>
        <a href="/menu" className={styles.link}>
          <img src={MenuIcon} className={styles.icon}/>
          <h3>Cardápio</h3>
        </a>
        <a href="/promotions" className={styles.link}>
          <img src={ProfileIcon} className={styles.icon}/>
          <h3>Promoções</h3>
        </a>
        <a href="/" className={styles.link} id={styles.logout}>
          <img src={LogoutIcon} className={styles.icon}/>
          <h3>Sair</h3>
        </a>
      </div>
    </section>
  )
}

export default Menu;