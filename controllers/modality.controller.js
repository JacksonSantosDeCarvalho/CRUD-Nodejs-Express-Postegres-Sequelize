// contém as funções de manipulação da tabela modalidade. funções(create, findAll, update)
const db = require("../models");
const Modality = db.modality;

exports.create = (req, res) => {
  if (!req.body.modalidade) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  const modality = {
    
    modalidade: req.body.modalidade
  };

  Modality.create(modality)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao criar a modalidade."
      });
    });
};

exports.findAll = (req, res) => {
  const modality = req.query.modalidade;
  var condition = modality ? { modality: { [Op.iLike]: `%${modality}%` } } : null;

  Modality.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao procurar a modalidade."
      });
    });
};


exports.update = (req, res) => {
  const id = req.params.id;

  Modality.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "A modalidade foi atualizada com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível atualizar a modalidade id=${id}. Talvez a modalidade não tenha sido encontrada ou o req.body esteja vazio!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao tentar atualizar a modalidade com o id=" + id
      });
    });
};