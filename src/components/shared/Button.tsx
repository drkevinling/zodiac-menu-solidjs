import { Component } from 'solid-js';

interface ButtonProps {
  children: any;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  class?: string;
}

const Button: Component<ButtonProps> = (props) => {
  const getVariantClasses = (variant: string) => {
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600',
      outline: 'bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-500 hover:text-white',
    };
    return variants[variant as keyof typeof variants] || variants.primary;
  };

  return (
    <button
      type={props.type || 'button'}
      class={`inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:ring ${getVariantClasses(props.variant || 'primary')} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${props.class || ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
