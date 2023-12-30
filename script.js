const url = "https://api.cosmicjs.com/v3/buckets/exercicio-2-production/objects?pretty=true&query=%7B%22type%22:%22livros%22%7D&limit=10&read_key=BLbb9Q7XbpNwrtCLuYhPuK5I4eW7auAsLFK51Ti12MdFLWtXSQ&depth=1&props=slug,title,metadata,id,";


function fetchAndDisplayLivros() {
    fetchLivros().then(data => {
        displayLivros(data.objects);
    });
}

// Function to fetch livros
function fetchLivros() {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetching error:', error);
        });
}

//Ordenar Livros
function ordenarELivros() {
    document.getElementById('livros').innerHTML = "";
    
    fetchLivros().then(data => {
        const livrosOrdenados = data.objects.sort((a, b) => {
            const tituloA = a.title.toUpperCase();
            const tituloB = b.title.toUpperCase();
            if (tituloA < tituloB) return -1;
            if (tituloA > tituloB) return 1;
            return 0;
        });

        displayLivros(livrosOrdenados);
    });
}


// Função para mostrar livros
function displayLivros(livros) {
    const livrosconteudo = document.getElementById('livros');
    livros.forEach(livro => {
        const conteudo = document.createElement('div');
        conteudo.className = 'conteudo';
        const imagem = document.createElement('img');
        imagem.className = 'imagem';
        imagem.src = livro.metadata.imagem.url;
        const texto = document.createElement('span');
        texto.className = 'texto';
        texto.innerHTML = `<h3>${livro.title}</h3><p>${livro.metadata.autor}</p>`;
        
        conteudo.appendChild(imagem);
        conteudo.appendChild(texto);
        livrosconteudo.appendChild(conteudo);
    });
}

const botaoOrdenar = document.getElementById('botaoOrdenar');
botaoOrdenar.addEventListener('click', ordenarELivros);
//fetchLivros();
fetchAndDisplayLivros();

/*
function pesquisarObjetos(){
    //limpar os resultados
    document.getElementById('livros').innerHTML = "";

    //valor da barra de pesquisa
    const valorPesquisa = document.getElementById("pesquisarInput").value;
    
    const link = 'https://api.cosmicjs.com/v3/exercicio-2-production/objects?type=livros&read_key=BLbb9Q7XbpNwrtCLuYhPuK5I4eW7auAsLFK51Ti12MdFLWtXSQ&query=${valorPesquisa}';
    //const url = `https://api.cosmicjs.com/v1/SEU_COSMIC_BUCKET/objects?type=seu_tipo&read_key=SEU_COSMIC_READ_KEY&query=${valorPesquisa}`;

    fetch(link)
    .then( response => response.json())

    .then(data => {
        displayResultados(data.objects);
    })
    .catch( error => {
        console.error(error);
    });
}

function displayResultados(objetos) {
    const resultadoslivros = document.getElementById("livros");

    if(objetos.length === 0) {
        resultadoslivros.className='texto';
        resultadoslivros.innerHTML = "Nenhum resultado encontrado.";
    } else {
        objetos.forEach(objeto => {
            
            const resultadoconteudo = document.createElement('div');
            resultadoconteudo.className = 'conteudo';
            const img = document.createElement('img');
            img.className = 'imagem';
            img.src = objeto.metadata.imagem.url;
            const text = document.createElement('span');
            text.className = 'texto';
            text.innerHTML = `<h3>${objeto.title}</h3><p>${objeto.metadata.autor}</p>`;
            
            resultadoconteudo.appendChild(img);
            resultadoconteudo.appendChild(text);
            resultadoslivros.appendChild(conteudo);
        })
    }
}*/