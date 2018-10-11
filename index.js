import React, {Component} from "react";
import {render} from "react-dom";

import store from "./store";
import { Provider } from "react-redux";

import FilterWrapper from "./components/FilterWrapper";
import ProductList from "./components/ProductList";
const rootElement = document.querySelector('#fp_root');

class FpApp extends Component
{
    render()
    {
        return (
            <Provider store={store}>
                <div className="FpApp">
                    <div className="row">
                        <div className="col-md-3">
                            <FilterWrapper />
                        </div>
                        <div className="col-md-9">
                            <ProductList />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

if (rootElement)
{
    render(<FpApp />, rootElement);
}