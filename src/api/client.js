function baseUrl() {
  if (typeof window !== 'undefined' && window.TASKFLOW_API_BASE) {
    return String(window.TASKFLOW_API_BASE).replace(/\/$/, '');
  }
  return 'https://taskflow-project-6kub.vercel.app/api/v1/tasks';
}

async function errorFromResponse(response) {
  let message = `Error ${response.status}`;
  try {
    const data = await response.json();
    if (data && typeof data.error === 'string') {
      message = data.error;
    }
  } catch (_) {}
  const err = new Error(message);
  err.status = response.status;
  return err;
}

export async function fetchTareas() {
  const response = await fetch(baseUrl());
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function crearTareaApi(cuerpo) {
  const response = await fetch(baseUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}

export async function eliminarTareaApi(id) {
  const response = await fetch(`${baseUrl()}/${id}`, { method: 'DELETE' });
  if (response.status === 204) {
    return;
  }
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
}

export async function actualizarTareaApi(id, cuerpo) {
  const response = await fetch(`${baseUrl()}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });
  if (!response.ok) {
    throw await errorFromResponse(response);
  }
  return response.json();
}
