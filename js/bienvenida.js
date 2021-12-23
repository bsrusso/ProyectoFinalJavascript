let bienvenidaUsuario = localStorage.getItem(`nombreSocio`);
let actividadesContratadas = JSON.parse(localStorage.getItem(`carrito`)) || [];

$(document).ready(function () {
    $(`#bienvenidaSocio`).append(
        `<div class="col text-center">
        <h1>Bienvenido ${bienvenidaUsuario.toLocaleUpperCase()}</h1>
        <h4 style="color: green">Usted puede realizar las siguientes actividades:</h4>
        <table class="table table-hover text-center">
        <thead><tr class="bg-success text-white">
        <th>Actividad</th>
        </tr></thead><tbody id="tablaBienvenida"><tr><th>Ingresar al club</tr></th></tbody></table>
        </div>
        `
    )
    for (let servicio of actividadesContratadas) {
        console.log(servicio.nombre)
        $("#tablaBienvenida").append(
            `<tr><th style="color: green">${servicio.nombre}</th></tr>`
        )
    }

    $(`#textoBienvenida`).append(
        `<p><b>Muchas gracias por asociarte a nuestro club.</b> ¡Estamos muy felices de que nos hayas elegido! Recordá que ante cualquier inconveniente o duda podes recurrir a nuestro centro de ayuda ubicado en la entrada principal del club o mediante nuestro formulario de <a href="./contacto.html">contacto</a><br><br>No te olvides de conocer <a href="./elClub.html">la historia de nuestra institución</a></p><br><br>`
    )
});
