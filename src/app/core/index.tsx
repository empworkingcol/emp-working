import { BrowserRouter } from 'react-router-dom';

import Router from '../Router';
import LoggedOutLayout from '../layouts/LoggedOutLayout';

const Core = () => {

  return (
    <BrowserRouter>
      <LoggedOutLayout />
      <Router />
    </BrowserRouter>
  );
};

export default Core;
