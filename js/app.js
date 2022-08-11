const seccionCarrito = document.querySelector('#carrito');
const ContenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const ListaDeCursos = document.querySelector('#lista-cursos');

let carritoCompras = [];

CargarEventos();
function CargarEventos(){
    ListaDeCursos.addEventListener('click',AgregarCurso);
    seccionCarrito.addEventListener('click',EliminarCurso);
    vaciarCarrito.addEventListener('click',()=>{
        carritoCompras = [];
        LimpiarHTML();
    });
}

function AgregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        cursoSeleccionado = e.target.parentElement.parentElement;
        ExtraerDatos(cursoSeleccionado);
    }
}

function EliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        carritoCompras = carritoCompras.filter(curso => curso.id !==cursoId);
        MostrarCarrito();
    }
}

function ExtraerDatos(curso){
    
    const datosCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    const existe = carritoCompras.some(curso => curso.id === datosCurso.id);
    if (existe){
        const curso = carritoCompras.map(curso=>{
            if(curso.id === datosCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        carritoCompras = [...curso];
    }else{
        carritoCompras = [...carritoCompras,datosCurso];
    }
    MostrarCarrito();
}

function MostrarCarrito(){

    LimpiarHTML();

    carritoCompras.forEach(curso =>{
        const {imagen,titulo,precio,cantidad,id} = curso;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            <td>
            <td>
                ${titulo}
            <td>
            <td>
                ${precio}
            <td>
            <td>
                ${cantidad}
            <td>
            <td>
                <a href="#" class = "borrar-curso" data-id="${id}"> X </a>
            <td>
        `;

        ContenedorCarrito.appendChild(fila);
    });
}

function LimpiarHTML(){
    while(ContenedorCarrito.firstChild){
        ContenedorCarrito.removeChild(ContenedorCarrito.firstChild);
    }
}
