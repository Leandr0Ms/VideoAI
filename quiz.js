const QUESTIONS_PER_RUN = 5;

const questionPool = [
  {
    id: 'digital-definition',
    topic: 'Fundamentos',
    question: 'O que define um vídeo digital?',
    options: [
      'Uma sequência de quadros convertida em bits manipuláveis',
      'Um filme registrado exclusivamente em película analógica',
      'Um conjunto de fotografias impressas organizadas em álbuns',
      'Uma transmissão de rádio codificada em AM'
    ],
    answer: 0
  },
  {
    id: 'frame-rate',
    topic: 'Fundamentos',
    question: 'Qual parâmetro indica quantos quadros são exibidos por segundo?',
    options: ['Resolução', 'Profundidade de cor', 'Taxa de quadros (fps)', 'Bitrate'],
    answer: 2
  },
  {
    id: 'bitrate',
    topic: 'Compressão',
    question: 'O que representa o bitrate de um arquivo de vídeo?',
    options: [
      'Número de pixels em cada quadro',
      'Quantidade de dados transmitidos por segundo',
      'Quantidade de pistas de áudio disponíveis',
      'Velocidade de obturador da câmera'
    ],
    answer: 1
  },
  {
    id: 'interframe',
    topic: 'Compressão',
    question: 'Qual é a principal vantagem da compressão inter-frame?',
    options: [
      'Cada quadro é independente, facilitando cortes',
      'Aproveita semelhanças entre quadros para economizar dados',
      'Garante 100% de fidelidade sem perdas',
      'Permite armazenar áudio e vídeo no mesmo container'
    ],
    answer: 1
  },
  {
    id: 'codec-popular',
    topic: 'Compressão',
    question: 'Qual codec é amplamente utilizado por equilibrar qualidade e tamanho?',
    options: ['H.264', 'MPEG-2', 'DV', 'RAW Cinema'],
    answer: 0
  },
  {
    id: 'codec-open',
    topic: 'Compressão',
    question: 'Qual codec aberto e moderno é indicado para streaming e aplicações com IA?',
    options: ['AV1', 'JPEG', 'MPEG-1', 'WMV'],
    answer: 0
  },
  {
    id: 'container-web',
    topic: 'Formatos',
    question: 'Qual container é padrão na web por ser compatível com praticamente todos os players?',
    options: ['MP4', 'MXF', 'M2TS', 'CinemaDNG'],
    answer: 0
  },
  {
    id: 'container-flex',
    topic: 'Formatos',
    question: 'Qual container aberto permite múltiplas faixas de áudio e legendas sem restrições?',
    options: ['MKV', 'GIF', 'BMP', 'TIFF'],
    answer: 0
  },
  {
    id: 'prores',
    topic: 'Formatos',
    question: 'Qual combinação é comum em workflows profissionais por preservar mais detalhes?',
    options: [
      'MOV com Apple ProRes',
      'GIF com animações',
      'JPEG sequencial',
      'Arquivos TXT sincronizados'
    ],
    answer: 0
  },
  {
    id: 'metadata',
    topic: 'Formatos',
    question: 'Por que manter metadados como timecode e informações de captura?',
    options: [
      'Para liberar espaço em disco',
      'Para permitir automações e alinhamento preciso em workflows com IA',
      'Para aumentar o volume do áudio',
      'Para desabilitar trilhas B-roll'
    ],
    answer: 1
  },
  {
    id: 'aperture',
    topic: 'Captura',
    question: 'Qual ajuste da câmera influencia a profundidade de campo por controlar a abertura da lente?',
    options: ['ISO', 'Obturador', 'Diafragma (f-stop)', 'Balanço de branco'],
    answer: 2
  },
  {
    id: 'stabilization',
    topic: 'Captura',
    question: 'Que recurso ajuda a estabilizar gravações feitas à mão?',
    options: ['Gimbal ou estabilizador digital', 'Filtro ND', 'Tripé iluminado', 'Conversor HDMI'],
    answer: 0
  },
  {
    id: 'broll',
    topic: 'Captura',
    question: 'Por que registrar imagens de apoio (B-roll) durante a captura?',
    options: [
      'Para medir a temperatura ambiente',
      'Para oferecer recortes complementares e facilitar a edição',
      'Para substituir o áudio original',
      'Para reduzir o bitrate final'
    ],
    answer: 1
  },
  {
    id: 'color-grading',
    topic: 'Edição',
    question: 'Qual etapa ajusta contraste e atmosfera com o uso de LUTs?',
    options: ['Color grading', 'Captura de campo', 'Renderização 3D', 'Mixagem de PA'],
    answer: 0
  },
  {
    id: 'audio-clean',
    topic: 'Edição',
    question: 'Qual processo corrige ruídos e equilibra volumes durante a pós-produção?',
    options: ['Tratamento de áudio', 'Compressão inter-frame', 'Animação 2D', 'Render proxy'],
    answer: 0
  }
];

const state = {
  deck: [],
  currentIndex: 0,
  selectedOption: null,
  answers: []
};

const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const questionTopic = document.getElementById('question-topic');
const optionsGrid = document.getElementById('options-grid');
const selectionHint = document.getElementById('selection-hint');
const nextBtn = document.getElementById('next-btn');
const questionCard = document.getElementById('question-card');
const quizControls = document.querySelector('.quiz-controls');
const resultPanel = document.getElementById('result-panel');
const scoreCircle = document.getElementById('score-circle');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

function shuffle(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function initQuiz() {
  state.deck = shuffle(questionPool).slice(0, QUESTIONS_PER_RUN);
  state.currentIndex = 0;
  state.selectedOption = null;
  state.answers = [];
  nextBtn.disabled = true;
  nextBtn.textContent = 'Confirmar resposta';
  selectionHint.textContent = 'Selecione uma resposta.';
  questionCard.hidden = false;
  quizControls.hidden = false;
  resultPanel.hidden = true;
  renderQuestion();
  updateProgress();
}

function renderQuestion() {
  const current = state.deck[state.currentIndex];
  questionTopic.textContent = current.topic;
  questionText.textContent = current.question;
  optionsGrid.innerHTML = '';
  current.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleOptionSelection(index, button));
    optionsGrid.appendChild(button);
  });
  nextBtn.disabled = state.selectedOption === null;
  nextBtn.textContent =
    state.currentIndex === state.deck.length - 1 ? 'Ver resultado' : 'Confirmar resposta';
}

function handleOptionSelection(index, button) {
  state.selectedOption = index;
  selectionHint.textContent = 'Clique em confirmar para continuar.';
  nextBtn.disabled = false;
  Array.from(optionsGrid.children).forEach((child) => child.classList.remove('selected'));
  button.classList.add('selected');
}

function updateProgress() {
  questionCounter.textContent = `Pergunta ${Math.min(
    state.currentIndex + 1,
    state.deck.length
  )}/${state.deck.length}`;
  const completed = (state.currentIndex / state.deck.length) * 100;
  progressBar.style.width = `${completed}%`;
}

function handleNext() {
  if (state.selectedOption === null) {
    return;
  }
  const current = state.deck[state.currentIndex];
  state.answers[state.currentIndex] = state.selectedOption;
  state.currentIndex += 1;

  if (state.currentIndex === state.deck.length) {
    finishQuiz();
    return;
  }

  state.selectedOption = null;
  nextBtn.disabled = true;
  selectionHint.textContent = 'Selecione uma resposta.';
  renderQuestion();
  updateProgress();
}

function finishQuiz() {
  const total = state.deck.length;
  const score = state.answers.reduce((acc, answerIndex, idx) => {
    return answerIndex === state.deck[idx].answer ? acc + 1 : acc;
  }, 0);
  const percent = Math.round((score / total) * 100);

  scoreCircle.textContent = `${percent}%`;
  resultTitle.textContent =
    percent >= 80 ? 'Mandou muito bem!' : percent >= 60 ? 'Bom trabalho!' : 'Vamos praticar?';
  resultMessage.textContent = `Você acertou ${score} de ${total} perguntas. Continue treinando para dominar toda a plataforma VideoIA.`;

  questionCounter.textContent = 'Quiz finalizado';
  progressBar.style.width = '100%';
  questionCard.hidden = true;
  quizControls.hidden = true;
  resultPanel.hidden = false;
}

nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', initQuiz);

initQuiz();

