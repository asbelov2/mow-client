import {
  makeAutoObservable,
} from "mobx";

/*
    TODO: Разобрать эту помойку по разным store
 */

class MainStore {
  _id = null;
  _token = null;
  _connection = null;
  _connected = false;
  _authorized = false;
  _rooms = [];
  _stories = [];
  _users = [];
  _userRoles = new Map();
  _humanTeam = [];
  _witchTeam = [];
  _selectedRoomId = null;
  _room = null;
  _url = "http://localhost:51005/";
  _user = null;
  _role = null;
  _fakeStory = null;
  //_url = "https://mow-game.azurewebsites.net/";

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

  get selectedRoomId () {
    return this._selectedRoomId;
  }

  set selectedRoomId (selectedRoomId) {
    this._selectedRoomId = selectedRoomId;
  }

  get url () {
    return this._url;
  }

  set url (url){
    this._url = url;
  }

  get users () {
    return this._users;
  }

  set users (users){
    this._users = users;
  }

  get room () {
    return this._room;
  }

  set room (room){
    this._room = room;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  get role() {
    return this._role;
  }

  set role(role) {
    this._role = role;
  }

  get userRoles() {
    return this._userRoles
  }

  set userRoles(userRoles) {
    this._userRoles = userRoles;
  }

  get humanTeam() {
    return this._humanTeam;
  }

  set humanTeam(humanTeam) {
    this._humanTeam = humanTeam;
  }

  get witchTeam() {
    return this._witchTeam;
  }

  set witchTeam(witchTeam) {
    this._witchTeam = witchTeam;
  }

  get fakeStory() {
    return this._fakeStory;
  }

  set fakeStory(fakeStory) {
    this._fakeStory = fakeStory;
  }
}

export default new MainStore();
