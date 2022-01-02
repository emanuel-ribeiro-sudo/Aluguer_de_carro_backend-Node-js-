// (async()=>{
 
//     const database = require('./config/db');
//     const User = require('./models/user')
//     await database.sync()

//     const novoUser= await User.create({
//         bi:21234,
//         nome:'Jose x',
//         morrada:'Figueira', 
//         telefone:'987634', 
//         numero_carta:'S-1124', 
//         cargo:'Cliente',
//         email:'jose1@gmail.com',
//         senha:'000023' 
//     }) 
//     // console.log(novoUser);

//     //const Users = await User.findAll()
    

//     //const Users = await User.findByPk(1234);
//     // const Users = await User.findAll({
//     //     where:{
//     //         nome:'Emanuel'
//     //     }
//     // });
//     const Users = await User.findByPk(1234);
//     console.log(Users);
//     // Users.nome = 'Emanuel Ribeiro'
//     // await Users.save();

//     // const Users = await User.findByPk(0987);
//     // await Users.destroy();

//     // await User.destroy({
//     //     where:{
//     //         bi:0987
//     //     }
//     // })


//  })();

const { request, response } = require('express')
const express = require('express')


const routes = require('./routes')

//require('./database')
const app = express()
app.use(express.json())

app.use(routes)

app.listen(3333,() => console.log('Server running at http://localhost:3333'));
 


// (async()=>{
//     const database  = require('./config/db');
//          const User = require('./models/user')
//          const Aluguers = require('./models/aluguers')
//          const Automoveis= require('./models/automoveis')
//          await database.sync()
// //          const users = await User.findByPk(7673,
// //                 {
// //              include:Aluguers
// //          }
// //          )

// //         // const alugueres = await users.getAluguers()

// //         console.log(users.aluguers);
//      })(); 