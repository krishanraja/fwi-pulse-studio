import { motion } from 'framer-motion';
import fractionlIcon from '@/assets/fractionl-icon.png';

// Preload the icon immediately
const preloadImage = new Image();
preloadImage.src = fractionlIcon;

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

const LoadingSpinner = ({ size = 'md', showLogo = true }: LoadingSpinnerProps) => {
  const sizes = {
    sm: { container: 'w-12 h-12', logo: 'w-6 h-6', strokeWidth: 3 },
    md: { container: 'w-20 h-20', logo: 'w-10 h-10', strokeWidth: 4 },
    lg: { container: 'w-32 h-32', logo: 'w-16 h-16', strokeWidth: 5 },
  };

  const { container, logo, strokeWidth } = sizes[size];

  return (
    <div className={`relative ${container} flex items-center justify-center`}>
      {/* Spinning gradient ring */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#spinnerGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="200 80"
        />
      </motion.svg>

      {/* Logo in center - eager loading for instant display */}
      {showLogo && (
        <motion.img
          src={fractionlIcon}
          alt="Fractionl"
          className={`${logo} object-contain`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

export default LoadingSpinner;
