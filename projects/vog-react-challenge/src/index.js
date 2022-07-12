import React from "react";
import ReactDOM from "react-dom";
import store from "./states/store";
import { Provider } from "react-redux";
import HomePage from "./pages/home.page";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Web browser application
 */
ReactDOM.render(
    <Provider store={store()}>
        <HomePage />
    </Provider>,
    document.getElementById("root")
);
