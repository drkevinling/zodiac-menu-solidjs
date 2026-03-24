import { Component } from 'solid-js';

interface CardProps {
  children: any;
  class?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: Component<CardProps> = (props) => {
  return (
    <article
      class={`bg-white rounded-xl overflow-hidden transition-all duration-300 ${props.interactive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-lg focus-visible:ring' : 'shadow-md'} ${props.class || ''}`}
      onClick={props.onClick}
      role={props.interactive ? 'button' : undefined}
      tabIndex={props.interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (props.interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          props.onClick?.();
        }
      }}
    >
      {props.children}
    </article>
  );
};

export default Card;
