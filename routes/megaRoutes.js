const router = require('express').Router();

const megaController = require('../controllers/megaController');


router.get('/resultadoAtual', megaController.ResultadoAtual);
router.get('/resultado', megaController.getResultadoSequecia);
router.get('/resultadoPorJogo', megaController.ResultadoPorJogo);


module.exports = router;