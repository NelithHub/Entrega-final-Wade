// ==========================================
// CELLART
// Proyecto Final
// JavaScript
// ==========================================

// Contenedor donde se mostrarán los productos

const contenedorProductos = document.getElementById("contenedor-productos");

// ==========================================
// CARGAR PRODUCTOS
// ==========================================

fetch("productos.json")

    .then(function(respuesta){

        return respuesta.json();

    })

    .then(function(productos){

        mostrarProductos(productos);

    })

    .catch(function(error){

        console.error("Error al cargar los productos:", error);

    });

// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos(productos){

    productos.forEach(function(producto){

        // Crear tarjeta

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta");

        // Imagen

        const imagen = document.createElement("img");

        imagen.src = producto.imagen;

        imagen.alt = producto.nombre;

        // Nombre

        const titulo = document.createElement("h3");

        titulo.textContent = producto.nombre;

        // Descripción

        const descripcion = document.createElement("p");

        descripcion.textContent = producto.descripcion;

        // Precio

        const precio = document.createElement("p");

        precio.classList.add("precio");

        precio.textContent = "$" + producto.precio + " USD";

        // Botón

        const boton = document.createElement("button");

        boton.classList.add("btn-carrito");

        boton.textContent = "Agregar al carrito";

        boton.dataset.id = producto.id;
        
        // Evento del botón

        boton.addEventListener("click", function(){

        agregarProducto(producto);

        });

        // Agregar elementos

        tarjeta.appendChild(imagen);

        tarjeta.appendChild(titulo);

        tarjeta.appendChild(descripcion);

        tarjeta.appendChild(precio);

        tarjeta.appendChild(boton);

        // Mostrar tarjeta

        contenedorProductos.appendChild(tarjeta);

    });

}
// ==========================================
// VARIABLES DEL CARRITO
// ==========================================

let carrito = [];

const listaCarrito = document.getElementById("lista-carrito");

const contadorCarrito = document.getElementById("contador-carrito");

const totalCarrito = document.getElementById("total");

const botonVaciar = document.getElementById("vaciar-carrito");


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

function agregarProducto(producto){

    carrito.push(producto);

    mostrarCarrito();

}
// ==========================================
// CALCULAR TOTAL
// ==========================================

function calcularTotal(){

    let total = 0;

    for(let producto of carrito){

        total += producto.precio;

    }

    return total;

}
// ==========================================
// MOSTRAR CARRITO
// ==========================================

function mostrarCarrito(){
    
    if(!listaCarrito || !contadorCarrito || !totalCarrito){

        return;
    }

    listaCarrito.innerHTML = "";

    for(let producto of carrito){

        const item = document.createElement("div");

        item.classList.add("item-carrito");


        item.innerHTML = `

            <h4>${producto.nombre}</h4>

            <p>$${producto.precio} USD</p>

        `;


        listaCarrito.appendChild(item);

    }


    contadorCarrito.textContent = carrito.length;

    totalCarrito.textContent =
    "$" + calcularTotal() + " USD";

}

// Mostrar carrito al cargar la página

mostrarCarrito();


// ==========================================
// VACIAR CARRITO
// ==========================================

botonVaciar.addEventListener("click", function(){

    carrito = [];

    mostrarCarrito();

});