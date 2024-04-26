async function carregarDetalhesChamado() {
  try {
    const response = await fetch('https://parseapi.back4app.com/classes/Chamado', {
      headers: {
        'X-Parse-Application-Id': 'lknxQw2TygNmmkTwsY02D09lxXlzLklEUEPnuZ1I',
        'X-Parse-REST-API-Key': 'mSwbnPjpwvDwCmX05NASyClqUYRpaK64A6k1aMMM'
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
      `;
      tabelaChamados.appendChild(linha);
    });
  } catch (error) {
    console.error('Erro ao carregar os detalhes do chamado:', error);
  }
}


     


