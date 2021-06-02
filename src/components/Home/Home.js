import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default inject("MainStore")(observer(Home));