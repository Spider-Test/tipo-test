// ===== NAVEGACIÓN EDITOR / TEST (ESTADO ESTABLE) =====

// Referencias DOM
const btnEditor = document.getElementById("btnEditor");
const btnTest = document.getElementById("btnTest");

const iframeEditor = document.getElementById("iframeEditor");
const iframeTest = document.getElementById("iframeTest");

// Mostrar Editor
function mostrarEditor() {
  if (iframeEditor) iframeEditor.style.display = "block";
  if (iframeTest) iframeTest.style.display = "none";

  if (btnEditor) btnEditor.classList.add("activo");
  if (btnTest) btnTest.classList.remove("activo");

  guardarModo("editor");
}

// Mostrar Test
function mostrarTest() {
  if (iframeEditor) iframeEditor.style.display = "none";
  if (iframeTest) iframeTest.style.display = "block";

  if (btnTest) btnTest.classList.add("activo");
  if (btnEditor) btnEditor.classList.remove("activo");

  guardarModo("test");
}

// ===== RESTAURAR ÚLTIMA PANTALLA POR USUARIO =====
function obtenerClaveModo() {
  const uid = window.usuarioActual?.uid || "guest";
  return "modoApp_" + uid;
}

function guardarModo(modo) {
  localStorage.setItem(obtenerClaveModo(), modo);
}

function restaurarModo() {
  const modoGuardado = localStorage.getItem(obtenerClaveModo());

  if (modoGuardado === "editor") {
    mostrarEditor();
  } else {
    // Por defecto abre TEST
    mostrarTest();
  }
}

// Restaurar modo cuando Firebase haya definido el usuario
document.addEventListener("DOMContentLoaded", () => {
  if (window.firebase && firebase.auth) {
    firebase.auth().onAuthStateChanged(() => {
      restaurarModo();
    });
  } else {
    // Si no hay auth, restaurar directamente
    restaurarModo();
  }
});

// Eventos
if (btnEditor) {
  btnEditor.addEventListener("click", mostrarEditor);
}

if (btnTest) {
  btnTest.addEventListener("click", mostrarTest);
}