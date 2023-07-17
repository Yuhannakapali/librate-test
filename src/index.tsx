import { render } from "react-dom";
import "./styles.css";

import App from "./App";
import { store } from './store'
import { Provider } from 'react-redux'

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
