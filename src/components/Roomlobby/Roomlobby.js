import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import "./Roomlobby.css";

class Roomlobby extends Component {
  constructor () {
    super();
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false
    };

    this.handleOpenModal1 = this.handleOpenModal1.bind(this);
    this.handleCloseModal1 = this.handleCloseModal1.bind(this);
    this.handleOpenModal2 = this.handleOpenModal2.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);
    this.handleOpenModal3 = this.handleOpenModal3.bind(this);
    this.handleCloseModal3 = this.handleCloseModal3.bind(this);
  }

  handleOpenModal1 () {
    this.setState({ showModal1: true });
  }
  
  handleCloseModal1 () {
    this.setState({ showModal1: false });
  }

  handleOpenModal2 () {
    this.setState({ showModal2: true });
  }
  
  handleCloseModal2 () {
    this.setState({ showModal2: false });
  }

  handleOpenModal3 () {
    if((document.getElementById("roomlobby-select").options.length>0) && 
    (document.getElementById("roomlobby-select").value != null)){
      this.setState({ showModal3: true });
      this.props.MainStore.selectedRoom = document.getElementById("roomlobby-select").value
    }
    else{
      console.log("room isn't selected");
    }
  }
  
  handleCloseModal3 () {
    this.setState({ showModal3: false });
  }

  render() {
    const stories = this.props.MainStore.stories.map((story) => <option className="" key={story.id} value={story.id}>{story.name}</option>);
    const rooms = this.props.MainStore.rooms.map((room) => <option className="roomlobby-select__option" key={room.id} value={room.id} onDoubleClick={this.handleOpenModal3}>{room.name}</option>);
    return (
      <div className="roomlobby-wrap">
        <div className="roomlobby">
        <button className="roomlobby-buttons__refresh" onClick={this.refreshRooms.bind(this)}>🔄</button>
          <span className="roomlobby__header">Rooms lobby</span>
          <select id="roomlobby-select" className="roomlobby-select" name="roomlobby-select" size="10">
            {rooms}
          </select>
          <div className="roomlobby-buttons">
            <button className="roomlobby-buttons__button" onClick={this.handleOpenModal2}>Upload story</button>
            <button className="roomlobby-buttons__button" onClick={this.handleOpenModal1}>Create room</button>
            <button className="roomlobby-buttons__button" onClick={this.handleOpenModal3}>Enter room</button>
          </div>
        </div>
        <ReactModal 
          className="roomlobby-modal-enter-room"
          ariaHideApp={false}
          isOpen={this.state.showModal3}
          contentLabel="Enter room"
        >
          <div className="roomlobby-modal-enter-room-form__wrap">
            <form className="roomlobby-modal-enter-room-form" name="storyform" method="POST" onSubmit={this.connectToRoom.bind(this)}>
              <span>Enter room password</span>
              <span>Room name: {this.props.MainStore.selectedRoom}</span>
              <input
                      id="room-password"
                      className="password"
                      type="password"
                      name="password"
                      required
                    />
              <div className="roomlobby-buttons">
                <input className="submit" type="submit" value="Enter"/>
                <button onClick={this.handleCloseModal3}>Cancel</button>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal 
          className="roomlobby-modal-story-upload"
          ariaHideApp={false}
          isOpen={this.state.showModal2}
          contentLabel="Story file upload"
        >
          <div className="room-loadstory-form__wrap">
            <form className="room-loadstory-form" encType="multipart/form-data" name="storyform" method="POST" onSubmit={this.loadStoryForm.bind(this)}>
              <span>Story file</span>
              <input
                      id="room-creation__story"
                      className="file"
                      type="file"
                      name="storyFile"
                      onChange={this.fileChosed}
                      accept=".json"
                      required
                    />
              <div className="roomlobby-buttons">
                <input className="submit" type="submit" value="Submit"/>
                <button onClick={this.handleCloseModal2}>Cancel</button>
              </div>
            </form>
          </div>
        </ReactModal>
        <ReactModal 
          ariaHideApp={false}
          isOpen={this.state.showModal1}
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
                  type="text"
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
                  placeholder="00:00:00"
                  required
                />
            <input
                  id="room-creation__preptime"
                  className="time"
                  type="time"
                  name="preptime"
                  placeholder="00:00:00"
                  required
                />
            <input
                  id="room-creation__answertime"
                  className="time"
                  type="time"
                  name="answertime"
                  placeholder="00:00:00"
                  required
                />
            <input
                  id="room-creation__judge"
                  className="checkbox"
                  type="checkbox"
                  name="judge"
                />
            <input type="submit" value="Submit"/>
          </form>
          <button onClick={this.handleCloseModal1}>Cancel</button>
        </ReactModal>
      </div>
    );
  }

  async refreshRooms(e) {
    await fetch("http://localhost:51005/api/room", {
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

  async connectToRoom (e) {
    e.preventDefault();
    let connectForm = new FormData();
    connectForm.append("roomId",this.props.MainStore.selectedRoom);
    connectForm.append("userId", this.props.MainStore.userid);
    connectForm.append("password", document.getElementById("room-password").value);
    await fetch("http://localhost:51005/api/room/Connect", {
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
      this.setState({ showModal3: false });
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
    await fetch("http://localhost:51005/api/room", {
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

    await fetch("http://localhost:51005/api/room/GetByHostId/" + this.props.MainStore.userid, {
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
            this.props.MainStore.selectedRoom = data;
          }
        })
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
        });

    let connectForm = new FormData();
    connectForm.append("roomId", this.props.MainStore.selectedRoom.id);
    connectForm.append("userId", this.props.MainStore.userid);
    connectForm.append("password", document.getElementById("room-creation__password").value);

    await fetch("http://localhost:51005/api/room/Connect", {
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
      this.setState({ showModal1: false });
  }

  async fileChosed (e) {
    //e.preventDefault();
    let file = document.getElementById("room-creation__story").files[0];
    console.log(file);
  }

  async loadStoryForm (e) {
    e.preventDefault();
    let storyForm = new FormData(document.forms.storyform);
    storyForm.append("userId",this.props.MainStore.userid);
    await fetch("http://localhost:51005/api/room/UploadStory", {
      method: "POST",
      body: storyForm,
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
        this.props.MainStore.rooms = data;
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
      this.setState({ showModal2: false });
  }

  componentWillMount = async () => {
    await fetch("http://localhost:51005/api/room", {
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

      await fetch("http://localhost:51005/api/user/GetUserStories?userId="+this.props.MainStore.userid, {
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
  }
}

export default inject("MainStore")(observer(Roomlobby));