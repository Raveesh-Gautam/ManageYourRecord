import React, { useContext } from "react";
import styles from "./Password.module.css";
import ModalContext from "../context/auth-context";
const Password = () => {
  const authCtx = useContext(ModalContext);

  const handleAddPassword = () => {
    authCtx.setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className={styles.pass}>Password Keeper</h2>
      <div className={styles.main}>
        <p className={styles.tot}>Total Password {authCtx.allPasswords.length} </p>
        <button className={styles.addbtn} onClick={handleAddPassword}>
          Add Password
        </button>
      </div>
    </div>
  );
};

export default Password;
