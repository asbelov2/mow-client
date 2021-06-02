import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./Story.css";

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let story;

    if(this.props.storyTab === 0) {
      story = this.props.MainStore.room.story.origin;
    }
    else {
      story = this.props.MainStore.fakeStory;
    }

    return (
      <div className="story">
        <p>
          {story}
        </p>
      </div>
    );
  }

  async componentDidMount() {
    await fetch(this.props.MainStore.url + "api/game/GetFakeStory?roomId=" + this.props.MainStore.selectedRoomId, {
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
        this.props.MainStore.fakeStory = data;
      }
    })
    .catch((e) => {
      console.log("Error: " + e.message);
      console.log(e.response);
    });
  }
}

export default inject("MainStore")(observer(Story));
