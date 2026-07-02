// Productos
const productos = [
    { id: 1, nombre: "SSD NVMe 2TB PCIe 4.0", precio: 149.99, imagen: "images SSD.jpg", descripcion: "Velocidad extrema para desarrollo y gaming" },
    { id: 2, nombre: "HDD Enterprise 8TB", precio: 229.99, imagen: "image 8TB.jpg", descripcion: "Almacenamiento masivo para servidores" },
    { id: 3, nombre: "RAM DDR5 32GB (2x16GB)", precio: 189.99, imagen: "image RAM.jpg", descripcion: "Memoria de alto rendimiento" },
    { id: 4, nombre: "NAS Synology 4 Bahías", precio: 499.99, imagen: "image NAS.jpg", descripcion: "Almacenamiento en red para empresas" },
    { id: 5, nombre: "Cloud VPS 4 vCPU + 80GB SSD", precio: 29.99, imagen: "images SSD.jpg", descripcion: "Servidor virtual mensual" },
    { id: 6, nombre: "USB-C 1TB Thunderbolt", precio: 119.99, imagen: "image USB.jpg", descripcion: "Transferencia ultrarrápida" }
];

let carrito = [];

// Renderizar productos
function renderProductos() {
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = '';
    
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <div class="precio">$${producto.precio}</div>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
        grid.appendChild(div);
    });
}

// Carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(item => item.id === id);
    
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    actualizarCarrito();
    alert(`✅ ${producto.nombre} agregado al carrito`);
}

function actualizarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    itemsDiv.innerHTML = '';
    let total = 0;
    
    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        const div = document.createElement('div');
        div.className = 'item-carrito';
        div.innerHTML = `
            <div><strong>${item.nombre}</strong><br>Cantidad: ${item.cantidad}</div>
            <div>$${subtotal.toFixed(2)} 
                <button onclick="eliminarDelCarrito(${index})" style="background:#e63946; margin-left:8px;">Eliminar</button>
            </div>
        `;
        itemsDiv.appendChild(div);
    });
    
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// === COMPRA FUNCIONAL ===
function comprar() {
    if (carrito.length === 0) {
        return alert(" Tu carrito está vacío");
    }

    let resumen = " RESUMEN DE TU COMPRA\n\n";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        resumen += `• ${item.nombre} × ${item.cantidad} = $${subtotal.toFixed(2)}\n`;
    });

    resumen += `\n────────────────────\n`;
    resumen += `TOTAL A PAGAR: $${total.toFixed(2)}\n`;

    if (confirm(resumen + "\n¿Confirmar y proceder al pago?")) {
        alert(" Procesando pago de forma segura...");

        setTimeout(() => {
            alert(`¡COMPRA REALIZADA CON ÉXITO!\n\n` +
                  `Gracias por comprar en InfoStore.\n` +
                  `Tu pedido ha sido procesado correctamente.\n` +
                  `Recibirás un correo de confirmación en breve.`);
            
            carrito = [];           // Vaciar carrito
            actualizarCarrito();    // Actualizar vista
        }, 1200);
    }
}

// Seguridad
function login() {
    const pass = document.getElementById('password').value;
    if (pass === "admin123") {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        alert("Contraseña incorrecta");
    }
}

function logout() {
    if (confirm("¿Cerrar sesión?")) location.reload();
}

function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderProductos();
    actualizarCarrito();
});
