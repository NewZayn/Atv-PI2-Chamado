const tarefaURL = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
    "X-Parse-Application-Id": "lknxQw2TygNmmkTwsY02D09lxXlzLklEUEPnuZ1I",
    "X-Parse-REST-API-Key": "mSwbnPjpwvDwCmX05NASyClqUYRpaK64A6k1aMMM",
};

const formChamado = document.getElementById("formChamado");

formChamado.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    const formData = new FormData(formChamado);
    const data = Object.fromEntries(formData.entries()); // Converte o FormData para um objeto JavaScript

    try {
        const response = await fetch('https://parseapi.back4app.com', {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'lknxQw2TygNmmkTwsY02D09lxXlzLklEUEPnuZ1I',
                'X-Parse-REST-API-Key': 'mSwbnPjpwvDwCmX05NASyClqUYRpaK64A6k1aMMM',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Chamado enviado com sucesso!');
        } else {
            console.error('Erro ao enviar chamado:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao enviar chamado:', error.message);
    }
  
    // Exemplo de código para exibir os dados do formulário no console
    formData.forEach(function(value, key) {
        console.log(key + ': ' + value);
    });
});
// Captura o elemento h1 pelo ID
const titulo = document.getElementById('titulo');

// Verifica se o elemento foi encontrado
if (titulo) {
    // Altera o texto do elemento h1
    titulo.textContent = 'Conexão com JavaScript bem-sucedida!';
} else {
    console.error('Elemento h1 não encontrado!');
}


