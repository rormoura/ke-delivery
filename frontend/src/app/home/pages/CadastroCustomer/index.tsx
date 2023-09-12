import styles from "./index.module.css";
import LogoTemporaria from "../../../../shared/assets/logoTemp.svg";
import { useState } from "react";

const CadastroCustomer = () => {
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
      const response = await fetch('http://localhost:5001/api/customers', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  }


  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre-se!</h1>
      </div>
      <form className={styles.background} onSubmit={handleForm}>
        <h2 className={styles.subtitle}>Seus Dados</h2>
        <div className={styles.formInputs}>
          <div className={styles.inputContainer}>
            <label>Nome Completo</label>
            <input 
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
              required
              value = {formData.name}
              onChange={(event) => handleInputChange(event, 'name')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>CPF</label>
            <input 
              name="cpf"
              placeholder="Digite seu CPF"
              className={styles.input}
              required
              value = {formData.cpf}
              onChange={(event) => handleInputChange(event, 'cpf')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Email</label>
            <input 
              name="email"
              placeholder="Digite seu melhor email"
              className={styles.input}
              required
              value = {formData.email}
              onChange={(event) => handleInputChange(event, 'email')}

            />
          </div>
          <div className={styles.inputContainer}>
            <label>Endereço</label>
            <input 
              name="address"
              placeholder="Digite seu endereço"
              className={styles.input}
              required
              value = {formData.address}
              onChange={(event) => handleInputChange(event, 'address')}

            />
          </div>
          <div className={styles.inputContainer}>
            <label>Senha</label>
            <input 
              name="password"
              placeholder="Crie uma senha"
              className={styles.input}
              required
              value = {formData.password}
              onChange={(event) => handleInputChange(event, 'password')}

            />
          </div>
        </div>
        <button className={styles.button} type = "submit">Cadastrar</button>
      </form>
    </section>
  )
}

export default CadastroCustomer;