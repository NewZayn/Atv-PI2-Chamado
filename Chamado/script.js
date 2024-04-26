document.addEventListener('DOMContentLoaded', async function() {
    const detalhesChamado = document.getElementById('detalhesChamado');
    const formResposta = document.getElementById('formResposta');

    // Função para carregar os detalhes do chamado
    async function carregarDetalhesChamado() {
        try {
            const response = await fetch('URL_PARA_O_ENDPOINT_DO_CHAMADO');
            const data = await response.json();

            // Montar os detalhes do chamado no HTML
            detalhesChamado.innerHTML = `
                <p><strong>Nome:</strong> ${data.nome}</p>
                <p><strong>E-mail:</strong> ${data.email}</p>
                <p><strong>Assunto:</strong> ${data.assunto}</p>
                <p><strong>Mensagem:</strong> ${data.mensagem}</p>
                <p><strong>Resposta:</strong> ${data.resposta || 'Nenhuma resposta ainda'}</p>
                <p><strong>Finalizado:</strong> ${data.finalizado ? 'Sim' : 'Não'}</p>
            `;
        } catch (error) {
            console.error('Erro ao carregar os detalhes do chamado:', error);
        }
    }

    // Carregar os detalhes do chamado ao carregar a página
    carregarDetalhesChamado();

    // Função para enviar a resposta
    formResposta.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const resposta = formData.get('resposta');

        try {
            const response = await fetch('https://parseapi.back4app.com/classes/Chamado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resposta })
            });

            if (response.ok) {
                console.log('Resposta enviada com sucesso!');
                // Atualizar os detalhes do chamado após enviar a resposta
                carregarDetalhesChamado();
            } else {
                console.error('Erro ao enviar a resposta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar a resposta:', error);
        }
    });
});

