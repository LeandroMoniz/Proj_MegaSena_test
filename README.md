---
title: 'Projeto Loterias'
disqus: hackmd
---

Projetos API Filmes
===
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

## Table of Contents

[TOC]

## Beginners Guide


#### Project initialization

1. Download or fork the project!
2. Install Node v18.15.0. 
3. Npm install , npm i command to download project dependencies.
4. Install database PostgreSQL , Port: 5432 , Version: 16.1
5. Create database with "megaProject" name.
6. create a .env file as shown below
6. NPM start para iniciar na porta 5000

#### Inicialização do projeto
1. Baixe ou faça um fork do projeto!
2. Instale o Node v18.15.0
3. Instalação npm , comando npm i para baixar dependências do projeto.
4. Instale o banco de dados PostgreSQL, Porta: 5432, Versão: 16.1
5. Crie um banco de dados denominado megaProject.
6. Crie um arquivo .env conforme mostrado abaixo.
6. O NPM inicia a inicialização na porta 5000

## Arquivo .env


```gherkin=
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=megaProject
DB_PORT=5432

# FIRST ADMIN USER 
FIRST_NAME=admin
FIRST_EMAIL=admin@admin.com
FIRST_PASSWORD=123456
```


User story
---
Endpoints da API
1. Resultado Atual da Mega Sena
Endpoint: GET /mega/resultadoAtual
Descrição: Retorna o resultado mais recente da Mega Sena.
```gherkin=
Feature: Retorna o resultado mais recente 

  {
    "acumulado": false,
    "dataApuracao": "31/12/2023",
    "dataProximoConcurso": "04/01/2024",
    "dezenasSorteadasOrdemSorteio": [
        "24",
        "56",
        "33",
        "48",
        "21",
        "41"
    ],
    "exibirDetalhamentoPorCidade": true,
    "id": null,
    "indicadorConcursoEspecial": 2,
    "listaDezenas": [
        "21",
        "24",
        "33",
        "41",
        "48",
        "56"
    ],
    "listaDezenasSegundoSorteio": null,
    "listaMunicipioUFGanhadores": [
        {
            "ganhadores": 1,
            "municipio": "CANAL ELETRONICO",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "--"
        },
        {
            "ganhadores": 1,
            "municipio": "SALVADOR",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "BA"
        },
        {
            "ganhadores": 1,
            "municipio": "BOM DESPACHO",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "MG"
        },
        {
            "ganhadores": 1,
            "municipio": "REDENCAO",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "PA"
        },
        {
            "ganhadores": 1,
            "municipio": "IPIRA",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "SC"
        }
    ],
    "listaRateioPremio": [
        {
            "descricaoFaixa": "6 acertos",
            "faixa": 1,
            "numeroDeGanhadores": 5,
            "valorPremio": 117778204.25
        },
        {
            "descricaoFaixa": "5 acertos",
            "faixa": 2,
            "numeroDeGanhadores": 1996,
            "valorPremio": 70083.58
        },
        {
            "descricaoFaixa": "4 acertos",
            "faixa": 3,
            "numeroDeGanhadores": 164379,
            "valorPremio": 1215.71
        }
    ],
    "listaResultadoEquipeEsportiva": null,
    "localSorteio": "ESTÚDIO REDE GLOBO",
    "nomeMunicipioUFSorteio": "SÃO PAULO, SP",
    "nomeTimeCoracaoMesSorte":"
    "numero": 2670,
    "numeroConcursoAnterior": 2669,
    "numeroConcursoFinal_0_5": 2675,
    "numeroConcursoProximo": 2671,
    "numeroJogo": 2,
    "observacao": "",
    "premiacaoContingencia": null,
    "tipoJogo": "MEGA_SENA",
    "tipoPublicacao": 3,
    "ultimoConcurso": true,
    "valorArrecadado": 2426252750,
    "valorAcumuladoConcurso_0_5": 0,
    "valorAcumuladoConcursoEspecial": 0,
    "valorAcumuladoProximoConcurso": 0,
    "valorEstimadoProximoConcurso": 3000000,
    "valorSaldoReservaGarantidora": 0,
    "valorTotalPremioFaixaUm": 0
}
    
```
2. Resultado por Jogo
Endpoint: GET mega/resultadoPorJogo?jogo=2670
Descrição: Retorna o resultado de um jogo específico da Mega Sena. O número do concurso deve ser passado como parâmetro na query.
```gherkin=
{
    "acumulado": false,
    "dataApuracao": "31/12/2023",
    "dataProximoConcurso": "04/01/2024",
    "dezenasSorteadasOrdemSorteio": [
        "24",
        "56",
        "33",
        "48",
        "21",
        "41"
    ],
    "exibirDetalhamentoPorCidade": true,
    "id": null,
    "indicadorConcursoEspecial": 2,
    "listaDezenas": [
        "21",
        "24",
        "33",
        "41",
        "48",
        "56"
    ],
    "listaDezenasSegundoSorteio": null,
    "listaMunicipioUFGanhadores": [
        {
            "ganhadores": 1,
            "municipio": "CANAL ELETRONICO",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "--"
        },
        {
            "ganhadores": 1,
            "municipio": "SALVADOR",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "BA"
        },
        {
            "ganhadores": 1,
            "municipio": "BOM DESPACHO",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "MG"
        },
        {
            "ganhadores": 1,
            "municipio": "REDENCAO",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "PA"
        },
        {
            "ganhadores": 1,
            "municipio": "IPIRA",
            "nomeFatansiaUL": "",
            "posicao": 1,
            "serie": "",
            "uf": "SC"
        }
    ],
    "listaRateioPremio": [
        {
            "descricaoFaixa": "6 acertos",
            "faixa": 1,
            "numeroDeGanhadores": 5,
            "valorPremio": 117778204.25
        },
        {
            "descricaoFaixa": "5 acertos",
            "faixa": 2,
            "numeroDeGanhadores": 1996,
            "valorPremio": 70083.58
        },
        {
            "descricaoFaixa": "4 acertos",
            "faixa": 3,
            "numeroDeGanhadores": 164379,
            "valorPremio": 1215.71
        }
    ],
    "listaResultadoEquipeEsportiva": null,
    "localSorteio": "ESTÚDIO REDE GLOBO",
    "nomeMunicipioUFSorteio": "SÃO PAULO, SP",
}
```
3. Post Por Jogo - 
Endpoint: POST {{URL}}mega/resultadoPorJogo?jogo=****
Descrição: Grava no banco o valores do jogo , O número do concurso deve ser passado como parâmetro na query.
```gherkin=
{
    "id": 121,
    "acumulado": false,
    "dataApuracao": "2023-12-31T03:00:00.000Z",
    "dataProximoConcurso": "2024-01-04T03:00:00.000Z",
    "numeroSorteio": 2670,
    "localSorteio": "ESTÚDIO REDE GLOBO",
    "nomeMunicipioUFSorteio": "SÃO PAULO, SP",
    "numeroConcursoAnterior": 2669,
    "numeroConcursoProximo": 2671,
    "primeiroNumSort": 24,
    "segundoNumSort": 56,
    "terceiroNumSort": 33,
    "quartoNumSort": 48,
    "quintoNumSort": 21,
    "sextoNumSort": 41,
    "primeiroOrd": 21,
    "segundoOrd": 24,
    "terceiroOrd": 33,
    "quartoOrd": 41,
    "quintoOrd": 48,
    "sextoOrd": 56,
    "updatedAt": "2024-01-02T19:42:11.187Z",
    "createdAt": "2024-01-02T19:42:11.187Z"
}
```


4. Post por período 
Endpoint: POST mega/resultadoPorPeriodo?jogoInicial=****
Descrição: Grava no banco o valores do jogo ate o jogo atual , O número do concurso deve ser passado como parâmetro na query.
```gherkin=
Caso o jogo está gravado 
{
    "message": "Jogo já gravado"
}

CASO JOGO 
{
    "message": "jogo gravado"
}
```

5. Análise Estatística - Contagem de Números na Primeira Bola
Endpoint: GET /mega/analiseOne
Descrição: Realiza uma contagem de quantas vezes cada número foi sorteado como a primeira bola.
```gherkin=
{
    "message": "Contagem de números concluída com sucesso na primeira bola do sorteio",
    "data": [
        {
            "numero": 43,
            "ocorrencias": "6"
        },
        {
            "numero": 46,
            "ocorrencias": "5"
        },
        {
            "numero": 31,
            "ocorrencias": "5"
        },
        {
            "numero": 7,
            "ocorrencias": "5"
        },
        {
            "numero": 10,
            "ocorrencias": "5"
        },
        {
            "numero": 44,
            "ocorrencias": "4"
        },
        {
            "numero": 24,
            "ocorrencias": "4"
        },
        {
            "numero": 59,
            "ocorrencias": "4"
        },
        {
            "numero": 32,
            "ocorrencias": "4"
        },
        {
            "numero": 5,
            "ocorrencias": "3"
        },
        {
            "numero": 22,
            "ocorrencias": "3"
        },
        {
            "numero": 37,
            "ocorrencias": "3"
        },
        {
            "numero": 58,
            "ocorrencias": "3"
        },
        {
            "numero": 57,
            "ocorrencias": "3"
        },
        {
            "numero": 27,
            "ocorrencias": "3"
        },
        {
            "numero": 3,
            "ocorrencias": "3"
        },
        {
            "numero": 14,
            "ocorrencias": "3"
        },
        {
            "numero": 53,
            "ocorrencias": "3"
        },
        {
            "numero": 34,
            "ocorrencias": "3"
        },
        {
            "numero": 54,
            "ocorrencias": "3"
        },
        {
            "numero": 18,
            "ocorrencias": "3"
        },
        {
            "numero": 26,
            "ocorrencias": "2"
        },
        {
            "numero": 41,
            "ocorrencias": "2"
        },
        {
            "numero": 52,
            "ocorrencias": "2"
        },
        {
            "numero": 35,
            "ocorrencias": "2"
        },
        {
            "numero": 45,
            "ocorrencias": "2"
        },
        {
            "numero": 12,
            "ocorrencias": "2"
        },
        {
            "numero": 19,
            "ocorrencias": "2"
        },
        {
            "numero": 36,
            "ocorrencias": "2"
        },
        {
            "numero": 25,
            "ocorrencias": "2"
        },
        {
            "numero": 30,
            "ocorrencias": "2"
        },
        {
            "numero": 49,
            "ocorrencias": "2"
        },
        {
            "numero": 33,
            "ocorrencias": "2"
        },
        {
            "numero": 13,
            "ocorrencias": "2"
        },
        {
            "numero": 23,
            "ocorrencias": "2"
        },
        {
            "numero": 50,
            "ocorrencias": "1"
        },
        {
            "numero": 17,
            "ocorrencias": "1"
        },
        {
            "numero": 39,
            "ocorrencias": "1"
        },
        {
            "numero": 29,
            "ocorrencias": "1"
        },
        {
            "numero": 48,
            "ocorrencias": "1"
        },
        {
            "numero": 56,
            "ocorrencias": "1"
        },
        {
            "numero": 51,
            "ocorrencias": "1"
        },
        {
            "numero": 6,
            "ocorrencias": "1"
        },
        {
            "numero": 15,
            "ocorrencias": "1"
        },
        {
            "numero": 16,
            "ocorrencias": "1"
        },
        {
            "numero": 40,
            "ocorrencias": "1"
        },
        {
            "numero": 60,
            "ocorrencias": "1"
        },
        {
            "numero": 4,
            "ocorrencias": "1"
        },
        {
            "numero": 21,
            "ocorrencias": "1"
        },
        {
            "numero": 47,
            "ocorrencias": "1"
        }
    ]
}
```
6. Análise Estatística - Menor Número entre os Sorteados
Endpoint: GET /mega/analiseTwo
Descrição: Retorna o número que foi sorteado com menor frequência como a primeira bola.
```gherkin=
{
    "message": "Menor numero entre sorteio quantas vez saiu,",
    "data": [
        {
            "numero": 5,
            "ocorrencias": "13"
        },
        {
            "numero": 6,
            "ocorrencias": "11"
        },
        {
            "numero": 3,
            "ocorrencias": "10"
        },
        {
            "numero": 9,
            "ocorrencias": "10"
        },
        {
            "numero": 4,
            "ocorrencias": "9"
        },
        {
            "numero": 2,
            "ocorrencias": "8"
        },
        {
            "numero": 1,
            "ocorrencias": "8"
        },
        {
            "numero": 10,
            "ocorrencias": "8"
        },
        {
            "numero": 7,
            "ocorrencias": "7"
        },
        {
            "numero": 14,
            "ocorrencias": "7"
        },
        {
            "numero": 11,
            "ocorrencias": "5"
        },
        {
            "numero": 8,
            "ocorrencias": "4"
        },
        {
            "numero": 13,
            "ocorrencias": "3"
        },
        {
            "numero": 12,
            "ocorrencias": "3"
        },
        {
            "numero": 20,
            "ocorrencias": "3"
        },
        {
            "numero": 19,
            "ocorrencias": "2"
        },
        {
            "numero": 16,
            "ocorrencias": "2"
        },
        {
            "numero": 23,
            "ocorrencias": "1"
        },
        {
            "numero": 21,
            "ocorrencias": "1"
        },
        {
            "numero": 29,
            "ocorrencias": "1"
        },
        {
            "numero": 17,
            "ocorrencias": "1"
        },
        {
            "numero": 37,
            "ocorrencias": "1"
        },
        {
            "numero": 15,
            "ocorrencias": "1"
        },
        {
            "numero": 18,
            "ocorrencias": "1"
        },
        {
            "numero": 34,
            "ocorrencias": "1"
        }
    ]
}
```
7. Análise Estatística - Números que mais Saíram
Endpoint: GET /mega/analiseThree
Descrição: Retorna a contagem de quantas vezes cada número foi sorteado, considerando todas as bolas.
```gherkin=
{
    "message": "numeros que sairão mais no ano de 2023",
    "data": {
        "1": 8,
        "2": 9,
        "3": 10,
        "4": 11,
        "5": 16,
        "6": 13,
        "7": 12,
        "8": 10,
        "9": 13,
        "10": 19,
        "11": 14,
        "12": 10,
        "13": 16,
        "14": 20,
        "15": 6,
        "16": 11,
        "17": 13,
        "18": 10,
        "19": 8,
        "20": 10,
        "21": 8,
        "22": 14,
        "23": 12,
        "24": 8,
        "25": 15,
        "26": 13,
        "27": 12,
        "28": 10,
        "29": 12,
        "30": 13,
        "31": 10,
        "32": 20,
        "33": 10,
        "34": 18,
        "35": 18,
        "36": 13,
        "37": 11,
        "38": 13,
        "39": 14,
        "40": 6,
        "41": 13,
        "42": 6,
        "43": 14,
        "44": 14,
        "45": 9,
        "46": 15,
        "47": 8,
        "48": 12,
        "49": 12,
        "50": 13,
        "51": 10,
        "52": 11,
        "53": 12,
        "54": 10,
        "55": 8,
        "56": 15,
        "57": 10,
        "58": 15,
        "59": 16,
        "60": 14
    }
}
```
8. Análise Estatística - Números que mais Saíram no Ano de 2023
Endpoint: GET /mega/analiseFour
Descrição: Retorna a contagem de quantas vezes cada número foi sorteado no ano de 2023, excluindo os sorteios acumulados.
```gherkin=
{
    "message": "numeros que sairão mais no ano de 2023",
    "data": {
        "1": 0,
        "2": 0,
        "3": 1,
        "4": 2,
        "5": 5,
        "6": 4,
        "7": 2,
        "8": 2,
        "9": 4,
        "10": 4,
        "11": 6,
        "12": 1,
        "13": 4,
        "14": 6,
        "15": 0,
        "16": 3,
        "17": 3,
        "18": 2,
        "19": 3,
        "20": 1,
        "21": 3,
        "22": 3,
        "23": 4,
        "24": 4,
        "25": 4,
        "26": 3,
        "27": 1,
        "28": 2,
        "29": 1,
        "30": 3,
        "31": 2,
        "32": 3,
        "33": 2,
        "34": 3,
        "35": 1,
        "36": 3,
        "37": 3,
        "38": 2,
        "39": 5,
        "40": 1,
        "41": 1,
        "42": 3,
        "43": 2,
        "44": 1,
        "45": 1,
        "46": 2,
        "47": 5,
        "48": 2,
        "49": 0,
        "50": 4,
        "51": 4,
        "52": 0,
        "53": 1,
        "54": 1,
        "55": 0,
        "56": 1,
        "57": 2,
        "58": 4,
        "59": 3,
        "60": 7
    }
}
```
9. Análise Estatística - Porcentagem de Acertos por Número
Endpoint: GET /mega/analiseFive
Descrição: Retorna a porcentagem de acertos para cada número, considerando apenas os sorteios não acumulados.
```gherkin=
{
    "message": "Análise concluída com sucesso",
    "data": {
        "1": 0,
        "2": 0,
        "3": 10,
        "4": 18.181818181818183,
        "5": 31.25,
        "6": 30.76923076923077,
        "7": 16.666666666666664,
        "8": 20,
        "9": 30.76923076923077,
        "10": 21.052631578947366,
        "11": 42.857142857142854,
        "12": 10,
        "13": 25,
        "14": 30,
        "15": 0,
        "16": 27.27272727272727,
        "17": 23.076923076923077,
        "18": 20,
        "19": 37.5,
        "20": 10,
        "21": 37.5,
        "22": 21.428571428571427,
        "23": 33.33333333333333,
        "24": 50,
        "25": 26.666666666666668,
        "26": 23.076923076923077,
        "27": 8.333333333333332,
        "28": 20,
        "29": 8.333333333333332,
        "30": 23.076923076923077,
        "31": 20,
        "32": 15,
        "33": 20,
        "34": 16.666666666666664,
        "35": 5.555555555555555,
        "36": 23.076923076923077,
        "37": 27.27272727272727,
        "38": 15.384615384615385,
        "39": 35.714285714285715,
        "40": 16.666666666666664,
        "41": 7.6923076923076925,
        "42": 50,
        "43": 14.285714285714285,
        "44": 7.142857142857142,
        "45": 11.11111111111111,
        "46": 13.333333333333334,
        "47": 62.5,
        "48": 16.666666666666664,
        "49": 0,
        "50": 30.76923076923077,
        "51": 40,
        "52": 0,
        "53": 8.333333333333332,
        "54": 10,
        "55": 0,
        "56": 6.666666666666667,
        "57": 20,
        "58": 26.666666666666668,
        "59": 18.75,
        "60": 50
    }
}
```
Contribuindo
Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Crie uma branch para suas alterações e envie um pull request. Se você encontrar problemas ou tiver sugestões, abra uma issue.
