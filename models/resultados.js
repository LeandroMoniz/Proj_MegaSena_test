const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Resultados = sequelize.define('Resultados', {

    dataApuracao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    acumulado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    dataProximoConcurso: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    numeroSorteio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    localSorteio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomeMunicipioUFSorteio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numeroConcursoAnterior: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    numeroConcursoProximo: {
        type: DataTypes.INTEGER,
    },
    primeiroNumSort: {
        type: DataTypes.INTEGER,
    },
    segundoNumSort: {
        type: DataTypes.INTEGER,
    },
    terceiroNumSort: {
        type: DataTypes.INTEGER,
    },
    quartoNumSort: {
        type: DataTypes.INTEGER,
    },
    quintoNumSort: {
        type: DataTypes.INTEGER,
    },
    sextoNumSort: {
        type: DataTypes.INTEGER,
    },
    primeiroOrd: {
        type: DataTypes.INTEGER,
    },
    segundoOrd: {
        type: DataTypes.INTEGER,
    },
    terceiroOrd: {
        type: DataTypes.INTEGER,
    },
    quartoOrd: {
        type: DataTypes.INTEGER,
    },
    quintoOrd: {
        type: DataTypes.INTEGER,
    },
    sextoOrd: {
        type: DataTypes.INTEGER,
    },

})

module.exports = Resultados