import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import "./Roomview.css";
import Setting from "./Setting/Setting";
import Chat from "../Chat/Chat";
import User from "../User/User";

/* 
  TODO: Сделать возможность изменить историю

*/

class Roomview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let settings;
    let witches;
    let humans;

    if(this.props.MainStore.room.host.id===this.props.MainStore.userid) {
      settings = 
            <div className="roomview-settings">
              <Setting onChange={this.changeName.bind(this)} name="Room name" type="text" placeholder="Room name.." value={this.props.MainStore.room.name}/>
              <Setting name="Password" type="text" placeholder="New password.."/>
              <input type="button" onClick={this.changePassword.bind(this)} value="Change"/>
              <Setting onChange={this.changeWitches.bind(this)} name="Witches" type="number" value={this.props.MainStore.room.witches}/>
              <Setting onChange={this.changeHumans.bind(this)} name="Humans" type="number" value={this.props.MainStore.room.humans}/>
              <Setting onChange={this.changeVoice.bind(this)} name="Voice" type="checkbox" checked={this.props.MainStore.room.withVoice}/>
              <Setting onChange={this.changeHumanTime.bind(this)} name="Human time" type="time" value={this.fromTimeSpanToJsTime(this.props.MainStore.room.humanTime)}/>
              <Setting onChange={this.changeWitchPrepTime.bind(this)} name="Witch preparation time" type="time" value={this.fromTimeSpanToJsTime(this.props.MainStore.room.witchPrepTime)}/>
              <Setting onChange={this.changeWitchAnswerTime.bind(this)} name="Witch answer time" type="time" value={this.fromTimeSpanToJsTime(this.props.MainStore.room.witchAnswerTime)}/>
              <Setting onChange={this.changeJudge.bind(this)} name="Judge" type="checkbox" checked={this.props.MainStore.room.judge}/>
            </div>
    }
    else {
      settings = 
            <div className="roomview-settings">
              <Setting disabled={true} name="Room name" type="text" placeholder="Room name.." value={this.props.MainStore.room.name}/>
              <Setting disabled={true} name="Password" type="text" placeholder="New password.."/>
              <Setting disabled={true} name="Witches" type="number" value={this.props.MainStore.room.witches}/>
              <Setting disabled={true} name="Humans" type="number" value={this.props.MainStore.room.humans}/>
              <Setting disabled={true} name="Voice" type="checkbox" checked={this.props.MainStore.room.withVoice}/>
              <Setting disabled={true} name="Human time" type="time" min="00:00:00" value={this.fromTimeSpanToJsTime(this.props.MainStore.room.humanTime)}/>
              <Setting disabled={true} name="Witch preparation time" type="time" min="00:00:00" value={this.fromTimeSpanToJsTime(this.props.MainStore.room.witchPrepTime)}/>
              <Setting disabled={true} name="Witch answer time" type="time"  min="00:00:00" value={this.fromTimeSpanToJsTime(this.props.MainStore.room.witchAnswerTime)}/>
              <Setting disabled={true} name="Judge" type="checkbox" checked={this.props.MainStore.room.judge}/>
            </div>
    }

    humans = this.props.MainStore.humanTeam.map((human) => <User className="chat-user" userName={human.nickname} key={human.id} value={human.id}/>);
    witches = this.props.MainStore.witchTeam.map((witch) => <User className="chat-user" userName={witch.nickname} key={witch.id} value={witch.id}/>);

    return (
      <div className="roomview-wrap">
        <div className="roomview">

          <div className="roomview-leftside">
            <Chat tab={0} mode="default"/>
          </div>
          <div className="roomview-center">
            <div className="roomview__witchside" onClick={this.joinWitchTeam.bind(this)}>
              {witches}
            </div>
            <div className="roomview__humanside" onClick={this.joinHumanTeam.bind(this)}>
              {humans}
            </div>
          </div>
          <div className="roomview-rightside">
            {settings}
            <input type="button" value="Start" onClick={this.startGame.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  joinWitchTeam() {
    this.props.MainStore.connection.invoke("JoinWitchTeam", this.props.MainStore.user.id);
    this.props.MainStore.role = 1;
  }

  joinHumanTeam() {
    this.props.MainStore.connection.invoke("JoinHumanTeam", this.props.MainStore.user.id);
    this.props.MainStore.role = 2;
  }

  async startGame(e) {
    e.preventDefault();
    let startForm = new FormData();
    startForm.append("roomId", this.props.MainStore.room.id);
    await fetch(this.props.MainStore.url + "api/room/StartGame", {
      method: "POST",
      body: startForm,
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.MainStore.token
      }
    })
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
  }

  changeName(e){
    this.props.MainStore.connection.invoke("ChangeRoomName", this.props.MainStore.room.id, this.props.MainStore.user.id, e.target.value);
  }

  changePassword(e){
    this.props.MainStore.connection.invoke("ChangeRoomPassword", this.props.MainStore.room.id, this.props.MainStore.user.id, e.target.value);
  }

  changeHumans(e){
    this.props.MainStore.connection.invoke("ChangeHumansAmount", this.props.MainStore.room.id, this.props.MainStore.user.id, parseInt(e.target.value));
  }

  changeWitches(e){
    this.props.MainStore.connection.invoke("ChangeWitchesAmount", this.props.MainStore.room.id, this.props.MainStore.user.id, parseInt(e.target.value));
  }

  changeVoice(e){
    this.props.MainStore.connection.invoke("ChangeVoiceAbility", this.props.MainStore.room.id, this.props.MainStore.user.id, e.target.checked);
  }

  changeJudge(e){
    this.props.MainStore.connection.invoke("ChangeJudgeAbility", this.props.MainStore.room.id, this.props.MainStore.user.id, e.target.checked);
  }

  changeHumanTime(e){
    this.props.MainStore.connection.invoke("ChangeHumanTime", this.props.MainStore.room.id, this.props.MainStore.user.id, parseInt(this.seconds(e.target.value)));
  }

  changeWitchPrepTime(e){
    this.props.MainStore.connection.invoke("ChangeWitchPrepTime", this.props.MainStore.room.id, this.props.MainStore.user.id, parseInt(this.seconds(e.target.value)));
  }

  changeWitchAnswerTime(e){
    this.props.MainStore.connection.invoke("ChangeWitchAnswerTime", this.props.MainStore.room.id, this.props.MainStore.user.id, parseInt(this.seconds(e.target.value)));
  }

  seconds(source){
    let a = source.split(':'); 
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
  }

  fromTimeSpanToJsTime(source){
    return new Intl.NumberFormat("ru-RU",{minimumIntegerDigits:2}).format(source.hours%24) + ":" + new Intl.NumberFormat("ru-RU",{minimumIntegerDigits:2}).format(source.minutes%60) + ":" + new Intl.NumberFormat("ru-RU",{minimumIntegerDigits:2}).format(source.seconds%60);
  }

  componentDidMount = async () => {
    this.props.MainStore.connection.on("onGameStarted", async () => {
      await fetch(this.props.MainStore.url + "api/game/GetRole/"+this.props.MainStore.userid, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.MainStore.token
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.errors==null)
      {
        this.props.MainStore.role = data;
      }
    })
    .catch((e) => {
      console.log("Error: " + e.message);
      console.log(e.response);
    });
      this.props.history.push('/gamewindow');
    })
    this.props.MainStore.connection.on("onUserConnected", (newUser, users) => {
      this.props.MainStore.users = users;
      this.forceUpdate();
    })
    this.props.MainStore.connection.on("onRoomChange", (newRoom) => {
      this.props.MainStore.room = newRoom;
      this.forceUpdate();
    })
    this.props.MainStore.connection.on("onTeamsUpdate", (witchTeam, humanTeam) => {
      this.props.MainStore.witchTeam = witchTeam;
      this.props.MainStore.humanTeam = humanTeam;
      this.forceUpdate();
    })

    await fetch(this.props.MainStore.url + "api/room/Witches", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.MainStore.token
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.errors==null)
      {
        this.props.MainStore.witchTeam = data;
      }
    })
    .catch((e) => {
      console.log("Error: " + e.message);
      console.log(e.response);
    });

    await fetch(this.props.MainStore.url + "api/room/Humans", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.MainStore.token
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.errors==null)
      {
        this.props.MainStore.humanTeam = data;
      }
    })
    .catch((e) => {
      console.log("Error: " + e.message);
      console.log(e.response);
    });

    await fetch(this.props.MainStore.url + "api/room/" + this.props.MainStore.selectedRoomId, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.props.MainStore.token
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.errors==null)
      {
        this.props.MainStore.room = data;
      }
    })
    .catch((e) => {
      console.log("Error: " + e.message);
      console.log(e.response);
    });
  }
}

export default inject("MainStore")(observer(Roomview));
