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
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
    }, 3000);
  }

  onNewPost(content, username) {
    this.setState({
      messages: this.state.messages.concat({ id: this.state.messages.length+1,
                                             username: username,
                                             content: content
                                           })
     });
  }

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
