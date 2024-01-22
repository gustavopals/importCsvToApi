const { default: axios } = require('axios');
const fs = require('fs');

const caminhoDoArquivo = './tmp/file.csv';

async function importCsvToApi() {

    //autenticação na API

    const loginUrl = 'http://localhost:8000/api/login'

    const loginParams = {
        user: 'dev',
        password: '123456',
        rememberUser: false
    } 

    const loginResult = await axios.post(loginUrl, loginParams)
    const token = loginResult.data.token

    console.log(loginResult.data.token)

    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {

        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }

        const linhas = data.split('\n');

        // para cada linha do csv, chama a api (POST) do mbrconnect para criar um novo registro
        linhas.forEach(async (linha, indice) => {

            const url = 'http://localhost:8000/api/LBL_TABLESSTR';

            // const header = {
            //     Authorization: `Bearer ${token}`
            // }

            // Use a função que converte a linha CSV para JSON (substitua conforme necessário)
            const excelData = convertCsvLineToJson(linha);

            const postBody = getBody(excelData)

            console.log(excelData)

            try {
                // chamada da api com axios
                const response = await axios.post(url, postBody, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(`Linha ${indice + 1} - Resposta da API:`, response.data);
            } catch (error) {
                console.error(`Linha ${indice + 1} - Erro na chamada da API:`, error);
            }
            return
        });
    });

    return console.log('Processo concluído');
}

// Função de exemplo para converter uma linha CSV para JSON (ajuste conforme necessário)
function convertCsvLineToJson(csvLine) {
    const [descricao, repairPn, codigoEtiqueta, modelo] = csvLine.split(';');

    return {
        descricao,
        repairPn,
        codigoEtiqueta,
        modelo
    };
}

function getBody({descricao, repairPn, codigoEtiqueta, modelo}) {
    return {
        "labelStructure": {
            "IDLBLTABLE": 3,
            "TABLE_NAME": "RPLABEL",
            "LBL_CODE": "RPLABEL",
            "LBL_NAME": "Repair Part Label",
            "LBL_REVISION": "3",
            "LBL_REVREASON": "Teste inicial",
            "LBL_ADINFO": null,
            "LBL_RPORIENTATION": "Portrait",
            "LBL_CONFIDENTIAL": null,
            "LBL_SVG": null,
            "LBL_ZPL": "\u0010CT~~CD,~CC^~CT~\n^XA\n~TA000\n~JSN\n^LT0\n^MNW\n^MTT\n^PON\n^PMN\n^LH0,0\n^JMA\n^PR4,4\n~SD15\n^JUS\n^LRN\n^CI27\n^PA0,1,1,0\n^XZ\n^XA\n^MMT\n^PW448\n^LL320\n^LS0\n^FT0,36^A0N,25,23^FB433,1,6,C^FH\\^CI28^FD@@CAMPO1@@^FS^CI27\n^FT28,199^A0N,76,74^FH\\^CI28^FD@@CAMPO2@@^FS^CI27\n^FT433,247^A0B,20,20^FH\\^CI28^FD@@CAMPO5@@^FS^CI27\n^FT38,115^BQN,2,2\n^FH\\^FDMA,@@CAMPO2@@                                  1   BR^FS\n^FT38,233^A0N,23,25^FH\\^CI28^FD@@LBL_RASTREA@@^FS^CI27\n^PQ1,,,Y\n^XZ",
            "LBL_QRCODE": null,
            "LBL_RASTREA": "5YY3MM1",
            "LBL_X": "5.6007",
            "LBL_Y": "4.005",
            "LBL_FIELDS": [
                {
                    "IDLBLFIELD": 13,
                    "IDLBLTABLE": 3,
                    "FIELD_NAME": "CAMPO1",
                    "NAME": "Descrição",
                    "COMPONENT": "input",
                    "INPUT_TYPE": "string",
                    "GRID": 12,
                    "ORDER": 2,
                    "IS_NEWLINE": 0,
                    "REQUIRED": 1,
                    "READ_ONLY": 0,
                    "FORMAT": null,
                    "UPPER_CASE": 0,
                    "MIN_LENGTH": null,
                    "MAX_LENGTH": null,
                    "MIN_VALUE": null,
                    "MAX_VALUE": null,
                    "BROWSE_REPORT": 1,
                    "BROWSE_LIST": 0,
                    "INI_VALUE": null,
                    "DIVIDER": null,
                    "HELP": "Inserir a descrição do item de reposição em português, conforme a tela ININSS",
                    "FORMULA": null,
                    "CODE": null,
                    "OPTIONS": null,
                    "LOOKUP_COLUMNS": null,
                    "LOOKUP_SERVICE": null,
                    "LOOKUP_FILTERS": null,
                    "LOOKUP_FIELD_VALUE": null,
                    "LOOKUP_FIELD_LABEL": null,
                    "LOOKUP_FIELD_MAP": null,
                    "USE_CONFERENCE": 1,
                    "USE_EVIDENCE": 0
                },
                {
                    "IDLBLFIELD": 14,
                    "IDLBLTABLE": 3,
                    "FIELD_NAME": "CAMPO2",
                    "NAME": "Repair P/N",
                    "COMPONENT": "input",
                    "INPUT_TYPE": "string",
                    "GRID": 6,
                    "ORDER": 3,
                    "IS_NEWLINE": 1,
                    "REQUIRED": 1,
                    "READ_ONLY": 0,
                    "FORMAT": null,
                    "UPPER_CASE": 0,
                    "MIN_LENGTH": null,
                    "MAX_LENGTH": null,
                    "MIN_VALUE": null,
                    "MAX_VALUE": null,
                    "BROWSE_REPORT": 1,
                    "BROWSE_LIST": 1,
                    "INI_VALUE": null,
                    "DIVIDER": null,
                    "HELP": "Inserir o código do item de reposição o qual consta na tela INBOME e está indicado na evidência. Este PN deverá ser escrito sem seu nível, apenas com \"-\" para identificação comercial.",
                    "FORMULA": null,
                    "CODE": null,
                    "OPTIONS": null,
                    "LOOKUP_COLUMNS": null,
                    "LOOKUP_SERVICE": null,
                    "LOOKUP_FILTERS": null,
                    "LOOKUP_FIELD_VALUE": null,
                    "LOOKUP_FIELD_LABEL": null,
                    "LOOKUP_FIELD_MAP": null,
                    "USE_CONFERENCE": 1,
                    "USE_EVIDENCE": 0
                },
                {
                    "IDLBLFIELD": 15,
                    "IDLBLTABLE": 3,
                    "FIELD_NAME": "CAMPO4",
                    "NAME": "Modelo",
                    "COMPONENT": "input",
                    "INPUT_TYPE": "string",
                    "GRID": 6,
                    "ORDER": 4,
                    "IS_NEWLINE": 0,
                    "REQUIRED": 1,
                    "READ_ONLY": 0,
                    "FORMAT": null,
                    "UPPER_CASE": 0,
                    "MIN_LENGTH": null,
                    "MAX_LENGTH": null,
                    "MIN_VALUE": null,
                    "MAX_VALUE": null,
                    "BROWSE_REPORT": 1,
                    "BROWSE_LIST": 0,
                    "INI_VALUE": null,
                    "DIVIDER": null,
                    "HELP": "Inserir o modelo referente ao item, conforme a tela ININSS",
                    "FORMULA": null,
                    "CODE": null,
                    "OPTIONS": null,
                    "LOOKUP_COLUMNS": null,
                    "LOOKUP_SERVICE": null,
                    "LOOKUP_FILTERS": null,
                    "LOOKUP_FIELD_VALUE": null,
                    "LOOKUP_FIELD_LABEL": null,
                    "LOOKUP_FIELD_MAP": null,
                    "USE_CONFERENCE": 1,
                    "USE_EVIDENCE": 0
                },
                {
                    "IDLBLFIELD": 16,
                    "IDLBLTABLE": 3,
                    "FIELD_NAME": "CAMPO5",
                    "NAME": "Código da Etiqueta",
                    "COMPONENT": "input",
                    "INPUT_TYPE": "string",
                    "GRID": 6,
                    "ORDER": 5,
                    "IS_NEWLINE": 1,
                    "REQUIRED": 1,
                    "READ_ONLY": 0,
                    "FORMAT": null,
                    "UPPER_CASE": 0,
                    "MIN_LENGTH": null,
                    "MAX_LENGTH": null,
                    "MIN_VALUE": null,
                    "MAX_VALUE": null,
                    "BROWSE_REPORT": 1,
                    "BROWSE_LIST": 0,
                    "INI_VALUE": null,
                    "DIVIDER": null,
                    "HELP": "Inserir o código da etiqueta referente ao item de reposição o qual consta na estrutura, conforme a tela INBOME.",
                    "FORMULA": null,
                    "CODE": null,
                    "OPTIONS": null,
                    "LOOKUP_COLUMNS": null,
                    "LOOKUP_SERVICE": null,
                    "LOOKUP_FILTERS": null,
                    "LOOKUP_FIELD_VALUE": null,
                    "LOOKUP_FIELD_LABEL": null,
                    "LOOKUP_FIELD_MAP": null,
                    "USE_CONFERENCE": 1,
                    "USE_EVIDENCE": 0
                },
                {
                    "IDLBLFIELD": 17,
                    "IDLBLTABLE": 3,
                    "FIELD_NAME": "CAMPO6",
                    "NAME": "Anexos",
                    "COMPONENT": "attachment",
                    "INPUT_TYPE": "attachment",
                    "GRID": 6,
                    "ORDER": 6,
                    "IS_NEWLINE": 0,
                    "REQUIRED": 0,
                    "READ_ONLY": 0,
                    "FORMAT": null,
                    "UPPER_CASE": 0,
                    "MIN_LENGTH": null,
                    "MAX_LENGTH": null,
                    "MIN_VALUE": null,
                    "MAX_VALUE": null,
                    "BROWSE_REPORT": 1,
                    "BROWSE_LIST": 0,
                    "INI_VALUE": null,
                    "DIVIDER": null,
                    "HELP": "Inserir as evidências necessárias utilizadas para o preenchimento de todos os campos.",
                    "FORMULA": null,
                    "CODE": null,
                    "OPTIONS": null,
                    "LOOKUP_COLUMNS": null,
                    "LOOKUP_SERVICE": null,
                    "LOOKUP_FILTERS": null,
                    "LOOKUP_FIELD_VALUE": null,
                    "LOOKUP_FIELD_LABEL": null,
                    "LOOKUP_FIELD_MAP": null,
                    "USE_CONFERENCE": 0,
                    "USE_EVIDENCE": 0
                }
            ],
            "LBL_TABSTP": [
                {
                    "ID": 1,
                    "IDLBLTABLE": 3,
                    "ID_FLWSTP": 1,
                    "ID_SECTOR": 1,
                    "STP_ORDER": "1",
                    "USE_CONFERENCE": 0,
                    "STP_NAME": "Registro da Label",
                    "STP_COLOR": "blue",
                    "CURRENT": false,
                    "LAST": false,
                    "SELECTED": true
                },
                {
                    "ID": 2,
                    "IDLBLTABLE": 3,
                    "ID_FLWSTP": 2,
                    "ID_SECTOR": 1,
                    "STP_ORDER": "2",
                    "USE_CONFERENCE": 0,
                    "STP_NAME": "Aprovação do Analista",
                    "STP_COLOR": "orange",
                    "CURRENT": false,
                    "LAST": false,
                    "SELECTED": false
                },
                {
                    "ID": 3,
                    "IDLBLTABLE": 3,
                    "ID_FLWSTP": 3,
                    "ID_SECTOR": 1,
                    "STP_ORDER": "3",
                    "USE_CONFERENCE": 0,
                    "STP_NAME": "Aprovação do Coordenador",
                    "STP_COLOR": "purple",
                    "CURRENT": false,
                    "LAST": false,
                    "SELECTED": false
                },
                {
                    "ID": 4,
                    "IDLBLTABLE": 3,
                    "ID_FLWSTP": 4,
                    "ID_SECTOR": 3,
                    "STP_ORDER": "4",
                    "USE_CONFERENCE": 1,
                    "STP_NAME": "Aprovação da Qualidade",
                    "STP_COLOR": "brown",
                    "CURRENT": false,
                    "LAST": false,
                    "SELECTED": false
                },
                {
                    "ID": 5,
                    "IDLBLTABLE": 3,
                    "ID_FLWSTP": 5,
                    "ID_SECTOR": 1,
                    "STP_ORDER": "5",
                    "USE_CONFERENCE": null,
                    "STP_NAME": "Finalizada",
                    "STP_COLOR": "green",
                    "CURRENT": false,
                    "LAST": false,
                    "SELECTED": false
                }
            ]
        },
        "labelData": {
            "RPLABEL": {
                "CAMPO1": descricao,
                "CAMPO2": repairPn,
                "CAMPO4": codigoEtiqueta,
                "CAMPO5": modelo,
                "CAMPO6": null
            }
        },
        "emailContent": {}
    }
}

console.log(importCsvToApi());
