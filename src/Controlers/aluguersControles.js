const Aluguers = require('../models/aluguers');
const Automoveis = require('../models/automoveis');
const User = require('../models/user');
const Sequelize = require('sequelize');
module.exports={
    async index(req,res){
         const {biuser}= req.params;
        const users = await User.findByPk(biuser,
            {
         include:Aluguers
     }
     )
        if(!users){
            return res.status(400).send({
                status:0,
                message:'Nenhum aluguers encontrado'
            })
        }
        return res.status(200).send(
            users.aluguers
        )
    },
    async store(req, res) {

        try {
  
            const { biuser } = req.params;
            const {matricula, data_inicio, tempo, preco_total, estado } = req.body;
  
            const user = await User.findByPk(biuser);
  
            if (!user) {
                return res.status(400).json({
                    status: 0,
                    message: 'Usuário não encontrado!'
                });
            }
            const carro = await Automoveis.findByPk(matricula);
            if(!carro){
                return res.status(400).json({
                    status: 0,
                    message: 'Automovel não encontrado!'
                });
            }else{
                if(carro.estado=='Ocupado'){
                    return res.status(400).json({
                        status: 0,
                        message: 'Automovel encontra-se alugado!'
                    });
                }else{
                const estado= 'Ocupado'
                await Automoveis.update({estado}, { where: { matricula} });
                }
            }
            
            const alugueres = await Aluguers.create({
                matricula, 
                data_inicio, 
                tempo, 
                preco_total,
                estado,
                biuser
            });
            return res.status(200).json({
                status: 1,
                message: "Aluguer cadastrado com sucesso!",
                alugueres
            });

          } catch (err) {
            return res.status(400).json({ error: err });
        }
      },
      async delete(req, res) {
        const id = req.params.id;

        try {
            const alugueres = await Aluguers.findByPk(id);

            if (alugueres) {
                await Aluguers.destroy({ where: { id } });
                const estado= 'livre'
                await Automoveis.update({estado}, { where: { matricula} });
                return res.status(200).json({
                    status: 1,
                    message: "Aluguer apagado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Aluguer não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({ error: err });
        }
    },

    async update(req, res) {
        const id = req.params.id;
        const { matricula, 
            data_inicio, 
            tempo, 
            preco_total 
            } = req.body;

        try {
            const alugueres = await Aluguers.findByPk(id);

            const carro = alugueres.matricula
            const livre = 'livre' 
            await Automoveis.update({livre}, { where: {carro} });

            if (alugueres) {
                await Aluguers.update({ matricula, data_inicio,tempo,preco_total  }, { where: { id } });
                
                const estado= 'Ocupado'
                await Automoveis.update({estado}, { where: { matricula} });
               
                return res.status(200).json({
                    status: 1,
                    message: "Aluguer atualizado com sucesso!",
                });

            } else {
                return res.status(400).json({
                    status: 0,
                    message: 'Aluguer não encontrado!'
                });
            }


        } catch (err) {
            return res.status(400).json({
                status: 0,
                message: 'Erro ao atualizar Aluguer!'
            });
        }
    },

};