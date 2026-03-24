import { Route, Navigate } from '@solidjs/router';
import Menu from './Menu';

const routes = (
  <>
    <Route path="/" component={() => <Navigate href="/menu" />} />
    <Route path="/menu" component={Menu} />
  </>
);

export default routes;
