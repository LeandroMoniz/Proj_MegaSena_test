require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conn = require('./db/conn');


const app = express();
// Config JSON response
app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Public folder for images
app.use(express.static('public'));

// Routes
const megaRoutes = require('./routes/megaRoutes');

app.use('/mega', megaRoutes);


conn
    .sync()
    //.sync({ force: true })
    .then(async () => {

        app.listen(5000, () => {
            console.log('O servidor está rodando na porta 5000');
        });
    })
    .catch((err) => console.log(err));