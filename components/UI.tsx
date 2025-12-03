import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-full font-heading font-bold transition-all duration-500 flex items-center justify-center gap-2 tracking-wide uppercase";
  
  const sizeStyles = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base"
  };
  
  const variants = {
    primary: "bg-primary text-black hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    outline: "border border-primary text-primary hover:bg-primary hover:text-black",
    ghost: "text-gray-400 hover:text-primary hover:bg-white/5",
    white: "bg-white text-black hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(132,204,22,0.4)]"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label htmlFor={id} className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-primary transition-colors ml-1">{label}</label>
    <input
      id={id}
      className={`bg-transparent border-b border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:border-primary focus:outline-none focus:bg-white/5 transition-all ${className}`}
      {...props}
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Select: React.FC<SelectProps> = ({ label, id, children, className, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label htmlFor={id} className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-primary transition-colors ml-1">{label}</label>
    <div className="relative">
      <select
        id={id}
        className={`bg-transparent border-b border-gray-700 px-4 py-3 text-white focus:border-primary focus:outline-none focus:bg-white/5 transition-all appearance-none w-full ${className}`}
        {...props}
      >
        {children}
      </select>
       <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
        </svg>
      </div>
    </div>
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, className, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label htmlFor={id} className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-primary transition-colors ml-1">{label}</label>
    <textarea
      id={id}
      className={`bg-transparent border-b border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:border-primary focus:outline-none focus:bg-white/5 transition-all min-h-[120px] ${className}`}
      {...props}
    />
  </div>
);