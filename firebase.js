window.guardarFalloUsuario = async function (preguntaId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("No hay usuario activo");
      return;
    }

    const ref = doc(db, "estadisticas", user.uid, "preguntas", preguntaId);

    await setDoc(
      ref,
      {
        fallos: increment(1),
        ultimaFecha: Date.now()
      },
      { merge: true }
    );

    console.log("Fallo guardado en Firebase:", user.uid, preguntaId);
  } catch (e) {
    console.error("Error guardando fallo usuario:", e);
  }
};