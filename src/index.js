import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
