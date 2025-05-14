'use client';

import { Triangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 900);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    button.classList.add('ripple');


    setTimeout(() => {
      button.classList.remove('ripple');
    }, 500);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`scroll-to-top ${visible ? 'visible' : ''}`}>
      <button onClick={scrollToTop} aria-label="Повернутись нагору">
        <Triangle strokeWidth={3} />
      </button>
      <span>Повернутись нагору</span>
    </div>
  );
};

export default ScrollToTopButton;
