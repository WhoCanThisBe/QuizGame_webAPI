import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NAV_PATH} from "./constant";
import {Match} from "./Match";


const App = ()  => {
    return (
        <Router>
            <Switch>
                <Route exact path = {NAV_PATH.HOME}>
                    <Match/>
                </Route>
            </Switch>
        </Router>
    );
};

App.propTypes = {

};

export default App;