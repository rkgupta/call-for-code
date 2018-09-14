import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Welcome from '../components/Welcome';
import HelpMap from '../components/HelpMap';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Welcome} exact={true} />
                <Route path="/helpmap" component={HelpMap} />
            </Switch>
        </div>
    </BrowserRouter>
);



export default AppRouter;