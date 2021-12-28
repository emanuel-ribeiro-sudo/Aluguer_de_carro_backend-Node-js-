const Sequelize = require('sequelize');
const database = require('../config/db');
const Aluguers = require('./aluguers');

const Automoveis = database.define('automoveis',{
    matricula: {
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
    },
    marca: {
        type:Sequelize.STRING(8),
        allowNull:false
    },
    kilometragem: {
        type:Sequelize.FLOAT,
        allowNull:false
    },
    cor: {
        type:Sequelize.STRING,
        allowNull:false
    },
    preco_diario: {
        type:Sequelize.DECIMAL(9,2),
        allowNull:true
    },
    estado: {
        type:Sequelize.ENUM('Livre','Ocupado'),
        defaultValue: 'Livre',
        allowNull:false
    },
},
)

module.exports = Automoveis