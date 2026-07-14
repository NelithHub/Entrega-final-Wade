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

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


carrito.forEach(function(producto){

    if(!producto.cantidad){

        producto.cantidad = 1;

    }

});

const listaCarrito = document.getElementById("lista-carrito");

const contadorCarrito = document.getElementById("contador-carrito");

const totalCarrito = document.getElementById("total");

const botonVaciar = document.getElementById("vaciar-carrito");


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

function agregarProducto(producto){


    const productoExistente = carrito.find(function(item){

        return item.id === producto.id;

    });


    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        producto.cantidad = 1;

        carrito.push(producto);

    }


    guardarCarrito();

    mostrarCarrito();

}

// ==========================================
// GUARDAR CARRITO
// ==========================================

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// ==========================================
// CALCULAR TOTAL
// ==========================================

function calcularTotal(){

    let total = 0;


    for(let producto of carrito){

        total += producto.precio * producto.cantidad;

    }


    return total;

}
// ==========================================
// MOSTRAR CARRITO
// ==========================================

function mostrarCarrito(){

    listaCarrito.innerHTML = "";


    carrito.forEach(function(producto, index){

        const item = document.createElement("div");

        item.classList.add("item-carrito");


        item.innerHTML = `

            <h4>${producto.nombre}</h4>

            <p>

            Cantidad:
            ${producto.cantidad}

            </p>

            <p>

            Subtotal:
            $${producto.precio * producto.cantidad} USD

            </p>
            <button 
            class="restar-producto"
            data-id="${index}">
            -
            </button>

            <button 
            class="sumar-producto"
            data-id="${index}">
            +
            </button>
    
            <button 
                class="eliminar-producto"
                data-id="${index}">
        
                Eliminar
        
            </button>

        `;


        listaCarrito.appendChild(item);

    });

    let cantidadTotal = 0;


    for(let producto of carrito){

    cantidadTotal += producto.cantidad;

    }

    contadorCarrito.textContent = cantidadTotal;

    totalCarrito.textContent =
    "$" + calcularTotal() + " USD";

    activarBotonesEliminar();

    activarBotonesCantidad();

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function activarBotonesEliminar(){

    const botonesEliminar = document.querySelectorAll(".eliminar-producto");


    botonesEliminar.forEach(function(boton){


        boton.addEventListener("click", function(){


            const posicion = boton.dataset.id;


            carrito.splice(posicion,1);


            guardarCarrito();


            mostrarCarrito();


        });


    });

}

// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function activarBotonesCantidad(){


    const botonesSumar =
    document.querySelectorAll(".sumar-producto");


    botonesSumar.forEach(function(boton){


        boton.addEventListener("click",function(){


            const posicion = boton.dataset.id;


            carrito[posicion].cantidad++;


            guardarCarrito();

            mostrarCarrito();


        });


    });



    const botonesRestar =
    document.querySelectorAll(".restar-producto");


    botonesRestar.forEach(function(boton){


        boton.addEventListener("click",function(){


            const posicion = boton.dataset.id;


            if(carrito[posicion].cantidad > 1){

                carrito[posicion].cantidad--;

            }


            guardarCarrito();

            mostrarCarrito();


        });


    });


}

// ==========================================
// VACIAR CARRITO
// ==========================================

botonVaciar.addEventListener("click", function(){

    carrito = [];
    
    guardarCarrito();

    mostrarCarrito();

});

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

const formulario = document.getElementById("formulario-contacto");

const nombreInput = document.getElementById("nombre");

const emailInput = document.getElementById("email");

const mensajeInput = document.getElementById("mensaje");


// ==========================================
// VALIDAR FORMULARIO
// ==========================================

formulario.addEventListener("submit", function(event){


    const nombre = nombreInput.value.trim();

    const email = emailInput.value.trim();

    const mensaje = mensajeInput.value.trim();


    if(nombre === ""){

        event.preventDefault();

        alert("Por favor ingresá tu nombre.");

        return;

    }


    if(email === ""){

        event.preventDefault();

        alert("Por favor ingresá tu correo electrónico.");

        return;

    }


    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!formatoEmail.test(email)){

        event.preventDefault();

        alert("Ingresá un correo electrónico válido.");

        return;

    }


    if(mensaje === ""){

        event.preventDefault();

        alert("Por favor escribí un mensaje.");

        return;

    }


});

// Mostrar carrito inicial
mostrarCarrito();