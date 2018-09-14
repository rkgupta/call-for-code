import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Welcome from '../components/Welcome';
import HelpMap from '../components/HelpMap';
import HelpForm from '../components/HelpForm';
import ErrorPage from '../components/ErrorPage';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Welcome} exact={true} />
                <Route path="/helpmap" component={HelpMap} />
                <Route path="/helpform" component={HelpForm} />
                <Route path="/error" component={ErrorPage} />
            </Switch>
        </div>
    </BrowserRouter>
);



export default AppRouter;