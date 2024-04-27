const salle = require('../models/salle');


exports.getAllSalles = async (req, res) => {
    try {
        const salles = await salle.find();
        res.render('salles', { salles }); 
  
    } catch (error) {
        res.status(404).send(error.message)
}
}


exports.getSalleById = async (req, res) => {
    try {
        const Salle = await salle.findById(req.params.id);
        res.json(Salle);
    } catch (error) {
            res.status(404).send(error.message)
    }
}


exports.addSalle = async (req, res) => {
    try {
        const userRole = req.user.role;
        console.log(userRole);
        console.log(req.user);
        if (userRole !== 'admin') {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }

        const { name, capacity, equipment, available } = req.body;
        
        const newSalle = new salle({ name, capacity, equipment, available  });
        await newSalle.save();
        const salles = await salle.find();
        res.render('salles', { salles }); 
    
    } catch (error) {
        res.status(404).send(error.message)
    }   
}

 
exports.getUpdateSalle = async (req, res) => {
    try {
 
      if (!req.user) {
        return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette ressource." });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
    }
      const Salle = await salle.findById(req.params.id);
      if (!Salle) {
        return res.status(404).json({ message: 'Salle not found' });
      }
      res.render('updateSalle', {salle: Salle }); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

exports.updateSalle = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }

        const { name, capacity, equipment } = req.body;
        const available = req.body.available === 'on';
        await salle.findByIdAndUpdate(req.params.id, { name, capacity, equipment, available }, { new: true });
        const salles = await salle.find();
        res.render('salles', { salles });

    } catch (error) {
        res.status(404).send(error.message)
    }
}


exports.deleteSalle = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
        }
        
        await salle.findByIdAndDelete(req.params.id);
        const salles = await salle.find();
        res.render('salles', { salles }); 

    } catch (error) {
        res.status(404).send(error.message)
    }
}


