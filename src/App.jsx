import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  numConnections: 0
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  //connect Websocket to localhost 3001
  var webSocket = new WebSocket("ws://localhost:3001");
  webSocket.onopen = function (event) {
      console.log("Connected to server");
  };
  //Store webSocket in this.socket.
  this.socket = webSocket;

  //When receiving message from the server,
  //This will rerender components and the new message should show up
  this.socket.onmessage = (event) => {
    console.log(event);
    const receivedEvent = JSON.parse(event.data);
    if (receivedEvent.type === 'newConnection') {
      this.setState({ numConnections: receivedEvent.numClients })
    } else {
      this.setState({ messages: this.state.messages.concat(receivedEvent) });
    }
  }
  }


  //When you press enter, you send the object with username/content to the server
  //onNewPost is being called from ChatBar.jsx(where we get our params from)
  onNewPost(content, username) {

    if (username !== this.state.currentUser.name) {
      var clientData = (JSON.stringify({ type: "postNotification",
                                         content: `${this.state.currentUser.name} changed their name to ${username}`
                                       }));
      this.setState({ currentUser: { name: username }});
      this.socket.send(clientData);
    }
    var clientData = (JSON.stringify({ type: "postMessage",
                                       username: username,
                                       content: content
                                     }));
    console.log("NEWPOST", clientData);
    this.socket.send(clientData);

  }

  //Render the DOM
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatttttttttty</a>
          <span className="users-online">{ this.state.numConnections + ' ' } Users Online</span>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar user={ this.state.currentUser}
          onNewPost={ this.onNewPost }/>
      </div>
    );
  }
}
export default App;
