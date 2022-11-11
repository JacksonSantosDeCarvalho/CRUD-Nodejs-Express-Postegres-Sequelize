// contém as funções de manipulação da tabela loja. funções(create, delete, update)
const db = require("../models");
const Store = db.store;

exports.create = (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  const store = {
    nome: req.body.nome
  };

  Store.create(store)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao criar a loja."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Store.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "A loja foi deletada com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar a loja id=${id}. Talvez a loja não foi encontrada!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir a loja com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Store.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "A loja foi atualizada com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar a loja id=${id}. Talvez a loja não tenha sido encontrada ou o req.body esteja vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao tentar atualizar a loja com o id=" + id
      });
    });
};

exports.findAll = (req, res) => {

  Store.findAll({order: [['id', 'ASC']]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao procurar a loja."
      });
    });
};