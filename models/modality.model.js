//cria a tabela modalidade no banco de dados
module.exports = (sequelize, Sequelize) => {
    
    const Modalidade = sequelize.define('modalidade', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true
        },
        modalidade:{
            type: Sequelize.STRING,
        }
    });

    return Modalidade;
}