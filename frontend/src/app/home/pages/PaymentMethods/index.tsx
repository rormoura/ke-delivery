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
    if(formData.name == undefined){
      formData.name = '';
    }
    if(formData.cardHolderName == undefined){
      formData.cardHolderName = '';
    }
    if(formData.cardNumber == undefined){
      formData.cardNumber = '';
    }
    if(formData.expirationDate == undefined){
      formData.expirationDate = '';
    }
    if(formData.cvv == undefined){
      formData.cvv = '';
    }
    axios.post(`http://localhost:5001/api/paymentMethods/${formData.type}`, formData)
      .then((response) => {
        setPaymentMethods([...paymentMethods, response.data.data]);
        closeModal();
        closeCreditCardModal();
        alert(`Método de pagamento do tipo ${formData.type} adicionado com sucesso.`);
        })
      .catch((error) => {
        alert(`Não foi possível adicionar o método de pagamento do tipo ${formData.type}: `+error.response.data.msg);
      });
  };

  const handleUpdateSubmit = () => {
    if(formData.name == undefined){
      formData.name = '';
    }
    if(formData.cardHolderName == undefined){
      formData.cardHolderName = '';
    }
    if(formData.cardNumber == undefined){
      formData.cardNumber = '';
    }
    if(formData.expirationDate == undefined){
      formData.expirationDate = '';
    }
    if(formData.cvv == undefined){
      formData.cvv = '';
    }
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
                      alert(`Não foi possível atualizar o método de pagamento ${formData.name}: `+error.response.data.msg);
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
        alert(`Não foi possível atualizar o método de pagamento ${formData.name}: `+error.response.data.msg);
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
        alert(`Não foi possível remover o método de pagamento ${name}: `+error.response.data.msg);
      });
      if(name === defaultPaymentMethod){
        setDefaultPaymentMethod('');
      }
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
        alert(`Não foi possível definir o método ${name} como o novo método de pagamento padrão: `+error.response.data.msg);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Métodos de Pagamento</h1>

      <div className={styles.paymentMethods}>
        <h2>Métodos de Pagamento disponíveis</h2>
        <ul>
          {paymentMethods.map((method: PaymentMethod) => (
            <li key={method.name} data-cy="metodosDisponiveis">
              {method.name} (Padrão: {method.name === defaultPaymentMethod ? 'Sim' : 'Não'})
              <button data-cy={"atualizar"+method.name} onClick={() => handleUpdatePaymentMethod(method.name)}>Atualizar</button>
              <button data-cy={"remover"+method.name} onClick={() => handleDeletePaymentMethod(method.name)}>Remover</button>
              {!(method.default === "yes") && (
                <button data-cy={"definirPadrao"+method.name} onClick={() => handleSetDefaultPaymentMethod(method.name)}>Definir como padrão</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.addPaymentMethod}>
        <h2>Adicionar método de pagamento</h2>
        <button data-cy="adicionarDinheiro" onClick={() => handleAddPaymentMethod('cash')}>Adicionar método de pagamento em dinheiro</button>
        <button data-cy="adicionarCartao" onClick={() => handleAddPaymentMethod('creditCard')}>Adicionar cartão de crédito</button>
        <button data-cy="adicionarPix" onClick={() => handleAddPaymentMethod('pix')}>Adicionar pix</button>
        <button data-cy="adicionarGooglePay" onClick={() => handleAddPaymentMethod('googlePay')}>Adicionar google pay</button>
      </div>

      {showModal && (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Adicionar método de pagamento do tipo: {formData.type}.</h2>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome:</label>
              <input
                data-cy="nomeModalComum"
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <button data-cy="adicionarModalComum" type="button" onClick={handleSubmit}>Adicionar</button>
            <button data-cy="cancelarModalComum" type="button" onClick={closeModal}>Cancelar</button>
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
                data-cy="nomeModalCartao"
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="cardHolderName">Nome do titular do cartão:</label>
              <input
                data-cy="titularModalCartao"
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={formData.cardHolderName || ''}
                onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
              />
              <label htmlFor="cardNumber">Número do cartão:</label>
              <input
                data-cy="numeroModalCartao"
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber || ''}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              />
              <label htmlFor="expirationDate">Data de validade:</label>
              <input
                data-cy="validadeModalCartao"
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate || ''}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
              />
              <label htmlFor="cvv">CVV:</label>
              <input
                data-cy="cvvModalCartao"
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv || ''}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
            </div>
            <button data-cy="adicionarModalCartao" type="button" onClick={handleSubmit}>Adicionar</button>
            <button data-cy="cancelarModalCartao" type="button" onClick={closeCreditCardModal}>Cancelar</button>
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
                    data-cy="nomeUpdateModalCartao"
                    type="text"
                    name="name"
                    value={updateCreditCardData.name}
                    onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, name: e.target.value })}
                  />
                  <label htmlFor="cardHolderName">Nome do titular do cartão:</label>
              <input
                data-cy="titularUpdateModalCartao"
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={updateCreditCardData.cardHolderName || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, cardHolderName: e.target.value })}
              />
              <label htmlFor="cardNumber">Número do cartão:</label>
              <input
                data-cy="numeroUpdateModalCartao"
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={updateCreditCardData.cardNumber || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, cardNumber: e.target.value })}
              />
              <label htmlFor="expirationDate">Data de validade:</label>
              <input
                data-cy="validadeUpdateModalCartao"
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={updateCreditCardData.expirationDate || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, expirationDate: e.target.value })}
              />
              <label htmlFor="cvv">CVV:</label>
              <input
                data-cy="cvvUpdateModalCartao"
                type="text"
                id="cvv"
                name="cvv"
                value={updateCreditCardData.cvv || ''}
                onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, cvv: e.target.value })}
              />
              <label htmlFor="default">Padrão:</label>
                  <input
                    data-cy="padraoUpdateModalCartao"
                    type="text"
                    name="default"
                    value={updateCreditCardData.default}
                    onChange={(e) => setUpdateCreditCardData({ ...updateCreditCardData, default: e.target.value })}
                    disabled
                  />
                  <button data-cy="atualizarUpdateModalCartao" type="button" onClick={handleUpdateCreditCardSubmit}>Atualizar</button>
                  <button data-cy="cancelarUpdateModalCartao" type="button" onClick={() => {setFormData({}); setShowUpdateCreditCardModal(false); setUpdateCreditCardData({ id:'',name:'', cardHolderName:'',cardNumber:'',expirationDate:'',cvv:'',default:''});}}>Cancelar</button>
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
                    data-cy="nomeUpdateModalComum"
                    type="text"
                    name="name"
                    value={updateData.name}
                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                  />
                <label htmlFor="default">Padrão:</label>
                  <input
                    data-cy="padraoUpdateModalComum"
                    type="text"
                    name="default"
                    value={updateData.default}
                    onChange={(e) => setUpdateData({ ...updateData, default: e.target.value })}
                    disabled
                  />
                  <button data-cy="atualizarUpdateModalComum" type="button" onClick={handleUpdateSubmit}>Atualizar</button>
                  <button data-cy="cancelarUpdateModalComum" type="button" onClick={() => {setFormData({}); setShowUpdateModal(false); setUpdateData({ id:'',name:'',default:''});}}>Cancelar</button>
                  </div>
                </form>
              </div>
              </div>
            )}

    </div>
  );
};

export default PaymentMethods;
