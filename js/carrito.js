let carrito = JSON.parse(localStorage.getItem('carrito'))

let tbody = document.querySelector("#tbody")





function rellenarCarrito(arrayCarrito){

    for(producto of arrayCarrito){
        let row = document.createElement('tr')

        row.innerHTML = `
            <td>${producto.nombre}</td> <td>${producto.precio}</td> <td>${producto.cantidad}</td> <td>${producto.subtotal}</td> <td><button class='btn btn-danger eliminarProducto' id = ${producto.id}>Eliminar</button></td>
        `
        tbody.appendChild(row)
    }
}

const eliminarProducto = (e) => {
    let id = e.target.id
    let index = carrito.findIndex(producto => producto.id == id)
    carrito.splice(index, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    location.reload()

   
}



rellenarCarrito(carrito)

let botonesEliminar = document.querySelectorAll(".eliminarProducto")

botonesEliminar.forEach(boton => {
    boton.addEventListener("click" , eliminarProducto)
    

})







  