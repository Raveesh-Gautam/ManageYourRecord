import React from "react";
import styles from "./PasswordCard.module.css";

const PasswordCard = ({ item, onEdit, onDelete }) => {
  return (
    <React.Fragment >
    <div className={styles.card}>
      <div className={styles.cardTitle}>{item.title}</div>
      <div className={styles.cardPassword}>{item.password}</div>
      <div className={styles.cardActions}>
        <button onClick={() => onEdit(item)} className={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
    </React.Fragment>
  );
};

export default PasswordCard;
