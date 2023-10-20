const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Olá mundo, Hello world')
});

app.listen(port, () => {
    console.log(` App rodando na porta ${port}`)
})