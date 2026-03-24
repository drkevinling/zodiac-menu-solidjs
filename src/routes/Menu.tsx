import { Component } from 'solid-js';
import CoffeeMenu from '../components/CoffeeMenu/CoffeeMenu';
import Container from '../components/shared/Container';

const Menu: Component = () => {
  return (
    <Container maxWidth="xl">
      <CoffeeMenu />
    </Container>
  );
};

export default Menu;
