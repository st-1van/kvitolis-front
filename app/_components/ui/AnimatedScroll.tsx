'use client';
import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  cloneElement,
  HTMLAttributes,
} from 'react';

interface Props {
  children: ReactElement<HTMLAttributes<HTMLElement>>;
  animationClass?: string;
  once?: boolean;
  threshold?: number;
}

const AnimatedOnScroll = ({
  children,
  animationClass = '',
  once = true,
  threshold = 0.3,
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(element);
        } else {
          if (!once) setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [once, threshold]);

  const isDOMElement = typeof children.type === 'string';

  return cloneElement(children, {
    ...(isDOMElement ? { ref } : {}),
    className: `${children.props.className || ''} ${animationClass} ${
      visible ? 'animate' : ''
    }`.trim(),
  });
};

export default AnimatedOnScroll;
