const router = require('express').Router();

const megaController = require('../controllers/megaController');


router.get('/resultadoAtual', megaController.ResultadoAtual);
router.get('/resultado', megaController.getResultadoSequecia);
router.get('/resultadoPorJogo', megaController.ResultadoPorJogo);
router.post('/resultadoPorJogo', megaController.postResultadoPorJogo);
router.post('/resultadoPorPeriodo', megaController.postResultadoPorPeriodo);

router.get('/analiseOne', megaController.analiseOne);
router.get('/analiseTwo', megaController.analiseTwo);
router.get('/analiseThree', megaController.analiseThree);
router.get('/analiseFour', megaController.analiseFour);
router.get('/analiseFive', megaController.analiseFive);

module.exports = router;