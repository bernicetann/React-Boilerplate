import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    //initiall state for this page
    this.state = { username: this.props.user.name, content: '' }
    this.nameChange = this.nameChange.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  //On the event that name changes
  nameChange(event) {
    this.setState({ username: event.target.value });
  }

  //On the event that a user types something
  updateContent(event) {
    this.setState({ content: event.target.value });
  }

  //When you type something and press enter
  onInputKeyDown(event) {
    if (event.key == 'Enter'){
      var username = this.state.username;
      this.props.onNewPost(event.target.value, username);
      this.setState({ content: '' });
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">

        <input className="chatbar-username" placeholder="Your Name (Optional)"
        defaultValue={ this.state.username }
        onChange={ this.nameChange } />

        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
        value={ this.state.content }
        onKeyDown={ this.onInputKeyDown } onChange={ this.updateContent }/>

      </footer>
    );
  }
}
export default Chatbar;