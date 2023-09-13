import styles from "./index.module.css";
import LogoTemporaria from "../../../../../shared/assets/logoTemp.svg";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
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

  const handleInputChange = (event, name) => {
    setFormData({ 
      ...formData, 
      [name]: event.target.value 
    });
  }
  const [showPopup, setShowPopup] = useState(false);

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch('http://localhost:5001/api/restaurants', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      window.open(`/login`, '_self');
      alert("Cadastro realizado com sucesso!! Faça seu login");
      // setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <section className={styles.container}>
      <div className={styles.header}>
        <img src={LogoTemporaria} alt="Logo" className={styles.logo} />
        <h1>Cadastre aqui seu restaurante!</h1>
      </div>
      <div className={styles.background}>
        <h2 className={styles.subtitle}>Dados da pessoa responsável</h2>
        <form className={styles.formInputs} onSubmit={handleForm}>
          <div className={styles.inputContainer}>
            <label>Nome Completo</label>
            <input 
              name="name"
              placeholder="Digite seu nome completo"
              className={styles.input}
              required
              value = {formData.responsibleName}
              onChange={(event) => handleInputChange(event, 'responsibleName')}
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
            <label>Telefone</label>
            <input 
              name="phone"
              placeholder="Digite seu numero"
              className={styles.input}
              required
              value = {formData.phone}
              onChange={(event) => handleInputChange(event, 'phone')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>CPF</label>
            <input 
              name="cpf"
              placeholder="Digite seu CPF"
              className={styles.input}
              required
              value = {formData.responsibleCPF}
              onChange={(event) => handleInputChange(event, 'responsibleCPF')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Senha</label>
            <input 
              type="password"
              name="password"
              placeholder="Digite sua senha"
              className={styles.input}
              required
              value = {formData.password}
              onChange={(event) => handleInputChange(event, 'password')}
            />
            {/* falta visualizar senha */}
          </div>
          {/* <div className={styles.inputContainer}>
            <label>Confirme sua senha</label>
            <input 
              type="password"
              name="password"
              placeholder="Confirme sua senha"
              className={styles.input}
              required
              value = {formData.password}
              onChange={(event) => handleInputChange(event, 'password')}
            />
          </div> */}
        <h2 className={styles.subtitle}>Dados do restaurante</h2>
        <div className={styles.formInputs}>
          <div className={styles.inputContainer}>
            <label>Nome do restaurante</label>
            <input 
              name="restaurantName"
              placeholder="Digite nome do restaurante"
              className={styles.input}
              required
              value = {formData.restaurantName}
              onChange={(event) => handleInputChange(event, 'restaurantName')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Tipo de negógico</label>
            <input 
              name="typeBusiness"
              placeholder="Restaurante, farmácia, mercado..."
              className={styles.input}
              required
              value = {formData.typeBusiness}
              onChange={(event) => handleInputChange(event, 'typeBusiness')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Telefone</label>
            <input 
              name="phoneRestaunrant"
              placeholder="Telefone do restaurante"
              className={styles.input}
              required
              value = {formData.phoneRestaurant}
              onChange={(event) => handleInputChange(event, 'phoneRestaurant')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>CNPJ</label>
            <input 
              name="cnpj"
              placeholder="CNPJ da empresa"
              className={styles.input}
              required
              value = {formData.CNPJ}
              onChange={(event) => handleInputChange(event, 'CNPJ')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Especialidade</label>
            <input 
              name="speciality"
              placeholder="Especialidade do restaurante"
              className={styles.input}
              // required
              value = {formData.speciality}
              onChange={(event) => handleInputChange(event, 'speciality')}
            />
          </div>
        </div>
        <button className={styles.button} type = "submit">Cadastrar</button>
        </form>
      </div>
    </section>
  )
}

export default Form;