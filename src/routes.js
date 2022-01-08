const express = require('express');
const AluguersController = require('./Controlers/aluguersControles');
const AutomoveisController = require('./Controlers/automoveisControles');
const UserController = require('./controlers/userControles')

const authMiddleware = require('./middlewares/auth');

const router = express.Router();



router.get ("/", (req, res) => {
    res.json ("Bem-vindo ao Rentacar Online: powered by Emanuel");
  });

// router.use(authMiddleware);
  // Users
router.get('/users' ,UserController.index);

router.post('/addusers',UserController.store);

router.put('/users/:bi',UserController.update);

router.delete('/users/:bi',UserController.delete);

router.post('/users/login',UserController.login);

  // Aluguers

router.get('/users/:biuser/alguers',AluguersController.index);

router.post('/users/:biuser/alguers',AluguersController.store);

router.delete('/users/:id/alguers',AluguersController.delete);

router.put('/users/:id/alguers',AluguersController.update);

  //Automoveis

router.get('/automoveis', AutomoveisController.index)

router.post('/automoveis', AutomoveisController.store)

router.delete('/automoveis/:matricula', AutomoveisController.delete)

router.put('/automoveis/:matricula', AutomoveisController.update)

module.exports = router;