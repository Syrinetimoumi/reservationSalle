const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const salleController = require('../controllers/salleController');
const router = express.Router();

router.use(authenticate);

router.get('/nouvelle', async (req, res) => {
    try {
      res.render('nouvelleSalle'); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



router.get('/', authenticate, salleController.getAllSalles);


router.get('/:id', authenticate, salleController.getSalleById);   


router.get('/nouvelle', async (req, res) => {
  try {
    res.render('nouvelleSalle'); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/addSalle', authenticate, salleController.addSalle);


router.get('/update/:id',  salleController.getUpdateSalle); 


router.post('/update/:id', authenticate, salleController.updateSalle);


router.delete('/:id', authenticate, salleController.deleteSalle);




module.exports = router;