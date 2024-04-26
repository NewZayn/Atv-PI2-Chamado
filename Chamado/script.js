document.addEventListener('DOMContentLoaded', async function() {
    const tabelaChamados = document.getElementById('corpoTabelaChamados');
    const formResposta = document.getElementById('formResposta');

    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Chamado', {
            headers: {
                'X-Parse-Application-Id': 'RVSqnwoDE2zJ9QRCxCfrG9szWYcIOlKDGt4gwbUR',
                'X-Parse-REST-API-Key': 'jQ6avsMD5F4M1o6jZpeuLGRwxCN9WXx748mA3dqs'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Verificar se 'chamados' é um array
        const chamados = Array.isArray(data) ? data : data.results;

        // Limpar a tabela antes de adicionar novos chamados
        tabelaChamados.innerHTML = '';

        // Montar os detalhes do chamado na tabela
        chamados.forEach(chamado => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${chamado.nome}</td>
                <td>${chamado.email}</td>
                <td>${chamado.assunto}</td>
                <td>${chamado.mensagem}</td>
                <td>${chamado.resposta || 'Nenhuma resposta ainda'}</td>
                <td>${chamado.finalizado ? 'Sim' : 'Não'}</td>
                <td>
                    <button onclick="responderChamado('${chamado.objectId}')">Responder</button>
                </td>
            `;
            tabelaChamados.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao carregar os detalhes do chamado:', error);
    }

    // Função para responder ao chamado
    async function responderChamado(chamadoId) {
    const resposta = prompt('Digite a resposta para o chamado:');
    if (resposta !== null) {
        try {
            const response = await fetch(`https://parseapi.back4app.com/classes/Chamado/${chamadoId}`, {
                method: 'PUT',
                headers: {
                    'X-Parse-Application-Id': 'RVSqnwoDE2zJ9QRCxCfrG9szWYcIOlKDGt4gwbUR',
                    'X-Parse-REST-API-Key': 'jQ6avsMD5F4M1o6jZpeuLGRwxCN9WXx748mA3dqs',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    resposta: resposta,
                    finalizado: true
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Resposta enviada e chamado finalizado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a resposta e finalizar o chamado:', error);
        }
    }
}


    // Event listener para o formulário de resposta
    formResposta.addEventListener('submit', async function(event) {
        event.preventDefault();
        const resposta = document.getElementById('inputResposta').value.trim();

        if (resposta !== '') {
            try {
                // Aqui você pode enviar a resposta para o servidor, se necessário
                console.log('Resposta enviada:', resposta);
            } catch (error) {
                console.error('Erro ao enviar a resposta:', error);
            }
        } else {
            alert('Por favor, insira uma resposta.');
        }
    });
});



     


