window.guardarFalloUsuario = async function (preguntaId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("No hay usuario activo");
      return;
    }

    const ref = doc(db, "estadisticas", user.uid, "preguntas", preguntaId);
    const snap = await getDoc(ref);

    let nuevosFallos = 1;
    if (snap.exists()) {
      const actual = snap.data().fallos || 0;
      nuevosFallos = actual + 1;
    }

    await setDoc(ref, { fallos: nuevosFallos }, { merge: true });

    console.log("Fallo guardado en Firebase:", user.uid, preguntaId, nuevosFallos);
  } catch (e) {
    console.error("Error guardando fallo usuario:", e);
  }
};