import styles from "./index.module.css";
import LogoTemporaria from "../../../../../shared/assets/logoTempBlack.svg";
import HomeIcon from "../../../../../shared/assets/homeIcon.svg";
import RequestIcon from "../../../../../shared/assets/pedidosIcon.svg";
import MenuIcon from "../../../../../shared/assets/cardapioIcon.svg";
import ProfileIcon from "../../../../../shared/assets/profileIcon.svg";

const Menu = () => {
  return(
    <section className={styles.container}>
      <div className={styles.menu}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <a href="/homeRestaurant" className={styles.link}>
          <img src={HomeIcon} className={styles.icon} />
          <h3>Início</h3>
        </a>
        <a href="/requests" className={styles.link}>
          <img src={RequestIcon} className={styles.icon} />
          <h3>Pedidos</h3>
        </a>
        <a href="/menu" className={styles.link}>
          <img src={MenuIcon} className={styles.icon}/>
          <h3>Cardápio</h3>
        </a>
        <a href="/profile/id" className={styles.link}>
          <img src={ProfileIcon} className={styles.icon}/>
          <h3>Conta</h3>
        </a>
      <h1 id={styles.name}>Ké Delivery</h1>
      </div>
    </section>
  )
}

export default Menu;