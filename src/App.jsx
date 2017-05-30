import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatttttttttty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar user={ this.state.currentUser.name }/>
      </div>
    );
  }
}
export default App;
