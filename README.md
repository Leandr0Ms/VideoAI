# Plataforma VideoIA

Protótipo front-end estático pensado para apresentar os tópicos principais do
curso, um quiz interativo e o laboratório de mídias exigido pelo trabalho.

## Como executar localmente

### Opção rápida

1. Baixe/clique duas vezes em `index.html` para abrir no navegador.
2. Navegue pelos links para acessar o quiz (`quiz.html`) ou o acervo (`midias.html`).

### Opção com servidor (recomendado para Chrome)

```bash
cd /Users/leandro/College/videoIA
python3 -m http.server 4173
```

Abra http://localhost:4173 no navegador. Qualquer alteração nos arquivos será
recarregada ao atualizar a página.

## Estrutura

- `index.html` – tela principal.
- `quiz.html` + `quiz.js` – sorteia 5 questões de um banco de 15 a cada execução.
- `midias.html` – apresenta os seis tipos de mídia obrigatórios.
- `assets/` – materiais originais (PNG, SVG, WAV, MIDI, MP4 e GIF).
- `styles.css` – tema global, páginas internas e responsividade.

## Recriando os ativos

Os arquivos em `assets/` foram gerados com scripts Python presentes no histórico
da pasta. Para modificá-los, ajuste e execute novamente os comandos descritos na
documentação ou crie novos materiais autorais e substitua os arquivos atuais
(mantendo os mesmos nomes para não quebrar os links).***

