import { inject } from "mobx-react";
import { Observer } from "mobx-react-lite";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { menu: "normal" };
  }

  render() {
    return (
        <div
          className={this.state.menu==="normal"?"NavList NavList_bg_2":"NavList NavList_minimal"}
        >
          <div className={this.props.isHidden?"nav-link nav-link_hidden":(this.state.menu==="normal"?"nav-link nav-link_img_1":"nav-link nav-link_img_1 nav-link_minimal")}>
            
            <Link
              className={this.state.menu==="normal"?"nav-link__text":"nav-link__text_minimal"}
              exact="true"
              to="/"
              onClick={this.setToMin.bind(this)}
            >
              Home
            </Link>
          </div>
          <div className={this.props.isHidden?"nav-link nav-link_hidden":(this.state.menu==="normal"?"nav-link nav-link_img_2":"nav-link nav-link_img_2 nav-link_minimal")}>
            <Link
              className={this.state.menu==="normal"?"nav-link__text":"nav-link__text_minimal"}
              exact="true"
              to="/registration"
              onClick={this.setToMin.bind(this)}
            >
              Registration
            </Link>
          </div>
          <div className={this.props.isHidden?"nav-link nav-link_hidden":(this.state.menu==="normal"?"nav-link nav-link_img_3":"nav-link nav-link_img_3 nav-link_minimal")}>
            <Link
              className={this.state.menu==="normal"?"nav-link__text":"nav-link__text_minimal"}
              exact="true"
              to="/login"
              onClick={this.setToMin.bind(this)}
            >
              Login
            </Link>
          </div>
        </div>
    );
  }

  setToMin = () => {
    this.setState({ menu: "minimal" });
  }

  setToNormal() {
    this.setState({ menu: "normal" });
  }

  componentDidMount() {
    this.setState({ menu: "normal" });
  }
}

export default NavBar;
