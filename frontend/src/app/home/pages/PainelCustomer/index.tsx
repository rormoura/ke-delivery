import styles from "./index.module.css";
import Food2 from "../../../../shared/assets/food2.png";
import Food3 from "../../../../shared/assets/food3.png";
import Food4 from "../../../../shared/assets/food4.png";
import FoodCry from "../../../../shared/assets/foodCry.png";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";



const PainelCustomer = () => {

  //listar clientes cadastrados
  const [customers, setCustomers] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    try { 
      const getCustomers = async () => {
        const response = await fetch('http://localhost:5001/api/customers');
        const data = await response.json();
        setCustomers(data.data);
      }
      getCustomers();
    } catch (error) {
      console.log(error);
    }
  }
  , []);

  //deletar cliente
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/customers/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.status === 200) {
        const newCustomers = customers.filter((customer) => customer.id !== id);
        setCustomers(newCustomers);
        setShowPopup(true);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <body className={styles.page}>
      <h1 className={styles.title}>Painel de Clientes</h1>
      <main>
      <div className={styles.estatisticas}>
        <div className={styles.estatistica1}> 
          <img src={Food2} alt="comida" className={styles.comida} />
        </div>
        <div className={styles.estatistica1}>
        <img src={Food3} alt="comida" className={styles.comida} />
        </div>
        
        <div className={styles.estatistica1}>
          <img src={Food4} alt="comida" className={styles.comida} />
        </div>
      </div>
      <div className={styles.customerList}>
      
        {customers.map((customer) => (
          <div className={styles.customer}>
            <div className={styles.customerInfo}>
              
                <div className= {styles.textDiv}>
                  <h3>{customer.name}</h3>
                </div>
                <div className= {styles.textDiv}>
                  <h3 data-cy="cpfPainel">{customer.cpf}</h3>
                </div>
                <div className= {styles.textDiv}>
                  <h3>{customer.email}</h3>
                </div>
            </div>
            
            <button data-cy="botonPainel" className={styles.deleteButton} onClick={() => handleDelete(customer.id)}>
              <h4 className={styles.textButton}>Deletar</h4>
              </button>
           
          </div>
        ))}
      </div>

        {showPopup && (
            <div className={styles.popup}>
              <img className={styles.foodCry} src={FoodCry} alt="Comida triste" />
              <p>O cliente foi apagado com sucesso</p>
              <button data-cy="popupPainel" onClick={() => setShowPopup(false)}>Fechar</button>
            </div>
          )}
      <Footer />
      </main>
    </body>
  );
};

export default PainelCustomer;
