import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./Setting.css";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="roomview-setting">
          <span className="roomview-setting__name">{this.props.name}</span>
          <input className="roomview-setting__value" type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} checked={this.props.checked} readOnly={this.props.readonly} disabled={this.props.disabled} onChange={this.props.onChange} min={this.props.min} max={this.props.max} step="1" />
      </div>
    );
  }
}

export default inject("MainStore")(observer(Setting));
