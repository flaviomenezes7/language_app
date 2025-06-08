export async function chamarIA(prompt) {
  const res = await fetch('http://localhost:5000/api/ia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  return await res.json();
}

export async function gerarExercicio(palavra) {
  const res = await fetch('http://localhost:5000/api/ia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ palavra }), // <-- Aqui!
  });
  const data = await res.json();
  return data.response;
}

export async function gerarExercicioGeral(nivel, quantidade) {
  const res = await fetch('http://localhost:5000/api/ia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nivel, quantidade }),
  });
  const data = await res.json();
  return data.response;
}