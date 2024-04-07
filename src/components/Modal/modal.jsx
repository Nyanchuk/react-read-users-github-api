import styles from "./modal.module.css";
import { useEffect, useRef } from "react";

export const Modal = ({ closeModal, errorText }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className={styles.modal}>
      <div className={styles.main_err_plase}>
        <div className={styles.modalContent} ref={modalRef}>
          <div className={styles.main_err_plase}>
            <div className={styles.close}>
              <span onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className={styles.errorText}>{errorText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
