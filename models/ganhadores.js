const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Ganhador = sequelize.define('Ganhador', {
    numeroSorteio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricaoFaixa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    faixa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numeroDeGanhadores: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valorPremio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Ganhador;