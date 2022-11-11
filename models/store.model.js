//cria a tabela loja no banco de dados
module.exports = (sequelize, Sequelize) => {

    const Loja = sequelize.define('loja', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
        nome:{
            type: Sequelize.STRING,
        }
    });

    return Loja;
}