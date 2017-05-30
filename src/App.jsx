import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatttttttttty</a>
        </nav>
        <MessageList/>
        <ChatBar/>
      </div>
    );
  }
}
export default App;
