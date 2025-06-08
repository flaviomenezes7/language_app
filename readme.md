# Language App

Um aplicativo web para aprender inglês de forma personalizada e interativa, utilizando inteligência artificial para gerar exercícios, flashcards e exemplos adaptados ao seu nível.

---

## Funcionalidades

- **Cadastro de Palavras**
  - Adicione palavras em inglês que deseja aprender.
  - Gerencie sua lista pessoal de vocabulário.

- **Praticar com Flashcards**
  - Pratique as palavras cadastradas com flashcards interativos.
  - Para cada palavra, a IA gera 3 opções de tradução em português (apenas uma correta) para você escolher.
  - Receba feedback imediato sobre sua resposta.

- **Exercícios Gerais por Nível**
  - Gere exercícios de múltipla escolha adaptados ao seu nível de inglês (A1 a C2).
  - Escolha quantas questões deseja praticar.
  - Responda aos exercícios diretamente na interface.

- **Dicionário Inteligente**
  - Consulte o significado de qualquer palavra em inglês.
  - Veja explicação em português, classe gramatical e exemplos de uso.

- **Interface Moderna e Responsiva**
  - Layout limpo, intuitivo e adaptado para desktop e dispositivos móveis.

---

## Como Funciona

1. **Adicione Palavras**
   - Na tela "Minhas Palavras", digite uma palavra em inglês e clique em "Adicionar".
   - As palavras ficam salvas localmente no navegador.

2. **Pratique com Flashcards**
   - Clique em "Praticar com Flashcards" para responder questões de múltipla escolha sobre as palavras que você cadastrou.

3. **Gere Exercícios Gerais**
   - Acesse a tela de exercícios.
   - Escolha o nível de inglês (A1, A2, B1, B2, C1, C2).
   - Escolha a quantidade de questões.
   - Clique em "Gerar Exercícios" para receber questões variadas, todas em inglês.

4. **Consulte o Dicionário**
   - Busque o significado de qualquer palavra em inglês, com explicação em português e exemplos.

5. **Responda e Pratique**
   - Responda aos exercícios e flashcards diretamente na interface.
   - Veja se acertou e pratique quantas vezes quiser.

---

## Tecnologias Utilizadas

- **Frontend:** React.js + Material UI
- **Backend:** Python (Flask)
- **IA:** Groq API (Llama 3) para geração dinâmica dos exercícios e flashcards
- **Armazenamento Local:** LocalStorage para salvar palavras do usuário

---

## Estrutura do Projeto

```
language-app/
│
├── backend/
│   └── app.py           # API Flask que gera exercícios e flashcards via IA
│
├── language-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Flashcards.js             # Componente de flashcards inteligentes
│   │   │   └── ExercicioInterativo.js    # Componente para exibir e responder exercícios
│   │   ├── pages/
│   │   │   ├── Exercises.js              # Página de exercícios gerais
│   │   │   ├── MyWords.js                # Página de palavras do usuário
│   │   │   └── Dictionary.js             # Página de dicionário inteligente
│   │   ├── services/
│   │   │   └── ia.js                     # Funções para chamar a API de IA
│   │   └── App.css                       # CSS centralizado e responsivo
│   └── ...
└── readme.md
```

---

## Como Rodar o Projeto

### 1. Backend (Flask)

```bash
cd language-app/backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
# Configure sua chave da Groq API no .env
python app.py
```

### 2. Frontend (React)

```bash
cd language-app/language-app
npm install
npm start
```

O frontend estará em `http://localhost:3000` e o backend em `http://localhost:5000`.

---

## Configuração da IA

- Crie um arquivo `.env` na pasta `backend` com sua chave da Groq API:
  ```
  GROQ_API_KEY=sua_chave_aqui
  ```

---

## Contribuindo

1. Faça um fork do projeto.
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Minha nova feature'`
4. Push para o repositório: `git push origin minha-feature`
5. Abra um Pull Request.

---

## Licença

MIT

---

Desenvolvido para tornar o aprendizado de inglês mais prático, divertido e personalizado!