import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import User from '../User/User';

import './Chat.css';
import Message from './Message';

/*
  Channels:
    0 - Main chat
    1 - Witch chat
    2 - Human chat
*/

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:"",
      messages:[],
      witchMessages:[],
      humanMessages:[]
    };
  }

    handleInputChanged = (e) => {
    this.setState(prevState => ({msg:e.target.value}));
    }

    sendMsg = (color, channel) => {
      this.props.MainStore.connection.invoke("Send", this.state.msg, this.props.MainStore.room.id, this.props.MainStore.user, color, parseInt(channel));
    }

  render() {
    let messages;
    let usersArea;
    let textArea;
    let additionalButton = null;
    if(this.props.withoutUsers===true) {
      usersArea = <div/>;
    }
    else {
      const users = this.props.MainStore.room.users.map((user) => <User className="chat-user" userName={user.nickname} key={user.id} value={user.id}/>);
      usersArea = 
      <div className="chat-users">
        {users}
      </div>;
    }
    if(this.props.mode==="game_human"){
      additionalButton = <input className="chat__send_button" type="button" value="Send as blue" onClick={() => this.sendMsg("blue", this.props.tab)}/>
    }
    if(this.props.mode==="game_witch"){
      additionalButton = <input className="chat__send_button" type="button" value="Send as red" onClick={() => this.sendMsg("red", this.props.tab)}/>
    }
    if(this.props.mode==="game_judge"){
      additionalButton = <input className="chat__send_button" type="button" value="Send as judge" onClick={() => this.sendMsg("gold", this.props.tab)}/>
    }
    if(this.props.multilines===true) {
      textArea = 
      <div className="chat__send">
        <textarea id="chat__send_input" className="chat__send_input" rows="3" disabled={this.props.mode==="game_spec"} onChange={this.handleInputChanged}/>
        {additionalButton}
        <input className="chat__send_button" type="button" value="Send" disabled={this.props.mode==="game_spec"} onClick={() => this.sendMsg("default", this.props.tab)}/>
      </div>
    }
    else {
      textArea =
      <div className="chat__send">
        <input id="chat__send_input" className="chat__send_input" type="text" disabled={this.props.mode==="game_spec"} onChange={this.handleInputChanged}/>
        <input className="chat__send_button" type="button" value="Send" disabled={this.props.mode==="game_spec"} onClick={() => this.sendMsg("default", this.props.tab)}/>
      </div>
    }
    if(this.props.tab===0) {
      messages = this.state.messages.map((message,index) => <Message user={message.user} text={message.text} color={message.color} key={index} value={message.text}/>);
    }
    if(this.props.tab===1) {
      messages = this.state.witchMessages.map((message,index) => <Message user={message.user} text={message.text} color={message.color} key={index} value={message.text}/>);
    }
    if(this.props.tab===2) {
      messages = this.state.humanMessages.map((message,index) => <Message user={message.user} text={message.text} color={message.color} key={index} value={message.text}/>);
    }
    return (
    <div className="chat">
      <div className="chat-chatarea">
        {usersArea}
        <div id="chat__textarea" className="chat__textarea">
          {messages}
        </div>
      </div>
      {textArea}
    </div>
  )
  }

  componentDidMount = async () => {
    this.props.MainStore.connection.on("Receive", (message, user, color) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, {user:user, text:message, color:color}]
      }))
    });
    this.props.MainStore.connection.on("ReceiveWitch", (message, user, color) => {
      this.setState(prevState => ({
        witchMessages: [...prevState.witchMessages, {user:user, text:message, color:color}]
      }))
    });
    this.props.MainStore.connection.on("ReceiveHuman", (message, user, color) => {
      this.setState(prevState => ({
        humanMessages: [...prevState.humanMessages, {user:user, text:message, color:color}]
      }))
    });
  }
}

export default inject("MainStore")(observer(Chat));