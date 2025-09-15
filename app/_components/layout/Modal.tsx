'use client'
import { useEffect } from "react";
import { useScrollLock } from "../context/scroll-lock-context";
import { X } from "lucide-react";

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
            <button className="close-modal" onClick={onClose}>
              <X className="icon" size={24} />
            </button>
            {children}
          </div>
        </div>
      );
    }