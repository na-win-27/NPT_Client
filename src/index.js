import React from "react";
import { createRoot } from 'react-dom/client';

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store.js"

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

reportWebVitals();