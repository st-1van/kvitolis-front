'use client'
import { useEffect } from "react";
import { useScrollLock } from "../context/scroll-lock-context";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };

  export function Modal({ open, onClose, children }: ModalProps) {
    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        if (open) lockScroll();
        else unlockScroll();
      
        return () => unlockScroll();
    }, [open, lockScroll, unlockScroll]);
  
    if (!open) return null;

    return (
        <div className="modal">
          <div className="overlay" onClick={onClose}></div>
          <div className="modal-content">
            {children}
            <button className="close-modal" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      );
    }