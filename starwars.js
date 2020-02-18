// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

//Manter formatação de texto para exibiçao na tag <pre>

//para usar servidor $ python -m SimpleHTTPServer no diretorio dos arquivos

let dados = []; //object
let sinopse = document.querySelector('.reading-animation') //corpo do texto

let franquia = document.querySelector('#movies ul') //lista filmes
franquia.innerHTML = ''

//ao carregar a pagina
$.ajax({
    url: "https://swapi.co/api/films",
    cors: true,
    success: function(response) {
        console.log(response) //retorna diretamente objeto
        for (let i of response.results) {
            dados.push(i)
        }

        //altera o array original
        dados.sort(compare);

        for (let x of dados) {
            console.log(x.episode_id, x.title)
            franquia.innerHTML += `<li id="ep${x.episode_id}">Episode ${convertToRoman(x.episode_id)}</li>`
        }

        sinopse.innerHTML = `
            Episode ${convertToRoman(dados[0].episode_id)}
            ${dados[0].title}

            ${dados[0].opening_crawl}
        `; //texto inicial

        AtivarLista();
    }
});


function AtivarLista() {
    //para cada child(<li> de franquia ul)
    for (let i of franquia.childNodes) {
        i.addEventListener('click', function(e) {
            //Ex.: i.id = 'ep6' => i.id[2] = '6' => -1 = pos 5
            sinopse.innerHTML = `
                Episode ${convertToRoman(dados[i.id[2] - 1].episode_id)}
                ${dados[i.id[2] - 1].title}

                ${dados[i.id[2] - 1].opening_crawl}
            `;
        })
    }
}

//auxiliar para sort - ordenar filmes
function compare(a, b) {
    if (a.episode_id > b.episode_id) return 1;
    if (b.episode_id > a.episode_id) return -1;

    return 0;
}

//auxiliar para numeros romanos - Apenas exibição
function convertToRoman(num) {
    let roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let str = '';

    for (let i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }
    return str;
}