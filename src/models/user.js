const Sequelize = require('sequelize');
const database = require('../config/db')
const bcrypt = require('bcrypt');
const User = database.define('user',{
    bi: {
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    nome: {
        type:Sequelize.STRING(30),
        allowNull:false
    },
    morrada: {
        type:Sequelize.STRING(30),
        allowNull:false
    },
    telefone: {
        type:Sequelize.STRING(7),
        allowNull:false
    },
    numero_carta: {
        type:Sequelize.STRING(9),
        allowNull:false
    },
    cargo: {
        type:Sequelize.ENUM('Admin','Funcionario','Cliente','Dono_Empresa'),
        defaultValue: 'Cliente', 
        allowNull:false
    },
    email: {
        type:Sequelize.STRING(50),
        allowNull:false
    },
    senha:{ 
        type:Sequelize.STRING(255),
        allowNull:false
    },
    logado:{
        type:Sequelize.BOOLEAN
    },

},{ 
    hooks:
    {
        beforeCreate:(user) =>{
            const salt = bcrypt.genSaltSync();
            user.senha = bcrypt.hashSync(user.senha,salt);
        },
    }
})
module.exports = User