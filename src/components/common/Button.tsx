import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'darkOutline' | 'ghost' | 'danger' | 'success' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25 focus:ring-blue-500 border border-blue-500/30',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg focus:ring-slate-900 border border-slate-800',
    outline: 'border border-slate-300/90 bg-white/90 hover:bg-blue-50 text-slate-800 hover:text-blue-700 focus:ring-blue-500 hover:border-blue-400 shadow-xs',
    darkOutline: 'border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-white hover:text-white focus:ring-blue-500 hover:border-slate-600 shadow-md',
    ghost: 'hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus:ring-slate-400 font-semibold',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-lg hover:shadow-red-500/25 focus:ring-red-500',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg hover:shadow-emerald-500/25 focus:ring-emerald-500 border border-emerald-500/30',
    gradient: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20 border border-white/20',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 min-h-[38px] gap-1.5 rounded-lg',
    md: 'text-sm px-5 py-2.5 min-h-[44px] gap-2 rounded-xl',
    lg: 'text-base px-7 py-3.5 min-h-[52px] gap-2.5 rounded-2xl text-sm sm:text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
