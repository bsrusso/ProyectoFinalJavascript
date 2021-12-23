let bienvenidaUsuario = localStorage.getItem(`nombreSocio`);
let actividadesContratadas = JSON.parse(localStorage.getItem(`carrito`)) || [];

$(document).ready(function () {
    $(`#bienvenidaSocio`).append(
        `<div class="col text-center">
        <h1>Biendenido ${bienvenidaUsuario.toLocaleUpperCase()}</h1>
        <h4 style="color: green">Usted puede realizar las siguientes actividades:</h4>
        <table class="table table-hover text-center">
        <thead><tr class="bg-success text-white">
        <th>Actividad</th>
        </tr></thead><tbody id="tablaBienvenida"></tbody></table>
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
        `<p><b>Muchas gracias por formar parte de nuestro club,</b> estamos muy felices de que nos hayas elegido. Recordá que ante cualquier problema o inconveniente en nuestras instalaciones, podes recurrir a nuestro centro de ayuda ubicado en la entrada principal del club.<br>No te olvides de conocer <a href="./elClub.html">la historia de nuestro club</a></p>.<br><br>`
    )
});
