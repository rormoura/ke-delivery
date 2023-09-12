import styles from "./index.module.css"
import Food1 from "../../../../shared/assets/food1.png"
import { useState } from "react"

const LoginCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    address: '',
    password: '',
  });

  const handleInputChange = (event, name) => {
    setFormData({ 
      ...formData, 
      [name]: event.target.value 
    });
  }

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      console.log(formData);
      await fetch('http://localhost:5001/api/customers/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      window.open(`/cadastro-customer`, '_self');
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <section className={styles.container}>
      <img className={styles.imagem1} src={Food1} alt="Comida" />
      <form className={styles.content} onSubmit={handleForm}> 
        <h1 className={styles.title}>O que você quer, onde você quer, quando você quer!</h1>
        <input className={styles.input} type="text" 
          placeholder="Digite seu e-mail" 
          required
          value = {formData.email}
          onChange={(event) => handleInputChange(event, 'email')}/>
        <input className={styles.input} type="password" 
        placeholder="Digite sua senha" 
        required
        value = {formData.password}
        onChange={(event) => handleInputChange(event, 'password')}/>
        <button className={styles.button} type = "submit">
          <p className={styles.textButton}>Entrar</p>
        </button>
      </form>
    </section>
  );
};

export default LoginCustomer;
