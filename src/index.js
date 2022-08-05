import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {store, persistor} from './store.js'
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PersistGate } from 'redux-persist/integration/react';

const theme = createTheme({
  palette: {
    text: {
      primary: "#616161",
    },
    primary: {
      main: 'rgb(217, 85, 80)'
    }

  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </DndProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
