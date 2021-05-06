import React from 'react';
import { Home } from './components/home/Home';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { VisitorCheck } from './components/visitorcheck/VisitorCheck';

library.add(fab, fas);

function App() {
  return (
    <>
      <Home />
      <VisitorCheck />
    </>
  );
}

export default App;
