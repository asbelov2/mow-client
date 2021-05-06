import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import "./Login.css";
import { setupSignalRConnection } from "../../stores/SignalR";
/*

Авторизация:
Email(email)
Password(password)

*/

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <link
          href="//fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700,700i"
          rel="stylesheet"
        />
        <div className="login-wrapper">
          <h1>Login</h1>
          <div className="login-main">
            <form
              className="login-form"
              action=""
              name="loginform"
              method="POST"
              onSubmit={this.sendLogForm.bind(this)}
            >
              <input
                id="login-email"
                className="text email"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                id="login-password"
                className="text"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    );
  }

  async sendLogForm(e) {
    e.preventDefault();
    let token; // токен
    let username; // имя пользователя
    let connection;
    let loginForm = new FormData(document.forms.loginform);
    await fetch("http://localhost:51005/token", {
      body: loginForm,
      method: "POST",
    })
      .then((res) => {
        if (res.status >= 400) {
          console.log("Неверный логин или пароль");
        }
        return res.json();
      })
      .then((data) => {
        token = data.access_token;
        this.props.MainStore.token = data.access_token;
        username = data.username;
        this.props.MainStore.userid = data.id;
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
    if (token != null) {
      connection = await setupSignalRConnection(
        "http://localhost:51005/gamehub",
        token
      );
      if (connection.state === "Connected") {
        this.props.MainStore.authorized = true;
        this.props.MainStore.connection = connection;
        const data = new FormData();
        data.append('connectionId',this.props.MainStore.connection.connectionId);
        data.append('userId', this.props.MainStore.userid);
        await fetch("http://localhost:51005/api/room/UserOnline", {
          body: data,
          method: "POST",
          headers:{
            "Accept": "application/json",
            "Authorization": "Bearer " + this.props.MainStore.token
          }
    })
        this.props.history.push('/roomlobby');
      }
      console.log(this.props.MainStore.connection);
      this.props.MainStore.connection.on("Receive", (message, user) => {
        console.log(user + ": " + message);
      });
      this.props.MainStore.connection.invoke("Send", "123", username);
    }
  }
}

export default inject("MainStore")(observer(Login));
