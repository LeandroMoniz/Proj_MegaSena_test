const axios = require('axios');
const express = require('express');
const https = require('https');





module.exports = class megaController {

    static async ResultadoAtual(req, res) {

        // Definir a URL da API da Mega Sena
        const megaSenaApiUrl = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena';

        const config = {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        };

        try {
            // Fazer uma requisição GET para a API
            const resposta = await axios.get(megaSenaApiUrl, config);

            // Retornar os resultados
            res.status(200).send(resposta.data);
        } catch (erro) {
            console.error('Erro ao obter resultados da Mega Sena:', erro.message);
            throw erro;
        }
    }

    static async ResultadoPorJogo(req, res) {
        const jogo = req.query.jogo

        console.log("jogo", jogo)

        // Definir a URL da API da Mega Sena
        const megaSenaApiUrl = `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/${jogo}`;

        const config = {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        };

        try {
            // Fazer uma requisição GET para a API
            const resposta = await axios.get(megaSenaApiUrl, config);

            // Retornar os resultados
            res.status(200).send(resposta.data);
        } catch (erro) {
            console.error('Erro ao obter resultados da Mega Sena:', erro.message);
            throw erro;
        }
    }

    static async getResultadoSequecia(req, res) {
        const readline = require("readline")

        const fs = require("fs");

        const line = readline.createInterface({
            input: fs.createReadStream("./public/mega.csv")
        })

        line.on("line", (data) => {
            let csv = data.split(";");
        })

        const sequentialCounts = {}; // Objeto para rastrear a contagem de sequências
        const sequenceLength = 1; // Tamanho da sequência desejada

        line.on("line", (data) => {
            const numbers = data.split(";").slice(2).map(Number); // Números começam a partir da terceira posição
            //console.log(numbers)

            let sequenceCount = 0;

            for (let i = 0; i < numbers.length; i++) {
                const num = numbers[i];
                //console.log(num)

                if (num >= 1 && num <= 60) {
                    sequenceCount++;

                    if (sequenceCount === sequenceLength) {
                        const sequence = numbers.slice(i - sequenceLength + 1, i + 1).join(",");

                        //console.log(sequence, "aqui")

                        if (sequentialCounts[sequence]) {
                            sequentialCounts[sequence]++;

                        } else {
                            sequentialCounts[sequence] = 1;

                        }
                    }
                } else {
                    sequenceCount = 0;
                }
            }
        });

        line.on("close", () => {
            console.log(sequentialCounts)
            // Encontre as 6 sequências mais frequentes
            const sortedSequences = Object.keys(sequentialCounts).sort((a, b) => sequentialCounts[b] - sequentialCounts[a]);
            const topSequences = sortedSequences.slice(0, 6);


            const result = [];

            topSequences.forEach((sequence, index) => {
                const count = sequentialCounts[sequence];
                result.push(`Sequência ${index + 1}: ${sequence} (${count} vezes)`);

            });

            res.json(result);
        });
    }

    static async






}


// const express = require('express')
// const app = express()
// const port = 5000
// const sequentialCounts = {}; // Objeto para rastrear a contagem de sequências
// const sequenceLength = 1; // Tamanho da sequência desejada




// app.get('/resultado', (req, res) => {
//     const readline = require("readline")

//     const fs = require("fs");

//     const line = readline.createInterface({
//         input: fs.createReadStream("./public/mega.csv")
//     })

//     line.on("line", (data) => {
//         let csv = data.split(";");
//     })

//     const numberToSearch = req.query.number

//     if (isNaN(numberToSearch)) {
//         return res.status(400).json({ error: "Número não especificado na URL." });
//     }

//     line.on("line", (data) => {
//         const numbers = data.split(";").slice(2).map(Number);

//         for (let i = 0; i < numbers.length; i++) {
//             if (numbers[i] == numberToSearch) {
//                 sequentialCounts[numberToSearch] = (sequentialCounts[numberToSearch] || 0) + 1;
//             }
//         }
//     });

//     line.on("close", () => {
//         // Enviar a resposta de volta para o cliente (Postman)
//         res.json({ count: sequentialCounts[numberToSearch] || 0 });
//     });



// });

// app.get('/resultadotwo', (req, res) => {
//     const readline = require("readline")

//     const fs = require("fs");
//     const sequentialCounts = {};

//     const line = readline.createInterface({
//         input: fs.createReadStream("./public/mega.csv")
//     })

//     line.on("line", (data) => {
//         let csv = data.split(";");
//     })


//     const number1 = req.query.number1;
//     const number2 = req.query.number2;

//     console.log(number1)
//     console.log(number2)


//     if (isNaN(number1) || isNaN(number2)) {
//         return res.status(400).json({ error: "Número não especificado na URL." });
//     }

//     line.on("line", (data) => {
//         const numbers = data.split(";").slice(2).map(Number);

//         for (let i = 0; i < numbers.length - 1; i++) {
//             if (numbers[i] == number1 && numbers[i + 1] == number2) {
//                 const sequence = `${number1}-${number2}`;
//                 sequentialCounts[sequence] = (sequentialCounts[sequence] || 0) + 1;
//             }
//         }
//     });

//     line.on("close", () => {
//         // Enviar a resposta de volta para o cliente (Postman)
//         const sequence = `${number1}-${number2}`;
//         res.json({ count: sequentialCounts[sequence] || 0 });
//     });



// });

// app.get('/resultadothree', (req, res) => {
//     const readline = require("readline")

//     const fs = require("fs");
//     const sequentialCounts = {};

//     const line = readline.createInterface({
//         input: fs.createReadStream("./public/mega.csv")
//     })


//     line.on("line", (data) => {
//         let csv = data.split(";");
//     })


//     const number1 = req.query.number1;
//     const number2 = req.query.number2;
//     const number3 = req.query.number3;

//     console.log(number1)
//     console.log(number2)
//     console.log(number3)


//     if (isNaN(number1) || isNaN(number2)) {
//         return res.status(400).json({ error: "Número não especificado na URL." });
//     }

//     line.on("line", (data) => {
//         const numbers = data.split(";").slice(2).map(Number);

//         for (let i = 0; i < numbers.length - 2; i++) {
//             if (numbers[i] == number1 && numbers[i + 1] == number2 && numbers[i + 2] == number3) {
//                 const sequence = `${number1}-${number2}-${number3}`;
//                 sequentialCounts[sequence] = (sequentialCounts[sequence] || 0) + 1;
//             }
//         }
//     });

//     line.on("close", () => {
//         // Enviar a resposta de volta para o cliente (Postman)
//         const sequence = `${number1}-${number2}-${number3}`;
//         res.json({ count: sequentialCounts[sequence] || 0 });
//     });



// });


// app.get('/resultadoteste', (req, res) => {
//     const readline = require("readline")

//     const fs = require("fs");
//     const sequentialCounts = {};

//     const line = readline.createInterface({
//         input: fs.createReadStream("./public/mega.csv")
//     })

//     line.on("line", (data) => {
//         let csv = data.split(";");
//     })


//     const numbersToCheck = [
//         req.query.number1,
//         req.query.number2,
//         req.query.number3
//     ];

//     console.log(numbersToCheck)


//     if (numbersToCheck.some(isNaN)) {
//         return res.status(400).json({ error: "Números não especificados na URL." });
//     }

//     line.on("line", (data) => {
//         const numbers = data.split(";").slice(2).map(Number);

//         for (let i = 0; i < numbers.length - 5; i++) {
//             const sequenceToCheck = numbers.slice(i, i + 3);

//             if (arraysEqual(sequenceToCheck, numbersToCheck)) {
//                 const sequence = numbers.slice(i, i + 6).join('-');
//                 sequentialCounts[sequence] = (sequentialCounts[sequence] || 0) + 1;
//             }
//         }
//     });

//     line.on("close", () => {
//         // Enviar a resposta de volta para o cliente (Postman)
//         const sequence = numbersToCheck.join('-');
//         res.json({ count: sequentialCounts[sequence] || 0 });
//     });



// });

// // Função para verificar igualdade entre arrays
// function arraysEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) return false;
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i] !== arr2[i]) return false;
//     }
//     return true;
// }

// app.listen(port, () => {
//     console.log(` App rodando na porta ${port}`)
// })