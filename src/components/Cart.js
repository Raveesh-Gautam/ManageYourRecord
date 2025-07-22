// Cart.jsx
import { useContext, useState } from "react";
import ModalContext from "../context/auth-context";
import styles from "./Cart.module.css";
import Modal from "./Modal";
import PasswordCard from "./PasswordCard";

const Cart = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    submitData,
    editPassword,
    deletePassword,
    allPasswords,
  } = useContext(ModalContext);

  const [form, setForm] = useState({ title: "", password: "", id: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.password.trim()) {
      alert("Please enter both title and password");
      return;
    }

    if (form.id) {
      await editPassword(form.id, {
        title: form.title,
        password: form.password,
      });
    } else {
      await submitData(form);
    }

    setForm({ title: "", password: "", id: null });
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deletePassword(id);
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, password: item.password, id: item.id });
    setIsModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className={styles.input}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              className={styles.input}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className={styles.add_close}>
              <button type="submit" className={styles.addbtn}>
                {form.id ? "Update" : "Add"}
              </button>
              <div
                className={styles.addbtn}
                onClick={() => {
                  setIsModalOpen(false);
                  setForm({ title: "", password: "", id: null });
                }}
              >
                X
              </div>
            </div>
          </form>
        </Modal>
      )}
      <h3 className={styles.heading}> See YOur Saved Passwords</h3>
      <div className={styles.passwordList}>
        {allPasswords.length === 0 ? (
          <p>No passwords found.</p>
        ) : (
          allPasswords.map((item) => (
            <PasswordCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
