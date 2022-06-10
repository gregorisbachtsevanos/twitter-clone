process.env.NODE_ENV !== "production" ? require("dotenv").config() : void 0;
const mongoose = require('mongoose')

const _ = process.env.DB_ACCESS

mongoose.connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', console.error.bind(console, 'connection error'))
mongoose.connection.once('open', () => console.log('Database connected'))