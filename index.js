const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const userRoute = require('./routes/user')

const app = express()

connectDB().then(
    (res)=> console.log('MongoDB Connected....'),
    (error)=> console.log(error)
)

app.use(cors())
app.use(express.json({extended: false}))

app.get('/', (req, res)=> res.status(200).send('API is running'))
app.use('/api/user', userRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`App is running on Port ${PORT}`));
