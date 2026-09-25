const questions = [
  {
    q: "¿Qué dispositivo se utiliza para conectar varios equipos dentro de una red local?",
    a: ["Monitor", "Switch", "Teclado", "Disco duro"],
    correct: 1,
    explain: "Un switch conecta dispositivos dentro de una red local y permite que intercambien datos."
  },
  {
    q: "¿Qué significa IP en redes informáticas?",
    a: ["Internet Protocol", "Internal Password", "Internet Program", "Interface Port"],
    correct: 0,
    explain: "IP significa Internet Protocol y es una pieza básica de la comunicación entre dispositivos en red."
  },
  {
    q: "¿Cuál de estas contraseñas parece más resistente?",
    a: ["123456", "password", "valencia2026", "T8#kP2!mQ9"],
    correct: 3,
    explain: "Una contraseña larga y poco predecible suele ser más resistente que palabras o patrones comunes."
  },
  {
    q: "¿Qué sistema operativo es muy habitual en servidores?",
    a: ["Linux", "Android TV", "iOS", "watchOS"],
    correct: 0,
    explain: "Linux se utiliza ampliamente en servidores y entornos de infraestructura."
  },
  {
    q: "¿Para qué sirve un servidor web?",
    a: ["Para alojar y entregar contenido web", "Para cargar un móvil", "Para imprimir", "Para conectar un teclado"],
    correct: 0,
    explain: "Un servidor web entrega páginas y recursos a los navegadores que los solicitan."
  },
  {
    q: "¿Cuál de estas áreas forma parte del proyecto intermodular de ASIR?",
    a: ["Redes", "Seguridad", "Bases de datos", "Todas las anteriores"],
    correct: 3,
    explain: "El proyecto integra redes, sistemas, seguridad, web y bases de datos."
  },
  {
    q: "¿Qué deberías hacer antes de abrir un enlace sospechoso recibido por correo?",
    a: ["Abrirlo rápido", "Revisar remitente y destino", "Reenviarlo a todos", "Desactivar el antivirus"],
    correct: 1,
    explain: "Conviene comprobar el remitente y el destino real del enlace antes de interactuar con él."
  },
  {
    q: "¿Qué representa mejor el trabajo de ASIR?",
    a: ["Solo reparar ordenadores", "Administrar sistemas, redes y servicios", "Solo crear videojuegos", "Solo diseñar logotipos"],
    correct: 1,
    explain: "ASIR se centra en administrar sistemas, redes y servicios informáticos, entre otras áreas relacionadas."
  },
  {
    q: "¿Qué es una copia de seguridad (backup)?",
    a: ["Una copia de los datos para recuperarlos si se pierden", "Un tipo de virus", "Un cable de red", "Un programa de diseño"],
    correct: 0,
    explain: "Una copia de seguridad guarda una réplica de los datos para poder recuperarlos ante un fallo o pérdida."
  },
  {
    q: "¿Qué es una base de datos?",
    a: ["Un conjunto organizado de información", "Un tipo de router", "Un antivirus", "Un lenguaje de programación"],
    correct: 0,
    explain: "Una base de datos organiza y almacena información para poder consultarla y gestionarla fácilmente."
  }
];

let current = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById('quizStart');
const questionScreen = document.getElementById('quizQuestion');
const resultScreen = document.getElementById('quizResult');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const questionText = document.getElementById('questionText');
const answers = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('scoreText');
const progressBar = document.getElementById('progressBar');

function showScreen(screen) {
  [startScreen, questionScreen, resultScreen].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;
  showScreen(questionScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  nextBtn.classList.add('hidden');
  feedback.textContent = '';
  answers.innerHTML = '';

  const item = questions[current];
  questionText.textContent = item.q;
  progressText.textContent = `Pregunta ${current + 1} de ${questions.length}`;
  scoreText.textContent = `${score} puntos`;
  progressBar.style.width = `${((current) / questions.length) * 100}%`;

  item.a.forEach((text, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.textContent = `${String.fromCharCode(65 + index)}) ${text}`;
    btn.addEventListener('click', () => chooseAnswer(index, btn));
    answers.appendChild(btn);
  });
}

function chooseAnswer(index, selectedButton) {
  if (answered) return;
  answered = true;

  const item = questions[current];
  const buttons = [...answers.querySelectorAll('.answer')];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === item.correct) button.classList.add('correct');
  });

  if (index === item.correct) {
    score += 1;
    selectedButton.classList.add('correct');
    feedback.textContent = `Correcto. ${item.explain}`;
  } else {
    selectedButton.classList.add('wrong');
    feedback.textContent = `No exactamente. ${item.explain}`;
  }

  scoreText.textContent = `${score} puntos`;
  nextBtn.classList.remove('hidden');
  nextBtn.textContent = current === questions.length - 1 ? 'Ver resultado' : 'Siguiente';
}

function nextQuestion() {
  current += 1;
  if (current >= questions.length) {
    showResult();
    return;
  }
  renderQuestion();
}

function showResult() {
  showScreen(resultScreen);
  progressBar.style.width = '100%';
  document.getElementById('resultNumber').textContent = `${score}/${questions.length}`;

  const title = document.getElementById('resultTitle');
  const text = document.getElementById('resultText');

  if (score <= 3) {
    title.textContent = 'Explorador tecnológico';
    text.textContent = 'Buen comienzo. El stand de ASIR es un buen sitio para descubrir cómo funcionan redes y sistemas.';
  } else if (score <= 5) {
    title.textContent = 'Técnico en prácticas';
    text.textContent = 'Ya tienes una buena base. Sigue explorando las demostraciones del stand.';
  } else if (score <= 7) {
    title.textContent = 'Administrador junior';
    text.textContent = 'Muy buen resultado. Parece que la tecnología es lo tuyo.';
  } else if (score <= 9) {
    title.textContent = 'Administrador de sistemas';
    text.textContent = 'Excelente resultado. Dominas muy bien los conceptos básicos de ASIR.';
  } else {
    title.textContent = 'SYSADMIN';
    text.textContent = 'Puntuación perfecta. Has superado el reto ASIR al completo.';
  }
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startQuiz);
