import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./User.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user">
        <div className="user__avatar"></div>
        <span className={
          this.props.MainStore.userRoles.get(this.props.userId)===3?"user__nickname user__nickname_judge":
                        this.props.MainStore.userRoles.get(this.props.userId)===2?"user__nickname user__nickname_human":
                        this.props.MainStore.userRoles.get(this.props.userId)===1?"user__nickname user__nickname_witch": "user__nickname user__nickname_spectator"
      }>{this.props.userName}</span>
      </div>
    );
  }
}

export default inject("MainStore")(observer(User));
