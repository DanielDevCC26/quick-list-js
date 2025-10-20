// Seleciona elementos principais
const inputNovoItem = document.getElementById('novo-item');
const botaoAdicionar = document.querySelector('button[type="button"]');
const lista = document.getElementById('lista');
const mensagem = document.getElementById('mensagem-alerta');

// Função para mostrar alerta visual na parte inferior
function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add('visivel');

  // Remove após 2 segundos
  clearTimeout(mensagem._timeout);
  mensagem._timeout = setTimeout(() => {
    mensagem.classList.remove('visivel');
  }, 2000);
}

// Função para adicionar novo item
function adicionarItem() {
  const textoDigitado = inputNovoItem.value.trim();

  // Impede adicionar item vazio
  if (textoDigitado === '') {
    inputNovoItem.classList.add('erro');
    inputNovoItem.placeholder = 'Digite algo antes de adicionar!';

    setTimeout(() => {
      inputNovoItem.classList.remove('erro');
      inputNovoItem.placeholder = 'Adicione um novo item';
    }, 1500);
    return;
  }

  // Cria elementos do item
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const botaoRemover = document.createElement('button');
  const iconeLixeira = document.createElement('img');

  // Configura o checkbox
  checkbox.type = 'checkbox';
  checkbox.id = textoDigitado.toLowerCase().replace(/\s+/g, '-');
  checkbox.name = checkbox.id;

  // Configura o label
  label.htmlFor = checkbox.id;
  label.textContent = textoDigitado;

  // Configura o botão de remover
  botaoRemover.classList.add('remover');
  botaoRemover.setAttribute('aria-label', `Remover ${textoDigitado}`);
  iconeLixeira.src = 'styles/assets/trash.svg';
  iconeLixeira.alt = 'Remover item';
  iconeLixeira.width = 16;
  botaoRemover.appendChild(iconeLixeira);

  // Evento de remover
  botaoRemover.addEventListener('click', () => {
    li.remove();
    mostrarMensagem(`"${textoDigitado}" foi removido da lista`);
  });

  // Evento de marcar/desmarcar item
  checkbox.addEventListener('change', () => {
    const concluido = checkbox.checked;
    li.classList.toggle('concluido', concluido);
    mostrarMensagem(
      `"${textoDigitado}" foi ${concluido ? 'marcado como concluído' : 'desmarcado'}`
    );
  });

  // Monta a estrutura do item
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(botaoRemover);

  // Adiciona o item à lista
  lista.appendChild(li);

  // Limpa o campo e volta o foco
  inputNovoItem.value = '';
  inputNovoItem.focus();
}

// Adiciona item ao clicar no botão
botaoAdicionar.addEventListener('click', adicionarItem);

// Adiciona item ao pressionar Enter (desktop) ou Enter no teclado mobile
inputNovoItem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // evita envio de formulário em mobile
    adicionarItem();
  }
});