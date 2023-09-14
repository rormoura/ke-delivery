import styles from "./index.module.css";
import Menu from "../../components/Restaurants/Menu";
import { useState, useEffect } from "react";
import Carte from "../Menu";


const HomeRestaurant = () => {
  const [formData, setFormData] = useState({
    id: '',
    typeBusiness:'',
    responsibleName: '',
    responsibleCPF: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    phoneRestaurant: '',
    corporateName: '',
    restaurantName: '',
    CNPJ: '',
    speciality: ''
  });
  const [restaurantData, setRestaurantData] = useState<any>(null);
  
  useEffect(() => {
    const restaurantApiUrl = 'http://localhost:5001/api/restaurants'; 

    fetch(restaurantApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then((responseData) => {
        setRestaurantData(responseData);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }, []);

  return(
    <section className={styles.container}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.body}>
        <h1 className={styles.title}>Olá</h1>
        <div className={styles.box}></div>
        <div className={styles.boxes}>
          <div className={styles.boxSmall}></div>
          <div className={styles.boxSmall}></div>
        </div>
        <Carte />
      </div>
    </section>
  )
}

export default HomeRestaurant;