const jsonServer = require('json-server');
const express = require('express');
const server = jsonServer.create();
const path = require('path');
const PORT = process.env.PORT || 5000;

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use('/static', express.static(path.join(__dirname, 'static')));
server.use(jsonServer.router('db.json'));
server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
