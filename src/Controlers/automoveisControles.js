const Automoveis = require('../models/automoveis')
module.exports={
    async index(req,res){
         const automoveis = await Automoveis.findAll();
         if(automoveis == "" || automoveis == null){
             return res.status(200).send({message:"Nenhum automovel cadastrado"});
         }
         return res.status(200).send({automoveis});
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