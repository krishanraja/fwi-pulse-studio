// Framer Motion animation variants and utilities

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export const slideInFromRight = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export const slideInFromBottom = {
  hidden: { y: "100%" },
  show: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export const cardHover = {
  rest: { scale: 1, boxShadow: "0 10px 30px -10px hsl(250 60% 48% / 0.15)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 40px -15px hsl(250 60% 48% / 0.25)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

// Check for reduced motion preference
export const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Disable animations if reduced motion is preferred
export const getAnimationProps = (variants: any) => {
  if (prefersReducedMotion) {
    return {};
  }
  return {
    variants,
    initial: "hidden",
    animate: "show",
  };
};
