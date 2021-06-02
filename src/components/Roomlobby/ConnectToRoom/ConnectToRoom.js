import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ReactModal from 'react-modal';
import "./ConnectToRoom.css";

class ConnectToRoom extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    if((document.getElementById("roomlobby-select").options.length>0) && 
    (document.getElementById("roomlobby-select").value != null)){
      this.setState({ showModal: true });
      this.props.MainStore.selectedRoomId = document.getElementById("roomlobby-select").value
    }
    else{
      console.log("room isn't selected");
    }
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    
    return (
      <div>
        <button className="roomlobby-buttons__button" onClick={this.handleOpenModal}>Enter room</button>
        <ReactModal 
          className="roomlobby-modal-enter-room"
          ariaHideApp={false}
          isOpen={this.state.showModal}
          contentLabel="Enter room"
        >
          <div className="roomlobby-modal-enter-room-form__wrap">
            <form className="roomlobby-modal-enter-room-form" name="storyform" method="POST" onSubmit={this.connectToRoom.bind(this)}>
              <span>Enter room password</span>
              <span>Room name: {this.props.MainStore.selectedRoomId}</span>
              <input
                      id="room-password"
                      className="password"
                      type="password"
                      name="password"
                      required
                    />
              <div className="roomlobby-buttons">
                <input className="submit" type="submit" value="Enter"/>
                <button onClick={this.handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    );
  }

  async connectToRoom (e) {
    e.preventDefault();
    let connectForm = new FormData();
    connectForm.append("roomId", this.props.MainStore.selectedRoomId);
    connectForm.append("userId", this.props.MainStore.userid);
    connectForm.append("password", document.getElementById("room-password").value);
    await fetch(this.props.MainStore.url + "api/room/Connect", {
      method: "POST",
      body: connectForm,
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
        console.log(data);
        if(data.errors==null)
        {
          this.props.MainStore.room = data;
        }
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });

      this.setState({ showModal: false });
      this.props.history.push('/roomview');
  }
}

export default inject("MainStore")(observer(ConnectToRoom));
