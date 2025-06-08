import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

# Carrega o .env explicitamente
load_dotenv(dotenv_path=".env")
print("GROQ_API_KEY:", os.environ.get("GROQ_API_KEY"))  # Debug: deve mostrar a chave

app = Flask(__name__)
CORS(app)

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

@app.route('/api/ia', methods=['POST'])
def ia():
    data = request.get_json()
    nivel = data.get('nivel', 'A1')
    quantidade = data.get('quantidade', 3)
    prompt = f"""
Responda apenas com um JSON válido, sem explicações, sem comentários, sem texto antes ou depois.
Gere exatamente {quantidade} exercícios de inglês de múltipla escolha para o nível {nivel}, no seguinte formato:
{{
  "titulo": "Exercícios de múltipla escolha - nível {nivel}",
  "descricao": "Exercícios de múltipla escolha para praticar inglês no nível {nivel}.",
  "questoes": [
    {{
      "tipo": "multipla_escolha",
      "pergunta": "Which animal is known as man's best friend?",
      "alternativas": ["Cat", "Dog", "Bird", "Fish"],
      "resposta_correta": 1
    }},
    {{
      "tipo": "multipla_escolha",
      "pergunta": "What color is the sky on a clear day?",
      "alternativas": ["Blue", "Green", "Red", "Yellow"],
      "resposta_correta": 0
    }}
  ]
}}
Todas as perguntas devem ser sobre o aprendizado da língua inglesa, como vocabulário, gramática, compreensão de frases, uso correto de palavras, interpretação de pequenos textos ou diálogos, ou situações do dia a dia. 
**Não crie perguntas de cultura geral, fatos históricos, ciência, literatura, geografia, matemática ou conhecimentos gerais.**
Não crie perguntas de opinião, experiência pessoal ou abertas. Não repita exemplos, crie perguntas novas, claras, realistas e adequadas ao nível {nivel}. Todas as perguntas, alternativas e respostas devem ser escritas apenas em inglês.
O array "questoes" deve conter exatamente {quantidade} questões diferentes, cada uma no formato acima.
"""
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
    )
    resposta = chat_completion.choices[0].message.content
    return jsonify({"response": resposta})

@app.route('/api/corrigir', methods=['POST'])
def corrigir():
    data = request.get_json()
    questao = data.get('questao')
    resposta_usuario = data.get('resposta')
    resposta_correta = questao.get('resposta_correta')
    tipo = questao.get('tipo')

    correta = False
    if tipo == 'multipla_escolha':
        correta = str(resposta_usuario) == str(resposta_correta)
    elif tipo == 'completar':
        correta = resposta_usuario.strip().lower() == resposta_correta.strip().lower()
    else:
        correta = False

    explicacao = ""
    if not correta:
        prompt = f"""
A seguinte questão foi respondida incorretamente por um estudante de inglês. Explique de forma clara, curta e objetiva o motivo do erro e qual seria a resposta correta. Não use rodeios, seja direto.

Questão: {questao}
Resposta do estudante: {resposta_usuario}
Resposta correta: {resposta_correta}
"""
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
        )
        explicacao = chat_completion.choices[0].message.content.strip()

    return jsonify({"correta": correta, "explicacao": explicacao})

@app.route('/api/verificar_flashcard', methods=['POST'])
def verificar_flashcard():
    data = request.get_json()
    indice_escolhido = data.get('indice_escolhido')
    indice_correto = data.get('indice_correto')

    correta = int(indice_escolhido) == int(indice_correto)
    explicacao = "Parabéns, resposta correta!" if correta else "Resposta incorreta. Tente novamente!"

    return jsonify({"correta": correta, "explicacao": explicacao})

@app.route('/api/dicionario', methods=['POST'])
def dicionario():
    data = request.get_json()
    palavra = data.get('palavra')

    prompt = f"""
Explique de forma clara, curta e objetiva o significado da palavra inglesa "{palavra}" em português. 
Inclua a classe gramatical (substantivo, verbo, adjetivo, etc) e um exemplo de uso em inglês com tradução.
Responda apenas em português, no formato JSON:
{{
  "palavra": "...",
  "classe_gramatical": "...",
  "significado": "...",
  "exemplo": "...",
  "exemplo_traduzido": "..."
}}
"""

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
    )
    resposta = chat_completion.choices[0].message.content.strip()
    try:
        import json
        resultado = json.loads(resposta)
    except Exception:
        resultado = {"erro": "Não foi possível obter o significado."}
    return jsonify(resultado)

@app.route('/api/flashcard_opcoes', methods=['POST'])
def flashcard_opcoes():
    data = request.get_json()
    palavra = data.get('palavra')
    print(f"[LOG] Palavra recebida para flashcard: {palavra}")

    prompt = f"""
Apenas responda com um JSON puro, sem explicações, sem comentários, sem texto antes ou depois.
Gere exatamente 3 opções de tradução em português para a palavra inglesa "{palavra}". 
Apenas uma deve ser correta, as outras duas devem ser plausíveis mas incorretas.
Formato:
{{
  "palavra": "{palavra}",
  "opcoes": [
    "opção 1",
    "opção 2",
    "opção 3"
  ],
  "correta": <índice da opção correta, começando em 0>
}}
"""
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "user", "content": prompt}
        ],
        model="llama-3.3-70b-versatile",
    )
    resposta = chat_completion.choices[0].message.content.strip()
    print(f"[LOG] Resposta da IA para '{palavra}': {resposta}")
    try:
        import json
        resultado = json.loads(resposta)
    except Exception as e:
        print(f"[ERRO] Falha ao decodificar JSON: {e}")
        resultado = {"erro": "Não foi possível gerar as opções."}
    return jsonify(resultado)

if __name__ == '__main__':
    app.run(debug=True)