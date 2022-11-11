//cria a tabela venda no banco de dados
module.exports = (sequelize, Sequelize) => {
    
    const Venda = sequelize.define('venda', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
        nCartao:{
            type: Sequelize.STRING
        },
        valorBruto:{
            type: Sequelize.DECIMAL
        },
        valorLiquido:{
            type: Sequelize.DECIMAL
        },
        data:{
            type: Sequelize.DATE,
        },
        nParcela:{
            type: Sequelize.INTEGER
        },
        modalidadeID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'modalidade',
                key: 'id'
            }
        },
        bandeira: {
            type: Sequelize.STRING
        },
        lojaID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'loja',
                key: 'id'
            }
        }
    });

    return Venda;
}