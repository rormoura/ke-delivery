import styles from "./index.module.css";
import Food1 from "../../../../shared/assets/food1.png";
import FoodCry from "../../../../shared/assets/foodCry.png";
import { useState } from "react";
import Footer from "../Footer";

const LoginCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    address: '',
    password: '',
  });

  const [showPopup, setShowPopup] = useState(false); // Estado para controlar o pop-up

  const handleInputChange = (event, name) => {
    setFormData({ 
      ...formData, 
      [name]: event.target.value 
    });
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      console.log("AAAAAAAAAAAa",formData);
      const response = await fetch('http://localhost:5001/api/customers/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("RESPONSEE>>>>>>>",response);
      if (response.status === 200) {
        // Login bem-sucedido, redirecionar ou fazer algo aqui
        // window.open(`/cadastro-customer`, '_self');
      } else {
        // Login falhou, mostrar pop-up de erro
        setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
      setShowPopup(true); // Mostrar o pop-up quando ocorrer um erro
    }
  }

  return (
    <section className={styles.page}>
      <section className={styles.container}>
        <img className={styles.imagem1} src={Food1} alt="Comida" />
        <form className={styles.content} onSubmit={handleForm}> 
          <h1 className={styles.title}>O que você quer, onde você quer, quando você quer!</h1>
          <input className={styles.input} type="text" 
            placeholder="Digite seu e-mail" 
            required
            value={formData.email}
            onChange={(event) => handleInputChange(event, 'email')}
          />
          <input className={styles.input} type="password" 
            placeholder="Digite sua senha" 
            required
            value={formData.password}
            onChange={(event) => handleInputChange(event, 'password')}
          />
          <button className={styles.button} type="submit">
            <p className={styles.textButton}>Entrar</p>
          </button>
        </form>

        {showPopup && (
          <div className={styles.popup}>
            <img className={styles.foodCry} src={FoodCry} alt="Comida triste" />
            <p>O login não foi bem-sucedido. Verifique suas credenciais.</p>
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        )}
      </section>
      <Footer />
    </section>
  );
};

export default LoginCustomer;
