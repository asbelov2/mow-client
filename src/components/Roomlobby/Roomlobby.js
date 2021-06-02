import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import UploadStory from './UploadStory/UploadStory';
import CreateRoom from './CreateRoom/CreateRoom';
import ConnectToRoom from './ConnectToRoom/ConnectToRoom';

import "./Roomlobby.css";

class Roomlobby extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const rooms = this.props.MainStore.rooms.map((room) => <option className="roomlobby-select__option" key={room.id} value={room.id} onDoubleClick={this.handleOpenModal}>{room.name}</option>);
    return (
      <div className="roomlobby-wrap">
        <div className="roomlobby">
        <button className="roomlobby-buttons__refresh" onClick={this.refreshRooms.bind(this)}>🔄</button>
          <span className="roomlobby__header">Rooms lobby</span>
          <select id="roomlobby-select" className="roomlobby-select" name="roomlobby-select" size="10">
            {rooms}
          </select>
          <div className="roomlobby-buttons">
            <UploadStory history={this.props.history}/>
            <CreateRoom history={this.props.history}/>
            <ConnectToRoom history={this.props.history}/>
          </div>
        </div>
      </div>
    );
  }

  async refreshRooms(e) {
    await fetch(this.props.MainStore.url + "api/room", {
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
        console.log(data);
        if(data.errors==null)
        {
          this.props.MainStore.rooms = data;
        }
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
  }

  componentDidMount = async () => {
    await fetch(this.props.MainStore.url + "api/room", {
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
        console.log(data);
        if(data.errors==null)
        {
          this.props.MainStore.rooms = data;
        }
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });

      await fetch(this.props.MainStore.url + "api/user/GetUserStories?userId="+this.props.MainStore.userid, {
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
        console.log(data);  
        if(data.errors==null)
        {
          this.props.MainStore.stories = data;
        }
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });

    this.props.MainStore.connection.on("onUserConnected", (newUser, users) => {
      this.props.MainStore.users = users;
      this.forceUpdate();
    })
    this.props.MainStore.connection.on("onUserGotRole", (userId, role, userRoles) => {
      this.props.MainStore.userRoles.set(userId, role);
      this.forceUpdate();
    })
  }
}

export default inject("MainStore")(observer(Roomlobby));