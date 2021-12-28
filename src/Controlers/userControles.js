const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const autConfig = require('../config/auth.json')

function generateToken(params = {}){
    return jwt.sign(params,autConfig.secret, {
        expiresIn: 78300
    })
}

module.exports={
    async login(req,res){
        const {senha, email, logado} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user){
            return res.status(400).send({
                status:0,
                message:'Email ou senha incorreto!'
            });

        }
        if (!bcrypt.compareSync(senha,user.senha)){
            return res.status(400).send({
                status:0,
                message:'Senha Incorecta'
            });
        }
        const user_bi = user.bi;
        await User.update({
            logado
        },{
            where:{
                bi:user_bi
            }
        });
        user.senha = undefined;

        const token = generateToken({bi: user.bi})

        return res.status(200).send({
            status:1,
            message:"Usuario Logado com sucesso",
            user,token
        });
    },
    async index(req,res){
         const users = await User.findAll();
         if(users == "" || users == null){
             return res.status(200).send({message:"Nenhum usuario cadastrado"});
         }
         return res.status(200).send({users});
    },
    async store(req,res){
       // const {bi, nome, morrada, telefone, numero_carta, cargo, email, senha}=req.body;

        const user = await User.create(req.body);

        const token = generateToken({bi: user.bi})
        
        return res.status(200).send({
            status:1,
            message: 'Usuario cadastrado com sucesso', 
            user,token
        })
    },
    async update(req,res){
        await User.update(req.body,
            {
                where: {
                    bi:req.params.bi
                }
            });

            
            return res.status(200).send({
                status:1,
                message: 'Usuario Atualizado com sucesso'
            })
    },
    async delete(req,res){
        await User.destroy({
            where: {
                bi:req.params.bi
            }
        });
        return res.status(200).send({
            status:1,
            message: 'Usuario Deletado com sucesso'
        })
    }
};