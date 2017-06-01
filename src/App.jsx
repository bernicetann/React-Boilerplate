import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
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

  //This will rerender components and the new message should show up
  this.socket.onmessage = (event) => {
    console.log(event);
    this.setState({
      messages: this.state.messages.concat(JSON.parse(event.data))
    });
  }
  }

  //When you press enter, you send the object with username/content to the server
  onNewPost(content, username) {
    this.socket.send(JSON.stringify({ username: username || this.state.currentUser.name,
                                      content: content
                                    }));
  }

  //Render the DOM
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatttttttttty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar user={ this.state.currentUser}
          onNewPost={ this.onNewPost }/>
      </div>
    );
  }
}
export default App;
