import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import reportWebVitals from './reportWebVitals';
import App from './Componentes/App/App';
import MediaContextProvider from './Context/MediaStore';
import 'react-toastify/dist/ReactToastify.css';
import FetchProducttProvider from './Context/FetchProduct';
import FetchWishlistProvider from './Context/WishList';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MediaContextProvider>
      <FetchWishlistProvider>
      <FetchProducttProvider>
      <App/>
      </FetchProducttProvider>
      </FetchWishlistProvider>
      
    </MediaContextProvider>
  </React.StrictMode>
);

reportWebVitals();
