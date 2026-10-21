import { Component } from 'solid-js';
import { CoffeeMenuItem } from '../../types/menu';
import Image from '../shared/Image';

interface CoffeeItemProps {
  item: CoffeeMenuItem;
  /** First card sits in the initial viewport; the rest are below the fold. */
  priority?: boolean;
  onClick?: () => void;
}

const CoffeeItem: Component<CoffeeItemProps> = (props) => {
  return (
    <div class="rounded-xl border-1 border-amber-900 shadow-2xl overflow-hidden">
      <Image
        src={props.item.image}
        alt={props.item.alt}
        width={props.item.imageWidth}
        height={props.item.imageHeight}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding={props.priority ? 'auto' : 'async'}
        fetchpriority={props.priority ? 'high' : 'low'}
        placeholder="Loading coffee image..."
        class="w-full"
      />
    </div>
  );
};

export default CoffeeItem;
