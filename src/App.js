import './App.css';
import { NavBar, Container } from './components';
import { Component } from 'react';
import {observer, inject} from "mobx-react";

class App extends Component {
  render() {
    return(
    <div className="App">
      <header className="App-header">
        <NavBar isHidden={this.props.MainStore.authorized}/>
      </header>
      <Container/>
    </div>
    );
  }
}
export default inject("MainStore")(observer(App));
