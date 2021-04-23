import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NAV_PATH} from "./constant";
import {Match} from "./Match";
import {ErrorView} from "./components/ErrorView";
import {Home} from "./Home";


const App = ()  => {
    return (
        <Router>
            <Switch>
                <Route exact path = {NAV_PATH.HOME}>
                    <Home/>
                </Route>
                <Route path = {NAV_PATH.MATCH}>
                    <Match/>
                </Route>
                <Route>
                    <ErrorView/>
                </Route>
            </Switch>
        </Router>
    );
};

App.propTypes = {

};

export default App;