require('dotenv').config();
const Server = require('./models/servers');

const server = new Server();

server.listen();