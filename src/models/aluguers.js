const Sequelize = require('sequelize');
const database = require('../config/db')
const User = require('../models/user')
const Automoveis = require('../models/automoveis')

const Aluguers = database.define('aluguers',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    // matricula: {
    //     type:Sequelize.STRING(8),
    //     allowNull:false
    // },
    data_inicio: {
        type:Sequelize.DATE,
        allowNull:false
    },
    tempo: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    preco_total: {
        type:Sequelize.DECIMAL(9,2),
        allowNull:true
    },
    estado: {
        type:Sequelize.BOOLEAN,
        allowNull:false
    },
    // static associate(models){
    //     this.belongsToMany(models.User,{foreignKey:'bi_user', as:'aluga'}); 
    // }
},
)
Aluguers.User = Aluguers.belongsTo(User,{
    constraint:true, 
    foreignKey:'biuser' 
});

User.hasMany(Aluguers,{ 
    foreignKey:'biuser' 
})
Automoveis.hasOne(Aluguers,{ 
    foreignKey:'matricula' 
})

module.exports = Aluguers
