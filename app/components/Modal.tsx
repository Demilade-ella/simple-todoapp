import { MdCancel } from "react-icons/md";
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if(!isOpen) return null
  return (
    <div className={styles.modal}>
      <div className={styles.modalBox}>
        <label
          htmlFor=""
          onClick={onClose}
          className={styles.cancelBtn}
        >
          <MdCancel size={20} />
        </label>
        {children}
      </div>
    </div>
  );
}

export default Modal;