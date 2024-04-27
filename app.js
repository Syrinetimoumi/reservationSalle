const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const salleRoutes = require('./routes/salleRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path'); 
const  dotenv = require('dotenv');
dotenv.config()

const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use('/auth', authRoutes);
app.use('/salle', salleRoutes);
app.use('/reservation', reservationRoutes);



const MONGODB_URI=process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000 ;

mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Connected to MongoDb')
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}).catch(err=>{
    console.log('Error connecting to database:',err)
});




