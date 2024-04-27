const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user');


exports.registerPage = (req, res) => {
    res.render('register');
};

exports.register = async (req, res) => {
    try {
        console.log(req.body);
    
        const {id,email,password,role,username,phone}=req.body;
        const user = new User({id,email,password,role,username,phone});
        await user.save();
        res.status(201).redirect('login');
    } catch (error) {
        res.status(400).send(error.message)
    }
}


exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send('user not found')
        }
        const isPasswordMatch =await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
        return res.status(401).send('invalid password')
       }
      
       const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
       
      res.cookie('authToken', token, { httpOnly: true });
     
       res.redirect('/salle/');
       } catch (err) {
           res.status(400).send(err.message)
       }
   }