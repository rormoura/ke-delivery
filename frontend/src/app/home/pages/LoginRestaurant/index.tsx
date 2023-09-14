import styles from "./index.module.css"
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg";
import { useState } from "react";

const LoginRestaurant = () => {
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

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event, name) => {  
    setFormData({ 
      ...formData, 
      [name]: event.target.value 
    });
  }

  const handleForm = async (event: any) => {
    try {
      event.preventDefault();
      const response = await fetch(`http://localhost:5001/api/restaurants/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        window.open(`/homeRestaurant?email=${formData.email}`, '_self');
        // alert("login realizado com sucesso!");
      } else {
        setShowPopup(true);
      } 
    } catch (error) {
      console.log(error);
      setShowPopup(true); // Mostrar o pop-up quando ocorrer um erro
    }
  }

  return(
    <section className={styles.container}>
      <div className={styles.backgroundContainer}>
        <h1>Ké delivery</h1> 
        {/* colocar logo */}
      </div>
      <div className={styles.formsLogin}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Que bom te ver novamente!</h1>
        <form onSubmit={handleForm}>
          <div className={styles.inputDiv}>
            <label>Email:</label>
            <input 
              data-cy= "email"
              type="text" 
              name="email" 
              placeholder="Digite aqui seu melhor email"
              className={styles.textInput}
              required
              value={formData.email}
              onChange={(event) => handleInputChange(event, 'email')}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Senha:</label>
            <input 
              data-cy= "password"
              type="password" 
              name="password"
              placeholder="Digite sua senha"
              className={styles.textInput}
              required
              value={formData.password}
              onChange={(event) => handleInputChange(event, 'password')}
            />
          </div>
          {showPopup && (
            <p className={styles.error}>O login não foi bem-sucedido. Verifique suas credenciais.</p>
          )}
          <button 
            className={styles.button} 
            type="submit" 
            data-cy="login"
          >
            Entrar
          </button>
        </form>
        <div className={styles.register}>
          <p>Ainda não tem conta?</p>
          <a href="/typesRegisters" data-cy="goToRegister">
            <h2 className={styles.link}>Cadastre-se</h2>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginRestaurant;