const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Sending message to every client
function broadcast(data) {
  for(let client of wss.clients) {
    client.send(data);
  }
}

//Handles message from client,
//Then, parses data to to client side; Every time you pass something to client,
//parse it to JSON string first
function handleMessage(data) {
  var parsedData = JSON.parse(data);
  parsedData.id = uuidV1();
  if(parsedData.username === '') {
    parsedData.username = 'annonymous';
  }
  switch(parsedData.type) {
    case 'postMessage':
      parsedData.type = 'incomingMessage';
      break;
    case 'postNotification':
      parsedData.type = 'incomingNotification';
      break;
    default:
      throw new Error("Unknown event type" + parsedData.type);
  }
  broadcast(JSON.stringify(parsedData));
}

//Parses client # to the client side
function handleConnection(client) {
  console.log('New client connected!');
  console.log('We are at ' + wss.clients.size + ' clients!');
  var newObj = { numClients: wss.clients.size, type: 'newConnection' };

  broadcast(JSON.stringify(newObj));

}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  handleConnection();
  ws.on('message', handleMessage);


// Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});