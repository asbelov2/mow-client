import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Story from "./Story/Story";
import "./Storywindow.css";

/*
  Roles:
    0 - Spec
    1 - Witch
    2 - Human
    3 - Judge
*/

class Storywindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyTab:0
    };

  }

  handleChangeToOriginStory = () => {
    this.setState({ storyTab: 0 });
  }
  handleChangeToWitchStory = () => {
    this.setState({ storyTab: 1 });
  }

  render() {
    let storyTabs;
    if(this.props.role === 2){
      storyTabs =
      <div className="storywindow">
          <div className="storywindow-storytabs">
            <input type="button" className="storywindow-storytabs__tab" value="Fake" onClick={this.handleChangeToWitchStory}/>
          </div>
          <Story storyTab={this.state.storyTab}/>
      </div>
    }
    else{
      storyTabs =
      <div className="storywindow">
          <div className="storywindow-storytabs">
            <input type="button" className="storywindow-storytabs__tab" value="Origin" onClick={this.handleChangeToOriginStory}/>
            <input type="button" className="storywindow-storytabs__tab" value="Fake" onClick={this.handleChangeToWitchStory}/>
          </div>
          <Story storyTab={this.state.storyTab}/>
      </div>
    }
    return (
      <div>
        {storyTabs}
      </div>
    );
  }
}

export default inject("MainStore")(observer(Storywindow));
