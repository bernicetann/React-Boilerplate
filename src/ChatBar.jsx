import React, {Component} from 'react';

class Chatbar extends Component {
  nameChange(event) {
    console.log('name changed');
    console.log(event.target.value);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"
        value={ this.props.user } onChange={this.nameChange} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;