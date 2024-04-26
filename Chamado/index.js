const tarefaURL = "https://parseapi.back4app.com/classes/Chamado";
const headers = {
    "X-Parse-Application-Id": "lknxQw2TygNmmkTwsY02D09lxXlzLklEUEPnuZ1I",
    "X-Parse-REST-API-Key": "JRe8VT03ds0DvVHbHV3py2hOjY0EUIT3FcuTrnBx",
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
                'X-Parse-REST-API-Key': 'JRe8VT03ds0DvVHbHV3py2hOjY0EUIT3FcuTrnBx',
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

