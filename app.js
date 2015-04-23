var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var path       = require('path');

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

// Views e conteúdo estático
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// API
var api = {}
api.filmes = require('./api/filmes')

app.use('/api', api.filmes);

// Rotas
index = require('./routes/index')
app.use('/', index);
app.get('/', api.filmes);

// Configurações do servidor
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Rodando na porta ' + port);