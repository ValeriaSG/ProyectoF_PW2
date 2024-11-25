// Asegurar que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener("DOMContentLoaded", () => {
    // Simulación de productos
    const categorias = {
      Alimentos: [
        { id: 1, nombre: "Producto A", precio: 100, stock: 10 },
        { id: 2, nombre: "Producto B", precio: 200, stock: 5 },
      ],
    }
      
    
  
    // Estado del carrito almacenado en LocalStorage
    let carrito = localStorage.getItem("carrito") 
      ? JSON.parse(localStorage.getItem("carrito")) 
      : [];
  
    // Función para renderizar productos
    function renderizarProductos() {
      const contenedor = document.getElementById("productos");
      contenedor.innerHTML = ""; // Limpiar contenido previo
  
      productos.forEach((producto) => {
        const div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <p>Stock: ${producto.stock}</p>
        `;
        const boton = document.createElement("button");
        boton.textContent = "Añadir al Carrito";
        boton.addEventListener("click", () => agregarAlCarrito(producto.id));
        div.appendChild(boton);
        contenedor.appendChild(div);
      });
    }
  
    // Función para agregar productos al carrito
    function agregarAlCarrito(idProducto) {
      const producto = productos.find((p) => p.id === idProducto);
  
      if (producto && producto.stock > 0) {
        const itemEnCarrito = carrito.find((item) => item.id === idProducto);
  
        if (itemEnCarrito) {
          itemEnCarrito.cantidad++;
        } else {
          carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }
  
        producto.stock--; // Reducir stock del producto
        guardarCarrito();
        renderizarProductos(); // Actualizar la vista
        alert("Producto añadido al carrito");
      } else {
        alert("Producto agotado");
      }
    }
  
    // Función para guardar el carrito en LocalStorage
    function guardarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  
    // Función para mostrar el carrito
    function mostrarCarrito() {
      const resumen = carrito.map(
        (item) => `${item.nombre} - Cantidad: ${item.cantidad} - Total: $${item.cantidad * item.precio}`
      ).join("\n");
  
      alert(resumen || "El carrito está vacío");
    }
  
    // Enlazar eventos
    document.getElementById("btn-carrito").addEventListener("click", mostrarCarrito);
  
    // Inicializar los productos al cargar la página
    renderizarProductos();
  });
  