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






/////Comprar




  const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_t14pr4o';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Comprar';
 
      Toastify({
        text: "Gracias por su compra!",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "green",
        },
        onClick: function(){} 
      }).showToast();
    }, (err) => {
      btn.value = 'Enviar mensaje';
      Toastify({
        text: "Error al Enviar",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "red",
        },
        onClick: function(){} 
      }).showToast();
    });
});