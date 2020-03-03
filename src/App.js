import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import Report from './Report';
import NotFound from "./NotFound";

const App = () => (
    <BrowserRouter>
        <div className="container">
            <Switch>
                <Route exact path="/plan/:period/:component" component={Report} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default App;
