export async function cargarDesdeFirebase() {
  const snapshot = await getDocs(collection(db, "preguntas"));
  const banco = {};

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const id = docSnap.id;

    // Validación básica
    if (!data.tema || !data.pregunta || !Array.isArray(data.opciones)) {
      console.warn("Pregunta inválida ignorada:", id, data);
      return;
    }

    const tema = data.tema;

    if (!banco[tema]) banco[tema] = [];

    banco[tema].push({
      id,
      pregunta: data.pregunta,
      opciones: data.opciones,
      correcta: data.correcta,
      fallada: data.fallada || 0,
      feedback: data.feedback || "",
      subtema: data.subtema || "General"
    });
  });

  return banco;
}