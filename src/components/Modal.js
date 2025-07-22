import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
