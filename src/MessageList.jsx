import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages.map(message => {

      return <Message
        key={ message.id }
        username={ message.username }
        content={ message.content }
        type={message.type}
        />
    });

    return (
      <div id="message-list">
        { messages }
      </div>
    );
  }
}
export default MessageList;