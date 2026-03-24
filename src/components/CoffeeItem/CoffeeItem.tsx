import { Component } from 'solid-js';
import { CoffeeMenuItem } from '../../types/menu';
import Image from '../shared/Image';

interface CoffeeItemProps {
  item: CoffeeMenuItem;
  onClick?: () => void;
}

const CoffeeItem: Component<CoffeeItemProps> = (props) => {
  return (
    <div class="rounded-xl border-1 border-amber-900 shadow-2xl overflow-hidden">
      <Image
        src={props.item.image}
        alt={props.item.alt}
        loading="lazy"
        placeholder="Loading coffee image..."
        class="w-full"
      />
    </div>
  );
};

export default CoffeeItem;
