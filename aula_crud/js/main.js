var names = [];
var nameInput = null;
var isEditing = false;
start();

function start() {
  nameInput = document.querySelector('#nameInput');

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  //Não recarregar pagina
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  nameInput.addEventListener('keyup', handleTyping);
  nameInput.focus();

  function updateName(newName) {
    names[currentIndex] = newName;

    isEditing = false;
  }

  function insertTypedName(name) {
    names.push(name);
  }

  function handleTyping(event) {
    //pegar a tecla enter
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
        console.log('editando');
      } else {
        insertTypedName(event.target.value); //pegar o conteudo da box
        console.log('inserindo');
      }
      render();
    }
  }
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      names.splice(index, 1);
      render();
      console.log('deletou');
    }

    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      nameInput.value = name;
      nameInput.focus();
      currentIndex = index;
      isEditing = true;
    }
    var span = document.createElement('span');
    span.textContent = name;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = ''; //Para não duplicar a lista
  var ul = document.createElement('ul');

  for (var i = 0; i < names.length; i++) {
    var currentName = names[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  // Funcao para limpar a caixa input
  nameInput.value = '';
  nameInput.focus();
}
