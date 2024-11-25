document.addEventListener("DOMContentLoaded", () => {
  const usuarios = [
    { id: 1, correo: "juan@example.com", contraseña: "1234", nombre: "Juan", rol: "comprador" },
    { id: 2, correo: "ana@example.com", contraseña: "5678", nombre: "Ana", rol: "vendedor" }
  ];
  let productos = [
    { id: 1, nombre: "Producto A", precio: 100, stock: 10 },
    { id: 2, nombre: "Producto B", precio: 200, stock: 5 },
    { id: 3, nombre: "Producto C", precio: 300, stock: 8 }
  ];
  let carrito = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
  let usuarioLogueado = null;

  const modal = document.getElementById("modal-auth");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Función para abrir/cerrar el modal
  function toggleModal() {
    modal.classList.toggle("hidden");
  }
  // Asignar la misma funcionalidad al botón de "Iniciar Sesión" del header
  const btnLoginHeader = document.getElementById("btn-login");
  btnLoginHeader.addEventListener("click", toggleModal);

  // Función para renderizar productos
  function renderizarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.className = "producto";
      div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
      `;
      const boton = document.createElement("button");
      boton.textContent = usuarioLogueado ? "Añadir al Carrito" : "Inicia Sesión para Añadir";
      boton.addEventListener("click", () => {
        if (usuarioLogueado) {
          agregarAlCarrito(producto.id);
        } else {
          toggleModal();
        }
      });
      div.appendChild(boton);
      contenedor.appendChild(div);
    });
  }

  // Función para manejar el login
  function loginUsuario() {
    const correo = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;
    const usuario = usuarios.find((u) => u.correo === correo && u.contraseña === contraseña);

    if (usuario) {
      usuarioLogueado = usuario;
      toggleModal();
      renderizarProductos();
      alert("¡Bienvenido, " + usuario.nombre + "!");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  }

  // Función para manejar el registro
  function registrarUsuario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("email-register").value;
    const contraseña = document.getElementById("password-register").value;

    if (usuarios.find((u) => u.correo === correo)) {
      alert("Este correo ya está registrado.");
    } else {
      const nuevoUsuario = { id: usuarios.length + 1, correo, contraseña, nombre: `${nombre} ${apellido}`, rol: "comprador" };
      usuarios.push(nuevoUsuario);
      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      toggleModal();
    }
  }

  // Eventos para alternar entre login y registro
  document.getElementById("btn-toggle-register").addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  document.getElementById("btn-toggle-login").addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Enlazar eventos del modal
  document.getElementById("btn-login-auth").addEventListener("click", loginUsuario);
  document.getElementById("btn-register-auth").addEventListener("click", registrarUsuario);
  document.getElementById("btn-close-modal").addEventListener("click", toggleModal);

  // Inicializar productos
  renderizarProductos();
});
