// rotas da API
module.exports = app => {
    const sale = require("../controllers/sale.controller");
    const store = require("../controllers/store.controller");
    const modality = require("../controllers/modality.controller")

    var router = require("express").Router();

    // sale
    // Criar uma venda
    router.post("/sale", sale.create);

    // Encontrar uma venda entre datas
    router.get("/sale/find", sale.findBetweenDates);

    // Paginação da tabela venda
    router.get("/sale", sale.pagination);

    // Deletar uma venda
    router.delete("/sale/:id", sale.delete);

    // store
    // Criar um loja
    router.post("/store", store.create);

    // Atualizar um loja
    router.put("/store/:id", store.update);

    // Deletar uma loja
    router.delete("/store/:id", store.delete);

    // Encontrar todas as lojas
    //router.get("/store", store.findAll);

    // modality
    // criar uma modalidade
    //router.post("/modality", modality.create);

    // Encontrar todas as modalidades
    //router.get("/modality", modality.findAll);

    // Atualizar um modalidade
    //router.put("/modality/:id", modality.update);


    app.use('/api', router);


};