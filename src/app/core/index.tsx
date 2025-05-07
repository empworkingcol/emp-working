import { BrowserRouter } from 'react-router-dom';

import Router from '../Router';
import Footer from "@components/atoms/Footer";
import { AuthProvider } from './AuthContext';
import MenuLayout from '../layouts/MenuLayout';

const Core = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <MenuLayout />
        <Router />
        <Footer />
      </BrowserRouter>
    </AuthProvider>  
  );
};

export default Core;
