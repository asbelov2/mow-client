import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, Registration, Login, NotFound, Roomlobby, Roomview, Gamewindow} from '../';
import './Container.css';

class Container extends Component {
  render() {
    return (
      <div className="container" id="container">
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/registration' component={Registration}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/roomlobby' component={Roomlobby}/>
            <Route exact path='/roomview' component={Roomview}/>
            <Route exact path='/gamewindow' component={Gamewindow}/>
            <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default Container;