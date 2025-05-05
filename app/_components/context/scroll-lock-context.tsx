'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ScrollLockContextType = {
  lockScroll: () => void;
  unlockScroll: () => void;
};

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(undefined);

export const ScrollLockProvider = ({ children }: { children: ReactNode }) => {
  const [lockCount, setLockCount] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    if (lockCount > 0) {
      html.classList.add('no-scroll');
    } else {
      html.classList.remove('no-scroll');
    }
  }, [lockCount]);

  const lockScroll = () => setLockCount((prev) => prev + 1);
  const unlockScroll = () => setLockCount((prev) => Math.max(0, prev - 1));

  return (
    <ScrollLockContext.Provider value={{ lockScroll, unlockScroll }}>
      {children}
    </ScrollLockContext.Provider>
  );
};

export const useScrollLock = () => {
  const context = useContext(ScrollLockContext);
  if (!context) throw new Error('useScrollLock must be used within ScrollLockProvider');
  return context;
};
