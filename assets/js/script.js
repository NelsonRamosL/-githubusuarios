
// Funciones
/** ******************************************************************************* */

/** 1. Crear tres funciones, una request, otra getUser y por último una función getRepo,
todas deben implementar async..await. La función request hará las peticiones a la
API y retorna el resultado, mientras que las funciones getUser y getRepo enviarán
los datos a la función request para obtener la información del usuario y los
repositorios a mostrar. Utiliza una URL base con el valor:
https://api.github.com/users.

*/
const baseUrl = 'https://api.github.com/users';
const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

const getUser = async (nombre) => {
    const url = `${baseUrl}/${nombre}`;
    return request(url);
}

const getRepo = async (nombre, pagina, repoPagina) => {
    const url = `${baseUrl}/${nombre}/repos?page=${pagina}&per_page=${repoPagina}`;
    return request(url);

}


const capturaDatosDom = (nombre, pagina, repoPagina) => {
   let resultados = document.getElementById("resultados");
    /**
    3. Mediante la implementación de una Promesa, realizar el llamado a las dos funciones
    al mismo tiempo que permiten conectarse con la API y traer la información en el
    caso de existir “getUser” y “getRepo”. Pasando como parámetros los valores
    necesarios para cada llamado de la API según la URL.
     */

    // getUser(nombre).then(resp => { console.log('resp ',resp)}).catch(err => console.log('err', err));
    let paginador = "";
    Promise.all([getUser(nombre), getRepo(nombre, pagina, repoPagina)])
        .then(resp => {
            let usuario = resp[0], post = resp[1];
    if (usuario.message !="Not Found" )  {  // caso que el mensaje retornado por la API sea “Not Found”
            paginador += `
   <div class="col">
   <h1>Datos de Usuario</h1>
   <img src="${usuario.avatar_url}" alt="" width="300">
           <ul class="list-unstyled">
                    <li>nombre usuario : ${usuario.name}</li>
                    <li>nombre login : ${usuario.login}</li>
                    <li>cantidad repositorio : ${usuario.public_repos}</li>
                    <li>localidad : ${usuario.location}</li>
                    <li>tipo usuario : ${usuario.type}</li>
                </ul>
            </div>
            <div class="col text-right">
                <h1>Nombre de repositorios</h1>
<ul class="list-unstyled">
            `;



post.forEach(element => {
    paginador += `
    <li><a href="${element.html_url}" target="_blank" rel="noopener noreferrer">${element.name}</a></li>
    `;
console.log(element);    
});


/**
 4. Mostrar los resultados obtenidos de la API en el documento HTML en la sección de
“Resultados”, como se muestra en la figura número dos.

 */

    resultados.innerHTML = paginador;
} else {

/**
 5. En el caso que el mensaje retornado por la API sea “Not Found”, indicar mediante
una ventana emergente que el usuario no existe y no mostrar ningún tipo de
información en la sección de resultado en el documento HTML.
 */
    $('.modal').modal('show');
    console.log("errorrrr usuario no encontrado");
}


})

        .catch(err => console.log('err', err));


}


// Main  
/** ******************************************************************************** */


// capturar los datos ingresados por el usuario y boton
let nombre = document.getElementById("nombre"),
    pagina = document.getElementById("pagina"),
    repoPagina = document.getElementById("repoPagina"),
    boton = document.getElementById("boton");
    
/**
2. Agregar una escucha (addEventListener) al formulario, que permita activar una
función en donde se capturen los datos ingresados por el usuario de la página
(nombre de usuario, número de página, repositorio por páginas).
 * 
 */

boton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("entramos en boton");
    capturaDatosDom(nombre.value, pagina.value, repoPagina.value);
})

