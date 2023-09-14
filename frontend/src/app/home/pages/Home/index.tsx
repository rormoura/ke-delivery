import styles from "./index.module.css";
import HomeImage from '../../../../shared/assets/home.svg';
import HomeImageFood from '../../../../shared/assets/home1.png';
import HomeImageFood1 from '../../../../shared/assets/home2.png';
import Navbar from "../Navbar";

const Home = () => {
  return(
    <section>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.image}>
          <img src={HomeImage} alt="forma amarela"/>
        </div>
        <div className={styles.texts}>
          <h1 className={styles.title}>Ingredientes simples em experiências extraordinárias.</h1>
          <p className={styles.text}>Com uma interface intuitiva e uma variedade de recursos incríveis, o Ké Delivery se tornou um nome familiar para aqueles que desejam conveniência e qualidade.</p>
        </div>
        <div className={styles.images}>
          <img src={HomeImageFood} alt="" className={styles.foodImage}/>
          <img src={HomeImageFood1} alt="" className={styles.foodImageSmall}/>
        </div>
      </section>
    </section>
  );
}

export default Home;