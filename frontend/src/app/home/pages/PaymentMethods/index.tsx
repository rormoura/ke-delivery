import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';

interface CommonPaymentMethod {
    name: string;
    default: string;
}
  
interface CashPaymentMethod extends CommonPaymentMethod {}

interface CreditCardPaymentMethod extends CommonPaymentMethod {
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expirationDate: string;
}
  
interface PixPaymentMethod extends CommonPaymentMethod {}

interface GooglePayPaymentMethod extends CommonPaymentMethod {}
  
type PaymentMethod = CashPaymentMethod | CreditCardPaymentMethod | PixPaymentMethod | GooglePayPaymentMethod;

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCreditCardModal, setShowCreditCardModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUpdateCreditCardModal, setShowUpdateCreditCardModal] = useState(false);
  const [formData, setFormData] = useState<any>({id:'',name:'',default:'',cardHolderName:'',cardNumber:'',expirationDate:'',cvv:''});
  const [updateData, setUpdateData] = useState({ id:'',name:'',default:''});
  const [updateCreditCardData, setUpdateCreditCardData] = useState({ id:'',name:'', cardHolderName:'',cardNumber:'',expirationDate:'',cvv:'',default:''});

  useEffect(() => {
    axios.get(`http://localhost:5001/api/paymentMethods`)
      .then((response) => {
        setPaymentMethods(response.data.data);
      })
      .catch((error) => {
        alert(`Não foi possível carregar os métodos de pagamento disponíveis: `+error);
      });
  }, []);

  const handleAddPaymentMethod = (type: string) => {
    if(type === 'creditCard'){
      setShowCreditCardModal(true);
      setFormData({ type });
    }
    else{
      setShowModal(true);
      setFormData({ type });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const closeCreditCardModal = () => {
    setShowCreditCardModal(false);
    setFormData({});
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:5001/api/paymentMethods/${formData.type}`, formData)
      .then((response) => {
        setPaymentMethods([...paymentMethods, response.data.data]);
        closeModal();
        closeCreditCardModal();
        alert(`Método de pagamento do tipo ${formData.type} adicionado com sucesso.`);
      })
      .catch((error) => {
        alert(`Não foi possível adicionar o método de pagamento do tipo ${formData.type}: `+error);
      });
  };

  const handleUpdateSubmit = () => {
    axios.put(`http://localhost:5001/api/paymentMethods/cash/${formData.name}`, updateData)
      .then((response) => {
          if(formData.name === defaultPaymentMethod){
            setDefaultPaymentMethod(updateData.name);
          }
          alert(`O método de pagamento ${formData.name} foi atualizado corretamente.`);
          setPaymentMethods((prevState) => {
            const updatedMethods = prevState.filter((method: any) => method.name !== formData.name);
            return [...updatedMethods, response.data.data];
          });
          setFormData({});
          setShowUpdateModal(false);
      })
      .catch((error) => {
          axios.put(`http://localhost:5001/api/paymentMethods/googlePay/${formData.name}`, updateData)
            .then((response) => {
                if(formData.name === defaultPaymentMethod){
                  setDefaultPaymentMethod(updateData.name);
                }
                alert(`O método de pagamento ${formData.name} foi atualizado corretamente.`);
                setPaymentMethods((prevState) => {
                  const updatedMethods = prevState.filter((method: any) => method.name !== formData.name);
                  return [...updatedMethods, response.data.data];
                });
                setFormData({});
                setShowUpdateModal(false);
              })
              .catch((error) => {
                axios.put(`http://localhost:5001/api/paymentMethods/pix/${formData.name}`, updateData)
                  .then((response) => {
                      if(formData.name === defaultPaymentMethod){
                        setDefaultPaymentMethod(updateData.name);
                      }
                      alert(`O método de pagamento ${formData.name} foi atualizado corretamente.`);
                      setPaymentMethods((prevState) => {
                        const updatedMethods = prevState.filter((method: any) => method.name !== formData.name);
                        return [...updatedMethods, response.data.data];
                      });
                      setFormData({});
                      setShowUpdateModal(false);
                    })
                    .catch((error) => {
                      alert(`Não foi possível atualizar o método de pagamento ${formData.name}: `+error);
                  });

            });
    });
  };

  const handleUpdateCreditCardSubmit  = () => {
    axios.put(`http://localhost:5001/api/paymentMethods/creditCard/${formData.name}`, updateCreditCardData)
    .then((response) => {
        if(formData.name === defaultPaymentMethod){
          setDefaultPaymentMethod(updateCreditCardData.name);
        }
        alert(`O método de pagamento ${formData.name} foi atualizado corretamente.`);
        setPaymentMethods((prevState) => {
          const updatedMethods = prevState.filter((method: any) => method.name !== formData.name);
          return [...updatedMethods, response.data.data];
        });
        setFormData({});
        setShowUpdateCreditCardModal(false);
      })
      .catch((error) => {
        alert(`Não foi possível atualizar o método de pagamento ${formData.name}: `+error);
      });
  };

  const handleUpdatePaymentMethod = (name: string) => {
    setFormData({name});
    axios.get(`http://localhost:5001/api/paymentMethods/${name}`)
      .then((response) => {
        if(response.data.data.cvv !== undefined){
          setShowUpdateCreditCardModal(true);
          setUpdateCreditCardData(response.data.data);
        }
        else{
          setShowUpdateModal(true);
          setUpdateData(response.data.data);
        }
      })
    
  };

  const handleDeletePaymentMethod = (name: string) => {
    axios.delete(`http://localhost:5001/api/paymentMethods/${name}`)
      .then(() => {
        alert(`O método de pagamento ${name} foi removido corretamente.`);
        setPaymentMethods(paymentMethods.filter((method: any) => method.name !== name));
      })
      .catch((error) => {
        alert(`Não foi possível remover o método de pagamento ${name}: `+error);
      });
      if(name === defaultPaymentMethod){
        setDefaultPaymentMethod('');
      }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSetDefaultPaymentMethod = (name: string) => {
    axios.put(`http://localhost:5001/api/paymentMethods/default/${name}`)
      .then(() => {
        setDefaultPaymentMethod(name);
        axios.get(`http://localhost:5001/api/paymentMethods`)
        .then((response) => {
          setPaymentMethods(response.data.data);
        })
        .catch((error) => {
          alert(`Não foi possível carregar os métodos de pagamento disponíveis: `+error);
        });
        alert(`O método de pagamento ${name} foi definido como padrão com sucesso.`)
      })
      .catch((error) => {
        alert(`Não foi possível definir o método ${name} como o novo método de pagamento padrão: `+error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Métodos de Pagamento</h1>

      <div className={styles.paymentMethods}>
        <h2>Métodos de Pagamento disponíveis</h2>
        <ul>
          {paymentMethods.map((method: PaymentMethod) => (
            <li key={method.name}>
              {method.name} (Padrão: {method.name === defaultPaymentMethod ? 'Sim' : 'Não'})
              <button onClick={() => handleUpdatePaymentMethod(method.name)}>Atualizar</button>
              <button onClick={() => handleDeletePaymentMethod(method.name)}>Remover</button>
              {!(method.default === "yes") && (
                <button onClick={() => handleSetDefaultPaymentMethod(method.name)}>Definir como padrão</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.addPaymentMethod}>
        <h2>Adicionar método de pagamento</h2>
        <button onClick={() => handleAddPaymentMethod('cash')}>Adicionar método de pagamento em dinheiro</button>
        <button onClick={() => handleAddPaymentMethod('creditCard')}>Adicionar cartão de crédito</button>
        <button onClick={() => handleAddPaymentMethod('pix')}>Adicionar pix</button>
        <button onClick={() => handleAddPaymentMethod('googlePay')}>Adicionar google pay</button>
      </div>

      {showModal && (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Adicionar método de pagamento do tipo: {formData.type}.</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <button type="button" onClick={handleSubmit}>Adicionar</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </form>
        </div>
        </div>
      )}

      {showCreditCardModal && (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Adicionar método de pagamento do tipo: {formData.type}.</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="cardHolderName">Nome do titular do cartão:</label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={formData.cardHolderName || ''}
                onChange={(e) => handleChange("cardHolderName", e.target.value)}
                onBlur={(e) => handleChange("cardHolderName", e.target.value)}
              />
              <label htmlFor="cardNumber">Número do cartão:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber || ''}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              />
              <label htmlFor="expirationDate">Data de validade:</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate || ''}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              />
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv || ''}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
            </div>
            <button type="button" onClick={handleSubmit}>Adicionar</button>
            <button type="button" onClick={closeCreditCardModal}>Cancelar</button>
          </form>
        </div>
        </div>
      )}

      {showUpdateCreditCardModal && (
              <div className={styles.modal}>
              <div className={styles.modalContent}>
              <h2>Atualizar método de pagamento</h2>
                <form>
                <div className={styles.formGroup}>
                <label htmlFor="name">Nome:</label>
                  <input
                    type="text"
                    name="name"
                    value={updateCreditCardData.name}
                    onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, name: e.target.value })}
                  />
                  <label htmlFor="cardHolderName">Nome do titular do cartão:</label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={updateCreditCardData.cardHolderName || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, cardHolderName: e.target.value })}
              />
              <label htmlFor="cardNumber">Número do cartão:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={updateCreditCardData.cardNumber || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, cardNumber: e.target.value })}
              />
              <label htmlFor="expirationDate">Data de validade:</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={updateCreditCardData.expirationDate || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, expirationDate: e.target.value })}
              />
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={updateCreditCardData.cvv || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, cvv: e.target.value })}
              />
              <label htmlFor="default">Padrão:</label>
                  <input
                    type="text"
                    name="default"
                    value={updateCreditCardData.default}
                    onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, default: e.target.value })}
                    disabled
                  />
                  <button type="button" onClick={handleUpdateCreditCardSubmit}>Atualizar</button>
                  <button type="button" onClick={() => {setFormData({}); setShowUpdateCreditCardModal(false); setUpdateCreditCardData({ id:'',name:'', cardHolderName:'',cardNumber:'',expirationDate:'',cvv:'',default:''});}}>Cancelar</button>
                  </div>
                </form>
              </div>
              </div>
            )}

      {showUpdateModal && (
              <div className={styles.modal}>
              <div className={styles.modalContent}>
              <h2>Atualizar método de pagamento</h2>
                <form>
                <div className={styles.formGroup}>
                <label htmlFor="name">Nome:</label>
                  <input
                    type="text"
                    name="name"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                  />
                <label htmlFor="default">Padrão:</label>
                  <input
                    type="text"
                    name="default"
                    value={updateData.default}
                    onChange={(e) => setUpdateData({ ...updateData, default: e.target.value })}
                    disabled
                  />
                  <button type="button" onClick={handleUpdateSubmit}>Atualizar</button>
                  <button type="button" onClick={() => {setFormData({}); setShowUpdateModal(false); setUpdateData({ id:'',name:'',default:''});}}>Cancelar</button>
                  </div>
                </form>
              </div>
              </div>
            )}

    </div>
  );
};

export default PaymentMethods;
