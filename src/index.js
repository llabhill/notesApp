import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
     <div className="min-h-screen w-screen overflow-hidden">
        <App />
        <Toaster position="top-right"/>
      </div>
    </Provider>
  </React.StrictMode>
);

