const { default: axios } = require('axios');
const fs = require('fs');

const caminhoDoArquivo = './tmp/file.csv';

function importCsvToApi () {


    // ler o arquivo csv
    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {

        if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return;
        }
    
        const linhas = data.split('\n');
    
        // para cada linha do csv chamas a api (POST) do mbrconnect para criar um novo registro
        linhas.forEach((linha, indice) => {

            const url = 'http://localhost:8000/api/LBL_LABELSTR';
            const data = {
                "name": "João da Silva",
                "email": "",
                "company": "Empresa",
                "job_title": "Cargo",
                "city": "São Paulo",
                "state": "SP",
                "country": "Brasil",
                "source": "Website",
                "tags": "tag1, tag2"
            };

            // chamada da api com axios
            axios.post(url, data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

          // Aqui você pode fazer o que quiser com cada linha
          console.log(`Linha ${indice + 1}: ${linha}`);
        });
      });

    return console.log('deu certo');
}

console.log(importCsvToApi())