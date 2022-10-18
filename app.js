
const test = document.getElementById('contenedor');

const carrito = document.getElementById('carrito');

const templateCarro = document.getElementById('template-carrito').content

const templateFooter = document.getElementById('template-footer').content

const products = document.getElementById('products');

const footer = document.getElementById('footer');

const fragment = document.createDocumentFragment();

let carro = {};
let numero = 0;

const imprimirResultado = e => {
    console.log(e.target)
}

test.addEventListener('click', (e) => {
    addCarrito(e);
    
})
carrito.addEventListener("click", e => {
    btnAccion(e);
})



const addCarrito = e => {
    if(e.target.classList.contains('boton')){
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto =>{
    
    const producto = {
        id: objeto.querySelector('.color').id,
        nombre: objeto.querySelector('.color').innerHTML,
        precio: objeto.querySelector('.precio').innerHTML,
        cantidad: 1
    }
    if(carro.hasOwnProperty(producto.id)){
        producto.cantidad = carro[producto.id].cantidad + 1
    }
    
    carro[producto.id] = {...producto}
    pintarCarrito()
    
}



const pintarCarrito = () => {
    products.innerHTML=''
    Object.values(carro).forEach(producto => {
        if(producto.cantidad == 0){
            delete carro.producto
            return
        }
        templateCarro.querySelector('th').textContent = producto.id
        templateCarro.querySelectorAll('td')[0].textContent = producto.nombre
        templateCarro.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarro.querySelector('.btn-info').dataset.id = producto.id
        templateCarro.querySelector('.btn-danger').dataset.id = producto.id
        templateCarro.querySelector('span').textContent = producto.cantidad * producto.precio

        const clone = templateCarro.cloneNode(true)
        fragment.appendChild(clone)
        

    })

    
    products.appendChild(fragment);
    pintarFooter();
}


const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carro).length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }
    const nCantidad = Object.values(carro).reduce((acc, {cantidad}) => acc+cantidad , 0)
    const nPrecio = Object.values(carro).reduce((acc, {cantidad, precio}) => acc+ cantidad * precio, 0)
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const vaciar = document.getElementById('vaciar-carrito')
    vaciar.addEventListener("click", () => {
        carro = {}
        pintarCarrito()
    
    })
}

const btnAccion = e => {
    let carrote =  Object.values(carro)
    if(e.target.classList.contains('btn-info')){
        carrote.forEach( element =>{if(e.target.dataset.id === element.id) {
            element.cantidad ++;
            pintarCarrito()

    } })
    }else if(e.target.classList.contains('btn-danger')){
        carrote.forEach( element =>{if(e.target.dataset.id === element.id) {
            element.cantidad --;
            pintarCarrito()
            if (element.cantidad === 0){
                pintarCarrito()
            }
        }})
    }
}
