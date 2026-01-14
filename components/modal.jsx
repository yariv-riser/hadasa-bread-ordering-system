'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import classes from './modal.module.css'

export default function Modal({ title, children, onClose }) {

  const dialogRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className={classes["modal-overlay"]} onClick={onClose}>
      <div
        className={classes.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={classes["modal-header"]}>
          <button
            type="button"
            className={classes["modal-close"]}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={25} strokeWidth={3} />
          </button>

        </header>

        <div className={classes["modal-body"]}>
          {children}
        </div>
      </div>
    </div>
  );
}