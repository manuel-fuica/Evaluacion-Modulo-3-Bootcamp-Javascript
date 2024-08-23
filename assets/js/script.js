
//creo dos arrays carrito y stock vacios
let carrito = [];
let stock = []


//creacion de la clase con sus propiedades
function productos(nombre, precio) {

    this.nombre = nombre,
    this.precio = precio

    //metodo para agregar los objetos creados al array stock
    stock.push(this)
}

//productos en stock

let leche = new productos("Leche", 300);
let panDeMolde = new productos("Pan de molde", 200);
let queso = new productos("Queso", 500);
let mermelada = new productos("Mermelada", 400);
let azucar = new productos("Azucar", 200);
let arroz = new productos("Arroz", 300);

console.log('estos son los productos' + stock);

//busco el elemento con el id tablaProductos
const tablaProductos = document.getElementById("tablaProductos");

//creo una variable que almacenara el total
let total = 0;

//funcion para mostrar el carrito, si esta vacio muestra un alert
function mostrarCarrito() {
    let detallesCarrito = "";

    if (carrito.length === 0) {
        alert("No hay productos en el carrito");
        return;
    }

    //ciclo para mostrar el carrito, en un alert con nombre cantidad y total
    for (let i = 0; i < carrito.length; i++) {
        detallesCarrito += `Producto: ${carrito[i].nombre}\r\nCantidad: ${carrito[i].cantidad}\r\n Total: $ ${carrito[i].total}\r\n\r\n`;
    }
    alert("Tus Productos: " + "\r\n" + detallesCarrito + "\r\n Total a pagar: $ " + total);
}

//funcion para finalizar la compra, ademas de vaciar el carrito
function finalizarCompra() {
    alert("Gracias por su compra. Hasta pronto.\n El total de la compra fue: $ " + total);
    total = 0;
    carrito = [];
}

//funcion para renderizar los productos, aqui parte el programa y muestra los productos en stock en la tabla del html
function renderizarProductos() {

    //ciclo para recorrer el array stock
    for (let i = 0; i < stock.length; i++) {
        const producto = stock[i];
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = producto.nombre;
        fila.appendChild(celdaNombre);

        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = "$ " + producto.precio;
        fila.appendChild(celdaPrecio);

        const celdaComprar = document.createElement("td");
        const botonComprar = document.createElement("button");
        botonComprar.textContent = "Comprar";
        botonComprar.className = "btn btn-success btnComprar";

        botonComprar.onclick = () => {
            let cantidad = parseInt(prompt("¿Cuántos productos desea comprar?"));

            // Calcula el total del producto
            let productoTotal = cantidad * producto.precio;

            //con el metodo push agrego el objeto al array carrito con las propiedades nombre, precio,cantidad, total
            carrito.push({
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                total: productoTotal
            });

            //actualizo el total
            total += productoTotal;

            //muestro el total en la consola
            console.log("este es el total $" + total);

            //muestro un alert para indicar que se agrego el producto
            alert("Producto agregado al carrito");

            //varibale para preguntar si desea seguir comprando
            let seguirComprando = prompt("¿Desea seguir comprando? s/n");

            //si la respuesta es s, me redirige a la seccion carrito para seguir comprando, si es n, muestra el carrito, si es otra muestra un alert con opcion invalida
            if (seguirComprando === "s") {
                location.hash = "#carrito";
            } else if (seguirComprando === "n") {
                mostrarCarrito();
            } else {
                alert("Opcion invalida. \nPor favor ingrese 's' o 'n'");
                seguirComprando = prompt("¿Desea seguir comprando? s/n");
            }

            //declaro la variable detallesCarrito 
            let detallesCarrito = "";

            //ciclo para agregar las propiedades nombre cantidad y total a detalles carrito
            for (let i = 0; i < carrito.length; i++) {
                detallesCarrito += `Producto: ${carrito[i].nombre}\r\nCantidad: ${carrito[i].cantidad}\r\n Total $: ${carrito[i].total}\r\n\r\n`;
            }
        };

        //agrego los elementos creados a la tabla
        celdaComprar.appendChild(botonComprar);
        fila.appendChild(celdaComprar);
        tablaProductos.appendChild(fila);
    }
}
renderizarProductos();


