import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg sm:rounded-xl font-medium sm:font-semibold transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group transform hover:scale-105 active:scale-95';
    
    const variants = {
      primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 focus:ring-cyan-500 shadow-lg sm:shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 border border-cyan-400/40',
      secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-400 hover:to-pink-500 focus:ring-purple-500 shadow-lg sm:shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 border border-purple-400/40',
      outline: 'border border-cyan-400/70 sm:border-2 text-cyan-400 hover:border-cyan-300 hover:bg-cyan-400/15 hover:text-cyan-300 focus:ring-cyan-500 backdrop-blur-md bg-cyan-400/5 shadow-md sm:shadow-lg shadow-cyan-400/20',
      ghost: 'text-cyan-400 hover:bg-cyan-400/15 hover:text-cyan-300 focus:ring-cyan-500 backdrop-blur-sm',
    };

    const sizes = {
      sm: 'px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm',
      md: 'px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base',
      lg: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base lg:text-lg',
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        
        <span className="relative z-10 flex items-center">
          {isLoading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {children}
        </span>
        
        {/* Corner accents */}
        <div className="absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t border-l border-white/40 rounded-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0.5 sm:bottom-1 right-0.5 sm:right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 border-b border-r border-white/40 rounded-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;