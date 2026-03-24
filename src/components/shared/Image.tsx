import { Component, createSignal } from 'solid-js';

interface ImageProps {
  src: string;
  alt: string;
  class?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const Image: Component<ImageProps> = (props) => {
  const [error, setError] = createSignal(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <div class={`relative w-full bg-gray-100 min-h-[200px] overflow-hidden ${props.class || ''}`}>
      {error() ? (
        <div class="flex flex-col items-center justify-center h-full min-h-[200px] bg-gray-50 text-gray-500" aria-hidden="true">
          <span class="text-[3rem] mb-2">☕</span>
          <span class="text-sm">Image unavailable</span>
        </div>
      ) : (
        <img
          src={props.src}
          alt={props.alt}
          loading={props.loading || 'lazy'}
          onError={handleError}
          class="w-full h-auto block"
        />
      )}
    </div>
  );
};

export default Image;
