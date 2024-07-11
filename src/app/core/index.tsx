import { BrowserRouter } from 'react-router-dom';

import Router from '../Router';
import Footer from "@components/atoms/Footer";
import { AuthProvider } from './AuthContext';

const Core = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
        <Footer />
      </BrowserRouter>
    </AuthProvider>  
  );
};

export default Core;
