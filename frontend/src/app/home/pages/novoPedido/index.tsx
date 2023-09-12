import styles from "./NovoPedido.module.css";
import Header from "../../../../shared/components/Pedidos/Header";
import Footer from "../../../../shared/components/Pedidos/Footer";
import Produtos from "../../../../shared/components/Pedidos/Produtos";
import Provider from "../../context/PedidosContext/Provider.jsx";



const NovoPedido = () => {
    return (
        <div className={styles.body}>
            <Provider>
                <Header />
                <Produtos />
                <Footer />
            </Provider>
        </div>
    );
};

export default NovoPedido;
