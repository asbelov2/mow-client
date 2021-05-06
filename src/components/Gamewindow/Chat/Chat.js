import React, { Component } from 'react';
import './Chat.css';

/*

Чат:
кнопка правил button
Вывод textbox
Ввод textbox
кнопки управления текстом button
*/

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div>
        <h1>This is Login page.</h1>
        <form className="login-form" name="logform" onSubmit={this.sendLogForm}>
          <input type="email" id="login__email" placeholder="Example@yourmail.com"></input>
          <input type="password" id="login__password" placeholder="Your password"></input>
          <input type="submit" id="login__submit" value="Login" onClick={this.sendLogForm}></input>
        </form>
      </div>
    );
  }

  sendLogForm(e) {
    e.preventDefault();
  }
}

export default Chat;