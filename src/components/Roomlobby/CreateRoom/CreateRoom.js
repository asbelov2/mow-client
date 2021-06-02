import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ReactModal from 'react-modal';
import "./CreateRoom.css";

class CreateRoom extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    const stories = this.props.MainStore.stories.map((story) => <option className="" key={story.id} value={story.id}>{story.name}</option>);
    return (
      <div>
        <button className="roomlobby-buttons__button" onClick={this.handleOpenModal }>Create room</button>
        <ReactModal 
          ariaHideApp={false}
          isOpen={this.state.showModal}
          contentLabel="Create room"
        >
          <form className="room-creation-form" name="roomform" method="POST" onSubmit={this.sendRoomForm.bind(this)}>
            <input
                  id="room-creation__roomname"
                  className="text"
                  type="text"
                  name="name"
                  placeholder="Room's name"
                  required
                />
            <input
                  id="room-creation__password"
                  className="text"
                  type="password"
                  name="password"
                  placeholder="Room's password"
                  required
                />
            <select className="room-creation__story" id="room-creation__story" name="story" size="5" name="story" required>
              {stories}
            </select>
            <input
                  id="room-creation__witches"
                  className="number"
                  type="number"
                  name="witches"
                  placeholder="1"
                  required
                />
            <input
                  id="room-creation__humans"
                  className="number"
                  type="number"
                  name="humans"
                  placeholder="3"
                  required
                />
            <input
                  id="room-creation__voice"
                  className="checkbox"
                  type="checkbox"
                  name="voice"
                />
            <input
                  id="room-creation__losetime"
                  className="time"
                  type="time"
                  name="losetime"
                  step="1"
                  min="00:00:00"
                  required
                />
            <input
                  id="room-creation__preptime"
                  className="time"
                  type="time"
                  name="preptime"
                  step="1"
                  min="00:00:00"
                  required
                />
            <input
                  id="room-creation__answertime"
                  className="time"
                  type="time"
                  name="answertime"
                  step="1"
                  min="00:00:00"
                  required
                />
            <input
                  id="room-creation__judge"
                  className="checkbox"
                  type="checkbox"
                  name="judge"
                />
            <input type="submit" value="Create"/>
          </form>
          <button onClick={this.handleCloseModal}>Cancel</button>
        </ReactModal>
      </div>
    );
  }

  async sendRoomForm (e) {
    e.preventDefault();
    let roomForm = new FormData();
    roomForm.append("hostId",this.props.MainStore.userid);
    roomForm.append("name",document.getElementById("room-creation__roomname").value);
    roomForm.append("password",document.getElementById("room-creation__password").value);
    roomForm.append("witches",document.getElementById("room-creation__witches").value);
    roomForm.append("humans",document.getElementById("room-creation__humans").value);
    roomForm.append("withVoice",document.getElementById("room-creation__voice").checked);
    roomForm.append("storyId",document.getElementById("room-creation__story").options[document.getElementById("room-creation__story").selectedIndex].value);
    roomForm.append("humanTime",document.getElementById("room-creation__losetime").value);
    roomForm.append("witchPrepTime",document.getElementById("room-creation__preptime").value);
    roomForm.append("witchAnswerTime",document.getElementById("room-creation__answertime").value);
    roomForm.append("judge",document.getElementById("room-creation__judge").checked);
    await fetch(this.props.MainStore.url + "api/room", {
      method: "POST",
      body: roomForm,
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

    await fetch(this.props.MainStore.url + "api/room/GetByHostId/" + this.props.MainStore.userid, {
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
            this.props.MainStore.selectedRoomId = data.id;
          }
        })
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
        });

    let connectForm = new FormData();
    connectForm.append("roomId", this.props.MainStore.selectedRoomId);
    connectForm.append("userId", this.props.MainStore.userid);
    connectForm.append("password", document.getElementById("room-creation__password").value);

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
      this.setState({ showModal: false });
      this.props.history.push('/roomview');
  }
}

export default inject("MainStore")(observer(CreateRoom));
