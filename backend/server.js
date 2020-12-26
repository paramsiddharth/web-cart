const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const PORT = process.env.SERVER_PORT || 5000;

const dbServer = jsonServer.create();
const server = express();

server.use('/static', express.static(path.join(__dirname, 'static')));
dbServer.use(jsonServer.defaults());
dbServer.use(jsonServer.bodyParser);
dbServer.use(jsonServer.router('db.json'));
server.all('/', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.send(`
	/static/img : Images
	/items : Shop items
	`);
});
server.use('/', dbServer);
server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
