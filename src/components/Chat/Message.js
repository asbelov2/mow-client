import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import User from '../User/User';

import './Message.css';

/*

*/

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return (
    <div className="message">
      <User userId={this.props.user.id} userName={this.props.user.nickname}/>:
      <p className={"message__text" + (this.props.color==="red"?(" message__text_red"):((this.props.color==="blue")?(" message__text_blue"):((this.props.color==="gold")?(" message__text_gold"):"")))}>&nbsp;{this.props.text}</p>
    </div>
    );
  }
}

export default inject("MainStore")(observer(Message));