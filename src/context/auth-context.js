import React, { createContext, useState, useEffect } from "react";

const ModalContext = createContext({
  isModalOpen: false,
  setIsModalOpen: () => {},
  submitData: async () => {},
  deletePassword: async () => {},
  editPassword: async () => {},
  allPasswords: [],
  fetchAllPasswords: async () => {},
});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPasswords, setAllPasswords] = useState([]);

  const fetchAllPasswords = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/passwords");
      const data = await res.json();
      setAllPasswords(data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    fetchAllPasswords();
  }, []);

  const submitData = async (userData) => {
    if (!userData.title.trim() || !userData.password.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/api/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const savedData = await res.json();
      setAllPasswords((prev) => [savedData, ...prev]);
    } catch (err) {
      console.error("Error submitting:", err.message);
    }
  };

  const deletePassword = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/passwords/${id}`, {
        method: "DELETE",
      });

      setAllPasswords((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting password:", err.message);
    }
  };

  const editPassword = async (id, updatedData) => {
    if (!updatedData.title.trim() || !updatedData.password.trim()) return;

    try {
      const res = await fetch(`http://localhost:8080/api/passwords/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const updated = await res.json();
      setAllPasswords((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch (err) {
      console.error("Error editing password:", err.message);
    }
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        submitData,
        deletePassword,
        editPassword,
        allPasswords,
        fetchAllPasswords,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
