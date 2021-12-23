//clase deportes
class Deportes {
    constructor(actividad) {
        this.id = actividad.id;
        this.nombre = actividad.nombre;
        this.precio = parseFloat(actividad.precio);
        this.img = actividad.img;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
}

const actividades = [];
cargarActividades();

const asociado = { nombre: "Cuota Social", precio: 1200 }

let carritoActividades = []

let asociarse = $("#deseoAsociarme");
let sumaCuota = 1200;

$(document).ready(function () {

    $("#deseoAsociarme").click(function () {
        let nombreSocio = $("#nombreSocio").val();
        if (nombreSocio == "" || !isNaN(nombreSocio)) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
                text: 'Nombre inválido',
            })
            return
        };
        localStorage.setItem("nombreSocio", nombreSocio.toLowerCase());
        $("#carrito").addClass("col anti-sticky")
        $("#carrito").append(`<h2>Bienvenido al club: ${$("#nombreSocio").val().toUpperCase()}</h2>
        <table class="table table-hover text-center" id="tableActividad">
            <thead>
                <tr class="bg-success text-white">
                    <th scope="col">Actividad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">X</th>
                </tr>
            </thead>
            <tbody id="itemsCarrito">
                <tr>
                    <td style="border-bottom-color: inherit;">Cuota Social</td>
                    <td style="border-bottom-color: inherit;">$${asociado.precio}</td>
                    <td style="border-bottom-color: inherit; padding-top:14px;"><button class="btn" style="display: hidden;"></button></td>
                </tr>
                <tbody id="adquirirActividad"></tbody>
            </tbody>
        </table>`);
        //Deshabilitar boton "deseo asociarme"
        $("#deseoAsociarme").prop("disabled", true);
        //             ------               //
        $("#finalizarInscripcion").append(`<a href="./bienvenido.html" class="btn btn-success mt-3 mb-3">Finalizar Inscripción</a>`)


        for (let actividad of actividades) {
            $("#asociate").append(`<div class="card col-sm-12 col-lg-4 cartaAgregar" style="display: inline-block; width: 500px; margin: 30px;">
            <img class="card-img-top" src="../${actividad.img}">
            <div class="card-body">
            <h5 class="card-title">${actividad.nombre}</h5>
            <p class="card-text">$${actividad.precio} Final</p>
            <a href="#carrito" class="btn btn-success" id="${actividad.id}">Agregar</a></div></div>`);

            //Event adquirir boton
            $(`#${actividad.id}`).click(function () {
                //Agrega a array de actividades
                carritoActividades.push(actividad)
                actualizarCarrito();
                //Animacion
                $(`#carrito`).slideUp('fast').slideDown('fast');
                //Deshabilitar anchor
                $(`#${actividad.id}`).addClass("btn btn-success disable-me");
            });
        };
    });


    //functionActualizarCarrito
    function actualizarCarrito() {
        sumaCuota = 1200;
        let divItems = $("#adquirirActividad");
        $("#adquirirActividad").html(` `);
        for (let actividad of carritoActividades) {
            //sumar cuota
            sumaCuota = sumaCuota + actividad.precio;
            $("#adquirirActividad").append(`
            <tr>
                <td>${actividad.nombre}</td>
                <td>$${actividad.precio}</td>
                <td><button class="btn btn-danger" id="delete${actividad.id}">Eliminar</button></td>
            </tr>`)
            localStorage.setItem("carrito", JSON.stringify(carritoActividades));
            localStorage.setItem("valorCuota", sumaCuota);

            //Eliminar actividad
            $(`#delete${actividad.id}`).click(function (e) {
                let borrarActividad = 0;
                for (let i = 0; i < carritoActividades.length; i++) {
                    if (carritoActividades[i].id == e.target.id.replace("delete", "")) {
                        borrarActividad = i;
                        //Habilitar anchor
                        $(`#${carritoActividades[i].id}`).removeClass("disable-me");
                    };
                };
                carritoActividades.splice(borrarActividad, 1);
                actualizarCarrito();
                //Animacion
                $(`#carrito`).slideUp('fast').slideDown('fast');

            });
            ////////////////////////
        };
        $("#adquirirActividad").append(`
        <tr>
            <td></td>
            <td>Total: $${sumaCuota} final por mes</td>
            <td></td>
        </tr>
        `)
    }
});





//Cargar articulos desde el .json, si tira error muestra alert
async function cargarActividades() {
    await $.getJSON('../js/actividades.json', (respuesta, estado) => {
        console.log("Archivo json cargado correctamente");
        for (const actividad of respuesta) {
            actividades.push(new Deportes(actividad));
        }
        for (const actividad of actividades) {
            actividad.sumaIva();
        }

    })
        .fail(function () {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',
                text: 'Tener en cuenta que el proyecto carga un archivo JSON dinamicamente, es necesario correrlo en modo webserver y no abrir el archivo de forma local',
            })
        });
}