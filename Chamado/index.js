const formChamado = document.getElementById("formChamado");

formChamado.addEventListener("submit", async (event) => {

    const formData = new FormData(formChamado);
    const data = Object.fromEntries(formData.entries()); // Converte o FormData para um objeto JavaScript

    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Chamado', {
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
});

