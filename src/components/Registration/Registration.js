import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "./Registration.css";

/*

Регистрация:
Name(name)
Email(email)
Password(password)
Confirm Password(password_confirmation)


*/

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("Reg render", this.sendRegForm);
    return (
      <div>
        <link
          href="//fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i"
          rel="stylesheet"
        />
        <div className="registration-wrapper">
          <h1>Registration</h1>
          <div className="registration-main">
              <form className="registration-form" action="#" name="regform" method="POST" onSubmit={this.sendRegForm.bind(this)}>
                <input
                  id="reg-nickname"
                  className="text"
                  type="text"
                  name="nickname"
                  placeholder="Username"
                  required
                />
                <input
                id="reg-email"
                  className="text email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  id="reg-password"
                  className="text"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <input
                  id="reg-password_confirm"
                  className="text"
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                  required
                />
                <input type="submit" value="Sign up" />
              </form>
          </div>
        </div>
      </div>
    );
  }

  async sendRegForm(e) {
    e.preventDefault();
    let regForm = new FormData(document.forms.regform);
    await fetch("http://localhost:51005/api/user/Register", {
      body: regForm,
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Регистрация прошла успешно");
          this.props.history.push('/login');
        }
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
  };
}

export default inject("MainStore")(observer(Registration));
