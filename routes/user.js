const router = require('express').Router();
const bcrypt = require('bcrypt')

const { model } = require('../models/User');
const User = require('../models/User');

router.get('/', async(req, res)=>{
    try {
        const email = 'adsgunasekara18@gmail.com'
        const user = await User.findOne({ email })
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/register', async(req, res)=>{
    try {

        const user = new User({...req.body})

        console.log(user);
        const pin = await bcrypt.hash(user.pin, 10);

        user.pin = pin;
        console.log(user.pin);
        await user.save();
        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/login', async(req, res)=>{
    try {
        const { email, pin } = req.body;

        const user = await User.findOne({ email })
        if(!user) return res.status(404).send("User not found")

        const isMatch = await bcrypt.compare(pin, user.pin);
        if(!isMatch) return res.status(400).send("Invalid credentials")

        return res.status(200).send(user)

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.patch('/withdraw', async(req, res)=>{
    try {
        const email = 'adsgunasekara18@gmail.com' 
        console.log(req.body);
        await User.updateOne({ email }, req.body)
        return res.status(200).send("user Updated")

    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router;