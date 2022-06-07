import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from './store.js'
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(217, 85, 80)'
    }

  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </DndProvider>
    </Provider>
  </React.StrictMode>
);
