const QUESTIONS_PER_RUN = 5;

const questionPool = [
  {
    id: 'digital-basics',
    topic: 'Fundamentos',
    question: 'Um vídeo digital é formado por...',
    options: [
      'Quadros sequenciais transformados em dados',
      'Apenas áudio sem imagem',
      'Fotografias impressas em papel',
      'Códigos de texto puro'
    ],
    answer: 0
  },
  {
    id: 'frame-rate',
    topic: 'Fundamentos',
    question: 'Qual parâmetro indica quantos quadros aparecem a cada segundo?',
    options: ['Resolução', 'Taxa de quadros (fps)', 'Profundidade de cor', 'Bitrate'],
    answer: 1
  },
  {
    id: 'resolucao',
    topic: 'Fundamentos',
    question: 'Dizer que um vídeo é 1920×1080 significa que ele possui...',
    options: [
      '1920 pixels de largura por 1080 de altura',
      '1920 quadros por segundo',
      '1920 minutos de duração',
      'Somente áudio estéreo'
    ],
    answer: 0
  },
  {
    id: 'profundidade-cor',
    topic: 'Fundamentos',
    question: 'Profundidade de cor indica...',
    options: [
      'Quantos tons diferentes cada pixel pode exibir',
      'A distância do microfone ao ator',
      'O peso da câmera',
      'O número de clipes na timeline'
    ],
    answer: 0
  },
  {
    id: 'bitrate',
    topic: 'Compressão',
    question: 'Bitrate representa...',
    options: [
      'Quantidade de dados enviados por segundo',
      'Número de lentes usadas',
      'Velocidade do tripé',
      'Cor da iluminação'
    ],
    answer: 0
  },
  {
    id: 'compressao-objetivo',
    topic: 'Compressão',
    question: 'Por que aplicamos compressão ao vídeo?',
    options: [
      'Para reduzir tamanho mantendo qualidade aceitável',
      'Para deixar o arquivo ilegível',
      'Para remover totalmente o áudio',
      'Para impedir a edição posterior'
    ],
    answer: 0
  },
  {
    id: 'intra-vs-inter',
    topic: 'Compressão',
    question: 'Compressão inter-frame aproveita...',
    options: [
      'Semelhanças entre quadros diferentes',
      'Somente informações do primeiro quadro',
      'Apenas a faixa de áudio',
      'Somente metadados de GPS'
    ],
    answer: 0
  },
  {
    id: 'codec-popular',
    topic: 'Compressão',
    question: 'Um codec muito usado por equilibrar qualidade e tamanho é o...',
    options: ['H.264', 'TXT', 'RAW Cinema', 'DOCX'],
    answer: 0
  },
  {
    id: 'container-web',
    topic: 'Formatos',
    question: 'Qual container funciona bem na maioria dos players e navegadores?',
    options: ['MP4', 'ZIP', 'PSD', 'DOC'],
    answer: 0
  },
  {
    id: 'metadados',
    topic: 'Formatos',
    question: 'Metadados como timecode ajudam a...',
    options: [
      'Organizar e sincronizar arquivos',
      'Aumentar o brilho do set',
      'Escolher a cor do figurino',
      'Criar filtros de rede social'
    ],
    answer: 0
  },
  {
    id: 'wav-pcm',
    topic: 'Formatos',
    question: 'Um arquivo WAV com pulso PCM serve como...',
    options: [
      'Referência de áudio limpa para edições',
      'Controle remoto da câmera',
      'Filtro de lente',
      'Sensor de temperatura'
    ],
    answer: 0
  },
  {
    id: 'estabilizador',
    topic: 'Captura',
    question: 'Para amenizar tremores na gravação usamos...',
    options: ['Gimbal/estabilizador', 'Teclado MIDI', 'Adaptador de tomada', 'Fone bluetooth'],
    answer: 0
  },
  {
    id: 'broll',
    topic: 'Captura',
    question: 'Gravar B-roll significa registrar...',
    options: [
      'Imagens extras que ajudam a edição',
      'Somente o áudio do set',
      'Apenas mensagens de texto',
      'Somente a claquete'
    ],
    answer: 0
  },
  {
    id: 'loop-video',
    topic: 'Captura',
    question: 'O loop em 1080p usado no protótipo mostra...',
    options: [
      'Oscilações de luz para estudar sensores',
      'Planilhas financeiras',
      'Som sem imagem',
      'Somente gráficos de pizza'
    ],
    answer: 0
  },
  {
    id: 'color-grading',
    topic: 'Edição',
    question: 'Color grading é responsável por...',
    options: [
      'Ajustar cores e atmosfera das cenas',
      'Escolher a música tema',
      'Ligar e desligar o set',
      'Montar o roteiro'
    ],
    answer: 0
  },
  {
    id: 'audio-clean',
    topic: 'Edição',
    question: 'Tratamento de áudio busca...',
    options: [
      'Remover ruídos e equilibrar volumes',
      'Adicionar pixels à imagem',
      'Trocar o codec automaticamente',
      'Controlar o foco da câmera'
    ],
    answer: 0
  },
  {
    id: 'exportacao',
    topic: 'Entrega',
    question: 'Antes de exportar é importante definir...',
    options: [
      'O formato/container adequado ao destino',
      'A cor do cabo HDMI',
      'O tipo de fonte do roteiro',
      'O tamanho da sala de aula'
    ],
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

