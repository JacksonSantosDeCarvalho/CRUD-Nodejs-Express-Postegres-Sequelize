// contém as funções de manipulação da tabela venda. funções(create, delete, findBetweenDates, pagination)
const db = require("../models");
const Sale = db.sale;
const { Op } = require("sequelize");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo não pode estar vazio!"
    });
    return;
  }

  const sale = {
    nCartao: req.body.nCartao,
    valorBruto: req.body.valorBruto,
    valorLiquido: req.body.valorLiquido,
    data: req.body.data,
    nParcela: req.body.nParcela,
    modalidadeID: req.body.modalidadeID,
    bandeira: req.body.bandeira,
    lojaID: req.body.lojaID
  };

  Sale.create(sale)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao criar a venda."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Sale.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "A venda foi deletada com sucesso!"
        });
      } else {
        res.send({
          message: `Não é possível deletar a venda id=${id}. Talvez a venda não foi encontrada!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possível excluir a venda com id=" + id
      });
    });
};



exports.findBetweenDates = (req, res) => {
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;

  const where = {
    data: {
      [Op.between]: [startDate, endDate]
    }
  };

  Sale.findAll({ where })
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao procurar as vendas."
      });
    });
};

exports.pagination = (req, res) => {

  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (pageAsNumber == 0){
    page = 1
  }

  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber;

  }

  Sale.findAndCountAll({
    limit: size,
    offset: (page - 1) * size
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao procurar as vendas."
      });
    });
};