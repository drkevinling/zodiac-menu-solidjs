import { Component } from 'solid-js';
import { Router } from '@solidjs/router';
import routes from './routes';

const App: Component = () => {
  console.log('App component rendering');
  return (
    <div class="min-h-screen bg-gray-50">
      <Router>
        {routes}
      </Router>
    </div>
  );
};

export default App;
