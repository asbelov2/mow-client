import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Chat from "../Chat/Chat";
import Storywindow from "./Storywindow/Storywindow";
import Rightside from "./Rightside/Rightside";
import "./Gamewindow.css";

class Gamewindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatTab:0
    };
  }

  handleChangeToMainChat = () => {
    this.setState({ chatTab: 0 });
  }
  
  handleChangeToWitchChat = () => {
    this.setState({ chatTab: 1 });
  }

  handleChangeToHumanChat = () => {
    this.setState({ chatTab: 2 });
  }

  render() {
    let leftside;
    //WITCH
    if(this.props.MainStore.role===1) {
      leftside = 
      <div className="gamewindow-leftside">
        <div className="chat-tabs">
          <input type="button" className="chat-tabs__tab" value="Main chat" onClick={this.handleChangeToMainChat}/>
          <input type="button" className="chat-tabs__tab" value="Witch chat" onClick={this.handleChangeToWitchChat}/>
        </div>
        <Chat tab={this.state.chatTab} withoutUsers={true} mode="game_witch" multilines={true}/>
      </div>
    }
    //HUMAN
    else if(this.props.MainStore.role===2) {
      leftside = 
      <div className="gamewindow-leftside">
        <div className="chat-tabs">
          <input type="button" className="chat-tabs__tab" value="Main chat" onClick={this.handleChangeToMainChat}/>
          <input type="button" className="chat-tabs__tab" value="Human chat" onClick={this.handleChangeToHumanChat}/>
        </div>
        <Chat tab={this.state.chatTab} withoutUsers={true} mode="game_human" multilines={true}/>
      </div>
    }
    //JUDGE
    else if(this.props.MainStore.role===3) {
      leftside = 
      <div className="gamewindow-leftside">
        <div className="chat-tabs">
          <input type="button" className="chat-tabs__tab" value="Main chat" onClick={this.handleChangeToMainChat}/>
          <input type="button" className="chat-tabs__tab" value="Human chat" onClick={this.handleChangeToHumanChat}/>
          <input type="button" className="chat-tabs__tab" value="Witch chat" onClick={this.handleChangeToWitchChat}/>
        </div>
        <Chat tab={this.state.chatTab} withoutUsers={true} mode="game_judge" multilines={true}/>
      </div>
    }
    //SPECTATOR
    else {
      leftside = 
      <div className="gamewindow-leftside">
        <div className="chat-tabs">
          <input type="button" className="chat-tabs__tab" value="Main chat" onClick={this.handleChangeToMainChat}/>
          <input type="button" className="chat-tabs__tab" value="Human chat" onClick={this.handleChangeToHumanChat}/>
          <input type="button" className="chat-tabs__tab" value="Witch chat" onClick={this.handleChangeToWitchChat}/>
        </div>
        <Chat tab={this.state.chatTab} withoutUsers={true} mode="game_spec" multilines={true}/>
      </div>
    }

    return (

      <div className="gamewindow">
        {leftside}
        <div className="gamewindow-center">
          <Storywindow role={this.props.MainStore.role}/>
        </div>
        <div className="gamewindow-rightside">
          <Rightside>
        </div>
      </div>
    );
  }

  async sendE(e) {
    e.preventDefault();
  };
}

export default inject("MainStore")(observer(Gamewindow));
