import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ReactModal from 'react-modal';
import "./UploadStory.css";

class UploadStory extends Component {
  constructor () {
    super();
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
    return (
      <div>
        <button className="roomlobby-buttons__button" onClick={this.handleOpenModal}>Upload story</button>
        <ReactModal 
          className="roomlobby-modal-story-upload"
          ariaHideApp={false}
          isOpen={this.state.showModal}
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
                      accept=".json"
                      required
                    />
              <div className="roomlobby-buttons">
                <input className="submit" type="submit" value="Submit"/>
                <button onClick={this.handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    );
  }

  async loadStoryForm (e) {
    e.preventDefault();
    let storyForm = new FormData(document.forms.storyform);
    storyForm.append("userId",this.props.MainStore.userid);
    await fetch(this.props.MainStore.url + "api/room/UploadStory", {
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
      this.setState({ showModal: false });
  }
}

export default inject("MainStore")(observer(UploadStory));