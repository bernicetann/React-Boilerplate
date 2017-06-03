import React, {Component} from 'react';

function isImgUrl(string) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(string);
}

class Message extends Component {
  render() {

    if ( this.props.type === 'postNotification' ) {
      return(
        <div className="message system">

        </div>
      )
    }
    if ( isImgUrl(this.props.content) ) {
      return (
        <main className="messages">
          <div className="message">
            <span className="message-username">{ this.props.username }</span>
            <span className="message-content">
              <img className="render-image" src={ this.props.content } />
            </span>
          </div>
        </main>
      );
    }
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{ this.props.username }</span>
          <span className="message-content">{ this.props.content }</span>
        </div>
      </main>
    );
  }
}
export default Message;