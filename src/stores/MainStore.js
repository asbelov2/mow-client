import {
  makeAutoObservable,
} from "mobx";

class MainStore {
  _id = null;
  _token = null;
  _connection = null;
  _connected = false;
  _authorized = false;
  _rooms = [];
  _stories = [];
  _selectedRoom = null;

  constructor() {
    makeAutoObservable(this);
  }

  get connection() {
    if(this._connected){
      return this._connection;
    }
    else {
      console.log("not connected yet");
      return null;
    }
  }

  set connection(connection) {
    this._connection = connection;
    if(connection.state==="Connected"){
      this._connected = true;
    }
  }

  get authorized () {
    return this._authorized;
  }

  set authorized (isAuthorized) {
    this._authorized = isAuthorized;
  }

  get userid () {
    return this._id;
  }

  set userid (id) {
    this._id = id;
  }

  get token () {
    return this._token;
  }

  set token (token) {
    this._token = token;
  }

  get rooms () {
    return this._rooms;
  }

  set rooms (rooms) {
    this._rooms = rooms;
  }

  get stories () {
    return this._stories;
  }

  set stories (stories) {
    this._stories = stories;
  }

  get selectedRoom () {
    return this._selectedRoom;
  }

  set selectedRoom (selectedRoom) {
    this._selectedRoom = selectedRoom;
  }
}

export default new MainStore();
