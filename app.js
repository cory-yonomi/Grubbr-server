const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')

app.use(cors())

// body parser middleware
app.use(express.urlencoded({extended: false}))

app.use('/users', require('./controllers/user'))

app.get('/', (req, res) => {
    res.json({message: 'Grubbr Server Home Route'})
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Listening on Port 8000')
})