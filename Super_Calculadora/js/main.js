var globalCalculations = [
  {
    id: 1,
    description: 'Soma (a + b)',
    calculationFunction: function sum(a, b) {
      return a + b;
    },
    type: 'a_b',
  },

  {
    id: 2,
    description: 'Subtração (a - b)',
    calculationFunction: function sub(a, b) {
      return a - b;
    },
    type: 'a_b',
  },

  {
    id: 3,
    description: 'Subtração (b - a)',
    calculationFunction: function sub(b, a) {
      return b - a;
    },
    type: 'b_a',
  },

  {
    id: 4,
    description: 'Multiplicação (a * b)',
    calculationFunction: function multiplicate(a, b) {
      return formatNumber(a * b);
    },
    type: 'a_b',
  },

  {
    id: 5,
    description: 'Divisão (a / b)',
    calculationFunction: function division(a, b) {
      return divisionOf(a, b);
    },
    type: 'a_b',
  },

  {
    id: 6,
    description: 'Divisão (b/a)',
    calculationFunction: function division(b, a) {
      return divisionOf(b, a);
    },
    type: 'b_a',
  },

  {
    id: 7,
    description: 'Quadrado de a (a^2)',
    calculationFunction: function quadrado(a) {
      return formatNumber(a ** 2);
    },
    type: 'a',
  },

  {
    id: 8,
    description: 'Quadrado de b (b^2)',
    calculationFunction: function quadrado(b) {
      return formatNumber(b ** 2);
    },
    type: 'b',
  },

  {
    id: 9,
    description: 'Divisores de A',
    calculationFunction: function countDiv(a) {
      return countDivOf(a);
    },
    type: 'a',
  },

  {
    id: 10,
    description: 'Divisores de B',
    calculationFunction: function countDiv(b) {
      return countDivOf(b);
    },
    type: 'b',
  },

  {
    id: 11,
    description: 'Fatorial de A (A!)',
    calculationFunction: function factorial(a) {
      return factorialOf(a);
    },
    type: 'a',
  },

  {
    id: 12,
    description: 'Fatorial de B (B!)',
    calculationFunction: function factorial(b) {
      return factorialOf(b);
    },
    type: 'b',
  },
];

var globalInputA = document.querySelector('#a');
var globalInputB = document.querySelector('#b');

function start() {
  globalInputA.addEventListener('input', handleChangeInputA);
  globalInputB.addEventListener('input', handleChangeInputB);

  calculate();
}

function handleChangeInputA() {
  calculate();
}

function handleChangeInputB() {
  calculate();
}

function calculate() {
  var divCalculations = document.querySelector('#calculations');
  var a = parseInt(globalInputA.value, 10);
  var b = parseInt(globalInputB.value, 10);
  if (isNaN(a)) {
    a = 0;
  }
  if (isNaN(b)) {
    b = 0;
  }

  var innerCalculations = document.createElement('div');

  for (var i = 0; i < globalCalculations.length; i++) {
    var div = document.createElement('div');
    var currentCalculation = globalCalculations[i];
    var type = currentCalculation.type;
    var calculationFunction = currentCalculation.calculationFunction;

    var value = getCalculationFrom(type, calculationFunction, a, b);
    console.log(value);
    var input = document.createElement('input');
    input.type = 'text';
    input.readOnly = true;
    input.value = value;

    var label = document.createElement('label');
    label.innerText = currentCalculation.description;

    div.appendChild(input);
    div.appendChild(label);
    innerCalculations.appendChild(div);
  }

  divCalculations.innerHTML = '';
  divCalculations.appendChild(innerCalculations);
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR').format(number);
}

function countDivOf(number) {
  var divisors = [];
  for (var i = 1; i <= number; i++) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }
  if (divisors.length === 2) {
    return divisors.join(', ') + ' (' + divisors.length + ')' + ' É primo!';
  } else {
    return divisors.join(', ') + ' (' + divisors.length + ')';
  }
}

function divisionOf(number1, number2) {
  if (number2 === 0) {
    return 'Não pode dividir por 0.';
  } else {
    return formatNumber((number1 / number2).toFixed(2));
  }
}

function factorialOf(number) {
  if (number > 21) {
    return 'Número muito grande';
  } else {
    var factorial = 1;
    for (var i = number; i > 1; i--) {
      factorial *= i;
    }

    return formatNumber(factorial);
  }
}

function getCalculationFrom(type, calculationFunction, a, b) {
  switch (type) {
    case 'a':
      value = calculationFunction(a);
      break;

    case 'b':
      value = calculationFunction(b);
      break;

    case 'a_b':
      value = calculationFunction(a, b);
      break;

    case 'b_a':
      value = calculationFunction(b, a);
      break;

    default:
      value = 'O tipo de cálculo não foi identificado';
  }
  return value;
}

start();
