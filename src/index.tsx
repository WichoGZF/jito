import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { store } from './store'
import { Provider } from 'react-redux';
import './index.css'
import { CookiesProvider } from 'react-cookie';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
//      