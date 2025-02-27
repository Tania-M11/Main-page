const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const rolSelect = document.getElementById("rol");
const identificacionInput = document.getElementById("identificacion");

// Animación para cambiar entre login y registro
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Ocultar la identificación si es comprador
rolSelect.addEventListener("change", function () {
  if (this.value === "comprador") {
    identificacionInput.style.display = "none";
    identificacionInput.value = "";
  } else {
    identificacionInput.style.display = "block";
  }
});

// Expresiones Regulares para validaciones
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato válido de email
const regexIdentificacion = /^\d+$/; // Solo números
const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// REGISTRO DE USUARIO
document.querySelector(".sign-up-container form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector(".sign-up-container input[placeholder='Nombre']").value.trim();
  const identificacion = identificacionInput.value.trim();
  const correo = document.querySelector(".sign-up-container input[placeholder='Correo']").value.trim();
  const contrasena = document.querySelector(".sign-up-container input[placeholder='Contraseña']").value.trim();
  const confirmarContrasena = document.querySelector(".sign-up-container input[placeholder='Confirmar contraseña']").value.trim();
  const rol = rolSelect.value;

  // Validaciones
  if (!nombre || !correo || !contrasena || !confirmarContrasena) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (!regexNombre.test(nombre)) {
    alert("El nombre solo puede contener letras y espacios.");
    return;
  }

  if (rol === "vendedor" && (!identificacion || !regexIdentificacion.test(identificacion))) {
    alert("La identificación solo puede contener números.");
    return;
  }

  if (!regexCorreo.test(correo)) {
    alert("Correo inválido. Usa un formato válido como: usuario@example.com");
    return;
  }

  if (!regexContrasena.test(contrasena)) {
    alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
    return;
  }

  if (contrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioExistente = usuarios.find((u) => u.correo === correo);

  if (usuarioExistente) {
    alert("Este correo ya está registrado.");
    return;
  }

  usuarios.push({ nombre, identificacion, correo, contrasena, rol });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso. Ahora puedes iniciar sesión.");

  // LIMPIAR CAMPOS DESPUÉS DEL REGISTRO
  document.querySelector(".sign-up-container form").reset();
  identificacionInput.style.display = "block";

  container.classList.remove("right-panel-active"); // Volver a la pantalla de inicio de sesión
});

// INICIO DE SESIÓN
document.querySelector(".sign-in-container form").addEventListener("submit", function (e) {
  e.preventDefault();

  const correo = document.querySelector(".sign-in-container input[placeholder='Correo']").value.trim();
  const contrasena = document.querySelector(".sign-in-container input[placeholder='Contraseña']").value.trim();

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let usuarioEncontrado = usuarios.find((u) => u.correo === correo && u.contrasena === contrasena);

  if (!usuarioEncontrado) {
    alert("Correo o contraseña incorrectos.");
    return;
  }

  alert("Inicio de sesión exitoso.");
  window.location.href = "index.html"; // Redirigir al usuario después de iniciar sesión
});



function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
