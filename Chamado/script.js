document.addEventListener('DOMContentLoaded', async function() {
    const tabelaChamados = document.getElementById('tabelaChamados');
    const formResposta = document.getElementById('formResposta');

    // Função para carregar os detalhes do chamado
    async function carregarDetalhesChamado() {
        try {
            const response = await fetch('URL_PARA_O_ENDPOINT_DO_CHAMADO');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const chamados = await response.json();

            // Limpar a tabela antes de adicionar novos chamados
            tabelaChamados.innerHTML = '';

            // Montar os detalhes do chamado no HTML
            chamados.forEach(chamado => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${chamado.nome}</td>
                    <td>${chamado.email}</td>
                    <td>${chamado.assunto}</td>
                    <td>${chamado.mensagem}</td>
                    <td>${chamado.resposta || 'Nenhuma resposta ainda'}</td>
                    <td>${chamado.finalizado ? 'Sim' : 'Não'}</td>
                `;
                tabelaChamados.appendChild(linha);
            });
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
                    'X-Parse-Application-Id': 'lknxQw2TygNmmkTwsY02D09lxXlzLklEUEPnuZ1I',
                    'X-Parse-REST-API-Key': 'mSwbnPjpwvDwCmX05NASyClqUYRpaK64A6k1aMMM',
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

