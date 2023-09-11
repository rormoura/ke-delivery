import styles from "./index.module.css";
import HomeImage from '../../../../shared/assets/home.svg';
import HomeImageFood from '../../../../shared/assets/home1.png';
import HomeImageFood1 from '../../../../shared/assets/home2.png';

const Home = () => {
  return(
    <section className={styles.container}>
      <div className={styles.image}>
        <img src={HomeImage} alt="forma amarela"/>
      </div>
      <div className={styles.texts}>
        <h1 className={styles.title}>Premium quality Food for your healthy & Daily Life</h1>
        <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div className={styles.images}>
        <img src={HomeImageFood} alt="" className={styles.foodImage}/>
        <img src={HomeImageFood1} alt="" className={styles.foodImageSmall}/>
      </div>
    </section>
  );
}

export default Home;