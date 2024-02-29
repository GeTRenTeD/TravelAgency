import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import App from "./App";
import store from './store/store';
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter > 
      <Provider store = {store}>
      <App />
      </Provider>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
