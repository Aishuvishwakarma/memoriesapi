
const UserModel = require('../models/UserSchema')
const PostModel = require('../models/PostSchema')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { json } = require('express');

exports.HomePageController = (req, res) => {
    res.status(200).json({ message: 'this is testing route of Memories api' })
}

exports.SignInController = (req, res) => {
    const { username, password } = req.body
    UserModel.findOne({ username })
        .then(user => {
            if (!user) return res.status(401).json({ message: 'user not found' }) 
            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(203).json({message: 'Password incorrect'});
               const token = jwt.sign({user},process.env.JWT_SEC_KEY,{expiresIn:'1h'})
               req.header('auth-token',token)
                res.status(200).json({ message: 'user Loggedin Successfully',token }) 
            })
        })
        .catch(() => res.status(500).josn({ message: 'internal server error' }))

}

exports.SignUpController = (req, res) => {
    const { username, password } = req.body
    const NewUser = new UserModel({ username,password })
    UserModel.findOne({ username })
        .then(user => {
            if (user) return res.status(302).json({ message: 'user already exists' })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(NewUser.password,salt, (err, hash) => {
                    if (err) throw err
                    NewUser.password = hash;
                    NewUser.save()
                    .then(user=>res.status(201).json({ message: 'User Created Successfully', user }))
                    .catch(error=>res.status(500).json({ message: 'internal server error', error: error }))
                })
            })

        })
        .catch((error) => res.status(500).josn({ message: 'Internal server error', error: error }))
}

