import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Page from './components/Page';
import { ThemeProviderWrapper } from './views/AppStore/components/ThemeContext';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

const App = () => {
  if (typeof window !== 'undefined') {
    const resizeObserverErr = () => {
      const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
      const resizeObserverErrIframe = document.getElementById('webpack-dev-server-client-overlay');
      if (resizeObserverErrDiv) resizeObserverErrDiv.style.display = 'none';
      if (resizeObserverErrIframe) resizeObserverErrIframe.style.display = 'none';
    };

    window.addEventListener('error', (event) => {
      if (event.message === 'ResizeObserver loop limit exceeded') {
        event.stopImmediatePropagation();
        resizeObserverErr();
      }
    });
  }

  return (
    <ThemeProviderWrapper>
      <Page>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ToastContainer position="top-center" />
      </Page>
    </ThemeProviderWrapper>
  );
};

export default App;
