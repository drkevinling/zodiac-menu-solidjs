import { Component } from 'solid-js';

interface ContainerProps {
  children: any;
  class?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
}

const Container: Component<ContainerProps> = (props) => {
  const getMaxWidthClass = (maxWidth?: string) => {
    const maxWidths = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full',
    };
    return maxWidth ? maxWidths[maxWidth as keyof typeof maxWidths] : '';
  };

  return (
    <div class={`w-full mx-auto px-4 ${getMaxWidthClass(props.maxWidth)} ${props.centered ? 'text-center' : ''} ${props.class || ''}`}>
      {props.children}
    </div>
  );
};

export default Container;
