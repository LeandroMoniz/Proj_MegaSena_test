const axios = require('axios');
const express = require('express');
const https = require('https');
const moment = require('moment');
const Sequelize = require('sequelize');
//models
const Resultado = require('../models/resultados');
const Ganhadores = require('../models/ganhadores');

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


            let sequenceCount = 0;

            for (let i = 0; i < numbers.length; i++) {
                const num = numbers[i];


                if (num >= 1 && num <= 60) {
                    sequenceCount++;

                    if (sequenceCount === sequenceLength) {
                        const sequence = numbers.slice(i - sequenceLength + 1, i + 1).join(",");

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

    static async postResultadoPorJogo(req, res) {

        const jogo = req.query.jogo


        const temJogo = await Resultado.findOne({ where: { numeroSorteio: jogo } })

        if (temJogo) {
            res.status(402).json({
                message: 'Jogo já gravado',
            });
            return;
        }

        if (!jogo || isNaN(parseInt(jogo))) {
            res.status(400).json({
                message: 'Número de concurso inicial inválido.',
            });
            return;
        }

        // Definir a URL da API da Mega Sena
        const megaSenaApiUrl = `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/${jogo}`;

        const config = {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        };

        try {
            // Fazer uma requisição GET para a API
            const resposta = await axios.get(megaSenaApiUrl, config);

            if (!resposta || !resposta.data || !resposta.data.dezenasSorteadasOrdemSorteio) {
                console.error('Resposta da API não contém os dados esperados:', resposta);
                res.status(500).send('Erro ao obter resultados da Mega Sena');
                return;
            }

            const respostaData = resposta.data;

            const numerosSorteados = respostaData.dezenasSorteadasOrdemSorteio.map(numero => parseInt(numero));
            const numerosSorteadosOrdenado = respostaData.listaDezenas.map(numero => parseInt(numero));

            // Certifique-se de que a dataProximoConcurso seja uma data válida ou null
            const dataApuracao = respostaData.dataApuracao
                ? moment(respostaData.dataApuracao, 'DD/MM/YYYY').toDate()
                : null;
            const dataProximoConcurso = respostaData.dataProximoConcurso
                ? moment(respostaData.dataProximoConcurso, 'DD/MM/YYYY').toDate()
                : null;


            const resultado = await Resultado.create({
                acumulado: respostaData.acumulado,
                dataApuracao: dataApuracao,
                dataProximoConcurso: dataProximoConcurso,
                numeroSorteio: respostaData.numero,
                localSorteio: respostaData.localSorteio,
                nomeMunicipioUFSorteio: respostaData.nomeMunicipioUFSorteio,
                numeroConcursoAnterior: respostaData.numeroConcursoAnterior,
                numeroConcursoProximo: respostaData.numeroConcursoProximo,
                primeiroNumSort: numerosSorteados[0],
                segundoNumSort: numerosSorteados[1],
                terceiroNumSort: numerosSorteados[2],
                quartoNumSort: numerosSorteados[3],
                quintoNumSort: numerosSorteados[4],
                sextoNumSort: numerosSorteados[5],
                primeiroOrd: numerosSorteadosOrdenado[0],
                segundoOrd: numerosSorteadosOrdenado[1],
                terceiroOrd: numerosSorteadosOrdenado[2],
                quartoOrd: numerosSorteadosOrdenado[3],
                quintoOrd: numerosSorteadosOrdenado[4],
                sextoOrd: numerosSorteadosOrdenado[5],
            })

            console.log("resultado", resultado)

            const listaRateioPremio = resposta.data.listaRateioPremio;

            for (const item of listaRateioPremio) {
                await Ganhadores.create({
                    numeroSorteio: respostaData.numero,
                    descricaoFaixa: item.descricaoFaixa,
                    faixa: item.faixa,
                    numeroDeGanhadores: item.numeroDeGanhadores,
                    valorPremio: item.valorPremio,
                })
            }

            // Retornar os resultados
            res.status(200).send(resultado);
        } catch (erro) {
            console.error('Erro ao obter resultados da Mega Sena:', erro.message);
            throw erro;
        }

    }


    static async postResultadoPorPeriodo(req, res) {
        const jogoInicial = req.query.jogoInicial


        const temJogo = await Resultado.findOne({ where: { numeroSorteio: jogoInicial } })

        if (temJogo) {
            res.status(402).json({
                message: 'Jogo já gravado',
            });
            return;
        }

        if (!jogoInicial || isNaN(parseInt(jogoInicial))) {
            res.status(400).json({
                message: 'Número de concurso inicial inválido.',
            });
            return;
        }


        try {

            let jogoAtual = parseInt(jogoInicial);

            while (true) {
                // Verificar se o jogo já foi gravado
                const temJogo = await Resultado.findOne({ where: { numeroSorteio: jogoAtual } });

                if (temJogo) {
                    console.log(`Jogo ${jogoAtual} já gravado. Parando a busca.`);
                    res.status(200).json({
                        message: `Jogo ${jogoAtual} já gravado. Parando a busca.`,
                    });
                    return;
                }


                // Definir a URL da API da Mega Sena
                const megaSenaApiUrl = `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/${jogoAtual}`;

                const config = {
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })
                };

                const resposta = await axios.get(megaSenaApiUrl, config);

                if (!resposta || !resposta.data || !resposta.data.dezenasSorteadasOrdemSorteio) {
                    console.error('Resposta da API não contém os dados esperados:', resposta);
                    res.status(500).send('Erro ao obter resultados da Mega Sena');
                    return;
                }

                const respostaData = resposta.data;

                const numerosSorteados = respostaData.dezenasSorteadasOrdemSorteio.map(numero => parseInt(numero));
                const numerosSorteadosOrdenado = respostaData.listaDezenas.map(numero => parseInt(numero));

                // Certifique-se de que a dataProximoConcurso seja uma data válida ou null
                const dataApuracao = respostaData.dataApuracao
                    ? moment(respostaData.dataApuracao, 'DD/MM/YYYY').toDate()
                    : null;
                const dataProximoConcurso = respostaData.dataProximoConcurso
                    ? moment(respostaData.dataProximoConcurso, 'DD/MM/YYYY').toDate()
                    : null;


                const resultado = await Resultado.create({
                    acumulado: respostaData.acumulado,
                    dataApuracao: dataApuracao,
                    dataProximoConcurso: dataProximoConcurso,
                    numeroSorteio: respostaData.numero,
                    localSorteio: respostaData.localSorteio,
                    nomeMunicipioUFSorteio: respostaData.nomeMunicipioUFSorteio,
                    numeroConcursoAnterior: respostaData.numeroConcursoAnterior,
                    numeroConcursoProximo: respostaData.numeroConcursoProximo,
                    primeiroNumSort: numerosSorteados[0],
                    segundoNumSort: numerosSorteados[1],
                    terceiroNumSort: numerosSorteados[2],
                    quartoNumSort: numerosSorteados[3],
                    quintoNumSort: numerosSorteados[4],
                    sextoNumSort: numerosSorteados[5],
                    primeiroOrd: numerosSorteadosOrdenado[0],
                    segundoOrd: numerosSorteadosOrdenado[1],
                    terceiroOrd: numerosSorteadosOrdenado[2],
                    quartoOrd: numerosSorteadosOrdenado[3],
                    quintoOrd: numerosSorteadosOrdenado[4],
                    sextoOrd: numerosSorteadosOrdenado[5],
                })

                const listaRateioPremio = resposta.data.listaRateioPremio;

                for (const item of listaRateioPremio) {
                    await Ganhadores.create({
                        numeroSorteio: respostaData.numero,
                        descricaoFaixa: item.descricaoFaixa,
                        faixa: item.faixa,
                        numeroDeGanhadores: item.numeroDeGanhadores,
                        valorPremio: item.valorPremio,
                    })
                }

                // Incrementar o número do concurso para a próxima iteração
                jogoAtual++;

                // Aguardar um tempo para não sobrecarregar a API
                // (você pode ajustar o tempo conforme necessário)
                await sleep(3000); // 1 segundo
            }

        } catch (erro) {
            console.error('Erro ao obter resultados da Mega Sena:', erro.message);
            throw erro;
        }

        // Função auxiliar para aguardar um determinado tempo
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }














    }

    static async analiseOne(req, res) {
        try {
            const contagemNumeros = await Resultado.findAll({
                attributes: [
                    'primeiroNumSort',
                    [Sequelize.fn('COUNT', Sequelize.col('primeiroNumSort')), 'ocorrencias'],
                ],
                group: ['primeiroNumSort'],
                order: [[Sequelize.fn('COUNT', Sequelize.col('primeiroNumSort')), 'DESC']],
            });

            const resultados = contagemNumeros.map((resultado) => ({
                numero: resultado.get('primeiroNumSort'),
                ocorrencias: resultado.get('ocorrencias'),
            }));

            res.status(200).json({
                message: 'Contagem de números concluída com sucesso na primeira bola do sorteio',
                data: resultados,
            });


        } catch (erro) {
            console.error('Erro ao analisar números sorteados:', erro);
        }
    }

    static async analiseTwo(req, res) {
        try {
            const contagemNumeros = await Resultado.findAll({
                attributes: [
                    'primeiroOrd',
                    [Sequelize.fn('COUNT', Sequelize.col('primeiroOrd')), 'ocorrencias'],
                ],
                group: ['primeiroOrd'],
                order: [[Sequelize.fn('COUNT', Sequelize.col('primeiroOrd')), 'DESC']],
            });

            const resultados = contagemNumeros.map((resultado) => ({
                numero: resultado.get('primeiroOrd'),
                ocorrencias: resultado.get('ocorrencias'),
            }));

            res.status(200).json({
                message: 'Menor numero entre sorteio quantas vez saiu,',
                data: resultados,
            });


        } catch (erro) {
            console.error('Erro ao analisar números sorteados:', erro);
        }
    }


    static async analiseThree(req, res) {
        try {
            const ocorrenciasPorNumero = {};

            for (let numero = 1; numero <= 60; numero++) {
                const contagem = await Resultado.count({
                    where: {
                        [Sequelize.Op.or]: [
                            { primeiroOrd: numero },
                            { segundoOrd: numero },
                            { terceiroOrd: numero },
                            { quartoOrd: numero },
                            { quintoOrd: numero },
                            { sextoOrd: numero },
                        ],
                    },
                });

                ocorrenciasPorNumero[numero] = contagem;
            }


            res.status(200).json({
                message: 'numeros que sairão mais no ano de 2023',
                data: ocorrenciasPorNumero,
            });
        } catch (erro) {
            console.error('Erro ao analisar números sorteados:', erro);
            res.status(500).json({ error: 'Erro ao analisar números sorteados' });
        }
    }

    static async analiseFour(req, res) {
        try {
            const ocorrenciasPorNumero = {};

            for (let numero = 1; numero <= 60; numero++) {
                const contagem = await Resultado.count({
                    where: {
                        [Sequelize.Op.and]: [
                            {
                                [Sequelize.Op.or]: [
                                    { primeiroOrd: numero },
                                    { segundoOrd: numero },
                                    { terceiroOrd: numero },
                                    { quartoOrd: numero },
                                    { quintoOrd: numero },
                                    { sextoOrd: numero },
                                ]
                            },
                            { acumulado: false },
                        ],

                    },

                });

                ocorrenciasPorNumero[numero] = contagem;
            }


            res.status(200).json({
                message: 'numeros que sairão mais no ano de 2023',
                data: ocorrenciasPorNumero,
            });
        } catch (erro) {
            console.error('Erro ao analisar números sorteados:', erro);
            res.status(500).json({ error: 'Erro ao analisar números sorteados' });
        }
    }

    static async analiseFive(req, res) {
        try {

            const porJogosGanhos = {};

            for (let numero = 1; numero <= 60; numero++) {
                const contagem = await Resultado.count({
                    where: {
                        [Sequelize.Op.and]: [
                            {
                                [Sequelize.Op.or]: [
                                    { primeiroOrd: numero },
                                    { segundoOrd: numero },
                                    { terceiroOrd: numero },
                                    { quartoOrd: numero },
                                    { quintoOrd: numero },
                                    { sextoOrd: numero },
                                ]
                            },
                            { acumulado: false },
                        ],

                    },

                });

                porJogosGanhos[numero] = contagem;
            }

            const ocorrenciasPorNumero = {};

            for (let numero = 1; numero <= 60; numero++) {
                const contagem = await Resultado.count({
                    where: {
                        [Sequelize.Op.or]: [
                            { primeiroOrd: numero },
                            { segundoOrd: numero },
                            { terceiroOrd: numero },
                            { quartoOrd: numero },
                            { quintoOrd: numero },
                            { sextoOrd: numero },
                        ],
                    },
                });

                ocorrenciasPorNumero[numero] = contagem;
            }


            const porcentagens = {};
            for (let numero = 1; numero <= 60; numero++) {
                const acertos = porJogosGanhos[numero];
                const totalOcorrencias = ocorrenciasPorNumero[numero];

                // Evita divisão por zero
                const porcentagem = totalOcorrencias > 0 ? (acertos / totalOcorrencias) * 100 : 0;

                porcentagens[numero] = porcentagem;
            }

            console.log(porcentagens);

            res.status(200).json({
                message: 'Análise concluída com sucesso',
                data: porcentagens,
            });





        } catch (error) {
            console.error('Erro ao analisar números sorteados:', erro);
            res.status(500).json({ error: 'Erro ao analisar números sorteados' });
        }
    }











}


