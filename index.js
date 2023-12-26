require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conn = require('./db/conn');

//models
const Resultados = require('./models/resultados')
const Ganhadores = require('./models/ganhadores')

const models = [Resultados, Ganhadores];



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
        for (const model of models) {
            await model.sync();
        }
        app.listen(5000, () => {
            console.log('O servidor está rodando na porta 5000');
        });
    })
    .catch((err) => console.log(err));