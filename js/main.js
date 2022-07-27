 
/*Swal.fire('Bienvendio a la tienda de mascotas')*/





let contenedor = document.getElementById("clima");




fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&lang=es&units=metric&appid=bc6336b0ada564d846b0f7e31450ace7")
.then (response => response.json())
.then (data => {
    
            console.log ("la max es:",data.main.temp_max)
            console.log ("min:", data.main.temp_min)
            console.log ("Ciudad:", data.name)

            contenedor.innerHTML = `<span>Ciudad: ${data.name} </span>
                                    <span> | Temp Max: ${data.main.temp_max} </span>
                                    <span> | Temp Min: ${data.main.temp_min} </span>`

})

let carrito = [];


class ProductoCarrito{
    constructor(nombre,precio, imagen, cantidad, id, subtotal){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad
        this.id = id;
        this.subtotal = precio;
    }

}

let divContainer = document.getElementById("row")

function rellenarPagina(arrayProductos){

    for(let producto of arrayProductos){
        let div = document.createElement("div");
        div.classList = "col-4 mt-3"

        div.innerHTML = `
        <div class="card" style="width:250px">
            <img class="card-img-top alimento-img" src=${producto.img} alt=${producto.id}>
            <div class="card-body">
                <h4 class="card-title nombre-producto">${producto.nombre}</h4>
                <p class="card-text">$<strong>${producto.precio}</strong></p>
                
                <a class="btn btn-outline-secondary anadirAlCarrito">
                <img height="30" src="./img/carrito+.png" alt="" ></a>
                
            </div>
        </div>
        `
        divContainer.appendChild(div)
    }
}

rellenarPagina(productos)


function anadirCarrito(e){

    let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito'))
    if (carritoLocalStorage){
        carrito = carritoLocalStorage
    }

    let id = e.target.parentNode.parentNode.parentNode.children[0].alt;
    let index = carrito.findIndex(producto => producto.id === id)
    let nombre =  e.target.parentNode.parentNode.children[0].textContent;
    let precio = e.target.parentNode.parentNode.children[1].children[0].innerHTML;
    let imagen = e.target.parentNode.parentNode.children[0].src;
    let cantidad = 1;

    if (index === -1){
        const producto = new ProductoCarrito(nombre, precio, imagen,cantidad, id)
        carrito.push(producto)
    } else{
        carrito[index].cantidad ++;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
    }

    carritoNav(carrito)
    
    localStorage.setItem('carrito', JSON.stringify(carrito))
/*
    Swal.fire({
        title: 'Producto añadido al carrito',
        text: '¿Desea seguir comprando?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Seguir comprando'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    '¡Producto añadido al carrito!',
                    '',
                    'success'
                )
            }
        }
    ) */


    Toastify({

        text: "Producto añadido",
        
        duration: 3000,

       
        
        }).showToast();
  
    
    




}




let botones = document.querySelectorAll(".anadirAlCarrito")
botones.forEach(boton  =>{
    boton.addEventListener("click" , anadirCarrito)
})

function carritoNav(arrayCarrito){

    let carritoNav = document.getElementById("anchor_carrito")
    let total = 0;
    for(producto of arrayCarrito){
        total += producto.subtotal
    }
    carritoNav.innerHTML = ""
    carritoNav.innerHTML = `<p>Carrito (${arrayCarrito.length})</p>`

}   

let carritoJson = JSON.parse(localStorage.getItem('carrito'))

let tbody = document.querySelector("#tbody")

function rellenarCarrito(arrayCarrito){

    for(producto of arrayCarrito){
        let row = document.createElement('tr')

        row.innerHTML = `
            <td>${producto.nombre}</td> 
            <td>${producto.precio}</td> 
            <td>${producto.cantidad}</td> 
            <td>${producto.subtotal}</td> 
            <td><button class='btn btn-danger eliminarProducto' id = ${producto.id}>
            <img height="30" src="./img/tacho2.png" alt="" ></button></td>
        `
        tbody.appendChild(row)
    }
}

const eliminarProducto = (e) => {
    let id = e.target.id
    let index = carrito.findIndex(producto => producto.id == id)
    carrito.splice(index)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    location.reload()

   

}



rellenarCarrito(carritoJson)



let botonesEliminar = document.querySelectorAll(".eliminarProducto")

botonesEliminar.forEach(boton => {

    boton.addEventListener("click", eliminarProducto)


   

})