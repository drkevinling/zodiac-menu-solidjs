import { Component, createSignal } from 'solid-js';
import { assetUrl } from '../../utils/assetUrl';

interface ImageProps {
  src: string;
  alt: string;
  class?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
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
          src={assetUrl(props.src)}
          alt={props.alt}
          width={props.width}
          height={props.height}
          loading={props.loading || 'lazy'}
          decoding={props.decoding ?? ((props.loading || 'lazy') === 'eager' ? 'auto' : 'async')}
          fetchpriority={props.fetchpriority}
          onError={handleError}
          class="w-full h-auto block"
        />
      )}
    </div>
  );
};

export default Image;
