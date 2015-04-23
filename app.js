var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Conexão com o DB
var bd       = require('./bd');
var mongoose = require('mongoose');
var conn     = 'mongodb://' + bd.usuario + ':' + bd.senha + '@' + bd.url;
mongoose.connect(conn);

// Setando o body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// API
var api = {}
api.filmes = require('./api/filmes')

app.use('/api', api.filmes);

// Configurações do servidor
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Rodando na porta ' + port);