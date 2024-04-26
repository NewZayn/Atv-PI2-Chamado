async function carregarDetalhesChamado() {
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
        <td><button onclick="abrirFormularioResposta('${chamado.objectId}')">Responder</button></td>
      `;
      tabelaChamados.appendChild(linha);
    });
  } catch (error) {
    console.error('Erro ao carregar os detalhes do chamado:', error);
  }
}

function abrirFormularioResposta(idChamado) {
  // Cria um novo elemento de formulário
  const form = document.createElement('form');
  form.id = 'formResposta';

  // Cria um novo elemento de área de texto
  const textarea = document.createElement('textarea');
  textarea.id = 'inputResposta';
  textarea.name = 'resposta';
  textarea.rows = '4';
  textarea.required = true;

  // Cria um novo elemento de botão
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Enviar Resposta';

  // Adiciona o textarea e o botão ao formulário
  form.appendChild(textarea);
  form.appendChild(button);

  // Adiciona um ouvinte de evento ao formulário para lidar com o envio do formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    enviarResposta(idChamado, textarea.value); // Chama a função enviarResposta
  });

  // Adiciona o formulário ao corpo do documento
  document.body.appendChild(form);
}

async function enviarResposta(idChamado, resposta) {
  try {
    const response = await fetch(`https://parseapi.back4app.com/classes/Chamado/${idChamado}`, {
      method: 'PUT',
      headers: {
        'X-Parse-Application-Id': 'RVSqnwoDE2zJ9QRCxCfrG9szWYcIOlKDGt4gwbUR',
        'X-Parse-REST-API-Key': 'jQ6avsMD5F4M1o6jZpeuLGRwxCN9WXx748mA3dqs',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resposta: resposta })
    });

    if (response.ok) {
      console.log('Resposta enviada com sucesso!');
    } else {
      console.error('Erro ao enviar resposta:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao enviar resposta:', error.message);
  }
}

     


