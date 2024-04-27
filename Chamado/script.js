document.addEventListener('DOMContentLoaded', async function() {
    const tabelaChamados = document.getElementById('corpoTabelaChamados');

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
                <td>${chamado.e_mail}</td>
                <td>${chamado.assunto}</td>
                <td>${chamado.mensagem}</td>
                <td>${chamado.resposta || 'Nenhuma resposta ainda'}</td>
                <td>${chamado.finalizado ? 'Sim' : 'Não'}</td>
                <td>
                    <button onclick="toggleRespostaForm(this)">Responder</button>
                    <form class="formResposta" style="display: none;">
                        <div>
                            <label for="inputResposta_${chamado.objectId}">Resposta:</label>
                            <textarea id="inputResposta_${chamado.objectId}" class="inputResposta" name="resposta" rows="4" required></textarea>
                        </div>
                        <button type="submit" onclick="responderChamado('${chamado.objectId}', document.getElementById('inputResposta_${chamado.objectId}').value)">Enviar Resposta</button>
                    </form>
                </td>
            `;
            tabelaChamados.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao carregar os detalhes do chamado:', error);
    }
});

function toggleRespostaForm(button) {
    const formResposta = button.nextElementSibling;
    formResposta.style.display = formResposta.style.display === 'none' ? 'block' : 'none';
}

async function responderChamado(chamadoId, resposta) {
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
        location.reload(); // Reload the page to reflect the changes
    } catch (error) {
        console.error('Erro ao enviar a resposta e finalizar o chamado:', error);
    }
}

