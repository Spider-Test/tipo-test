import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

const ADMIN_EMAIL = "tuemail@gmail.com";

onAuthStateChanged(auth, async (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    document.body.innerHTML = "<h2>Acceso denegado</h2>";
    return;
  }

  cargarUsuarios();
});

async function cargarUsuarios() {
  const contenedor = document.getElementById("listaUsuarios");
  contenedor.innerHTML = "";

  const snapshot = await getDocs(collection(db, "usuarios"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const email = docSnap.id;

    const fila = document.createElement("div");
    fila.style.margin = "10px 0";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = data.autorizado === true;

    check.onchange = async () => {
      await updateDoc(doc(db, "usuarios", email), {
        autorizado: check.checked
      });
    };

    fila.append(email, " ", check);
    contenedor.appendChild(fila);
  });
}