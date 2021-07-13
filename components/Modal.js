import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from '@/styles/modal.module.css'
import { FaTimes } from 'react-icons/fa'

function Modal({ show, onClose, title, children }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const ModalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <h1>{title}</h1>}
          <a href='#' onClick={() => onClose()}>
            <FaTimes />
          </a>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(ModalContent, document.getElementById('modal'))
  } else return null
}

export default Modal
