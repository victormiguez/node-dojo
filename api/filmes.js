var express = require('express');
var Filme = require('../models/filme');

var router = express.Router();

// API sendo usada
router.use(function(req, res, next) {
  console.log('Algum request foi feito.');
  next();
});

// Adicionar filme
router.post('/filme', function(req, res){

  var filme = new Filme({
    nome: req.body.nome
  });

  if (filme.nome != undefined){
    filme.save(function(err, filme) {
      if (err){
        res.send(err);
      } else {
        res.json(filme);
      }
    });
  } else {
    res.json({message: 'Nome vazio!'});
  }
});

// Listar filmes
router.get('/filmes', function(req, res){
  Filme.find(function(err, filmes){
    if (err){
      res.send(err);
    } else {
      res.json(filmes);
    }
  })
});

// Pegar filme por id
router.get('/filme/:filme_id', function(req, res){
  Filme.findById(req.params.filme_id, function(err, filme){
    if (err){
      res.send(err);
    } else {
      res.json(filme);
    }
  })
});

// Alterar filme
router.put('/filme/:filme_id', function(req, res) {
  console.log('test');
  Filme.findById(req.params.filme_id, function(err, filme) {
    if (err) {
      res.send(err);
    }
    filme.nome = req.body.nome;

    filme.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'Filme alterado!'
      });
    })
  })
})

// Deletar filme
router.delete('/filme/:filme_id', function(req, res) {
  Filme.remove({
    _id: req.params.filme_id
  }, function(err, filme) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Filme deletado!'
    });
  });
});

module.exports = router;