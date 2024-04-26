const formChamado = document.getElementById("formChamado");

formChamado.addEventListener("submit", async (event) => {

    const formData = new FormData(formChamado);
    const data = Object.fromEntries(formData.entries()); // Converte o FormData para um objeto JavaScript

    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Chamado', {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': 'RVSqnwoDE2zJ9QRCxCfrG9szWYcIOlKDGt4gwbUR',
                'X-Parse-REST-API-Key': 'jQ6avsMD5F4M1o6jZpeuLGRwxCN9WXx748mA3dqs',
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

