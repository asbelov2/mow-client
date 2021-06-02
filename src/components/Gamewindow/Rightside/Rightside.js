import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./Rightside.css";

/*
  Roles:
    0 - Spec
    1 - Witch
    2 - Human
    3 - Judge
*/

class Rightside extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    
  }
}

export default inject("MainStore")(observer(Rightside));
