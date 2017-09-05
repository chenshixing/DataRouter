/**
 * 入口文件
 */
import React from "react";
import info from "../../config/info";
import ReactDom from "react-dom";
import {Router, useRouterHistory} from "react-router";
import {ConnectedRouter, syncHistoryWithStore} from "react-router-redux";
import routes from "../routes";
import {Provider} from "react-redux";
import {createHistory} from "history";
import configureStore from "../store/configureStore";
import "ASSETS/less/main.less";
const store = configureStore;
const createAppHistory = useRouterHistory(createHistory);
const appHistory = createAppHistory({
    basename: info.base.name
});
const history = syncHistoryWithStore(appHistory, store);
//const history = syncHistoryWithStore(browserHistory, store);
ReactDom.render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>
    , document.getElementById('root'))
