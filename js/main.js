//API DEL CLIMA


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



//CARRITO VACIO


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
                <h4 class="card-title">${producto.nombre}</h4>
                <p class="card-text">$<strong>${producto.precio}</strong></p>
                <a  class="btn btn-outline-secondary anadirAlCarrito"><img height="30" src="./img/carrito+.png" alt="" >comprar</a>
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

    let id = e.target.parentNode.parentNode.children[0].alt;
    let index = carrito.findIndex(producto => producto.id == id)
    console.log(index)

    let nombre =  e.target.parentNode.children[0].textContent;
    let precio = e.target.parentNode.children[1].children[0].innerHTML;
    let imagen = e.target.parentNode.parentNode.children[0].src;
    let cantidad = 1;

    if (index == -1){
        const producto = new ProductoCarrito(nombre, precio, imagen,cantidad, id)
        carrito.push(producto)
    } else{
        carrito[index].cantidad ++;
        carrito[index].subtotal = carrito[index].precio * carrito[index].cantidad;
    }

    carritoNav(carrito)
    
    localStorage.setItem('carrito', JSON.stringify(carrito))


    Toastify({

        text: "Producto añadido",
        
        duration: 3000,
        style: {
            background: "goldenrod",
          },
       
        
        }).showToast();


        

}





//anadir al carrito

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
    carritoNav.innerHTML = `<p><img height="30" src="./img/carrito+.png" alt="" >(${arrayCarrito.length})</p>`

}   