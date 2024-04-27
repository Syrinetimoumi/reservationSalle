const sale = require('../models/salle');
const User = require('../models/user'); 
const Salle = require('../models/salle');
const reservation = require('../models/reservation');




 
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(404).send(error.message)
    }
}


exports.getReservationById = async (req, res) => {
    try {
        const Reserva = await reservation.findById(req.params.id);
        res.json(Reserva);
    } catch (error) {
            res.status(404).send(error.message)
    }
}


exports.getCreate = async (req, res) => {
    try {
        const salles = await sale.find({ available: true });

        res.render('createReservation', { salles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des données.' });
    }
};

exports.create = async (req, res) => {
    try {
        const userId = req.user._id;

        const { salleId, startTime, endTime } = req.body;

        const salle = await sale.findById(salleId);
        if (!salle || salle.available === false) {
            return res.status(400).json({ message: "La salle n'est pas disponible pour la réservation." });
        }
        
            const Reservation = new reservation({ salleId, startTime, endTime });
            await Reservation.save();

            salle.available = false;
            await salle.save();

        res.render('confirmation'); 
     
        
        
    } catch (error) {
       res.status(500).json({ message: 'Erreur serveur lors de la création de la réservation.' });
    }
}


exports.updateReservation = async (req, res) => {
    const { salleId, startTime, endTime } = req.body;
    try {
        const updatedReservation = await reservation.findByIdAndUpdate(req.params.id, { salleId, startTime, endTime }, { new: true });
        
        if (!updatedReservation) {
            return res.status(404).json({ message: "La réservation spécifiée n'a pas été trouvée." });
        }

        res.status(200).json(updatedReservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la réservation.' });
    }
}

exports.getCalendar = async (req, res) => {
    try {
    
      const salles = await sale.find();
  
      
      const salleReservations = await Promise.all(
        salles.map(async (salle) => {
          const reservations = await reservation.find({ salleId: salle._id });
          return { salle, reservations };
        })
      );
  
      res.render('listereservation', { salleReservations }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des salles et des réservations pour le calendrier.' });
    }
  };